"use client";

import { cn } from "./utils";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types
// ============================================================================

type HoverCardSide = "top" | "right" | "bottom" | "left";
type HoverCardAlign = "start" | "center" | "end";

interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    children: React.ReactNode;
    /** Card content — can be any JSX. */
    content: React.ReactNode;
    /** Preferred side relative to the trigger. */
    side?: HoverCardSide;
    /** Alignment along the trigger edge. */
    align?: HoverCardAlign;
    /** Gap between trigger and card (px). */
    sideOffset?: number;
    /** Alignment shift (px). */
    alignOffset?: number;
    /** Delay before opening (ms). */
    openDelay?: number;
    /** Delay before closing (ms). */
    closeDelay?: number;
    /** Extra class on the card container. */
    contentClassName?: string;
    /** Disable the hover card entirely. */
    disabled?: boolean;
    /** Show the directional arrow. */
    showArrow?: boolean;
}

// ============================================================================
// Arrow border helpers — maps side → which borders to hide so the rotated
// square looks like a triangle pointing at the trigger.
// ============================================================================

const arrowBorderClasses: Record<HoverCardSide, string> = {
    bottom: "border-b-0 border-r-0",
    top: "border-t-0 border-l-0",
    left: "border-l-0 border-b-0",
    right: "border-r-0 border-t-0",
};

// ============================================================================
// HoverCard
// ============================================================================

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
    (
        {
            children,
            content,
            side = "bottom",
            align = "center",
            sideOffset = 8,
            alignOffset = 0,
            openDelay = 200,
            closeDelay = 300,
            className,
            contentClassName,
            disabled = false,
            showArrow = true,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [mounted, setMounted] = useState(false);
        const [position, setPosition] = useState({ top: 0, left: 0 });
        const [currentSide, setCurrentSide] = useState(side);
        const [arrowPosition, setArrowPosition] = useState({
            top: 0,
            left: 0,
        });
        const [positioned, setPositioned] = useState(false);

        const triggerRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const openTimeoutRef = useRef<
            ReturnType<typeof setTimeout> | undefined
        >(undefined);
        const closeTimeoutRef = useRef<
            ReturnType<typeof setTimeout> | undefined
        >(undefined);

        const cardId = useId();

        useEffect(() => {
            setMounted(true);
        }, []);

        // ------------------------------------------------------------------
        // Positioning
        // ------------------------------------------------------------------
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

            if (
                side === "bottom" &&
                space.bottom < cr.height + sideOffset &&
                space.top > space.bottom
            )
                finalSide = "top";
            else if (
                side === "top" &&
                space.top < cr.height + sideOffset &&
                space.bottom > space.top
            )
                finalSide = "bottom";
            else if (
                side === "right" &&
                space.right < cr.width + sideOffset &&
                space.left > space.right
            )
                finalSide = "left";
            else if (
                side === "left" &&
                space.left < cr.width + sideOffset &&
                space.right > space.left
            )
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
                        left =
                            tr.left +
                            tr.width / 2 -
                            cr.width / 2 +
                            alignOffset;
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
                        top =
                            tr.top +
                            tr.height / 2 -
                            cr.height / 2 +
                            alignOffset;
                        break;
                    case "end":
                        top = tr.bottom - cr.height - alignOffset;
                        break;
                }
                if (top < pad) top = pad;
                if (top + cr.height > vh - pad)
                    top = vh - cr.height - pad;
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
        }, [side, align, sideOffset, alignOffset, showArrow]);

        // Use double RAF to ensure card is rendered before calculating position
        useLayoutEffect(() => {
            if (!isOpen) return;

            const rafId = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    reposition();
                });
            });

            window.addEventListener("scroll", reposition, {
                passive: true,
                capture: true,
            });
            window.addEventListener("resize", reposition, {
                passive: true,
            });

            return () => {
                cancelAnimationFrame(rafId);
                window.removeEventListener("scroll", reposition, true);
                window.removeEventListener("resize", reposition);
            };
        }, [isOpen, reposition]);

        // ------------------------------------------------------------------
        // Open / close
        // ------------------------------------------------------------------
        const open = useCallback(() => {
            if (disabled) return;
            if (closeTimeoutRef.current)
                clearTimeout(closeTimeoutRef.current);
            openTimeoutRef.current = setTimeout(
                () => setIsOpen(true),
                openDelay
            );
        }, [disabled, openDelay]);

        const close = useCallback(() => {
            if (openTimeoutRef.current)
                clearTimeout(openTimeoutRef.current);
            closeTimeoutRef.current = setTimeout(
                () => setIsOpen(false),
                closeDelay
            );
        }, [closeDelay]);

        // Escape to dismiss
        useEffect(() => {
            if (!isOpen) return;
            const handleKey = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    if (closeTimeoutRef.current)
                        clearTimeout(closeTimeoutRef.current);
                    setIsOpen(false);
                }
            };
            document.addEventListener("keydown", handleKey);
            return () =>
                document.removeEventListener("keydown", handleKey);
        }, [isOpen]);

        // Clean up timers
        useEffect(() => {
            return () => {
                if (openTimeoutRef.current)
                    clearTimeout(openTimeoutRef.current);
                if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
            };
        }, []);

        // Reset positioned state when card closes
        useEffect(() => {
            if (!isOpen) {
                setPositioned(false);
            }
        }, [isOpen]);

        // Body scroll lock when card is open
        useEffect(() => {
            if (!isOpen) return;

            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }, [isOpen]);

        // ------------------------------------------------------------------
        // Ref merge
        // ------------------------------------------------------------------
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                (
                    triggerRef as React.MutableRefObject<HTMLDivElement | null>
                ).current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (
                        ref as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
                }
            },
            [ref]
        );

        return (
            <>
                {/* Trigger */}
                <div
                    ref={setRefs}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    onFocus={open}
                    onBlur={close}
                    className={cn("inline-block", className)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-describedby={isOpen ? cardId : undefined}
                    {...props}
                >
                    {children}
                </div>

                {/* Portal card */}
                {mounted &&
                    isOpen &&
                    createPortal(
                        <div
                            ref={contentRef}
                            id={cardId}
                            onMouseEnter={open}
                            onMouseLeave={close}
                            style={{
                                position: "fixed",
                                top: `${position.top}px`,
                                left: `${position.left}px`,
                                zIndex: 50,
                                opacity: positioned ? 1 : 0,
                            }}
                            className={cn(
                                "bg-elevated border border-border rounded-overlay shadow-elevated p-4",
                                positioned && "animate-in fade-in-0 zoom-in-95 duration-200",
                                contentClassName
                            )}
                        >
                            {/* Arrow */}
                            {showArrow && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: `${arrowPosition.top}px`,
                                        left: `${arrowPosition.left}px`,
                                    }}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <div
                                        className={cn(
                                            "w-4 h-4 rotate-45 bg-elevated border border-border",
                                            arrowBorderClasses[currentSide]
                                        )}
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative z-10 font-secondary text-elevated-content">
                                {content}
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        );
    }
);

HoverCard.displayName = "HoverCard";

// ============================================================================
// Exports
// ============================================================================

export { HoverCard };
export type {
    HoverCardAlign,
    HoverCardProps,
    HoverCardSide,
};
