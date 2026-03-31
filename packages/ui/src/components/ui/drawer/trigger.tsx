// trigger.tsx
// UI: presentational

"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";
import { useDrawer } from "./drawer";
import type { DrawerTriggerProps } from "./types";

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
    ({ children, asChild = false, className, onClick, ...props }, ref) => {
        const { setOpen, open } = useDrawer();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            if (!e.defaultPrevented) {
                setOpen(true);
            }
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref,
                onClick: handleClick,
                "aria-expanded": open,
                "aria-haspopup": "dialog",
                ...props,
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={cn(
                    "inline-flex items-center justify-center rounded-control px-4 py-2 text-sm font-medium transition-colors",
                    "bg-surface text-surface-content hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    className
                )}
                aria-expanded={open}
                aria-haspopup="dialog"
                {...props}
            >
                {children}
            </button>
        );
    }
);
DrawerTrigger.displayName = "Drawer.Trigger";

export { DrawerTrigger };
