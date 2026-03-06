// src/components/Skeleton.tsx

"use client";
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

/**
 * Skeleton Component - Compound Pattern with Accessibility
 *
 * A fully accessible skeleton loading component with:
 * - Compound component pattern for flexible composition
 * - ARIA live regions for screen reader announcements
 * - Multiple animation types (pulse, wave, none)
 * - Four shape variants (text, circular, rectangular, rounded)
 * - Four size presets
 * - Pre-built patterns (Card, Avatar, List, Table)
 * - Screen reader friendly loading states
 * - WCAG 2.2 AA compliant with motion preferences
 */

// ============================================================================
// Types
// ============================================================================

type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
type SkeletonAnimation = "pulse" | "wave" | "none";
type SkeletonSize = "sm" | "md" | "lg" | "xl";

// ============================================================================
// Context
// ============================================================================

interface SkeletonContextType {
    animation: SkeletonAnimation;
    size: SkeletonSize;
    id?: string;
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(
    undefined
);

const useSkeleton = () => {
    const context = useContext(SkeletonContext);
    if (!context) {
        throw new Error(
            "Skeleton compound components must be used within Skeleton"
        );
    }
    return context;
};

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
    wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full motion-reduce:before:animate-none before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
    none: "",
};

// ============================================================================
// Main Skeleton Component
// ============================================================================

interface SkeletonRootProps {
    children?: ReactNode;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
    className?: string;
    id?: string;
    /**
     * Accessible label for loading state
     */
    "aria-label"?: string;
    /**
     * Custom loading message for screen readers
     */
    "aria-live"?: "polite" | "assertive" | "off";
    /**
     * Whether to announce loading state to screen readers
     */
    announce?: boolean;
    /**
     * Delay before announcing loading state (ms)
     */
    announcementDelay?: number;
}

const SkeletonRoot: React.FC<SkeletonRootProps> = ({
    children,
    animation = "pulse",
    size = "md",
    className = "",
    id,
    "aria-label": ariaLabel = "Loading",
    "aria-live": ariaLive = "polite",
    announce = true,
    announcementDelay = 500,
}) => {
    const [shouldAnnounce, setShouldAnnounce] = useState(false);
    const skeletonId = id || `skeleton-${crypto.randomUUID()}`;

    // WCAG 2.2 AA: Delay loading announcements to avoid interrupting screen readers
    useEffect(() => {
        if (announce) {
            const timer = setTimeout(() => {
                setShouldAnnounce(true);
            }, announcementDelay);
            return () => clearTimeout(timer);
        }
    }, [announce, announcementDelay]);

    const contextValue: SkeletonContextType = {
        animation,
        size,
        id: skeletonId,
    };

    return (
        <SkeletonContext.Provider value={contextValue}>
            <div
                id={skeletonId}
                className={className}
                role="status"
                aria-live={ariaLive}
                aria-busy="true"
                aria-label={shouldAnnounce ? ariaLabel : undefined}
            >
                {shouldAnnounce && (
                    <span className="sr-only">{ariaLabel}</span>
                )}
                {children}
            </div>
        </SkeletonContext.Provider>
    );
};

// ============================================================================
// Skeleton Item (Single Element)
// ============================================================================

