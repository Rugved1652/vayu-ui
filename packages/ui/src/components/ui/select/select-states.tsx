// select-states.tsx
// UI: Empty, loading, and feedback states

"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { useSelect } from "./select";
import type {
    SelectLoadingProps,
    SelectNotFoundProps,
    SelectSearchHintProps,
    SelectErrorProps,
    SelectFooterProps,
} from "./types";

export const SelectLoading: React.FC<SelectLoadingProps> = ({ children, className }) => {
    const { isSearchLoading } = useSelect();
    if (!isSearchLoading) return null;
    return (
        <div className={clsx("flex items-center justify-center py-6 text-muted-content", className)}>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">{children || "Searching..."}</span>
        </div>
    );
};

SelectLoading.displayName = "Select.Loading";

export const SelectNotFound: React.FC<SelectNotFoundProps> = ({ children, className }) => {
    const { hasOptions, showCreateOption, isSearchLoading } = useSelect();
    if (isSearchLoading || hasOptions || showCreateOption) return null;
    return (
        <div className={clsx("py-6 text-center text-muted-content text-sm", className)}>
            {children || "No results found"}
        </div>
    );
};

SelectNotFound.displayName = "Select.NotFound";

export const SelectSearchHint: React.FC<SelectSearchHintProps> = ({ children, className }) => {
    const { onSearch, search, minSearchLength = 1 } = useSelect();
    if (!onSearch || search.length >= minSearchLength || search.length === 0) return null;
    const defaultText = `Type at least ${minSearchLength} character${minSearchLength > 1 ? 's' : ''} to search`;
    return (
        <div className={clsx("py-6 text-center text-muted-content text-sm", className)}>
            {children || defaultText}
        </div>
    );
};

SelectSearchHint.displayName = "Select.SearchHint";

export const SelectError: React.FC<SelectErrorProps> = ({ type = 'search', children, className }) => {
    const { searchError, createError } = useSelect();
    const error = type === 'search' ? searchError : createError;
    if (!error && !children) return null;
    return (
        <div className={clsx("px-2 py-1.5 text-xs text-destructive border-t border-border", className)}>
            {children || error}
        </div>
    );
};

SelectError.displayName = "Select.Error";

export const SelectFooter: React.FC<SelectFooterProps> = ({ children, className }) => {
    if (!children) return null;
    return (
        <div className={clsx("px-2 py-1.5 border-t border-border text-xs text-muted-content", className)}>
            {children}
        </div>
    );
};

SelectFooter.displayName = "Select.Footer";
