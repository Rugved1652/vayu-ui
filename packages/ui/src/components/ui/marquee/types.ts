// types.ts
// Types

import React from "react";

export type MarqueeSpeed = "slow" | "normal" | "fast";
export type MarqueeDirection = "left" | "right";
export type MarqueeLoopMode = "infinite" | "finite" | "single" | "ping-pong";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The speed of the scroll animation. Default: "normal" */
    speed?: MarqueeSpeed;
    /** The direction of the scroll. Default: "left" */
    direction?: MarqueeDirection;
    /** Whether to pause animation on hover. Default: true */
    pauseOnHover?: boolean;
    /** Whether to apply edge gradient fade. Default: true */
    gradient?: boolean;
    /** Whether to show pause/play control button. Default: true (WCAG 2.2.2) */
    showControls?: boolean;
    /** Accessible label for the marquee region */
    label?: string;
    /** The loop mode for the animation. Default: "infinite" */
    loopMode?: MarqueeLoopMode;
    /** Number of loops when loopMode is "finite". Default: 1 */
    loopCount?: number;
    children: React.ReactNode;
}

export interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
