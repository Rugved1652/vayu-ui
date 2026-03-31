// buttons.tsx
// UI: PlayPause, Skip, TimeDisplay, Fullscreen, Settings, Subtitles, Download, LoadingOverlay, CenterPlayButton

"use client";

import { clsx } from "clsx";
import {
    Download,
    Maximize,
    Minimize,
    Pause,
    Play,
    Settings,
    SkipBack,
    SkipForward,
    Subtitles,
} from "lucide-react";
import {
    forwardRef,
    HTMLAttributes,
} from "react";

import { useVideoPlayer } from "./VideoPlayer";
import { VIDEO_BTN, formatTime } from "./utils";
import type { SkipButtonProps } from "./types";

// ============================================================================
// Play / Pause
// ============================================================================

export const PlayPauseButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isPlaying, togglePlay } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            {isPlaying ? (
                <Pause className="w-5 h-5 text-white" aria-hidden="true" />
            ) : (
                <Play className="w-5 h-5 text-white" aria-hidden="true" />
            )}
        </button>
    );
});

PlayPauseButton.displayName = "VideoPlayer.PlayPauseButton";

// ============================================================================
// Skip buttons
// ============================================================================

export const SkipBackwardButton = forwardRef<
    HTMLButtonElement,
    SkipButtonProps
>(({ seconds = 10, className, ...props }, ref) => {
    const { seekBackward } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => seekBackward(seconds)}
            aria-label={`Skip backward ${seconds} seconds`}
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            <SkipBack
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

SkipBackwardButton.displayName = "VideoPlayer.SkipBackwardButton";

export const SkipForwardButton = forwardRef<
    HTMLButtonElement,
    SkipButtonProps
>(({ seconds = 10, className, ...props }, ref) => {
    const { seekForward } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => seekForward(seconds)}
            aria-label={`Skip forward ${seconds} seconds`}
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            <SkipForward
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

SkipForwardButton.displayName = "VideoPlayer.SkipForwardButton";

// ============================================================================
// Time display
// ============================================================================

export const TimeDisplay = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { currentTime, duration } = useVideoPlayer();

    return (
        <div
            ref={ref}
            className={clsx(
                "text-white text-sm font-secondary font-medium",
                className
            )}
            {...props}
        >
            <time dateTime={`PT${Math.floor(currentTime)}S`}>
                {formatTime(currentTime)}
            </time>
            <span className="mx-1" aria-hidden="true">
                /
            </span>
            <time dateTime={`PT${Math.floor(duration)}S`}>
                {formatTime(duration)}
            </time>
        </div>
    );
});

TimeDisplay.displayName = "VideoPlayer.TimeDisplay";

// ============================================================================
// Fullscreen
// ============================================================================

export const FullscreenButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isFullscreen, toggleFullscreen } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={toggleFullscreen}
            aria-label={
                isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
            }
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            {isFullscreen ? (
                <Minimize
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            ) : (
                <Maximize
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            )}
        </button>
    );
});

FullscreenButton.displayName = "VideoPlayer.FullscreenButton";

// ============================================================================
// Settings
// ============================================================================

export const SettingsButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        aria-label="Settings"
        className={clsx(VIDEO_BTN, className)}
        {...props}
    >
        <Settings
            className="w-5 h-5 text-white"
            aria-hidden="true"
        />
    </button>
));

SettingsButton.displayName = "VideoPlayer.SettingsButton";

// ============================================================================
// Subtitles
// ============================================================================

export const SubtitlesButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { showSubtitles, toggleSubtitles } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={toggleSubtitles}
            aria-label={
                showSubtitles ? "Hide subtitles" : "Show subtitles"
            }
            aria-pressed={showSubtitles}
            className={clsx(
                VIDEO_BTN,
                showSubtitles && "bg-white/20",
                className
            )}
            {...props}
        >
            <Subtitles
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

SubtitlesButton.displayName = "VideoPlayer.SubtitlesButton";

// ============================================================================
// Download
// ============================================================================

export const DownloadButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { download } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={download}
            aria-label="Download video"
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            <Download
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

DownloadButton.displayName = "VideoPlayer.DownloadButton";

// ============================================================================
// Loading overlay
// ============================================================================

export const LoadingOverlay = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { isLoading } = useVideoPlayer();
    if (!isLoading) return null;

    return (
        <div
            ref={ref}
            role="status"
            aria-label="Loading video"
            className={clsx(
                "absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none",
                className
            )}
            {...props}
        >
            <div
                className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
            />
            <span className="sr-only">Loading…</span>
        </div>
    );
});

LoadingOverlay.displayName = "VideoPlayer.LoadingOverlay";

// ============================================================================
// Center play button
// ============================================================================

export const CenterPlayButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isPlaying, togglePlay } = useVideoPlayer();
    if (isPlaying) return null;

    return (
        <button
            ref={ref}
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className={clsx(
                "absolute inset-0 flex items-center justify-center group/center",
                className
            )}
            {...props}
        >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover/center:bg-white transition-colors shadow-xl">
                <Play
                    className="w-10 h-10 text-black ml-1"
                    fill="currentColor"
                    aria-hidden="true"
                />
            </div>
        </button>
    );
});

CenterPlayButton.displayName = "VideoPlayer.CenterPlayButton";

