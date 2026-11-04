import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.projects;
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="work-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{t.intro}</p>
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={project} locale={locale} index={i} cta={t.viewCase} stackLabel={t.stack} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
