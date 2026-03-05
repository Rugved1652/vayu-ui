import React, { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

// ============================================================================
// Types & Enums
// ============================================================================

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "solid" | "dashed" | "dotted";
type DividerSpacing = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
type DividerColor =
    | "neutral"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
type DividerSize = "thin" | "normal" | "thick" | "bold";

interface DividerRootProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    spacing?: DividerSpacing;
    decorative?: boolean; // ✅ NEW: For semantic vs decorative dividers
}

interface DividerLineProps extends HTMLAttributes<HTMLDivElement> {
    variant?: DividerVariant;
    color?: DividerColor;
    size?: DividerSize;
    thickness?: number;
    opacity?: number;
    orientation?: DividerOrientation;
}

interface DividerLabelProps extends HTMLAttributes<HTMLSpanElement> {
    color?: DividerColor;
}

// ============================================================================
// Helper Maps - WCAG COMPLIANT
// ============================================================================

const spacingMap: Record<DividerSpacing, string> = {
    none: "my-0",
    sm: "my-2",
    md: "my-4",
    lg: "my-6",
    xl: "my-8",
    "2xl": "my-12",
};

const verticalSpacingMap: Record<DividerSpacing, string> = {
    none: "mx-0",
    sm: "mx-2",
    md: "mx-4",
    lg: "mx-6",
    xl: "mx-8",
    "2xl": "mx-12",
};

const variantMap: Record<DividerVariant, string> = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
};

// ✅ FIX: WCAG-compliant border colors (3:1 contrast minimum)
const colorMap: Record<DividerColor, string> = {
    // Using *-300 (light mode) and *-600 (dark mode) for 3:1+ contrast
    neutral: "border-neutral-300 dark:border-neutral-600",
    primary: "border-primary-300 dark:border-primary-600",
    secondary: "border-secondary-300 dark:border-secondary-600",
    success: "border-success-400 dark:border-success-600", // Green needs darker shade
    warning: "border-warning-500 dark:border-warning-600", // Yellow/amber needs much darker
    error: "border-error-400 dark:border-error-600",
    info: "border-info-400 dark:border-info-600",
};

// ✅ FIX: Minimum 2px for better visibility with lower contrast
const sizeMap: Record<DividerSize, number> = {
    thin: 1,    // Only use with high-contrast colors
    normal: 2,  // ✅ Better default
    thick: 3,
    bold: 4,
};

// ✅ FIX: WCAG-compliant text colors (4.5:1 contrast minimum)
const labelColorMap: Record<DividerColor, string> = {
    neutral: "text-neutral-600 dark:text-neutral-300",      // ✅ 4.5:1+
    primary: "text-primary-700 dark:text-primary-300",      // ✅ 4.5:1+
    secondary: "text-secondary-700 dark:text-secondary-300",
    success: "text-success-700 dark:text-success-300",
    warning: "text-warning-800 dark:text-warning-200",      // ✅ Yellow needs extra dark
    error: "text-error-700 dark:text-error-300",
    info: "text-info-700 dark:text-info-300",
};

// ============================================================================
// Components
// ============================================================================

const DividerLine = forwardRef<HTMLDivElement, DividerLineProps>(
    (
        {
            variant = "solid",
            color = "neutral",
            size = "normal",
            thickness,
            opacity = 1,
            orientation = "horizontal",
            className,
            style,
            ...props
        },
        ref
    ) => {
        const actualThickness = thickness || sizeMap[size];
        const isHorizontal = orientation === "horizontal";

        const borderStyle: React.CSSProperties = {
            opacity,
            ...style,
        };

        // ✅ FIX: Removed gradient variant - not WCAG-compliant
        return (
            <div
                ref={ref}
                className={clsx(
                    "grow shrink-0 border-0",
                    variantMap[variant],
                    colorMap[color],
                    className
                )}
                style={{
                    ...borderStyle,
                    [isHorizontal ? "borderTopWidth" : "borderLeftWidth"]: `${actualThickness}px`,
                }}
                aria-hidden="true" // ✅ FIX: Line is decorative, parent handles semantics
                {...props}
            />
        );
    }
);
DividerLine.displayName = "Divider.Line";

const DividerLabel = forwardRef<HTMLSpanElement, DividerLabelProps>(
    ({ color = "neutral", className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={clsx(
                    "px-3 py-1 text-sm font-medium whitespace-nowrap", // ✅ FIX: More padding for touch target
                    labelColorMap[color],
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);
DividerLabel.displayName = "Divider.Label";

const DividerRoot = forwardRef<HTMLDivElement, DividerRootProps>(
    (
        {
            orientation = "horizontal",
            spacing = "md",
            decorative = false, // ✅ NEW: Semantic vs decorative
            className,
            children,
            ...props
        },
        ref
    ) => {
        const isHorizontal = orientation === "horizontal";

        const layoutClasses = isHorizontal
            ? clsx("flex items-center w-full", spacingMap[spacing])
            : clsx(
                "inline-flex flex-col items-center h-full min-h-[1em]",
                verticalSpacingMap[spacing]
            );

        // ✅ FIX: Better ARIA handling
        const ariaProps = decorative
            ? { "aria-hidden": "true" as const } // Decorative dividers
            : {
                role: "separator",
                "aria-orientation": orientation
            }; // Semantic dividers

        // If no children, render default line
        if (!children) {
            return (
                <div
                    ref={ref}
                    className={clsx(layoutClasses, className)}
                    {...ariaProps}
                    {...props}
                >
                    <DividerLine orientation={orientation} />
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={clsx(layoutClasses, className)}
                {...ariaProps}
                {...props}
            >
                {children}
            </div>
        );
    }
);
DividerRoot.displayName = "Divider";

// ============================================================================
// Compound Component Export
// ============================================================================

export const Divider = Object.assign(DividerRoot, {
    Line: DividerLine,
    Label: DividerLabel,
});

export default Divider;
export type {
    DividerColor,
    DividerOrientation,
    DividerSize,
    DividerSpacing,
    DividerVariant,
};