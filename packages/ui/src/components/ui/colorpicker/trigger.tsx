// trigger.tsx
// UI: color swatch button

"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";
import { useColorPicker } from "./hooks";
import type { ColorPickerTriggerProps } from "./types";

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
    ({ size = "md", className, ...props }, ref) => {
        const {
            color,
            open,
            disabled,
            setOpen,
            triggerRef,
            dropdownId,
            labelId,
        } = useColorPicker();

        const sizeClasses = {
            sm: "w-8 h-8",
            md: "w-12 h-12",
            lg: "w-16 h-16",
        };

        const handleClick = () => {
            if (!disabled) {
                setOpen(!open);
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        };

        // Merge refs
        const mergedRef = (node: HTMLButtonElement | null) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (triggerRef as any).current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref as any).current = node;
            }
        };

        return (
            <button
                ref={mergedRef}
                type="button"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-expanded={open}
                aria-controls={dropdownId}
                aria-labelledby={labelId}
                aria-haspopup="dialog"
                className={cn(
                    sizeClasses[size],
                    "rounded-control border-2 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    "shadow-control hover:shadow-elevated",
                    disabled
                        ? "opacity-50 cursor-not-allowed border-border"
                        : "border-field hover:border-focus cursor-pointer",
                    className
                )}
                style={{ backgroundColor: color }}
                {...props}
            >
                <span className="sr-only">
                    Select color. Current color: {color}
                </span>
            </button>
        );
    }
);

ColorPickerTrigger.displayName = "ColorPicker.Trigger";
