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
  CheckIcon,
  HeartIcon,
  BookIcon,
  GraduationCapIcon,
} from "@/components/layout/icons";

/**
 * Three academic phases — Pre-Primary / Primary / Secondary.
 *
 * Each card has a distinct brand-gradient header, an icon chip, an age-range
 * pill, three feature bullets and an "Explore curriculum" affordance.
 * Image-ready: swap the gradient `<header>` for an `<Image fill />` when
 * real photography is available.
 */

type LevelKey = "prePrimary" | "primary" | "secondary";

type Level = {
  key: LevelKey;
  /** Tailwind-safe header background utility (no JIT string concatenation). */
  headerClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const LEVELS: Level[] = [
  {
    key: "prePrimary",
    headerClass:
      "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
    icon: HeartIcon,
  },
  {
    key: "primary",
    headerClass:
      "bg-gradient-to-br from-primary via-primary/80 to-accent",
    icon: BookIcon,
  },
  {
    key: "secondary",
    headerClass:
      "bg-gradient-to-br from-primary via-primary/90 to-foreground/80",
    icon: GraduationCapIcon,
  },
];

const FEATURE_KEYS = ["f1", "f2", "f3"] as const;

export function AcademicPreview() {
  const t = useTranslations("home.academicPreview");

  return (
    <section
      aria-labelledby="academic-preview-title"
      className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={
            <span id="academic-preview-title">{t("title")}</span>
          }
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {LEVELS.map((level, i) => (
            <LevelCard
              key={level.key}
              level={level}
              index={i}
              exploreLabel={t("exploreCta")}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <Link
            href={routes.academics}
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
 * LevelCard                                                          *
 * ------------------------------------------------------------------ */
function LevelCard({
  level,
  index,
  exploreLabel,
}: {
  level: Level;
  index: number;
  exploreLabel: string;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.academicPreview.items.${level.key}`);
  const Icon = level.icon;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "shadow-sm hover-lift"
      )}
    >
      {/* ---- Header (image-ready) ---- */}
      <header
        className={cn(
          "relative aspect-[16/9] overflow-hidden",
          level.headerClass
        )}
      >
        <span
          aria-hidden
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-foreground/15 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-foreground/10 blur-3xl"
        />

        {/* Age pill */}
        <span
          className={cn(
            "absolute top-5 left-5 inline-flex items-center gap-2",
            "rounded-full bg-[var(--color-surface)]/95 backdrop-blur-md",
            "px-3.5 py-1.5 text-xs font-semibold",
            "text-foreground shadow-md border border-border/40"
          )}
        >
          {t("ageRange")}
        </span>

        {/* Icon chip */}
        <span
          className={cn(
            "absolute top-5 right-5 inline-flex items-center justify-center",
            "w-11 h-11 rounded-2xl bg-primary-foreground/15 backdrop-blur-md",
            "text-primary-foreground border border-primary-foreground/20"
          )}
          aria-hidden
        >
          <Icon size={22} />
        </span>

        {/* Bottom title strip */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="text-eyebrow !text-primary-foreground/80">
            {t("tagline")}
          </div>
          <div className="font-display text-2xl md:text-3xl text-primary-foreground mt-1">
            {t("title")}
          </div>
        </div>
      </header>

      {/* ---- Body ---- */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <p className="text-sm md:text-[15px] text-[var(--color-muted-foreground)] leading-relaxed text-pretty">
          {t("description")}
        </p>

        <ul className="mt-5 space-y-2.5">
          {FEATURE_KEYS.map((fk) => (
            <li
              key={fk}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0"
              >
                <CheckIcon size={12} />
              </span>
              <span>{t(`features.${fk}`)}</span>
            </li>
          ))}
        </ul>

        <Link
          href={routes.academics}
          className={cn(
            "group/cta mt-7 inline-flex items-center gap-1.5 self-start",
            "text-sm font-semibold text-primary",
            "hover:text-primary/80 transition-colors",
            "focus-visible:outline-none focus-visible:underline"
          )}
        >
          {exploreLabel}
          <ArrowRightIcon
            size={14}
            className="transition-transform group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}
