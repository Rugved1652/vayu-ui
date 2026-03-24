"use client";

import { cn } from "./utils";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types
// ============================================================================

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipVariant =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "info";

interface TooltipProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    /** Tooltip content — string or JSX. */
    content: React.ReactNode;
    /** Placement relative to the trigger. */
    position?: TooltipPosition;
    /** Show delay in ms. */
    delay?: number;
    /** Hide delay in ms (time before tooltip disappears after mouse leaves). */
    hideDelay?: number;
    children: React.ReactNode;
    /** Colour variant. */
    variant?: TooltipVariant;
    /** Disable the tooltip entirely. */
    disabled?: boolean;
    /** Show the directional arrow. */
    showArrow?: boolean;
    /** Minimum size for touch targets (WCAG 2.5.8). Default: true */
    ensureTouchTarget?: boolean;
}

// ============================================================================
// Config
// ============================================================================

// Semantic design tokens with WCAG AA contrast compliance
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

// Arrow size: 8px (w-2 h-2), rotated 45deg = diagonal ~11.3px
// Offset by half the diagonal to properly connect to tooltip body
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

        // Mount flag
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
            // Gap accounts for arrow size (8px arrow, ~6px visible after offset)
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

            // Viewport clamping
            if (left < pad) left = pad;
            if (left + tt.width > window.innerWidth - pad)
                left = window.innerWidth - tt.width - pad;
            if (top < pad) top = pad;
            if (top + tt.height > window.innerHeight - pad)
                top = window.innerHeight - tt.height - pad;

            setCoords({ top, left });
        }, [position, showArrow]);

        // Use double RAF to ensure tooltip is rendered before calculating position
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
        // Show / hide with hover support (WCAG 2.5.7)
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

        // Cancel hide when hovering over tooltip (WCAG 2.5.7)
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

        // Clean up timers on unmount
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
                        // WCAG 2.5.8: Ensure minimum touch target size of 24x24
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
                                // WCAG 2.5.7: Allow pointer events for hoverable tooltips
                                "pointer-events-auto",
                                // Respect prefers-reduced-motion (WCAG 2.3.3)
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

// ============================================================================
// Exports
// ============================================================================

export { Tooltip };
export type { TooltipPosition, TooltipProps, TooltipVariant };
