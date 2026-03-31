// hooks.ts
// Logic

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HoverCardSide, HoverCardAlign } from "./types";

interface Position {
    top: number;
    left: number;
}

interface HoverCardPositionOptions {
    side: HoverCardSide;
    align: HoverCardAlign;
    sideOffset: number;
    alignOffset: number;
    showArrow: boolean;
    triggerRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    isOpen: boolean;
}

interface HoverCardPositionReturn {
    position: Position;
    currentSide: HoverCardSide;
    arrowPosition: Position;
    positioned: boolean;
}

export function useHoverCardPosition({
    side,
    align,
    sideOffset,
    alignOffset,
    showArrow,
    triggerRef,
    contentRef,
    isOpen,
}: HoverCardPositionOptions): HoverCardPositionReturn {
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
    const [currentSide, setCurrentSide] = useState(side);
    const [arrowPosition, setArrowPosition] = useState<Position>({ top: 0, left: 0 });
    const [positioned, setPositioned] = useState(false);

    const reposition = useCallback(() => {
        if (!triggerRef.current || !contentRef.current) return;

        const tr = triggerRef.current.getBoundingClientRect();
        const cr = contentRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = 8;

        // Flip side if not enough space
        let finalSide = side;
        const space = {
            top: tr.top,
            bottom: vh - tr.bottom,
            left: tr.left,
            right: vw - tr.right,
        };

        if (side === "bottom" && space.bottom < cr.height + sideOffset && space.top > space.bottom)
            finalSide = "top";
        else if (side === "top" && space.top < cr.height + sideOffset && space.bottom > space.top)
            finalSide = "bottom";
        else if (side === "right" && space.right < cr.width + sideOffset && space.left > space.right)
            finalSide = "left";
        else if (side === "left" && space.left < cr.width + sideOffset && space.right > space.left)
            finalSide = "right";

        setCurrentSide(finalSide);

        let top = 0;
        let left = 0;

        // Side offset
        switch (finalSide) {
            case "top":
                top = tr.top - cr.height - sideOffset;
                break;
            case "bottom":
                top = tr.bottom + sideOffset;
                break;
            case "left":
                left = tr.left - cr.width - sideOffset;
                top = tr.top;
                break;
            case "right":
                left = tr.right + sideOffset;
                top = tr.top;
                break;
        }

        // Alignment for top/bottom
        if (finalSide === "top" || finalSide === "bottom") {
            switch (align) {
                case "start":
                    left = tr.left + alignOffset;
                    break;
                case "center":
                    left = tr.left + tr.width / 2 - cr.width / 2 + alignOffset;
                    break;
                case "end":
                    left = tr.right - cr.width - alignOffset;
                    break;
            }
            if (left < pad) left = pad;
            if (left + cr.width > vw - pad) left = vw - cr.width - pad;
        }

        // Alignment for left/right
        if (finalSide === "left" || finalSide === "right") {
            switch (align) {
                case "start":
                    top = tr.top + alignOffset;
                    break;
                case "center":
                    top = tr.top + tr.height / 2 - cr.height / 2 + alignOffset;
                    break;
                case "end":
                    top = tr.bottom - cr.height - alignOffset;
                    break;
            }
            if (top < pad) top = pad;
            if (top + cr.height > vh - pad) top = vh - cr.height - pad;
        }

        setPosition({ top, left });
        setPositioned(true);

        // Arrow
        if (showArrow) {
            const as = 8;
            let aTop = 0;
            let aLeft = 0;

            if (finalSide === "top" || finalSide === "bottom") {
                aLeft = tr.left + tr.width / 2 - left - as;
                aTop = finalSide === "bottom" ? -as : cr.height - as;
            } else {
                aTop = tr.top + tr.height / 2 - top - as;
                aLeft = finalSide === "right" ? -as : cr.width - as;
            }
            setArrowPosition({ top: aTop, left: aLeft });
        }
    }, [side, align, sideOffset, alignOffset, showArrow, triggerRef, contentRef]);

    // Double RAF to ensure card is rendered before calculating position
    useLayoutEffect(() => {
        if (!isOpen) return;

        const rafId = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                reposition();
            });
        });

        window.addEventListener("scroll", reposition, { passive: true, capture: true });
        window.addEventListener("resize", reposition, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [isOpen, reposition]);

    // Reset positioned state when card closes
    useEffect(() => {
        if (!isOpen) setPositioned(false);
    }, [isOpen]);

    return { position, currentSide, arrowPosition, positioned };
}

// ------------------------------------------------------------------
// Open / close
// ------------------------------------------------------------------

interface HoverCardOpenOptions {
    disabled: boolean;
    openDelay: number;
    closeDelay: number;
}

interface HoverCardOpenReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export function useHoverCardOpen({
    disabled,
    openDelay,
    closeDelay,
}: HoverCardOpenOptions): HoverCardOpenReturn {
    const [isOpen, setIsOpen] = useState(false);
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const open = useCallback(() => {
        if (disabled) return;
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        openTimeoutRef.current = setTimeout(() => setIsOpen(true), openDelay);
    }, [disabled, openDelay]);

    const close = useCallback(() => {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => setIsOpen(false), closeDelay);
    }, [closeDelay]);

    // Escape to dismiss
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // Clean up timers
    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    // Body scroll lock when card is open
    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    return { isOpen, open, close };
}
