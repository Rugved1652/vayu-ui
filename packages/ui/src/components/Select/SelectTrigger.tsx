// trigger.tsx
// UI: Select trigger with search input and multi-value chips

'use client';

import React, { useRef, useEffect, forwardRef } from 'react';
import { ChevronDown, X, Loader2, Search } from 'lucide-react';
import { cn } from '../../utils';
import { useSelect } from './Select';
import type { SelectTriggerProps, SingleValue, MultiValue } from './types';
import {
  inputBaseStyles,
  inputGapStyles,
  inputSizeStyles,
  inputControlSizeStyles,
  inputTextStyles,
  getInputControlStateStyles,
  inputLoadingAria,
} from '../../utils/input-styles';

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ placeholder, className, showSearchIcon = false, size: sizeProp }, ref) => {
    const {
      open,
      setOpen,
      validationState,
      disabled,
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
    const chipPadding = size === 'sm' ? 'px-1' : 'px-1.5';
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
      if (disabled) return;
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
        onClick={() => {
          if (disabled) return;
          setOpen(true);
          inputRef.current?.focus({ preventScroll: true });
        }}
        className={cn(
          inputBaseStyles,
          inputGapStyles,
          inputControlSizeStyles[size],
          inputTextStyles,
          multiple && [inputSizeStyles[size], 'h-auto'],
          'outline-none',
          !disabled && 'cursor-text',
          getInputControlStateStyles(
            validationState,
            Boolean(open || selectedLabel || selectedArray.length > 0),
            disabled,
          ),
          className,
        )}
        aria-disabled={disabled}
        aria-invalid={validationState === 'error'}
        aria-busy={isLoading}
      >
        <div className="relative flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {showSelectedLabel && <span className="min-w-0 flex-1 truncate">{selectedLabel}</span>}
          {multiple &&
            selectedArray.map((val) => (
              <span
                key={val}
                className={cn(
                  'flex h-5 max-w-full items-center gap-1 bg-muted/50 border border-border rounded',
                  chipPadding,
                  chipTextSize,
                )}
              >
                <span className="truncate">{getLabel(val)}</span>
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={`Remove ${getLabel(val) ?? val}`}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(val);
                  }}
                  className="shrink-0 enabled:hover:bg-destructive/20 disabled:cursor-not-allowed rounded-sm p-0.5 -mr-1"
                >
                  <X className={chipIconSize} />
                </button>
              </span>
            ))}
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={open ? `${id}-listbox` : undefined}
            aria-autocomplete="list"
            aria-invalid={validationState === 'error'}
            disabled={disabled}
            value={search}
            onChange={(e) => {
              if (disabled) return;
              setSearch(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              if (!disabled && !isProgrammaticFocus.current) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={selectedArray.length > 0 ? '' : showSelectedLabel ? '' : placeholder}
            className={cn(
              inputTextStyles,
              'flex-1 bg-transparent outline-none min-w-[20px] disabled:cursor-not-allowed',
              showSelectedLabel && 'sr-only min-w-0',
            )}
          />
        </div>
        {isLoading ? (
          <Loader2
            className={cn('text-brand animate-spin shrink-0 ml-auto', iconSize)}
            {...inputLoadingAria}
          />
        ) : onSearch && showSearchIcon ? (
          <Search className={cn('text-muted-content ml-auto shrink-0', iconSize)} />
        ) : (
          <ChevronDown
            className={cn(
              'text-muted-content transition-transform ml-auto shrink-0',
              iconSize,
              open && 'rotate-180',
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (disabled) return;
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
