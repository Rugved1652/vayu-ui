"use client";

import React, {
    forwardRef,
    HTMLAttributes,
    AnchorHTMLAttributes,
} from "react";
import { cn } from "./utils";

// ============================================================================
// Card (Root)
// ============================================================================

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
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

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
    (
        {
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

        // Base styles using semantic design tokens
        const baseStyles = cn(
            "flex flex-col transition-all duration-200",
            "bg-surface",
            "border border-border",
            "rounded-surface p-5 gap-3",
            "shadow-surface hover:shadow-elevated"
        );

        // WCAG 2.2 AA: Focus visible styling using semantic focus token
        const focusStyles =
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

        const rootClasses = cn(
            baseStyles,
            isClickable && !disabled && "cursor-pointer",
            isClickable && !disabled && focusStyles,
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
                        (target === "_blank" ? "noopener noreferrer" : undefined)
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
                        // WCAG 2.1.1: Keyboard accessible
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

CardRoot.displayName = "Card";

// ============================================================================
// CardHeader
// ============================================================================

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Main title text. */
    title?: React.ReactNode;
    /** Subtitle / description under the title. */
    subtitle?: React.ReactNode;
    /** Element rendered on the trailing side (e.g. icon button). */
    action?: React.ReactNode;
    /** Optional leading icon / avatar. */
    avatar?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ title, subtitle, action, avatar, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex items-start gap-3", className)}
                {...props}
            >
                {avatar && (
                    <div className="shrink-0" aria-hidden="true">
                        {avatar}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    {title && (
                        <h3 className="text-lg font-primary font-semibold text-surface-content leading-tight truncate">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="mt-0.5 text-sm font-secondary text-muted-content leading-snug">
                            {subtitle}
                        </p>
                    )}
                    {children}
                </div>
                {action && <div className="shrink-0 ml-auto">{action}</div>}
            </div>
        );
    }
);

CardHeader.displayName = "Card.Header";

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
                className={cn(
                    "relative -mx-[inherit] overflow-hidden first:-mt-[inherit] first:rounded-t-[inherit] last:-mb-[inherit] last:rounded-b-[inherit]",
                    className
                )}
                style={{ aspectRatio }}
                {...props}
            >
                <img
                    src={src}
                    alt={alt}
                    className={cn("w-full h-full", fitClass)}
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

CardMedia.displayName = "Card.Media";

// ============================================================================
// CardContent
// ============================================================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "font-secondary text-sm text-surface-content/80 leading-relaxed",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardContent.displayName = "Card.Content";

// ============================================================================
// CardFooter
// ============================================================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center gap-2 pt-2 border-t border-border justify-end",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = "Card.Footer";

// ============================================================================
// Compound Component Export
// ============================================================================

const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Media: CardMedia,
    Content: CardContent,
    Footer: CardFooter,
});

// ============================================================================
// Named Exports
// ============================================================================

export {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardFooter,
};

export type {
    CardProps,
    CardHeaderProps,
    CardMediaProps,
    CardContentProps,
    CardFooterProps,
};