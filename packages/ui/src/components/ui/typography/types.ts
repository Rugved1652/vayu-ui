// types.ts
// Types

import type { HTMLAttributes, AnchorHTMLAttributes } from "react";

export interface BaseTypographyProps {
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
    lang?: string;
    role?: React.AriaRole;
}

export type H1Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type H2Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type H3Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type H4Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type H5Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type H6Props = BaseTypographyProps & React.HTMLAttributes<HTMLHeadingElement>;
export type PProps = BaseTypographyProps & React.HTMLAttributes<HTMLParagraphElement>;
export type LabelProps = BaseTypographyProps & React.HTMLAttributes<HTMLLabelElement> & {
    htmlFor?: string;
};
export type LinkProps = BaseTypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type CTAProps = BaseTypographyProps & React.HTMLAttributes<HTMLParagraphElement>;
export type CodeProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement> & {
    codeLang?: string;
};
