"use client";

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    forwardRef,
    ReactNode,
    useId,
    useCallback,
    useMemo,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, AlertCircle, X, Loader2, Plus, Search } from "lucide-react";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

type SingleValue = string | number;
type MultiValue = (string | number)[];
type SelectValue = SingleValue | MultiValue | undefined;

interface OptionData {
    value: SingleValue;
    label: string;
    disabled?: boolean;
    data?: Record<string, unknown>;
}

interface AsyncSearchProps {
    onSearch?: (searchValue: string) => Promise<OptionData[]>;
    searchDebounce?: number;
    minSearchLength?: number;
    isLoading?: boolean;
}

interface CreateableProps {
    creatable?: boolean;
    onCreateOption?: (inputValue: string) => Promise<OptionData | null>;
    isCreating?: boolean;
    createText?: string;
    validateCreate?: (inputValue: string) => boolean | string;
}

// ============================================================================
// Context
// ============================================================================

interface SelectContextValue extends AsyncSearchProps, CreateableProps {
    value: SelectValue;
    onValueChange: (value: SingleValue) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    label?: string;
    error?: string;
    triggerRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    focusInput: () => void;
    isProgrammaticFocus: React.MutableRefObject<boolean>;
    id: string;
    multiple: boolean;
    search: string;
    setSearch: (search: string) => void;
    registerOption: (option: OptionData) => void;
    unregisterOption: (value: SingleValue) => void;
    optionsMap: React.MutableRefObject<Map<SingleValue, OptionData>>;
    removeValue: (value: SingleValue) => void;
    asyncOptions: OptionData[];
    setAsyncOptions: (options: OptionData[]) => void;
    isSearchLoading: boolean;
    setIsSearchLoading: (loading: boolean) => void;
    searchError: string | null;
    setSearchError: (error: string | null) => void;
    isCreatingInternal: boolean;
    setIsCreatingInternal: (creating: boolean) => void;
    createError: string | null;
    setCreateError: (error: string | null) => void;
    showCreateOption: boolean;
    handleCreateOption: () => Promise<void>;
    filteredOptions: OptionData[];
    hasOptions: boolean;
    hasSearched: boolean;
    optionCount: number;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

const useSelect = () => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error("Select compound components must be used within Select.Root");
    }
    return context;
};

// ============================================================================
// Root
// ============================================================================

interface SelectRootProps extends AsyncSearchProps, CreateableProps {
    children: ReactNode;
    value?: SelectValue;
    defaultValue?: SelectValue;
    onValueChange?: (value: SelectValue) => void;
    label?: string;
    error?: string;
    className?: string;
    multiple?: boolean;
}

