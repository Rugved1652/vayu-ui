// status.tsx
// UI: Loading + Error + Buffer (alias)

"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import { useAudioPlayer } from "./Audio";
import { clsx } from "clsx";

export const AudioPlayerLoading = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { isLoading } = useAudioPlayer();
    if (!isLoading) return null;
    return (
        <div ref={ref} className={clsx("flex items-center justify-center p-2 text-brand animate-spin", className)} aria-label="Loading" {...props}>
            <Loader2 className="w-5 h-5" />
        </div>
    );
});
AudioPlayerLoading.displayName = "AudioPlayer.Loading";

export const AudioPlayerError = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { error } = useAudioPlayer();
    if (!error) return null;
    return (
        <div ref={ref} className={clsx("flex flex-row items-center gap-2 p-2 px-3 text-destructive-content bg-destructive rounded-control text-sm", className)} role="alert" {...props}>
            <AlertCircle className="w-4 h-4" />
            <span>{error.message || "An error occurred"}</span>
        </div>
    );
});
AudioPlayerError.displayName = "AudioPlayer.Error";

export const AudioPlayerBuffer = AudioPlayerLoading;
