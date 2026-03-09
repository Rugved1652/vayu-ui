"use client";

import { CSSProperties, ReactNode } from "react";

// Base types
type AnimationDuration = "slow" | "normal" | "fast" | "slower" | "faster";
type AnimationDelay = "none" | "short" | "medium" | "long";
type AnimationIteration = 1 | 2 | 3 | "infinite";
type Direction = "up" | "down" | "left" | "right";
type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

interface BaseAnimationProps {
    children: ReactNode;
    className?: string;
    duration?: AnimationDuration;
    delay?: AnimationDelay;
    iteration?: AnimationIteration;
    fillMode?: AnimationFillMode;
    onAnimationEnd?: () => void;
    onAnimationStart?: () => void;
}

interface DirectionalAnimationProps extends BaseAnimationProps {
    direction?: Direction;
}

interface ScaleAnimationProps extends BaseAnimationProps {
    scale?: "small" | "medium" | "large";
}

interface RotateAnimationProps extends BaseAnimationProps {
    degrees?: number;
}

// Duration mapping
const durationMap: Record<AnimationDuration, string> = {
    slower: "duration-[2000ms]",
    slow: "duration-[1500ms]",
    normal: "duration-1000",
    fast: "duration-700",
    faster: "duration-500",
};

// Delay mapping
const delayMap: Record<AnimationDelay, string> = {
    none: "delay-0",
    short: "delay-150",
    medium: "delay-300",
    long: "delay-500",
};

// Iteration mapping
const iterationMap: Record<AnimationIteration, string> = {
    1: "animate-iteration-1",
    2: "animate-iteration-2",
    3: "animate-iteration-3",
    infinite: "animate-infinite",
};

// Fill mode mapping
const fillModeMap: Record<AnimationFillMode, string> = {
    none: "animate-fill-none",
    forwards: "animate-fill-forwards",
    backwards: "animate-fill-backwards",
    both: "animate-fill-both",
};

// Helper function to build animation classes
const buildAnimationClasses = (
    baseAnimation: string,
    duration: AnimationDuration = "normal",
    delay: AnimationDelay = "none",
    iteration: AnimationIteration = 1,
    fillMode: AnimationFillMode = "none",
    className?: string
): string => {
    const classes = [
        baseAnimation,
        durationMap[duration],
        delayMap[delay],
        iterationMap[iteration],
        fillModeMap[fillMode],
        className,
    ].filter(Boolean);

    return classes.join(" ");
};

// Main Animation Component
const Animation = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

// Fade Animation
const Fade = ({
    children,
    className = "",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: BaseAnimationProps) => {
    return (
        <div
            className={buildAnimationClasses(
                "animate-fade-in",
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Slide Animation with direction
const Slide = ({
    children,
    className = "",
    direction = "left",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: DirectionalAnimationProps) => {
    const directionMap: Record<Direction, string> = {
        left: "animate-slide-in-left",
        right: "animate-slide-in-right",
        up: "animate-slide-in-up",
        down: "animate-slide-in-down",
    };

    return (
        <div
            className={buildAnimationClasses(
                directionMap[direction],
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Bounce Animation with scale
const Bounce = ({
    children,
    className = "",
    scale = "medium",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: ScaleAnimationProps) => {
    const scaleMap = {
        small: "animate-bounce-in-small",
        medium: "animate-bounce-in",
        large: "animate-bounce-in-large",
    };

    return (
        <div
            className={buildAnimationClasses(
                scaleMap[scale],
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Flip Animation with direction
const Flip = ({
    children,
    className = "",
    direction = "up",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: DirectionalAnimationProps) => {
    const flipMap: Record<Direction, string> = {
        up: "animate-flip-in-x",
        down: "animate-flip-in-x [animation-direction:reverse]",
        left: "animate-flip-in-y",
        right: "animate-flip-in-y [animation-direction:reverse]",
    };

    return (
        <div
            className={buildAnimationClasses(
                flipMap[direction],
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Rotate Animation with custom degrees
const Rotate = ({
    children,
    className = "",
    degrees = -200,
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: RotateAnimationProps) => {
    const style: CSSProperties = {
        "--rotation-start": `${degrees}deg`,
    } as CSSProperties;

    return (
        <div
            style={style}
            className={buildAnimationClasses(
                "animate-rotate-in",
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Zoom Animation with scale
const Zoom = ({
    children,
    className = "",
    scale = "medium",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: ScaleAnimationProps) => {
    const scaleMap = {
        small: "animate-zoom-in-small",
        medium: "animate-zoom-in",
        large: "animate-zoom-in-large",
    };

    return (
        <div
            className={buildAnimationClasses(
                scaleMap[scale],
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Roll Animation with direction
const Roll = ({
    children,
    className = "",
    direction = "left",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: DirectionalAnimationProps) => {
    const rollMap: Record<Direction, string> = {
        left: "animate-roll-in",
        right: "animate-roll-in-right",
        up: "animate-roll-in-up",
        down: "animate-roll-in-down",
    };

    return (
        <div
            className={buildAnimationClasses(
                rollMap[direction],
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// JackInTheBox Animation
const JackInTheBox = ({
    children,
    className = "",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "none",
    onAnimationEnd,
    onAnimationStart,
}: BaseAnimationProps) => {
    return (
        <div
            className={buildAnimationClasses(
                "animate-jack-in-the-box",
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Hinge Animation
const Hinge = ({
    children,
    className = "",
    duration = "normal",
    delay = "none",
    iteration = 1,
    fillMode = "forwards",
    onAnimationEnd,
    onAnimationStart,
}: BaseAnimationProps) => {
    return (
        <div
            className={buildAnimationClasses(
                "animate-hinge",
                duration,
                delay,
                iteration,
                fillMode,
                className
            )}
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </div>
    );
};

// Attach sub-components
Animation.Fade = Fade;
Animation.Slide = Slide;
Animation.Bounce = Bounce;
Animation.Flip = Flip;
Animation.Rotate = Rotate;
Animation.Zoom = Zoom;
Animation.Roll = Roll;
Animation.JackInTheBox = JackInTheBox;
Animation.Hinge = Hinge;

export default Animation;
export type {
    AnimationDelay,
    AnimationDuration,
    AnimationIteration,
    BaseAnimationProps,
    Direction,
    DirectionalAnimationProps,
    RotateAnimationProps,
    ScaleAnimationProps,
};
