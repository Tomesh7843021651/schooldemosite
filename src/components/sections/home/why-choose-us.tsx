"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  BookIcon,
  ShieldIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  CompassIcon,
} from "@/components/layout/icons";

/**
 * Six pillars of trust — the parent's decision matrix in one view.
 *
 *   mobile   : single column
 *   tablet   : 2 columns
 *   desktop  : 3 columns
 *
 * Each card uses a Framer Motion fade-up on scroll, an icon chip that
 * inverts colors on hover, and the global `.hover-lift` utility for
 * a tactile, premium feel.
 */

type PillarKey =
  | "excellence"
  | "safety"
  | "faculty"
  | "facilities"
  | "holistic"
  | "values";

type Pillar = {
  key: PillarKey;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const PILLARS: Pillar[] = [
  { key: "excellence", icon: BookIcon },
  { key: "safety", icon: ShieldIcon },
  { key: "faculty", icon: UsersIcon },
  { key: "facilities", icon: SparklesIcon },
  { key: "holistic", icon: HeartIcon },
  { key: "values", icon: CompassIcon },
];

export function WhyChooseUs() {
  const t = useTranslations("home.whyChooseUs");

  return (
    <section
      aria-labelledby="why-choose-us"
      className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={
            <span id="why-choose-us" className="text-balance">
              {t("title")}
            </span>
          }
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.key}
              pillar={pillar}
              index={index}
              title={t(`items.${pillar.key}.title`)}
              description={t(`items.${pillar.key}.description`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Single trust pillar card                                           *
 * ------------------------------------------------------------------ */
function PillarCard({
  pillar,
  index,
  title,
  description,
}: {
  pillar: Pillar;
  index: number;
  title: string;
  description: string;
}) {
  const reduce = useReducedMotion();
  const Icon = pillar.icon;

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
        "group relative overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-7 md:p-8 shadow-sm",
        "hover-lift"
      )}
    >
      {/* Decorative corner glow that brightens on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full",
          "bg-primary/10 blur-2xl",
          "opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        )}
      />

      <div
        aria-hidden
        className={cn(
          "relative inline-flex items-center justify-center",
          "w-14 h-14 rounded-2xl",
          "bg-primary/10 text-primary",
          "group-hover:bg-primary group-hover:text-primary-foreground",
          "transition-colors duration-300"
        )}
      >
        <Icon size={24} />
      </div>

      <h3 className="relative font-display text-xl md:text-2xl text-foreground mt-5">
        {title}
      </h3>

      <p className="relative text-sm md:text-base leading-relaxed text-[var(--color-muted-foreground)] mt-3 text-pretty">
        {description}
      </p>

      {/* Numbered chip — bottom-right pillar count */}
      <span
        aria-hidden
        className={cn(
          "absolute bottom-5 right-6 font-display",
          "text-sm text-[var(--color-muted-foreground)]/40",
          "group-hover:text-primary transition-colors duration-300"
        )}
      >
        0{index + 1}
      </span>
    </motion.article>
  );
}
