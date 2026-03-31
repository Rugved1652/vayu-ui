// types.ts
// Types

import { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

// ============================================================================
// Card (Root)
// ============================================================================

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
    /** Make the entire card a clickable surface. */
    interactive?: boolean;
    /** Render as an `<a>` when linked. */
    href?: string;
    /** Anchor props forwarded when `href` is set. */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
    /** Disable interactions. */
    disabled?: boolean;
}

// ============================================================================
// CardHeader
// ============================================================================

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Main title text. */
    title?: ReactNode;
    /** Subtitle / description under the title. */
    subtitle?: ReactNode;
    /** Element rendered on the trailing side (e.g. icon button). */
    action?: ReactNode;
    /** Optional leading icon / avatar. */
    avatar?: ReactNode;
}

// ============================================================================
// CardMedia
// ============================================================================

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
    /** Image source URL. */
    src: string;
    /** Alt text for the image. */
    alt: string;
    /** CSS aspect-ratio. */
    aspectRatio?: string;
    /** Object-fit behaviour. */
    fit?: "cover" | "contain" | "fill";
    /** Optional overlay content rendered on top of the image. */
    overlay?: ReactNode;
}

// ============================================================================
// CardContent
// ============================================================================

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

// ============================================================================
// CardFooter
// ============================================================================

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
