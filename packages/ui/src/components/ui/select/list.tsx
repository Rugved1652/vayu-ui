// list.tsx
// UI: Option list renderers (static + async)

"use client";

import React from "react";
import { useSelect } from "./select";
import { SelectItem } from "./item";
import type { SelectAsyncOptionsProps, SelectListProps } from "./types";

export const SelectAsyncOptions: React.FC<SelectAsyncOptionsProps> = ({ className }) => {
    const { filteredOptions, isSearchLoading, onSearch } = useSelect();
    if (!onSearch || isSearchLoading) return null;
    return (
        <>
            {filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled} className={className}>
                    {option.label}
                </SelectItem>
            ))}
        </>
    );
};

SelectAsyncOptions.displayName = "Select.AsyncOptions";

export const SelectList: React.FC<SelectListProps> = ({ children, className }) => {
    const { filteredOptions, isSearchLoading, onSearch, search } = useSelect();
    const isAsyncMode = onSearch !== undefined;
    const shouldRenderStatic = !isAsyncMode || (isAsyncMode && search.length === 0);
    return (
        <>
            {shouldRenderStatic && children}
            {isAsyncMode && !isSearchLoading && filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled} className={className}>
                    {option.label}
                </SelectItem>
            ))}
        </>
    );
};

SelectList.displayName = "Select.List";
