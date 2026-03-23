// button.tsx
// "use client" is required here because we use forwardRef and handle events (onClick, etc.).
// This allows the button to work in both Client and Server Components seamlessly.
"use client";

import { clsx } from "clsx";
import React, {
    ButtonHTMLAttributes,
    forwardRef,
    HTMLAttributes,
} from "react";

// ============================================================================
// Types & Enums
// ============================================================================

enum Status {
    IDLE = "idle",
    PENDING = "pending",
    SUCCESS = "success",
    REJECTED = "rejected",
}

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";

type ButtonSize = "small" | "medium" | "large";

type BadgePosition = "top-right" | "top-left" | "inline-right" | "inline-left";

type BadgeVariant = "primary" | "danger" | "warning" | "info" | "success";

// ============================================================================
// Spinner Component
// ============================================================================

const Spinner = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) => (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin w-4 h-4"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
);
Spinner.displayName = "Spinner";

// ============================================================================
// Main Button Component
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: Status;
    fullWidth?: boolean;
    loadingText?: string;
    "aria-label"?: string;
}

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "small",
            loading = Status.IDLE,
            fullWidth = false,
            loadingText = "Loading",
            disabled = false,
            className,
            type = "button",
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        const isLoading = loading === Status.PENDING;
        const isDisabled = disabled || isLoading;

        // Size variants
        const sizeClasses = {
            small: "px-3 py-2 text-sm gap-2 min-h-[36px]",
            medium: "px-4 py-2.5 text-base gap-2.5 min-h-[40px]",
            large: "px-6 py-3 text-lg gap-3 min-h-[44px]",
        };

        // Variant styles using semantic design tokens
        const variantClasses = {
            primary: clsx(
                "bg-brand text-brand-content",
                "border border-brand/80",
                "hover:bg-brand/90 active:bg-brand/80",
                "shadow-control",
                "dark:bg-brand dark:text-brand-content",
                "dark:border-brand/80",
                "dark:hover:bg-brand/90 dark:active:bg-brand/80"
            ),
            secondary: clsx(
                "bg-muted hover:bg-muted/80 active:bg-muted/70",
                "text-surface-content font-medium",
                "border border-border hover:border-border/80",
                "shadow-control",
                "dark:bg-muted dark:hover:bg-muted/80",
                "dark:text-surface-content dark:border-border"
            ),
            outline: clsx(
                "bg-transparent hover:bg-muted/50 active:bg-muted/70",
                "text-surface-content font-medium",
                "border-2 border-border hover:border-border/80",
                "dark:hover:bg-muted/50 dark:active:bg-muted/70",
                "dark:text-surface-content dark:border-border"
            ),
            ghost: clsx(
                "bg-transparent hover:bg-muted/50 active:bg-muted/70",
                "text-muted-content hover:text-surface-content font-medium",
                "border border-transparent",
                "dark:hover:bg-muted/50 dark:active:bg-muted/70",
                "dark:text-muted-content dark:hover:text-surface-content"
            ),
            destructive: clsx(
                "bg-destructive text-destructive-content",
                "border border-destructive/80",
                "hover:bg-destructive/90 active:bg-destructive/80",
                "shadow-control",
                "dark:bg-destructive dark:text-destructive-content",
                "dark:border-destructive/80",
                "dark:hover:bg-destructive/90 dark:active:bg-destructive/80"
            ),
        };

        const buttonClasses = clsx(
            "relative inline-flex items-center justify-center",
            "rounded-control",
            "font-medium",
            "transition-all duration-150 ease-in-out",
            "outline-none focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-offset-2",
            variant === "primary" && "focus-visible:ring-brand",
            variant === "secondary" && "focus-visible:ring-focus",
            variant === "outline" && "focus-visible:ring-focus",
            variant === "ghost" && "focus-visible:ring-focus",
            variant === "destructive" && "focus-visible:ring-destructive",
            "focus-visible:ring-offset-canvas",
            sizeClasses[size],
            variantClasses[variant],
            fullWidth ? "w-full" : "w-auto",
            isDisabled && "cursor-not-allowed opacity-60 pointer-events-none",
            !isDisabled && "active:scale-[0.98]",
            className
        );

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={isLoading}
                aria-live={isLoading ? "polite" : undefined}
                aria-label={ariaLabel}
                data-variant={variant}
                data-size={size}
                data-loading={loading}
                className={buttonClasses}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Spinner aria-hidden="true" />
                        <span className="sr-only">{loadingText}</span>
                        <span aria-hidden="true">{loadingText}</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