const SelectRoot: React.FC<SelectRootProps> = ({
    children,
    value: controlledValue,
    defaultValue,
    onValueChange,
    label,
    error,
    className,
    multiple = false,
    onSearch,
    searchDebounce = 300,
    minSearchLength = 1,
    isLoading: isLoadingExternal,
    creatable = false,
    onCreateOption,
    isCreating: isCreatingExternal,
    createText = "Create option",
    validateCreate,
}) => {
    const getDefault = () => {
        if (multiple) return defaultValue ?? [];
        return defaultValue;
    };

    const [internalValue, setInternalValue] = useState<SelectValue>(getDefault);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [asyncOptions, setAsyncOptions] = useState<OptionData[]>([]);
    const [isSearchLoadingInternal, setIsSearchLoadingInternal] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [isCreatingInternal, setIsCreatingInternal] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [optionCount, setOptionCount] = useState(0);

    const optionsMap = useRef(new Map<SingleValue, OptionData>());
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isProgrammaticFocus = useRef(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const id = useId();
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const isSearchLoading = isLoadingExternal ?? isSearchLoadingInternal;
    const isCreating = isCreatingExternal ?? isCreatingInternal;

    const focusInput = useCallback(() => {
        isProgrammaticFocus.current = true;
        inputRef.current?.focus();
        requestAnimationFrame(() => {
            isProgrammaticFocus.current = false;
        });
    }, []);

    const registerOption = useCallback((option: OptionData) => {
        optionsMap.current.set(option.value, option);
        setOptionCount(c => c + 1);
    }, []);

    const unregisterOption = useCallback((val: SingleValue) => {
        optionsMap.current.delete(val);
        setOptionCount(c => c - 1);
    }, []);

    const handleValueChange = (newValue: SingleValue) => {
        let newResult: SelectValue;

        if (multiple) {
            const currentArray = (Array.isArray(value) ? value : []) as MultiValue;
            const exists = currentArray.includes(newValue);
            newResult = exists
                ? currentArray.filter((v) => v !== newValue)
                : [...currentArray, newValue];
            setSearch("");
        } else {
            newResult = newValue;
            setOpen(false);
            const label = optionsMap.current.get(newValue)?.label || String(newValue);
            setSearch(label);
        }

        if (!isControlled) setInternalValue(newResult);
        onValueChange?.(newResult);
    };

    const removeValue = (val: SingleValue) => {
        const currentArray = (Array.isArray(value) ? value : []) as MultiValue;
        const newResult = currentArray.filter((v) => v !== val);
        if (!isControlled) setInternalValue(newResult);
        onValueChange?.(newResult);
    };

    const performAsyncSearch = useCallback(async (searchValue: string) => {
        if (!onSearch) return;
        if (searchValue.length < minSearchLength) {
            setAsyncOptions([]);
            setSearchError(null);
            return;
        }

        setIsSearchLoadingInternal(true);
        setSearchError(null);
        setHasSearched(true);

        try {
            const results = await onSearch(searchValue);
            setAsyncOptions(results);
        } catch (err) {
            setSearchError(err instanceof Error ? err.message : "Search failed");
            setAsyncOptions([]);
        } finally {
            setIsSearchLoadingInternal(false);
        }
    }, [onSearch, minSearchLength]);

    useEffect(() => {
        if (!onSearch || !open) return;
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => performAsyncSearch(search), searchDebounce);
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, [search, open, performAsyncSearch, searchDebounce, onSearch]);

    useEffect(() => {
        if (!open && onSearch) {
            setAsyncOptions([]);
            setSearchError(null);
            setHasSearched(false);
        }
    }, [open, onSearch]);

    const filteredOptions = useMemo(() => {
        if (onSearch) return asyncOptions;
        if (!search) return Array.from(optionsMap.current.values());
        return Array.from(optionsMap.current.values()).filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [onSearch, asyncOptions, search]);

    const hasOptions = useMemo(() => {
        if (onSearch) {
            if (isSearchLoading) return true;
            if (search.length < minSearchLength) return true;
            if (asyncOptions.length > 0) return true;
            if (!hasSearched) return true;
            return false;
        }
        if (!search) return optionCount > 0;
        return filteredOptions.length > 0;
    }, [onSearch, isSearchLoading, search, minSearchLength, asyncOptions, hasSearched, filteredOptions, optionCount]);

    const showCreateOption = useMemo(() => {
        if (!creatable || !search.trim()) return false;
        const existsInFiltered = filteredOptions.some(
            (opt) => opt.label.toLowerCase() === search.toLowerCase()
        );
        const existsInSelected = multiple && Array.isArray(value) && value.some((v) => {
            const opt = optionsMap.current.get(v);
            return opt?.label.toLowerCase() === search.toLowerCase();
        });
        if (existsInFiltered || existsInSelected) return false;
        if (validateCreate) {
            const result = validateCreate(search);
            if (result === false) return false;
        }
        return true;
    }, [creatable, search, filteredOptions, value, multiple, validateCreate]);

    const handleCreateOption = useCallback(async () => {
        if (!onCreateOption || !search.trim()) return;
        if (validateCreate) {
            const result = validateCreate(search);
            if (result === false) { setCreateError("Invalid input"); return; }
            if (typeof result === "string") { setCreateError(result); return; }
        }

        setIsCreatingInternal(true);
        setCreateError(null);

        try {
            const newOption = await onCreateOption(search.trim());
            if (newOption) {
                registerOption(newOption);
                handleValueChange(newOption.value);
                if (multiple) setSearch("");
            }
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Failed to create option");
        } finally {
            setIsCreatingInternal(false);
        }
    }, [onCreateOption, search, validateCreate, registerOption, handleValueChange, multiple]);

    useEffect(() => {
        if (!multiple && value !== undefined) {
            const label = optionsMap.current.get(value as SingleValue)?.label || String(value);
            setSearch(label);
        } else if (!multiple && value === undefined) {
            setSearch("");
        }
    }, [value, multiple]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!containerRef.current) return;
            const isInsideTrigger = triggerRef.current?.contains(target);
            const isInsideContent = contentRef.current?.contains(target);
            if (!isInsideTrigger && !isInsideContent) {
                setOpen(false);
                if (!multiple && value !== undefined) {
                    const label = optionsMap.current.get(value as SingleValue)?.label || String(value);
                    setSearch(label);
                } else {
                    setSearch("");
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, value, multiple]);

    return (
        <SelectContext.Provider
            value={{
                value, onValueChange: handleValueChange, open, setOpen, label, error,
                triggerRef, contentRef, inputRef, focusInput, isProgrammaticFocus,
                id, multiple, search, setSearch, registerOption, unregisterOption,
                optionsMap, removeValue,
                onSearch, searchDebounce, minSearchLength, isLoading: isLoadingExternal,
                asyncOptions, setAsyncOptions, isSearchLoading, setIsSearchLoading: setIsSearchLoadingInternal,
                searchError, setSearchError,
                creatable, onCreateOption, isCreating: isCreatingExternal, createText, validateCreate,
                isCreatingInternal, setIsCreatingInternal, createError, setCreateError,
                showCreateOption, handleCreateOption, filteredOptions, hasOptions, hasSearched, optionCount,
            }}
        >
            <div ref={containerRef} className={clsx("relative space-y-1.5", className)}>
                {label && (
                    <label htmlFor={id} className="block text-xs font-medium text-muted-content">
                        {label}
                    </label>
                )}
                {children}
                {error && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </p>
                )}
            </div>
        </SelectContext.Provider>
    );
};

SelectRoot.displayName = "Select.Root";

// ============================================================================
// Trigger
// ============================================================================

interface SelectTriggerProps {
    placeholder?: string;
    className?: string;
    showSearchIcon?: boolean;
}

const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
    ({ placeholder, className, showSearchIcon = false }, ref) => {
        const {
            open, setOpen, error, triggerRef, id, multiple,
            search, setSearch, value, optionsMap, removeValue, contentRef, inputRef,
            isProgrammaticFocus, onSearch, isSearchLoading, isCreating,
        } = useSelect();

        const isLoading = isSearchLoading || isCreating;
        const localTriggerRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            if (localTriggerRef.current && triggerRef) {
                // eslint-disable-next-line react-hooks/immutability
                (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = localTriggerRef.current;
            }
        }, [triggerRef]);

        useEffect(() => {
            if (localTriggerRef.current && ref) {
                if (typeof ref === "function") ref(localTriggerRef.current);
                else (ref as React.MutableRefObject<HTMLDivElement | null>).current = localTriggerRef.current;
            }
        }, [ref]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Escape") {
                e.preventDefault();
                if (open) setOpen(false);
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!open) setOpen(true);
                const firstItem = contentRef.current?.querySelector('[role="option"]:not([data-disabled="true"])') as HTMLElement;
                firstItem?.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!open) setOpen(true);
                const items = contentRef.current?.querySelectorAll('[role="option"]:not([data-disabled="true"])');
                if (items && items.length > 0) (items[items.length - 1] as HTMLElement).focus();
            } else if (e.key === "Enter") {
                setOpen(true);
            } else if (e.key === "Backspace" && multiple && search === "") {
                const currentArray = (Array.isArray(value) ? value : []) as MultiValue;
                if (currentArray.length > 0) removeValue(currentArray[currentArray.length - 1]);
            } else if (e.key === "Tab" && open) {
                e.preventDefault();
                const items = contentRef.current?.querySelectorAll('[role="option"]:not([data-disabled="true"])');
                if (items && items.length > 0) {
                    if (e.shiftKey) (items[items.length - 1] as HTMLElement).focus();
                    else (items[0] as HTMLElement).focus();
                }
            }
        };

        const getLabel = (val: SingleValue) => optionsMap.current.get(val)?.label || String(val);
        const selectedArray = (multiple ? (value || []) : []) as MultiValue;

        return (
            <div
                ref={localTriggerRef}
                onClick={() => inputRef.current?.focus()}
                className={clsx(
                    "w-full flex flex-wrap items-center gap-1.5 px-3 py-2 text-sm rounded-control bg-surface border transition-all outline-none cursor-text",
                    error
                        ? "border-destructive focus-within:ring-2 focus-within:ring-destructive"
                        : "border-field focus-within:border-focus focus-within:ring-2 focus-within:ring-focus",
                    open && !error && "border-focus ring-2 ring-focus",
                    "text-surface-content placeholder:text-muted-content",
                    "focus-within:ring-offset-2 focus-within:ring-offset-canvas",
                    className
                )}
            >
                {multiple && selectedArray.map((val) => (
                    <span key={val} className="flex items-center gap-1 bg-muted/50 border border-border px-1.5 py-0.5 rounded text-xs">
                        {getLabel(val)}
                        <button type="button" onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); removeValue(val); }}
                            className="hover:bg-destructive/20 rounded-sm p-0.5 -mr-1">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); if (!open) setOpen(true); }}
                    onFocus={() => { if (!isProgrammaticFocus.current) setOpen(true); }}
                    onKeyDown={handleKeyDown}
                    placeholder={selectedArray.length > 0 ? "" : placeholder}
                    className={clsx("flex-1 bg-transparent outline-none min-w-[20px]", multiple && selectedArray.length > 0 && "py-0.5")}
                />
                {isLoading ? (
                    <Loader2 className="w-4 h-4 text-muted-content animate-spin ml-auto shrink-0" />
                ) : onSearch && showSearchIcon ? (
                    <Search className="w-4 h-4 text-muted-content ml-auto shrink-0" />
                ) : (
                    <ChevronDown
                        className={clsx("w-4 h-4 text-muted-content transition-transform ml-auto shrink-0", open && "rotate-180")}
                        onClick={(e) => { e.stopPropagation(); setOpen(!open); inputRef.current?.focus(); }}
                    />
                )}
            </div>
        );
    }
);

