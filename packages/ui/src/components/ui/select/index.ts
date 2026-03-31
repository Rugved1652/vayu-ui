// index.ts
// Public API

import { SelectRoot } from "./select";
import { SelectTrigger } from "./trigger";
import { SelectContent } from "./content";
import { SelectItem } from "./item";
import { SelectCreateButton } from "./create-button";
import { SelectAsyncOptions, SelectList } from "./list";
import { SelectLoading, SelectNotFound, SelectSearchHint, SelectError, SelectFooter } from "./select-states";

// ============================================================================
// Compound Component Assembly
// ============================================================================

export const Select = {
    Root: SelectRoot,
    Trigger: SelectTrigger,
    Content: SelectContent,
    Item: SelectItem,
    Loading: SelectLoading,
    NotFound: SelectNotFound,
    SearchHint: SelectSearchHint,
    CreateButton: SelectCreateButton,
    Error: SelectError,
    Footer: SelectFooter,
    AsyncOptions: SelectAsyncOptions,
    List: SelectList,
};

// ============================================================================
// Type Re-exports
// ============================================================================

export type {
    SelectRootProps,
    SelectTriggerProps,
    SelectContentProps,
    SelectItemProps,
    SelectLoadingProps,
    SelectNotFoundProps,
    SelectSearchHintProps,
    SelectCreateButtonProps,
    SelectErrorProps,
    SelectFooterProps,
    SelectAsyncOptionsProps,
    SelectListProps,
    OptionData,
    SelectValue,
    SingleValue,
    MultiValue,
    AsyncSearchProps,
    CreateableProps,
} from "./types";
