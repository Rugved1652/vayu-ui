"use client"

import { AspectRatio } from "vayu-ui";

export default function AspectRatioDemo() {
    return (
        <div className="w-full max-w-lg not-prose flex flex-col gap-6">
            <h2 id="aspectratio-demo-label" className="sr-only">
                AspectRatio Examples
            </h2>

            {/* Default - Square */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    square (1:1)
                </p>
                <AspectRatio
                    ratio="square"
                    decorative
                    className="rounded bg-ground-100 dark:bg-ground-800"
                >
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-600 dark:text-ground-400">
                        1 : 1
                    </div>
                </AspectRatio>
            </div>

            {/* Video */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    video (16:9)
                </p>
                <AspectRatio
                    ratio="video"
                    decorative
                    className="rounded bg-ground-100 dark:bg-ground-800"
                >
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-600 dark:text-ground-400">
                        16 : 9
                    </div>
                </AspectRatio>
            </div>

            {/* Custom numeric ratio */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    custom (2.5)
                </p>
                <AspectRatio
                    ratio={2.5}
                    decorative
                    className="rounded bg-ground-100 dark:bg-ground-800"
                >
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-600 dark:text-ground-400">
                        2.5 : 1
                    </div>
                </AspectRatio>
            </div>

            {/* Presets row */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    Presets
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {(["portrait", "golden", "cinema"] as const).map((preset) => (
                        <AspectRatio
                            key={preset}
                            ratio={preset}
                            decorative
                            className="rounded bg-primary-100 dark:bg-primary-900/30"
                        >
                            <div className="flex items-center justify-center h-full text-xs font-secondary font-semibold text-primary-700 dark:text-primary-400">
                                {preset}
                            </div>
                        </AspectRatio>
                    ))}
                </div>
            </div>

            {/* With image */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    with image (object-fit: cover)
                </p>
                <AspectRatio
                    ratio="video"
                    aria-label="Example landscape image"
                    className="rounded bg-ground-200 dark:bg-ground-700 overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                        alt="Mountain landscape at sunset"
                        className="w-full h-full"
                    />
                </AspectRatio>
            </div>
        </div>
    );
}