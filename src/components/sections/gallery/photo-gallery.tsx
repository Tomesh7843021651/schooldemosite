"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Full-page photo mosaic — 16 tiles arranged across two staggered rows on
 * desktop. Reuses the homepage `galleryPreview.items.*` keys for the first
 * nine tiles and pads the remaining seven with rotating brand gradients.
 *
 * Image-ready: drop real campus photographs into `/public/images/gallery/`
 * and replace the inner gradient `<div>` with `<Image fill ... />`.
 */

const TILE_KEYS = [
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
] as const;

const TILE_GRADIENTS = [
  "bg-gradient-to-br from-primary via-primary/85 to-accent",
  "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  "bg-gradient-to-br from-accent via-accent/85 to-primary/70",
  "bg-gradient-to-br from-primary/80 via-accent/70 to-secondary/60",
  "bg-gradient-to-br from-secondary/80 via-primary/70 to-accent",
  "bg-gradient-to-br from-accent/90 via-primary/70 to-foreground/70",
  "bg-gradient-to-br from-primary via-primary/90 to-foreground/60",
  "bg-gradient-to-br from-secondary via-accent/80 to-primary/70",
  "bg-gradient-to-br from-accent via-primary/85 to-secondary/70",
  "bg-gradient-to-br from-primary/85 via-secondary/70 to-accent",
  "bg-gradient-to-br from-accent/85 via-secondary/70 to-primary/60",
];

/** Bento spans repeat in a 2-row pattern across the 16 tiles. */
const SPANS = [
  "col-span-2 row-span-2", // 0 — feature
  "col-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-1",
  "col-span-2",
  "row-span-1",
  "row-span-1",
  "col-span-2 row-span-2",
  "row-span-1",
  "row-span-1",
  "col-span-2",
  "row-span-1",
  "row-span-1",
  "col-span-2",
  "row-span-1",
];

export function PhotoGallery() {
  const t = useTranslations("pages.gallery.photos");

  return (
    <section
      aria-labelledby="photo-gallery"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="photo-gallery">{t("title")}</span>}
          align="left"
          width="lg"
          level={2}
        />

        <div
          className={cn(
            "mt-10 md:mt-14",
            "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
            "auto-rows-[140px] sm:auto-rows-[170px] md:auto-rows-[200px] lg:auto-rows-[220px]"
          )}
        >
          {SPANS.map((span, i) => (
            <Tile key={i} index={i} span={span} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Tile({ index, span }: { index: number; span: string }) {
  const reduce = useReducedMotion();
  // Cycle through the 9 homepage tile keys; the remaining 7 tiles reuse
  // the first 7 entries so all 16 tiles always have a label.
  const tileKey = TILE_KEYS[index % TILE_KEYS.length];
  const t = useTranslations(`home.galleryPreview.items.${tileKey}`);
  const gradient = TILE_GRADIENTS[index % TILE_GRADIENTS.length];

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: (index % 8) * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border shadow-sm hover-lift",
        span
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          gradient,
          "transition-transform duration-700 ease-out group-hover:scale-105"
        )}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
      />

      <span
        className={cn(
          "absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1.5",
          "rounded-full bg-[var(--color-surface)]/95 backdrop-blur-md",
          "px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
          "text-foreground shadow-md border border-border/40"
        )}
      >
        {t("tag")}
      </span>

      <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-primary-foreground">
        <span
          className={cn(
            "block font-display text-balance text-sm md:text-base",
            "opacity-90 group-hover:opacity-100 transition-opacity"
          )}
        >
          {t("title")}
        </span>
      </figcaption>
    </motion.figure>
  );
}
