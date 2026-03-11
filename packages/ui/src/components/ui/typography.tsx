import React from "react";
import NextLink from "next/link";

interface BaseTypographyProps {
    children: React.ReactNode;
    className?: string;
    variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "gradient";
    ellipsis?: boolean;
    font?: "primary" | "secondary";
    id?: string;
    ariaLabel?: string;
    ariaDescribedby?: string;
    ariaHidden?: boolean;
    lang?: string; // For language declaration (HTML lang attribute)
    role?: React.AriaRole; // ARIA role for semantic meaning
}

type H1Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H2Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H3Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H4Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H5Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H6Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type PProps = BaseTypographyProps & React.HTMLAttributes<HTMLParagraphElement>;
type LabelProps = BaseTypographyProps & React.HTMLAttributes<HTMLLabelElement> & {
    htmlFor?: string;
};
type LinkProps = BaseTypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CTAProps = BaseTypographyProps & React.HTMLAttributes<HTMLParagraphElement>;
type CodeProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement> & {
    codeLang?: string; // Programming language for code (e.g., "javascript", "python")
};

// Helper to map variant to Tailwind CSS classes with WCAG 2.2 AA contrast compliance
// WCAG 2.2 AA requires: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt bold)
const getVariantClasses = (variant: BaseTypographyProps["variant"]) => {
    switch (variant) {
        case "primary":
            // High contrast default - meets 7:1+ (AAA)
            return "text-ground-900 dark:text-ground-50";
        case "secondary":
            // WCAG 2.2 AA compliant - 4.5:1+ contrast
            return "text-primary-700 dark:text-primary-300";
        case "tertiary":
            // WCAG 2.2 AA compliant - 4.5:1+ contrast
            return "text-primary-700 dark:text-primary-300";
        case "error":
            // WCAG 2.2 AA compliant - red-700/red-400 meets 4.5:1
            return "text-red-700 dark:text-red-400";
        case "warning":
            // WCAG 2.2 AA compliant - amber-700/amber-400 meets 4.5:1
            return "text-amber-700 dark:text-amber-400";
        case "info":
            // WCAG 2.2 AA compliant - blue-700/blue-300 meets 4.5:1
            return "text-blue-700 dark:text-blue-300";
        case "success":
            // WCAG 2.2 AA compliant - green-700/green-400 meets 4.5:1
            return "text-green-700 dark:text-green-400";
        case "gradient":
            // Gradient text - visually decorative but accessible
            // The text color is transparent, so we rely on the background gradient
            // Ensure sufficient contrast with the gradient colors
            return "bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 dark:from-primary-300 dark:via-primary-400 dark:to-primary-300 bg-clip-text text-transparent";
        default:
            return "text-ground-900 dark:text-ground-50";
    }
};

const getClassNames = (
    className: string,
    variant: BaseTypographyProps["variant"],
    ellipsis?: boolean,
    font?: "primary" | "secondary"
) => {
    const base = getVariantClasses(variant);
    const ellipsisClass = ellipsis ? "truncate" : "";
    const fontClass = font ? `font-${font}` : "";
    return `${base} ${ellipsisClass} ${fontClass} ${className}`;
};

const Typography = {
    H1: ({
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
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h1>
    ),

    H2: ({
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
            className={`tracking-tight text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h2>
    ),

    H3: ({
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
            className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h3>
    ),

    H4: ({
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
            className={`text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h4>
    ),

    H5: ({
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
            className={`text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h5>
    ),

    H6: ({
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
            className={`text-base sm:text-lg lg:text-xl font-semibold tracking-tight ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </h6>
    ),

    P: ({
        children,
        className = "",
        variant = "primary",
        ellipsis,
        font = "secondary",
        id,
        ariaLabel,
        ariaDescribedby,
        ariaHidden,
        lang,
        role,
        ...props
    }: PProps) => (
        <p
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-hidden={ariaHidden}
            lang={lang}
            role={role}
            className={`text-para text-paragraph text-para-size leading-relaxed ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </p>
    ),

    Label: ({
        children,
        className = "",
        variant = "primary",
        ellipsis,
        font,
        id,
        htmlFor,
        ariaLabel,
        ariaDescribedby,
        ariaHidden,
        lang,
        role,
        ...props
    }: LabelProps) => (
        <label
            id={id}
            htmlFor={htmlFor}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-hidden={ariaHidden}
            lang={lang}
            role={role}
            className={`text-base leading-relaxed ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </label>
    ),
    Code: ({
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
        codeLang,
        role,
        ...props
    }: CodeProps) => (
        <code
            id={id}
            aria-label={ariaLabel || (codeLang ? `${codeLang} code` : undefined)}
            aria-describedby={ariaDescribedby}
            aria-hidden={ariaHidden}
            lang={lang}
            data-code-lang={codeLang}
            role={role || "code"}
            className={`relative rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </code>
    ),
    Link: ({
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

        const linkClassName = `text-link underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 min-h-11 min-w-11 inline-flex items-center ${getClassNames(
            className,
            variant,
            ellipsis,
            font
        )}`;

        // For external links or links with target="_blank", use native anchor tag
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

        // For internal links, use Next.js Link
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
    },
    CTA: ({
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
    }: CTAProps) => (
        <p
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-hidden={ariaHidden}
            lang={lang}
            role={role}
            className={`text-cta ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </p>
    ),
};

// Export types for use in other components
export type {
    CodeProps,
    CTAProps,
    H1Props,
    H2Props,
    H3Props,
    H4Props,
    H5Props,
    H6Props,
    LabelProps,
    LinkProps,
    PProps,
};

export default Typography;
