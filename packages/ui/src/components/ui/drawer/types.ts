// types.ts
// Types

import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    side: DrawerSide;
    titleId: string;
    descriptionId: string;
    modal: boolean;
}

export interface DrawerRootProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: DrawerSide;
    modal?: boolean;
    defaultOpen?: boolean;
}

export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
    dismissible?: boolean;
}

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
    trapFocus?: boolean;
}

export interface DrawerCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
