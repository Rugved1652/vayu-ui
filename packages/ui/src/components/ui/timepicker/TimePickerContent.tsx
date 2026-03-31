// content.tsx
// UI: TimepickerContent — portal, positioning, scroll lock, focus trap

"use client";

import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { useTimepicker } from "./TimePicker";
import type { TimepickerContentProps } from "./types";

const TimepickerContent: React.FC<TimepickerContentProps> = ({
    children,
    className,
}) => {
    const { open, triggerRef, contentRef, id, mode, rangePhase, setRangePhase, setOpen } =
        useTimepicker();

    // Position the dropdown
    useLayoutEffect(() => {
        if (!open || !triggerRef.current || !contentRef.current) return;

        const trigger = triggerRef.current;
        const content = contentRef.current;

        const updatePosition = () => {
            if (!trigger || !content) return;
            const rect = trigger.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const contentHeight = content.offsetHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            let top = rect.bottom + 6;

            if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
                top = rect.top - contentHeight - 6;
            }

            content.style.top = `${top}px`;
            content.style.left = `${rect.left}px`;
            content.style.minWidth = `${Math.max(rect.width, 280)}px`;
        };

        updatePosition();

        const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updatePosition));
        resizeObserver.observe(trigger);
        window.addEventListener("resize", updatePosition);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, triggerRef, contentRef]);

    // Body scroll lock
    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    // Focus management
    useEffect(() => {
        if (!open || !contentRef.current) return;

        const focusableSelectors = [
            '[role="option"][aria-selected="true"]:not([data-disabled="true"])',
            '[role="option"]:not([data-disabled="true"])',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        const timer = setTimeout(() => {
            const firstFocusable = contentRef.current?.querySelector(focusableSelectors) as HTMLElement;
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 10);

        return () => clearTimeout(timer);
    }, [open, contentRef]);

    // Keyboard navigation within the dropdown
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            return;
        }

        if (e.key === "Tab") {
            const focusableSelectors = [
                '[role="option"]:not([data-disabled="true"])',
                'button:not([disabled])',
                '[tabindex]:not([tabindex="-1"])',
            ].join(', ');

            const focusables = contentRef.current?.querySelectorAll(focusableSelectors);
            if (!focusables || focusables.length === 0) return;

            const firstFocusable = focusables[0] as HTMLElement;
            const lastFocusable = focusables[focusables.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }, [setOpen, triggerRef, contentRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label="Time selection"
            onKeyDown={handleKeyDown}
            className={clsx(
                "fixed z-50 overflow-hidden rounded-overlay border border-border bg-elevated shadow-elevated animate-in fade-in-0 zoom-in-95",
                className
            )}
        >
            {mode === "range" && (
                <div className="flex border-b border-border">
                    <button
                        type="button"
                        onClick={() => setRangePhase("start")}
                        className={clsx(
                            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                            rangePhase === "start"
                                ? "text-brand border-b-2 border-brand"
                                : "text-muted-content hover:text-surface-content"
                        )}
                    >
                        Start Time
                    </button>
                    <button
                        type="button"
                        onClick={() => setRangePhase("end")}
                        className={clsx(
                            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                            rangePhase === "end"
                                ? "text-brand border-b-2 border-brand"
                                : "text-muted-content hover:text-surface-content"
                        )}
                    >
                        End Time
                    </button>
                </div>
            )}
            <div className="p-2">{children}</div>
        </div>,
        document.body
    );
};

TimepickerContent.displayName = "Timepicker.Content";

export { TimepickerContent };
