"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "./icons";

/**
 * Reusable inner-page hero banner.
 *
 *   • Sits directly below the (fixed) Navbar — internal padding clears it.
 *   • Ambient brand glows + decorative watermark for premium continuity
 *     with the homepage Hero.
 *   • Breadcrumb is keyboard navigable and uses next-intl locale routing.
 *   • Server-friendly: animations run client-side via Framer Motion,
 *     stripped under `prefers-reduced-motion`.
 */

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  /** When set, a giant watermark glyph is rendered behind the title. */
  watermark?: React.ReactNode;
  className?: string;
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumbs,
  watermark = "N",
  className,
}: PageBannerProps) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="page-banner-title"
      className={cn(
        "relative overflow-hidden",
        "pt-32 pb-14 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24",
        "bg-gradient-to-br from-primary/8 via-[var(--color-background)] to-accent/8",
        className
      )}
    >
      {/* Ambient glows */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/12 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      {/* Watermark */}
      {watermark ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-0 top-12 md:top-8 select-none",
            "font-display leading-none text-primary/[0.04]",
            "text-[14rem] md:text-[20rem] lg:text-[26rem]"
          )}
        >
          {watermark}
        </span>
      ) : null}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="max-w-3xl"
        >
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <motion.nav
              aria-label="Breadcrumb"
              variants={reduce ? undefined : item}
              className="mb-6"
            >
              <ol className="flex flex-wrap items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li
                      key={`${crumb.label}-${i}`}
                      className="inline-flex items-center gap-2"
                    >
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className={cn(
                            "text-[var(--color-muted-foreground)] hover:text-primary transition-colors",
                            "focus-visible:outline-none focus-visible:text-primary"
                          )}
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          aria-current={isLast ? "page" : undefined}
                          className={cn(
                            "font-medium",
                            isLast
                              ? "text-foreground"
                              : "text-[var(--color-muted-foreground)]"
                          )}
                        >
                          {crumb.label}
                        </span>
                      )}
                      {!isLast ? (
                        <ArrowRightIcon
                          size={12}
                          className="text-[var(--color-muted-foreground)]/60"
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </motion.nav>
          ) : null}

          {eyebrow ? (
            <motion.span
              variants={reduce ? undefined : item}
              className="text-eyebrow inline-flex items-center gap-2"
            >
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-current opacity-60"
              />
              {eyebrow}
            </motion.span>
          ) : null}

          <motion.h1
            id="page-banner-title"
            variants={reduce ? undefined : item}
            className={cn(
              "font-display text-balance mt-4 text-foreground",
              "text-[clamp(2.25rem,4vw+1rem,4rem)] leading-tight"
            )}
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              variants={reduce ? undefined : item}
              className="text-lead mt-5 max-w-2xl text-pretty"
            >
              {description}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Helper for the canonical "Home → <page>" breadcrumb trail. Pass the
 * `current` label and the next-intl-prefixed href will be inferred.
 */
export function defaultBreadcrumbs(
  homeLabel: string,
  current: { label: string }
): Breadcrumb[] {
  return [
    { label: homeLabel, href: routes.home },
    { label: current.label },
  ];
}
