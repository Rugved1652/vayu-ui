// types.ts
// Types

import { HTMLAttributes, ReactNode } from "react";

export type ButtonGroupRadius = "control" | "surface" | "overlay" | "full";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Stack buttons vertically instead of horizontally. */
    orientation?: "horizontal" | "vertical";
    /** Force a specific size on all child buttons via CSS. */
    size?: "small" | "medium" | "large";
    /** Border radius variant using semantic design tokens. */
    radius?: ButtonGroupRadius;
    /** Make the group span the full width of its container. */
    fullWidth?: boolean;
    /** Accessible label for the button group. */
    "aria-label"?: string;
    /** ID of an element that labels this button group. */
    "aria-labelledby"?: string;
    /** Button elements to group together. */
    children?: ReactNode;
}
