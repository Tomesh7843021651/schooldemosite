/**
 * Narayanleela design tokens.
 *
 * Single source of truth for brand colors, radii, shadows, motion, and breakpoints.
 * Hex/ms values mirror the CSS custom properties in `src/styles/variables.css`
 * so they can be consumed from TS (analytics, charts, meta tags, OG images).
 */

export const brand = {
  name: "Narayanleela English Medium School",
  short: "Narayanleela",
  tagline: "Nurturing Young Minds, Building Future Leaders",
} as const;

export const palette = {
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    foreground: "#111827",
    mutedForeground: "#475569",
    border: "#E5E7EB",
    primary: "#0F4C81",
    primaryForeground: "#FFFFFF",
    secondary: "#D4A017",
    secondaryForeground: "#1F1300",
    accent: "#2A9D8F",
    accentForeground: "#FFFFFF",
    ring: "#0F4C81",
  },
  dark: {
    background: "#24112D",
    surface: "#30193D",
    surfaceMuted: "#3A1F49",
    foreground: "#F9FAFB",
    mutedForeground: "#C5B6D0",
    border: "#43304D",
    primary: "#6FA8FF",
    primaryForeground: "#0B1B33",
    secondary: "#F4C95D",
    secondaryForeground: "#2A1B00",
    accent: "#4FC3B3",
    accentForeground: "#0B1F1C",
    ring: "#6FA8FF",
  },
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  card: "1rem",
  premium: "1.5rem",
  pill: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(15 76 129 / 0.06)",
  md: "0 4px 12px -2px rgb(15 76 129 / 0.10)",
  lg: "0 18px 40px -16px rgb(15 76 129 / 0.18)",
  premium: "0 30px 60px -24px rgb(15 76 129 / 0.25)",
} as const;

export const motion = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1] as const,
    enter: [0.16, 1, 0.3, 1] as const,
  },
} as const;

export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;

export const layout = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  sectionSpacing: "py-16 md:py-24 lg:py-32",
  cardRadius: "rounded-2xl",
  premiumRadius: "rounded-3xl",
} as const;

export type Palette = typeof palette.light;
export type ThemeMode = keyof typeof palette;
