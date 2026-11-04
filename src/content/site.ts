import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export const site = {
  name: "Erfan Teymuri",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "erftmi.aut@gmail.com",
  /** Set to the PDF path (e.g. "/cv/Erfan-Teymuri-CV.pdf") once the file exists in /public. null hides the button. */
  cvPath: null as string | null,
  socials: {
    github: "https://github.com/erfantmi9",
    linkedin: "https://www.linkedin.com/in/erfan-teymuri-a27227202",
  },
} as const;

export type SkillLevel = "daily" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
}

/** A group with no items is not rendered. */
export const skills: readonly Skill[] = [
  ...(["JavaScript", "TypeScript", "React", "HTML", "CSS", "Git", "Vite", "Nx"] as const).map(
    (name): Skill => ({ name, level: "daily" }),
  ),
  ...(
    [
      "React Router",
      "Zustand",
      "TanStack Query",
      "Ant Design",
      "i18next",
      "WebRTC",
      "Jitsi Meet",
      "Electron",
      "Node.js",
      "Mapbox",
      "Chart.js",
      "Shopify",
      "Next.js",
      "Tailwind CSS",
    ] as const
  ).map((name): Skill => ({ name, level: "familiar" })),
];

/** Work & languages. Every field is optional: a missing value hides its row. */
export interface WorkFacts {
  targetCities?: Localized;
  workModel?: Localized;
  permit?: Localized;
  startDate?: Localized;
  noticePeriod?: Localized;
}

export const workFacts: WorkFacts = {
  targetCities: { en: "Salzburg · Vienna · Linz", de: "Salzburg · Wien · Linz" },
  workModel: { en: "On-site, hybrid or remote", de: "Vor Ort, hybrid oder remote" },
  permit: { en: "Employer support needed", de: "Unterstützung durch Arbeitgeber nötig" },
  // startDate, noticePeriod: add when known (TODO.md).
};

export interface SpokenLanguage {
  name: Localized;
  /** Without a level the language is not shown. */
  level?: Localized;
}

export const spokenLanguages: readonly SpokenLanguage[] = [
  { name: { en: "Persian", de: "Persisch" }, level: { en: "Native", de: "Muttersprache" } },
  { name: { en: "English", de: "Englisch" } /* level: add when known (TODO.md) */ },
  { name: { en: "German", de: "Deutsch" }, level: { en: "A1, learning actively", de: "A1, lerne aktiv" } },
];

export interface TimelineEntry {
  /** Hidden until confirmed. Employment dates stay unpublished until the start date is confirmed. */
  period?: Localized;
  title?: Localized;
  /** Optional bullet points; the list is hidden when empty or absent. */
  highlights?: readonly Localized[];
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
