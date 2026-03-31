// drag-handle.tsx
// UI: presentational

"use client";

import { clsx } from "clsx";
import { GripVertical } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";
import type { DragHandleProps } from "./types";

const DragHandle = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement> & {
        handleProps: DragHandleProps;
    }
>(({ handleProps, className, children, ...props }, ref) => {
    const { onMouseDown, onTouchStart, onKeyDown, ...ariaProps } =
        handleProps;

    return (
        <button
            ref={ref}
            type="button"
            {...ariaProps}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onKeyDown={onKeyDown}
            className={clsx(
                "inline-flex items-center justify-center p-1 rounded-md cursor-grab active:cursor-grabbing",
                "text-ground-400 dark:text-ground-500 hover:text-ground-600 dark:hover:text-ground-400",
                "hover:bg-ground-100 dark:hover:bg-ground-800",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                "transition-colors",
                className
            )}
            {...props}
        >
            {children ?? (
                <GripVertical
                    className="w-4 h-4"
                    aria-hidden="true"
                />
            )}
        </button>
    );
});

DragHandle.displayName = "DragHandle";

export { DragHandle };
