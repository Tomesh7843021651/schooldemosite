/**
 * Canonical route table.
 *
 * Always import from here instead of hard-coding paths so the navbar,
 * footer, sitemap and breadcrumbs stay in sync.
 *
 * Locale prefixes (`/en`, `/hi`, `/mr`) are added by next-intl middleware,
 * so the values here are unprefixed.
 */

export const routes = {
  home: "/",
  about: "/about",
  academics: "/academics",
  facilities: "/facilities",
  gallery: "/gallery",
  admissions: "/admissions",
  contact: "/contact",
} as const;

export type RouteKey = keyof typeof routes;
export type RoutePath = (typeof routes)[RouteKey];

export interface NavItem {
  key: RouteKey;
  href: RoutePath;
  /** i18n key under `navbar.*` in `src/messages/<locale>.json` */
  labelKey: `navbar.${RouteKey}`;
}

export const primaryNav: NavItem[] = [
  { key: "home", href: routes.home, labelKey: "navbar.home" },
  { key: "about", href: routes.about, labelKey: "navbar.about" },
  { key: "academics", href: routes.academics, labelKey: "navbar.academics" },
  { key: "facilities", href: routes.facilities, labelKey: "navbar.facilities" },
  { key: "gallery", href: routes.gallery, labelKey: "navbar.gallery" },
  { key: "admissions", href: routes.admissions, labelKey: "navbar.admissions" },
  { key: "contact", href: routes.contact, labelKey: "navbar.contact" },
];

export const footerNav = {
  explore: primaryNav.filter((i) => i.key !== "home"),
} as const;
