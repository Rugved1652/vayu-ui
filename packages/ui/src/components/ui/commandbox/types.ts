// types.ts
// Types

import type { HTMLAttributes, ReactNode } from "react";

export type CommandBoxVariant = "default" | "bordered" | "elevated" | "minimal";
export type CommandBoxSize = "small" | "medium" | "large";

export interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
    shortcut?: string[];
    group?: string;
    disabled?: boolean;
    onSelect?: () => void;
}

export interface CommandGroup {
    title: string;
    items: CommandItem[];
}

export interface CommandBoxProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "onClick"> {
    items?: CommandItem[];
    groups?: CommandGroup[];
    placeholder?: string;
    emptyText?: string;
    variant?: CommandBoxVariant;
    size?: CommandBoxSize;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSelect?: (item: CommandItem) => void;
    filter?: (value: string, search: string) => number;
    contentClassName?: string;
    inputClassName?: string;
    disabled?: boolean;
    showShortcuts?: boolean;
    maxHeight?: string;
}

export interface CommandBoxTriggerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
    onClick: () => void;
    disabled: boolean;
    placeholder: string;
    size: CommandBoxSize;
    variant: CommandBoxVariant;
}

export interface CommandBoxSearchInputProps {
    inputRef: React.RefObject<HTMLInputElement | null>;
    inputId: string;
    value: string;
    onChange: (value: string) => void;
    onClose: () => void;
    placeholder: string;
    size: CommandBoxSize;
    activeDescendantId?: string;
    listboxId: string;
    inputClassName?: string;
}
