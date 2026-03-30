// types.ts
// Types

import type { HTMLAttributes } from "react";
import type React from "react";

type AspectRatioPreset =
    | "square"
    | "video"
    | "photo"
    | "landscape"
    | "ultrawide"
    | "portrait"
    | "golden"
    | "a4"
    | "cinema"
    | "iphone"
    | "ipad";

type Overflow = "hidden" | "visible" | "auto" | "scroll";
type ObjectFit = "cover" | "contain" | "fill" | "scale-down" | "none";

interface AspectRatioProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Preset name or numeric ratio (width / height). */
    ratio?: number | AspectRatioPreset;
    /** Overflow behaviour. */
    overflow?: Overflow;
    /** Object-fit applied to direct `<img>` / `<video>` children. */
    objectFit?: ObjectFit;
    /** Accessible label for screen readers when content is meaningful. */
    "aria-label"?: string;
    /** Marks the container as decorative (hidden from screen readers). */
    decorative?: boolean;
    /** Adds rounded corners using design system tokens. */
    rounded?: boolean;
    /** Adds subtle shadow using design system tokens. */
    shadow?: boolean;
    /** Border using design system tokens. */
    bordered?: boolean;
    children: React.ReactNode;
}

// ============================================================================
// Constants
// ============================================================================

const PRESET_MAP: Record<AspectRatioPreset, { value: number; tw: string }> = {
    square: { value: 1, tw: "aspect-square" },
    video: { value: 16 / 9, tw: "aspect-video" },
    photo: { value: 4 / 3, tw: "aspect-[4/3]" },
    landscape: { value: 3 / 2, tw: "aspect-[3/2]" },
    ultrawide: { value: 21 / 9, tw: "aspect-[21/9]" },
    portrait: { value: 9 / 16, tw: "aspect-[9/16]" },
    golden: { value: 1.618, tw: "aspect-[1.618/1]" },
    a4: { value: Math.sqrt(2), tw: "aspect-[1.414/1]" },
    cinema: { value: 2.39, tw: "aspect-[2.39/1]" },
    iphone: { value: 19.5 / 9, tw: "aspect-[19.5/9]" },
    ipad: { value: 4 / 3, tw: "aspect-[4/3]" },
} as const;

const OVERFLOW_CLASS: Record<Overflow, string> = {
    hidden: "overflow-hidden",
    visible: "overflow-visible",
    auto: "overflow-auto",
    scroll: "overflow-scroll",
} as const;

const OBJECT_FIT_CLASS: Record<ObjectFit, string> = {
    cover: "[&>img]:object-cover [&>video]:object-cover",
    contain: "[&>img]:object-contain [&>video]:object-contain",
    fill: "[&>img]:object-fill [&>video]:object-fill",
    "scale-down": "[&>img]:object-scale-down [&>video]:object-scale-down",
    none: "[&>img]:object-none [&>video]:object-none",
} as const;

export type { AspectRatioPreset, AspectRatioProps, Overflow, ObjectFit };
export { PRESET_MAP, OVERFLOW_CLASS, OBJECT_FIT_CLASS };
