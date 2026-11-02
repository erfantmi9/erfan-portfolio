import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

// TODO: replace every value marked TODO with your real details.
export const site = {
  name: "Erfan Teymuri",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com", // TODO
  location: "Iran → Austria (open to relocation)",
  cvPath: "/cv/Erfan-Teymuri-CV.pdf", // TODO: drop the PDF into /public/cv/
  socials: {
    github: "https://github.com/your-handle", // TODO
    linkedin: "https://www.linkedin.com/in/your-handle", // TODO
  },
} as const;

export interface SkillGroup {
  label: Localized;
  items: readonly string[];
}

export const skills: readonly SkillGroup[] = [
  { label: { en: "Core", de: "Kern" }, items: ["React 19", "Next.js 15 (App Router)", "TypeScript", "Tailwind CSS"] },
  { label: { en: "State & data", de: "State & Daten" }, items: ["Zustand", "TanStack Query", "Zod", "REST / Route Handlers"] },
  { label: { en: "Motion & UX", de: "Motion & UX" }, items: ["Framer Motion", "GSAP", "Lenis", "Accessibility (WCAG)"] },
  { label: { en: "AI-native UI", de: "KI-native UI" }, items: ["Streaming interfaces", "Structured outputs", "Prompt-driven UX"] },
  { label: { en: "Tooling", de: "Tooling" }, items: ["Git", "ESLint", "Vercel", "i18n workflows"] },
];

export interface TimelineEntry {
  period: string;
  title: Localized;
  org: string;
  summary: Localized;
}

// TODO: replace with your real employment / education history.
export const timeline: readonly TimelineEntry[] = [
  {
    period: "20XX — Present",
    title: { en: "Frontend Software Engineer", de: "Frontend Software Engineer" },
    org: "TODO Company",
    summary: {
      en: "Building high-performance React / Next.js interfaces. Replace with your real role and impact.",
      de: "Entwicklung performanter React-/Next.js-Oberflächen. Durch deine echte Rolle und Wirkung ersetzen.",
    },
  },
];
