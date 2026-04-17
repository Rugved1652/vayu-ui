// CommandBoxInput.tsx
// Search input with ARIA combobox role + keyboard handlers

'use client';

import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';

import { useCommandBox } from './hooks';
import type { CommandBoxInputProps } from './types';

export const CommandBoxInput = forwardRef<HTMLInputElement, CommandBoxInputProps>(
  ({ placeholder = 'Type a command or search...', icon, className, ...props }, ref) => {
    const {
      open,
      inputId,
      listboxId,
      searchQuery,
      setSearchQuery,
      filteredItems,
      highlightedIndex,
      setHighlightedIndex,
      highlightedId,
      onSelect,
      inputRef,
      listRef,
    } = useCommandBox();

    const localRef = useRef<HTMLInputElement | null>(null);
    const enabledItems = useMemo(() => filteredItems.filter((item) => !item.disabled), [filteredItems]);

    // Merge refs
    useEffect(() => {
      if (localRef.current) {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = localRef.current;
        if (typeof ref === 'function') ref(localRef.current);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = localRef.current;
      }
    }, [localRef.current, ref, inputRef]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (enabledItems.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev: number) =>
            prev < enabledItems.length - 1 ? prev + 1 : 0,
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev: number) =>
            prev > 0 ? prev - 1 : enabledItems.length - 1,
          );
          break;

        case 'Enter':
          e.preventDefault();
          if (enabledItems[highlightedIndex]) {
            onSelect(enabledItems[highlightedIndex]);
          }
          break;

        case 'Home':
          e.preventDefault();
          setHighlightedIndex(0);
          break;

        case 'End':
          e.preventDefault();
          setHighlightedIndex(enabledItems.length - 1);
          break;
      }
    };

    // Scroll highlighted item into view
    useEffect(() => {
      if (!open || highlightedId === null || !listRef.current) return;

      const el = listRef.current.querySelector(`[data-item-id="${highlightedId}"]`);
      if (el) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, [highlightedId, open, listRef]);

    return (
      <div
        className={clsx(
          'flex items-center gap-3 px-4 py-3',
          'bg-elevated',
          'border-b border-border',
          className,
        )}
      >
        {icon ?? <Search className="w-5 h-5 text-muted-content shrink-0" aria-hidden="true" />}
        <input
          ref={localRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={highlightedId ? `commandbox-item-${highlightedId}` : undefined}
          aria-autocomplete="list"
          aria-label="Search commands"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={clsx(
            'flex-1 bg-transparent outline-none',
            'text-elevated-content placeholder:text-muted-content',
            'text-sm font-secondary',
          )}
          {...props}
        />
      </div>
    );
  },
);

CommandBoxInput.displayName = 'CommandBox.Input';
