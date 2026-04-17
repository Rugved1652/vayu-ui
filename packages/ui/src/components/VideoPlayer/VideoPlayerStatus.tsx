"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import type { VideoPlayerLoadingProps, VideoPlayerErrorProps } from "./types";

// ============================================================================
// Loading overlay
// ============================================================================

export const VideoPlayerLoading = forwardRef<HTMLDivElement, VideoPlayerLoadingProps>(
  ({ children, className, ...props }, ref) => {
    const { isLoading } = useVideoPlayer();

    if (!isLoading) return null;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={clsx(
          "absolute inset-0 flex items-center justify-center",
          "bg-black/40 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="animate-spin h-8 w-8 text-elevated"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children && <span className="text-sm text-elevated">{children}</span>}
          <span className="sr-only">Loading video…</span>
        </div>
      </div>
    );
  }
);

VideoPlayerLoading.displayName = "VideoPlayer.Loading";

// ============================================================================
// Error display
// ============================================================================

export const VideoPlayerError = forwardRef<HTMLDivElement, VideoPlayerErrorProps>(
  ({ children, className, ...props }, ref) => {
    const { error, clearError } = useVideoPlayer();

    if (!error) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={clsx(
          "absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3",
          "bg-destructive/90 text-destructive-content",
          "text-sm",
          className
        )}
        {...props}
      >
        <span>{children || error}</span>
        <button
          type="button"
          onClick={clearError}
          className="p-1 hover:bg-destructive-content/20 rounded-control transition-colors"
          aria-label="Dismiss error"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }
);

VideoPlayerError.displayName = "VideoPlayer.Error";
