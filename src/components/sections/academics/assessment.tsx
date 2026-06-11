"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/layout/icons";

const KEYS = ["daily", "weekly", "term", "report"] as const;

export function Assessment() {
  const t = useTranslations("pages.academics.assessment");

  return (
    <section
      aria-labelledby="academics-assessment"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="academics-assessment">{t("title")}</span>}
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {KEYS.map((key, i) => (
            <AssessmentCard key={key} itemKey={key} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function AssessmentCard({
  itemKey,
  index,
}: {
  itemKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.academics.assessment.items.${itemKey}`);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-6 md:p-7 shadow-sm hover-lift"
      )}
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary"
      >
        <CheckIcon size={20} />
      </span>
      <Heading level={3} size="h4" className="mt-4">
        {t("title")}
      </Heading>
      <p className="text-sm text-[var(--color-muted-foreground)] mt-2 leading-relaxed text-pretty">
        {t("description")}
      </p>
    </motion.article>
  );
}
