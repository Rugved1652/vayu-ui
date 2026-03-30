// AlertIcon.tsx
// UI: presentational

import React, { forwardRef } from "react";
import { cn } from "../utils";
import type { AlertIconProps } from "./types";

const variantIconStyles: Record<import("./types").AlertVariant, string> = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
};

export const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(({
    variant = "info",
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "shrink-0",
                variantIconStyles[variant],
                className
            )}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    );
});
AlertIcon.displayName = "Alert.Icon";
