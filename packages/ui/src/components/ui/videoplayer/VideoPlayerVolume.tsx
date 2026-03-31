// volume.tsx
// UI: Volume control with expandable slider

"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, useId, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { useVideoPlayer } from "./VideoPlayer";
import { VIDEO_BTN } from "./utils";

export const VolumeControl = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { volume, isMuted, setVolume, toggleMute } = useVideoPlayer();
    const [showSlider, setShowSlider] = useState(false);
    const volumeId = useId();

    return (
        <div
            ref={ref}
            className={clsx("flex items-center gap-2", className)}
            onMouseEnter={() => setShowSlider(true)}
            onMouseLeave={() => setShowSlider(false)}
            {...props}
        >
            <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className={VIDEO_BTN}
            >
                {isMuted || volume === 0 ? (
                    <VolumeX
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                    />
                ) : (
                    <Volume2
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                    />
                )}
            </button>

            <div
                className={clsx(
                    "overflow-hidden transition-all duration-200",
                    showSlider ? "w-20 opacity-100" : "w-0 opacity-0"
                )}
            >
                <input
                    id={volumeId}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                        setVolume(parseFloat(e.target.value))
                    }
                    aria-label="Volume"
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>
        </div>
    );
});

VolumeControl.displayName = "VideoPlayer.VolumeControl";
