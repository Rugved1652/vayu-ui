"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import React, {
    createContext,
    forwardRef,
    useContext,
    HTMLAttributes,
    AnchorHTMLAttributes,
} from "react";

// ============================================================================
// CVA Variants
// ============================================================================

const cardVariants = cva(
    "flex flex-col transition-all duration-200",
    {
        variants: {
            variant: {
                elevated:
                    "bg-white dark:bg-ground-900 border border-ground-200 dark:border-ground-800 shadow-outer hover:shadow-lg",
                outlined:
                    "bg-transparent border border-ground-300 dark:border-ground-700 hover:border-ground-400 dark:hover:border-ground-600",
                filled:
                    "bg-ground-100 dark:bg-ground-800 border border-transparent hover:bg-ground-200 dark:hover:bg-ground-700",
                ghost:
                    "bg-transparent border border-transparent hover:bg-ground-100 dark:hover:bg-ground-900",
            },
            size: {
                sm: "p-3 gap-2",
                md: "p-5 gap-3",
                lg: "p-7 gap-4",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                full: "rounded-3xl",
            },
        },
        defaultVariants: {
            variant: "elevated",
            size: "md",
            radius: "lg",
        },
    }
);

const cardFooterVariants = cva(
    "flex items-center gap-2 pt-2 border-t border-ground-200 dark:border-ground-800",
    {
        variants: {
            align: {
                start: "justify-start",
                center: "justify-center",
                end: "justify-end",
                between: "justify-between",
            },
        },
        defaultVariants: {
            align: "end",
        },
    }
);

const cardBadgeVariants = cva(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-secondary font-semibold",
    {
        variants: {
            color: {
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
            },
        },
        defaultVariants: {
            color: "primary",
        },
    }
);

// ============================================================================
// Context
// ============================================================================

interface CardContextValue {
    disabled: boolean;
    size: "sm" | "md" | "lg";
}

const CardContext = createContext<CardContextValue>({
    disabled: false,
    size: "md",
});

function useCardContext() {
    return useContext(CardContext);
}

// ============================================================================
// Types
// ============================================================================

type CardVariant = VariantProps<typeof cardVariants>["variant"];
type CardSize = VariantProps<typeof cardVariants>["size"];
type CardRadius = VariantProps<typeof cardVariants>["radius"];
type CardFooterAlign = VariantProps<typeof cardFooterVariants>["align"];
type CardBadgeColor = VariantProps<typeof cardBadgeVariants>["color"];

// ============================================================================
// Card (Root)
// ============================================================================

interface CardProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
        VariantProps<typeof cardVariants> {
    /** Make the entire card a clickable surface. */
    interactive?: boolean;
    /** Render as an `<a>` when linked. */
    href?: string;
    /** Anchor props forwarded when `href` is set. */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
    /** Disable interactions. */
    disabled?: boolean;
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
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
            asChild = false,
            className,
            children,
            onClick,
            ...props
        },
        ref
    ) => {
        const isClickable = interactive || !!href || !!onClick;
        const Comp = asChild ? Slot : "div";

        const rootClasses = clsx(
            cardVariants({ variant, size, radius }),
            isClickable && !disabled && "cursor-pointer",
            isClickable &&
                !disabled &&
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
        );

        const contextValue: CardContextValue = {
            disabled,
            size: size ?? "md",
        };

        // Linked card
        if (href && !disabled) {
            return (
                <CardContext.Provider value={contextValue}>
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
                </CardContext.Provider>
            );
        }

        // Interactive card (button-like)
        if (isClickable && !disabled) {
            return (
                <CardContext.Provider value={contextValue}>
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
                </CardContext.Provider>
            );
        }

        // Static card
        return (
            <CardContext.Provider value={contextValue}>
                <Comp
                    ref={ref}
                    className={rootClasses}
                    aria-disabled={disabled || undefined}
                    {...props}
                >
                    {children}
                </Comp>
            </CardContext.Provider>
        );
    }
);

CardRoot.displayName = "Card";

// ============================================================================
// CardHeader
// ============================================================================

interface CardHeaderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Main title text. */
    title?: React.ReactNode;
    /** Subtitle / description under the title. */
    subtitle?: React.ReactNode;
    /** Element rendered on the trailing side (e.g. icon button, badge). */
    action?: React.ReactNode;
    /** Optional leading icon / avatar. */
    avatar?: React.ReactNode;
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    (
        {
            title,
            subtitle,
            action,
            avatar,
            asChild = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
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
            </Comp>
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
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
    (
        {
            src,
            alt,
            aspectRatio = "16/9",
            fit = "cover",
            overlay,
            asChild = false,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "div";

        const fitClass =
            fit === "cover"
                ? "object-cover"
                : fit === "contain"
                  ? "object-contain"
                  : "object-fill";

        return (
            <Comp
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
            </Comp>
        );
    }
);

CardMedia.displayName = "Card.Media";

// ============================================================================
// CardContent
// ============================================================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ asChild = false, className, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                ref={ref}
                className={clsx(
                    "font-secondary text-sm text-ground-700 dark:text-ground-300 leading-relaxed",
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

CardContent.displayName = "Card.Content";

// ============================================================================
// CardFooter
// ============================================================================

interface CardFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardFooterVariants> {
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ align = "end", asChild = false, className, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                ref={ref}
                className={clsx(cardFooterVariants({ align }), className)}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

CardFooter.displayName = "Card.Footer";

// ============================================================================
// CardBadge
// ============================================================================

interface CardBadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof cardBadgeVariants> {
    /** Change the default rendered element for the one passed as a child. */
    asChild?: boolean;
}

const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(
    (
        { color = "primary", asChild = false, className, children, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : "span";

        return (
            <Comp
                ref={ref}
                className={clsx(cardBadgeVariants({ color }), className)}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

CardBadge.displayName = "Card.Badge";

// ============================================================================
// Compound Component Export
// ============================================================================

const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Media: CardMedia,
    Content: CardContent,
    Footer: CardFooter,
    Badge: CardBadge,
});

// ============================================================================
// Named Exports (for backward compatibility)
// ============================================================================

export {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardFooter,
    CardBadge,
    cardVariants,
    cardFooterVariants,
    cardBadgeVariants,
};

export type {
    CardProps,
    CardHeaderProps,
    CardMediaProps,
    CardContentProps,
    CardFooterProps,
    CardBadgeProps,
    CardVariant,
    CardSize,
    CardRadius,
    CardFooterAlign,
    CardBadgeColor,
};