"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/layout/icons";

const KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FAQ() {
  const t = useTranslations("pages.admissions.faq");

  return (
    <section
      aria-labelledby="admissions-faq"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container width="narrow">
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="admissions-faq">{t("title")}</span>}
          align="center"
          width="lg"
          level={2}
        />

        <div
          className={cn(
            "mt-10 md:mt-14 rounded-3xl border border-border bg-[var(--color-surface)]",
            "shadow-sm overflow-hidden divide-y divide-border"
          )}
        >
          {KEYS.map((key, i) => (
            <FAQItem key={key} itemKey={key} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQItem({
  itemKey,
  index,
}: {
  itemKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.admissions.faq.items.${itemKey}`);

  return (
    <motion.details
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <summary
        className={cn(
          "flex items-start justify-between gap-4 cursor-pointer list-none",
          "px-5 md:px-7 py-5 md:py-6",
          "hover:bg-[var(--color-surface-muted)]/40 transition-colors",
          "focus-visible:outline-none focus-visible:bg-[var(--color-surface-muted)]/60"
        )}
      >
        <span className="font-display text-base md:text-lg text-foreground text-balance pr-4">
          {t("question")}
        </span>
        <span
          aria-hidden
          className={cn(
            "mt-1 inline-flex items-center justify-center shrink-0",
            "w-8 h-8 rounded-full bg-primary/10 text-primary",
            "transition-transform duration-300 group-open:rotate-180"
          )}
        >
          <ChevronDownIcon size={16} />
        </span>
      </summary>
      <div className="px-5 md:px-7 pb-6 -mt-1">
        <p className="text-sm md:text-base text-[var(--color-muted-foreground)] leading-relaxed text-pretty">
          {t("answer")}
        </p>
      </div>
    </motion.details>
  );
}
