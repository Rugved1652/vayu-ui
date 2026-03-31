// commandbox.tsx
// Composition: UI + logic

"use client";

import { clsx } from "clsx";
import { CornerDownLeft } from "lucide-react";
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import { defaultFilter, sizeClasses, variantClasses } from "./config";
import { CommandBoxFooter } from "./footer";
import { useFilteredItems } from "./hooks";
import { CommandBoxSearchInput } from "./search-input";
import { CommandBoxTrigger } from "./trigger";
import type { CommandBoxProps, CommandItem } from "./types";

const CommandBox = forwardRef<HTMLDivElement, CommandBoxProps>(
    (
        {
            items = [],
            groups = [],
            placeholder = "Type a command or search...",
            emptyText = "No results found.",
            variant = "default",
            size = "medium",
            open = false,
            onOpenChange,
            onSelect,
            filter,
            className,
            contentClassName,
            inputClassName,
            disabled = false,
            showShortcuts = true,
            maxHeight = "400px",
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(open);
        const [search, setSearch] = useState("");
        const [selectedIndex, setSelectedIndex] = useState(0);

        const uniqueId = useId();
        const listboxId = `${uniqueId}-listbox`;
        const inputId = `${uniqueId}-input`;

        const inputRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        // Sync internal state with prop
        useEffect(() => {
            setIsOpen(open);
        }, [open]);

        const { groupedItems, flatItems } = useFilteredItems(
            items,
            groups,
            search,
            filter || defaultFilter
        );

        // Handlers
        const handleClose = useCallback(() => {
            setIsOpen(false);
            setSearch("");
            setSelectedIndex(0);
            onOpenChange?.(false);
        }, [onOpenChange]);

        const handleOpen = useCallback(() => {
            if (disabled) return;
            setIsOpen(true);
            onOpenChange?.(true);
        }, [disabled, onOpenChange]);

        const handleSelect = useCallback(
            (item: CommandItem) => {
                if (item.disabled) return;
                item.onSelect?.();
                onSelect?.(item);
                handleClose();
            },
            [onSelect, handleClose]
        );

        // Keyboard navigation
        useEffect(() => {
            if (!isOpen) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                switch (e.key) {
                    case "ArrowDown":
                        e.preventDefault();
                        setSelectedIndex((prev) =>
                            prev < flatItems.length - 1 ? prev + 1 : 0
                        );
                        break;
                    case "ArrowUp":
                        e.preventDefault();
                        setSelectedIndex((prev) =>
                            prev > 0 ? prev - 1 : flatItems.length - 1
                        );
                        break;
                    case "Enter":
                        e.preventDefault();
                        if (
                            flatItems[selectedIndex] &&
                            !flatItems[selectedIndex].disabled
                        ) {
                            handleSelect(flatItems[selectedIndex]);
                        }
                        break;
                    case "Escape":
                        e.preventDefault();
                        handleClose();
                        break;
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [isOpen, selectedIndex, flatItems, handleSelect, handleClose]);

        // Scroll selected into view
        useEffect(() => {
            if (isOpen && listRef.current) {
                const el = listRef.current.querySelector(
                    `[data-index="${selectedIndex}"]`
                );
                el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
        }, [selectedIndex, isOpen]);

        // Focus input when opened
        useEffect(() => {
            if (isOpen && inputRef.current) {
                inputRef.current.focus();
            }
        }, [isOpen]);

        // Click outside
        useEffect(() => {
            if (!isOpen) return;

            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    handleClose();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }, [isOpen, handleClose]);

        // Active descendant ID
        const activeDescendantId =
            flatItems[selectedIndex]?.id
                ? `${uniqueId}-option-${flatItems[selectedIndex].id}`
                : undefined;

        // Shortcut renderer
        const renderShortcut = (shortcut: string[]) => {
            if (!showShortcuts || !shortcut.length) return null;
            return (
                <div className="flex items-center gap-1" aria-hidden="true">
                    {shortcut.map((key, index) => (
                        <kbd
                            key={index}
                            className="px-1.5 py-0.5 text-xs font-secondary font-medium bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                        >
                            {key}
                        </kbd>
                    ))}
                </div>
            );
        };

        // ---- Closed State (Trigger) ----
        if (!isOpen) {
            return (
                <CommandBoxTrigger
                    ref={ref}
                    onClick={handleOpen}
                    disabled={disabled}
                    placeholder={placeholder}
                    size={size}
                    variant={variant}
                    className={className}
                    {...props}
                />
            );
        }

        // ---- Open State ----
        return (
            <div
                ref={ref}
                className={clsx(
                    "relative w-full",
                    sizeClasses[size].container,
                    className
                )}
                {...props}
            >
                <div
                    ref={containerRef}
                    role="dialog"
                    aria-label="Command palette"
                    className={clsx(
                        "absolute top-0 left-0 right-0 rounded-lg border-2 overflow-hidden z-50",
                        variantClasses[variant],
                        contentClassName
                    )}
                    style={{ maxHeight }}
                >
                    {/* Search Input */}
                    <CommandBoxSearchInput
                        inputRef={inputRef}
                        inputId={inputId}
                        value={search}
                        onChange={(value) => {
                            setSearch(value);
                            setSelectedIndex(0);
                        }}
                        onClose={handleClose}
                        placeholder={placeholder}
                        size={size}
                        activeDescendantId={activeDescendantId}
                        listboxId={listboxId}
                        inputClassName={inputClassName}
                    />

                    {/* Results */}
                    <div
                        ref={listRef}
                        id={listboxId}
                        role="listbox"
                        aria-label="Search results"
                        className="overflow-y-auto"
                        style={{
                            maxHeight: `calc(${maxHeight} - 120px)`,
                        }}
                    >
                        {Object.keys(groupedItems).length === 0 ? (
                            <div
                                className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400 font-secondary"
                                role="status"
                            >
                                {emptyText}
                            </div>
                        ) : (
                            Object.entries(groupedItems).map(
                                ([groupName, groupItems]) => (
                                    <div
                                        key={groupName}
                                        role="group"
                                        aria-label={groupName}
                                    >
                                        {Object.keys(groupedItems).length >
                                            1 && (
                                                <div
                                                    className="px-4 py-2 text-xs font-primary font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 uppercase tracking-wider"
                                                    aria-hidden="true"
                                                >
                                                    {groupName}
                                                </div>
                                            )}
                                        {groupItems.map((item) => {
                                            const globalIndex =
                                                flatItems.indexOf(item);
                                            const isSelected =
                                                globalIndex === selectedIndex;
                                            const optionId = `${uniqueId}-option-${item.id}`;

                                            return (
                                                <div
                                                    key={item.id}
                                                    id={optionId}
                                                    role="option"
                                                    aria-selected={isSelected}
                                                    aria-disabled={
                                                        item.disabled ||
                                                        undefined
                                                    }
                                                    data-index={globalIndex}
                                                    onClick={() =>
                                                        handleSelect(item)
                                                    }
                                                    className={clsx(
                                                        "flex items-center gap-3 cursor-pointer transition-colors duration-150 font-secondary",
                                                        sizeClasses[size].item,
                                                        isSelected &&
                                                            !item.disabled &&
                                                            "bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100",
                                                        !isSelected &&
                                                            !item.disabled &&
                                                            "hover:bg-neutral-50 dark:hover:bg-neutral-700/50 text-neutral-900 dark:text-white",
                                                        item.disabled &&
                                                            "opacity-50 cursor-not-allowed"
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <span
                                                            className={clsx(
                                                                sizeClasses[
                                                                    size
                                                                ].icon,
                                                                "flex-shrink-0",
                                                                isSelected
                                                                    ? "text-primary-600 dark:text-primary-400"
                                                                    : "text-neutral-500 dark:text-neutral-400"
                                                            )}
                                                            aria-hidden="true"
                                                        >
                                                            {item.icon}
                                                        </span>
                                                    )}

                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium truncate">
                                                            {item.title}
                                                        </div>
                                                        {item.description && (
                                                            <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                                                                {
                                                                    item.description
                                                                }
                                                            </div>
                                                        )}
                                                    </div>

                                                    {item.shortcut &&
                                                        renderShortcut(
                                                            item.shortcut
                                                        )}

                                                    {isSelected &&
                                                        !item.disabled && (
                                                            <CornerDownLeft
                                                                className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            )
                        )}
                    </div>

                    {/* Footer */}
                    <CommandBoxFooter />
                </div>
            </div>
        );
    }
);

CommandBox.displayName = "CommandBox";

export default CommandBox;
