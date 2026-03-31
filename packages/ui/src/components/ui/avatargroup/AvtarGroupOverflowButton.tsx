// overflow-button.tsx
// UI: Overflow indicator button

"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import type { AvatarGroupSize, UserData } from "./types";

interface OverflowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    count: number;
    size: AvatarGroupSize;
    spacingValue: number;
    layout: "stack" | "grid";
    renderOverflow?: (count: number) => React.ReactNode;
    onOverflowClick?: () => void;
}

export const OverflowButton = forwardRef<HTMLButtonElement, OverflowButtonProps>(
    (
        {
            count,
            size,
            spacingValue,
            layout,
            renderOverflow,
            onOverflowClick,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type="button"
                className={clsx(
                    "relative flex items-center justify-center rounded-full",
                    "bg-muted text-muted-content",
                    "font-medium",
                    "ring-2 ring-canvas",
                    onOverflowClick && "cursor-pointer hover:bg-muted/80",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-canvas",
                    onOverflowClick && "motion-safe:transition-all motion-safe:duration-200",
                    // Sizes match Avatar exactly
                    size === "small" && "w-8 h-8 text-xs",
                    size === "medium" && "w-12 h-12 text-sm",
                    size === "large" && "w-16 h-16 text-lg",
                    size === "xlarge" && "w-24 h-24 text-2xl",
                    className
                )}
                style={{
                    marginLeft: layout === "stack" ? spacingValue : 0,
                }}
                onClick={onOverflowClick}
                aria-label={`Show ${count} more users`}
                role="button"
                {...props}
            >
                {renderOverflow ? renderOverflow(count) : `+${count}`}
            </button>
        );
    }
);

OverflowButton.displayName = "OverflowButton";
