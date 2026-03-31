// index.ts
// Public API

import { SelectRoot } from "./Select";
import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectItem } from "./Selectitem";
import { SelectCreateButton } from "./SelectCreateButton";
import { SelectAsyncOptions, SelectList } from "./SelectOptionList";
import { SelectLoading, SelectNotFound, SelectSearchHint, SelectError, SelectFooter } from "./SelectStates";

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
