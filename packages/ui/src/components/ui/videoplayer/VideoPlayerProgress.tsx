"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import { formatTime as formatTimeUtil } from "./utils";
import type {
  VideoPlayerProgressProps,
  VideoPlayerSeekProps,
  VideoPlayerTimeProps,
  VideoPlayerBufferProps,
} from "./types";

// ============================================================================
// Progress (read-only)
// ============================================================================

export const VideoPlayerProgress = forwardRef<HTMLDivElement, VideoPlayerProgressProps>(
  ({ showBuffer = true, className, ...props }, ref) => {
    const { currentTime, duration, buffered } = useVideoPlayer();
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={clsx("relative h-2 w-full rounded-full bg-muted overflow-hidden", className)}
        {...props}
      >
        {showBuffer && (
          <div
            className="absolute h-full bg-muted-content/30 transition-all"
            style={{ width: `${bufferProgress}%` }}
          />
        )}
        <div
          className="absolute h-full bg-brand transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
);

VideoPlayerProgress.displayName = "VideoPlayer.Progress";

// ============================================================================
// Seek (interactive slider)
// ============================================================================

export const VideoPlayerSeek = forwardRef<HTMLDivElement, VideoPlayerSeekProps>(
  ({ showBuffer = true, showThumb = true, className, ...props }, ref) => {
    const {
      currentTime, duration, buffered, seek,
      seekForward, seekBackward, setSeeking, isSeeking,
    } = useVideoPlayer();

    const containerRef = useRef<HTMLDivElement>(null);
    const [localProgress, setLocalProgress] = useState<number | null>(null);

    const progress = localProgress ?? (duration > 0 ? (currentTime / duration) * 100 : 0);
    const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

    const handleSeek = useCallback(
      (clientX: number) => {
        if (!containerRef.current || duration === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        seek(percent * duration);
        setLocalProgress(null);
      },
      [duration, seek]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        setSeeking(true);
        handleSeek(e.clientX);

        const handleMouseMove = (e: MouseEvent) => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setLocalProgress(percent * 100);
          }
        };

        const handleMouseUp = (e: MouseEvent) => {
          handleSeek(e.clientX);
          setSeeking(false);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [handleSeek, setSeeking]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowRight": e.preventDefault(); seekForward(); break;
          case "ArrowLeft": e.preventDefault(); seekBackward(); break;
          case "Home": e.preventDefault(); seek(0); break;
          case "End": e.preventDefault(); seek(duration); break;
        }
      },
      [seekForward, seekBackward, seek, duration]
    );

    return (
      <div
        ref={containerRef}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(currentTime)}
        aria-valuetext={`${Math.floor(currentTime)} of ${Math.floor(duration)}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        className={clsx(
          "relative h-2 w-full rounded-full bg-muted cursor-pointer group",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          className
        )}
        {...props}
      >
        {showBuffer && (
          <div
            className="absolute h-full bg-muted-content/30 rounded-full transition-all"
            style={{ width: `${bufferProgress}%` }}
          />
        )}
        <div
          className={clsx(
            "absolute h-full bg-brand rounded-full transition-all",
            isSeeking && "transition-none"
          )}
          style={{ width: `${progress}%` }}
        />
        {showThumb && (
          <div
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full",
              "bg-brand border-2 border-elevated shadow-sm",
              "opacity-0 group-hover:opacity-100 group-focus:opacity-100",
              "transition-opacity",
              isSeeking && "opacity-100"
            )}
            style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
          />
        )}
      </div>
    );
  }
);

VideoPlayerSeek.displayName = "VideoPlayer.Seek";

// ============================================================================
// Time display
// ============================================================================

export const VideoPlayerTime = forwardRef<HTMLDivElement, VideoPlayerTimeProps>(
  ({ showRemaining = false, className, ...props }, ref) => {
    const { currentTime, duration, formatTime } = useVideoPlayer();
    const remaining = duration - currentTime;

    return (
      <div
        ref={ref}
        className={clsx("flex items-center gap-1 text-xs text-muted-content font-mono select-none", className)}
        {...props}
      >
        <span>{formatTime(currentTime)}</span>
        <span aria-hidden="true">/</span>
        <span>{showRemaining ? `-${formatTime(remaining)}` : formatTime(duration)}</span>
      </div>
    );
  }
);

VideoPlayerTime.displayName = "VideoPlayer.Time";

// ============================================================================
// Buffer bar
// ============================================================================

export const VideoPlayerBuffer = forwardRef<HTMLDivElement, VideoPlayerBufferProps>(
  ({ className, ...props }, ref) => {
    const { buffered, duration } = useVideoPlayer();
    const bufferPercent = duration > 0 ? (buffered / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label="Buffered"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(bufferPercent)}
        className={clsx("h-1 w-full rounded-full bg-muted overflow-hidden", className)}
        {...props}
      >
        <div
          className="h-full bg-muted-content/50 transition-all"
          style={{ width: `${bufferPercent}%` }}
        />
      </div>
    );
  }
);

VideoPlayerBuffer.displayName = "VideoPlayer.Buffer";
