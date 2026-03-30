// bounce.tsx
// UI: presentational

"use client";

import { forwardRef } from "react";
import type { ScaleAnimationProps } from "./types";
import { bounceScaleMap } from "./types";
import { usePrefersReducedMotion } from "./hooks";
import { buildAnimationClasses } from "./utils";

export const AnimationBounce = forwardRef<HTMLDivElement, ScaleAnimationProps>(
    (
        {
            children,
            className,
            scale = "medium",
            duration = "normal",
            delay = "none",
            iteration = 1,
            fillMode = "none",
            onAnimationEnd,
            onAnimationStart,
            ...props
        },
        ref
    ) => {
        const reduceMotion = usePrefersReducedMotion();

        return (
            <div
                ref={ref}
                className={buildAnimationClasses(
                    bounceScaleMap[scale],
                    duration,
                    delay,
                    iteration,
                    fillMode,
                    className,
                    reduceMotion
                )}
                onAnimationEnd={onAnimationEnd}
                onAnimationStart={onAnimationStart}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AnimationBounce.displayName = "Animation.Bounce";
