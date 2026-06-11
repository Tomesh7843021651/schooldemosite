/**
 * Site-wide configuration consumed by SEO, structured data, the footer,
 * the navbar and contact components.
 *
 * Replace the TODO values with the real numbers once they are finalized.
 */

import { brand } from "./theme";

export const siteConfig = {
  name: brand.name,
  short: brand.short,
  tagline: brand.tagline,
  description:
    "Narayanleela English Medium School in Arni offers premium English-medium education from Pre-Primary to Secondary with safe campus, smart classrooms, and a focus on academic excellence.",
  url: "https://narayanleela.school",
  ogImage: "/images/common/og-image.jpg",
  locale: {
    default: "en",
    supported: ["en", "hi", "mr"] as const,
  },
  contact: {
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    whatsapp: "+91 00000 00000",
    whatsappHref: "https://wa.me/910000000000",
    email: "admissions@narayanleela.school",
    emailHref: "mailto:admissions@narayanleela.school",
  },
  address: {
    street: "Narayanleela Campus",
    locality: "Arni",
    region: "Maharashtra",
    postalCode: "445103",
    country: "IN",
    mapsQuery: "Narayanleela English Medium School, Arni, Maharashtra",
  },
  hours: {
    schoolDays: "Mon - Sat",
    schoolTime: "8:00 AM - 2:30 PM",
    officeTime: "8:00 AM - 4:00 PM",
  },
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  admissions: {
    grades: "Pre-Primary to Secondary",
    medium: "English",
    board: "State Board",
    ctaHref: "/admissions",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type SupportedLocale = (typeof siteConfig.locale.supported)[number];
