import React, { HTMLAttributes } from "react";
import { cn } from "./utils";

// ============================================================================
// Types & Enums
// ============================================================================

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "solid" | "dashed" | "dotted";
type DividerSpacing = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
type DividerColor =
    | "default"
    | "brand"
    | "success"
    | "warning"
    | "destructive"
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

// Semantic design tokens for border colors
const colorMap: Record<DividerColor, string> = {
    default: "border-border",
    brand: "border-brand",
    success: "border-success",
    warning: "border-warning",
    destructive: "border-destructive",
    info: "border-info",
};

// Semantic design tokens for label colors
const labelColorMap: Record<DividerColor, string> = {
    default: "text-muted-content",
    brand: "text-brand",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    info: "text-info",
};

const sizeMap: Record<DividerSize, number> = {
    thin: 1,
    normal: 2,
    thick: 3,
    bold: 4,
};

// ============================================================================
// Components
// ============================================================================

const DividerLine = ({
    variant = "solid",
    color = "default",
    size = "normal",
    thickness,
    opacity = 1,
    orientation = "horizontal",
    className,
    style,
    ...props
}: DividerLineProps) => {
    const actualThickness = thickness || sizeMap[size];
    const isHorizontal = orientation === "horizontal";

    const borderStyle: React.CSSProperties = {
        opacity,
        ...style,
    };

    return (
        <div
            className={cn(
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
};

const DividerLabel = ({
    color = "default",
    className,
    children,
    ...props
}: DividerLabelProps) => {
    return (
        <span
            className={cn(
                "px-3 py-1 text-sm font-medium whitespace-nowrap font-secondary",
                labelColorMap[color],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

const DividerRoot = ({
    orientation = "horizontal",
    spacing = "md",
    decorative = false,
    className,
    children,
    ...props
}: DividerRootProps) => {
    const isHorizontal = orientation === "horizontal";

    const layoutClasses = isHorizontal
        ? cn("flex items-center w-full", spacingMap[spacing])
        : cn(
            "inline-flex flex-col items-center h-full min-h-[1em]",
            verticalSpacingMap[spacing]
        );

    // FIX: Accessibility Semantics
    // 1. Decorative -> hidden.
    // 2. Has Children (Label) -> No role (content is readable).
    // 3. Default -> Separator role.
    const hasChildren = !!children;

    const ariaProps = decorative
        ? { "aria-hidden": "true" as const }
        : hasChildren
        ? {}
        : {
            role: "separator",
            "aria-orientation": orientation
        };

    if (!children) {
        return (
            <div
                className={cn(layoutClasses, className)}
                {...ariaProps}
                {...props}
            >
                <DividerLine orientation={orientation} />
            </div>
        );
    }

    return (
        <div
            className={cn(layoutClasses, className)}
            {...ariaProps}
            {...props}
        >
            {children}
        </div>
    );
};

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