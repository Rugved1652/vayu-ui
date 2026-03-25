import React from "react";

/**
 * Skeleton Component - Compound Pattern with Accessibility
 *
 * A fully accessible skeleton loading component with:
 * - Compound component pattern for flexible composition
 * - ARIA live regions for screen reader announcements
 * - Multiple animation types (pulse, wave, none)
 * - Four shape variants (text, circular, rectangular, rounded)
 * - Four size presets
 * - Pre-built patterns (Card, Avatar, List, Table, Grid)
 * - Screen reader friendly loading states
 * - WCAG 2.2 AA compliant with motion preferences
 * - Server-side rendering compatible
 */

// ============================================================================
// Types
// ============================================================================

type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
type SkeletonAnimation = "pulse" | "wave" | "none";
type SkeletonSize = "sm" | "md" | "lg" | "xl";

// ============================================================================
// Size & Animation Configuration
// ============================================================================

const sizeClasses = {
    sm: {
        text: "h-3",
        circular: "w-8 h-8",
        rectangular: "h-20",
        rounded: "h-20",
    },
    md: {
        text: "h-4",
        circular: "w-12 h-12",
        rectangular: "h-32",
        rounded: "h-32",
    },
    lg: {
        text: "h-5",
        circular: "w-16 h-16",
        rectangular: "h-48",
        rounded: "h-48",
    },
    xl: {
        text: "h-6",
        circular: "w-24 h-24",
        rectangular: "h-64",
        rounded: "h-64",
    },
};

// WCAG 2.2 AA: Respects prefers-reduced-motion
const animationClasses = {
    pulse: "animate-pulse motion-reduce:animate-none",
    wave: "skeleton-wave motion-reduce:animate-none",
    none: "",
};

// ============================================================================
// Helper Functions
// ============================================================================

function getVariantClasses(variant: SkeletonVariant, size: SkeletonSize): string {
    const variantMap = {
        text: `${sizeClasses[size].text} w-full rounded`,
        circular: `${sizeClasses[size].circular} rounded-full`,
        rectangular: `${sizeClasses[size].rectangular} w-full rounded`,
        rounded: `${sizeClasses[size].rounded} w-full rounded-lg`,
    };
    return variantMap[variant];
}

function getSkeletonStyles(width?: string | number, height?: string | number): React.CSSProperties {
    return {
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    };
}

// ============================================================================
// Main Skeleton Component (Root)
// ============================================================================

interface SkeletonRootProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
    "aria-label"?: string;
    "aria-live"?: "polite" | "assertive" | "off";
}

function SkeletonRoot({
    children,
    animation = "pulse",
    size = "md",
    className = "",
    "aria-label": ariaLabel = "Loading",
    "aria-live": ariaLive = "polite",
    ...props
}: SkeletonRootProps) {
    return (
        <div
            className={className}
            role="status"
            aria-live={ariaLive}
            aria-busy="true"
            aria-label={ariaLabel}
            data-animation={animation}
            data-size={size}
            {...props}
        >
            <span className="sr-only">{ariaLabel}</span>
            {children}
        </div>
    );
}

// ============================================================================
// Skeleton Item (Single Element)
// ============================================================================

interface SkeletonItemProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: SkeletonVariant;
    animation?: SkeletonAnimation;
    width?: string | number;
    height?: string | number;
    size?: SkeletonSize;
    count?: number;
}

function SkeletonItem({
    variant = "text",
    animation = "pulse",
    width,
    height,
    size = "md",
    className = "",
    count = 1,
    ...props
}: SkeletonItemProps) {
    // WCAG 2.2 AA: Uses semantic design tokens for skeleton color with sufficient contrast
    const baseClasses = "bg-neutral-200 dark:bg-neutral-800 border border-transparent";
    const variantClass = getVariantClasses(variant, size);
    const styles = getSkeletonStyles(width, height);

    const skeletonElement = (
        <div
            className={`${baseClasses} ${variantClass} ${animationClasses[animation]} ${className}`}
            style={styles}
            aria-hidden="true"
            tabIndex={-1}
            {...props}
        />
    );

    if (count > 1) {
        return (
            <div className="space-y-2" role="presentation">
                {Array.from({ length: count }).map((_, index) => (
                    <React.Fragment key={index}>{skeletonElement}</React.Fragment>
                ))}
            </div>
        );
    }

    return skeletonElement;
}

