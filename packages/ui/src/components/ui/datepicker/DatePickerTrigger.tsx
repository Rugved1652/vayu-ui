// trigger.tsx
// UI: DatePicker trigger button

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useDatePicker, useMergeRefs } from './DatePicker';
import { formatDate } from './utils';
import { CalendarIcon } from './DatePickerIcons';
import type { DatePickerTriggerProps } from './types';

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ placeholder = 'Select date', className, disabled, ...props }, ref) => {
    const {
      selectedDate,
      selectedRange,
      mode,
      open,
      setOpen,
      disabled: contextDisabled,
      triggerRef,
    } = useDatePicker();

    const isDisabled = disabled ?? contextDisabled;

    const getDisplayValue = (): string => {
      if (mode === 'range' && selectedRange) {
        if (selectedRange.startDate && selectedRange.endDate) {
          const start = formatDate(selectedRange.startDate, 'MMM D, YYYY');
          const end = formatDate(selectedRange.endDate, 'MMM D, YYYY');
          return `${start} - ${end}`;
        }
        if (selectedRange.startDate) {
          return formatDate(selectedRange.startDate, 'MMM D, YYYY') + ' - Select end';
        }
        return placeholder;
      }
      if (mode === 'single' && selectedDate) {
        return formatDate(selectedDate, 'MMM D, YYYY');
      }
      return placeholder;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!open);
      }
    };

    const mergedRefs = useMergeRefs(triggerRef, ref);

    return (
      <button
        ref={mergedRefs}
        type="button"
        disabled={isDisabled}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full min-w-50 flex items-center justify-between gap-2',
          'px-3 py-2.5 text-left font-secondary',
          'bg-surface border rounded-control',
          'transition-colors duration-150',
          open ? 'border-focus ring-2 ring-focus/20' : 'border-field hover:border-muted-content',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-field',
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...props}
      >
        <span
          className={cn(
            'truncate',
            selectedDate || selectedRange?.startDate
              ? 'text-surface-content'
              : 'text-muted-content',
          )}
        >
          {getDisplayValue()}
        </span>
        <CalendarIcon className="w-4 h-4 text-muted-content shrink-0" />
      </button>
    );
  },
);

DatePickerTrigger.displayName = 'DatePicker.Trigger';
