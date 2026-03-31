// volume.tsx
// UI: Volume + Mute

"use client";

import { clsx } from "clsx";
import { Volume2, VolumeX } from "lucide-react";
import { forwardRef, HTMLAttributes, ButtonHTMLAttributes, useCallback, useRef, useState } from "react";
import { useAudioPlayer } from "./Audio";
import { useMergeRefs } from "../Popover";

export const AudioPlayerMute = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const { isMuted, toggleMute, volume } = useAudioPlayer();
    return (
        <button ref={ref} onClick={toggleMute} className={clsx("p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-focus hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-surface-content", className)} aria-label={isMuted ? "Unmute" : "Mute"} {...props}>
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
    );
});
AudioPlayerMute.displayName = "AudioPlayer.Mute";

export const AudioPlayerVolume = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { volume, setVolume, isMuted } = useAudioPlayer();
    const trackRef = useRef<HTMLDivElement>(null);
    const combinedRef = useMergeRefs(ref, trackRef);
    const displayVol = isMuted ? 0 : volume;

    const updateVol = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        setVolume(percent);
    }, [setVolume]);

    const handlePointerDown = (e: React.PointerEvent) => {
        updateVol(e.clientX);
        const handlePointerMove = (ev: PointerEvent) => updateVol(ev.clientX);
        const handlePointerUp = () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };

    return (
        <div ref={combinedRef} className={clsx("relative w-24 h-4 flex items-center cursor-pointer group", className)} onPointerDown={handlePointerDown} {...props}>
            <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-2">
                <div className="h-full bg-brand" style={{ width: `${displayVol * 100}%` }} />
            </div>
            <div
                className="absolute w-3 h-3 bg-white rounded-full shadow-sm -translate-x-1.5 transition-transform scale-0 group-hover:scale-100"
                style={{ left: `${displayVol * 100}%` }}
            />
        </div>
    );
});
AudioPlayerVolume.displayName = "AudioPlayer.Volume";
