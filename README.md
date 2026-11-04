# Erfan Teymuri — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Framer Motion · Zod

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000 → redirects to /en or /de
npm run typecheck && npm run lint && npm run build
```

## Content
- `src/content/site.ts` — contact details, socials, CV path (`null` hides the CV button), skills, timeline
- `src/content/projects.ts` — case studies
- `src/content/legal.ts` — Impressum and privacy policy
- `src/i18n/dictionaries/{en,de}.ts` — UI copy

Open questions and missing information are tracked in a local, git-ignored `TODO.md`.

## Contact form (Resend)

`POST /api/contact` validates input with Zod, drops honeypot submissions, applies a best-effort rate limit,
and sends the message through the [Resend](https://resend.com) REST API. It returns success **only** when Resend
accepts the email; a missing `RESEND_API_KEY` or a provider error returns an error to the visitor.
Form contents are never logged.

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes | Server-only (no `NEXT_PUBLIC_` prefix), never sent to the browser |
| `CONTACT_TO_EMAIL` | recommended | Defaults to `site.email`. With the `onboarding@resend.dev` sender, Resend only delivers to the Resend account owner's email |
| `CONTACT_FROM_EMAIL` | no | Defaults to `Portfolio <onboarding@resend.dev>`; use an address on a verified domain later |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Used for canonical URLs, sitemap and robots |

**Rate limiting:** 5 requests / 10 minutes per IP (`x-vercel-forwarded-for`). The counter lives in the memory of a
single serverless instance, so it resets on cold starts and is not shared between instances. It slows down casual
abuse only. Locally the header is absent, so all local requests share one bucket.

**Test locally:** set the variables in `.env.local`, run `npm run dev`, submit the form, and check the inbox.
Without a key, the form must show the error message.

**Test in production:** add the variables in Vercel → Project → Settings → Environment Variables (Production),
redeploy, submit the live form, and confirm the email arrives. Check Resend → Emails for delivery status.
