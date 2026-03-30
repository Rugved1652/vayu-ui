// utils.ts
// Logic

import type {
    AnimationDelay,
    AnimationDuration,
    AnimationFillMode,
    AnimationIteration,
} from "./types";
import { cn } from "../utils";

export function buildAnimationClasses(
    baseAnimation: string,
    duration: AnimationDuration,
    delay: AnimationDelay,
    iteration: AnimationIteration,
    fillMode: AnimationFillMode,
    className?: string,
    reduceMotion?: boolean
): string {
    // WCAG Fix: If user prefers reduced motion, we skip the animation classes.
    // We ensure the element is visible (opacity-100) instead of animating in.
    if (reduceMotion) {
        return cn("opacity-100", className);
    }

    return cn(
        baseAnimation,
        duration,
        delay,
        iteration,
        fillMode,
        className
    );
}
