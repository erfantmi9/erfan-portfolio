import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";
import { SortVisualizer } from "./SortVisualizer";

/** Rendered inside "Selected work", not as a top-level section. Keeps id="labs" so existing deep links still work. */
export function Labs({ dict }: { dict: Dictionary }) {
  const t = dict.labs;
  return (
    <div id="labs" role="region" aria-labelledby="labs-title" className="mt-20">
      <Reveal>
        <p className="eyebrow">{t.eyebrow}</p>
        <h3 id="labs-title" className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {t.title}
        </h3>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{t.intro}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <SortVisualizer dict={dict} />
      </Reveal>
    </div>
  );
}
