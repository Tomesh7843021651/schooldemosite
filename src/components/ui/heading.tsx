import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Polymorphic display / heading element.
 *
 * `level`  → semantic tag (h1–h6, default h2)
 * `size`   → visual scale, independent of semantics
 * `tone`   → color (default | muted | primary | secondary | accent | onPrimary)
 * `align`  → text alignment
 *
 * Visual styles come from the `.text-*` utility classes defined in
 * `src/styles/typography.css`, so the scale stays fluid and consistent.
 */

const sizeMap = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;

const toneMap = {
  default: "text-foreground",
  muted: "text-[var(--color-muted-foreground)]",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  onPrimary: "text-primary-foreground",
} as const;

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

type Level = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = keyof typeof sizeMap;
export type HeadingTone = keyof typeof toneMap;
export type HeadingAlign = keyof typeof alignMap;

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> {
  level?: Level;
  size?: HeadingSize;
  tone?: HeadingTone;
  align?: HeadingAlign;
  balance?: boolean;
  as?: React.ElementType;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      className,
      level = 2,
      size,
      tone = "default",
      align = "left",
      balance = true,
      as,
      ...props
    },
    ref
  ) {
    const Comp = as ?? (`h${level}` as React.ElementType);
    const resolvedSize: HeadingSize =
      size ??
      (level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4");

    return (
      <Comp
        ref={ref}
        className={cn(
          "font-display",
          sizeMap[resolvedSize],
          toneMap[tone],
          alignMap[align],
          balance && "text-balance",
          className
        )}
        {...props}
      />
    );
  }
);
