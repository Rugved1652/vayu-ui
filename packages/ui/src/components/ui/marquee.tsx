"use client";
import { clsx } from "clsx";
import React, { forwardRef, useState } from "react";

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
// Marquee Root Component
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
        const [isPaused, setIsPaused] = useState(false);

        // Animation duration mapping
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

        // Toggle pause/play
        const togglePause = () => {
            setIsPaused((prev) => !prev);
        };

        // Keyboard handler for pause/play button
        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                togglePause();
            }
        };

        // Ping-pong mode doesn't need content duplication
        const shouldDuplicateContent = loopMode !== "ping-pong";

        return (
            <div
                ref={ref}
                className={clsx("relative flex w-full items-center gap-2", className)}
                role="region"
                aria-label={label}
                aria-live="off"
                {...props}
            >
                {/* Pause/Play Control Button (WCAG 2.2.2 - Moving Content) */}
                {showControls && (
                    <button
                        type="button"
                        onClick={togglePause}
                        onKeyDown={handleKeyDown}
                        className={clsx(
                            "shrink-0 w-9 h-9 flex items-center justify-center",
                            "rounded-md border border-ground-300 dark:border-ground-600",
                            "bg-white dark:bg-ground-800",
                            "text-ground-600 dark:text-ground-400",
                            "hover:bg-ground-100 dark:hover:bg-ground-700",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                            "transition-colors duration-200",
                            "cursor-pointer"
                        )}
                        aria-label={isPaused ? "Play scrolling animation" : "Pause scrolling animation"}
                        aria-pressed={isPaused}
                    >
                        {isPaused ? (
                            // Play icon
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        ) : (
                            // Pause icon
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Marquee Container */}
                <div
                    className={clsx(
                        "flex-1 overflow-hidden relative",
                        gradient &&
                            "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    )}
                >
                    <div
                        className={clsx(
                            "flex flex-row w-max min-w-full items-center",
                            getAnimationClass(),
                            "[animation-duration:var(--duration)]",
                            loopMode !== "ping-pong" && "[animation-direction:var(--direction)]",
                            pauseOnHover && "hover:animate-paused",
                            isPaused && "animate-paused",
                            // WCAG 2.3.3 - Respect reduced motion preference
                            "motion-reduce:animate-none motion-reduce:[animation:none]"
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

                        {/* Duplicate Content for Seamless Loop */}
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
// Marquee Item Component
// ============================================================================

interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={clsx("flex shrink-0 items-center justify-center", className)}
            {...props}
        >
            {children}
        </div>
    )
);

MarqueeItem.displayName = "MarqueeItem";

// ============================================================================
// Export
// ============================================================================

export { Marquee, MarqueeItem };
export type { MarqueeProps, MarqueeItemProps };