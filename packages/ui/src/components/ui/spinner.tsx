// packages/ui/src/components/ui/spinner.tsx

"use client";

import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

// ============================================================================
// CVA Variants
// ============================================================================

const spinnerVariants = cva(
  [
    "rounded-full",
    "border-2",
    "border-t-transparent",
    "animate-spin",
    "border-primary-500",
    "dark:border-primary-400",
    "dark:border-t-transparent",
  ],
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Types
// ============================================================================

export type SpinnerSize = VariantProps<typeof spinnerVariants>["size"];

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Accessible label for screen readers */
  "aria-label"?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Spinner — A loading indicator component to show active states.
 *
 * Displays an animated circular spinner using design system tokens.
 * Fully accessible with proper ARIA attributes for screen readers.
 *
 * @example
 * ```tsx
 * <Spinner size="md" aria-label="Loading content" />
 * ```
 */
const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={ariaLabel || "Loading"}
        className={clsx(spinnerVariants({ size }), className)}
        {...props}
      >
        <span className="sr-only">{ariaLabel || "Loading..."}</span>
      </span>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };