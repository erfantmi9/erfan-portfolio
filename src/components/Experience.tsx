import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { timeline } from "@/content/site";
import { Reveal } from "./Reveal";

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.experience;
  if (timeline.length === 0) return null;
  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="exp-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>

      <ol className="mt-12 max-w-3xl space-y-8 border-l border-slate-800 pl-6">
        {timeline.map((entry) => (
          <li key={entry.org.en} className="relative">
            <span aria-hidden className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-neon shadow-glow" />
            {entry.period && <p className="font-mono text-xs text-neon">{entry.period[locale]}</p>}
            <h3 className="mt-1 text-lg font-bold text-white">
              {entry.title ? (
                <>
                  {entry.title[locale]} · <span className="text-slate-400">{entry.org[locale]}</span>
                </>
              ) : (
                entry.org[locale]
              )}
            </h3>
            <p className="mt-2 text-slate-400">{entry.summary[locale]}</p>
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-400">
                {entry.highlights.map((h) => (
                  <li key={h.en}>{h[locale]}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
