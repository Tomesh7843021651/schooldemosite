"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CompassIcon, StarIcon } from "@/components/layout/icons";

/**
 * Vision + Mission as a twin-card section. Each card uses a distinct
 * brand gradient and large icon chip.
 */
export function VisionMission() {
  const vision = useTranslations("pages.about.vision");
  const mission = useTranslations("pages.about.mission");
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Vision and Mission"
      className="py-16 md:py-24 lg:py-32 bg-[var(--color-surface-muted)]"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Card
            eyebrow={vision("eyebrow")}
            title={vision("title")}
            description={vision("description")}
            icon={<CompassIcon size={26} />}
            gradient="bg-gradient-to-br from-primary via-primary/85 to-accent"
            reduce={!!reduce}
            delay={0}
          />
          <Card
            eyebrow={mission("eyebrow")}
            title={mission("title")}
            description={mission("description")}
            icon={<StarIcon size={26} />}
            gradient="bg-gradient-to-br from-accent via-accent/80 to-secondary/70"
            reduce={!!reduce}
            delay={0.08}
          />
        </div>
      </Container>
    </section>
  );
}

function Card({
  eyebrow,
  title,
  description,
  icon,
  gradient,
  reduce,
  delay,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  reduce: boolean;
  delay: number;
}) {
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl text-primary-foreground",
        "p-8 md:p-10 lg:p-12 shadow-md hover-lift",
        gradient
      )}
    >
      <span
        aria-hidden
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary-foreground/15 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-foreground/10 blur-3xl"
      />

      <div
        aria-hidden
        className={cn(
          "relative inline-flex items-center justify-center w-14 h-14 rounded-2xl",
          "bg-primary-foreground/15 border border-primary-foreground/20"
        )}
      >
        {icon}
      </div>

      <div className="relative mt-6 text-eyebrow !text-primary-foreground/80">
        {eyebrow}
      </div>
      <Heading
        level={3}
        size="h3"
        className="relative mt-2 text-primary-foreground"
      >
        {title}
      </Heading>
      <p className="relative text-base md:text-lg text-primary-foreground/85 mt-4 leading-relaxed text-pretty">
        {description}
      </p>
    </motion.article>
  );
}