SelectTrigger.displayName = "Select.Trigger";

// ============================================================================
// Content
// ============================================================================

interface SelectContentProps {
    children?: ReactNode;
    className?: string;
}

const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
    const { open, triggerRef, contentRef } = useSelect();

    useLayoutEffect(() => {
        if (!open || !triggerRef.current || !contentRef.current) return;

        const trigger = triggerRef.current;
        const content = contentRef.current;

        const updatePosition = () => {
            if (!trigger || !content) return;
            const rect = trigger.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const contentHeight = content.offsetHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            let top = rect.bottom + 6;
            if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
                top = rect.top - contentHeight - 6;
            }
            content.style.top = `${top}px`;
            content.style.left = `${rect.left}px`;
            content.style.width = `${rect.width}px`;
        };

        updatePosition();

        const handleScroll = (event: Event) => {
            if (content.contains(event.target as Node)) return;
            requestAnimationFrame(updatePosition);
        };

        const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updatePosition));
        resizeObserver.observe(trigger);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", handleScroll, true);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [open, triggerRef, contentRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={contentRef}
            role="listbox"
            className={clsx(
                "fixed z-50 overflow-hidden rounded-overlay border border-border bg-elevated shadow-elevated animate-in fade-in-0 zoom-in-95",
                className
            )}
        >
            <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">{children}</div>
        </div>,
        document.body
    );
};

