import type { Dictionary } from "@/i18n/dictionaries";
import { skills, type SkillLevel } from "@/content/site";
import { Reveal } from "./Reveal";

const LEVELS: readonly SkillLevel[] = ["daily", "familiar"];

export function Skills({ dict }: { dict: Dictionary }) {
  const t = dict.skills;
  const groups = LEVELS.map((level) => ({ level, label: t[level], items: skills.filter((s) => s.level === level) })).filter(
    (g) => g.items.length > 0,
  );
  if (groups.length === 0) return null;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="skills-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.level} delay={i * 0.1}>
            <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400">{g.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s.name} className="rounded-md border border-slate-800 px-3 py-1 font-mono text-xs text-slate-300">
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
