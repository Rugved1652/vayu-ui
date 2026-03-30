// AlertTitle.tsx
// UI: presentational

import React, { forwardRef } from "react";
import { cn } from "../utils";

export const AlertTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <h5
            ref={ref}
            className={cn(
                "font-primary font-semibold mb-1 text-h5 leading-none tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h5>
    );
});
AlertTitle.displayName = "Alert.Title";
