// types.ts
// Types

import React from "react";

// Types

export type Orientation = "horizontal" | "vertical";

export interface MenubarContextValue {
    orientation: Orientation;
    activeMenu: string | null;
    setActiveMenu: (id: string | null) => void;
    closeAllMenus: () => void;
    registerTrigger: (id: string, ref: React.RefObject<HTMLButtonElement | null>) => void;
    unregisterTrigger: (id: string) => void;
    getAllTriggers: () => Array<{ id: string; ref: React.RefObject<HTMLButtonElement | null> }>;
}

export interface MenuContextValue {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    level: number;
    parentId: string;
    menuRef: React.RefObject<HTMLDivElement | null>;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    handleTypeahead: (key: string) => void;
}

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    orientation?: Orientation;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    trigger: React.ReactNode;
    disabled?: boolean;
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    onSelect?: () => void;
}

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export interface MenuCheckboxItemProps extends Omit<MenuItemProps, "onSelect"> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export interface MenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
}

export interface MenuRadioItemProps extends Omit<MenuItemProps, "onSelect"> {
    value: string;
}

// Constants

export const MENU_ITEM_SELECTOR =
    '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled]), [role="menuitemradio"]:not([disabled])';
