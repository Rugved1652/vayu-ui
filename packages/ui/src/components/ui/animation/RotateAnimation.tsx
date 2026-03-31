// rotate.tsx
// UI: presentational

"use client";

import { forwardRef } from "react";
import type { RotateAnimationProps } from "./types";
import { usePrefersReducedMotion } from "./hooks";
import { buildAnimationClasses } from "./utils";
import type { CSSProperties } from "react";

export const AnimationRotate = forwardRef<HTMLDivElement, RotateAnimationProps>(
    (
        {
            children,
            className,
            degrees = -200,
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

        const style: CSSProperties = {
            "--rotation-start": `${degrees}deg`,
            ...props.style,
        } as CSSProperties;

        return (
            <div
                ref={ref}
                style={style}
                className={buildAnimationClasses(
                    "animate-rotate-in",
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

AnimationRotate.displayName = "Animation.Rotate";
