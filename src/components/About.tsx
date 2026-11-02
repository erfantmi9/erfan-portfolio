import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";

export function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="about-title" className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-5 text-lg leading-relaxed text-slate-400">
          {t.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <ul className="grid gap-4">
          {t.principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="rounded-xl border border-slate-800 bg-ink-900/50 p-5">
                <h3 className="font-mono text-sm font-bold text-neon">{p.title}</h3>
                <p className="mt-2 text-slate-400">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