ButtonRoot.displayName = "Button";

// ============================================================================
// Icon Component
// ============================================================================

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    size?: ButtonSize;
    children: React.ReactNode;
    label?: string;
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({ children, size = "small", label, className, ...props }, ref) => {
        const iconSizeClasses = {
            small: "w-4 h-4",
            medium: "w-5 h-5",
            large: "w-6 h-6",
        };

        return (
            <span
                ref={ref}
                aria-hidden={!label}
                aria-label={label}
                role={label ? "img" : undefined}
                className={clsx(
                    "inline-flex items-center justify-center shrink-0",
                    iconSizeClasses[size],
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Icon.displayName = "Button.Icon";

// ============================================================================
// Badge Component
// ============================================================================

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    size?: ButtonSize;
    value?: number | string;
    max?: number;
    position?: BadgePosition;
    variant?: BadgeVariant;
    showZero?: boolean;
    className?: string;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            size = "small",
            value,
            max = 99,
            position = "top-right",
            variant = "danger",
            showZero = false,
            className,
            ...props
        },
        ref
    ) => {
        const getBadgeContent = () => {
            if (typeof value === "number") {
                if (value === 0 && !showZero) return null;
                return value > max ? `${max}+` : value.toString();
            }
            return value;
        };

        const badgeContent = getBadgeContent();
        const showBadge = badgeContent !== null && badgeContent !== undefined;

        if (!showBadge) return null;

        const badgeSizeClasses = {
            small: "min-w-[20px] h-[20px] text-[11px] px-1.5",
            medium: "min-w-[22px] h-[22px] text-xs px-2",
            large: "min-w-[24px] h-[24px] text-xs px-2",
        };

        const badgeVariantClasses = {
            primary: "bg-brand text-brand-content",
            danger: "bg-destructive text-destructive-content",
            warning: "bg-warning text-warning-content",
            info: "bg-info text-info-content",
            success: "bg-success text-success-content",
        };

        const badgePositionClasses = {
            "top-right": "absolute -top-1.5 -right-1.5",
            "top-left": "absolute -top-1.5 -left-1.5",
            "inline-right": "relative ml-1",
            "inline-left": "relative mr-1",
        };

        const getAriaLabel = () => {
            if (typeof value === "number") {
                const count = value > max ? `more than ${max}` : value;
                return `${count} notification${value !== 1 ? "s" : ""}`;
            }
            return value ? String(value) : undefined;
        };

        return (
            <span
                ref={ref}
                role="status"
                aria-live="polite"
                aria-label={getAriaLabel()}
                className={clsx(
                    "inline-flex items-center justify-center",
                    "rounded-full font-semibold leading-none",
                    "border-2 border-canvas",
                    "shadow-control",
                    // FIX: Added z-10 to ensure badge sits above button content
                    "z-10",
                    badgeSizeClasses[size],
                    badgeVariantClasses[variant],
                    badgePositionClasses[position],
                    className
                )}
                {...props}
            >
                <span aria-hidden="true">{badgeContent}</span>
            </span>
        );
    }
);

Badge.displayName = "Button.Badge";

// ============================================================================
// Text Component
// ============================================================================

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <span ref={ref} className={clsx("truncate", className)} {...props}>
                {children}
            </span>
        );
    }
);

Text.displayName = "Button.Text";

// ============================================================================
// Compound Component Export
// ============================================================================

export const Button = Object.assign(ButtonRoot, {
    Icon,
    Badge,
    Text,
});

export { Status };
export type {
    BadgePosition,
    BadgeProps,
    BadgeVariant,
    ButtonProps,
    ButtonSize,
    ButtonVariant,
    IconProps,
    TextProps,
};