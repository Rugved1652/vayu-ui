// types.ts
// Types

import type { HTMLAttributes, ReactNode } from "react";

export interface CollapsibleRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    lines?: number;
}

export interface CollapsibleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    showText?: string;
    hideText?: string;
}

export interface CollapsibleContextType {
    isOpen: boolean;
    toggle: () => void;
    contentId: string;
    triggerId: string;
}
