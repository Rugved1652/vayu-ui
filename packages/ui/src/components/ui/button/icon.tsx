// icon.tsx
// UI: presentational icon wrapper

"use client";

import { clsx } from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { IconProps, ButtonSize } from "./types";

const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({ children, size = "small", label, className, ...props }, ref) => {
        const iconSizeClasses: Record<ButtonSize, string> = {
            small: "w-4 h-4",
            medium: "w-5 h-5",
            large: "w-6 h-6",
        };

        return (
            <span
                ref={ref}
                aria-hidden={!label}
                aria-label={label}
                role={label ? "img" : undefined}
                className={clsx(
                    "inline-flex items-center justify-center shrink-0",
                    iconSizeClasses[size],
                    className
                )}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Icon.displayName = "Button.Icon";

export default Icon;
