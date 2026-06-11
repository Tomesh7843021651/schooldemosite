"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  GraduationCapIcon,
  TrophyIcon,
  StarIcon,
  AwardIcon,
} from "@/components/layout/icons";

/**
 * Achievements spotlight — visually distinct dark-navy panel that holds the
 * page rhythm and lets a parent register milestones at a glance.
 *
 * The section uses a fixed dark gradient (not theme-token-dependent) so it
 * keeps its identity in both light and dark mode. Gold accents borrow the
 * brand secondary colour for an "award" aesthetic.
 */

type AchievementKey =
  | "boardResults"
  | "districtSports"
  | "culturalExcellence"
  | "olympiads";

type Achievement = {
  key: AchievementKey;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const ACHIEVEMENTS: Achievement[] = [
  { key: "boardResults", icon: GraduationCapIcon },
  { key: "districtSports", icon: TrophyIcon },
  { key: "culturalExcellence", icon: StarIcon },
  { key: "olympiads", icon: AwardIcon },
];

export function Achievements() {
  const t = useTranslations("home.achievements");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="achievements-title"
      className={cn(
        "relative overflow-hidden text-white",
        "py-16 md:py-24 lg:py-32",
        // Permanent dark backdrop (independent of light/dark theme).
        "bg-[#0A1F3A]",
        "bg-[radial-gradient(ellipse_at_top_left,#11355f_0%,#0A1F3A_45%,#1B0F25_100%)]"
      )}
    >
      {/* Ambient glows */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-secondary/12 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 w-[30rem] h-[30rem] rounded-full bg-primary/15 blur-3xl"
      />

      <Container>
        {/* Section title (light-on-dark variant) */}
        <div className="max-w-3xl">
          <span className="text-eyebrow !text-secondary inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-current opacity-60"
            />
            {t("eyebrow")}
          </span>
          <h2
            id="achievements-title"
            className="text-h2 font-display mt-3 text-balance text-white"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl text-pretty">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard
              key={a.key}
              achievement={a}
              index={i}
              reduce={!!reduce}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * AchievementCard                                                    *
 * ------------------------------------------------------------------ */
function AchievementCard({
  achievement,
  index,
  reduce,
}: {
  achievement: Achievement;
  index: number;
  reduce: boolean;
}) {
  const t = useTranslations(`home.achievements.items.${achievement.key}`);
  const Icon = achievement.icon;

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
        "rounded-3xl p-6 md:p-7",
        // Glassmorphism on the dark backdrop.
        "bg-white/[0.04] border border-white/10 backdrop-blur-md",
        "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]",
        "transition-all duration-300",
        "hover:bg-white/[0.07] hover:border-secondary/30"
      )}
    >
      {/* Decorative corner glow */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full",
          "bg-secondary/15 blur-3xl",
          "opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        )}
      />

      {/* Top row: year + icon */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="font-display text-5xl md:text-6xl text-secondary leading-none">
          {t("year")}
        </div>
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center justify-center",
            "w-11 h-11 rounded-2xl",
            "bg-secondary/15 text-secondary border border-secondary/30",
            "transition-colors duration-300",
            "group-hover:bg-secondary group-hover:text-secondary-foreground"
          )}
        >
          <Icon size={20} />
        </span>
      </div>

      {/* Category pill */}
      <span
        className={cn(
          "relative mt-5 inline-flex items-center gap-2",
          "rounded-full bg-white/8 border border-white/15",
          "px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
        )}
      >
        {t("category")}
      </span>

      {/* Title */}
      <h3 className="relative font-display text-xl md:text-2xl text-white mt-4 text-balance leading-tight">
        {t("title")}
      </h3>

      {/* Description */}
      <p className="relative text-sm text-white/70 mt-3 leading-relaxed text-pretty">
        {t("description")}
      </p>
    </motion.article>
  );
}
