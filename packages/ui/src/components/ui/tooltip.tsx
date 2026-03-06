"use client";

import { clsx } from "clsx";
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
    | "error"
    | "info";

interface TooltipProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    /** Tooltip content — string or JSX. */
    content: React.ReactNode;
    /** Placement relative to the trigger. */
    position?: TooltipPosition;
    /** Show delay in ms. */
    delay?: number;
    children: React.ReactNode;
    /** Colour variant. */
    variant?: TooltipVariant;
    /** Disable the tooltip entirely. */
    disabled?: boolean;
    /** Show the directional arrow. */
    showArrow?: boolean;
}

// ============================================================================
// Config
// ============================================================================

const variantClasses: Record<TooltipVariant, string> = {
    default: "bg-ground-800 dark:bg-ground-900 text-white",
    primary: "bg-primary-600 text-white",
    secondary: "bg-ground-700 dark:bg-ground-800 text-white",
    success: "bg-success-600 text-white",
    warning: "bg-warning-600 text-white",
    error: "bg-error-600 text-white",
    info: "bg-info-600 text-white",
};

const arrowBgClasses: Record<TooltipVariant, string> = {
    default: "bg-ground-800 dark:bg-ground-900",
    primary: "bg-primary-600",
    secondary: "bg-ground-700 dark:bg-ground-800",
    success: "bg-success-600",
    warning: "bg-warning-600",
    error: "bg-error-600",
    info: "bg-info-600",
};

const arrowPositionClasses: Record<TooltipPosition, string> = {
    top: "-bottom-1 left-1/2 -translate-x-1/2",
    bottom: "-top-1 left-1/2 -translate-x-1/2",
    left: "-right-1 top-1/2 -translate-y-1/2",
    right: "-left-1 top-1/2 -translate-y-1/2",
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
            children,
            className,
            variant = "default",
            disabled = false,
            showArrow = true,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);
        const [mounted, setMounted] = useState(false);
        const [coords, setCoords] = useState({ top: 0, left: 0 });

        const triggerRef = useRef<HTMLDivElement>(null);
        const tooltipRef = useRef<HTMLDivElement>(null);
        const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
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
            const gap = 8;
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
        }, [position]);

        useLayoutEffect(() => {
            if (!isVisible) return;

            calculatePosition();

            window.addEventListener("scroll", calculatePosition, {
                passive: true,
                capture: true,
            });
            window.addEventListener("resize", calculatePosition, {
                passive: true,
            });

            return () => {
                window.removeEventListener("scroll", calculatePosition, true);
                window.removeEventListener("resize", calculatePosition);
            };
        }, [isVisible, calculatePosition]);

        // ------------------------------------------------------------------
        // Show / hide
        // ------------------------------------------------------------------
        const show = useCallback(() => {
            if (disabled) return;
            timeoutRef.current = setTimeout(
                () => setIsVisible(true),
                delay
            );
        }, [disabled, delay]);

        const hide = useCallback(() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsVisible(false);
        }, []);

        // Escape to dismiss
        useEffect(() => {
            if (!isVisible) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") hide();
            };

            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [isVisible, hide]);

        // Clean up timer on unmount
        useEffect(() => {
            return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }, []);

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
                    className={clsx(
                        "relative font-secondary text-sm px-3 py-2 rounded shadow-outer",
                        variantClasses[variant]
                    )}
                >
                    {content}
                    {showArrow && (
                        <div
                            className={clsx(
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
                    className={clsx("inline-block", className)}
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
                            className="fixed z-50 pointer-events-none animate-fade-in"
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