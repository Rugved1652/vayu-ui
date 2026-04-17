"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import type { VideoPlayerControlsProps } from "./types";

export const VideoPlayerControls = forwardRef<HTMLDivElement, VideoPlayerControlsProps>(
  ({ children, autoHide = true, autoHideDelay = 3000, className, ...props }, ref) => {
    const { isPlaying } = useVideoPlayer();
    const [visible, setVisible] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = useCallback(() => {
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoHide && isPlaying) {
        timeoutRef.current = setTimeout(() => setVisible(false), autoHideDelay);
      }
    }, [autoHide, autoHideDelay, isPlaying]);

    useEffect(() => {
      if (isPlaying && autoHide) {
        resetTimer();
      } else {
        setVisible(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [isPlaying, autoHide, resetTimer]);

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Video controls"
        className={clsx(
          "transition-opacity duration-300",
          !visible && autoHide && isPlaying && "opacity-0 pointer-events-none",
          className
        )}
        onMouseMove={resetTimer}
        onTouchStart={resetTimer}
        {...props}
      >
        {children}
      </div>
    );
  }
);

VideoPlayerControls.displayName = "VideoPlayer.Controls";
