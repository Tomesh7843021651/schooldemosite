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
  MonitorIcon,
  CpuIcon,
  BeakerIcon,
  BookIcon,
  TrophyIcon,
  BusIcon,
} from "@/components/layout/icons";

/**
 * Premium bento grid of campus facilities.
 *
 *   lg layout (12 col grid)
 *     row 1-2 : Smart Classrooms (col-span-7, row-span-2) | Computer (col-span-5)
 *     row 2   :                                             | Science  (col-span-5)
 *     row 3   : Library (col-span-4)  | Sports (col-span-4) | Transport (col-span-4)
 *
 *   md fallback : 2 columns
 *   mobile      : single column
 *
 * Image-ready: the gradient `<header>` of each card is the placeholder zone.
 * Drop a real photo into `/public/images/facilities/` and replace with
 * `<Image fill ... />`.
 */

type FacilityKey =
  | "smartClassrooms"
  | "computerLab"
  | "scienceLab"
  | "library"
  | "sports"
  | "transportation";

type Facility = {
  key: FacilityKey;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** Bento placement utilities (applied on lg+). */
  span: string;
  /** Header gradient utility. */
  headerClass: string;
  /** When true, render the featured "big card" variant. */
  featured?: boolean;
};

const FACILITIES: Facility[] = [
  {
    key: "smartClassrooms",
    icon: MonitorIcon,
    span: "lg:col-span-7 lg:row-span-2",
    headerClass:
      "bg-gradient-to-br from-primary via-primary/90 to-accent",
    featured: true,
  },
  {
    key: "computerLab",
    icon: CpuIcon,
    span: "lg:col-span-5",
    headerClass:
      "bg-gradient-to-br from-accent via-accent/85 to-primary/70",
  },
  {
    key: "scienceLab",
    icon: BeakerIcon,
    span: "lg:col-span-5",
    headerClass:
      "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  },
  {
    key: "library",
    icon: BookIcon,
    span: "lg:col-span-4",
    headerClass:
      "bg-gradient-to-br from-primary/80 via-primary/70 to-accent/70",
  },
  {
    key: "sports",
    icon: TrophyIcon,
    span: "lg:col-span-4",
    headerClass:
      "bg-gradient-to-br from-accent/90 via-accent/80 to-secondary/70",
  },
  {
    key: "transportation",
    icon: BusIcon,
    span: "lg:col-span-4",
    headerClass:
      "bg-gradient-to-br from-foreground/70 via-primary/80 to-accent/70",
  },
];

export function FacilitiesPreview() {
  const t = useTranslations("home.facilitiesPreview");

  return (
    <section
      aria-labelledby="facilities-preview-title"
      className={cn(
        "relative py-16 md:py-24 lg:py-32",
        "bg-[var(--color-surface-muted)]"
      )}
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={
            <span id="facilities-preview-title">{t("title")}</span>
          }
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div
          className={cn(
            "mt-12 md:mt-16",
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12",
            "gap-4 md:gap-5 lg:auto-rows-fr"
          )}
        >
          {FACILITIES.map((facility, i) => (
            <FacilityCard
              key={facility.key}
              facility={facility}
              index={i}
              featuredTag={t("featuredTag")}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <Link
            href={routes.facilities}
            className={cn(
              "group inline-flex items-center gap-2",
              "rounded-full px-6 py-3 text-sm font-semibold",
              "bg-primary text-primary-foreground shadow-md",
              "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-muted)]"
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
 * FacilityCard                                                       *
 * ------------------------------------------------------------------ */
function FacilityCard({
  facility,
  index,
  featuredTag,
}: {
  facility: Facility;
  index: number;
  featuredTag: string;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.facilitiesPreview.items.${facility.key}`);
  const Icon = facility.icon;
  const isFeatured = !!facility.featured;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "shadow-sm hover-lift",
        facility.span,
        isFeatured ? "flex-col" : "flex-col"
      )}
    >
      {/* Visual / image-ready zone */}
      <header
        className={cn(
          "relative overflow-hidden",
          facility.headerClass,
          isFeatured
            ? "flex-1 min-h-[220px] md:min-h-[320px] lg:min-h-0"
            : "aspect-[16/10]"
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

        {/* Watermark on featured card */}
        {isFeatured && (
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 grid place-items-center select-none",
              "font-display text-primary-foreground/10",
              "text-[10rem] md:text-[14rem] leading-none"
            )}
          >
            01
          </div>
        )}

        {/* Featured pill */}
        {isFeatured && (
          <span
            className={cn(
              "absolute top-5 left-5 inline-flex items-center gap-2",
              "rounded-full bg-secondary text-secondary-foreground",
              "px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
              "shadow-md border border-secondary/40"
            )}
          >
            ★ {featuredTag}
          </span>
        )}

        {/* Icon chip */}
        <span
          aria-hidden
          className={cn(
            "absolute top-5 right-5 inline-flex items-center justify-center",
            "w-11 h-11 rounded-2xl",
            "bg-primary-foreground/15 backdrop-blur-md",
            "text-primary-foreground border border-primary-foreground/20",
            "group-hover:bg-primary-foreground/25 transition-colors duration-300"
          )}
        >
          <Icon size={22} />
        </span>

        {/* On featured: bottom title is part of the visual zone */}
        {isFeatured && (
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
            <h3 className="font-display text-3xl md:text-4xl text-primary-foreground text-balance">
              {t("title")}
            </h3>
            <p className="text-sm md:text-base text-primary-foreground/85 mt-3 max-w-md text-pretty">
              {t("description")}
            </p>
          </div>
        )}
      </header>

      {/* Body for non-featured cards */}
      {!isFeatured && (
        <div className="p-6 md:p-7 flex flex-col flex-1">
          <h3 className="font-display text-xl md:text-2xl text-foreground">
            {t("title")}
          </h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-2 leading-relaxed text-pretty">
            {t("description")}
          </p>
        </div>
      )}
    </motion.article>
  );
}
