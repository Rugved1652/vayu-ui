// arrow.tsx
// UI: presentational

import React from "react";
import { cn } from "../utils";
import { arrowBorderClasses } from "./types";
import type { HoverCardSide } from "./types";

interface HoverCardArrowProps {
    side: HoverCardSide;
    position: { top: number; left: number };
}

export function HoverCardArrow({ side, position }: HoverCardArrowProps) {
    return (
        <div
            style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            className="w-4 h-4"
            aria-hidden="true"
        >
            <div
                className={cn(
                    "w-4 h-4 rotate-45 bg-elevated border border-border",
                    arrowBorderClasses[side]
                )}
            />
        </div>
    );
}
