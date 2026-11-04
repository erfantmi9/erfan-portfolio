"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const rest = pathname.split("/").slice(2).join("/");

  // The hash is not visible to the server, so it is appended on click: switching language keeps the current section.
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    router.push(`${href}${window.location.hash}`);
  };

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-mono text-xs">
      {locales.map((l) => {
        const href = `/${l}${rest ? `/${rest}` : ""}`;
        return (
          <Link
            key={l}
            href={href}
            hrefLang={l}
            lang={l}
            onClick={(e) => go(e, href)}
            aria-current={l === locale ? "true" : undefined}
            className={`rounded px-2 py-1 uppercase transition-colors ${
              l === locale ? "bg-neon/15 text-neon" : "text-slate-400 hover:text-white"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
