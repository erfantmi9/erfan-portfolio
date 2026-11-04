import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { site } from "@/content/site";

const ogLocale: Record<Locale, string> = { en: "en_US", de: "de_AT" };

interface PageSeo {
  locale: Locale;
  /** Path after the locale, "" for the home page, otherwise starting with "/". */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

/** Canonical, hreflang alternates (incl. x-default), Open Graph and Twitter tags for one page. */
export function pageMetadata({ locale, path, title, description, noindex }: PageSeo): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  languages["x-default"] = `/${defaultLocale}${path}`;
  // Child segments that set openGraph do not inherit the file-based image, so it is referenced explicitly.
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: title };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: site.name,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
