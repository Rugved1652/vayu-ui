// CommandBox.tsx
// Root: context provider, state management, item registration, filtering

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { CommandBoxContext } from './hooks';
import { fuzzyScore } from './hooks';
import type { CommandBoxContextValue, CommandBoxItemData, CommandBoxRootProps } from './types';

const CommandBoxRoot = forwardRef<HTMLDivElement, CommandBoxRootProps>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      onSelect,
      filter: customFilter,
      showShortcuts = true,
      loading = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    const itemsMap = useRef(new Map<string, CommandBoxItemData>());
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const id = useId();
    const inputId = `commandbox-input-${id}`;
    const listboxId = `commandbox-listbox-${id}`;

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange],
    );

    // Item registration
    const registerItem = useCallback((item: CommandBoxItemData) => {
      itemsMap.current.set(item.id, item);
      setItemCount((c) => c + 1);
    }, []);

    const unregisterItem = useCallback((id: string) => {
      itemsMap.current.delete(id);
      setItemCount((c) => c - 1);
    }, []);

    // Filtered items
    const filteredItems = useMemo(() => {
      const items = Array.from(itemsMap.current.values());
      if (!searchQuery) return items;

      const filterFn =
        customFilter ||
        ((item: CommandBoxItemData, search: string) => {
          const titleScore = fuzzyScore(item.title, search);
          const descScore = item.description ? fuzzyScore(item.description, search) * 0.5 : 0;
          return Math.max(titleScore, descScore);
        });

      return items
        .map((item) => ({ item, score: filterFn(item, searchQuery) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item);
    }, [searchQuery, customFilter, itemCount]);

    // Highlighted ID
    const highlightedId = useMemo(() => {
      const enabledItems = filteredItems.filter((item) => !item.disabled);
      if (enabledItems.length === 0) return null;
      const index = Math.min(highlightedIndex, enabledItems.length - 1);
      return enabledItems[index]?.id ?? null;
    }, [filteredItems, highlightedIndex]);

    // Handle item selection
    const handleSelect = useCallback(
      (item: CommandBoxItemData) => {
        if (item.disabled) return;
        item.onSelect?.();
        onSelect?.(item);
        setOpen(false);
        setSearchQuery('');
      },
      [onSelect, setOpen],
    );

    // Reset highlighted index when search changes
    useEffect(() => {
      setHighlightedIndex(0);
    }, [searchQuery]);

    // Focus input when opened
    useEffect(() => {
      if (open) {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      } else {
        setSearchQuery('');
        setHighlightedIndex(0);
      }
    }, [open]);

    // Click outside to close
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (containerRef.current && !containerRef.current.contains(target)) {
          setOpen(false);
        }
      };

      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open, setOpen]);

    // Escape to close
    useEffect(() => {
      if (!open) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, setOpen]);

    const contextValue: CommandBoxContextValue = {
      open,
      setOpen,
      id,
      inputId,
      listboxId,
      searchQuery,
      setSearchQuery,
      registerItem,
      unregisterItem,
      itemsMap,
      filteredItems,
      highlightedIndex,
      setHighlightedIndex,
      highlightedId,
      onSelect: handleSelect,
      inputRef,
      listRef,
      containerRef,
      filter: customFilter ?? null,
      showShortcuts,
      loading,
    };

    return (
      <CommandBoxContext.Provider value={contextValue}>
        <div ref={ref} className={clsx('relative', className)} {...props}>
          {children}
        </div>
      </CommandBoxContext.Provider>
    );
  },
);

CommandBoxRoot.displayName = 'CommandBox';

export default CommandBoxRoot;
