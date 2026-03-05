"use client";

import { useScrollPosition } from "vayu-ui";

export function UseScrollPositionDemo() {
    const { y, directionY, isAtTop, isAtBottom, progress } = useScrollPosition();

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold">Scroll Position</h3>

                {/* Progress bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                        <span className="text-muted-foreground">Scroll Y</span>
                        <span className="font-medium font-mono tabular-nums">{Math.round(y)}px</span>
                    </div>
                    <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium font-mono tabular-nums">{Math.round(progress)}%</span>
                    </div>
                    <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                        <span className="text-muted-foreground">Direction</span>
                        <span className="font-medium">
                            {directionY === "down" ? "⬇️ Down" : directionY === "up" ? "⬆️ Up" : "— Idle"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 p-2 rounded-md bg-muted/50">
                        <span className="text-muted-foreground">Position</span>
                        <span className="font-medium">
                            {isAtTop ? "🔝 Top" : isAtBottom ? "🔚 Bottom" : "📜 Middle"}
                        </span>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">
                    Scroll this page to see values update in real-time.
                </p>
            </div>
        </div>
    );
}
