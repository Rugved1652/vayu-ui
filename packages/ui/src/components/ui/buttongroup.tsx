// button-group.tsx
// TRUE Server Component (No "use client", No cloneElement)

import { clsx } from "clsx";
import { HTMLAttributes } from "react";

// ============================================================================
// Types
// ============================================================================

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Stack buttons vertically instead of horizontally. */
    orientation?: "horizontal" | "vertical";
    /** Force a specific size on all child buttons via CSS. */
    size?: "small" | "medium" | "large";
    /** Make the group span the full width of its container. */
    fullWidth?: boolean;
    /** Accessible label for the button group. */
    "aria-label"?: string;
    /** ID of an element that labels this button group. */
    "aria-labelledby"?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Groups multiple `<Button>` elements together.
 * 
 * - Uses CSS to enforce sizing and border connections (Server Component safe).
 * - No Context or cloneElement required.
 * - WCAG 2.2 AA Compliant (Focus management via z-index).
 */
export function ButtonGroup({
    orientation = "horizontal",
    size = "medium",
    fullWidth = false,
    className,
    children,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...props
}: ButtonGroupProps) {
    // We define size classes here to apply them via CSS selectors.
    // This mimics the Button's internal logic without passing props.
    const sizeClasses = {
        small: "[&>button]:px-3 [&>button]:py-2 [&>button]:text-sm [&>button]:min-h-[36px]",
        medium: "[&>button]:px-4 [&>button]:py-2.5 [&>button]:text-base [&>button]:min-h-[40px]",
        large: "[&>button]:px-6 [&>button]:py-3 [&>button]:text-lg [&>button]:min-h-[44px]",
    };

    return (
        <div
            role="group"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            className={clsx(
                // Base layout
                "inline-flex",
                orientation === "vertical" ? "flex-col" : "flex-row",
                
                // Full Width Logic
                fullWidth ? "w-full [&>button]:flex-1" : "w-auto",

                // ── Size Enforcement (CSS Override) ──
                // We force these styles onto direct button children
                sizeClasses[size],

                // ── Orientation Logic ──
                // Border radius and overlap handled in global CSS

                // ── WCAG Focus Management ──
                // Ensure the focused button sits on top of its siblings.
                // This ensures the focus ring is fully visible (WCAG 2.4.11).
                "[&>button:hover]:z-10",
                "[&>button:focus-visible]:z-10",

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}