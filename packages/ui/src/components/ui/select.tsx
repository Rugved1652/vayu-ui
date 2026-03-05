"use client";
import {
    AlertCircle,
    Check,
    ChevronDown,
    Loader2,
    Plus,
    Search,
    X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: string;
    group?: string;
}

type SelectSize = "sm" | "md" | "lg";
type SelectVariant = "default" | "outline" | "filled";

interface BaseSelectProps {
    options: SelectOption[];
    placeholder?: string;
    size?: SelectSize;
    variant?: SelectVariant;
    disabled?: boolean;
    error?: boolean;
    errorText?: string;
    label?: string;
    required?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    className?: string;
    dropdownClassName?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    createMessage?: string;
}

interface SingleSelectProps extends BaseSelectProps {
    multiple?: false;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    defaultValue?: string | number;
}

interface MultiSelectProps extends BaseSelectProps {
    multiple: true;
    value?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
    defaultValue?: (string | number)[];
    maxSelected?: number;
}

interface CreatableSelectProps {
    creatable?: boolean;
    onCreateOption?: (inputValue: string) => void | Promise<void>;
}

interface AsyncSelectProps {
    async?: boolean;
    loadOptions?: (inputValue: string) => Promise<SelectOption[]>;
    debounceDelay?: number;
}

type SelectProps = (SingleSelectProps | MultiSelectProps) &
    CreatableSelectProps &
    AsyncSelectProps;

