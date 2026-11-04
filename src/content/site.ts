import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export const site = {
  name: "Erfan Teymuri",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "erftmi.aut@gmail.com",
  location: "Iran → Austria (open to relocation)",
  /** Set to the PDF path (e.g. "/cv/Erfan-Teymuri-CV.pdf") once the file exists in /public. null hides the button. */
  cvPath: null as string | null,
  socials: {
    github: "https://github.com/erfantmi9",
    linkedin: "https://www.linkedin.com/in/erfan-teymuri-a27227202",
  },
} as const;

export interface SkillGroup {
  label: Localized;
  items: readonly string[];
}

export const skills: readonly SkillGroup[] = [
  { label: { en: "Core", de: "Kern" }, items: ["React 19", "Next.js 15 (App Router)", "TypeScript", "Tailwind CSS"] },
  { label: { en: "State & data", de: "State & Daten" }, items: ["Zustand", "TanStack Query", "Zod", "REST / Route Handlers"] },
  { label: { en: "Motion & UX", de: "Motion & UX" }, items: ["Framer Motion", "Accessibility"] },
  { label: { en: "AI-native UI", de: "KI-native UI" }, items: ["Streaming interfaces", "Structured outputs"] },
  { label: { en: "Tooling", de: "Tooling" }, items: ["Git", "ESLint", "Vercel", "i18n workflows"] },
];

export interface TimelineEntry {
  /** Hidden until confirmed. Employment dates stay unpublished until the start date is confirmed. */
  period?: Localized;
  title?: Localized;
  org: Localized;
  summary: Localized;
}

export const timeline: readonly TimelineEntry[] = [
  {
    org: { en: "Collaboration-software company", de: "Unternehmen für Kollaborationssoftware" },
    summary: {
      en: "Working on the frontend of an organizational collaboration platform, contributing to React-based applications and real-time communication experiences.",
      de: "Arbeit am Frontend einer Kollaborationsplattform für Organisationen – mit Beiträgen zu React-Anwendungen und Echtzeit-Kommunikation.",
    },
  },
];
