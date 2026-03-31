// popover.tsx
// Composition: UI + wiring

"use client";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import { cn } from "../utils";
import { PopoverContext } from "./hooks";
import type { PopoverProps } from "./types";

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            children,
            defaultOpen = false,
            open: controlledOpen,
            onOpenChange,
            modal = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const triggerRef = useRef<HTMLElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const isControlled = controlledOpen !== undefined;
        const open = isControlled ? controlledOpen : internalOpen;

        const setOpen = (newOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    contentRef.current &&
                    triggerRef.current &&
                    !contentRef.current.contains(event.target as Node) &&
                    !triggerRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };

            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setOpen(false);
                    triggerRef.current?.focus();
                }
            };

            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
                document.addEventListener("keydown", handleEscape);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscape);
            };
        }, [open]);

        return (
            <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef, modal }}>
                <div ref={ref} className={cn("relative inline-block", className)} {...props}>
                    {children}
                </div>
            </PopoverContext.Provider>
        );
    }
);

PopoverRoot.displayName = "Popover";

export default PopoverRoot;
