"use client";

import { clsx } from "clsx";
import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes } from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CardVariant = "elevated" | "outlined" | "filled" | "ghost";
type CardSize = "sm" | "md" | "lg";
type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

// ============================================================================
// Module-scope style constants
// ============================================================================

const variantClasses: Record<CardVariant, string> = {
    elevated:
        "bg-white dark:bg-ground-900 border border-ground-200 dark:border-ground-800 shadow-md hover:shadow-lg",
    outlined:
        "bg-transparent border border-ground-300 dark:border-ground-700 hover:border-ground-400 dark:hover:border-ground-600",
    filled:
        "bg-ground-100 dark:bg-ground-800 border border-transparent hover:bg-ground-200 dark:hover:bg-ground-700",
    ghost:
        "bg-transparent border border-transparent hover:bg-ground-100 dark:hover:bg-ground-900",
};

const sizeClasses: Record<CardSize, string> = {
    sm: "p-3 gap-2",
    md: "p-5 gap-3",
    lg: "p-7 gap-4",
};

const radiusClasses: Record<CardRadius, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-3xl",
};

// ============================================================================
// Card (Root)
// ============================================================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Visual style variant. */
    variant?: CardVariant;
    /** Padding / gap size. */
    size?: CardSize;
    /** Border-radius preset. */
    radius?: CardRadius;
    /** Make the entire card a clickable surface. */
    interactive?: boolean;
    /** Render as an `<a>` when linked. */
    href?: string;
    /** Anchor props forwarded when `href` is set. */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
    /** Disable interactions. */
    disabled?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = "elevated",
            size = "md",
            radius = "lg",
            interactive = false,
            href,
            target,
            rel,
            disabled = false,
            className,
            children,
            onClick,
            ...props
        },
        ref
    ) => {
        const isClickable = interactive || !!href || !!onClick;

        const rootClasses = clsx(
            "flex flex-col transition-all duration-200",
            variantClasses[variant],
            sizeClasses[size],
            radiusClasses[radius],
            isClickable && !disabled && "cursor-pointer",
            isClickable &&
            !disabled &&
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
        );

        // Linked card
        if (href && !disabled) {
            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={href}
                    target={target}
                    rel={
                        rel ||
                        (target === "_blank"
                            ? "noopener noreferrer"
                            : undefined)
                    }
                    className={rootClasses}
                    aria-disabled={disabled || undefined}
                    {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {children}
                </a>
            );
        }

        // Interactive card (button-like)
        if (isClickable && !disabled) {
            return (
                <div
                    ref={ref}
                    role="button"
                    tabIndex={0}
                    className={rootClasses}
                    onClick={onClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onClick?.(
                                e as unknown as React.MouseEvent<HTMLDivElement>
                            );
                        }
                    }}
                    aria-disabled={disabled || undefined}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        // Static card
        return (
            <div
                ref={ref}
                className={rootClasses}
                aria-disabled={disabled || undefined}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

// ============================================================================
// CardHeader
// ============================================================================

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Main title text. */
    title?: React.ReactNode;
    /** Subtitle / description under the title. */
    subtitle?: React.ReactNode;
    /** Element rendered on the trailing side (e.g. icon button, badge). */
    action?: React.ReactNode;
    /** Optional leading icon / avatar. */
    avatar?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ title, subtitle, action, avatar, className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("flex items-start gap-3", className)}
            {...props}
        >
            {avatar && (
                <div className="shrink-0" aria-hidden="true">
                    {avatar}
                </div>
            )}
            <div className="flex-1 min-w-0">
                {title && (
                    <h3 className="text-lg font-primary font-semibold text-ground-900 dark:text-ground-50 leading-tight truncate">
                        {title}
                    </h3>
                )}
                {subtitle && (
                    <p className="mt-0.5 text-sm font-secondary text-ground-500 dark:text-ground-400 leading-snug">
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
            {action && <div className="shrink-0 ml-auto">{action}</div>}
        </div>
    )
);

CardHeader.displayName = "CardHeader";

// ============================================================================
// CardMedia
// ============================================================================

interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
    /** Image source URL. */
    src: string;
    /** Alt text for the image. */
    alt: string;
    /** CSS aspect-ratio. */
    aspectRatio?: string;
    /** Object-fit behaviour. */
    fit?: "cover" | "contain" | "fill";
    /** Optional overlay content rendered on top of the image. */
    overlay?: React.ReactNode;
}

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
    (
        {
            src,
            alt,
            aspectRatio = "16/9",
            fit = "cover",
            overlay,
            className,
            ...props
        },
        ref
    ) => {
        const fitClass =
            fit === "cover"
                ? "object-cover"
                : fit === "contain"
                    ? "object-contain"
                    : "object-fill";

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative -mx-[inherit] overflow-hidden first:-mt-[inherit] first:rounded-t-[inherit] last:-mb-[inherit] last:rounded-b-[inherit]",
                    className
                )}
                style={{ aspectRatio }}
                {...props}
            >
                <img
                    src={src}
                    alt={alt}
                    className={clsx("w-full h-full", fitClass)}
                    loading="lazy"
                />
                {overlay && (
                    <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4">
                        {overlay}
                    </div>
                )}
            </div>
        );
    }
);

CardMedia.displayName = "CardMedia";

// ============================================================================
// CardContent
// ============================================================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> { }

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "font-secondary text-sm text-ground-700 dark:text-ground-300 leading-relaxed",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

CardContent.displayName = "CardContent";

// ============================================================================
// CardFooter
// ============================================================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Horizontal alignment. */
    align?: "start" | "center" | "end" | "between";
}

const alignClasses: Record<NonNullable<CardFooterProps["align"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
};

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ align = "end", className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "flex items-center gap-2 pt-2 border-t border-ground-200 dark:border-ground-800",
                alignClasses[align],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

CardFooter.displayName = "CardFooter";

// ============================================================================
// CardBadge
// ============================================================================

type BadgeColor = "primary" | "secondary" | "success" | "warning" | "error" | "info";

interface CardBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    color?: BadgeColor;
}

const badgeColorClasses: Record<BadgeColor, string> = {
    primary:
        "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300",
    secondary:
        "bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300",
    success:
        "bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-300",
    warning:
        "bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-300",
    error:
        "bg-error-100 dark:bg-error-900/40 text-error-700 dark:text-error-300",
    info:
        "bg-info-100 dark:bg-info-900/40 text-info-700 dark:text-info-300",
};

const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(
    ({ color = "primary", className, children, ...props }, ref) => (
        <span
            ref={ref}
            className={clsx(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-secondary font-semibold",
                badgeColorClasses[color],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
);

CardBadge.displayName = "CardBadge";

// ============================================================================
// Exports
// ============================================================================

export { Card, CardBadge, CardContent, CardFooter, CardHeader, CardMedia };

export type {
    BadgeColor,
    CardBadgeProps,
    CardContentProps,
    CardFooterProps,
    CardHeaderProps,
    CardMediaProps,
    CardProps,
    CardRadius,
    CardSize,
    CardVariant,
};
