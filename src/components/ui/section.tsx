import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerWidth } from "./container";

/**
 * `Section` is the standard vertical block for the homepage and inner pages.
 *
 *   • `spacing` controls the vertical rhythm (per the project's layout rule).
 *   • `surface` paints a background tone.
 *   • Set `bleed` to render edge-to-edge (no Container wrap) when the child
 *     needs to control its own width (e.g. a full-bleed image strip).
 */

const spacingMap = {
  none: "",
  sm: "py-10 md:py-16",
  md: "py-16 md:py-24 lg:py-32",
  lg: "py-20 md:py-28 lg:py-40",
} as const;

const surfaceMap = {
  default: "bg-background text-foreground",
  surface: "bg-[var(--color-surface)] text-foreground",
  muted: "bg-[var(--color-surface-muted)] text-foreground",
  primary: "bg-primary text-primary-foreground",
  inverse: "bg-foreground text-background",
} as const;

export type SectionSpacing = keyof typeof spacingMap;
export type SectionSurface = keyof typeof surfaceMap;

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  surface?: SectionSurface;
  containerWidth?: ContainerWidth;
  bleed?: boolean;
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    {
      className,
      spacing = "md",
      surface = "default",
      containerWidth = "default",
      bleed = false,
      as: Comp = "section",
      children,
      ...props
    },
    ref
  ) {
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative w-full",
          spacingMap[spacing],
          surfaceMap[surface],
          className
        )}
        {...props}
      >
        {bleed ? (
          children
        ) : (
          <Container width={containerWidth}>{children}</Container>
        )}
      </Comp>
    );
  }
);
