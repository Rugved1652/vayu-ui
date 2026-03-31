// controls.tsx
// UI: Controls container

"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { useVideoPlayer } from "./VideoPlayer";
import type { ControlsProps } from "./types";

export const Controls = forwardRef<HTMLDivElement, ControlsProps>(
    ({ className, children, ...props }, ref) => {
        const { showControls, setIsHoveringControls } = useVideoPlayer();

        return (
            <div
                ref={ref}
                className={clsx(
                    "absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent transition-all duration-300",
                    showControls
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none",
                    className
                )}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
                {...props}
            >
                <div className="p-4 space-y-2">{children}</div>
            </div>
        );
    }
);

Controls.displayName = "VideoPlayer.Controls";
