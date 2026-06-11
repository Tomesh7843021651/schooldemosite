"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  HeartIcon,
  ShieldIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
  AwardIcon,
} from "@/components/layout/icons";

type ValueKey =
  | "respect"
  | "discipline"
  | "curiosity"
  | "integrity"
  | "service"
  | "courage";

type Value = {
  key: ValueKey;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const VALUES: Value[] = [
  { key: "respect", icon: HeartIcon },
  { key: "discipline", icon: ShieldIcon },
  { key: "curiosity", icon: SparklesIcon },
  { key: "integrity", icon: StarIcon },
  { key: "service", icon: UsersIcon },
  { key: "courage", icon: AwardIcon },
];

export function CoreValues() {
  const t = useTranslations("pages.about.values");

  return (
    <section
      aria-labelledby="about-values"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="about-values">{t("title")}</span>}
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {VALUES.map((v, i) => (
            <ValueCard key={v.key} value={v} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ValueCard({ value, index }: { value: Value; index: number }) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.about.values.items.${value.key}`);
  const Icon = value.icon;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-7 md:p-8 shadow-sm hover-lift"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-2xl",
          "bg-primary/10 text-primary",
          "group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
        )}
      >
        <Icon size={22} />
      </div>

      <Heading level={3} size="h4" className="relative mt-5">
        {t("title")}
      </Heading>
      <p className="relative text-sm md:text-base text-[var(--color-muted-foreground)] mt-2 leading-relaxed text-pretty">
        {t("description")}
      </p>

      <span
        aria-hidden
        className="absolute bottom-5 right-6 font-display text-sm text-[var(--color-muted-foreground)]/40 group-hover:text-primary transition-colors duration-300"
      >
        0{index + 1}
      </span>
    </motion.article>
  );
}