// ============================================================================
// Skeleton Text
// ============================================================================

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
    lines?: number;
    width?: string | number;
    lastLineWidth?: string | number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonText({
    lines = 1,
    width,
    lastLineWidth,
    animation = "pulse",
    size = "md",
    className = "",
    ...props
}: SkeletonTextProps) {
    if (lines === 1) {
        return (
            <SkeletonItem
                variant="text"
                width={width}
                animation={animation}
                size={size}
                className={className}
                {...props}
            />
        );
    }

    return (
        <div className={`space-y-2 ${className}`} role="presentation">
            {Array.from({ length: lines }).map((_, index) => (
                <SkeletonItem
                    key={index}
                    variant="text"
                    width={index === lines - 1 && lastLineWidth ? lastLineWidth : width}
                    animation={animation}
                    size={size}
                    {...props}
                />
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Circle
// ============================================================================

interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: SkeletonSize;
    animation?: SkeletonAnimation;
}

function SkeletonCircle({
    className = "",
    size = "md",
    animation = "pulse",
    ...props
}: SkeletonCircleProps) {
    return (
        <SkeletonItem
            variant="circular"
            className={className}
            size={size}
            animation={animation}
            {...props}
        />
    );
}

// ============================================================================
// Skeleton Rectangle
// ============================================================================

interface SkeletonRectangleProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonRectangle({
    width,
    height,
    rounded = false,
    animation = "pulse",
    size = "md",
    className = "",
    ...props
}: SkeletonRectangleProps) {
    return (
        <SkeletonItem
            variant={rounded ? "rounded" : "rectangular"}
            width={width}
            height={height}
            className={className}
            animation={animation}
            size={size}
            {...props}
        />
    );
}

// ============================================================================
// Skeleton Card
// ============================================================================

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
    showImage?: boolean;
    imageHeight?: number;
    lines?: number;
    titleWidth?: string | number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonCard({
    className = "",
    showImage = true,
    imageHeight = 200,
    lines = 3,
    titleWidth = "60%",
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonCardProps) {
    return (
        <div
            className={`bg-surface rounded-surface p-4 border border-border shadow-surface ${className}`}
            aria-hidden="true"
            {...props}
        >
            {showImage && (
                <SkeletonRectangle
                    height={imageHeight}
                    className="mb-4"
                    animation={animation}
                    size={size}
                />
            )}
            <SkeletonItem
                variant="text"
                size="lg"
                width={titleWidth}
                className="mb-3"
                animation={animation}
            />
            <SkeletonText lines={lines} animation={animation} size={size} />
        </div>
    );
}

// ============================================================================
// Skeleton Avatar
// ============================================================================

interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    showText?: boolean;
    textLines?: number;
    titleWidth?: string | number;
    subtitleWidth?: string | number;
    size?: SkeletonSize;
    animation?: SkeletonAnimation;
}

function SkeletonAvatar({
    className = "",
    showText = true,
    textLines = 2,
    titleWidth = "40%",
    subtitleWidth = "60%",
    size = "md",
    animation = "pulse",
    ...props
}: SkeletonAvatarProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`} aria-hidden="true" {...props}>
            <SkeletonCircle size={size} animation={animation} />
            {showText && (
                <div className="flex-1">
                    <SkeletonItem
                        variant="text"
                        width={titleWidth}
                        className="mb-2"
                        animation={animation}
                        size={size}
                    />
                    {textLines > 1 && (
                        <SkeletonItem
                            variant="text"
                            size="sm"
                            width={subtitleWidth}
                            animation={animation}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// Skeleton List
// ============================================================================

interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: number;
    showAvatar?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonList({
    className = "",
    items = 5,
    showAvatar = true,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonListProps) {
    return (
        <div className={`space-y-4 ${className}`} aria-hidden="true" {...props}>
            {Array.from({ length: items }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border"
                >
                    {showAvatar && <SkeletonCircle size={size} animation={animation} />}
                    <div className="flex-1">
                        <SkeletonItem
                            variant="text"
                            width="70%"
                            className="mb-2"
                            animation={animation}
                            size={size}
                        />
                        <SkeletonItem
                            variant="text"
                            size="sm"
                            width="40%"
                            animation={animation}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Table
// ============================================================================

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
    rows?: number;
    columns?: number;
    showHeader?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonTable({
    className = "",
    rows = 5,
    columns = 4,
    showHeader = true,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonTableProps) {
    return (
        <div
            className={`bg-surface rounded-surface border border-border overflow-hidden ${className}`}
            aria-hidden="true"
            {...props}
        >
            {showHeader && (
                <div
                    className="grid gap-4 p-4 border-b border-border bg-muted/50"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {Array.from({ length: columns }).map((_, index) => (
                        <SkeletonItem
                            key={index}
                            variant="text"
                            width="60%"
                            animation={animation}
                            size={size}
                        />
                    ))}
                </div>
            )}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 p-4 border-b border-border last:border-b-0"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <SkeletonItem
                            key={colIndex}
                            variant="text"
                            size="sm"
                            width="80%"
                            animation={animation}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Grid
// ============================================================================

interface SkeletonGridProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: number;
    columns?: number;
    itemHeight?: number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

function SkeletonGrid({
    className = "",
    items = 6,
    columns = 3,
    itemHeight = 200,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonGridProps) {
    return (
        <div
            className={`grid gap-4 ${className}`}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            aria-hidden="true"
            {...props}
        >
            {Array.from({ length: items }).map((_, index) => (
                <SkeletonCard
                    key={index}
                    imageHeight={itemHeight}
                    lines={2}
                    animation={animation}
                    size={size}
                />
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Group (Container)
// ============================================================================

interface SkeletonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    spacing?: "sm" | "md" | "lg";
}

function SkeletonGroup({
    children,
    className = "",
    spacing = "md",
    ...props
}: SkeletonGroupProps) {
    const spacingClasses = {
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6",
    };

    return (
        <div className={`${spacingClasses[spacing]} ${className}`} {...props}>
            {children}
        </div>
    );
}

// ============================================================================
// Export Compound Component
// ============================================================================

const Skeleton = Object.assign(SkeletonRoot, {
    Root: SkeletonRoot,
    Item: SkeletonItem,
    Text: SkeletonText,
    Circle: SkeletonCircle,
    Rectangle: SkeletonRectangle,
    Card: SkeletonCard,
    Avatar: SkeletonAvatar,
    List: SkeletonList,
    Table: SkeletonTable,
    Grid: SkeletonGrid,
    Group: SkeletonGroup,
});

export { Skeleton };

// ============================================================================
// Type Exports
// ============================================================================

export type {
    SkeletonAnimation,
    SkeletonAvatarProps,
    SkeletonCardProps,
    SkeletonCircleProps,
    SkeletonGridProps,
    SkeletonGroupProps,
    SkeletonItemProps,
    SkeletonListProps,
    SkeletonRectangleProps,
    SkeletonRootProps,
    SkeletonSize,
    SkeletonTableProps,
    SkeletonTextProps,
    SkeletonVariant,
};
