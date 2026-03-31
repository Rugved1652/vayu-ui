// overlay.tsx
// UI: SVG mask overlay + spotlight border

"use client";

import { clsx } from "clsx";
import React from "react";

interface TourOverlayProps {
    maskId: string;
    targetRect: DOMRect | null;
    placement: "top" | "bottom" | "left" | "right" | "center";
    spotlightPadding: number;
    maskClassName?: string;
    maskClickable: boolean;
    closeOnMaskClick: boolean;
    highlightedAreaClassName?: string;
    onClose: () => void;
}

const TourOverlay: React.FC<TourOverlayProps> = ({
    maskId,
    targetRect,
    placement,
    spotlightPadding,
    maskClassName,
    maskClickable,
    closeOnMaskClick,
    highlightedAreaClassName,
    onClose,
}) => {
    const pad = spotlightPadding;

    return (
        <div
            className={clsx("absolute inset-0", maskClassName)}
            style={{
                pointerEvents: maskClickable ? "none" : "auto",
            }}
            onClick={closeOnMaskClick ? onClose : undefined}
            aria-hidden="true"
        >
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
                aria-hidden="true"
            >
                <defs>
                    <mask id={maskId}>
                        <rect width="100%" height="100%" fill="white" />
                        {targetRect && placement !== "center" && (
                            <rect
                                x={targetRect.left - pad}
                                y={targetRect.top - pad}
                                width={targetRect.width + pad * 2}
                                height={targetRect.height + pad * 2}
                                rx="8"
                                fill="black"
                            />
                        )}
                    </mask>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill="rgba(0, 0, 0, 0.7)"
                    mask={`url(#${maskId})`}
                    className="animate-in fade-in duration-300"
                />
            </svg>

            {/* Spotlight border */}
            {targetRect && placement !== "center" && (
                <div
                    className={clsx(
                        "absolute border-2 border-brand rounded-surface pointer-events-none",
                        "animate-in fade-in zoom-in-95 duration-300",
                        highlightedAreaClassName
                    )}
                    style={{
                        top: targetRect.top - pad,
                        left: targetRect.left - pad,
                        width: targetRect.width + pad * 2,
                        height: targetRect.height + pad * 2,
                        boxShadow:
                            "0 0 0 4px rgb(from var(--brand) r g b / 0.2)",
                    }}
                />
            )}
        </div>
    );
};

export { TourOverlay };
