import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SortVisualizer } from "@/components/SortVisualizer";

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
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${project.title} — ${getDictionary(locale).projects.caseStudy} | ${site.name}`,
    description: project.summary[locale],
  });
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-bold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();

  const dict = getDictionary(locale);
  const t = dict.projects;
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    project.status && { key: "status", label: t.status, value: project.status[locale] },
    project.role && { key: "role", label: t.role, value: project.role[locale] },
    project.year && { key: "year", label: t.year, value: project.year },
  ].filter((f): f is { key: string; label: string; value: string } => Boolean(f));

  const decisions = project.technicalDecisions ?? [];
  const implementation = project.implementation ?? [];
  const subsections = project.subsections ?? [];
  const links = project.links ?? [];

  return (
    <article className="section pt-32">
      <Link href={`/${locale}#work`} className="font-mono text-sm text-neon hover:underline">
        ← {t.back}
      </Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">{project.summary[locale]}</p>

      <dl className="mt-10 grid gap-6 border-y border-slate-800 py-6 sm:grid-cols-3">
        {facts.map((f) => (
          <div key={f.key}>
            <dt className="eyebrow">{f.label}</dt>
            <dd className="mt-1 text-slate-200">{f.value}</dd>
          </div>
        ))}
        {project.stack.length > 0 && (
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
        )}
      </dl>

      <div className="mt-12 grid max-w-3xl gap-10">
        {project.problem && (
          <Section id="problem" title={t.problem}>
            <p className="mt-3 leading-relaxed">{project.problem[locale]}</p>
          </Section>
        )}
        {project.myRole && (
          <Section id="my-role" title={t.myRole}>
            <p className="mt-3 leading-relaxed">{project.myRole[locale]}</p>
          </Section>
        )}
        {decisions.length > 0 && (
          <Section id="decisions" title={t.technicalDecisions}>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-neon">
              {decisions.map((d) => (
                <li key={d.en}>{d[locale]}</li>
              ))}
            </ul>
          </Section>
        )}
        {(implementation.length > 0 || subsections.length > 0) && (
          <Section id="implementation" title={t.implementation}>
            {implementation.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-neon">
                {implementation.map((d) => (
                  <li key={d.en}>{d[locale]}</li>
                ))}
              </ul>
            )}
            {subsections.map((s) => (
              <div key={s.title.en} className="mt-6">
                <h3 className="text-lg font-semibold text-white">{s.title[locale]}</h3>
                <p className="mt-2 leading-relaxed">{s.body[locale]}</p>
              </div>
            ))}
          </Section>
        )}
        {project.result && (
          <Section id="result" title={t.result}>
            <p className="mt-3 leading-relaxed">{project.result[locale]}</p>
          </Section>
        )}
      </div>

      {project.demo === "sort-visualizer" && (
        <section id="lab" aria-labelledby="lab-title" className="mt-16 scroll-mt-24">
          <h2 id="lab-title" className="text-2xl font-bold text-white">
            {dict.labs.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed">{dict.labs.intro}</p>
          <div className="mt-8">
            <SortVisualizer dict={dict} />
          </div>
        </section>
      )}

      {links.length > 0 && (
        <section aria-labelledby="links" className="mt-12">
          <h2 id="links" className="text-2xl font-bold text-white">
            {t.links}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a className="btn-ghost" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

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
