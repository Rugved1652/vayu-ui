// types.ts
// Types

import type { ReactNode, MutableRefObject } from "react";

// ============================================================================
// Value Types
// ============================================================================

export type SingleValue = string | number;
export type MultiValue = (string | number)[];
export type SelectValue = SingleValue | MultiValue | undefined;

// ============================================================================
// Data Types
// ============================================================================

export interface OptionData {
    value: SingleValue;
    label: string;
    disabled?: boolean;
    data?: Record<string, unknown>;
}

// ============================================================================
// Feature Props
// ============================================================================

export interface AsyncSearchProps {
    onSearch?: (searchValue: string) => Promise<OptionData[]>;
    searchDebounce?: number;
    minSearchLength?: number;
    isLoading?: boolean;
}

export interface CreateableProps {
    creatable?: boolean;
    onCreateOption?: (inputValue: string) => Promise<OptionData | null>;
    isCreating?: boolean;
    createText?: string;
    validateCreate?: (inputValue: string) => boolean | string;
}

// ============================================================================
// Context Type
// ============================================================================

export interface SelectContextValue extends AsyncSearchProps, CreateableProps {
    value: SelectValue;
    onValueChange: (value: SingleValue) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    label?: string;
    error?: string;
    triggerRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    focusInput: () => void;
    isProgrammaticFocus: React.MutableRefObject<boolean>;
    id: string;
    multiple: boolean;
    search: string;
    setSearch: (search: string) => void;
    registerOption: (option: OptionData) => void;
    unregisterOption: (value: SingleValue) => void;
    optionsMap: React.MutableRefObject<Map<SingleValue, OptionData>>;
    removeValue: (value: SingleValue) => void;
    asyncOptions: OptionData[];
    setAsyncOptions: (options: OptionData[]) => void;
    isSearchLoading: boolean;
    setIsSearchLoading: (loading: boolean) => void;
    searchError: string | null;
    setSearchError: (error: string | null) => void;
    isCreatingInternal: boolean;
    setIsCreatingInternal: (creating: boolean) => void;
    createError: string | null;
    setCreateError: (error: string | null) => void;
    showCreateOption: boolean;
    handleCreateOption: () => Promise<void>;
    filteredOptions: OptionData[];
    hasOptions: boolean;
    hasSearched: boolean;
    optionCount: number;
}

// ============================================================================
// Component Props
// ============================================================================

export interface SelectRootProps extends AsyncSearchProps, CreateableProps {
    children: ReactNode;
    value?: SelectValue;
    defaultValue?: SelectValue;
    onValueChange?: (value: SelectValue) => void;
    label?: string;
    error?: string;
    className?: string;
    multiple?: boolean;
}

export interface SelectTriggerProps {
    placeholder?: string;
    className?: string;
    showSearchIcon?: boolean;
}

export interface SelectContentProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectItemProps {
    value: string | number;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export interface SelectLoadingProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectNotFoundProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectSearchHintProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectCreateButtonProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectErrorProps {
    type?: 'search' | 'create';
    children?: ReactNode;
    className?: string;
}

export interface SelectFooterProps {
    children?: ReactNode;
    className?: string;
}

export interface SelectAsyncOptionsProps {
    className?: string;
}

export interface SelectListProps {
    children?: ReactNode;
    className?: string;
}