interface SkeletonItemProps {
    variant?: SkeletonVariant;
    animation?: SkeletonAnimation;
    width?: string | number;
    height?: string | number;
    size?: SkeletonSize;
    className?: string;
    count?: number;
    /**
     * ARIA label for this specific skeleton item
     */
    "aria-label"?: string;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({
    variant = "text",
    animation: customAnimation,
    width,
    height,
    size: customSize,
    className = "",
    count = 1,
    "aria-label": itemAriaLabel,
}) => {
    // Try to get from context, fall back to props or defaults
    const context = useContext(SkeletonContext);
    const animation = customAnimation || context?.animation || "pulse";
    const size = customSize || context?.size || "md";

    const variantClasses = {
        text: `${sizeClasses[size].text} w-full rounded-sm`,
        circular: `${sizeClasses[size].circular} rounded-full`,
        rectangular: `${sizeClasses[size].rectangular} w-full rounded-sm`,
        rounded: `${sizeClasses[size].rounded} w-full rounded-lg`,
    };

    // WCAG 2.2 AA: Colors meet contrast requirements and are decorative
    const baseClasses = "bg-neutral-200 dark:bg-neutral-800";
    // WCAG 2.2 AA: Add border for better visibility
    const borderClasses = "border border-transparent";

    const baseStyles = {
        width: width
            ? typeof width === "number"
                ? `${width}px`
                : width
            : undefined,
        height: height
            ? typeof height === "number"
                ? `${height}px`
                : height
            : undefined,
    };

    const skeletonElement = (
        <div
            className={`
        ${baseClasses}
        ${borderClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
            style={baseStyles}
            aria-hidden="true"
            tabIndex={-1}
            aria-label={itemAriaLabel}
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
};

// ============================================================================
// Skeleton Text
// ============================================================================

interface SkeletonTextProps {
    lines?: number;
    width?: string | number;
    lastLineWidth?: string | number;
    className?: string;
    /**
     * ARIA label for text skeleton
     */
    "aria-label"?: string;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
    lines = 1,
    width,
    lastLineWidth,
    className = "",
    "aria-label": textAriaLabel,
}) => {
    if (lines === 1) {
        return <SkeletonItem variant="text" width={width} className={className} aria-label={textAriaLabel} />;
    }

    return (
        <div className={`space-y-2 ${className}`} role="presentation">
            {Array.from({ length: lines }).map((_, index) => (
                <SkeletonItem
                    key={index}
                    variant="text"
                    width={index === lines - 1 && lastLineWidth ? lastLineWidth : width}
                    aria-label={textAriaLabel}
                />
            ))}
        </div>
    );
};

// ============================================================================
// Skeleton Circle
// ============================================================================

interface SkeletonCircleProps {
    className?: string;
    size?: SkeletonSize;
    /**
     * ARIA label for circle skeleton
     */
    "aria-label"?: string;
}

const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ className = "", size, "aria-label": circleAriaLabel }) => {
    return <SkeletonItem variant="circular" className={className} size={size} aria-label={circleAriaLabel} />;
};

// ============================================================================
// Skeleton Rectangle
// ============================================================================

interface SkeletonRectangleProps {
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    className?: string;
    /**
     * ARIA label for rectangle skeleton
     */
    "aria-label"?: string;
}

const SkeletonRectangle: React.FC<SkeletonRectangleProps> = ({
    width,
    height,
    rounded = false,
    className = "",
    "aria-label": rectAriaLabel,
}) => {
    return (
        <SkeletonItem
            variant={rounded ? "rounded" : "rectangular"}
            width={width}
            height={height}
            className={className}
            aria-label={rectAriaLabel}
        />
    );
};

// ============================================================================
// Skeleton Card
// ============================================================================

interface SkeletonCardProps {
    className?: string;
    showImage?: boolean;
    imageHeight?: number;
    lines?: number;
    titleWidth?: string | number;
    /**
     * ARIA label for card skeleton
     */
    "aria-label"?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
    className = "",
    showImage = true,
    imageHeight = 200,
    lines = 3,
    titleWidth = "60%",
    "aria-label": cardAriaLabel,
}) => {
    return (
        <div
            className={`bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 ${className}`}
            role="presentation"
            aria-label={cardAriaLabel}
        >
            {showImage && (
                <SkeletonRectangle height={imageHeight} rounded className="mb-4" aria-label="Loading image" />
            )}
            <SkeletonItem
                variant="text"
                size="lg"
                width={titleWidth}
                className="mb-3"
                aria-label="Loading title"
            />
            <SkeletonText lines={lines} aria-label="Loading content" />
        </div>
    );
};

// ============================================================================
// Skeleton Avatar
// ============================================================================

interface SkeletonAvatarProps {
    className?: string;
    showText?: boolean;
    textLines?: number;
    titleWidth?: string | number;
    subtitleWidth?: string | number;
    size?: SkeletonSize;
    /**
     * ARIA label for avatar skeleton
     */
    "aria-label"?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
    className = "",
    showText = true,
    textLines = 2,
    titleWidth = "40%",
    subtitleWidth = "60%",
    size,
    "aria-label": avatarAriaLabel,
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`} role="presentation" aria-label={avatarAriaLabel}>
            <SkeletonCircle size={size} aria-label="Loading avatar" />
            {showText && (
                <div className="flex-1">
                    <SkeletonItem variant="text" width={titleWidth} className="mb-2" aria-label="Loading name" />
                    {textLines > 1 && (
                        <SkeletonItem variant="text" size="sm" width={subtitleWidth} aria-label="Loading role" />
                    )}
                </div>
            )}
        </div>
    );
};

// ============================================================================
// Skeleton List
// ============================================================================

interface SkeletonListProps {
    className?: string;
    items?: number;
    showAvatar?: boolean;
    /**
     * ARIA label for list skeleton
     */
    "aria-label"?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
    className = "",
    items = 5,
    showAvatar = true,
    "aria-label": listAriaLabel,
}) => {
    return (
        <div className={`space-y-4 ${className}`} role="presentation" aria-label={listAriaLabel}>
            {Array.from({ length: items }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"
                    role="presentation"
                >
                    {showAvatar && <SkeletonCircle aria-label="Loading avatar" />}
                    <div className="flex-1">
                        <SkeletonItem variant="text" width="70%" className="mb-2" aria-label="Loading title" />
                        <SkeletonItem variant="text" size="sm" width="40%" aria-label="Loading subtitle" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// ============================================================================
// Skeleton Table
// ============================================================================

interface SkeletonTableProps {
    className?: string;
    rows?: number;
    columns?: number;
    showHeader?: boolean;
    /**
     * ARIA label for table skeleton
     */
    "aria-label"?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
    className = "",
    rows = 5,
    columns = 4,
    showHeader = true,
    "aria-label": tableAriaLabel,
}) => {
    return (
        <div
            className={`bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden ${className}`}
            role="presentation"
            aria-label={tableAriaLabel}
        >
            {/* Header */}
            {showHeader && (
                <div
                    className="grid gap-4 p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                    role="presentation"
                >
                    {Array.from({ length: columns }).map((_, index) => (
                        <SkeletonItem key={index} variant="text" width="60%" aria-label={`Loading column header ${index + 1}`} />
                    ))}
                </div>
            )}
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 p-4 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                    role="presentation"
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <SkeletonItem key={colIndex} variant="text" size="sm" width="80%" aria-label={`Loading cell ${rowIndex + 1}-${colIndex + 1}`} />
                    ))}
                </div>
            ))}
        </div>
    );
};

