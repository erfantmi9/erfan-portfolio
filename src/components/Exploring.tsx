import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";

export function Exploring({ dict }: { dict: Dictionary }) {
  const t = dict.exploring;
  return (
    <section id="exploring" aria-labelledby="exploring-title" className="section">
      <Reveal className="max-w-3xl rounded-2xl border border-slate-800 bg-ink-900/50 p-7">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="exploring-title" className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-4 leading-relaxed text-slate-400">{t.body}</p>
      </Reveal>
    </section>
  );
}
