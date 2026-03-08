import { clsx } from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";

// ============================================================================
// Types
// ============================================================================

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
    children: React.ReactNode;
}

// ============================================================================
// Hoisted config
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

// ============================================================================
// AspectRatio
// ============================================================================

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
    (
        {
            ratio = "square",
            overflow = "hidden",
            objectFit = "cover",
            decorative = false,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const isPreset = typeof ratio === "string";
        const preset = isPreset ? PRESET_MAP[ratio] : null;
        // FIX: Safety check for 0 to avoid Infinity padding
        const numericRatio = preset ? preset.value : (ratio as number);

        // Accessibility Logic
        // 1. If decorative, we MUST hide it and ensure no label exists (conflict).
        // 2. If not decorative, we check if an aria-label was passed.
        //    - If yes, we apply role="region" (or "group").
        //    - If no, we apply no role (generic container).
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let ariaLabel: string | undefined = undefined;
        // We extract aria-label from props to handle logic safely
        // Note: In strict TS, props rest picks this up, so we just use it for logic checks.
        const passedAriaLabel = props["aria-label"];

        const getAriaProps = () => {
            if (decorative) {
                // Decorative: hide from tree. Do not allow aria-label.
                return { 
                    role: "presentation", 
                    "aria-hidden": true, 
                    "aria-label": undefined 
                };
            }

            if (passedAriaLabel) {
                // Meaningful content with label: Use region/group
                return { 
                    role: "region", 
                    "aria-hidden": undefined 
                };
            }

            // Default: Just a layout container. No semantic role.
            return { 
                role: undefined, 
                "aria-hidden": undefined 
            };
        };

        const ariaProps = getAriaProps();

        // Calculate Padding Bottom safely
        const paddingBottom = numericRatio > 0 ? `${100 / numericRatio}%` : undefined;

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative w-full",
                    preset?.tw,
                    OVERFLOW_CLASS[overflow],
                    className
                )}
                style={
                    preset
                        ? style
                        : {
                            paddingBottom,
                            ...style,
                        }
                }
                {...ariaProps}
                {...props}
            >
                <div
                    className={clsx(
                        "absolute inset-0 w-full h-full",
                        OBJECT_FIT_CLASS[objectFit],
                        "[&>img]:w-full [&>img]:h-full [&>video]:w-full [&>video]:h-full"
                    )}
                >
                    {children}
                </div>
            </div>
        );
    }
);

AspectRatio.displayName = "AspectRatio";

// ============================================================================
// Exports
// ============================================================================

export { AspectRatio };
export type { AspectRatioPreset, AspectRatioProps };