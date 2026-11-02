"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}#experience`, label: dict.nav.experience },
    { href: `/${locale}#beyond`, label: dict.nav.beyond },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-ink-950/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href={`/${locale}`} className="font-mono text-sm font-bold text-white">
          <span className="text-neon">~/</span>erfan
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </nav>

        <button
          type="button"
          className="rounded-md border border-slate-700 px-3 py-1.5 font-mono text-xs text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? dict.nav.close : dict.nav.menu}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-800 bg-ink-950 px-5 py-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-slate-200 hover:bg-ink-800"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 px-2">
              <LanguageSwitcher locale={locale} label={dict.nav.language} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
