"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";

const KEYS = ["concept", "practice", "voice", "feedback"] as const;

export function Methodology() {
  const t = useTranslations("pages.academics.methodology");

  return (
    <section
      aria-labelledby="academics-methodology"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="academics-methodology">{t("title")}</span>}
          description={t("description")}
          align="left"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {KEYS.map((key, i) => (
            <PillarCard key={key} pillarKey={key} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PillarCard({
  pillarKey,
  index,
}: {
  pillarKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.academics.methodology.items.${pillarKey}`);
  const number = String(index + 1).padStart(2, "0");

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
        "group relative overflow-hidden rounded-3xl border border-border",
        "bg-[var(--color-surface)] p-7 md:p-8 shadow-sm hover-lift"
      )}
    >
      <div className="font-display text-5xl md:text-6xl text-primary/15 leading-none">
        {number}
      </div>
      <Heading level={3} size="h3" className="mt-4">
        {t("title")}
      </Heading>
      <p className="text-base text-[var(--color-muted-foreground)] mt-3 leading-relaxed text-pretty">
        {t("description")}
      </p>
    </motion.article>
  );
}
