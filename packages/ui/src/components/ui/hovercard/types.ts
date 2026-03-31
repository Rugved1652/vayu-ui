// types.ts
// Types

import { HTMLAttributes } from "react";

export type HoverCardSide = "top" | "right" | "bottom" | "left";
export type HoverCardAlign = "start" | "center" | "end";

export interface HoverCardProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    children: React.ReactNode;
    /** Card content — can be any JSX. */
    content: React.ReactNode;
    /** Preferred side relative to the trigger. */
    side?: HoverCardSide;
    /** Alignment along the trigger edge. */
    align?: HoverCardAlign;
    /** Gap between trigger and card (px). */
    sideOffset?: number;
    /** Alignment shift (px). */
    alignOffset?: number;
    /** Delay before opening (ms). */
    openDelay?: number;
    /** Delay before closing (ms). */
    closeDelay?: number;
    /** Extra class on the card container. */
    contentClassName?: string;
    /** Disable the hover card entirely. */
    disabled?: boolean;
    /** Show the directional arrow. */
    showArrow?: boolean;
}

// Arrow border helpers — maps side → which borders to hide so the rotated
// square looks like a triangle pointing at the trigger.
export const arrowBorderClasses: Record<HoverCardSide, string> = {
    bottom: "border-b-0 border-r-0",
    top: "border-t-0 border-l-0",
    left: "border-l-0 border-b-0",
    right: "border-r-0 border-t-0",
};