const Select: React.FC<SelectProps> = ({
    options: initialOptions = [],
    placeholder = "Select...",
    size = "md",
    variant = "default",
    disabled = false,
    error = false,
    errorText,
    label,
    required = false,
    searchable = false,
    clearable = false,
    loading = false,
    className = "",
    dropdownClassName = "",
    noOptionsMessage = "No options found",
    loadingMessage = "Loading...",
    createMessage = "Create",
    multiple = false,
    value,
    onChange,
    defaultValue,
    creatable = false,
    onCreateOption,
    async = false,
    loadOptions,
    debounceDelay = 300,
    // @ts-ignore
    maxSelected,
}) => {
    const [internalValue, setInternalValue] = useState<
        (string | number)[] | string | number | null
    >(
        multiple
            ? (defaultValue as (string | number)[]) || []
            : (defaultValue as string | number) || null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>([]);
    const [isLoadingAsync, setIsLoadingAsync] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const debounceTimerRef = useRef<NodeJS.Timeout>(undefined);

    // Controlled value handling
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (
        newValue: (string | number)[] | string | number | null
    ) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        if (multiple) {
            (onChange as MultiSelectProps["onChange"])?.(
                newValue as (string | number)[]
            );
        } else {
            (onChange as SingleSelectProps["onChange"])?.(
                newValue as string | number | null
            );
        }
    };

    const options = async ? asyncOptions : initialOptions;

    const filteredOptions = useMemo(() => {
        if (!searchQuery) return options;
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [options, searchQuery]);

    const flatOptions = useMemo(() => {
        return filteredOptions.filter((option) => !option.disabled);
    }, [filteredOptions]);

    const groupedOptions = useMemo(() => {
        const groups: { [key: string]: SelectOption[] } = {};
        const ungrouped: SelectOption[] = [];

        filteredOptions.forEach((option) => {
            if (option.group) {
                if (!groups[option.group]) {
                    groups[option.group] = [];
                }
                groups[option.group].push(option);
            } else {
                ungrouped.push(option);
            }
        });
        return { groups, ungrouped };
    }, [filteredOptions]);

    const selectedOptions = useMemo(() => {
        if (multiple) {
            const values = currentValue as (string | number)[];
            return options.filter((opt) => values.includes(opt.value));
        } else {
            return options.filter((opt) => opt.value === currentValue);
        }
    }, [currentValue, options, multiple]);

    // Async search
    useEffect(() => {
        if (!async || !loadOptions || !isOpen) return;

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(async () => {
            setIsLoadingAsync(true);
            try {
                const newOptions = await loadOptions(searchQuery);
                setAsyncOptions(newOptions);
            } catch (error) {
                console.error("Error loading options:", error);
            } finally {
                setIsLoadingAsync(false);
            }
        }, debounceDelay);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery, async, loadOptions, debounceDelay, isOpen]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && optionRefs.current[highlightedIndex]) {
            optionRefs.current[highlightedIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [highlightedIndex, isOpen]);

    // Unified KeyDown Handler
    // Attached directly to the container and input to intercept events before bubbling
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // If disabled, ignore all input
        if (disabled) return;

        // Handle Enter to Open when closed
        if (!isOpen) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault();
                e.stopPropagation(); // Stop form submission
                setIsOpen(true);
            }
            return;
        }

        // Navigation when Open
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                e.stopPropagation();
                setHighlightedIndex((prev) => {
                    const nextIndex = prev + 1;
                    return nextIndex >= flatOptions.length ? 0 : nextIndex;
                });
                break;

            case "ArrowUp":
                e.preventDefault();
                e.stopPropagation();
                setHighlightedIndex((prev) => {
                    const nextIndex = prev - 1;
                    return nextIndex < 0 ? flatOptions.length - 1 : nextIndex;
                });
                break;

            case "Enter":
                e.preventDefault(); // Crucial: Stop form submit
                e.stopPropagation(); // Crucial: Stop bubbling to RHF Controller

                if (flatOptions[highlightedIndex]) {
                    handleSelect(flatOptions[highlightedIndex]);
                } else if (creatable && searchQuery && onCreateOption) {
                    handleCreate();
                }
                break;

            case "Escape":
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                containerRef.current?.focus();
                break;

            case "Tab":
                setIsOpen(false);
                break;

            case " ":
                // If typing in search, don't select
                if (searchable && document.activeElement === searchInputRef.current) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (flatOptions[highlightedIndex]) {
                    handleSelect(flatOptions[highlightedIndex]);
                }
                break;

            case "Home":
                e.preventDefault();
                e.stopPropagation();
                setHighlightedIndex(0);
                break;

            case "End":
                e.preventDefault();
                e.stopPropagation();
                setHighlightedIndex(flatOptions.length - 1);
                break;
        }
    };

    // Focus search input when opened
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            // Small timeout ensures the DOM is ready if transitioning
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 0);
        }
    }, [isOpen, searchable]);

    // Reset highlighted index
    useEffect(() => {
        setHighlightedIndex(0);
    }, [filteredOptions]);

    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return;

        if (multiple) {
            const values = currentValue as (string | number)[];
            const isSelected = values.includes(option.value);

            if (isSelected) {
                handleValueChange(values.filter((v) => v !== option.value));
            } else {
                if (maxSelected && values.length >= maxSelected) {
                    return;
                }
                handleValueChange([...values, option.value]);
            }
            // Keep focus on input if multiple
            if (searchable) searchInputRef.current?.focus();
        } else {
            handleValueChange(option.value);
            setIsOpen(false);
            setSearchQuery("");
            containerRef.current?.focus();
        }
    };

    const handleRemove = (optionValue: string | number, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (multiple) {
            const values = currentValue as (string | number)[];
            handleValueChange(values.filter((v) => v !== optionValue));
        } else {
            handleValueChange(null);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleValueChange(multiple ? [] : null);
        setSearchQuery("");
    };

    const handleCreate = async () => {
        if (!onCreateOption || !searchQuery.trim()) return;
        try {
            await onCreateOption(searchQuery.trim());
            setSearchQuery("");
        } catch (error) {
            console.error("Error creating option:", error);
        }
    };

    const sizeConfig = {
        sm: {
            select: "px-3 py-1.5 text-sm",
            option: "px-3 py-1.5 text-sm",
            icon: "w-4 h-4",
            badge: "px-1.5 py-0.5 text-xs",
        },
        md: {
            select: "px-4 py-2 text-base",
            option: "px-4 py-2 text-base",
            icon: "w-5 h-5",
            badge: "px-2 py-0.5 text-sm",
        },
        lg: {
            select: "px-5 py-3 text-lg",
            option: "px-5 py-3 text-lg",
            icon: "w-6 h-6",
            badge: "px-2.5 py-1 text-base",
        },
    };

    const config = sizeConfig[size];

    const variantStyles = {
        default: {
            select: `bg-white dark:bg-ground-800 border-2 ${error
                ? "border-error-500 dark:border-error-600"
                : "border-ground-300 dark:border-ground-700"
                } focus-within:border-primary-500 dark:focus-within:border-primary-600`,
            dropdown:
                "bg-white dark:bg-ground-900 border-2 border-ground-200 dark:border-ground-800",
        },
        outline: {
            select: `bg-neutral-100 dark:bg-neutral-700 border-2 ${error
                ? "border-error-500 dark:border-error-600"
                : "border-neutral-300 dark:border-neutral-700"
                } focus-within:border-primary-500 dark:focus-within:border-primary-600`,
            dropdown:
                "bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800",
        },
        filled: {
            select: `bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent ${error ? "border-error-500 dark:border-error-600" : ""
                } focus-within:border-primary-500 dark:focus-within:border-primary-600`,
            dropdown:
                "bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800",
        },
    };

    const styles = variantStyles[variant];

    const isSelected = (optionValue: string | number) => {
        if (multiple) {
            return (currentValue as (string | number)[]).includes(optionValue);
        }
        return currentValue === optionValue;
    };

    const isHighlighted = (option: SelectOption) => {
        if (flatOptions.length === 0) return false;
        return flatOptions[highlightedIndex]?.value === option.value;
    };

    const renderValue = () => {
        if (multiple) {
            const values = currentValue as (string | number)[];
            if (values.length === 0) {
                return (
                    <span className="text-neutral-500 dark:text-neutral-400 font-secondary">
                        {placeholder}
                    </span>
                );
            }
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedOptions.map((option) => (
                        <span
                            key={option.value}
                            className={`
                ${config.badge} inline-flex items-center gap-1
                bg-primary-100 dark:bg-primary-900/30
                text-primary-700 dark:text-primary-300
                rounded-sm font-secondary font-medium
              `}
                        >
                            {/* @ts-ignore */}
                            {option.icon && <span className="w-3 h-3">{option.icon}</span>}
                            {option.label}
                            <button
                                onClick={(e) => handleRemove(option.value, e)}
                                className="hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                                disabled={disabled}
                            >
                                {/* @ts-ignore */}
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            );
        } else {
            const selected = selectedOptions[0];
            if (!selected) {
                return (
                    <span className="text-neutral-500 dark:text-neutral-400 font-secondary">
                        {placeholder}
                    </span>
                );
            }
            return (
                <span className="flex items-center gap-2 font-secondary text-neutral-900 dark:text-white">
                    {selected.icon && (
                        <span className={config.icon}>{selected.icon}</span>
                    )}
                    {selected.label}
                </span>
            );
        }
    };

    const renderOptions = () => {
        if (loading || isLoadingAsync) {
            return (
                <div
                    className={`${config.option} flex items-center justify-center gap-2 text-ground-500 dark:text-ground-400 font-secondary`}
                >
                    {/* @ts-ignore */}
                    <Loader2 className={`${config.icon} animate-spin`} />
                    {loadingMessage}
                </div>
            );
        }

        if (filteredOptions.length === 0) {
            return (
                <div className="p-8 text-center">
                    {/* @ts-ignore */}
                    <AlertCircle className="w-8 h-8 text-ground-400 dark:text-ground-600 mx-auto mb-2" />
                    <p className="text-ground-500 dark:text-ground-400 font-secondary text-sm mb-3">
                        {noOptionsMessage}
                    </p>
                    {creatable && searchQuery && onCreateOption && (
                        <button
                            onClick={handleCreate}
                            type="button"
                            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 font-secondary font-medium text-sm transition-colors flex items-center gap-2 mx-auto"
                        >
                            {/* @ts-ignore */}
                            <Plus className="w-4 h-4" />
                            {createMessage} "{searchQuery}"
                        </button>
                    )}
                </div>
            );
        }

        let refIndex = 0;

        return (
            <>
                {groupedOptions.ungrouped.map((option) => {
                    const currentRefIndex = refIndex++;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            ref={(el) => { optionRefs.current[currentRefIndex] = el; }}
                            onClick={() => handleSelect(option)}
                            disabled={option.disabled}
                            // Prevent losing focus from input during click
                            onMouseDown={(e) => e.preventDefault()}
                            className={`
                ${config.option} w-full text-left flex items-center justify-between gap-2
                transition-colors font-secondary
                ${isHighlighted(option)
                                    ? "bg-primary-100 dark:bg-primary-900/30"
                                    : "hover:bg-ground-50 dark:hover:bg-ground-800"
                                }
                ${isSelected(option.value)
                                    ? "text-primary-700 dark:text-primary-300 font-semibold"
                                    : "text-ground-900 dark:text-white"
                                }
                ${option.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }
              `}
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                {option.icon && (
                                    <span className={config.icon}>{option.icon}</span>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="truncate">{option.label}</div>
                                    {option.description && (
                                        <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                            {option.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isSelected(option.value) && (
                                <Check
                                    className={`${config.icon} text-primary-600 dark:text-primary-400 flex-shrink-0`}
                                />
                            )}
                        </button>
                    );
                })}

                {Object.entries(groupedOptions.groups).map(
                    ([groupName, groupOptions]) => (
                        <div key={groupName}>
                            <div className="px-4 py-2 text-xs font-secondary font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider bg-neutral-50 dark:bg-neutral-800/50">
                                {groupName}
                            </div>
                            {groupOptions.map((option) => {
                                const currentRefIndex = refIndex++;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        ref={(el) => { optionRefs.current[currentRefIndex] = el; }}
                                        onClick={() => handleSelect(option)}
                                        disabled={option.disabled}
                                        onMouseDown={(e) => e.preventDefault()}
                                        className={`
                    ${config.option} w-full text-left flex items-center justify-between gap-2
                    transition-colors font-secondary
                    ${isHighlighted(option)
                                                ? "bg-primary-100 dark:bg-primary-900/30"
                                                : "hover:bg-ground-50 dark:hover:bg-ground-800"
                                            }
                    ${isSelected(option.value)
                                                ? "text-primary-700 dark:text-primary-300 font-semibold"
                                                : "text-ground-900 dark:text-white"
                                            }
                    ${option.disabled
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }
                  `}
                                    >
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            {option.icon && (
                                                <span className={config.icon}>{option.icon}</span>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="truncate">{option.label}</div>
                                                {option.description && (
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                                        {option.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {isSelected(option.value) && (
                                            <Check
                                                className={`${config.icon} text-primary-600 dark:text-primary-400 flex-shrink-0`}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )
                )}

                {creatable &&
                    searchQuery &&
                    !filteredOptions.some(
                        (opt) => opt.label.toLowerCase() === searchQuery.toLowerCase()
                    ) &&
                    onCreateOption && (
                        <button
                            onClick={handleCreate}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            className={`
              ${config.option} w-full text-left flex items-center gap-2
              transition-colors font-secondary
              hover:bg-neutral-50 dark:hover:bg-neutral-800
              text-primary-600 dark:text-primary-400 font-medium
              border-t-2 border-neutral-200 dark:border-neutral-800
            `}
                        >
                            <Plus className={config.icon} />
                            {createMessage} "{searchQuery}"
                        </button>
                    )}
            </>
        );
    };

    const showClearButton =
        clearable &&
        !disabled &&
        ((multiple && (currentValue as (string | number)[]).length > 0) ||
            (!multiple && currentValue !== null));

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-secondary font-medium text-neutral-700 dark:text-neutral-300 mb-2 ">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </label>
            )}

            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                className={`
          ${config.select} ${styles.select}
          rounded-md cursor-pointer
          transition-all duration-200
          flex items-center gap-2 py-2.5
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                <div className="flex-1 min-w-0">{renderValue()}</div>

                <div className="flex items-center gap-1 flex-shrink-0">
                    {loading && (
                        <Loader2
                            className={`${config.icon} animate-spin text-neutral-400`}
                        />
                    )}
                    {showClearButton && (
                        <button
                            onClick={handleClear}
                            type="button"
                            className="p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                            aria-label="Clear selection"
                        >
                            {/* @ts-ignore */}
                            <X
                                className={`${config.icon} text-neutral-500 dark:text-neutral-400`}
                            />
                        </button>
                    )}
                    {/* @ts-ignore */}
                    <ChevronDown
                        className={`${config.icon} text-neutral-500 dark:text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </div>

            {error && errorText && (
                <p className="mt-1 text-sm font-secondary text-error-600 dark:text-error-400 flex items-center gap-1">
                    {/* @ts-ignore */}
                    <AlertCircle className="w-4 h-4" />
                    {errorText}
                </p>
            )}

            {multiple &&
                maxSelected &&
                (currentValue as (string | number)[]).length >= maxSelected && (
                    <p className="mt-1 text-sm font-secondary text-warning-600 dark:text-warning-400">
                        Maximum {maxSelected} options can be selected
                    </p>
                )}

            {/* Dropdown - Now Rendered Inline (No Portal) for Perfect Scroll Sync */}
            {isOpen && (
                <div
                    className={`
            ${styles.dropdown} ${dropdownClassName}
            absolute left-0 w-full mt-1 z-50
            rounded-lg shadow-2xl
            max-h-80 overflow-hidden
            animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200
          `}
                >
                    {searchable && (
                        <div className="p-3 border-b-2 border-ground-200 dark:border-ground-800">
                            <div className="relative">
                                {/* @ts-ignore */}
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ground-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown} // Forward KeyDown events
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-ground-50 dark:bg-ground-800 border-2 border-ground-200 dark:border-ground-700 rounded-md text-sm font-secondary text-ground-900 dark:text-white placeholder-ground-500 focus:outline-none focus:border-primary-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-h-64 overflow-y-auto">{renderOptions()}</div>

                    <div className="px-3 py-2 border-t-2 border-ground-200 dark:border-ground-800 bg-ground-50 dark:bg-ground-800/50">
                        <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                            Use ↑↓ arrows to navigate, Enter to select, Esc to close
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;
