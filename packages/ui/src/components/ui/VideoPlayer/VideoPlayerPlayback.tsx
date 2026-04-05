"use client";

import { forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import { VIDEO_BTN } from "./utils";
import type {
  VideoPlayerPlayPauseProps,
  VideoPlayerNextProps,
  VideoPlayerPreviousProps,
} from "./types";

// ============================================================================
// PlayPause
// ============================================================================

export const VideoPlayerPlayPause = forwardRef<HTMLButtonElement, VideoPlayerPlayPauseProps>(
  ({ children, className, ...props }, ref) => {
    const { isPlaying, isLoading, togglePlay } = useVideoPlayer();

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        aria-pressed={isPlaying}
        disabled={isLoading}
        onClick={togglePlay}
        className={clsx(
          VIDEO_BTN,
          "bg-brand text-brand-content rounded-full",
          "hover:bg-brand/90",
          className
        )}
        {...props}
      >
        {typeof children === "function" ? children(isPlaying) : children}
      </button>
    );
  }
);

VideoPlayerPlayPause.displayName = "VideoPlayer.PlayPause";

// ============================================================================
// Next
// ============================================================================

export const VideoPlayerNext = forwardRef<HTMLButtonElement, VideoPlayerNextProps>(
  ({ children, className, ...props }, ref) => {
    const { nextTrack, playlist } = useVideoPlayer();
    const isDisabled = playlist.length <= 1;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next track"
        disabled={isDisabled}
        onClick={nextTrack}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

VideoPlayerNext.displayName = "VideoPlayer.Next";

// ============================================================================
// Previous
// ============================================================================

export const VideoPlayerPrevious = forwardRef<HTMLButtonElement, VideoPlayerPreviousProps>(
  ({ children, className, ...props }, ref) => {
    const { previousTrack, playlist } = useVideoPlayer();
    const isDisabled = playlist.length <= 1;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous track"
        disabled={isDisabled}
        onClick={previousTrack}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

VideoPlayerPrevious.displayName = "VideoPlayer.Previous";
