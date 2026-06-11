/**
 * JSON-LD structured data builders.
 *
 * Emits (separately): Organization, EducationalOrganization/School,
 * WebSite, WebPage, BreadcrumbList, FAQPage.
 */

import { siteConfig } from "@/constants/site";
import { absoluteUrl, SITE_URL, type Locale } from "./seo";

export type JsonLdValue = Record<string, unknown>;

/* ------------------------------------------------------------------ */
export function organizationSchema(): JsonLdValue {
  const sameAs = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
  ].filter((u) => typeof u === "string" && u.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.short,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}${siteConfig.ogImage}`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: postalAddress(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "admissions",
        email: siteConfig.contact.email,
        areaServed: siteConfig.address.region,
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/* ------------------------------------------------------------------ */
export function schoolSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "@id": `${SITE_URL}#school`,
    name: siteConfig.name,
    alternateName: siteConfig.short,
    description: siteConfig.description,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}${siteConfig.ogImage}`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: postalAddress(),
    foundingDate: "2001",
    parentOrganization: { "@id": `${SITE_URL}#organization` },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "14:30",
    },
    department: [
      educationalProgram("Pre-Primary", "Ages 3–5 — Nursery, LKG, UKG"),
      educationalProgram("Primary", "Grades 1–5"),
      educationalProgram("Secondary", "Grades 6–10"),
    ],
  };
}

function educationalProgram(name: string, description: string): JsonLdValue {
  return {
    "@type": "EducationalOccupationalProgram",
    name,
    description,
    provider: { "@id": `${SITE_URL}#school` },
  };
}

function postalAddress(): JsonLdValue {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

/* ------------------------------------------------------------------ */
export function websiteSchema(locale: Locale | string): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

/* ------------------------------------------------------------------ */
export function webPageSchema(args: {
  locale: Locale | string;
  path: string;
  title: string;
  description: string;
}): JsonLdValue {
  const { locale, path, title, description } = args;
  const url = absoluteUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#school` },
  };
}

/* ------------------------------------------------------------------ */
export interface BreadcrumbInput {
  name: string;
  path: string;
}

export function breadcrumbSchema(
  locale: Locale | string,
  items: BreadcrumbInput[]
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(locale, it.path),
    })),
  };
}

/* ------------------------------------------------------------------ */
export interface FaqInput {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqInput[]): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}
