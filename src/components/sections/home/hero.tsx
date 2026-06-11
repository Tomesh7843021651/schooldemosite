"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  PlayCircleIcon,
  AwardIcon,
  UsersIcon,
  GraduationCapIcon,
  SparklesIcon,
} from "@/components/layout/icons";

/**
 * Premium homepage hero.
 *
 * Layout:
 *   • mobile  — visual on top, text below
 *   • desktop — 2-column (text left, visual right), ambient gradient backdrop
 *
 * Trust elements:
 *   • "Admissions Open" pill at the top
 *   • Twin CTAs (apply + tour)
 *   • Trust strip (year established / student count / board)
 *   • Floating result card overlay on the visual
 *
 * Motion: gentle stagger on first paint; respects prefers-reduced-motion.
 */

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const visual: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

export function Hero() {
  const t = useTranslations("home.hero");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-headline"
      className={cn(
        "relative overflow-hidden",
        "pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-20 lg:pb-32",
        "bg-[var(--color-background)]"
      )}
    >
      {/* Ambient gradient backdrop (static — no parallax/particles) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[20rem] h-[20rem] rounded-full bg-secondary/5 blur-3xl"
      />

      <Container>
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative"
        >
          {/* ---- Left column: copy + CTAs ---- */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div variants={reduce ? undefined : item}>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5",
                  "border border-secondary/30 bg-secondary/10 text-secondary",
                  "text-xs font-semibold uppercase tracking-[0.18em]"
                )}
              >
                <span
                  aria-hidden
                  className="relative inline-flex w-2 h-2"
                >
                  <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-60" />
                  <span className="relative inline-block w-2 h-2 rounded-full bg-secondary" />
                </span>
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              id="hero-headline"
              variants={reduce ? undefined : item}
              className="text-display font-display mt-6 text-balance text-foreground"
            >
              {t("headline")}{" "}
              <span className="text-primary">{t("headlineHighlight")}</span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : item}
              className="text-lead mt-6 max-w-xl text-pretty"
            >
              {t("description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reduce ? undefined : item}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link
                href={routes.admissions}
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-7 py-3.5 text-sm font-semibold",
                  "bg-primary text-primary-foreground shadow-md",
                  "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                {t("primaryCta")}
                <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href={routes.about}
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-full px-7 py-3.5 text-sm font-semibold",
                  "border border-border bg-[var(--color-surface)] text-foreground",
                  "hover:border-primary hover:text-primary transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <PlayCircleIcon size={16} />
                {t("secondaryCta")}
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.ul
              variants={reduce ? undefined : item}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              <TrustItem icon={<AwardIcon size={16} />}>
                {t("trust.established")}
              </TrustItem>
              <TrustItem icon={<UsersIcon size={16} />}>
                {t("trust.students")}
              </TrustItem>
              <TrustItem icon={<GraduationCapIcon size={16} />}>
                {t("trust.board")}
              </TrustItem>
            </motion.ul>
          </div>

          {/* ---- Right column: premium visual ---- */}
          <motion.div
            variants={reduce ? undefined : visual}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Trust strip item                                                   *
 * ------------------------------------------------------------------ */
function TrustItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
      <span className="text-primary">{icon}</span>
      <span className="font-medium text-foreground/80">{children}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * HeroVisual                                                         *
 *                                                                    *
 * Designed gradient card. Drop a real photo in `public/images/hero/` *
 * and swap the inner `<div>` for `<Image src=...>` when available.   *
 * ------------------------------------------------------------------ */
function HeroVisual() {
  const t = useTranslations("home.hero.visual");

  return (
    <div className="relative">
      {/* Main premium card */}
      <div
        className={cn(
          "relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]",
          "rounded-3xl overflow-hidden shadow-premium",
          "bg-gradient-to-br from-primary via-primary/90 to-accent"
        )}
      >
        {/* Watermark letter */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center select-none",
            "text-primary-foreground/10 font-display",
            "text-[14rem] sm:text-[18rem] lg:text-[20rem] leading-none"
          )}
        >
          {t("watermark")}
        </div>

        {/* Decorative glow */}
        <span
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary/30 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />

        {/* Brand line at the bottom */}
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
          <div className="text-eyebrow !text-primary-foreground/70">
            {t("eyebrow")}
          </div>
          <div className="font-display text-2xl md:text-3xl text-primary-foreground mt-2 text-balance">
            {t("campus")}
          </div>
          <div className="text-sm text-primary-foreground/80 mt-2 max-w-xs text-pretty">
            {t("subtitle")}
          </div>
        </div>
      </div>

      {/* Floating "Admissions Open" badge */}
      <div
        className={cn(
          "absolute -top-4 right-6 md:right-8 z-10",
          "inline-flex items-center gap-2 rounded-full",
          "bg-secondary text-secondary-foreground",
          "px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]",
          "shadow-lg border border-secondary/50"
        )}
      >
        <SparklesIcon size={14} />
        <span>2026 – 27</span>
      </div>

      {/* Floating board-result card.
          Moved to the middle-left edge so it sits over the watermark / gradient
          zone instead of the bottom-left text block. Symmetric counterpart to
          the top-right "Admissions Open" badge. */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 z-10 max-w-[220px]",
          "-left-3 sm:-left-4 md:-left-10",
          "rounded-2xl p-5 shadow-premium",
          "bg-[var(--color-surface)]/35 backdrop-blur-xl",
          "border border-white/30 ring-1 ring-white/10",
          "supports-[backdrop-filter]:bg-[var(--color-surface)]/25"
        )}
      >
        <div className="text-eyebrow text-white drop-shadow-sm">
          {t("floatingResult")}
        </div>
        <div className="flex items-baseline gap-1 mt-2">
          <div className="font-display text-5xl text-white leading-none drop-shadow-md">
            98
          </div>
          <div className="font-display text-2xl text-secondary leading-none drop-shadow-md">
            %
          </div>
        </div>
        <div className="text-xs text-white/85 mt-2 drop-shadow-sm">
          {t("floatingResultNote")}
        </div>
      </div>
    </div>
  );
}
