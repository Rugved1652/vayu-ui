"use client";

import { useMeasure } from "vayu-ui";

export function UseMeasureDemo() {
    const { ref, width, height } = useMeasure();

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Resize the box below:</p>
                <div
                    // @ts-ignore
                    ref={ref}
                    className="relative resize overflow-auto border-2 border-dashed border-primary/50 rounded-md bg-primary/5 min-w-[200px] min-h-[100px] max-w-full p-4 flex items-center justify-center transition-colors hover:border-primary hover:bg-primary/10"
                >
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">I am resizable!</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono bg-background/80 backdrop-blur p-2 rounded shadow-sm border">
                            <span className="text-muted-foreground">Width:</span>
                            <span className="font-bold text-foreground">{Math.round(width)}px</span>
                            <span className="text-muted-foreground">Height:</span>
                            <span className="font-bold text-foreground">{Math.round(height)}px</span>
                        </div>
                    </div>

                    <div className="absolute bottom-1 right-1 pointer-events-none text-muted-foreground/30">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M12 12H0L12 0V12Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
                Note: The <code>resize</code> CSS property works best on desktops.
            </p>
        </div>
    );
}
