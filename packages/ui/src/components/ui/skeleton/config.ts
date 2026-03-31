// config.ts
// Configuration: size/animation classes and helper functions

import React from "react";
import type { SkeletonVariant, SkeletonSize } from "./types";

export const sizeClasses = {
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
export const animationClasses = {
    pulse: "animate-pulse motion-reduce:animate-none",
    wave: "skeleton-wave motion-reduce:animate-none",
    none: "",
};

export function getVariantClasses(variant: SkeletonVariant, size: SkeletonSize): string {
    const variantMap = {
        text: `${sizeClasses[size].text} w-full rounded`,
        circular: `${sizeClasses[size].circular} rounded-full`,
        rectangular: `${sizeClasses[size].rectangular} w-full rounded`,
        rounded: `${sizeClasses[size].rounded} w-full rounded-lg`,
    };
    return variantMap[variant];
}

export function getSkeletonStyles(width?: string | number, height?: string | number): React.CSSProperties {
    return {
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    };
}
