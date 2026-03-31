// header.tsx
// UI: Card header with title, subtitle, avatar, and action

import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";
import { CardHeaderProps } from "./types";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ title, subtitle, action, avatar, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("flex items-start gap-3", className)}
                {...props}
            >
                {/* Avatar */}
                {avatar && (
                    <div className="shrink-0" aria-hidden="true">
                        {avatar}
                    </div>
                )}

                {/* Title and Subtitle */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <h3 className="text-lg font-primary font-semibold text-surface-content leading-tight truncate">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="mt-0.5 text-sm font-secondary text-muted-content leading-snug">
                            {subtitle}
                        </p>
                    )}
                    {children}
                </div>

                {/* Action */}
                {action && <div className="shrink-0 ml-auto">{action}</div>}
            </div>
        );
    }
);

CardHeader.displayName = "Card.Header";
