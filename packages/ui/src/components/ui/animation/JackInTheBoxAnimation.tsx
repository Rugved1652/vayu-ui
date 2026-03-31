// jackinthebox.tsx
// UI: presentational

"use client";

import { forwardRef } from "react";
import type { BaseAnimationProps } from "./types";
import { usePrefersReducedMotion } from "./hooks";
import { buildAnimationClasses } from "./utils";

export const AnimationJackInTheBox = forwardRef<HTMLDivElement, BaseAnimationProps>(
    (
        {
            children,
            className,
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
                    "animate-jack-in-the-box",
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

AnimationJackInTheBox.displayName = "Animation.JackInTheBox";
