"use client";

import { clsx } from "clsx";
import {
    Check,
    ChevronsUpDown,
    Loader2,
    Search,
    X,
} from "lucide-react";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types & Interfaces
// ============================================================================

type ComboboxVariant = "default" | "outline" | "filled" | "ghost";
type ComboboxSize = "sm" | "md" | "lg";

interface ComboboxOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: string;
    group?: string;
}

interface BaseComboboxProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    options: ComboboxOption[];
    placeholder?: string;
    size?: ComboboxSize;
    variant?: ComboboxVariant;
    disabled?: boolean;
    error?: boolean;
    errorText?: string;
    label?: string;
    required?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    dropdownClassName?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    searchPlaceholder?: string;
}

interface SingleComboboxProps extends BaseComboboxProps {
    multiple?: false;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    defaultValue?: string | number;
    maxSelected?: never;
}

interface MultiComboboxProps extends BaseComboboxProps {
    multiple: true;
    value?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
    defaultValue?: (string | number)[];
    maxSelected?: number;
}

type ComboboxProps = SingleComboboxProps | MultiComboboxProps;

// ============================================================================
// Config
// ============================================================================

const sizeClasses: Record<
    ComboboxSize,
    {
        trigger: string;
        tag: string;
        icon: string;
        search: string;
        option: string;
    }
> = {
    sm: {
        trigger: "px-3 py-1.5 text-sm min-h-[32px]",
        tag: "px-2 py-0.5 text-xs",
        icon: "w-4 h-4",
        search: "px-3 py-2 text-sm",
        option: "px-3 py-2 text-sm",
    },
    md: {
        trigger: "px-4 py-2.5 text-base min-h-[40px]",
        tag: "px-2 py-1 text-sm",
        icon: "w-5 h-5",
        search: "px-4 py-2.5 text-base",
        option: "px-4 py-2.5 text-base",
    },
    lg: {
        trigger: "px-5 py-3 text-lg min-h-[48px]",
        tag: "px-3 py-1.5 text-base",
        icon: "w-6 h-6",
        search: "px-5 py-3 text-lg",
        option: "px-5 py-3 text-lg",
    },
};

const variantClasses: Record<ComboboxVariant, string> = {
    default: clsx(
        "border-2 border-neutral-300 dark:border-neutral-700",
        "bg-white dark:bg-neutral-900",
        "hover:border-neutral-400 dark:hover:border-neutral-600"
    ),
    outline: clsx(
        "border-2 border-primary-500 dark:border-primary-400",
        "bg-transparent",
        "hover:bg-primary-50 dark:hover:bg-primary-900/10"
    ),
    filled: clsx(
        "border-2 border-transparent",
        "bg-neutral-100 dark:bg-neutral-800",
        "hover:bg-neutral-200 dark:hover:bg-neutral-700"
    ),
    ghost: clsx(
        "border-2 border-transparent",
        "bg-transparent",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800"
    ),
};

