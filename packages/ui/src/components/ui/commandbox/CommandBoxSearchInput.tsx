// search-input.tsx
// UI: Search input in open state

"use client";

import { clsx } from "clsx";
import { Search, X } from "lucide-react";
import React, { forwardRef } from "react";
import { sizeClasses } from "./config";
import type { CommandBoxSearchInputProps } from "./types";

export const CommandBoxSearchInput = forwardRef<
    HTMLDivElement,
    CommandBoxSearchInputProps
>(
    (
        {
            inputRef,
            inputId,
            value,
            onChange,
            onClose,
            placeholder,
            size,
            activeDescendantId,
            listboxId,
            inputClassName,
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3"
            >
                <Search
                    className={clsx(
                        sizeClasses[size].icon,
                        "text-neutral-400 dark:text-neutral-500 flex-shrink-0"
                    )}
                    aria-hidden="true"
                />
                <input
                    ref={inputRef}
                    id={inputId}
                    type="text"
                    role="combobox"
                    aria-expanded={true}
                    aria-controls={listboxId}
                    aria-activedescendant={activeDescendantId}
                    aria-autocomplete="list"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={clsx(
                        "flex-1 bg-transparent border-none outline-none",
                        "text-neutral-900 dark:text-white",
                        "placeholder-neutral-500 dark:placeholder-neutral-400",
                        "font-secondary",
                        inputClassName
                    )}
                />
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close command palette"
                    className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }
);

CommandBoxSearchInput.displayName = "CommandBox.SearchInput";
