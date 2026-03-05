"use client";

import { useHover } from "vayu-ui";
import { MousePointer2 } from "lucide-react";

export function UseHoverDemo() {
    const { ref, isHovered } = useHover<HTMLDivElement>();

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col items-center gap-6">
            <div
                ref={ref}
                className={`
            w-full h-40 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 transform
            ${isHovered
                        ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"}
        `}
            >
                <MousePointer2 className={`w-10 h-10 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`} />
                <span className="font-bold text-lg">
                    {isHovered ? "I am Hovered!" : "Hover Me!"}
                </span>
            </div>

            <div className="w-full text-center text-xs text-muted-foreground">
                State: <span className="font-mono font-bold text-primary">{isHovered.toString()}</span>
            </div>
        </div>
    );
}
