import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";

export function BeyondWork({ dict }: { dict: Dictionary }) {
  const t = dict.beyond;
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="beyond-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {t.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.1} className="h-full rounded-2xl border border-slate-800 bg-ink-900/50 p-7">
              <h3 className="text-xl font-bold text-amber-glow">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