SelectContent.displayName = "Select.Content";

// ============================================================================
// Item
// ============================================================================

interface SelectItemProps {
    value: string | number;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value: itemValue, children, className, disabled, ...props }, ref) => {
        const { value, onValueChange, setOpen, multiple, search, registerOption, unregisterOption, focusInput, onSearch } = useSelect();

        const isSelected = multiple ? Array.isArray(value) && value.includes(itemValue) : value === itemValue;
        const label = typeof children === 'string' ? children : String(itemValue);

        useEffect(() => {
            registerOption({ value: itemValue, label, disabled });
            return () => unregisterOption(itemValue);
        }, [itemValue, label, disabled, registerOption, unregisterOption]);

        if (!onSearch && search) {
            const contentString = typeof children === 'string' ? children : '';
            if (!contentString.toLowerCase().includes(search.toLowerCase())) return null;
        }

        const handleSelect = () => {
            if (disabled) return;
            onValueChange(itemValue);
            if (!multiple) { setOpen(false); focusInput(); }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const list = e.currentTarget.parentElement;
                if (!list) return;
                const items = Array.from(list.querySelectorAll('[role="option"]:not([data-disabled="true"])')) as HTMLElement[];
                const currentIndex = items.indexOf(e.currentTarget as HTMLElement);
                if (e.key === "ArrowDown") (items[currentIndex + 1] || items[0])?.focus();
                else (items[currentIndex - 1] || items[items.length - 1])?.focus();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect();
            } else if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
                focusInput();
            } else if (e.key === "Tab") {
                e.preventDefault();
                const list = e.currentTarget.parentElement;
                if (!list) return;
                const items = Array.from(list.querySelectorAll('[role="option"]:not([data-disabled="true"])')) as HTMLElement[];
                const currentIndex = items.indexOf(e.currentTarget as HTMLElement);
                if (e.shiftKey) currentIndex === 0 ? focusInput() : items[currentIndex - 1]?.focus();
                else currentIndex === items.length - 1 ? focusInput() : items[currentIndex + 1]?.focus();
            }
        };

        return (
            <div
                ref={ref}
                role="option"
                tabIndex={0}
                aria-selected={isSelected}
                data-disabled={disabled}
                onClick={handleSelect}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                    isSelected
                        ? "bg-brand/90 text-brand-content font-medium"
                        : "text-elevated-content bg-elevated hover:text-brand-content focus:text-brand-content hover:bg-brand/90 focus:bg-brand/90",
                    disabled && "pointer-events-none opacity-50",
                    className
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && <Check className="h-4 w-4" />}
                </span>
                <span className="block truncate">{children}</span>
            </div>
        );
    }
);

