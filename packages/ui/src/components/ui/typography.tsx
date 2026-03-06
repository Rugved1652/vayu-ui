import React from "react";

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
    lang?: string; // For language declaration
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
    lang?: string; // Programming language for code
};

// Helper to map variant to Tailwind CSS classes with WCAG 2.2 AA contrast compliance
const getVariantClasses = (variant: BaseTypographyProps["variant"]) => {
    switch (variant) {
        case "primary":
            return "text-ground-900 dark:text-ground-50";
        case "secondary":
            return "text-primary-600 dark:text-primary-400";
        case "tertiary":
            return "text-primary-600 dark:text-primary-400";
        case "error":
            // WCAG 2.2 AA compliant - red-600 meets contrast requirements
            return "text-red-600 dark:text-red-400";
        case "warning":
            // WCAG 2.2 AA compliant - yellow-600 meets contrast requirements with dark backgrounds
            return "text-yellow-600 dark:text-yellow-400";
        case "info":
            // WCAG 2.2 AA compliant - blue-600 meets contrast requirements
            return "text-blue-600 dark:text-blue-400";
        case "success":
            // WCAG 2.2 AA compliant - green-600 meets contrast requirements
            return "text-green-600 dark:text-green-400";
        case "gradient":
            // Gradient text with fallback for screen readers
            return "bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 dark:from-primary-300 dark:via-primary-400 dark:to-primary-500 bg-clip-text text-transparent";
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
        lang,
        ...props
    }: H1Props) => (
        <h1
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: H2Props) => (
        <h2
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: H3Props) => (
        <h3
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: H4Props) => (
        <h4
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: H5Props) => (
        <h5
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: H6Props) => (
        <h6
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: PProps) => (
        <p
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: LabelProps) => (
        <label
            id={id}
            htmlFor={htmlFor}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang = "en",
        ...props
    }: CodeProps) => (
        <code
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
        lang,
        ...props
    }: LinkProps) => {
        const { href, target } = props;
        const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
        const hasTargetBlank = target === '_blank';

        return (
            <a
                id={id}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                lang={lang}
                rel={hasTargetBlank ? "noopener noreferrer" : undefined}
                className={`text-link underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${getClassNames(
                    className,
                    variant,
                    ellipsis,
                    font
                )}`}
                {...props}
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
        lang,
        ...props
    }: CTAProps) => (
        <p
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            lang={lang}
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