// ============================================================================
// Combobox Component
// ============================================================================

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
    (
        {
            options = [],
            placeholder = "Select...",
            size = "md",
            variant = "default",
            disabled = false,
            error = false,
            errorText,
            label,
            required = false,
            searchable = true,
            clearable = false,
            loading = false,
            className,
            dropdownClassName,
            noOptionsMessage = "No options found",
            loadingMessage = "Loading...",
            searchPlaceholder = "Search...",
            multiple = false,
            value,
            onChange,
            defaultValue,
            maxSelected,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState<
            (string | number)[] | string | number | null
        >(
            multiple
                ? (defaultValue as (string | number)[]) || []
                : (defaultValue as string | number) || null
        );
        const [isOpen, setIsOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const [highlightedIndex, setHighlightedIndex] = useState(0);
        const [mounted, setMounted] = useState(false);
        const [dropdownPosition, setDropdownPosition] = useState({
            top: 0,
            left: 0,
            width: 0,
        });

        const uniqueId = useId();
        const labelId = `${uniqueId}-label`;
        const listboxId = `${uniqueId}-listbox`;
        const errorId = `${uniqueId}-error`;
        const triggerId = `${uniqueId}-trigger`;

        const comboboxRef = useRef<HTMLDivElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const searchInputRef = useRef<HTMLInputElement>(null);
        const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

        useEffect(() => {
            setMounted(true);
        }, []);

        const currentValue = value !== undefined ? value : internalValue;

        const handleValueChange = useCallback(
            (newValue: (string | number)[] | string | number | null) => {
                if (value === undefined) {
                    setInternalValue(newValue);
                }
                if (multiple) {
                    (onChange as MultiComboboxProps["onChange"])?.(
                        newValue as (string | number)[]
                    );
                } else {
                    (onChange as SingleComboboxProps["onChange"])?.(
                        newValue as string | number | null
                    );
                }
            },
            [value, multiple, onChange]
        );

        // Filter options
        const filteredOptions = useMemo(() => {
            if (!searchQuery) return options;
            return options.filter((option) =>
                option.label
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        }, [options, searchQuery]);

        // Flat selectable options for keyboard nav
        const flatOptions = useMemo(
            () => filteredOptions.filter((option) => !option.disabled),
            [filteredOptions]
        );

        // Group options
        const groupedOptions = useMemo(() => {
            const groups: Record<string, ComboboxOption[]> = {};
            const ungrouped: ComboboxOption[] = [];

            filteredOptions.forEach((option) => {
                if (option.group) {
                    if (!groups[option.group]) groups[option.group] = [];
                    groups[option.group].push(option);
                } else {
                    ungrouped.push(option);
                }
            });

            return { groups, ungrouped };
        }, [filteredOptions]);

        // Selected options
        const selectedOptions = useMemo(() => {
            if (multiple) {
                const values = currentValue as (string | number)[];
                return options.filter((opt) => values.includes(opt.value));
            }
            return options.filter((opt) => opt.value === currentValue);
        }, [currentValue, options, multiple]);

        // Check if an option is selected
        const isSelected = useCallback(
            (optionValue: string | number) => {
                if (multiple) {
                    return (currentValue as (string | number)[]).includes(
                        optionValue
                    );
                }
                return currentValue === optionValue;
            },
            [currentValue, multiple]
        );

        // Update dropdown position
        useEffect(() => {
            if (isOpen && comboboxRef.current) {
                const rect = comboboxRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                const dropdownHeight = 320;

                let top = rect.bottom + window.scrollY + 4;
                if (spaceBelow < dropdownHeight && rect.top > spaceBelow) {
                    top =
                        rect.top + window.scrollY - dropdownHeight - 4;
                }

                setDropdownPosition({
                    top,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                });
            }
        }, [isOpen]);

        // Close on outside click
        useEffect(() => {
            if (!isOpen) return;

            const handleClickOutside = (e: MouseEvent) => {
                if (
                    comboboxRef.current &&
                    !comboboxRef.current.contains(e.target as Node) &&
                    dropdownRef.current &&
                    !dropdownRef.current.contains(e.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener(
                    "mousedown",
                    handleClickOutside
                );
        }, [isOpen]);

        // Focus search on open
        useEffect(() => {
            if (isOpen && searchable && searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, [isOpen, searchable]);

        // Scroll highlighted into view
        useEffect(() => {
            if (isOpen && optionRefs.current[highlightedIndex]) {
                optionRefs.current[highlightedIndex]?.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                });
            }
        }, [highlightedIndex, isOpen]);

        // Handlers
        const handleSelect = useCallback(
            (option: ComboboxOption) => {
                if (option.disabled) return;

                if (multiple) {
                    const values = currentValue as (string | number)[];
                    if (values.includes(option.value)) {
                        handleValueChange(
                            values.filter((v) => v !== option.value)
                        );
                    } else {
                        if (maxSelected && values.length >= maxSelected)
                            return;
                        handleValueChange([...values, option.value]);
                    }
                } else {
                    handleValueChange(option.value);
                    setIsOpen(false);
                }
            },
            [multiple, currentValue, handleValueChange, maxSelected]
        );

        const handleClear = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation();
                handleValueChange(multiple ? [] : null);
                setSearchQuery("");
            },
            [handleValueChange, multiple]
        );

        const handleRemoveTag = useCallback(
            (e: React.MouseEvent, tagValue: string | number) => {
                e.stopPropagation();
                if (multiple) {
                    const values = currentValue as (string | number)[];
                    handleValueChange(
                        values.filter((v) => v !== tagValue)
                    );
                }
            },
            [multiple, currentValue, handleValueChange]
        );

        // Keyboard navigation
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!isOpen) {
                    if (
                        (e.key === "Enter" ||
                            e.key === " " ||
                            e.key === "ArrowDown") &&
                        document.activeElement ===
                        comboboxRef.current?.querySelector("button")
                    ) {
                        e.preventDefault();
                        setIsOpen(true);
                    }
                    return;
                }

                switch (e.key) {
                    case "ArrowDown":
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                            prev < flatOptions.length - 1 ? prev + 1 : 0
                        );
                        break;
                    case "ArrowUp":
                        e.preventDefault();
                        setHighlightedIndex((prev) =>
                            prev > 0 ? prev - 1 : flatOptions.length - 1
                        );
                        break;
                    case "Enter":
                        e.preventDefault();
                        if (flatOptions[highlightedIndex]) {
                            handleSelect(flatOptions[highlightedIndex]);
                        }
                        break;
                    case "Escape":
                        e.preventDefault();
                        setIsOpen(false);
                        break;
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [isOpen, highlightedIndex, flatOptions, handleSelect]);

        // Active descendant
        const activeOptionId =
            flatOptions[highlightedIndex]?.value !== undefined
                ? `${uniqueId}-option-${flatOptions[highlightedIndex].value}`
                : undefined;

        // ---- Option renderer (shared) ----
        const renderOption = (
            option: ComboboxOption,
            globalIndex: number
        ) => {
            const optionId = `${uniqueId}-option-${option.value}`;
            const selected = isSelected(option.value);
            const highlighted = highlightedIndex === globalIndex;

            return (
                <div
                    key={option.value}
                    id={optionId}
                    ref={(el) => {
                        optionRefs.current[globalIndex] = el;
                    }}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    onClick={() => handleSelect(option)}
                    className={clsx(
                        sizeClasses[size].option,
                        "flex items-center justify-between gap-2 cursor-pointer font-secondary",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        !option.disabled &&
                        highlighted &&
                        "bg-primary-50 dark:bg-primary-900/20",
                        !option.disabled &&
                        !highlighted &&
                        selected &&
                        "bg-primary-100 dark:bg-primary-900/30",
                        !option.disabled &&
                        !highlighted &&
                        !selected &&
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {option.icon && (
                            <span className="flex-shrink-0" aria-hidden="true">
                                {option.icon}
                            </span>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="text-neutral-900 dark:text-white truncate">
                                {option.label}
                            </div>
                            {option.description && (
                                <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                    {option.description}
                                </div>
                            )}
                        </div>
                    </div>
                    {selected && (
                        <Check
                            className={clsx(
                                sizeClasses[size].icon,
                                "text-primary-600 dark:text-primary-400 flex-shrink-0"
                            )}
                            aria-hidden="true"
                        />
                    )}
                </div>
            );
        };

        // ---- Trigger content ----
        const renderTriggerContent = () => {
            if (selectedOptions.length === 0) {
                return (
                    <span className="text-neutral-400 dark:text-neutral-500">
                        {placeholder}
                    </span>
                );
            }

            if (multiple) {
                return (
                    <div className="flex flex-wrap gap-1">
                        {selectedOptions.map((option) => (
                            <span
                                key={option.value}
                                className={clsx(
                                    sizeClasses[size].tag,
                                    "inline-flex items-center gap-1",
                                    "bg-primary-100 dark:bg-primary-900/30",
                                    "text-primary-700 dark:text-primary-300",
                                    "rounded-md font-secondary font-medium"
                                )}
                            >
                                {option.label}
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        handleRemoveTag(e, option.value)
                                    }
                                    aria-label={`Remove ${option.label}`}
                                    className="hover:text-error-600 dark:hover:text-error-400"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                );
            }

            return (
                <span className="text-neutral-900 dark:text-white">
                    {selectedOptions[0]?.label}
                </span>
            );
        };

        // ---- Dropdown ----
        const renderDropdown = () => {
            if (!mounted || !isOpen) return null;

            let globalIndex = 0;

            return createPortal(
                <div
                    ref={dropdownRef}
                    id={listboxId}
                    role="listbox"
                    aria-label={label || placeholder}
                    aria-multiselectable={multiple || undefined}
                    className={clsx(
                        "fixed z-50",
                        "bg-white dark:bg-neutral-900",
                        "border-2 border-neutral-200 dark:border-neutral-800",
                        "rounded-lg shadow-xl",
                        "max-h-80 overflow-y-auto",
                        dropdownClassName
                    )}
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`,
                    }}
                >
                    {/* Search */}
                    {searchable && (
                        <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-800 p-2">
                            <div className="relative">
                                <Search
                                    className={clsx(
                                        "absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500",
                                        sizeClasses[size].icon
                                    )}
                                    aria-hidden="true"
                                />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setHighlightedIndex(0);
                                    }}
                                    placeholder={searchPlaceholder}
                                    aria-label="Search options"
                                    aria-controls={listboxId}
                                    aria-activedescendant={activeOptionId}
                                    className={clsx(
                                        sizeClasses[size].search,
                                        "w-full pl-10",
                                        "bg-neutral-50 dark:bg-neutral-800",
                                        "border-2 border-neutral-200 dark:border-neutral-700",
                                        "rounded-md",
                                        "text-neutral-900 dark:text-white",
                                        "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                                        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                                        "font-secondary"
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Options */}
                    <div className="py-1">
                        {loading ? (
                            <div
                                className={clsx(
                                    sizeClasses[size].option,
                                    "flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400"
                                )}
                                role="status"
                            >
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="font-secondary">
                                    {loadingMessage}
                                </span>
                            </div>
                        ) : filteredOptions.length === 0 ? (
                            <div
                                className={clsx(
                                    sizeClasses[size].option,
                                    "text-neutral-500 dark:text-neutral-400 text-center font-secondary"
                                )}
                                role="status"
                            >
                                {noOptionsMessage}
                            </div>
                        ) : (
                            <>
                                {groupedOptions.ungrouped.map((option) => {
                                    const idx = globalIndex++;
                                    return renderOption(option, idx);
                                })}

                                {Object.entries(
                                    groupedOptions.groups
                                ).map(([group, groupOpts]) => (
                                    <div
                                        key={group}
                                        role="group"
                                        aria-label={group}
                                    >
                                        <div
                                            className="px-4 py-2 text-xs font-secondary font-semibold text-neutral-500 dark:text-neutral-400 uppercase"
                                            aria-hidden="true"
                                        >
                                            {group}
                                        </div>
                                        {groupOpts.map((option) => {
                                            const idx = globalIndex++;
                                            return renderOption(
                                                option,
                                                idx
                                            );
                                        })}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>,
                document.body
            );
        };

        return (
            <div
                ref={ref}
                className={clsx("w-full", className)}
                {...props}
            >
                {/* Label */}
                {label && (
                    <label
                        id={labelId}
                        className="block font-primary text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2"
                    >
                        {label}
                        {required && (
                            <span
                                className="text-error-500 ml-1"
                                aria-hidden="true"
                            >
                                *
                            </span>
                        )}
                    </label>
                )}

                <div ref={comboboxRef} className="relative">
                    <button
                        id={triggerId}
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-controls={isOpen ? listboxId : undefined}
                        aria-labelledby={label ? labelId : undefined}
                        aria-describedby={
                            error && errorText ? errorId : undefined
                        }
                        aria-invalid={error || undefined}
                        aria-required={required || undefined}
                        className={clsx(
                            sizeClasses[size].trigger,
                            variantClasses[variant],
                            error
                                ? "border-error-500 dark:border-error-400 focus-within:ring-error-500 dark:focus-within:ring-error-400"
                                : "focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-400",
                            "w-full flex items-center justify-between gap-2",
                            "rounded-md transition-all duration-200",
                            "text-neutral-900 dark:text-white font-secondary",
                            disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        )}
                    >
                        <div className="flex-1 text-left overflow-hidden">
                            {renderTriggerContent()}
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                            {clearable &&
                                selectedOptions.length > 0 &&
                                !disabled && (
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={handleClear}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                handleClear(
                                                    e as unknown as React.MouseEvent
                                                );
                                            }
                                        }}
                                        aria-label="Clear selection"
                                        className="cursor-pointer"
                                    >
                                        <X
                                            className={clsx(
                                                sizeClasses[size].icon,
                                                "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                                            )}
                                        />
                                    </span>
                                )}
                            {loading ? (
                                <Loader2
                                    className={clsx(
                                        sizeClasses[size].icon,
                                        "text-neutral-400 dark:text-neutral-500 animate-spin"
                                    )}
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronsUpDown
                                    className={clsx(
                                        sizeClasses[size].icon,
                                        "text-neutral-400 dark:text-neutral-500"
                                    )}
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    </button>

                    {renderDropdown()}
                </div>

                {/* Error */}
                {error && errorText && (
                    <p
                        id={errorId}
                        role="alert"
                        className="text-xs font-secondary text-error-500 dark:text-error-400 mt-1"
                    >
                        {errorText}
                    </p>
                )}
            </div>
        );
    }
);

Combobox.displayName = "Combobox";

// ============================================================================
// Exports
// ============================================================================

export { Combobox };

export type {
    ComboboxOption,
    ComboboxProps,
    ComboboxSize,
    ComboboxVariant,
};
