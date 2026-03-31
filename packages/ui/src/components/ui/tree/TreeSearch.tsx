// tree-search.tsx
// UI: search input

"use client";

import { clsx } from "clsx";
import { Search, X } from "lucide-react";
import React, { useCallback, useId } from "react";

import type { TreeSearchProps } from "./types";

const TreeSearch: React.FC<TreeSearchProps> = ({
    searchQuery,
    onSearchChange,
    placeholder = "Search tree…",
    className,
}) => {
    const searchId = useId();

    const handleClear = useCallback(() => {
        onSearchChange("");
    }, [onSearchChange]);

    return (
        <div className={clsx("relative", className)}>
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                aria-hidden="true"
            />
            <input
                id={searchId}
                type="text"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-secondary text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="Search tree"
            />
            {searchQuery && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    aria-label="Clear search"
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </div>
    );
};

TreeSearch.displayName = "Tree.Search";

export default TreeSearch;
