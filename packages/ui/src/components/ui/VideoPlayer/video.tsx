"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import type { VideoPlayerVideoProps } from "./types";
import { isHLS } from "./utils";

export const VideoPlayerVideo = forwardRef<HTMLDivElement, VideoPlayerVideoProps>(
  ({ className, poster, objectFit = "contain", ...props }, ref) => {
    const { videoRef, togglePlay, currentTrack, registerVideo } = useVideoPlayer();

    return (
      <div
        ref={ref}
        className={clsx("relative w-full aspect-video bg-black rounded-surface overflow-hidden", className)}
        onClick={togglePlay}
        role="presentation"
        {...props}
      >
        <video
          ref={(el: HTMLVideoElement | null) => {
            if (videoRef) (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
            registerVideo(el);
          }}
          src={currentTrack?.src && !isHLS(currentTrack.src) ? currentTrack.src : undefined}
          poster={poster || currentTrack?.poster || undefined}
          playsInline
          className={clsx(
            "w-full h-full",
            objectFit === "contain" ? "object-contain" : "object-cover"
          )}
          aria-label="Video player"
        />
      </div>
    );
  }
);

VideoPlayerVideo.displayName = "VideoPlayer.Video";
