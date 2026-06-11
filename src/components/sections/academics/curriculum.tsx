"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  BookIcon,
  CompassIcon,
  CpuIcon,
  GraduationCapIcon,
  MonitorIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
} from "@/components/layout/icons";

type Subject = {
  key: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const SUBJECTS: Subject[] = [
  { key: "english", icon: BookIcon },
  { key: "math", icon: GraduationCapIcon },
  { key: "science", icon: SparklesIcon },
  { key: "social", icon: CompassIcon },
  { key: "languages", icon: StarIcon },
  { key: "arts", icon: MonitorIcon },
  { key: "computer", icon: CpuIcon },
  { key: "physical", icon: TrophyIcon },
];

export function Curriculum() {
  const t = useTranslations("pages.academics.curriculum");

  return (
    <section
      aria-labelledby="academics-curriculum"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={<span id="academics-curriculum">{t("title")}</span>}
          description={t("description")}
          align="center"
          width="lg"
          level={2}
        />

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {SUBJECTS.map((s, i) => (
            <SubjectCard key={s.key} subject={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SubjectCard({
  subject,
  index,
}: {
  subject: Subject;
  index: number;
}) {
  const reduce = useReducedMotion();
  const t = useTranslations(`pages.academics.curriculum.items.${subject.key}`);
  const Icon = subject.icon;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group rounded-3xl border border-border bg-[var(--color-surface)]",
        "p-5 md:p-6 shadow-sm hover-lift"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center w-11 h-11 rounded-2xl",
          "bg-primary/10 text-primary",
          "group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
        )}
      >
        <Icon size={20} />
      </span>

      <h3 className="font-display text-base md:text-lg text-foreground mt-4">
        {t("title")}
      </h3>
      <p className="text-xs md:text-sm text-[var(--color-muted-foreground)] mt-1.5 leading-relaxed text-pretty">
        {t("description")}
      </p>
    </motion.div>
  );
}
