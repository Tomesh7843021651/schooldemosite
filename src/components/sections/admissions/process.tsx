"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";

const KEYS = ["s1", "s2", "s3", "s4"] as const;

export function AdmissionProcess() {
  const t = useTranslations("pages.admissions.process");

  return (
    <section
      aria-labelledby="admission-process"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="admission-process">{t("title")}</span>}
          align="center"
          width="lg"
          level={2}
        />

        <ol className="relative mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <span
            aria-hidden
            className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-border"
          />
          {KEYS.map((key, i) => (
            <StepCard key={key} stepKey={key} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StepCard({
  stepKey,
  index,
}: {
  stepKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.admissions.process.items.${stepKey}`);

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative group rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-6 md:p-7 shadow-sm hover-lift"
      )}
    >
      <div
        className={cn(
          "relative inline-flex items-center justify-center",
          "w-12 h-12 rounded-2xl shadow-md",
          "bg-primary text-primary-foreground font-display text-lg"
        )}
      >
        {t("step")}
      </div>

      <Heading level={3} size="h4" className="mt-4">
        {t("title")}
      </Heading>
      <p className="text-sm text-[var(--color-muted-foreground)] mt-2 leading-relaxed text-pretty">
        {t("description")}
      </p>
    </motion.li>
  );
}
