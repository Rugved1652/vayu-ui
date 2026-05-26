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

    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const chipIconSize = size === 'sm' ? 'w-3 h-3' : 'w-3 h-3';
    const chipPadding = size === 'sm' ? 'px-1 py-0.5' : 'px-1.5 py-0.5';
    const chipTextSize = size === 'sm' ? 'text-xs' : 'text-xs';

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
        firstItem?.focus({ preventScroll: true });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!open) setOpen(true);
        const items = contentRef.current?.querySelectorAll(
          '[role="option"]:not([data-disabled="true"])',
        );
        if (items && items.length > 0)
          (items[items.length - 1] as HTMLElement).focus({ preventScroll: true });
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
          if (e.shiftKey) (items[items.length - 1] as HTMLElement).focus({ preventScroll: true });
          else (items[0] as HTMLElement).focus({ preventScroll: true });
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
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
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
        {showSelectedLabel && <span className="truncate">{selectedLabel}</span>}
        {multiple &&
          selectedArray.map((val) => (
            <span
              key={val}
              className={clsx(
                'flex items-center gap-1 bg-muted/50 border border-border rounded',
                chipPadding,
                chipTextSize,
              )}
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
                <X className={chipIconSize} />
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
          <Loader2 className={clsx('text-brand animate-spin shrink-0 ml-auto', iconSize)} {...inputLoadingAria} />
        ) : onSearch && showSearchIcon ? (
          <Search className={clsx('text-muted-content ml-auto shrink-0', iconSize)} />
        ) : (
          <ChevronDown
            className={clsx(
              'text-muted-content transition-transform ml-auto shrink-0',
              iconSize,
              open && 'rotate-180',
            )}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
              inputRef.current?.focus({ preventScroll: true });
            }}
          />
        )}
      </div>
    );
  },
);

SelectTrigger.displayName = 'Select.Trigger';
