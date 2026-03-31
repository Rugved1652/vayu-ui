// rate.tsx
// UI: Rate control

"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, ButtonHTMLAttributes } from "react";
import { useAudioPlayer } from "./audioplayer";

export const AudioPlayerRate = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { playbackRate, setPlaybackRate } = useAudioPlayer();
    const cycleRate = () => {
        const rates = [0.5, 1, 1.25, 1.5, 2];
        const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
        setPlaybackRate(rates[nextIdx]);
    };
    return (
        <button ref={ref} onClick={cycleRate} className={clsx("p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-focus hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-xs font-bold font-mono tracking-tighter w-10 text-surface-content", className)} {...props}>
            {playbackRate}x
        </button>
    );
});
AudioPlayerRate.displayName = "AudioPlayer.Rate";
