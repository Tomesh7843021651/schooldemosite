"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/layout/icons";

const KEYS = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"] as const;

export function RequiredDocuments() {
  const t = useTranslations("pages.admissions.documents");

  return (
    <section
      aria-labelledby="admissions-documents"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="admissions-documents">{t("title")}</span>}
          align="left"
          width="lg"
          level={2}
        />

        <ul
          aria-label="Required documents checklist"
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >
          {KEYS.map((key, i) => (
            <DocItem key={key} itemKey={key} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function DocItem({
  itemKey,
  index,
}: {
  itemKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations("pages.admissions.documents.items");

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -12 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border bg-[var(--color-surface)]",
        "p-4 md:p-5 shadow-sm"
      )}
    >
      <span
        aria-hidden
        className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary shrink-0"
      >
        <CheckIcon size={14} />
      </span>
      <span className="text-sm md:text-base text-foreground leading-snug">
        {t(itemKey)}
      </span>
    </motion.li>
  );
}