SelectItem.displayName = "Select.Item";

// ============================================================================
// Compound Components
// ============================================================================

interface SelectLoadingProps { children?: ReactNode; className?: string; }
const SelectLoading: React.FC<SelectLoadingProps> = ({ children, className }) => {
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

interface SelectNotFoundProps { children?: ReactNode; className?: string; }
const SelectNotFound: React.FC<SelectNotFoundProps> = ({ children, className }) => {
    const { hasOptions, showCreateOption, isSearchLoading } = useSelect();
    if (isSearchLoading || hasOptions || showCreateOption) return null;
    return (
        <div className={clsx("py-6 text-center text-muted-content text-sm", className)}>
            {children || "No results found"}
        </div>
    );
};
SelectNotFound.displayName = "Select.NotFound";

interface SelectSearchHintProps { children?: ReactNode; className?: string; }
const SelectSearchHint: React.FC<SelectSearchHintProps> = ({ children, className }) => {
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

interface SelectCreateButtonProps { children?: ReactNode; className?: string; }
const SelectCreateButton: React.FC<SelectCreateButtonProps> = ({ children, className }) => {
    const { showCreateOption, handleCreateOption, isCreating, search, createText = "Create option" } = useSelect();
    if (!showCreateOption) return null;
    return (
        <div
            role="option"
            aria-selected={false}
            tabIndex={0}
            onClick={handleCreateOption}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCreateOption(); } }}
            className={clsx(
                "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                "text-elevated-content bg-elevated hover:text-brand-content focus:text-brand-content hover:bg-brand/90 focus:bg-brand/90",
                isCreating && "opacity-50 pointer-events-none",
                className
            )}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </span>
            <span className="block truncate">
                {children || (isCreating ? "Creating..." : `${createText} "${search}"`)}
            </span>
        </div>
    );
};
SelectCreateButton.displayName = "Select.CreateButton";

interface SelectErrorProps { type?: 'search' | 'create'; children?: ReactNode; className?: string; }
const SelectError: React.FC<SelectErrorProps> = ({ type = 'search', children, className }) => {
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

interface SelectFooterProps { children?: ReactNode; className?: string; }
const SelectFooter: React.FC<SelectFooterProps> = ({ children, className }) => {
    if (!children) return null;
    return (
        <div className={clsx("px-2 py-1.5 border-t border-border text-xs text-muted-content", className)}>
            {children}
        </div>
    );
};
SelectFooter.displayName = "Select.Footer";

interface SelectAsyncOptionsProps { className?: string; }
const SelectAsyncOptions: React.FC<SelectAsyncOptionsProps> = ({ className }) => {
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

interface SelectListProps { children?: ReactNode; className?: string; }
const SelectList: React.FC<SelectListProps> = ({ children, className }) => {
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

// ============================================================================
// Exports
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

export type {
    SelectRootProps, SelectTriggerProps, SelectContentProps, SelectItemProps,
    SelectLoadingProps, SelectNotFoundProps, SelectSearchHintProps,
    SelectCreateButtonProps, SelectErrorProps, SelectFooterProps,
    SelectAsyncOptionsProps, SelectListProps,
    OptionData, SelectValue, SingleValue, MultiValue, AsyncSearchProps, CreateableProps
};