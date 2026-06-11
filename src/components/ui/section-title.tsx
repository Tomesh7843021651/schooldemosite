"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heading, type HeadingSize } from "./heading";

/**
 * Eyebrow + Heading + Description trio used at the top of every section.
 *
 * Animates with a single Framer Motion "fade-up + stagger" entry.
 * Use `align="center"` for hero / CTA blocks, `align="left"` otherwise.
 */

const alignClass = {
  left: "items-start text-left",
  center: "items-center text-center mx-auto",
  right: "items-end text-right ml-auto",
} as const;

const widthClass = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
} as const;

export type SectionTitleAlign = keyof typeof alignClass;
export type SectionTitleWidth = keyof typeof widthClass;

export interface SectionTitleProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: SectionTitleAlign;
  width?: SectionTitleWidth;
  level?: 1 | 2 | 3;
  size?: HeadingSize;
  className?: string;
  /** Disable the entry animation (e.g. when the parent already animates). */
  animate?: boolean;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  width = "lg",
  level = 2,
  size,
  className,
  animate = true,
}: SectionTitleProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const content = (
    <>
      {eyebrow ? (
        <motion.span
          variants={shouldAnimate ? item : undefined}
          className="text-eyebrow inline-flex items-center gap-2 mb-4"
        >
          <span
            aria-hidden
            className="inline-block h-px w-6 bg-current opacity-60"
          />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.div variants={shouldAnimate ? item : undefined}>
        <Heading
          level={level}
          size={size}
          align={align}
          className="text-foreground"
        >
          {title}
        </Heading>
      </motion.div>

      {description ? (
        <motion.p
          variants={shouldAnimate ? item : undefined}
          className="text-lead mt-4 text-pretty"
        >
          {description}
        </motion.p>
      ) : null}
    </>
  );

  return (
    <motion.div
      initial={shouldAnimate ? "hidden" : false}
      whileInView={shouldAnimate ? "show" : undefined}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={shouldAnimate ? container : undefined}
      className={cn(
        "flex flex-col",
        alignClass[align],
        widthClass[width],
        className
      )}
    >
      {content}
    </motion.div>
  );
}
