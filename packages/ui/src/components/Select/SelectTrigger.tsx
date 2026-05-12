// trigger.tsx
// UI: Select trigger with search input and multi-value chips

'use client';

import React, { useRef, useEffect, forwardRef } from 'react';
import { ChevronDown, X, Loader2, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { useSelect } from './Select';
import type { SelectTriggerProps, SingleValue, MultiValue } from './types';
import {
  inputBaseStyles,
  inputGapStyles,
  inputSizeStyles,
  inputBorderStyles,
  inputHoverBorder,
  inputDisabledStyles,
  inputLoadingSpinnerStyles,
  inputLoadingAria,
} from '../../utils/input-styles';

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ placeholder, className, showSearchIcon = false, size: sizeProp }, ref) => {
    const {
      open,
      setOpen,
      error,
      validationState,
      size: ctxSize,
      triggerRef,
      id,
      multiple,
      search,
      setSearch,
      value,
      optionsMap,
      removeValue,
      contentRef,
      inputRef,
      isProgrammaticFocus,
      onSearch,
      isSearchLoading,
      isCreating,
    } = useSelect();

    const size = sizeProp ?? ctxSize;

    const isLoading = isSearchLoading || isCreating;
    const localTriggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (localTriggerRef.current && triggerRef) {
        // eslint-disable-next-line react-hooks/immutability
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          localTriggerRef.current;
      }
    }, [triggerRef]);

    useEffect(() => {
      if (localTriggerRef.current && ref) {
        if (typeof ref === 'function') ref(localTriggerRef.current);
        else
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = localTriggerRef.current;
      }
    }, [ref]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (open) setOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!open) setOpen(true);
        const firstItem = contentRef.current?.querySelector(
          '[role="option"]:not([data-disabled="true"])',
        ) as HTMLElement;
        firstItem?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!open) setOpen(true);
        const items = contentRef.current?.querySelectorAll(
          '[role="option"]:not([data-disabled="true"])',
        );
        if (items && items.length > 0) (items[items.length - 1] as HTMLElement).focus();
      } else if (e.key === 'Enter') {
        setOpen(true);
      } else if (e.key === 'Backspace' && multiple && search === '') {
        const currentArray = (Array.isArray(value) ? value : []) as MultiValue;
        if (currentArray.length > 0) removeValue(currentArray[currentArray.length - 1]);
      } else if (e.key === 'Tab' && open) {
        e.preventDefault();
        const items = contentRef.current?.querySelectorAll(
          '[role="option"]:not([data-disabled="true"])',
        );
        if (items && items.length > 0) {
          if (e.shiftKey) (items[items.length - 1] as HTMLElement).focus();
          else (items[0] as HTMLElement).focus();
        }
      }
    };

    const getLabel = (val: SingleValue) => optionsMap.current.get(val)?.label;
    const selectedArray = (multiple ? value || [] : []) as MultiValue;
    const selectedLabel = !multiple && value !== undefined ? getLabel(value as SingleValue) : null;
    const showSelectedLabel = !open && selectedLabel;

    return (
      <div
        ref={localTriggerRef}
        onClick={() => inputRef.current?.focus()}
        className={clsx(
          inputBaseStyles,
          inputGapStyles,
          inputSizeStyles[size],
          validationState !== 'default'
            ? inputBorderStyles[validationState]
            : open || selectedLabel || selectedArray.length > 0
              ? 'border-brand'
              : clsx(inputBorderStyles['default'], inputHoverBorder),
          inputDisabledStyles,
          'flex-wrap cursor-text outline-none',
          className,
        )}
        aria-invalid={validationState === 'error'}
        aria-busy={isLoading}
      >
        {showSelectedLabel && (
          <span className="truncate">{selectedLabel}</span>
        )}
        {multiple &&
          selectedArray.map((val) => (
            <span
              key={val}
              className="flex items-center gap-1 bg-muted/50 border border-border px-1.5 py-0.5 rounded text-xs"
            >
              {getLabel(val)}
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(val);
                }}
                className="hover:bg-destructive/20 rounded-sm p-0.5 -mr-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (!isProgrammaticFocus.current) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={selectedArray.length > 0 ? '' : showSelectedLabel ? '' : placeholder}
          className={clsx(
            'flex-1 bg-transparent outline-none min-w-[20px]',
            multiple && selectedArray.length > 0 && 'py-0.5',
            showSelectedLabel && 'absolute opacity-0 w-0 min-w-0',
          )}
        />
        {isLoading ? (
          <Loader2 className={clsx(inputLoadingSpinnerStyles, 'ml-auto')} {...inputLoadingAria} />
        ) : onSearch && showSearchIcon ? (
          <Search className="w-4 h-4 text-muted-content ml-auto shrink-0" />
        ) : (
          <ChevronDown
            className={clsx(
              'w-4 h-4 text-muted-content transition-transform ml-auto shrink-0',
              open && 'rotate-180',
            )}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
              inputRef.current?.focus();
            }}
          />
        )}
      </div>
    );
  },
);

SelectTrigger.displayName = 'Select.Trigger';
