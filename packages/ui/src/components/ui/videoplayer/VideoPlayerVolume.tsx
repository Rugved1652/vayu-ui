"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import { VIDEO_BTN } from "./utils";
import type { VideoPlayerVolumeProps, VideoPlayerMuteProps } from "./types";

// ============================================================================
// Volume slider
// ============================================================================

export const VideoPlayerVolume = forwardRef<HTMLInputElement, VideoPlayerVolumeProps>(
  ({ vertical = false, className, ...props }, ref) => {
    const { volume, isMuted, setVolume } = useVideoPlayer();

    return (
      <input
        ref={ref}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        aria-label="Volume"
        className={clsx(
          "w-20 h-1 rounded-full appearance-none cursor-pointer",
          "bg-muted accent-brand",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          vertical && "-rotate-90",
          className
        )}
        {...props}
      />
    );
  }
);

VideoPlayerVolume.displayName = "VideoPlayer.Volume";

// ============================================================================
// Mute toggle
// ============================================================================

export const VideoPlayerMute = forwardRef<HTMLButtonElement, VideoPlayerMuteProps>(
  ({ children, className, ...props }, ref) => {
    const { isMuted, toggleMute, volume } = useVideoPlayer();
    const isDisabled = volume === 0;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isMuted ? "Unmute" : "Mute"}
        aria-pressed={isMuted}
        disabled={isDisabled}
        onClick={toggleMute}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {typeof children === "function" ? children(isMuted) : children}
      </button>
    );
  }
);

VideoPlayerMute.displayName = "VideoPlayer.Mute";
