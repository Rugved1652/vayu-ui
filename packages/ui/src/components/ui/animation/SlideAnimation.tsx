// slide.tsx
// UI: presentational

"use client";

import { forwardRef } from "react";
import type { DirectionalAnimationProps } from "./types";
import { directionAnimationMap } from "./types";
import { usePrefersReducedMotion } from "./hooks";
import { buildAnimationClasses } from "./utils";

export const AnimationSlide = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
    (
        {
            children,
            className,
            direction = "left",
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
                    directionAnimationMap[direction],
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

AnimationSlide.displayName = "Animation.Slide";
