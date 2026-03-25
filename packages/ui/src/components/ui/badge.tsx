import {
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { cn } from "./utils"; // Adjust import path as needed
import { XIcon } from "../icons";

// ============================================================================
// Types
// ============================================================================

export type BadgeVariant =
  | "brand"
  | "muted"
  | "warning"
  | "success"
  | "destructive"
  | "info";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "onClick"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Forces a specific HTML tag */
  as?: "span" | "div" | "a";
  /** Makes the badge interactive (renders as <button>) */
  onClick?: () => void;
  /** Adds a dismiss button */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
  children?: ReactNode;
}

// ============================================================================
// Styles Configuration (Theme Aware)
// ============================================================================

const variants: Record<BadgeVariant, string> = {
  // Brand color for primary actions and emphasis
  brand: cn(
    "bg-brand text-brand-content",
  ),

  // Muted for de-emphasized UI elements
  muted: cn(
    "bg-muted text-muted-content",
    "border border-border",
  ),

  // Warning for caution states
  warning: cn(
    "bg-warning text-warning-content",
  ),

  // Success for positive states
  success: cn(
    "bg-success text-success-content",
  ),

  // Destructive for error/delete actions
  destructive: cn(
    "bg-destructive text-destructive-content",
  ),

  // Info for informational states
  info: cn(
    "bg-info text-info-content",
  ),
};

const sizes: Record<BadgeSize, string> = {
  // h-6 (24px) is the WCAG 2.2 minimum target size
  sm: "text-[10px] h-6 px-2.5 min-w-[24px]",
  md: "text-xs h-7 px-3 min-w-[28px]",
  lg: "text-sm h-8 px-4 min-w-[32px]",
};

// ============================================================================
// Icon Component (Inline SVG for Server Components)
// ============================================================================

const DismissIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "brand",
      size = "md",
      as,
      onClick,
      onDismiss,
      dismissLabel = "Remove",
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!onClick;
    const isDismissible = !!onDismiss;

    // Determine the underlying HTML element.
    // 1. If user forces 'as', use it.
    // 2. If 'onClick' exists, use 'button' (semantic interactive).
    // 3. Default to 'span'.
    const Component = as || (isInteractive ? "button" : "span");

    const baseStyles = cn(
      // Layout
      "inline-flex items-center justify-center gap-1.5",
      // Typography (Using theme primary font)
      "font-primary font-medium",
      // Shape
      "rounded-full",
      // Transitions
      "transition-colors duration-150",
      // Focus Management (WCAG 2.4.7)
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus dark:focus:ring-offset-canvas",

      sizes[size],
      variants[variant],

      // Interactive styling
      isInteractive && "cursor-pointer hover:opacity-90 active:scale-95",

      className
    );

    // -----------------------------------------------------------------------
    // Case 1: Dismissible AND Interactive
    // -----------------------------------------------------------------------
    // We cannot nest buttons. We render a 'group' container with two sibling buttons.

    if (isDismissible && isInteractive) {
      return (
        <span
          ref={ref}
          className={cn(baseStyles, "p-0 overflow-hidden")}
          role="group"
          {...props}
        >
          {/* Main Action Area */}
          <button
            type="button"
            onClick={onClick}
            className="flex-1 h-full px-3 focus:outline-none focus:ring-inset focus:ring-2 hover:opacity-90 transition-opacity"
          >
            {children}
          </button>

          {/* Visual Separator */}
          <span
            className="h-full w-px bg-current opacity-20"
            aria-hidden="true"
          />

          {/* Dismiss Action */}
          <button
            type="button"
            onClick={onDismiss}
            className="px-2 h-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-inset focus:ring-2"
            aria-label={dismissLabel}
          >
            <XIcon />
          </button>
        </span>
      );
    }

    // -----------------------------------------------------------------------
    // Case 2: Dismissible Only (Static Badge)
    // -----------------------------------------------------------------------

    if (isDismissible) {
      return (
        <span ref={ref} className={cn(baseStyles, "pr-1.5")} {...props}>
          <span>{children}</span>
          <button
            type="button"
            onClick={onDismiss}
            className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-inset"
            aria-label={dismissLabel}
          >
            <XIcon />
          </button>
        </span>
      );
    }

    // -----------------------------------------------------------------------
    // Case 3: Standard (Interactive or Static)
    // -----------------------------------------------------------------------

    return (
      <Component
        ref={ref as any}
        className={baseStyles}
        // Ensure type="button" if rendered as button to prevent form submission
        {...(Component === "button" && { type: "button" })}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Badge.displayName = "Badge";