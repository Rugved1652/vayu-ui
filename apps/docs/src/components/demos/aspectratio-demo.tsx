import { AspectRatio } from "vayu-ui";

export default function AspectRatioDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
            {/* Square */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    square (1:1)
                </p>
                <AspectRatio ratio="square" className="rounded-xl bg-ground-100 dark:bg-ground-800">
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-500">
                        1 : 1
                    </div>
                </AspectRatio>
            </div>

            {/* Video */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    video (16:9)
                </p>
                <AspectRatio ratio="video" className="rounded-xl bg-ground-100 dark:bg-ground-800">
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-500">
                        16 : 9
                    </div>
                </AspectRatio>
            </div>

            {/* Custom */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-2">
                    custom (2.5)
                </p>
                <AspectRatio ratio={2.5} className="rounded-xl bg-ground-100 dark:bg-ground-800">
                    <div className="flex items-center justify-center h-full text-sm font-secondary text-ground-500">
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
                    {(["portrait", "golden", "cinema"] as const).map(
                        (preset) => (
                            <AspectRatio
                                key={preset}
                                ratio={preset}
                                className="rounded-lg bg-primary-50 dark:bg-primary-900/20"
                            >
                                <div className="flex items-center justify-center h-full text-[10px] font-secondary font-semibold text-primary-600 dark:text-primary-400">
                                    {preset}
                                </div>
                            </AspectRatio>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
