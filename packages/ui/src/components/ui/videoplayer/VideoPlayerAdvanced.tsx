"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import { VIDEO_BTN } from "./utils";
import type {
  VideoPlayerFullscreenProps,
  VideoPlayerPiPProps,
  VideoPlayerCaptionsProps,
  VideoPlayerQualityProps,
  VideoPlayerSpeedProps,
} from "./types";

// ============================================================================
// Fullscreen toggle
// ============================================================================

export const VideoPlayerFullscreen = forwardRef<HTMLButtonElement, VideoPlayerFullscreenProps>(
  ({ children, className, ...props }, ref) => {
    const { isFullscreen, toggleFullscreen } = useVideoPlayer();

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        aria-pressed={isFullscreen}
        onClick={toggleFullscreen}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {typeof children === "function" ? children(isFullscreen) : children}
      </button>
    );
  }
);

VideoPlayerFullscreen.displayName = "VideoPlayer.Fullscreen";

// ============================================================================
// PiP toggle
// ============================================================================

export const VideoPlayerPiP = forwardRef<HTMLButtonElement, VideoPlayerPiPProps>(
  ({ children, className, ...props }, ref) => {
    const { isPiP, togglePiP } = useVideoPlayer();
    const isSupported =
      typeof document !== "undefined" && "pictureInPictureEnabled" in document;

    if (!isSupported) return null;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isPiP ? "Exit picture-in-picture" : "Enter picture-in-picture"}
        aria-pressed={isPiP}
        onClick={togglePiP}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {typeof children === "function" ? children(isPiP) : children}
      </button>
    );
  }
);

VideoPlayerPiP.displayName = "VideoPlayer.PiP";

// ============================================================================
// Captions toggle
// ============================================================================

export const VideoPlayerCaptions = forwardRef<HTMLButtonElement, VideoPlayerCaptionsProps>(
  ({ children, className, ...props }, ref) => {
    const { captionsEnabled, toggleCaptions, videoRef } = useVideoPlayer();
    const hasCaptions = videoRef.current && videoRef.current.textTracks.length > 0;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={captionsEnabled ? "Disable captions" : "Enable captions"}
        aria-pressed={captionsEnabled}
        disabled={!hasCaptions}
        onClick={toggleCaptions}
        className={clsx(VIDEO_BTN, className)}
        {...props}
      >
        {typeof children === "function" ? children(captionsEnabled) : children}
      </button>
    );
  }
);

VideoPlayerCaptions.displayName = "VideoPlayer.Captions";

// ============================================================================
// Quality selector
// ============================================================================

export const VideoPlayerQuality = forwardRef<HTMLSelectElement, VideoPlayerQualityProps>(
  ({ className, ...props }, ref) => {
    const { selectedQuality, setQuality, availableQualities } = useVideoPlayer();

    if (availableQualities.length === 0) return null;

    return (
      <select
        ref={ref}
        value={selectedQuality}
        onChange={(e) => setQuality(parseInt(e.target.value))}
        aria-label="Video quality"
        className={clsx(
          "px-2 py-1 text-xs rounded-control",
          "bg-surface border border-field",
          "text-surface-content",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        <option value={-1}>Auto</option>
        {availableQualities.map((q, index) => (
          <option key={index} value={index}>
            {q.label}
          </option>
        ))}
      </select>
    );
  }
);

VideoPlayerQuality.displayName = "VideoPlayer.Quality";

// ============================================================================
// Speed selector
// ============================================================================

export const VideoPlayerSpeed = forwardRef<HTMLSelectElement, VideoPlayerSpeedProps>(
  ({ rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], className, ...props }, ref) => {
    const { playbackRate, setPlaybackRate } = useVideoPlayer();

    return (
      <select
        ref={ref}
        value={playbackRate}
        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
        aria-label="Playback speed"
        className={clsx(
          "px-2 py-1 text-xs rounded-control",
          "bg-surface border border-field",
          "text-surface-content",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {rates.map((rate) => (
          <option key={rate} value={rate}>
            {rate === 1 ? "1x" : `${rate}x`}
          </option>
        ))}
      </select>
    );
  }
);

VideoPlayerSpeed.displayName = "VideoPlayer.Speed";
