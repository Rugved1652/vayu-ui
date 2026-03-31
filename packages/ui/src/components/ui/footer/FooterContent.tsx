// FooterContent.tsx
// UI: content elements (Section, Link, Logo)

import React from "react";
import { cn } from "../utils";
import type { FooterSectionProps, FooterLinkProps, FooterLogoProps } from "./types";

// Section

function FooterSection({ children, title, className = "", ...props }: FooterSectionProps) {
    return (
        <section
            className={cn("flex flex-col gap-4", className)}
            {...props}
        >
            {title && (
                <h3 className="font-primary font-semibold text-lg text-surface-content uppercase tracking-wide transition-colors duration-300">
                    {title}
                </h3>
            )}
            <nav
                className="flex flex-col gap-2"
                aria-label={title ? `${title} links` : "Footer navigation"}
            >
                {children}
            </nav>
        </section>
    );
}
FooterSection.displayName = "Footer.Section";

// Link

function FooterLink({ children, external = false, className = "", href, ...props }: FooterLinkProps) {
    const isStringChild = typeof children === "string";

    const computedAriaLabel =
        external && !props['aria-label'] && isStringChild
            ? `${children} (opens in new tab)`
            : props['aria-label'];

    return (
        <a
            href={href}
            className={cn(
                "text-muted-content hover:text-brand",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                "rounded-sm",
                "inline-flex items-center gap-1.5",
                "underline-offset-4 hover:underline",
                className
            )}
            {...(external && {
                target: "_blank",
                rel: "noopener noreferrer",
            })}
            aria-label={computedAriaLabel}
            {...props}
        >
            {children}
            {external && (
                <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
            )}
        </a>
    );
}
FooterLink.displayName = "Footer.Link";

// Logo

function FooterLogo({ children, href = "/", className = "", ...props }: FooterLogoProps) {
    return (
        <div
            className={cn("flex items-center gap-3", className)}
            {...props}
        >
            {href ? (
                <a
                    href={href}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-sm"
                >
                    {children}
                </a>
            ) : (
                children
            )}
        </div>
    );
}
FooterLogo.displayName = "Footer.Logo";

export { FooterSection, FooterLink, FooterLogo };
