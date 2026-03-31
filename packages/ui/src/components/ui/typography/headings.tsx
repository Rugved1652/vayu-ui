// headings.tsx
// UI: H1-H6 heading components

import React from "react";
import { cn } from "../utils";
import { getVariantClasses } from "./utils";
import type { H1Props, H2Props, H3Props, H4Props, H5Props, H6Props } from "./types";

export const H1 = ({
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
}: H1Props) => (
    <h1
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h1>
);

export const H2 = ({
    children,
    className = "",
    variant = "primary",
    ellipsis,
    font = "primary",
    id,
    ariaLabel,
    ariaDescribedby,
    ariaHidden,
    lang,
    role,
    ...props
}: H2Props) => (
    <h2
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "tracking-tight text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h2>
);

export const H3 = ({
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
}: H3Props) => (
    <h3
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h3>
);

export const H4 = ({
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
}: H4Props) => (
    <h4
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h4>
);

export const H5 = ({
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
}: H5Props) => (
    <h5
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h5>
);

export const H6 = ({
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
}: H6Props) => (
    <h6
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-hidden={ariaHidden}
        lang={lang}
        role={role}
        className={cn(
            "text-base sm:text-lg lg:text-xl font-semibold tracking-tight",
            getVariantClasses(variant),
            ellipsis && "truncate",
            font && `font-${font}`,
            className
        )}
        {...props}
    >
        {children}
    </h6>
);
