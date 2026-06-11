"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  AwardIcon,
  UsersIcon,
  GraduationCapIcon,
  StarIcon,
} from "@/components/layout/icons";

/**
 * Stats strip — count-up numbers that build instant trust.
 *
 * Mobile  : 2 × 2 grid
 * Desktop : 1 × 4 row with subtle dividers
 */

type Stat = {
  key: "years" | "students" | "teachers" | "results";
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const STATS: Stat[] = [
  { key: "years", value: 25, suffix: "+", icon: AwardIcon },
  { key: "students", value: 1500, suffix: "+", icon: UsersIcon },
  { key: "teachers", value: 80, suffix: "+", icon: GraduationCapIcon },
  { key: "results", value: 98, suffix: "%", icon: StarIcon },
];

export function Stats() {
  const t = useTranslations("home.stats");

  return (
    <section
      aria-label={t("eyebrow")}
      className={cn(
        "relative bg-[var(--color-surface)]",
        "border-y border-border"
      )}
    >
      <Container>
        <div className="py-14 md:py-20">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-eyebrow inline-flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-current opacity-60"
              />
              {t("eyebrow")}
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-current opacity-60"
              />
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCell key={stat.key} stat={stat} index={i} label={t(`items.${stat.key}Label`)} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Single stat                                                        *
 * ------------------------------------------------------------------ */
function StatCell({
  stat,
  index,
  label,
}: {
  stat: Stat;
  index: number;
  label: string;
}) {
  const reduce = useReducedMotion();
  const Icon = stat.icon;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative px-5 sm:px-8 py-6 lg:py-2 text-center",
        // Dividers — vertical on lg, none on mobile.
        index !== STATS.length - 1 && "lg:border-r lg:border-border",
        // Soft separator between rows on mobile.
        index < 2 && "border-b border-border lg:border-b-0"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "mx-auto mb-4 inline-flex items-center justify-center",
          "w-11 h-11 rounded-2xl bg-primary/10 text-primary"
        )}
      >
        <Icon size={20} />
      </div>

      <div className="font-display leading-none text-foreground">
        <CountUp
          to={stat.value}
          suffix={stat.suffix ?? ""}
          className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem]"
        />
      </div>

      <div className="text-sm md:text-base text-[var(--color-muted-foreground)] mt-3">
        {label}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — animates a number from 0 to `to` once in view.           *
 * ------------------------------------------------------------------ */
function CountUp({
  to,
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = React.useState<number>(reduce ? to : 0);

  React.useEffect(() => {
    if (reduce) {
      setDisplay(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix}`}>
      <span>{display.toLocaleString()}</span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
}
