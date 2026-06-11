"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  MonitorIcon,
  CpuIcon,
  BeakerIcon,
  BookIcon,
  TrophyIcon,
  BusIcon,
} from "@/components/layout/icons";

/**
 * Full-page facilities grid — six equal-weight cards. Each card has an
 * image-ready gradient hero, an icon chip, title and description. Re-uses
 * homepage copy via `home.facilitiesPreview.items.*`.
 */

type Key =
  | "smartClassrooms"
  | "computerLab"
  | "scienceLab"
  | "library"
  | "sports"
  | "transportation";

type Facility = {
  key: Key;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headerClass: string;
};

const FACILITIES: Facility[] = [
  {
    key: "smartClassrooms",
    icon: MonitorIcon,
    headerClass: "bg-gradient-to-br from-primary via-primary/90 to-accent",
  },
  {
    key: "computerLab",
    icon: CpuIcon,
    headerClass: "bg-gradient-to-br from-accent via-accent/85 to-primary/70",
  },
  {
    key: "scienceLab",
    icon: BeakerIcon,
    headerClass:
      "bg-gradient-to-br from-secondary via-secondary/85 to-accent",
  },
  {
    key: "library",
    icon: BookIcon,
    headerClass:
      "bg-gradient-to-br from-primary/85 via-primary/70 to-accent/70",
  },
  {
    key: "sports",
    icon: TrophyIcon,
    headerClass:
      "bg-gradient-to-br from-accent/90 via-accent/80 to-secondary/70",
  },
  {
    key: "transportation",
    icon: BusIcon,
    headerClass:
      "bg-gradient-to-br from-foreground/70 via-primary/80 to-accent/70",
  },
];

export function FacilitiesGrid() {
  const t = useTranslations("pages.facilities.grid");

  return (
    <section
      aria-labelledby="facilities-grid"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-background)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="facilities-grid">{t("title")}</span>}
          align="left"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FACILITIES.map((f, i) => (
            <FacilityCard key={f.key} facility={f} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FacilityCard({
  facility,
  index,
}: {
  facility: Facility;
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(
    `home.facilitiesPreview.items.${facility.key}`
  );
  const Icon = facility.icon;

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
        "group relative flex flex-col overflow-hidden",
        "rounded-3xl border border-border bg-[var(--color-surface)]",
        "shadow-sm hover-lift"
      )}
    >
      <header
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          facility.headerClass
        )}
      >
        <span
          aria-hidden
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-foreground/15 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-foreground/10 blur-3xl"
        />

        <span
          aria-hidden
          className={cn(
            "absolute top-5 right-5 inline-flex items-center justify-center",
            "w-12 h-12 rounded-2xl bg-primary-foreground/15 backdrop-blur-md",
            "text-primary-foreground border border-primary-foreground/20"
          )}
        >
          <Icon size={24} />
        </span>
      </header>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <Heading level={3} size="h4">
          {t("title")}
        </Heading>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2 leading-relaxed text-pretty">
          {t("description")}
        </p>
      </div>
    </motion.article>
  );
}
