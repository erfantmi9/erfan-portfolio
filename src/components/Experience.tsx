import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { skills, timeline } from "@/content/site";
import { Reveal } from "./Reveal";

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.experience;
  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="exp-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-slate-500">{t.timelineTitle}</h3>
          <ol className="mt-6 space-y-8 border-l border-slate-800 pl-6">
            {timeline.map((entry) => (
              <li key={entry.org.en} className="relative">
                <span aria-hidden className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-neon shadow-glow" />
                {entry.period && <p className="font-mono text-xs text-neon">{entry.period[locale]}</p>}
                <h4 className="mt-1 text-lg font-bold text-white">
                  {entry.title ? (
                    <>
                      {entry.title[locale]} · <span className="text-slate-400">{entry.org[locale]}</span>
                    </>
                  ) : (
                    entry.org[locale]
                  )}
                </h4>
                <p className="mt-2 text-slate-400">{entry.summary[locale]}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-slate-500">{t.skillsTitle}</h3>
          <div className="mt-6 space-y-6">
            {skills.map((group) => (
              <div key={group.label.en}>
                <h4 className="text-sm font-semibold text-slate-200">{group.label[locale]}</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-md border border-slate-800 px-3 py-1 font-mono text-xs text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
