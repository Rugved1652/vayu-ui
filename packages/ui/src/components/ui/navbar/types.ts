// Types

import { HTMLAttributes, AnchorHTMLAttributes, ElementType } from "react";

export interface NavbarContextValue {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    closeMenu: () => void;
    menuId: string;
    triggerId: string;
}

export interface InjectedLinkProps {
    linkComponent?: ElementType;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    mainContentSelector?: string;
}

export interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export interface NavbarBrandProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavbarItemsProps extends HTMLAttributes<HTMLUListElement> {}

export interface NavbarItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    active?: boolean;
    href?: string;
}

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavbarToggleProps extends HTMLAttributes<HTMLButtonElement> {}

export interface NavbarMobileMenuProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavbarMobileItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
    active?: boolean;
    href?: string;
    onClick?: () => void;
}
