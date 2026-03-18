import { clsx } from "clsx";
import React, { forwardRef } from "react";

// ============================================================================
// Types
// ============================================================================

type MarqueeSpeed = "slow" | "normal" | "fast";
type MarqueeDirection = "left" | "right";
type MarqueeLoopMode = "infinite" | "finite" | "single" | "ping-pong";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
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
            showControls = true,
            label = "Scrolling content",
            loopMode = "infinite",
            loopCount = 1,
            className,
            children,
            style,
            ...props
        },
        ref
    ) => {
        const durations: Record<MarqueeSpeed, string> = {
            slow: "40s",
            normal: "20s",
            fast: "10s",
        };

        // Determine animation class based on loop mode
        const getAnimationClass = () => {
            switch (loopMode) {
                case "ping-pong":
                    return "animate-marquee-ping-pong";
                case "finite":
                    return clsx(
                        "animate-marquee-scroll",
                        "[animation-iteration-count:var(--loop-count)]"
                    );
                case "single":
                    return clsx(
                        "animate-marquee-scroll",
                        "[animation-iteration-count:1]",
                        "[animation-fill-mode:forwards]"
                    );
                default:
                    return "animate-marquee-scroll";
            }
        };

        // For ping-pong mode, we don't need to duplicate content
        const shouldDuplicateContent = loopMode !== "ping-pong";

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative flex w-full items-center gap-2",
                    // When checkbox is checked, pause animation
                    showControls && "has-[:checked] [&>.marquee-container>.marquee-content]:[animation-play-state:paused]",
                    className
                )}
                role="region"
                aria-roledescription="marquee"
                aria-label={label}
                aria-live="off"
                {...props}
            >
                {/* Pause/Play Control (WCAG 2.2.2 - CSS-only) */}
                {showControls && (
                    <>
                        <input
                            type="checkbox"
                            id="marquee-pause"
                            className="peer sr-only"
                            aria-label="Pause scrolling animation"
                        />
                        <label
                            htmlFor="marquee-pause"
                            className={clsx(
                                "shrink-0 w-8 h-8 flex items-center justify-center",
                                "rounded-md border border-ground-300 dark:border-ground-600",
                                "bg-white dark:bg-ground-800",
                                "text-ground-600 dark:text-ground-400",
                                "hover:bg-ground-100 dark:hover:bg-ground-700",
                                "focus-within:ring-2 focus-within:ring-primary-500",
                                "cursor-pointer select-none",
                                "transition-colors"
                            )}
                            title="Pause/Play animation"
                        >
                            {/* Play icon (shown when paused - checkbox checked) */}
                            <svg
                                className="w-4 h-4 hidden peer-checked:block"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            {/* Pause icon (shown when playing - checkbox unchecked) */}
                            <svg
                                className="w-4 h-4 block peer-checked:hidden"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        </label>
                    </>
                )}

                {/* Marquee Container */}
                <div
                    className={clsx(
                        "marquee-container flex-1 overflow-hidden",
                        gradient && "mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    )}
                >
                    <div
                        className={clsx(
                            "marquee-content flex flex-row w-max min-w-full items-center",
                            getAnimationClass(),
                            "[animation-duration:var(--duration)]",
                            // Only apply direction for non-ping-pong modes
                            loopMode !== "ping-pong" && "[animation-direction:var(--direction)]",
                            // Pause on hover
                            pauseOnHover && "hover:[animation-play-state:paused]",
                            // Respect reduced motion preference (WCAG 2.3.3)
                            "motion-reduce:animate-none"
                        )}
                        style={
                            {
                                "--duration": durations[speed],
                                "--direction": direction === "left" ? "normal" : "reverse",
                                "--loop-count": loopCount,
                                ...style,
                            } as React.CSSProperties
                        }
                    >
                        {/* Original Content */}
                        <div className="flex shrink-0 items-center justify-around gap-4 px-4">
                            {children}
                        </div>
                        {/* Duplicate Content for Seamless Loop (not for ping-pong) */}
                        {shouldDuplicateContent && (
                            <div
                                className="flex shrink-0 items-center justify-around gap-4 px-4"
                                aria-hidden="true"
                            >
                                {children}
                            </div>
                        )}
                    </div>
                </div>
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
    ({ className, children, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-row w-max min-w-full items-center",
                    "animate-marquee-scroll",
                    "[animation-duration:var(--duration)]",
                    "[animation-direction:var(--direction)]",
                    "hover:[animation-play-state:paused]",
                    "motion-reduce:animate-none",
                    className
                )}
                style={style}
                {...props}
            >
                <div className="flex shrink-0 items-center justify-around gap-4 px-4">
                    {children}
                </div>
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
