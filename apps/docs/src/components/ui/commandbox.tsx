"use client";

import { clsx } from "clsx";
import {
    ArrowDown,
    ArrowUp,
    Command,
    CornerDownLeft,
    Search,
    X,
} from "lucide-react";
import React, {
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CommandBoxVariant = "default" | "bordered" | "elevated" | "minimal";
type CommandBoxSize = "small" | "medium" | "large";

interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon?: ReactNode;
    shortcut?: string[];
    group?: string;
    disabled?: boolean;
    onSelect?: () => void;
}

interface CommandGroup {
    title: string;
    items: CommandItem[];
}

interface CommandBoxProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
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

// ============================================================================
// Config
// ============================================================================

const sizeClasses: Record<
    CommandBoxSize,
    { container: string; input: string; item: string; icon: string }
> = {
    small: {
        container: "text-sm",
        input: "px-3 py-2 text-sm",
        item: "px-3 py-2 text-sm",
        icon: "w-4 h-4",
    },
    medium: {
        container: "text-base",
        input: "px-4 py-3 text-base",
        item: "px-4 py-3 text-base",
        icon: "w-5 h-5",
    },
    large: {
        container: "text-lg",
        input: "px-5 py-4 text-lg",
        item: "px-5 py-4 text-lg",
        icon: "w-6 h-6",
    },
};

const variantClasses: Record<CommandBoxVariant, string> = {
    default: clsx(
        "bg-white border border-neutral-200 shadow-lg",
        "dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-xl"
    ),
    bordered: clsx(
        "bg-white border-2 border-primary-200 shadow-lg",
        "dark:bg-neutral-800 dark:border-primary-600 dark:shadow-xl"
    ),
    elevated: clsx(
        "bg-white border border-neutral-200 shadow-xl",
        "dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-2xl"
    ),
    minimal: clsx(
        "bg-white border border-neutral-100 shadow-md",
        "dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-lg"
    ),
};

const defaultFilter = (value: string, search: string): number =>
    value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;

// ============================================================================
// CommandBox Component
// ============================================================================

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

        const filterItems = filter || defaultFilter;

        // Combine and filter items
        const allItems = useMemo(
            () => [
                ...items,
                ...groups.flatMap((group) =>
                    group.items.map((item) => ({
                        ...item,
                        group: group.title,
                    }))
                ),
            ],
            [items, groups]
        );

        const filteredItems = useMemo(
            () =>
                allItems.filter((item) => {
                    if (search === "") return true;
                    return (
                        filterItems(
                            item.title + " " + (item.description || ""),
                            search
                        ) > 0
                    );
                }),
            [allItems, search, filterItems]
        );

        // Group filtered items
        const groupedItems = useMemo(() => {
            return filteredItems.reduce(
                (acc, item) => {
                    const groupName = item.group || "Commands";
                    if (!acc[groupName]) acc[groupName] = [];
                    acc[groupName].push(item);
                    return acc;
                },
                {} as Record<string, CommandItem[]>
            );
        }, [filteredItems]);

        // Flat list for keyboard navigation
        const flatItems = useMemo(
            () => Object.values(groupedItems).flat(),
            [groupedItems]
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
                <div
                    ref={ref}
                    className={clsx(
                        "relative w-full",
                        sizeClasses[size].container,
                        className
                    )}
                    {...props}
                >
                    <button
                        type="button"
                        onClick={handleOpen}
                        disabled={disabled}
                        aria-expanded={false}
                        aria-haspopup="listbox"
                        aria-label={placeholder}
                        className={clsx(
                            "w-full flex items-center gap-3 rounded-lg border-2 transition-all duration-200 font-secondary",
                            "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2",
                            sizeClasses[size].input,
                            variantClasses[variant],
                            disabled
                                ? "opacity-60 cursor-not-allowed"
                                : "cursor-pointer"
                        )}
                    >
                        <Search
                            className={clsx(
                                sizeClasses[size].icon,
                                "text-neutral-400 dark:text-neutral-500 flex-shrink-0"
                            )}
                        />
                        <span className="flex-1 text-left text-neutral-500 dark:text-neutral-400 truncate font-secondary">
                            {placeholder}
                        </span>
                        <div
                            className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500"
                            aria-hidden="true"
                        >
                            <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
                                <Command className="w-3 h-3" />
                            </kbd>
                            <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
                                K
                            </kbd>
                        </div>
                    </button>
                </div>
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
                    <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3">
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
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedIndex(0);
                            }}
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
                            onClick={handleClose}
                            aria-label="Close command palette"
                            className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

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
                                    <div key={groupName} role="group" aria-label={groupName}>
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
                    <div
                        className="border-t border-neutral-200 dark:border-neutral-700 px-4 py-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-secondary bg-neutral-50/50 dark:bg-neutral-900/30"
                        aria-hidden="true"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <ArrowUp className="w-3 h-3" />
                                <ArrowDown className="w-3 h-3" />
                                <span>navigate</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CornerDownLeft className="w-3 h-3" />
                                <span>select</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
                                    esc
                                </kbd>
                                <span>close</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

CommandBox.displayName = "CommandBox";

// ============================================================================
// Exports
// ============================================================================

export { CommandBox };

export type {
    CommandBoxProps,
    CommandBoxSize,
    CommandBoxVariant,
    CommandGroup,
    CommandItem,
};
