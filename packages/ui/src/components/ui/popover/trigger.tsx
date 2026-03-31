// trigger.tsx
// UI: trigger with asChild support

"use client";
import React, { forwardRef } from "react";
import Button from "../button";
import { cn, useMergeRefs } from "../utils";
import { usePopover } from "./hooks";
import type { PopoverTriggerProps } from "./types";

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
    (
        {
            children,
            asChild = false,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const { open, setOpen, triggerRef } = usePopover();

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

        const mergedRefs = useMergeRefs(triggerRef, ref);

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref: mergedRefs,
                onClick: (e: React.MouseEvent) => {
                    (children as React.ReactElement<any>).props.onClick?.(e);
                    handleClick();
                },
                onKeyDown: handleKeyDown,
                "aria-expanded": open,
                "aria-haspopup": "dialog",
                disabled,
            });
        }

        return (
            <Button
                ref={mergedRefs as any}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                type="button"
                aria-expanded={open}
                aria-haspopup="dialog"
                disabled={disabled}
                variant="ghost"
                className={cn(
                    "font-secondary",
                    "text-muted-content hover:text-canvas-content",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

PopoverTrigger.displayName = "Popover.Trigger";

export default PopoverTrigger;
