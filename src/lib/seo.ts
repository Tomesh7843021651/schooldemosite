/**
 * SEO primitives — locale-aware URL helpers used by metadata.ts,
 * schema.ts, sitemap.ts and robots.ts.
 */

import { siteConfig } from "@/constants/site";
import { routing } from "@/i18n/routing";

export const SITE_URL = siteConfig.url.replace(/\/$/, "");

export const LOCALES = routing.locales;
export type Locale = (typeof routing.locales)[number];

/**
 * Normalise a route path:
 *   `/`              → ``
 *   `about`          → `/about`
 *   `/about#process` → `/about` (hash stripped for canonical/hreflang)
 */
export function normalisePath(path: string): string {
  if (!path || path === "/") return "";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.split("#")[0].split("?")[0].replace(/\/$/, "");
}

export function localisedPath(locale: Locale | string, path: string): string {
  const cleaned = normalisePath(path);
  return `/${locale}${cleaned}`;
}

export function absoluteUrl(locale: Locale | string, path: string): string {
  return `${SITE_URL}${localisedPath(locale, path)}`;
}

/**
 * Build canonical + per-locale `alternates.languages` (with `x-default`)
 * for a given unprefixed path.
 */
export function buildAlternates(currentLocale: Locale | string, path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = localisedPath(locale, path);
  }
  languages["x-default"] = localisedPath(routing.defaultLocale, path);

  return {
    canonical: localisedPath(currentLocale, path),
    languages,
  };
}
