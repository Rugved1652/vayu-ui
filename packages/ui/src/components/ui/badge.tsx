"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, KeyboardEvent } from "react";

// ============================================================================
// Variants (CVA)
// ============================================================================

const badgeVariants = cva(
    "inline-flex items-center justify-center font-medium rounded-full transition-colors",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary-500 text-white border border-transparent shadow-outer dark:bg-primary-600 dark:text-white",
                neutral:
                    "bg-ground-100 text-ground-900 border border-transparent dark:bg-ground-800 dark:text-ground-100",
                outline:
                    "bg-transparent text-ground-900 border border-ground-300 dark:text-ground-100 dark:border-ground-700",
                destructive:
                    "bg-error-500 text-white border border-transparent shadow-outer dark:bg-error-900 dark:text-error-100",
                success:
                    "bg-success-500 text-white border border-transparent shadow-outer dark:bg-success-900 dark:text-success-100",
                warning:
                    "bg-warning-500 text-white border border-transparent shadow-outer dark:bg-warning-900 dark:text-warning-100",
                info:
                    "bg-info-500 text-white border border-transparent shadow-outer dark:bg-info-900 dark:text-info-100",
            },
            size: {
                sm: "text-[10px] px-1.5 h-4 min-w-[16px] gap-1",
                md: "text-xs px-2.5 h-6 min-w-[24px] gap-1.5",
                lg: "text-sm px-3 h-7 min-w-[28px] gap-2",
            },
            interactive: {
                true: "cursor-pointer hover:opacity-80 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500",
                false: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            interactive: false,
        },
    }
);

// ============================================================================
// Types
// ============================================================================

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
export type BadgeSize = VariantProps<typeof badgeVariants>["size"];

export interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

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
            onKeyDown,
            onClick,
            ...props
        },
        ref
    ) => {
        const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
            if (interactive && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onClick?.(event as unknown as React.MouseEvent<HTMLSpanElement>);
            }
            onKeyDown?.(event);
        };

        return (
            <span
                ref={ref}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                onKeyDown={interactive ? handleKeyDown : onKeyDown}
                className={clsx(badgeVariants({ variant, size, interactive }), className)}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };