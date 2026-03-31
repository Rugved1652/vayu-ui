// types.ts
// Types

import type { HTMLAttributes, ElementType, ComponentType } from "react";

export interface DockBaseProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    "aria-label"?: string;
}

export interface DockItemProps extends HTMLAttributes<HTMLElement> {
    icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
    href?: string;
    onClick?: () => void;
}

export interface DockLogoProps extends HTMLAttributes<HTMLElement> {
    href?: string;
    children: React.ReactNode;
}

// Internal prop injected via cloneElement
export interface InjectedDockProps {
    linkComponent?: ElementType;
}
