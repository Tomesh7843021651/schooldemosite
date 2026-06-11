"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container, SectionTitle } from "@/components/ui";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/layout/icons";

/**
 * Mosaic gallery preview — nine tiles, one featured (col-span-2 row-span-2)
 * and eight supporting (1×1). Image-ready: drop real photos into
 * `/public/images/gallery/` and swap each gradient `<div>` for
 * `<Image fill ... />`.
 *
 * Grid behaviour:
 *   mobile : 2-col mosaic, big tile stays 2×2
 *   md+    : 4-col mosaic
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

type TileKey = (typeof TILE_KEYS)[number];

/** Rotating brand gradients keep visual rhythm until photos are wired in. */
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
];

export function GalleryPreview() {
  const t = useTranslations("home.galleryPreview");

  return (
    <section
      aria-labelledby="gallery-preview-title"
      className={cn(
        "relative py-16 md:py-24 lg:py-32",
        "bg-[var(--color-surface-muted)]"
      )}
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={
            <span id="gallery-preview-title">{t("title")}</span>
          }
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div
          className={cn(
            "mt-12 md:mt-16",
            "grid grid-cols-2 md:grid-cols-4",
            "gap-3 md:gap-4",
            "auto-rows-[140px] sm:auto-rows-[170px] md:auto-rows-[200px] lg:auto-rows-[220px]"
          )}
        >
          {TILE_KEYS.map((key, i) => {
            const isFeatured = i === 0;
            return (
              <GalleryTile
                key={key}
                tileKey={key}
                index={i}
                isFeatured={isFeatured}
              />
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <Link
            href={routes.gallery}
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
 * GalleryTile                                                        *
 * ------------------------------------------------------------------ */
function GalleryTile({
  tileKey,
  index,
  isFeatured,
}: {
  tileKey: TileKey;
  index: number;
  isFeatured: boolean;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`home.galleryPreview.items.${tileKey}`);
  const gradient = TILE_GRADIENTS[index % TILE_GRADIENTS.length];

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={
        reduce ? undefined : { opacity: 1, scale: 1 }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative overflow-hidden",
        "rounded-2xl md:rounded-3xl border border-border shadow-sm hover-lift",
        isFeatured && "col-span-2 row-span-2"
      )}
    >
      {/* Image-ready gradient layer */}
      <div
        className={cn(
          "absolute inset-0",
          gradient,
          "transition-transform duration-700 ease-out group-hover:scale-105"
        )}
        aria-hidden
      />

      {/* Decorative watermark on the featured tile */}
      {isFeatured && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center select-none",
            "font-display text-primary-foreground/10",
            "text-[8rem] md:text-[12rem] leading-none"
          )}
        >
          ★
        </div>
      )}

      {/* Dark gradient overlay (always present so caption is legible) */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-t from-black/70 via-black/15 to-transparent",
          "opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        )}
      />

      {/* Category tag */}
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

      {/* Caption */}
      <figcaption
        className={cn(
          "absolute inset-x-0 bottom-0 p-3 md:p-4",
          "text-primary-foreground"
        )}
      >
        <span
          className={cn(
            "block font-display text-balance",
            isFeatured ? "text-xl md:text-2xl" : "text-sm md:text-base",
            "translate-y-1 opacity-90 group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-300"
          )}
        >
          {t("title")}
        </span>
      </figcaption>
    </motion.figure>
  );
}
