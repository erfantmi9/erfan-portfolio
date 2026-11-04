"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { algorithmIds, buildSteps, complexity, createArray, type AlgorithmId } from "@/lib/sorting";

const SIZE = 24;
const speeds = [
  { id: "slow", ms: 220 },
  { id: "normal", ms: 90 },
  { id: "fast", ms: 25 },
] as const;

export function SortVisualizer({ dict }: { dict: Dictionary }) {
  const t = dict.labs;
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("bubble");
  const [seed, setSeed] = useState(7);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof speeds)[number]["id"]>("normal");

  const steps = useMemo(() => buildSteps(algorithm, createArray(SIZE, seed)), [algorithm, seed]);
  const last = steps.length - 1;
  const current = steps[Math.min(index, last)];
  const done = index >= last;
  const delay = speeds.find((s) => s.id === speed)?.ms ?? 90;

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setIndex((i) => Math.min(i + 1, last)), delay);
    return () => window.clearTimeout(id);
  }, [playing, index, last, delay]);

  const restart = () => {
    setPlaying(false);
    setIndex(0);
  };
  const status = done ? t.sorted : current?.pair ? (current.swapped ? t.swapping : t.comparing) : t.idle;

  const chartState = `${t.stepOf} ${Math.min(index, last)} ${t.of} ${last}: ${status}. ${t.arrayLabel}: ${
    current?.values.join(", ") ?? ""
  }`;

  const barColor = (i: number): string => {
    if (done) return "fill-emerald-400";
    if (current?.pair?.includes(i)) return current.swapped ? "fill-amber-400" : "fill-sky-400";
    return "fill-slate-600";
  };

  const w = 100 / SIZE;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-ink-900/70 shadow-glow">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 p-4">
        <label className="flex items-center gap-2 text-sm text-slate-400">
          <span>{t.algorithmLabel}</span>
          <select
            value={algorithm}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmId);
              restart();
            }}
            className="rounded-md border border-slate-700 bg-ink-950 px-2 py-1.5 font-mono text-sm text-slate-100"
          >
            {algorithmIds.map((id) => (
              <option key={id} value={id}>
                {t.algorithms[id]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-400">
          <span>{t.speed}</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value as (typeof speeds)[number]["id"])}
            className="rounded-md border border-slate-700 bg-ink-950 px-2 py-1.5 font-mono text-sm text-slate-100"
          >
            {speeds.map((s) => (
              <option key={s.id} value={s.id}>
                {t.speeds[s.id]}
              </option>
            ))}
          </select>
        </label>

        <p className="ml-auto font-mono text-xs text-slate-400">
          {t.complexity}: <span className="text-amber-glow">{complexity[algorithm]}</span>
        </p>
      </div>

      <svg
        role="img"
        aria-label={t.chartLabel}
        aria-describedby="sort-chart-state"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        className="h-64 w-full bg-ink-950/60 p-3 sm:h-80"
      >
        {current?.values.map((v, i) => {
          const h = (v / SIZE) * 46;
          return (
            <rect
              key={i}
              x={i * w + w * 0.12}
              y={48 - h}
              width={w * 0.76}
              height={h}
              rx={0.4}
              className={`${barColor(i)} transition-[fill] duration-100`}
            />
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 p-4">
        <button
          type="button"
          className="btn-primary px-4 py-2"
          onClick={() => {
            if (done) setIndex(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? t.pause : t.play}
        </button>
        <button
          type="button"
          className="btn-ghost px-4 py-2"
          disabled={done}
          onClick={() => {
            setPlaying(false);
            setIndex((i) => Math.min(i + 1, last));
          }}
        >
          {t.step} →
        </button>
        <button type="button" className="btn-ghost px-4 py-2" onClick={restart}>
          {t.reset}
        </button>
        <button
          type="button"
          className="btn-ghost px-4 py-2"
          onClick={() => {
            setSeed((s) => s + 1);
            restart();
          }}
        >
          {t.shuffle}
        </button>

        <p className="ml-auto font-mono text-xs text-slate-400">
          <span className={done ? "text-emerald-400" : current?.swapped ? "text-amber-glow" : "text-neon"}>{status}</span>
          {" · "}
          {t.stepOf} {Math.min(index, last)}/{last}
        </p>
      </div>

      {/* Text alternative for the chart. Announced politely only while playback is stopped, so playing is not noisy. */}
      <p id="sort-chart-state" className="sr-only" aria-live="polite" aria-atomic="true">
        {playing ? "" : chartState}
      </p>
    </div>
  );
}
