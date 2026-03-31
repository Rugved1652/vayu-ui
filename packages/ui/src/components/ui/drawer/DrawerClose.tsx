// close.tsx
// UI: presentational

"use client";

import React, { forwardRef } from "react";
import { useDrawer } from "./Drawer";
import type { DrawerCloseProps } from "./types";

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
    ({ className, onClick, asChild = false, children, ...props }, ref) => {
        const { setOpen } = useDrawer();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            setOpen(false);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref,
                onClick: handleClick,
                ...props,
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);
DrawerClose.displayName = "Drawer.Close";

export { DrawerClose };
