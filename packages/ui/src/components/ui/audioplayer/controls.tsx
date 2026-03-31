// controls.tsx
// UI: Controls + PlayPause + Next + Previous + Time

"use client";

import { clsx } from "clsx";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { forwardRef, HTMLAttributes, ButtonHTMLAttributes } from "react";
import { useAudioPlayer } from "./audioplayer";
import { formatTime } from "./utils";

const BTN_CLASS = "p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-focus hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

export const AudioPlayerControls = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={clsx("flex flex-col gap-2 p-3 sm:px-4 sm:py-3", className)} {...props}>
            {props.children}
        </div>
    );
});
AudioPlayerControls.displayName = "AudioPlayer.Controls";

export const AudioPlayerPlayPause = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { isPlaying, togglePlay, playlist } = useAudioPlayer();
    const disabled = playlist.length === 0;

    return (
        <button
            ref={ref}
            onClick={togglePlay}
            disabled={disabled}
            className={clsx(BTN_CLASS, "bg-brand text-brand-content hover:bg-brand/90 hover:scale-105 dark:hover:bg-brand/90", className)}
            aria-label={isPlaying ? "Pause" : "Play"}
            {...props}
        >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
        </button>
    );
});
AudioPlayerPlayPause.displayName = "AudioPlayer.PlayPause";

export const AudioPlayerNext = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { next, currentTrackIndex, playlist } = useAudioPlayer();
    const loopPlaylist = false;
    const disabled = playlist.length === 0 || (!loopPlaylist && currentTrackIndex === playlist.length - 1);
    return (
        <button ref={ref} onClick={next} disabled={disabled} className={clsx(BTN_CLASS, "text-surface-content", className)} aria-label="Next Track" {...props}>
            <SkipForward className="w-5 h-5 fill-current" />
        </button>
    );
});
AudioPlayerNext.displayName = "AudioPlayer.Next";

export const AudioPlayerPrevious = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { previous, currentTrackIndex, playlist, currentTime } = useAudioPlayer();
    const loopPlaylist = false;
    const isFirst = currentTrackIndex === 0;
    const disabled = playlist.length === 0 || (!loopPlaylist && isFirst && currentTime <= 3);
    return (
        <button ref={ref} onClick={previous} disabled={disabled} className={clsx(BTN_CLASS, "text-surface-content", className)} aria-label="Previous Track" {...props}>
            <SkipBack className="w-5 h-5 fill-current" />
        </button>
    );
});
AudioPlayerPrevious.displayName = "AudioPlayer.Previous";

export const AudioPlayerTime = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { currentTime, duration } = useAudioPlayer();
    return (
        <div ref={ref} className={clsx("flex items-center gap-1 text-xs tabular-nums text-muted-content font-medium", className)} {...props}>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
        </div>
    );
});
AudioPlayerTime.displayName = "AudioPlayer.Time";
