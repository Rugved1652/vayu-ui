"use client";

import { useIntervalWhen } from "vayu-ui";
import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function UseIntervalWhenDemo() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalMs, setIntervalMs] = useState(100);

    useIntervalWhen(
        () => {
            setCount((c) => c + 1);
        },
        intervalMs,
        isRunning
    );

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-6 items-center text-center">
                <div className="text-6xl font-mono font-bold tabular-nums">
                    {count}
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${isRunning ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                    >
                        {isRunning ? (
                            <>
                                <Pause className="mr-2 h-4 w-4" /> Pause
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" /> Start
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setCount(0)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                        Reset
                    </button>
                </div>

                <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Interval Speed</span>
                        <span className="font-mono">{intervalMs}ms</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={intervalMs}
                        onChange={(e) => setIntervalMs(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
