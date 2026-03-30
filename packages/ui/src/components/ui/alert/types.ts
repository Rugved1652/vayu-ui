// types.ts
// Types

import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    children: React.ReactNode;
}

export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    children: React.ReactNode;
}

export interface AlertDismissProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: AlertVariant;
    alertTitle?: string;
}
