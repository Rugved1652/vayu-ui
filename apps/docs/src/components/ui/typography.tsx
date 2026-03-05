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
}

type H1Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H2Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H3Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H4Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H5Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type H6Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
type PProps = BaseTypographyProps & React.HTMLAttributes<HTMLParagraphElement>;
type LabelProps = BaseTypographyProps & React.HTMLAttributes<HTMLLabelElement>;
type LinkProps = BaseTypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CTAProps = BaseTypographyProps &
    React.HTMLAttributes<HTMLParagraphElement>;
type CodeProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

// Helper to map variant to Tailwind CSS classes
const getVariantClasses = (variant: BaseTypographyProps["variant"]) => {
    switch (variant) {
        case "primary":
            return "text-ground-900 dark:text-ground-50";
        case "secondary":
            return "text-primary-600 dark:text-primary-400";
        case "tertiary":
            return "text-primary-600 dark:text-primary-400";
        case "error":
            return "text-red-600";
        case "warning":
            return "text-yellow-600";
        case "info":
            return "text-blue-600";
        case "success":
            return "text-green-600";
        case "gradient":
            return "bg-gradient-to-r from-primary-200 via-primary-400 to-primary-700 dark:from-primary-300 dark:via-primary-500 dark:to-primary-600 bg-clip-text text-transparent";
        default:
            return "text-primary";
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
        ...props
    }: H1Props) => (
        <h1
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
        ...props
    }: H2Props) => (
        <h2
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
        ...props
    }: H3Props) => (
        <h3
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
        ...props
    }: H4Props) => (
        <h4
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
        ...props
    }: H5Props) => (
        <h5
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
        ...props
    }: H6Props) => (
        <h6
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
        ...props
    }: PProps) => (
        <p
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
        ...props
    }: LabelProps) => (
        <label
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
        ...props
    }: CodeProps) => (
        <code
            className={`relative rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm ${getClassNames(
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
        ...props
    }: LinkProps) => (
        <a
            className={`text-link ${getClassNames(
                className,
                variant,
                ellipsis,
                font
            )}`}
            {...props}
        >
            {children}
        </a>
    ),
    CTA: ({
        children,
        className = "",
        variant = "primary",
        ellipsis,
        font,
        ...props
    }: CTAProps) => (
        <p
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
