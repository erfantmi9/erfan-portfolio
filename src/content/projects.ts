import type { Localized } from "./site";

export interface CaseStudyLink {
  label: Localized;
  href: string;
}

export interface CaseStudySubsection {
  title: Localized;
  body: Localized;
}

/**
 * One model for every case study. Every section is optional: a missing or empty field is not rendered,
 * and it appears automatically once data is added. Only add facts that are confirmed (see TODO.md / PROGRESS.md).
 */
export interface CaseStudy {
  slug: string;
  title: string;
  summary: Localized;
  accent: "emerald" | "amber" | "sky" | "violet";
  stack: readonly string[];
  year?: string;
  /** Short status label, e.g. "In development". */
  status?: Localized;
  /** Short role label shown in the facts row. */
  role?: Localized;
  problem?: Localized;
  myRole?: Localized;
  technicalDecisions?: readonly Localized[];
  implementation?: readonly Localized[];
  /** Extra titled paragraphs inside the implementation part (e.g. a localization sub-project). */
  subsections?: readonly CaseStudySubsection[];
  result?: Localized;
  links?: readonly CaseStudyLink[];
  /** Interactive demo embedded in the case study. */
  demo?: "sort-visualizer";
}

export const projects: readonly CaseStudy[] = [
  {
    slug: "jitsi-meet-webrtc",
    title: "Jitsi Meet / WebRTC",
    accent: "violet",
    summary: {
      en: "Frontend work on a customized fork of Jitsi Meet, the open-source WebRTC video-conferencing project, inside a larger collaboration platform.",
      de: "Frontend-Arbeit an einem angepassten Fork von Jitsi Meet, dem Open-Source-Projekt für WebRTC-Videokonferenzen, innerhalb einer größeren Kollaborationsplattform.",
    },
    stack: ["React", "Jitsi Meet", "WebRTC", "Electron"],
    myRole: {
      en: "I worked on the frontend of the customized Jitsi Meet fork. Jitsi Meet's architecture comes from the open-source project; my part was adapting and integrating its frontend.",
      de: "Ich habe am Frontend des angepassten Jitsi-Meet-Forks gearbeitet. Die Architektur von Jitsi Meet stammt aus dem Open-Source-Projekt; mein Teil war die Anpassung und Integration des Frontends.",
    },
    implementation: [
      { en: "Customized the React frontend of Jitsi Meet.", de: "Das React-Frontend von Jitsi Meet angepasst." },
      { en: "Upgraded the Jitsi web and Electron components.", de: "Die Web- und Electron-Komponenten von Jitsi aktualisiert." },
      {
        en: "Integrated the conferencing frontend into the larger platform.",
        de: "Das Konferenz-Frontend in die größere Plattform integriert.",
      },
    ],
    subsections: [
      {
        title: { en: "Persian localization", de: "Persische Lokalisierung" },
        body: {
          en: "Work on the Persian (fa) localization of the Jitsi Meet interface.",
          de: "Arbeit an der persischen (fa) Lokalisierung der Jitsi-Meet-Oberfläche.",
        },
      },
    ],
  },
  {
    slug: "memora",
    title: "Memora",
    accent: "amber",
    status: { en: "In development (about 30%)", de: "In Entwicklung (etwa 30 %)" },
    role: { en: "Independent project", de: "Eigenständiges Projekt" },
    summary: {
      en: "An event photo-sharing web app: guests scan a QR code, upload photos and create a shared memory of the event.",
      de: "Eine Web-App zum Teilen von Event-Fotos: Gäste scannen einen QR-Code, laden Fotos hoch und erstellen eine gemeinsame Erinnerung an das Event.",
    },
    problem: {
      en: "Event photos end up spread across guests' phones. Memora collects them in one shared gallery per event. The concept is inspired by GuestPix and adapted for the Iranian market.",
      de: "Event-Fotos sind auf den Handys der Gäste verteilt. Memora sammelt sie in einer gemeinsamen Galerie pro Event. Das Konzept ist von GuestPix inspiriert und für den iranischen Markt angepasst.",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase"],
    implementation: [
      { en: "Guest access via QR code", de: "Zugang für Gäste per QR-Code" },
      { en: "Uploads without guest registration", de: "Uploads ohne Registrierung der Gäste" },
      { en: "Image compression", de: "Bildkomprimierung" },
      { en: "Event galleries", de: "Event-Galerien" },
      { en: "Live slideshow", de: "Live-Diashow" },
      { en: "Manual moderation", de: "Manuelle Moderation" },
      { en: "Admin area for hosts", de: "Admin-Bereich für Gastgeber" },
      { en: "Persian interface with right-to-left layout", de: "Persische Oberfläche mit Rechts-nach-links-Layout" },
    ],
  },
  {
    slug: "discount-prime",
    title: "Discount Prime",
    accent: "sky",
    summary: {
      en: "A Shopify Admin app with dynamic discount functionality.",
      de: "Eine Shopify-Admin-App mit dynamischen Rabattfunktionen.",
    },
    stack: ["Shopify"],
  },
  {
    slug: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    accent: "emerald",
    summary: {
      en: "An interactive sorting demo that replays bubble, insertion and selection sort step by step as an SVG bar chart.",
      de: "Eine interaktive Sortier-Demo, die Bubble Sort, Insertion Sort und Selection Sort Schritt für Schritt als SVG-Balkendiagramm abspielt.",
    },
    stack: ["React", "TypeScript", "SVG"],
    implementation: [
      {
        en: "A pure function records every comparison and swap as a typed list of steps; the input array is never mutated.",
        de: "Eine reine Funktion speichert jeden Vergleich und jeden Tausch als typisierte Liste von Schritten; das Eingabe-Array wird nie verändert.",
      },
      {
        en: "A seeded random generator creates the same starting array on the server and in the browser.",
        de: "Ein Zufallsgenerator mit festem Startwert erzeugt auf dem Server und im Browser dasselbe Start-Array.",
      },
      {
        en: "The React component replays the steps with play, pause, single step, reset, shuffle and three speeds.",
        de: "Die React-Komponente spielt die Schritte mit Abspielen, Pause, Einzelschritt, Zurücksetzen, Mischen und drei Geschwindigkeiten ab.",
      },
      {
        en: "Colours mark the compared, swapped and sorted bars.",
        de: "Farben markieren verglichene, getauschte und sortierte Balken.",
      },
    ],
    demo: "sort-visualizer",
  },
];

export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Old slugs that permanently redirect to the current ones (used in next.config.ts). */
export const slugRedirects: Readonly<Record<string, string>> = {
  "algorithm-visualizer-academy": "algorithm-visualizer",
  "jitsi-meet-localization": "jitsi-meet-webrtc",
};
