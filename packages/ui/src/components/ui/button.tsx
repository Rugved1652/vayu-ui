// button.tsx - TRUE Server Component (No "use client" needed!)

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
            role="status"
            aria-label="Loading"
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

        // Variant styles
        const variantClasses = {
            primary: clsx(
                "bg-primary-600 text-white",
                "border border-primary-700",
                "hover:bg-primary-700 active:bg-primary-800",
                "shadow-outer",
                "dark:bg-primary-500 dark:text-white",
                "dark:border-primary-600",
                "dark:hover:bg-primary-600 dark:active:bg-primary-700"
            ),
            secondary: clsx(
                "bg-ground-100 hover:bg-ground-200 active:bg-ground-300",
                "text-ground-800 font-medium",
                "border border-ground-300 hover:border-ground-400",
                "shadow-outer",
                "dark:bg-ground-800 dark:hover:bg-ground-700",
                "dark:text-ground-100 dark:border-ground-600"
            ),
            outline: clsx(
                "bg-transparent hover:bg-ground-100 active:bg-ground-200",
                "text-ground-800 font-medium",
                "border-2 border-ground-400 hover:border-ground-500",
                "dark:hover:bg-ground-800 dark:active:bg-ground-700",
                "dark:text-ground-100 dark:border-ground-500"
            ),
            ghost: clsx(
                "bg-transparent hover:bg-ground-100 active:bg-ground-200",
                "text-ground-700 hover:text-ground-900 font-medium",
                "border border-transparent",
                "dark:hover:bg-ground-800 dark:active:bg-ground-700",
                "dark:text-ground-300 dark:hover:text-ground-100"
            ),
            destructive: clsx(
                "bg-error-600 text-white",
                "border border-error-700",
                "hover:bg-error-700 active:bg-error-800",
                "shadow-outer",
                "dark:bg-error-500 dark:text-white",
                "dark:border-error-600",
                "dark:hover:bg-error-600 dark:active:bg-error-700"
            ),
        };

        const buttonClasses = clsx(
            "relative inline-flex items-center justify-center",
            "rounded",
            "font-secondary font-medium",
            "transition-all duration-150 ease-in-out",
            "outline-none focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-offset-2",
            variant === "primary" && "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
            variant === "secondary" && "focus-visible:ring-ground-500 dark:focus-visible:ring-ground-400",
            variant === "outline" && "focus-visible:ring-ground-600 dark:focus-visible:ring-ground-400",
            variant === "ghost" && "focus-visible:ring-ground-600 dark:focus-visible:ring-ground-400",
            variant === "destructive" && "focus-visible:ring-error-600 dark:focus-visible:ring-error-500",
            "focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
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
// Icon Component - NO CONTEXT, accepts size as prop
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
// Badge Component - NO CONTEXT, accepts size as prop
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
            primary: "bg-primary-600 text-white dark:bg-primary-500",
            danger: "bg-error-600 text-white dark:bg-error-500",
            warning: "bg-warning-700 text-white dark:bg-warning-600",
            info: "bg-info-600 text-white dark:bg-info-500",
            success: "bg-success-600 text-white dark:bg-success-500",
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
                    "border-2 border-white dark:border-ground-950",
                    "shadow-outer",
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