// Types

import React from "react";

export interface SubItem {
    label: string;
    active?: boolean;
    href?: string;
}

export interface SidebarContextType {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobile: boolean;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export interface SidebarProviderProps {
    children: React.ReactNode;
}

export interface SidebarProps {
    children: React.ReactNode;
}

export interface SidebarHeaderProps {
    children: React.ReactNode;
}

export interface SidebarContentProps {
    children: React.ReactNode;
}

export interface SidebarFooterProps {
    children: React.ReactNode;
}

export interface SidebarMenuProps {
    children: React.ReactNode;
}

export interface SidebarMenuGroupProps {
    label?: string;
    children: React.ReactNode;
}

export interface SidebarMenuItemProps {
    icon?: React.ReactNode;
    children: React.ReactNode;
    active?: boolean;
    badge?: string | number;
    href?: string;
    subItems?: SubItem[];
}
