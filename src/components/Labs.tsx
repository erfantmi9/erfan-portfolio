import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";
import { SortVisualizer } from "./SortVisualizer";

export function Labs({ dict }: { dict: Dictionary }) {
  const t = dict.labs;
  return (
    <section id="labs" aria-labelledby="labs-title" className="section">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="labs-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{t.intro}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <SortVisualizer dict={dict} />
      </Reveal>
    </section>
  );
}
