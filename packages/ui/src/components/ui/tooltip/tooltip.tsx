"use client";

// tooltip.tsx
// Composition: UI + logic

import { cn } from "../utils";
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import type { TooltipPosition, TooltipProps, TooltipVariant } from "./types";

// ============================================================================
// Config
// ============================================================================

const variantClasses: Record<TooltipVariant, string> = {
    default: "bg-elevated text-elevated-content",
    primary: "bg-brand text-brand-content",
    secondary: "bg-muted text-muted-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content",
    destructive: "bg-destructive text-destructive-content",
    info: "bg-info text-info-content",
};

const arrowBgClasses: Record<TooltipVariant, string> = {
    default: "bg-elevated",
    primary: "bg-brand",
    secondary: "bg-muted",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    info: "bg-info",
};

const arrowPositionClasses: Record<TooltipPosition, string> = {
    top: "-bottom-[5px] left-1/2 -translate-x-1/2",
    bottom: "-top-[5px] left-1/2 -translate-x-1/2",
    left: "-right-[5px] top-1/2 -translate-y-1/2",
    right: "-left-[5px] top-1/2 -translate-y-1/2",
};

// ============================================================================
// Tooltip
// ============================================================================

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            content,
            position = "top",
            delay = 200,
            hideDelay = 150,
            children,
            className,
            variant = "default",
            disabled = false,
            showArrow = true,
            ensureTouchTarget = true,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);
        const [mounted, setMounted] = useState(false);
        const [coords, setCoords] = useState({ top: 0, left: 0 });

        const triggerRef = useRef<HTMLDivElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
            undefined
        );
        const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
            undefined
        );

        const tooltipId = useId();

        useEffect(() => {
            setMounted(true);
        }, []);

        // ------------------------------------------------------------------
        // Positioning
        // ------------------------------------------------------------------
        const calculatePosition = useCallback(() => {
            if (!triggerRef.current || !tooltipRef.current) return;

            const tr = triggerRef.current.getBoundingClientRect();
            const tt = tooltipRef.current.getBoundingClientRect();
            const gap = showArrow ? 6 : 8;
            const pad = 8;

            let top = 0;
            let left = 0;

            switch (position) {
                case "top":
                    top = tr.top - tt.height - gap;
                    left = tr.left + (tr.width - tt.width) / 2;
                    break;
                case "bottom":
                    top = tr.bottom + gap;
                    left = tr.left + (tr.width - tt.width) / 2;
                    break;
                case "left":
                    top = tr.top + (tr.height - tt.height) / 2;
                    left = tr.left - tt.width - gap;
                    break;
                case "right":
                    top = tr.top + (tr.height - tt.height) / 2;
                    left = tr.right + gap;
                    break;
            }

            if (left < pad) left = pad;
            if (left + tt.width > window.innerWidth - pad)
                left = window.innerWidth - tt.width - pad;
            if (top < pad) top = pad;
            if (top + tt.height > window.innerHeight - pad)
                top = window.innerHeight - tt.height - pad;

            setCoords({ top, left });
        }, [position, showArrow]);

        useLayoutEffect(() => {
            if (!isVisible) return;

            const rafId = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    calculatePosition();
                });
            });

            window.addEventListener("scroll", calculatePosition, {
                passive: true,
                capture: true,
            });
            window.addEventListener("resize", calculatePosition, {
                passive: true,
            });

            return () => {
                cancelAnimationFrame(rafId);
                window.removeEventListener("scroll", calculatePosition, true);
                window.removeEventListener("resize", calculatePosition);
            };
        }, [isVisible, calculatePosition]);

        // ------------------------------------------------------------------
        // Show / hide
        // ------------------------------------------------------------------
        const clearAllTimeouts = useCallback(() => {
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
                showTimeoutRef.current = undefined;
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = undefined;
            }
        }, []);

        const show = useCallback(() => {
            clearAllTimeouts();
            if (disabled) return;
            showTimeoutRef.current = setTimeout(() => setIsVisible(true), delay);
        }, [disabled, delay, clearAllTimeouts]);

        const hide = useCallback(() => {
            clearAllTimeouts();
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, hideDelay);
        }, [hideDelay, clearAllTimeouts]);

        const handleTooltipMouseEnter = useCallback(() => {
            clearAllTimeouts();
        }, [clearAllTimeouts]);

        const handleTooltipMouseLeave = useCallback(() => {
            hide();
        }, [hide]);

        // Escape to dismiss
        useEffect(() => {
            if (!isVisible) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    clearAllTimeouts();
                    setIsVisible(false);
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [isVisible, clearAllTimeouts]);

        useEffect(() => {
            return () => {
                clearAllTimeouts();
            };
        }, [clearAllTimeouts]);

        // ------------------------------------------------------------------
        // Ref merge
        // ------------------------------------------------------------------
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
                    node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                        node;
                }
            },
            [ref]
        );

        // ------------------------------------------------------------------
        // Memoised tooltip body
        // ------------------------------------------------------------------
        const tooltipBody = useMemo(
            () => (
                <div
                    className={cn(
                        "relative font-secondary text-sm px-3 py-2 rounded-surface shadow-elevated",
                        variantClasses[variant]
                    )}
                >
                    {content}
                    {showArrow && (
                        <div
                            className={cn(
                                "absolute w-2 h-2 rotate-45",
                                arrowBgClasses[variant],
                                arrowPositionClasses[position]
                            )}
                            aria-hidden="true"
                        />
                    )}
                </div>
            ),
            [content, variant, showArrow, position]
        );

        return (
            <>
                <div
                    ref={setRefs}
                    onMouseEnter={show}
                    onMouseLeave={hide}
                    onFocus={show}
                    onBlur={hide}
                    className={cn(
                        "inline-block",
                        ensureTouchTarget && "min-h-6 min-w-6",
                        className
                    )}
                    aria-describedby={
                        isVisible ? tooltipId : undefined
                    }
                    {...props}
                >
                    {children}
                </div>

                {mounted &&
                    isVisible &&
                    createPortal(
                        <div
                            ref={tooltipRef}
                            id={tooltipId}
                            role="tooltip"
                            onMouseEnter={handleTooltipMouseEnter}
                            onMouseLeave={handleTooltipMouseLeave}
                            className={cn(
                                "fixed z-50",
                                "pointer-events-auto",
                                "motion-reduce:animate-none animate-fade-in"
                            )}
                            style={{
                                top: `${coords.top}px`,
                                left: `${coords.left}px`,
                            }}
                        >
                            {tooltipBody}
                        </div>,
                        document.body
                    )}
            </>
        );
    }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
