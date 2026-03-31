// link.tsx
// UI: Link component with Next.js routing

import React from "react";
import NextLink from "next/link";
import { cn } from "../utils";
import { getVariantClasses } from "./utils";
import type { LinkProps } from "./types";

export const Link = ({
    children,
    className = "",
    variant = "primary",
    ellipsis,
    font,
    id,
    ariaLabel,
    ariaDescribedby,
    ariaHidden,
    lang,
    role,
    ...props
}: LinkProps) => {
    const { href, target, ...restProps } = props;
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
    const hasTargetBlank = target === '_blank';

    // WCAG 2.4.4 & 2.5.3: Inform screen readers about external links and new window behavior
    const externalLinkText = isExternal && hasTargetBlank ? " (opens in a new tab)" : isExternal ? " (external link)" : "";
    const computedAriaLabel = ariaLabel
        ? `${ariaLabel}${externalLinkText}`
        : isExternal || hasTargetBlank
            ? `${children}${externalLinkText}`
            : ariaLabel;

    const linkClassName = cn(
        "text-link underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 min-h-11 min-w-11 inline-flex items-center",
        getVariantClasses(variant),
        ellipsis && "truncate",
        font && `font-${font}`,
        className
    );

    // External links or links with target="_blank"
    if (isExternal || hasTargetBlank) {
        return (
            <a
                id={id}
                href={href}
                target={target}
                aria-label={computedAriaLabel}
                aria-describedby={ariaDescribedby}
                aria-hidden={ariaHidden}
                lang={lang}
                role={role}
                rel={hasTargetBlank ? "noopener noreferrer" : undefined}
                className={linkClassName}
                {...restProps}
            >
                {children}
                {isExternal && (
                    <span
                        className="inline-block ml-1 align-middle"
                        aria-hidden="true"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </span>
                )}
            </a>
        );
    }

    // Internal links use Next.js Link
    return (
        <NextLink
            id={id}
            href={href || "#"}
            aria-label={computedAriaLabel}
            aria-describedby={ariaDescribedby}
            aria-hidden={ariaHidden}
            lang={lang}
            role={role}
            className={linkClassName}
            {...restProps}
        >
            {children}
        </NextLink>
    );
};
