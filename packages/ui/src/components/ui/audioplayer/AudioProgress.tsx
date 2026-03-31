// progress.tsx
// UI: Seek + Progress (alias)

"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, useCallback, useRef, useState } from "react";
import { useAudioPlayer } from "./Audio";
import { useMergeRefs } from "../Popover";

export const AudioPlayerSeek = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { currentTime, duration, seek, buffered } = useAudioPlayer();
    const progressRef = useRef<HTMLDivElement>(null);
    const combinedRef = useMergeRefs(ref, progressRef);

    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

    const updateSeek = useCallback((clientX: number) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        seek(percent * duration);
    }, [seek, duration]);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        updateSeek(e.clientX);
        const handlePointerMove = (ev: PointerEvent) => updateSeek(ev.clientX);
        const handlePointerUp = () => {
            setIsDragging(false);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };

    return (
        <div
            ref={combinedRef}
            className={clsx("group relative h-4 flex items-center cursor-pointer w-full", className)}
            onPointerEnter={() => setIsHovering(true)}
            onPointerLeave={() => setIsHovering(false)}
            onPointerDown={handlePointerDown}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            tabIndex={0}
            {...props}
        >
            <div className="absolute w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-2">
                <div className="absolute top-0 bottom-0 left-0 bg-black/20 dark:bg-white/20 transition-all" style={{ width: `${bufferProgress}%` }} />
                <div className="absolute top-0 bottom-0 left-0 bg-brand transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div
                className={clsx(
                    "absolute w-3 h-3 bg-white rounded-full shadow-md -translate-x-1.5 transition-all outline outline-1 outline-black/10",
                    isHovering || isDragging ? "scale-100" : "scale-0"
                )}
                style={{ left: `${progress}%` }}
            />
        </div>
    );
});
AudioPlayerSeek.displayName = "AudioPlayer.Seek";

export const AudioPlayerProgress = AudioPlayerSeek;
