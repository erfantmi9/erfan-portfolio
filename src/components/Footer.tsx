import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";

export function Footer({ dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p className="mt-1 font-mono text-xs">{dict.footer.built}</p>
        </div>
        <ul className="flex items-center gap-5">
          <li>
            <a className="hover:text-neon" href={site.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="hover:text-neon" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="hover:text-neon" href="#main">
              {dict.footer.top} ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
