// progress.tsx
// UI: Progress bar with seeking + hover time preview

"use client";

import { clsx } from "clsx";
import {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { useVideoPlayer } from "./videoplayer";
import { formatTime } from "./utils";
import type { ProgressBarProps } from "./types";

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ showBuffer = true, className, ...props }, ref) => {
        const { currentTime, duration, buffered, seek } =
            useVideoPlayer();
        const [isSeeking, setIsSeeking] = useState(false);
        const [hoverTime, setHoverTime] = useState<number | null>(null);
        const progressRef = useRef<HTMLDivElement>(null);

        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
        const bufferProgress =
            duration > 0 ? (buffered / duration) * 100 : 0;

        const updateSeek = useCallback(
            (clientX: number) => {
                const rect =
                    progressRef.current?.getBoundingClientRect();
                if (!rect) return;
                const pos = Math.max(
                    0,
                    Math.min(1, (clientX - rect.left) / rect.width)
                );
                seek(pos * duration);
            },
            [seek, duration]
        );

        const handleMouseDown = useCallback(
            (e: React.MouseEvent) => {
                setIsSeeking(true);
                updateSeek(e.clientX);
            },
            [updateSeek]
        );

        const handleMouseMove = useCallback(
            (e: React.MouseEvent) => {
                const rect =
                    progressRef.current?.getBoundingClientRect();
                if (rect) {
                    setHoverTime(
                        ((e.clientX - rect.left) / rect.width) *
                        duration
                    );
                }
                if (isSeeking) updateSeek(e.clientX);
            },
            [isSeeking, updateSeek, duration]
        );

        const handleMouseLeave = useCallback(
            () => setHoverTime(null),
            []
        );

        useEffect(() => {
            if (!isSeeking) return;
            const up = () => setIsSeeking(false);
            document.addEventListener("mouseup", up);
            return () => document.removeEventListener("mouseup", up);
        }, [isSeeking]);

        return (
            <div
                ref={ref}
                className={clsx("group/progress", className)}
                {...props}
            >
                <div
                    ref={progressRef}
                    role="slider"
                    tabIndex={0}
                    aria-label="Seek video"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={currentTime}
                    aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group-hover/progress:h-2 transition-all"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {showBuffer && (
                        <div
                            className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all"
                            style={{ width: `${bufferProgress}%` }}
                            aria-hidden="true"
                        />
                    )}

                    <div
                        className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                        aria-hidden="true"
                    />

                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all"
                        style={{
                            left: `${progress}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                        aria-hidden="true"
                    />

                    {hoverTime !== null && (
                        <div
                            className="absolute -top-8 -translate-x-1/2 bg-black/90 text-white text-xs font-secondary px-2 py-1 rounded pointer-events-none"
                            style={{
                                left: `${(hoverTime / duration) * 100}%`,
                            }}
                            aria-hidden="true"
                        >
                            {formatTime(hoverTime)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

ProgressBar.displayName = "VideoPlayer.ProgressBar";
