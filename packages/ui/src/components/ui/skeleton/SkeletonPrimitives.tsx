// primitives.tsx
// UI: Variant-specific wrappers around SkeletonItem

import React from "react";
import SkeletonItem from "./SkeletonItem";
import type { SkeletonTextProps, SkeletonCircleProps, SkeletonRectangleProps } from "./types";

// ============================================================================
// Skeleton Text
// ============================================================================

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

export { SkeletonText, SkeletonCircle, SkeletonRectangle };
