// types.ts
// Types for CommandBox compound component

import type { HTMLAttributes, InputHTMLAttributes, ReactNode, RefObject } from 'react';

// ============================================================================
// Item Data
// ============================================================================

export interface CommandBoxItemData {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];
  group?: string;
  disabled?: boolean;
  onSelect?: () => void;
  data?: Record<string, unknown>;
}

// ============================================================================
// Context
// ============================================================================

export interface CommandBoxContextValue {
  // Open state
  open: boolean;
  setOpen: (open: boolean) => void;

  // IDs for ARIA
  id: string;
  inputId: string;
  listboxId: string;

  // Search/filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Item registration
  registerItem: (item: CommandBoxItemData) => void;
  unregisterItem: (id: string) => void;
  itemsMap: React.MutableRefObject<Map<string, CommandBoxItemData>>;

  // Filtered items (memoized)
  filteredItems: CommandBoxItemData[];

  // Keyboard navigation
  highlightedIndex: number;
  setHighlightedIndex: (index: number | ((prev: number) => number)) => void;
  highlightedId: string | null;

  // Selection
  onSelect: (item: CommandBoxItemData) => void;

  // Refs
  inputRef: RefObject<HTMLInputElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;

  // Configuration
  filter: ((item: CommandBoxItemData, search: string) => number) | null;
  showShortcuts: boolean;

  // Loading
  loading?: boolean;
}

// ============================================================================
// Component Props
// ============================================================================

export interface CommandBoxRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (item: CommandBoxItemData) => void;
  filter?: (item: CommandBoxItemData, search: string) => number;
  showShortcuts?: boolean;
  loading?: boolean;
}

export interface CommandBoxInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  placeholder?: string;
  icon?: ReactNode;
}

export interface CommandBoxListProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

export interface CommandBoxItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'onSelect'> {
  id: string;
  disabled?: boolean;
  shortcut?: string[];
  icon?: ReactNode;
  description?: string;
  title?: string;
}

export interface CommandBoxGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

export interface CommandBoxEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CommandBoxSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface CommandBoxOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
