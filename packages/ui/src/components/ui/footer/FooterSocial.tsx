// FooterSocial.tsx
// UI: social elements (Social, SocialLink)

import React from "react";
import { cn } from "../utils";
import type { FooterSocialProps, FooterLinkProps } from "./types";

// Social container — uses role="list" to avoid nested nav landmarks inside FooterSection

function FooterSocial({ children, className = "", ...props }: FooterSocialProps) {
    return (
        <div
            className={cn("flex gap-4 items-center", className)}
            role="list"
            aria-label="Social media links"
            {...props}
        >
            {children}
        </div>
    );
}
FooterSocial.displayName = "Footer.Social";

// SocialLink

function FooterSocialLink(
    { children, href, className = "", "aria-label": ariaLabel, ...props }: FooterLinkProps
) {
    return (
        <a
            href={href}
            className={cn(
                "text-muted-content hover:text-brand",
                "hover:bg-muted/50",
                "transition-all duration-200",
                "p-2.5 rounded-full min-w-11 min-h-11",
                "flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                className
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </a>
    );
}
FooterSocialLink.displayName = "Footer.SocialLink";

export { FooterSocial, FooterSocialLink };
