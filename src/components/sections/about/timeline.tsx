"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

const ITEM_KEYS = ["y1", "y2", "y3", "y4", "y5"] as const;

export function Timeline() {
  const t = useTranslations("pages.about.timeline");

  return (
    <section
      aria-labelledby="about-timeline"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="about-timeline">{t("title")}</span>}
          align="left"
          width="lg"
          level={2}
        />

        <ol
          className="relative mt-12 md:mt-16 space-y-8 md:space-y-12"
          aria-label="School milestones timeline"
        >
          <span
            aria-hidden
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
          />

          {ITEM_KEYS.map((key, i) => (
            <TimelineItem key={key} itemKey={key} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TimelineItem({
  itemKey,
  index,
}: {
  itemKey: (typeof ITEM_KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.about.timeline.items.${itemKey}`);
  const isOdd = index % 2 === 1;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative grid md:grid-cols-2 gap-4 md:gap-12",
        isOdd && "md:[direction:rtl]"
      )}
    >
      {/* Dot on the line */}
      <span
        aria-hidden
        className={cn(
          "absolute left-4 md:left-1/2 top-3 -translate-x-1/2",
          "w-3 h-3 rounded-full bg-primary ring-4 ring-[var(--color-surface-muted)]"
        )}
      />

      <div
        className={cn(
          "pl-10 md:pl-0 md:[direction:ltr]",
          isOdd ? "md:pl-0 md:pr-12 md:text-right" : "md:pr-0 md:pl-12"
        )}
      >
        <div className="font-display text-4xl md:text-5xl text-primary leading-none">
          {t("year")}
        </div>
        <h3 className="font-display text-xl md:text-2xl text-foreground mt-3">
          {t("title")}
        </h3>
        <p className="text-base text-[var(--color-muted-foreground)] mt-2 leading-relaxed max-w-md text-pretty md:inline-block">
          {t("description")}
        </p>
      </div>
    </motion.li>
  );
}
