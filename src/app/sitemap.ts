import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = (path: string) => ({
    ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
    "x-default": `${site.url}/${defaultLocale}${path}`,
  });

  return locales.flatMap((locale) => [
    {
      url: `${site.url}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: languages("") },
    },
    ...projects.map((p) => ({
      url: `${site.url}/${locale}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languages(`/work/${p.slug}`) },
    })),
  ]);
}
