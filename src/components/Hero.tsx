"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-screen items-center overflow-hidden pt-16">
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-neon/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <motion.div style={{ y: textY }} className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">{dict.hero.greeting}</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Erfan <span className="text-neon">Teymuri</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-amber-glow sm:text-2xl">{dict.hero.role}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{dict.hero.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}#work`} className="btn-primary">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}#labs`} className="btn-ghost">
              {dict.hero.ctaLab}
            </Link>
            <Link href={`/${locale}#contact`} className="btn-ghost">
              {dict.hero.ctaSecondary}
            </Link>
            {site.cvPath && (
              <a href={site.cvPath} download className="btn-ghost">
                {dict.hero.cv} ↓
              </a>
            )}
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <span aria-hidden className="h-2 w-2 rounded-full bg-neon shadow-glow" />
            {dict.hero.available}
          </p>
          <p className="mt-2 pl-4 font-mono text-xs text-slate-500">{dict.hero.languages}</p>
        </div>

        <figure
          className="overflow-hidden rounded-xl border border-slate-800 bg-ink-900/80 shadow-glow"
          aria-label="Code snippet describing Erfan"
        >
          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
            <span aria-hidden className="h-3 w-3 rounded-full bg-red-400/80" />
            <span aria-hidden className="h-3 w-3 rounded-full bg-amber-glow/80" />
            <span aria-hidden className="h-3 w-3 rounded-full bg-neon/80" />
            <figcaption className="ml-3 font-mono text-xs text-slate-500">erfan.ts</figcaption>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
            <code>
              <span className="text-violet-400">const</span> <span className="text-sky-300">erfan</span>
              {" = {\n"}
              {"  "}role: <span className="text-amber-glow">&quot;Frontend Engineer&quot;</span>,{"\n"}
              {"  "}stack: [<span className="text-neon">&quot;React 19&quot;</span>,{" "}
              <span className="text-neon">&quot;Next.js 15&quot;</span>,{"\n"}
              {"          "}
              <span className="text-neon">&quot;TypeScript&quot;</span>],{"\n"}
              {"  "}focus: <span className="text-amber-glow">&quot;performance · AI-native UI&quot;</span>,{"\n"}
              {"  "}languages: [<span className="text-neon">&quot;en&quot;</span>,{" "}
              <span className="text-neon">&quot;de&quot;</span>],{"\n"}
              {"  "}based: <span className="text-amber-glow">&quot;{site.location}&quot;</span>,{"\n"}
              {"};"}
              <span aria-hidden className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-neon animate-blink" />
            </code>
          </pre>
        </figure>
      </motion.div>
    </section>
  );
}
