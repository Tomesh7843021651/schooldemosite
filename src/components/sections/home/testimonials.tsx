"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { StarIcon, QuoteIcon } from "@/components/layout/icons";

/**
 * Parent testimonials — three premium cards on a `surface-muted` panel.
 *
 *   • Floating rating chip above the section title (★ 4.9 / 5).
 *   • Tall cards with a quote-mark watermark, 5-star row, Cormorant
 *     italic pull-quote (a single Eb font face, loaded via next/font in
 *     [locale]/layout.tsx) and a divider that introduces the parent's
 *     avatar + name + relationship.
 *   • Per-card avatar gradient keeps each story visually distinct.
 */

type TKey = "t1" | "t2" | "t3";

type Item = {
  key: TKey;
  avatarGradient: string;
};

const ITEMS: Item[] = [
  {
    key: "t1",
    avatarGradient: "bg-gradient-to-br from-primary via-primary/85 to-accent",
  },
  {
    key: "t2",
    avatarGradient: "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  },
  {
    key: "t3",
    avatarGradient: "bg-gradient-to-br from-accent via-accent/80 to-primary/70",
  },
];

export function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section
      aria-labelledby="testimonials-title"
      className={cn(
        "relative py-16 md:py-24 lg:py-32 overflow-hidden",
        "bg-[var(--color-background)]"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 w-[26rem] h-[26rem] rounded-full bg-secondary/8 blur-3xl"
      />

      <Container>
        <div className="flex flex-col items-center text-center">
          <RatingChip
            value={t("ratingValue")}
            max={t("ratingMax")}
            label={t("ratingLabel")}
          />

          <SectionTitle
            eyebrow={t("eyebrow")}
            title={<span id="testimonials-title">{t("title")}</span>}
            description={t("description")}
            align="center"
            width="lg"
            level={2}
            className="mt-6"
          />
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ITEMS.map((item, i) => (
            <TestimonialCard key={item.key} item={item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * RatingChip                                                         *
 * ------------------------------------------------------------------ */
function RatingChip({
  value,
  max,
  label,
}: {
  value: string;
  max: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full",
        "px-5 py-2.5",
        "bg-[var(--color-surface)] border border-border shadow-md"
      )}
    >
      <div className="flex items-center gap-0.5 text-secondary">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            size={14}
            className="fill-current"
            fill="currentColor"
            stroke="currentColor"
          />
        ))}
      </div>
      <span className="font-display text-base text-foreground leading-none">
        {value}
        <span className="text-[var(--color-muted-foreground)] text-sm font-normal">
          {" "}
          / {max}
        </span>
      </span>
      <span
        aria-hidden
        className="hidden sm:inline-block w-px h-4 bg-border"
      />
      <span className="hidden sm:inline text-xs text-[var(--color-muted-foreground)]">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * TestimonialCard                                                    *
 * ------------------------------------------------------------------ */
function TestimonialCard({ item, index }: { item: Item; index: number }) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.testimonials.items.${item.key}`);

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex flex-col h-full overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-7 md:p-8 shadow-sm hover-lift"
      )}
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden
        className="absolute top-5 right-5 text-primary/12"
      >
        <QuoteIcon size={56} />
      </span>

      {/* Corner glow that brightens on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-16 -right-16 w-44 h-44 rounded-full",
          "bg-primary/10 blur-3xl",
          "opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        )}
      />

      {/* Rating */}
      <div
        className="relative flex items-center gap-0.5 text-secondary"
        aria-label="Rated 5 out of 5"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            size={16}
            fill="currentColor"
            stroke="currentColor"
            className="fill-current"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className={cn(
          "relative mt-5 font-display italic",
          "text-lg md:text-xl leading-snug text-foreground/90 text-pretty"
        )}
      >
        “{t("quote")}”
      </blockquote>

      {/* Attribution */}
      <figcaption className="relative mt-auto pt-7 flex items-center gap-4 border-t border-border/70">
        <div
          aria-hidden
          className={cn(
            "shrink-0 inline-flex items-center justify-center",
            "w-12 h-12 rounded-2xl shadow-md",
            "font-display text-base text-primary-foreground",
            item.avatarGradient
          )}
        >
          {t("initials")}
        </div>
        <div className="leading-tight min-w-0">
          <div className="font-display text-base md:text-lg text-foreground">
            {t("name")}
          </div>
          <div className="text-xs text-[var(--color-muted-foreground)] mt-1">
            {t("relationship")}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
