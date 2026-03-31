// use-position.ts
// Logic: popover position calculation + viewport clamping

"use client";

import { useEffect, useRef, useState } from "react";
import type { TourStep } from "./types";

interface UsePopoverPositionOptions {
    targetRect: DOMRect | null;
    step: TourStep | undefined;
}

const usePopoverPosition = ({
    targetRect,
    step,
}: UsePopoverPositionOptions) => {
    const [popoverPosition, setPopoverPosition] = useState({
        top: 0,
        left: 0,
    });
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!targetRect || !popoverRef.current || !step) return;

        const pr = popoverRef.current.getBoundingClientRect();
        const pad = 16;
        const arrow = 8;
        const vPad = 16;

        let top = 0;
        let left = 0;

        const placement = step.placement ?? "bottom";

        switch (placement) {
            case "top":
                top = targetRect.top - pr.height - pad - arrow;
                left =
                    targetRect.left +
                    targetRect.width / 2 -
                    pr.width / 2;
                break;
            case "bottom":
                top = targetRect.bottom + pad + arrow;
                left =
                    targetRect.left +
                    targetRect.width / 2 -
                    pr.width / 2;
                break;
            case "left":
                top =
                    targetRect.top +
                    targetRect.height / 2 -
                    pr.height / 2;
                left = targetRect.left - pr.width - pad - arrow;
                break;
            case "right":
                top =
                    targetRect.top +
                    targetRect.height / 2 -
                    pr.height / 2;
                left = targetRect.right + pad + arrow;
                break;
            case "center":
                top = window.innerHeight / 2 - pr.height / 2;
                left = window.innerWidth / 2 - pr.width / 2;
                break;
        }

        // Viewport clamping
        if (left < vPad) left = vPad;
        if (left + pr.width > window.innerWidth - vPad)
            left = window.innerWidth - pr.width - vPad;
        if (top < vPad) top = vPad;
        if (top + pr.height > window.innerHeight - vPad)
            top = window.innerHeight - pr.height - vPad;

        setPopoverPosition({ top, left });
    }, [targetRect, step]);

    return { popoverRef, popoverPosition };
};

export { usePopoverPosition };
