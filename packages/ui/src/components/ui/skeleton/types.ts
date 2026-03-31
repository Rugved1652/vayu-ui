// types.ts
// Types

import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";
export type SkeletonSize = "sm" | "md" | "lg" | "xl";

export interface SkeletonRootProps extends HTMLAttributes<HTMLDivElement> {
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
    "aria-label"?: string;
    "aria-live"?: "polite" | "assertive" | "off";
}

export interface SkeletonItemProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SkeletonVariant;
    animation?: SkeletonAnimation;
    width?: string | number;
    height?: string | number;
    size?: SkeletonSize;
    count?: number;
}

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
    lines?: number;
    width?: string | number;
    lastLineWidth?: string | number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonCircleProps extends HTMLAttributes<HTMLDivElement> {
    size?: SkeletonSize;
    animation?: SkeletonAnimation;
}

export interface SkeletonRectangleProps extends HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
    showImage?: boolean;
    imageHeight?: number;
    lines?: number;
    titleWidth?: string | number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonAvatarProps extends HTMLAttributes<HTMLDivElement> {
    showText?: boolean;
    textLines?: number;
    titleWidth?: string | number;
    subtitleWidth?: string | number;
    size?: SkeletonSize;
    animation?: SkeletonAnimation;
}

export interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
    items?: number;
    showAvatar?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonTableProps extends HTMLAttributes<HTMLDivElement> {
    rows?: number;
    columns?: number;
    showHeader?: boolean;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonGridProps extends HTMLAttributes<HTMLDivElement> {
    items?: number;
    columns?: number;
    itemHeight?: number;
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
}

export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
    spacing?: "sm" | "md" | "lg";
}
