# Erfan Teymuri — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Framer Motion · Lenis · Zod

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000 → redirects to /en or /de
npm run typecheck && npm run build
```

## Fill in before shipping
- `src/content/site.ts` — email, GitHub/LinkedIn URLs, location, experience timeline (all marked `TODO`)
- `public/cv/Erfan-Teymuri-CV.pdf` — your CV
- `src/content/projects.ts` — drafts; add real links, metrics, screenshots
- `.env.local` — `NEXT_PUBLIC_SITE_URL`, and `RESEND_API_KEY` + `CONTACT_TO_EMAIL` for real email delivery (without a key the form logs to the server console)
