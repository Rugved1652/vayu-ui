// video.tsx
// UI: Video element wrapper

"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { useVideoPlayer } from "./VideoPlayer";
import type { VideoProps } from "./types";

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
    ({ src, poster, className, ...props }, _ref) => {
        const { videoRef, togglePlay } = useVideoPlayer();

        return (
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className={clsx("w-full h-full", className)}
                onClick={togglePlay}
                {...props}
            >
                Your browser does not support the video tag.
            </video>
        );
    }
);

Video.displayName = "VideoPlayer.Video";
