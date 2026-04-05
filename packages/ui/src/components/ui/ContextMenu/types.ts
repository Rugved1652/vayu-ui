import React from "react";

// ─── Context Types ───────────────────────────────────────────

export interface ContextMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeMenu: () => void;
  cursorPositionRef: React.RefObject<{ x: number; y: number }>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleTypeahead: (key: string) => void;
}

export interface SubContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  level: number;
  subMenuRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  handleTypeahead: (key: string) => void;
  openSub: () => void;
  closeSub: () => void;
}

export interface RadioGroupCtxValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

// ─── Prop Interfaces ────────────────────────────────────────

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
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface ContextMenuCheckboxItemProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface ContextMenuRadioItemProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface ContextMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ─── Constants ──────────────────────────────────────────────

export const FOCUSABLE_SELECTOR =
  '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])]';

export const VIEWPORT_PAD = 8;
