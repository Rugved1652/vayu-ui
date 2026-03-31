// skeleton-item.tsx
// UI: Core skeleton rendering primitive with variant, animation, and count support

import React from "react";
import type { SkeletonItemProps } from "./types";
import { getVariantClasses, getSkeletonStyles, animationClasses } from "./config";

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

export default SkeletonItem;
