import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return {
    title: project.title,
    description: project.summary[locale],
    alternates: { canonical: `/${locale}/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();

  const t = getDictionary(locale).projects;
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="section pt-32">
      <Link href={`/${locale}#work`} className="font-mono text-sm text-neon hover:underline">
        ← {t.back}
      </Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">{project.summary[locale]}</p>

      <dl className="mt-10 grid gap-6 border-y border-slate-800 py-6 sm:grid-cols-3">
        <div>
          <dt className="eyebrow">{t.role}</dt>
          <dd className="mt-1 text-slate-200">{project.role[locale]}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t.year}</dt>
          <dd className="mt-1 text-slate-200">{project.year}</dd>
        </div>
        <div>
          <dt className="eyebrow">{t.stack}</dt>
          <dd className="mt-1 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded bg-ink-800 px-2 py-0.5 font-mono text-xs text-slate-300">
                {s}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-12 grid max-w-3xl gap-10">
        <section aria-labelledby="problem">
          <h2 id="problem" className="text-2xl font-bold text-white">{t.problem}</h2>
          <p className="mt-3 leading-relaxed">{project.problem[locale]}</p>
        </section>
        <section aria-labelledby="approach">
          <h2 id="approach" className="text-2xl font-bold text-white">{t.approach}</h2>
          <p className="mt-3 leading-relaxed">{project.approach[locale]}</p>
        </section>
        <section aria-labelledby="highlights">
          <h2 id="highlights" className="text-2xl font-bold text-white">{t.highlights}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-neon">
            {project.highlights.map((h) => (
              <li key={h.en}>{h[locale]}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="outcome">
          <h2 id="outcome" className="text-2xl font-bold text-white">{t.outcome}</h2>
          <p className="mt-3 leading-relaxed">{project.outcome[locale]}</p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.links.live && (
          <a className="btn-primary" href={project.links.live} target="_blank" rel="noopener noreferrer">
            {t.visit}
          </a>
        )}
        {project.links.source && (
          <a className="btn-ghost" href={project.links.source} target="_blank" rel="noopener noreferrer">
            {t.source}
          </a>
        )}
      </div>

      {next && next.slug !== slug && (
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="mt-20 block rounded-xl border border-slate-800 p-6 transition-colors hover:border-neon"
        >
          <span className="eyebrow">{t.next}</span>
          <span className="mt-2 block text-2xl font-bold text-white">{next.title} →</span>
        </Link>
      )}
    </article>
  );
}
