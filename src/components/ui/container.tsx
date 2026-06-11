import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Responsive content container.
 *
 *   `default`  → max-w-7xl   (matches the project's layout rule)
 *   `narrow`   → max-w-5xl   (long-form prose, principal message, forms)
 *   `wide`     → max-w-screen-2xl (gallery, hero edge-to-edge)
 *   `fluid`    → no max width
 *
 * Horizontal padding scales mobile-first: 16px → 24px → 32px.
 */

const widthMap = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  wide: "max-w-screen-2xl",
  fluid: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof widthMap;

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  /** Use `as="section"` to render a semantic element instead of a div. */
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { className, width = "default", as: Comp = "div", ...props },
    ref
  ) {
    return (
      <Comp
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          widthMap[width],
          className
        )}
        {...props}
      />
    );
  }
);
