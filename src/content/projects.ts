import type { Localized } from "./site";

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: Localized;
  summary: Localized;
  problem: Localized;
  approach: Localized;
  highlights: readonly Localized[];
  outcome: Localized;
  stack: readonly string[];
  accent: "emerald" | "amber" | "sky" | "violet";
  links: { live?: string; source?: string };
  /** Verifiable engineering facts. Add measured numbers (Lighthouse, bundle size, etc.) once you have them. */
  metrics: readonly { label: Localized; value: string }[];
}

// NOTE: descriptions are drafts based on the project briefs — refine with real metrics and links.
export const projects: readonly Project[] = [
  {
    slug: "algorithm-visualizer-academy",
    title: "Algorithm Visualizer Academy",
    year: "2025",
    role: { en: "Creator & Frontend Engineer", de: "Entwickler & Frontend Engineer" },
    accent: "emerald",
    summary: {
      en: "A trilingual (EN/FA/DE) interactive platform that teaches algorithms through step-by-step SVG/canvas visualisation.",
      de: "Eine dreisprachige, interaktive Plattform, die Algorithmen durch schrittweise Visualisierung vermittelt.",
    },
    problem: {
      en: "Algorithms are usually taught with static diagrams and dense pseudocode, which hides how state evolves over time — and most material is English-only.",
      de: "Algorithmen werden meist mit statischen Diagrammen und dichtem Pseudocode gelehrt, was die zeitliche Entwicklung des Zustands verbirgt — und das meiste Material ist nur auf Englisch.",
    },
    approach: {
      en: "Each algorithm is modelled as a pure generator of typed steps. The UI replays those steps with play, pause, scrub and speed controls, so visuals, code highlighting and explanations always stay in sync.",
      de: "Jeder Algorithmus ist als reiner Generator typisierter Schritte modelliert. Die UI spielt diese Schritte mit Play, Pause, Scrubbing und Geschwindigkeit ab, sodass Visualisierung, Code-Hervorhebung und Erklärung stets synchron bleiben.",
    },
    highlights: [
      { en: "Next.js 15 App Router with localized routes", de: "Next.js 15 App Router mit lokalisierten Routen" },
      { en: "Step-based engine decoupled from rendering", de: "Schrittbasierte Engine, entkoppelt vom Rendering" },
      { en: "Strict TypeScript across algorithms and UI", de: "Striktes TypeScript über Algorithmen und UI" },
      { en: "Keyboard-accessible playback controls", de: "Tastaturbedienbare Wiedergabesteuerung" },
    ],
    outcome: {
      en: "A reusable foundation for adding new algorithms and languages without touching the rendering layer.",
      de: "Eine wiederverwendbare Basis, um neue Algorithmen und Sprachen hinzuzufügen, ohne die Rendering-Schicht anzufassen.",
    },
    stack: ["Next.js 15", "TypeScript", "SVG / Canvas", "Tailwind CSS", "Framer Motion", "Zustand"],
    links: {},
    metrics: [
      { label: { en: "Languages", de: "Sprachen" }, value: "EN · FA · DE (RTL-aware)" },
      { label: { en: "Rendering", de: "Rendering" }, value: "Custom SVG / canvas" },
      { label: { en: "Engine", de: "Engine" }, value: "Pure typed step generators" },
    ],
  },
  {
    slug: "memora",
    title: "Memora",
    year: "2025",
    role: { en: "Frontend Engineer", de: "Frontend Engineer" },
    accent: "amber",
    summary: {
      en: "A mobile-first web app for sharing event photos and media, with real-time slideshows.",
      de: "Eine Mobile-First-Web-App zum Teilen von Event-Fotos und -Medien mit Echtzeit-Slideshows.",
    },
    problem: {
      en: "Event photos end up scattered across guests' phones and chat apps. Hosts want one place to collect them and show them live.",
      de: "Event-Fotos landen verstreut auf den Handys der Gäste und in Chat-Apps. Gastgeber wollen einen zentralen Ort zum Sammeln und Live-Zeigen.",
    },
    approach: {
      en: "Guests join via a link and upload from the browser — no install. Photos are compressed client-side before upload to save bandwidth on patchy mobile networks. New media is pushed to a slideshow view in real time, with optimistic uploads and resilient retries for patchy venue Wi-Fi.",
      de: "Gäste treten per Link bei und laden direkt im Browser hoch — ohne Installation. Fotos werden vor dem Upload clientseitig komprimiert, um Bandbreite in schwachen Mobilnetzen zu sparen. Neue Medien erscheinen in Echtzeit in der Slideshow, mit optimistischen Uploads und robusten Wiederholungen bei schwachem WLAN.",
    },
    highlights: [
      { en: "Mobile-first upload flow with progress and retry", de: "Mobile-First-Upload mit Fortschritt und Wiederholung" },
      { en: "Real-time slideshow updates", de: "Echtzeit-Updates der Slideshow" },
      { en: "Optimised image loading for large galleries", de: "Optimiertes Laden von Bildern in großen Galerien" },
    ],
    outcome: {
      en: "A frictionless way to turn every guest's camera roll into a shared, live memory wall.",
      de: "Ein reibungsloser Weg, die Fotogalerie jedes Gastes in eine gemeinsame, live aktualisierte Erinnerungswand zu verwandeln.",
    },
    stack: ["React", "Next.js", "TypeScript", "TanStack Query", "WebSockets", "Canvas API"],
    links: {},
    metrics: [
      { label: { en: "Uploads", de: "Uploads" }, value: "Client-side image compression" },
      { label: { en: "Realtime", de: "Echtzeit" }, value: "WebSockets" },
      { label: { en: "Target", de: "Zielgerät" }, value: "Mobile-first" },
    ],
  },
  {
    slug: "discount-prime",
    title: "Discount Prime",
    year: "2024",
    role: { en: "Frontend / Shopify Developer", de: "Frontend- / Shopify-Entwickler" },
    accent: "sky",
    summary: {
      en: "A Shopify e-commerce storefront engineered for performance: fast loads, clear discounts, light checkout path.",
      de: "Eine Shopify-basierte E-Commerce-Anwendung mit Fokus auf Rabatte und schnelle Storefront-Performance.",
    },
    problem: {
      en: "Discount-driven shops need clear pricing, quick browsing and a checkout that never feels heavy — especially on mobile.",
      de: "Rabattorientierte Shops brauchen klare Preise, schnelles Stöbern und einen Checkout, der sich nie schwerfällig anfühlt — besonders mobil.",
    },
    approach: {
      en: "Built on Shopify with a lean, componentised storefront: lightweight assets, clear discount presentation and a streamlined path from product to checkout.",
      de: "Auf Shopify aufgebaut, mit schlanker, komponentenbasierter Storefront: leichte Assets, klare Rabattdarstellung und ein kurzer Weg vom Produkt zum Checkout.",
    },
    highlights: [
      { en: "Shopify storefront customisation", de: "Anpassung der Shopify-Storefront" },
      { en: "Clear discount and price presentation", de: "Klare Darstellung von Rabatten und Preisen" },
      { en: "Mobile-first, performance-minded UI", de: "Mobile-First-UI mit Performance-Fokus" },
    ],
    outcome: {
      en: "A fast, conversion-minded storefront that makes deals easy to find and easy to buy.",
      de: "Eine schnelle, konversionsorientierte Storefront, in der Angebote leicht zu finden und leicht zu kaufen sind.",
    },
    stack: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS"],
    links: {},
    metrics: [
      { label: { en: "Platform", de: "Plattform" }, value: "Shopify" },
      { label: { en: "Focus", de: "Fokus" }, value: "Core Web Vitals (LCP, CLS)" },
      { label: { en: "Approach", de: "Ansatz" }, value: "Lean assets, deferred scripts" },
    ],
  },
  {
    slug: "jitsi-meet-localization",
    title: "Jitsi-Meet Localization",
    year: "2024",
    role: { en: "Open-source Contributor", de: "Open-Source-Mitwirkender" },
    accent: "violet",
    summary: {
      en: "Persian translation management and contributions to the open-source Jitsi Meet video-conferencing project.",
      de: "Verwaltung der persischen Übersetzung und Beiträge zum Open-Source-Videokonferenzprojekt Jitsi Meet.",
    },
    problem: {
      en: "Persian-speaking users need a fully localised conferencing UI, including right-to-left layout and consistent terminology.",
      de: "Persischsprachige Nutzer brauchen eine vollständig lokalisierte Konferenzoberfläche, inklusive Rechts-nach-links-Layout und einheitlicher Terminologie.",
    },
    approach: {
      en: "Maintained and extended the Persian translation files, aligned terminology with the existing glossary and reviewed strings in context to catch truncation and RTL issues.",
      de: "Die persischen Übersetzungsdateien gepflegt und erweitert, Terminologie am bestehenden Glossar ausgerichtet und Texte im Kontext geprüft, um Kürzungen und RTL-Probleme zu finden.",
    },
    highlights: [
      { en: "Translation coverage and consistency for Persian", de: "Abdeckung und Konsistenz der persischen Übersetzung" },
      { en: "Contextual review for RTL layout issues", de: "Kontextuelle Prüfung auf RTL-Layoutprobleme" },
      { en: "Collaboration through open-source workflows", de: "Zusammenarbeit über Open-Source-Workflows" },
    ],
    outcome: {
      en: "Better access to a widely used open-source tool for Persian speakers.",
      de: "Besserer Zugang zu einem weit verbreiteten Open-Source-Werkzeug für Persischsprachige.",
    },
    stack: ["i18n", "JSON", "Git", "Open source"],
    links: { source: "https://github.com/jitsi/jitsi-meet" },
    metrics: [
      { label: { en: "Locale", de: "Sprache" }, value: "Persian (fa)" },
      { label: { en: "Layout", de: "Layout" }, value: "RTL review" },
      { label: { en: "Type", de: "Art" }, value: "Open-source contribution" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
