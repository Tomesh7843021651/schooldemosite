"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ShieldIcon,
  UsersIcon,
  HeartIcon,
  BusIcon,
  SparklesIcon,
  CheckIcon,
} from "@/components/layout/icons";

const KEYS = ["cctv", "staff", "medical", "transport", "hygiene", "evac"] as const;

const ICONS: Record<
  (typeof KEYS)[number],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  cctv: ShieldIcon,
  staff: UsersIcon,
  medical: HeartIcon,
  transport: BusIcon,
  hygiene: SparklesIcon,
  evac: CheckIcon,
};

export function SafetyHighlights() {
  const t = useTranslations("pages.facilities.safety");

  return (
    <section
      aria-labelledby="facilities-safety"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="facilities-safety">{t("title")}</span>}
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {KEYS.map((key, i) => (
            <SafetyCard key={key} itemKey={key} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SafetyCard({
  itemKey,
  index,
}: {
  itemKey: (typeof KEYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.facilities.safety.items.${itemKey}`);
  const Icon = ICONS[itemKey];

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
        "group relative rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-6 md:p-7 shadow-sm hover-lift"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-2xl",
          "bg-accent/15 text-accent border border-accent/25",
          "group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300"
        )}
      >
        <Icon size={22} />
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
