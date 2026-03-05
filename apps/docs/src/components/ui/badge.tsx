"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes } from "react";

// ============================================================================
// Types
// ============================================================================

export type BadgeVariant =
    | "primary"
    | "neutral"
    | "outline"
    | "destructive"
    | "success"
    | "warning"
    | "info";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    interactive?: boolean;
}

// ============================================================================
// Component
// ============================================================================

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            interactive = false,
            ...props
        },
        ref
    ) => {
        return (
            <span
                ref={ref}
                className={clsx(
                    "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",

                    // Sizes
                    size === "sm" && "text-[10px] px-1.5 h-4 min-w-[16px] gap-1",
                    size === "md" && "text-xs px-2.5 h-6 min-w-[24px] gap-1.5",
                    size === "lg" && "text-sm px-3 h-7 min-w-[28px] gap-2",

                    // Variants
                    variant === "primary" &&
                    "bg-primary-500 text-white border border-transparent shadow-sm dark:bg-primary-600 dark:text-white",

                    variant === "neutral" &&
                    "bg-ground-100 text-ground-900 border border-transparent dark:bg-ground-800 dark:text-ground-100",

                    variant === "outline" &&
                    "bg-transparent text-ground-900 border border-ground-300 dark:text-ground-100 dark:border-ground-700",

                    variant === "destructive" &&
                    "bg-red-500 text-white border border-transparent shadow-sm dark:bg-red-900 dark:text-red-100",

                    variant === "success" &&
                    "bg-green-500 text-white border border-transparent shadow-sm dark:bg-green-900 dark:text-green-100",

                    variant === "warning" &&
                    "bg-amber-500 text-white border border-transparent shadow-sm dark:bg-amber-900 dark:text-amber-100",

                    variant === "info" &&
                    "bg-blue-500 text-white border border-transparent shadow-sm dark:bg-blue-900 dark:text-blue-100",

                    // Interactive
                    interactive && "cursor-pointer hover:opacity-80 active:scale-95",

                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
