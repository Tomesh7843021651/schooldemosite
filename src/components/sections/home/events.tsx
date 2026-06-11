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
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@/components/layout/icons";

/**
 * Upcoming events — editorial layout.
 *
 *   lg layout (12 cols)
 *     - Featured event card : col-span-7  (hero gradient + register CTA)
 *     - Supporting list     : col-span-5  (3 events stacked)
 *
 *   mobile : everything stacks; featured stays at the top.
 *
 * Image-ready: the gradient `<header>` on the featured card is the slot
 * for a real photograph when one is available.
 */

const FEATURED_KEY = "openHouse" as const;
const SUPPORTING_KEYS = ["annualDay", "scienceFair", "sportsDay"] as const;

type SupportingKey = (typeof SUPPORTING_KEYS)[number];

export function Events() {
  const t = useTranslations("home.events");

  return (
    <section
      aria-labelledby="events-title"
      className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <SectionTitle
            eyebrow={t("eyebrow")}
            title={<span id="events-title">{t("title")}</span>}
            description={t("description")}
            align="left"
            width="lg"
            level={2}
          />

          <Link
            href={routes.about}
            className={cn(
              "group inline-flex items-center gap-2 self-start md:self-auto",
              "rounded-full px-5 py-2.5 text-sm font-semibold",
              "border border-border bg-[var(--color-surface)] text-foreground",
              "hover:border-primary hover:text-primary transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <CalendarIcon size={14} />
            {t("viewAllCta")}
            <ArrowRightIcon
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
          <FeaturedEvent registerLabel={t("registerCta")} />
          <SupportingEvents learnLabel={t("learnMoreCta")} />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FeaturedEvent                                                      *
 * ------------------------------------------------------------------ */
function FeaturedEvent({ registerLabel }: { registerLabel: string }) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.events.items.${FEATURED_KEY}`);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "lg:col-span-7 relative overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)] shadow-md"
      )}
    >
      {/* Hero gradient header (image-ready) */}
      <header
        className={cn(
          "relative aspect-[16/10] md:aspect-[16/9] overflow-hidden",
          "bg-gradient-to-br from-primary via-primary/85 to-accent"
        )}
      >
        <span
          aria-hidden
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-secondary/25 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />

        {/* Floating date chip */}
        <DateChip day={t("day")} month={t("month")} variant="float" />

        {/* Tag */}
        <span
          className={cn(
            "absolute top-5 right-5 inline-flex items-center gap-2",
            "rounded-full bg-[var(--color-surface)]/95 backdrop-blur-md",
            "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
            "text-foreground shadow-md border border-border/40"
          )}
        >
          {t("tag")}
        </span>
      </header>

      <div className="p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-3xl text-foreground text-balance">
          {t("title")}
        </h3>
        <p className="mt-3 text-base text-[var(--color-muted-foreground)] leading-relaxed text-pretty">
          {t("description")}
        </p>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <MetaRow icon={<CalendarIcon size={14} />}>{t("month")} {t("day")}, {t("year")}</MetaRow>
          <MetaRow icon={<ClockIcon size={14} />}>{t("time")}</MetaRow>
          <MetaRow icon={<MapPinIcon size={14} />}>{t("venue")}</MetaRow>
        </ul>

        <Link
          href={routes.admissions}
          className={cn(
            "mt-7 inline-flex items-center gap-2",
            "rounded-full px-6 py-3 text-sm font-semibold",
            "bg-primary text-primary-foreground shadow-md",
            "hover:bg-primary/90 hover:shadow-lg transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          {registerLabel}
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ *
 * SupportingEvents                                                   *
 * ------------------------------------------------------------------ */
function SupportingEvents({ learnLabel }: { learnLabel: string }) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
      {SUPPORTING_KEYS.map((key, i) => (
        <SupportingEventCard key={key} eventKey={key} index={i} learnLabel={learnLabel} />
      ))}
    </div>
  );
}

function SupportingEventCard({
  eventKey,
  index,
  learnLabel,
}: {
  eventKey: SupportingKey;
  index: number;
  learnLabel: string;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.events.items.${eventKey}`);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex gap-5 items-start",
        "rounded-2xl border border-border bg-[var(--color-surface)] p-5 md:p-6",
        "shadow-sm hover-lift"
      )}
    >
      <DateChip day={t("day")} month={t("month")} variant="static" />

      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full",
            "bg-primary/10 text-primary",
            "px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
          )}
        >
          {t("tag")}
        </span>

        <h3 className="font-display text-lg md:text-xl text-foreground mt-2.5 leading-snug text-balance">
          {t("title")}
        </h3>

        <p className="text-sm text-[var(--color-muted-foreground)] mt-1.5 line-clamp-2 text-pretty">
          {t("description")}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon size={12} />
            {t("venue")}
          </span>
        </div>
      </div>

      <Link
        href={routes.about}
        aria-label={`${learnLabel} — ${t("title")}`}
        className={cn(
          "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full",
          "border border-border bg-[var(--color-surface)]",
          "text-foreground/70 hover:text-primary hover:border-primary",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <ArrowRightIcon size={14} />
      </Link>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ *
 * Small bits                                                         *
 * ------------------------------------------------------------------ */
function DateChip({
  day,
  month,
  variant,
}: {
  day: string;
  month: string;
  variant: "float" | "static";
}) {
  return (
    <div
      className={cn(
        variant === "float"
          ? "absolute top-5 left-5 shadow-premium"
          : "shadow-sm",
        "rounded-2xl bg-[var(--color-surface)] text-foreground",
        "border border-border/60",
        "px-4 py-3 text-center leading-none",
        "w-[68px]"
      )}
    >
      <div className="font-display text-3xl">{day}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mt-1">
        {month}
      </div>
    </div>
  );
}

function MetaRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-foreground/80">
      <span className="text-primary">{icon}</span>
      <span>{children}</span>
    </li>
  );
}
