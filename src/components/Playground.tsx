import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";

export function Playground({ dict }: { dict: Dictionary }) {
  const t = dict.playground;
  return (
    <section id="playground" aria-labelledby="pg-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="pg-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{t.intro}</p>
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {t.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 2) * 0.1} className="h-full rounded-2xl border border-slate-800 bg-ink-900/50 p-6">
              <h3 className="font-mono text-sm font-bold text-neon">
                <span aria-hidden className="text-slate-600">{String(i + 1).padStart(2, "0")} / </span>
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">{item.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded bg-ink-800 px-2 py-0.5 font-mono text-xs text-slate-300">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
