import { clsx } from "clsx";
import React, { forwardRef } from "react";

// ============================================================================
// Types
// ============================================================================

type MarqueeSpeed = "slow" | "normal" | "fast";
type MarqueeDirection = "left" | "right";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The speed of the scroll animation. Default: "normal" */
    speed?: MarqueeSpeed;
    /** The direction of the scroll. Default: "left" */
    direction?: MarqueeDirection;
    /** Whether to pause animation on hover. Default: true */
    pauseOnHover?: boolean;
    /** Whether to apply edge gradient fade. Default: true */
    gradient?: boolean;
    children: React.ReactNode;
}

// ============================================================================
// Marquee Root (Server Component)
// ============================================================================

const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
    (
        {
            speed = "normal",
            direction = "left",
            pauseOnHover = true,
            gradient = true,
            className,
            children,
            style,
            ...props
        },
        ref
    ) => {
        // Map speeds to duration in seconds
        const durations: Record<MarqueeSpeed, string> = {
            slow: "40s",
            normal: "20s",
            fast: "10s",
        };

        return (
            <div
                ref={ref}
                data-pause={pauseOnHover}
                className={clsx(
                    "group relative flex w-full overflow-hidden",
                    gradient && "mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
                    className
                )}
                style={
                    {
                        "--duration": durations[speed],
                        "--direction": direction === "left" ? "normal" : "reverse",
                        ...style,
                    } as React.CSSProperties
                }
                role="region"
                aria-label="Scrolling content"
                {...props}
            >
                {children}
            </div>
        );
    }
);
Marquee.displayName = "Marquee";

// ============================================================================
// Marquee Content
// ============================================================================

interface MarqueeContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-row w-max min-w-full items-center",
                    "animate-marquee-scroll",
                    // Use CSS variables for animation control
                    "[animation-duration:var(--duration)]",
                    "[animation-direction:var(--direction)]",
                    // Pause on hover when parent has data-pause="true"
                    "group-data-[pause=true]:group-hover:[animation-play-state:paused]",
                    className
                )}
                {...props}
            >
                {/* Original Content */}
                <div className="flex shrink-0 items-center justify-around gap-4 px-4">
                    {children}
                </div>
                {/* Duplicate Content for Loop */}
                <div
                    className="flex shrink-0 items-center justify-around gap-4 px-4"
                    aria-hidden="true"
                >
                    {children}
                </div>
            </div>
        );
    }
);
MarqueeContent.displayName = "MarqueeContent";

// Helper to make pauseOnHover work: 
// The Root needs to have 'group' class if we want to use 'group-hover'.
// But we actually just want to pause THIS element when IT is hovered (or Root is hovered).
// Simpler approach:
// We can apply a specific class for pause behavior based on the prop.
// BUT since we are extracting Context, we don't know the prop here in Content.
// We must rely on the CSS variables cascading.
//
// Correction: The `MarqueeContent` doesn't know about `pauseOnHover` prop anymore.
// We must let `Marquee` (Root) handle the structural styles or pass everything down via CSS vars.
//
// Option A: Root applies a class "marquee-pause" if pauseOnHover is true.
// Content has `[.marquee-pause_&]:hover:[animation-play-state:paused]`.
// This works!

// Let's refine Marquee Root to pass the class.

// ============================================================================
// Marquee Item
// ============================================================================

const MarqueeItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx(
                "flex shrink-0 items-center justify-center",
                className
            )}
            {...props}
        />
    )
);
MarqueeItem.displayName = "MarqueeItem";

export { Marquee, MarqueeContent, MarqueeItem };
