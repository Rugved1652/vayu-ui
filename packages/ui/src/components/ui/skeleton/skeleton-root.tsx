// skeleton-root.tsx
// Composition: Root component with ARIA live region for accessibility

import React from "react";
import type { SkeletonRootProps } from "./types";

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

export default SkeletonRoot;
