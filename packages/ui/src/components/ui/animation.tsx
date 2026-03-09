"use client";

import {
    CSSProperties,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useEffect,
    useState,
} from "react";
import "./animation.css";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

export type AnimationDuration = "slower" | "slow" | "normal" | "fast" | "faster";
export type AnimationDelay = "none" | "short" | "medium" | "long";
export type AnimationIteration = 1 | 2 | 3 | "infinite";
export type AnimationDirection = "up" | "down" | "left" | "right";
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
export type AnimationScale = "small" | "medium" | "large";

export interface BaseAnimationProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    duration?: AnimationDuration;
    delay?: AnimationDelay;
    iteration?: AnimationIteration;
    fillMode?: AnimationFillMode;
    /** Fixed: Uses correct React Animation Event types */
    onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationStart?: React.AnimationEventHandler<HTMLDivElement>;
}

export interface DirectionalAnimationProps extends BaseAnimationProps {
    direction?: AnimationDirection;
}

export interface ScaleAnimationProps extends BaseAnimationProps {
    scale?: AnimationScale;
}

export interface RotateAnimationProps extends BaseAnimationProps {
    degrees?: number;
}

// ============================================================================
// Accessibility Hook (WCAG 2.2)
// ============================================================================

/**
 * Detects if the user has requested reduced motion in their OS settings.
 * Essential for preventing vestibular disorders triggers.
 */
const usePrefersReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check if window is defined (SSR safety)
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        
        // Set initial value
        setPrefersReducedMotion(mediaQuery.matches);

        // Listen for changes
        const handler = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
};

// ============================================================================
// Mappings
// ============================================================================

const durationMap: Record<AnimationDuration, string> = {
    slower: "duration-[2000ms]",
    slow: "duration-[1500ms]",
    normal: "duration-1000",
    fast: "duration-700",
    faster: "duration-500",
};

const delayMap: Record<AnimationDelay, string> = {
    none: "delay-0",
    short: "delay-150",
    medium: "delay-300",
    long: "delay-500",
};

// Fixed: Using arbitrary properties to ensure these work without tailwind.config.js extensions
const iterationMap: Record<AnimationIteration, string> = {
    1: "[animation-iteration:1]",
    2: "[animation-iteration:2]",
    3: "[animation-iteration:3]",
    infinite: "animate-infinite",
};

const fillModeMap: Record<AnimationFillMode, string> = {
    none: "[animation-fill-mode:none]",
    forwards: "[animation-fill-mode:forwards]",
    backwards: "[animation-fill-mode:backwards]",
    both: "[animation-fill-mode:both]",
};

const directionAnimationMap: Record<AnimationDirection, string> = {
    left: "animate-slide-in-left",
    right: "animate-slide-in-right",
    up: "animate-slide-in-up",
    down: "animate-slide-in-down",
};

const flipAnimationMap: Record<AnimationDirection, string> = {
    up: "animate-flip-in-x",
    down: "animate-flip-in-x [animation-direction:reverse]",
    left: "animate-flip-in-y",
    right: "animate-flip-in-y [animation-direction:reverse]",
};

const rollAnimationMap: Record<AnimationDirection, string> = {
    left: "animate-roll-in",
    right: "animate-roll-in-right",
    up: "animate-roll-in-up",
    down: "animate-roll-in-down",
};

const bounceScaleMap: Record<AnimationScale, string> = {
    small: "animate-bounce-in-small",
    medium: "animate-bounce-in",
    large: "animate-bounce-in-large",
};

const zoomScaleMap: Record<AnimationScale, string> = {
    small: "animate-zoom-in-small",
    medium: "animate-zoom-in",
    large: "animate-zoom-in-large",
};

// ============================================================================
// Utility Functions
// ============================================================================

const buildAnimationClasses = (
    baseAnimation: string,
    duration: AnimationDuration,
    delay: AnimationDelay,
    iteration: AnimationIteration,
    fillMode: AnimationFillMode,
    className?: string,
    reduceMotion?: boolean
): string => {
    // WCAG Fix: If user prefers reduced motion, we skip the animation classes.
    // We ensure the element is visible (opacity-100) instead of animating in.
    if (reduceMotion) {
        return cn("opacity-100", className);
    }

    return cn(
        baseAnimation,
        durationMap[duration],
        delayMap[delay],
        iterationMap[iteration],
        fillModeMap[fillMode],
        className
    );
};

// ============================================================================
// Animation Root Component
// ============================================================================

interface AnimationRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const AnimationRoot = forwardRef<HTMLDivElement, AnimationRootProps>(
    ({ children, className, ...props }, ref) => {
        return (
            // Fix: Removed 'contents' to allow proper styling and ref behavior
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);

AnimationRoot.displayName = "Animation";

// ============================================================================
// Fade Animation
// ============================================================================

const AnimationFade = forwardRef<HTMLDivElement, BaseAnimationProps>(
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
                    "animate-fade-in",
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

AnimationFade.displayName = "Animation.Fade";

// ============================================================================
// Slide Animation
// ============================================================================

const AnimationSlide = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
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

// ============================================================================
// Bounce Animation
// ============================================================================

const AnimationBounce = forwardRef<HTMLDivElement, ScaleAnimationProps>(
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

// ============================================================================
// Flip Animation
// ============================================================================

const AnimationFlip = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
    (
        {
            children,
            className,
            direction = "up",
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
                    flipAnimationMap[direction],
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

AnimationFlip.displayName = "Animation.Flip";

// ============================================================================
// Rotate Animation
// ============================================================================

const AnimationRotate = forwardRef<HTMLDivElement, RotateAnimationProps>(
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

// ============================================================================
// Zoom Animation
// ============================================================================

const AnimationZoom = forwardRef<HTMLDivElement, ScaleAnimationProps>(
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
                    zoomScaleMap[scale],
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

AnimationZoom.displayName = "Animation.Zoom";

// ============================================================================
// Roll Animation
// ============================================================================

const AnimationRoll = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
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

// ============================================================================
// JackInTheBox Animation
// ============================================================================

const AnimationJackInTheBox = forwardRef<HTMLDivElement, BaseAnimationProps>(
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

// ============================================================================
// Hinge Animation
// ============================================================================

const AnimationHinge = forwardRef<HTMLDivElement, BaseAnimationProps>(
    (
        {
            children,
            className,
            duration = "normal",
            delay = "none",
            iteration = 1,
            fillMode = "forwards",
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
                    "animate-hinge",
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

AnimationHinge.displayName = "Animation.Hinge";

// ============================================================================
// Compound Component Export
// ============================================================================

const Animation = Object.assign(AnimationRoot, {
    Fade: AnimationFade,
    Slide: AnimationSlide,
    Bounce: AnimationBounce,
    Flip: AnimationFlip,
    Rotate: AnimationRotate,
    Zoom: AnimationZoom,
    Roll: AnimationRoll,
    JackInTheBox: AnimationJackInTheBox,
    Hinge: AnimationHinge,
});

export { Animation };
export default Animation;