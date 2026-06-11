import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import {
  absoluteUrl,
  buildAlternates,
  LOCALES,
  SITE_URL,
  type Locale,
} from "./seo";

/** next-intl uses short codes — OG wants BCP-47. */
const OG_LOCALE: Record<string, string> = {
  en: "en_IN",
  hi: "hi_IN",
  mr: "mr_IN",
};

export interface BuildPageMetadataArgs {
  locale: Locale | string;
  /** Unprefixed route path, e.g. `/about` or `/`. */
  path: string;
  title: string;
  description: string;
  /** Optional override for the OG image (defaults to siteConfig.ogImage). */
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  asFullTitle?: boolean;
  publishedTime?: string;
}

/**
 * Builds a fully-populated Metadata object for any page:
 *   • Canonical + hreflang alternates
 *   • Title + description
 *   • Open Graph (title, description, url, siteName, locale, alternateLocale, image)
 *   • Twitter summary_large_image (with the same image)
 *   • Robots index/follow + Googlebot max-image-preview large
 */
export function buildPageMetadata(args: BuildPageMetadataArgs): Metadata {
  const {
    locale,
    path,
    title,
    description,
    ogImage = siteConfig.ogImage,
    ogType = "website",
    asFullTitle,
    publishedTime,
  } = args;

  const url = absoluteUrl(locale, path);
  const alternates = buildAlternates(locale, path);
  const ogLocale = OG_LOCALE[locale] ?? `${locale}_IN`;
  const alternateOgLocales = LOCALES.filter((l) => l !== locale).map(
    (l) => OG_LOCALE[l] ?? `${l}_IN`
  );
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  return {
    title: asFullTitle ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: ogLocale,
      alternateLocale: alternateOgLocales,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
