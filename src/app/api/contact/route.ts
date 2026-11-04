import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { site } from "@/content/site";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot: real users leave it empty
});

export type ContactField = "name" | "email" | "message";
export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "validation" | "rate_limited" | "server"; fields?: ContactField[] };

// Best-effort, instance-local rate limiter. Limitations: state lives in the memory of a single
// serverless instance, so it resets on cold starts and is not shared between concurrent instances.
// It slows down casual abuse only; a shared store (e.g. Redis) would be needed for a hard limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return json({ ok: false, code: "server" }, 403);
  }

  // Set by Vercel's edge and not spoofable by the client. Locally it is absent, so all requests share one bucket.
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return json({ ok: false, code: "rate_limited" }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: "validation" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => i.path[0]))].filter(
      (f): f is ContactField => f === "name" || f === "email" || f === "message",
    );
    // Honeypot hits report success so bots get no signal.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return json({ ok: true }, 200);
    return json({ ok: false, code: "validation", fields }, 400);
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  // Never report success without a delivery attempt. Logs must not contain form data.
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return json({ ok: false, code: "server" }, 503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("[contact] provider error", res.status);
      return json({ ok: false, code: "server" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] send failed", error instanceof Error ? error.name : "unknown error");
    return json({ ok: false, code: "server" }, 500);
  }
}
