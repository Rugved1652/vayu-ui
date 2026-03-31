// roll.tsx
// UI: presentational

"use client";

import { forwardRef } from "react";
import type { DirectionalAnimationProps } from "./types";
import { rollAnimationMap } from "./types";
import { usePrefersReducedMotion } from "./hooks";
import { buildAnimationClasses } from "./utils";

export const AnimationRoll = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
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
                    rollAnimationMap[direction],
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

AnimationRoll.displayName = "Animation.Roll";
