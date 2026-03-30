// AlertContent.tsx
// UI: presentational

import React, { forwardRef } from "react";
import { cn } from "../utils";

export const AlertContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex-1 pr-10", className)}
            {...props}
        >
            {children}
        </div>
    );
});
AlertContent.displayName = "Alert.Content";
