"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ContactField, ContactResponse } from "@/app/api/contact/route";

type Status = "idle" | "sending" | "success" | "error" | "rate_limited";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-700 bg-ink-900 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-neon";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<ContactField[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => (typeof data.get(key) === "string" ? (data.get(key) as string) : "");

    setStatus("sending");
    setInvalid([]);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: field("name"),
          email: field("email"),
          message: field("message"),
          website: field("website"),
        }),
      });
      const body = (await res.json()) as ContactResponse;
      if (body.ok) {
        setStatus("success");
        form.reset();
      } else if (body.code === "validation") {
        setInvalid(body.fields ?? []);
        setStatus("idle");
      } else {
        setStatus(body.code === "rate_limited" ? "rate_limited" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const err = (f: ContactField) => invalid.includes(f);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-800 bg-ink-900/50 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-slate-200">{t.name}</label>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass}
          aria-invalid={err("name")} aria-describedby={err("name") ? "name-err" : undefined} />
        {err("name") && <p id="name-err" className="mt-1 text-sm text-red-400">{t.validation.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-200">{t.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass}
          aria-invalid={err("email")} aria-describedby={err("email") ? "email-err" : undefined} />
        {err("email") && <p id="email-err" className="mt-1 text-sm text-red-400">{t.validation.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-slate-200">{t.message}</label>
        <textarea id="message" name="message" rows={5} required className={inputClass}
          aria-invalid={err("message")} aria-describedby={err("message") ? "message-err" : undefined} />
        {err("message") && <p id="message-err" className="mt-1 text-sm text-red-400">{t.validation.message}</p>}
      </div>

      {/* Honeypot: hidden from users and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.send}
      </button>

      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === "success" && <span className="text-neon">{t.success}</span>}
        {status === "error" && <span className="text-red-400">{t.error}</span>}
        {status === "rate_limited" && <span className="text-amber-glow">{t.rateLimited}</span>}
      </p>
    </form>
  );
}
