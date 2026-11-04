import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { spokenLanguages, workFacts, type WorkFacts } from "@/content/site";
import { Reveal } from "./Reveal";

const FACT_ORDER: readonly (keyof WorkFacts)[] = ["targetCities", "workModel", "permit", "startDate", "noticePeriod"];

export function Availability({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.availability;
  const facts = FACT_ORDER.flatMap((key) => {
    const value = workFacts[key];
    return value ? [{ key, label: t.labels[key], value: value[locale] }] : [];
  });
  const languages = spokenLanguages.flatMap((l) => (l.level ? [{ name: l.name[locale], level: l.level[locale] }] : []));

  return (
    <section id="availability" aria-labelledby="av-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="av-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-2xl border border-slate-800 bg-ink-900/50 p-7">
          <h3 className="text-xl font-bold text-amber-glow">{t.workTitle}</h3>
          <p className="mt-3 leading-relaxed text-slate-400">{t.workBody}</p>
          {facts.length > 0 && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.key}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-slate-400">{f.label}</dt>
                  <dd className="mt-1 text-slate-200">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        {languages.length > 0 && (
          <Reveal delay={0.1} className="rounded-2xl border border-slate-800 bg-ink-900/50 p-7">
            <h3 className="text-xl font-bold text-amber-glow">{t.langTitle}</h3>
            <ul className="mt-4 space-y-4">
              {languages.map((l) => (
                <li key={l.name} className="border-b border-slate-800 pb-3 last:border-0">
                  <p className="font-semibold text-white">{l.name}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{l.level}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
