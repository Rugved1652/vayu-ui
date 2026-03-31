// types.ts
// Types

import React from 'react';

// Context types

export interface ContextMenuContextValue {
  isOpen: boolean;
  closeMenu: () => void;
  openSubmenu: (id: string) => void;
  closeSubmenu: (id: string) => void;
  openSubmenus: Set<string>;
  menuId: string;
}

export interface RadioGroupCtxValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface SubmenuContextValue {
  id: string;
  isOpen: boolean;
  position: { x: number; y: number };
  triggerRef: React.RefObject<HTMLDivElement | null>;
  handleOpen: () => void;
  handleClose: () => void;
}

// Prop interfaces

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface ContextMenuCheckboxItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ContextMenuRadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface ContextMenuRadioItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ContextMenuSubProps {
  children: React.ReactNode;
}

export interface ContextMenuSubTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ContextMenuSubContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ContextMenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Constants

export const MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([aria-disabled="true"]), ' +
  '[role="menuitemcheckbox"]:not([aria-disabled="true"]), ' +
  '[role="menuitemradio"]:not([aria-disabled="true"])';

export const VIEWPORT_PAD = 8;