// ============================================================================
// Skeleton Grid
// ============================================================================

interface SkeletonGridProps {
    className?: string;
    items?: number;
    columns?: number;
    itemHeight?: number;
    /**
     * ARIA label for grid skeleton
     */
    "aria-label"?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
    className = "",
    items = 6,
    columns = 3,
    itemHeight = 200,
    "aria-label": gridAriaLabel,
}) => {
    return (
        <div
            className={`grid gap-4 ${className}`}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            role="presentation"
            aria-label={gridAriaLabel}
        >
            {Array.from({ length: items }).map((_, index) => (
                <SkeletonCard key={index} imageHeight={itemHeight} lines={2} aria-label={`Loading item ${index + 1}`} />
            ))}
        </div>
    );
};

// ============================================================================
// Skeleton Group (Container)
// ============================================================================

interface SkeletonGroupProps {
    children: ReactNode;
    className?: string;
    spacing?: "sm" | "md" | "lg";
    /**
     * ARIA label for group
     */
    "aria-label"?: string;
}

const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
    children,
    className = "",
    spacing = "md",
    "aria-label": groupAriaLabel,
}) => {
    const spacingClasses = {
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6",
    };

    return (
        <div className={`${spacingClasses[spacing]} ${className}`} role="presentation" aria-label={groupAriaLabel}>
            {children}
        </div>
    );
};

// ============================================================================
// Export Compound Component
// ============================================================================

export const Skeleton = Object.assign(SkeletonRoot, {
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
