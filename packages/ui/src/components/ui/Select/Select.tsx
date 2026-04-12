// select.tsx
// Composition: Context, useSelect hook, Root

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  useMemo,
} from 'react';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useKeyPress } from '../../../hooks/useKeyPress';
import type {
  SelectContextValue,
  SelectRootProps,
  SelectValue,
  SingleValue,
  MultiValue,
  OptionData,
} from './types';

// ============================================================================
// Context
// ============================================================================

export const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within Select.Root');
  }
  return context;
};

// ============================================================================
// Root
// ============================================================================

export const SelectRoot: React.FC<SelectRootProps> = ({
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
  createText = 'Create option',
  validateCreate,
}) => {
  const getDefault = () => {
    if (multiple) return defaultValue ?? [];
    return defaultValue;
  };

  const [internalValue, setInternalValue] = useState<SelectValue>(getDefault);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
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
    const isNew = !optionsMap.current.has(option.value);
    optionsMap.current.set(option.value, option);
    if (isNew) setOptionCount((c) => c + 1);
  }, []);

  const unregisterOption = useCallback((val: SingleValue) => {
    optionsMap.current.delete(val);
    setOptionCount((c) => c - 1);
  }, []);

  const handleValueChange = (newValue: SingleValue) => {
    let newResult: SelectValue;

    if (multiple) {
      const currentArray = (Array.isArray(value) ? value : []) as MultiValue;
      const exists = currentArray.includes(newValue);
      newResult = exists ? currentArray.filter((v) => v !== newValue) : [...currentArray, newValue];
      setSearch('');
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

  const performAsyncSearch = useCallback(
    async (searchValue: string) => {
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
        setSearchError(err instanceof Error ? err.message : 'Search failed');
        setAsyncOptions([]);
      } finally {
        setIsSearchLoadingInternal(false);
      }
    },
    [onSearch, minSearchLength],
  );

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
    const selectedLabel =
      !multiple && value !== undefined
        ? optionsMap.current.get(value as SingleValue)?.label
        : undefined;
    const searchIsSelectedLabel =
      !!search && !!selectedLabel && search.toLowerCase() === selectedLabel.toLowerCase();
    if (!search || searchIsSelectedLabel) return Array.from(optionsMap.current.values());
    return Array.from(optionsMap.current.values()).filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [onSearch, asyncOptions, search, multiple, value]);

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
  }, [
    onSearch,
    isSearchLoading,
    search,
    minSearchLength,
    asyncOptions,
    hasSearched,
    filteredOptions,
    optionCount,
  ]);

  const showCreateOption = useMemo(() => {
    if (!creatable || !search.trim()) return false;
    const existsInFiltered = filteredOptions.some(
      (opt) => opt.label.toLowerCase() === search.toLowerCase(),
    );
    const existsInSelected =
      multiple &&
      Array.isArray(value) &&
      value.some((v) => {
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
      if (result === false) {
        setCreateError('Invalid input');
        return;
      }
      if (typeof result === 'string') {
        setCreateError(result);
        return;
      }
    }

    setIsCreatingInternal(true);
    setCreateError(null);

    try {
      const newOption = await onCreateOption(search.trim());
      if (newOption) {
        registerOption(newOption);
        handleValueChange(newOption.value);
        if (multiple) setSearch('');
      }
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create option');
    } finally {
      setIsCreatingInternal(false);
    }
  }, [onCreateOption, search, validateCreate, registerOption, handleValueChange, multiple]);

  // Sync search based on open/close state
  useEffect(() => {
    if (open) {
      setSearch('');
    } else if (!multiple && value !== undefined) {
      const label = optionsMap.current.get(value as SingleValue)?.label || String(value);
      setSearch(label);
    } else {
      setSearch('');
    }
  }, [open]);

  // Lock body scroll when dropdown is open
  useLockBodyScroll(open);

  // Close dropdown on outside click
  useOnClickOutside(
    [containerRef as React.RefObject<HTMLElement>, contentRef as React.RefObject<HTMLElement>],
    useCallback(() => {
      if (!open) return;
      setOpen(false);
      if (!multiple && value !== undefined) {
        const label = optionsMap.current.get(value as SingleValue)?.label || String(value);
        setSearch(label);
      } else {
        setSearch('');
      }
    }, [open, value, multiple]),
  );

  // Close dropdown on Escape key
  useKeyPress(
    'Escape',
    useCallback(() => {
      if (!open) return;
      setOpen(false);
      if (!multiple && value !== undefined) {
        const label = optionsMap.current.get(value as SingleValue)?.label || String(value);
        setSearch(label);
      } else {
        setSearch('');
      }
    }, [open, value, multiple]),
  );

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        label,
        error,
        triggerRef,
        contentRef,
        inputRef,
        focusInput,
        isProgrammaticFocus,
        id,
        multiple,
        search,
        setSearch,
        registerOption,
        unregisterOption,
        optionsMap,
        removeValue,
        onSearch,
        searchDebounce,
        minSearchLength,
        isLoading: isLoadingExternal,
        asyncOptions,
        setAsyncOptions,
        isSearchLoading,
        setIsSearchLoading: setIsSearchLoadingInternal,
        searchError,
        setSearchError,
        creatable,
        onCreateOption,
        isCreating: isCreatingExternal,
        createText,
        validateCreate,
        isCreatingInternal,
        setIsCreatingInternal,
        createError,
        setCreateError,
        showCreateOption,
        handleCreateOption,
        filteredOptions,
        hasOptions,
        hasSearched,
        optionCount,
      }}
    >
      <div ref={containerRef} className={clsx('relative space-y-1.5', className)}>
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

SelectRoot.displayName = 'Select.Root';
