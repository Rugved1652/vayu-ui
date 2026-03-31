// track-info.tsx
// UI: Track info display

"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import { useAudioPlayer } from "./Audio";

export const AudioPlayerTrackInfo = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { currentTrack } = useAudioPlayer();
    if (!currentTrack) return <div className={clsx("h-12 w-full", className)} />;

    return (
        <div ref={ref} className={clsx("flex flex-row items-center gap-4 py-2 px-1", className)} {...props}>
            {currentTrack.poster && (
                <div className="w-14 h-14 rounded overflow-hidden shadow-surface hidden sm:block">
                    <img src={currentTrack.poster} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="flex flex-col justify-center min-w-0">
                <div className="font-semibold text-text-md truncate text-surface-content">
                    {currentTrack.title || "Unknown Title"}
                </div>
                {currentTrack.artist && (
                    <div className="text-text-sm text-muted-content truncate">
                        {currentTrack.artist}
                    </div>
                )}
            </div>
        </div>
    );
});
AudioPlayerTrackInfo.displayName = "AudioPlayer.TrackInfo";
