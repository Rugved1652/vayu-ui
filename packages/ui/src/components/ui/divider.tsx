import React, { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

// ============================================================================
// Types & Enums
// ============================================================================

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "solid" | "dashed" | "dotted";
type DividerSpacing = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
type DividerColor =
    | "ground"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "info";
type DividerSize = "thin" | "normal" | "thick" | "bold";

interface DividerRootProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    spacing?: DividerSpacing;
    decorative?: boolean;
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
// Helper Maps - Design Tokens & WCAG Compliant
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

// Design token colors - using ground-*, primary-*, etc. from @theme
// WCAG-compliant border colors (3:1 contrast minimum)
const colorMap: Record<DividerColor, string> = {
    // Using ground-300 (light mode) and ground-700 (dark mode) for 3:1+ contrast
    ground: "border-ground-300 dark:border-ground-700",
    primary: "border-primary-300 dark:border-primary-600",
    success: "border-success-400 dark:border-success-600",
    warning: "border-warning-500 dark:border-warning-600",
    error: "border-error-400 dark:border-error-600",
    info: "border-info-400 dark:border-info-600",
};

// WCAG-compliant text colors (4.5:1 contrast minimum)
const labelColorMap: Record<DividerColor, string> = {
    ground: "text-ground-600 dark:text-ground-300",
    primary: "text-primary-700 dark:text-primary-300",
    success: "text-success-700 dark:text-success-300",
    warning: "text-warning-800 dark:text-warning-200",
    error: "text-error-700 dark:text-error-300",
    info: "text-info-700 dark:text-info-300",
};

// Thickness presets in pixels
const sizeMap: Record<DividerSize, number> = {
    thin: 1,
    normal: 2,
    thick: 3,
    bold: 4,
};

// ============================================================================
// Components
// ============================================================================

const DividerLine = forwardRef<HTMLDivElement, DividerLineProps>(
    (
        {
            variant = "solid",
            color = "ground",
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
                aria-hidden="true"
                {...props}
            />
        );
    }
);
DividerLine.displayName = "Divider.Line";

const DividerLabel = forwardRef<HTMLSpanElement, DividerLabelProps>(
    ({ color = "ground", className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={clsx(
                    "px-3 py-1 text-sm font-medium whitespace-nowrap font-secondary",
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
            decorative = false,
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

        const ariaProps = decorative
            ? { "aria-hidden": "true" as const }
            : {
                role: "separator",
                "aria-orientation": orientation
            };

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