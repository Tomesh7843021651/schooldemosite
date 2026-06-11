"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PlayCircleIcon } from "@/components/layout/icons";

const KEYS = ["v1", "v2", "v3", "v4"] as const;

const GRADIENTS = [
  "bg-gradient-to-br from-primary via-primary/85 to-accent",
  "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  "bg-gradient-to-br from-accent via-accent/85 to-primary/70",
  "bg-gradient-to-br from-primary/80 via-accent/75 to-foreground/70",
];

export function VideoGallery() {
  const t = useTranslations("pages.gallery.videos");

  return (
    <section
      aria-labelledby="video-gallery"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="video-gallery">{t("title")}</span>}
          description={t("description")}
          align="left"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {KEYS.map((key, i) => (
            <VideoCard key={key} videoKey={key} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function VideoCard({
  videoKey,
  index,
}: {
  videoKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.gallery.videos.items.${videoKey}`);

  return (
    <motion.button
      type="button"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label={t("title")}
      className={cn(
        "group relative w-full text-left overflow-hidden rounded-3xl",
        "border border-border bg-[var(--color-surface)] shadow-sm hover-lift",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-muted)]"
      )}
    >
      <div
        className={cn(
          "relative aspect-video overflow-hidden",
          GRADIENTS[index % GRADIENTS.length]
        )}
      >
        <span
          aria-hidden
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary-foreground/15 blur-3xl"
        />

        {/* Play affordance */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 grid place-items-center",
            "text-primary-foreground transition-transform duration-300",
            "group-hover:scale-110"
          )}
        >
          <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/30 shadow-lg">
            <PlayCircleIcon size={36} />
          </span>
        </span>

        {/* Duration chip */}
        <span
          className={cn(
            "absolute bottom-3 right-3 inline-flex items-center gap-1",
            "rounded-full bg-black/55 text-white",
            "px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md"
          )}
        >
          {t("duration")}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <Heading level={3} size="h4">
          {t("title")}
        </Heading>
      </div>
    </motion.button>
  );
}
