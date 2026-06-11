"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container, SectionTitle } from "@/components/ui";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  TrophyIcon,
  SparklesIcon,
  StarIcon,
  CompassIcon,
} from "@/components/layout/icons";

/**
 * Beyond-the-classroom showcase. Cinematic 2×2 cards (1 col mobile, 2 col
 * lg) — each card is full-bleed gradient with a category pill, icon chip,
 * watermark numeral and an overlay block holding title + description.
 *
 * Image-ready: replace each `<header>` gradient with `<Image fill ... />`
 * once campus photography is available.
 */

type CategoryKey = "sports" | "arts" | "culture" | "outdoors";

type Category = {
  key: CategoryKey;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headerClass: string;
};

const CATEGORIES: Category[] = [
  {
    key: "sports",
    icon: TrophyIcon,
    headerClass:
      "bg-gradient-to-br from-accent via-accent/80 to-primary/70",
  },
  {
    key: "arts",
    icon: SparklesIcon,
    headerClass:
      "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  },
  {
    key: "culture",
    icon: StarIcon,
    headerClass:
      "bg-gradient-to-br from-primary via-primary/85 to-secondary/70",
  },
  {
    key: "outdoors",
    icon: CompassIcon,
    headerClass:
      "bg-gradient-to-br from-primary/80 via-accent/75 to-foreground/70",
  },
];

export function StudentLife() {
  const t = useTranslations("home.studentLife");

  return (
    <section
      aria-labelledby="student-life-title"
      className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="student-life-title">{t("title")}</span>}
          description={t("description")}
          align="left"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.key} category={c} index={i} />
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center md:justify-start">
          <Link
            href={routes.gallery}
            className={cn(
              "group inline-flex items-center gap-2",
              "rounded-full px-6 py-3 text-sm font-semibold",
              "border border-border bg-[var(--color-surface)] text-foreground",
              "hover:border-primary hover:text-primary transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            {t("viewAllCta")}
            <ArrowRightIcon
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * CategoryCard                                                       *
 * ------------------------------------------------------------------ */
function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.studentLife.items.${category.key}`);
  const Icon = category.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative overflow-hidden",
        "rounded-3xl border border-border shadow-md hover-lift"
      )}
    >
      {/* Full-bleed gradient (image-ready) */}
      <div
        className={cn(
          "relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[5/4] overflow-hidden",
          category.headerClass
        )}
      >
        {/* Watermark numeral */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center select-none",
            "font-display text-primary-foreground/10",
            "text-[10rem] md:text-[14rem] leading-none"
          )}
        >
          {number}
        </div>

        {/* Glow accents */}
        <span
          aria-hidden
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary-foreground/15 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-foreground/10 blur-3xl"
        />

        {/* Category pill */}
        <span
          className={cn(
            "absolute top-5 left-5 inline-flex items-center gap-2",
            "rounded-full bg-[var(--color-surface)]/95 backdrop-blur-md",
            "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
            "text-foreground shadow-md border border-border/40"
          )}
        >
          {t("tag")}
        </span>

        {/* Icon chip */}
        <span
          aria-hidden
          className={cn(
            "absolute top-5 right-5 inline-flex items-center justify-center",
            "w-12 h-12 rounded-2xl",
            "bg-primary-foreground/15 backdrop-blur-md",
            "text-primary-foreground border border-primary-foreground/20",
            "group-hover:bg-primary-foreground/25 transition-colors duration-300"
          )}
        >
          <Icon size={22} />
        </span>

        {/* Bottom overlay block */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl text-primary-foreground text-balance">
            {t("title")}
          </h3>
          <p className="text-sm md:text-base text-primary-foreground/85 mt-3 max-w-md leading-relaxed text-pretty">
            {t("description")}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
