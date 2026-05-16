// Types

import React from 'react';

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

export type SidebarHeaderChildren =
  | React.ReactNode
  | ((state: { collapsed: boolean; mobile: boolean }) => React.ReactNode);

export interface SidebarHeaderProps {
  children: SidebarHeaderChildren;
}

export interface SidebarContentProps {
  children: React.ReactNode;
}

export type SidebarFooterChildren =
  | React.ReactNode
  | ((state: { collapsed: boolean; mobile: boolean }) => React.ReactNode);

export interface SidebarFooterProps {
  children: SidebarFooterChildren;
}

export interface SidebarMenuProps {
  children: React.ReactNode;
}

export interface SidebarMenuGroupProps {
  label?: string;
  children: React.ReactNode;
}

export interface SidebarToggleProps {
  /** When true, renders as an absolute floating handle on the sidebar edge (legacy mode). Defaults to true for backwards compatibility. */
  floating?: boolean;
}

export interface SidebarMenuItemProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  badge?: string | number;
  href?: string;
  subItems?: SubItem[];
}
