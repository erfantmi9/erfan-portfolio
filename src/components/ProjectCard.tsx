import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { CaseStudy } from "@/content/projects";

const accents: Record<CaseStudy["accent"], { text: string; border: string; glow: string }> = {
  emerald: { text: "text-emerald-400", border: "hover:border-emerald-400/60", glow: "from-emerald-400/15" },
  amber: { text: "text-amber-400", border: "hover:border-amber-400/60", glow: "from-amber-400/15" },
  sky: { text: "text-sky-400", border: "hover:border-sky-400/60", glow: "from-sky-400/15" },
  violet: { text: "text-violet-400", border: "hover:border-violet-400/60", glow: "from-violet-400/15" },
};

interface ProjectCardProps {
  project: CaseStudy;
  locale: Locale;
  index: number;
  cta: string;
  stackLabel: string;
}

export function ProjectCard({ project, locale, index, cta, stackLabel }: ProjectCardProps) {
  const a = accents[project.accent];
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-ink-900/60 p-6 transition-colors ${a.border}`}
    >
      <div aria-hidden className={`absolute inset-0 -z-0 bg-gradient-to-br ${a.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between font-mono text-xs text-slate-400">
          <span className={a.text}>{String(index + 1).padStart(2, "0")}</span>
          {(project.status || project.year) && <span>{project.status?.[locale] ?? project.year}</span>}
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">
          <Link
            href={`/${locale}/work/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-8"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-slate-400">{project.summary[locale]}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={stackLabel}>
          {project.stack.map((s) => (
            <li key={s} className="rounded bg-ink-800 px-2 py-0.5 font-mono text-xs text-slate-300">
              {s}
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-sm font-semibold ${a.text}`} aria-hidden>
          {cta} →
        </p>
      </div>
    </article>
  );
}
