// content.tsx
// UI: Portal-based dropdown with positioning

"use client";

import React, { useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { useSelect } from "./select";
import type { SelectContentProps } from "./types";

export const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
    const { open, triggerRef, contentRef } = useSelect();

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
            content.style.width = `${rect.width}px`;
        };

        updatePosition();

        const handleScroll = (event: Event) => {
            if (content.contains(event.target as Node)) return;
            requestAnimationFrame(updatePosition);
        };

        const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updatePosition));
        resizeObserver.observe(trigger);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", handleScroll, true);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [open, triggerRef, contentRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={contentRef}
            role="listbox"
            className={clsx(
                "fixed z-50 overflow-hidden rounded-overlay border border-border bg-elevated shadow-elevated animate-in fade-in-0 zoom-in-95",
                className
            )}
        >
            <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">{children}</div>
        </div>,
        document.body
    );
};

SelectContent.displayName = "Select.Content";
