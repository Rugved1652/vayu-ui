// playlist.tsx
// UI: Playlist + Track

"use client";

import { clsx } from "clsx";
import { Music } from "lucide-react";
import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import type { Track } from "./types";
import { useAudioPlayer } from "./Audio";

export const AudioPlayerPlaylist = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
    const { setPlaylist } = useAudioPlayer();

    useEffect(() => {
        const tracks: Track[] = [];
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === AudioPlayerTrack) {
                tracks.push(child.props as Track);
            }
        });
        setPlaylist(tracks);
    }, [children, setPlaylist]);

    return (
        <div ref={ref} className={clsx("flex flex-col flex-1 overflow-y-auto divide-y divide-border/20", className)} {...props}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child) && child.type === AudioPlayerTrack) {
                    return React.cloneElement(child, { 'data-index': index } as any);
                }
                return child;
            })}
        </div>
    );
});
AudioPlayerPlaylist.displayName = "AudioPlayer.Playlist";

type AudioPlayerTrackProps = Track & HTMLAttributes<HTMLDivElement> & { 'data-index'?: number };

export const AudioPlayerTrack = forwardRef<HTMLDivElement, AudioPlayerTrackProps>(({ src, title, artist, poster, className, 'data-index': indexObj, ...props }, ref) => {
    const { currentTrackIndex, playTrack, isPlaying } = useAudioPlayer();
    const index = typeof indexObj === 'number' ? indexObj : -1;
    const isActive = currentTrackIndex === index;

    return (
        <div
            ref={ref}
            role="button"
            tabIndex={0}
            onClick={() => playTrack(index)}
            onKeyDown={(e) => e.key === 'Enter' && playTrack(index)}
            className={clsx(
                "flex items-center gap-3 p-3 transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5",
                isActive ? "bg-black/5 dark:bg-white/5" : "",
                className
            )}
            {...props}
        >
            <div className="w-10 h-10 rounded shrink-0 bg-muted flex items-center justify-center overflow-hidden">
                {poster ? <img src={poster} alt={title || "Track"} className="w-full h-full object-cover" /> : <Music className="w-5 h-5 opacity-50" />}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className={clsx("truncate text-sm font-semibold", isActive ? "text-brand" : "")}>{title || "Unknown Title"}</span>
                {artist && <span className="truncate text-xs text-muted-content">{artist}</span>}
            </div>
            {isActive && isPlaying && <div className="w-2 h-2 rounded-full bg-brand animate-pulse mr-2" />}
        </div>
    );
});
AudioPlayerTrack.displayName = "AudioPlayer.Track";
