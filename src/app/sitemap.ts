import type { MetadataRoute } from "next";
import { routes } from "@/constants/routes";
import { LOCALES, SITE_URL, localisedPath } from "@/lib/seo";

/**
 * Multilingual sitemap. Emits one entry per (path × locale) and includes
 * `alternates.languages` (with `x-default`) on every entry so search
 * engines can discover all translations of the same page.
 */
const PATHS: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: routes.home, priority: 1.0, changeFrequency: "weekly" },
  { path: routes.about, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.academics, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.facilities, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.gallery, priority: 0.6, changeFrequency: "weekly" },
  { path: routes.admissions, priority: 0.9, changeFrequency: "weekly" },
  { path: routes.contact, priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap(({ path, priority, changeFrequency }) => {
    const languageAlternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      languageAlternates[locale] = `${SITE_URL}${localisedPath(locale, path)}`;
    }
    languageAlternates["x-default"] = `${SITE_URL}${localisedPath("en", path)}`;

    return LOCALES.map((locale) => ({
      url: `${SITE_URL}${localisedPath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates },
    }));
  });
}
