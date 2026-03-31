// FooterUtilities.tsx
// UI: utility elements (Copyright, Divider)

import React from "react";
import { cn } from "../utils";
import type { FooterCopyrightProps, FooterDividerProps } from "./types";

// Copyright

function FooterCopyright({ children, className = "", ...props }: FooterCopyrightProps) {
    return (
        <div
            className={cn(
                "text-muted-content",
                "text-sm transition-colors duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
FooterCopyright.displayName = "Footer.Copyright";

// Divider

function FooterDivider({ className = "", ...props }: FooterDividerProps) {
    return (
        <hr
            className={cn(
                "border-border",
                "my-8 transition-colors duration-300",
                className
            )}
            role="separator"
            aria-orientation="horizontal"
            {...props}
        />
    );
}
FooterDivider.displayName = "Footer.Divider";

export { FooterCopyright, FooterDivider };
