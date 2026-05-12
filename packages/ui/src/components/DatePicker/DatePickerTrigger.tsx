// trigger.tsx
// UI: DatePicker trigger button

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import { useDatePicker, useMergeRefs } from './DatePicker';
import { formatDate } from './utils';
import { CalendarIcon } from './DatePickerIcons';
import type { DatePickerTriggerProps } from './types';
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
import { Loader2 } from 'lucide-react';

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ placeholder = 'Select date', className, disabled, size: sizeProp, ...props }, ref) => {
    const {
      selectedDate,
      selectedRange,
      mode,
      open,
      setOpen,
      disabled: contextDisabled,
      validationState,
      size: ctxSize,
      loading,
      triggerRef,
    } = useDatePicker();

    const size = sizeProp ?? ctxSize;
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
          inputBaseStyles,
          inputGapStyles,
          inputSizeStyles[size],
          'justify-between text-left',
          validationState !== 'default'
            ? inputBorderStyles[validationState]
            : open || selectedDate || selectedRange?.startDate
              ? 'border-brand'
              : cn(inputBorderStyles['default'], inputHoverBorder),
          inputHoverBorder,
          inputDisabledStyles,
          'focus-visible:outline-none',
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={validationState === 'error'}
        aria-busy={loading}
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
        {loading ? (
          <Loader2 className={inputLoadingSpinnerStyles} {...inputLoadingAria} />
        ) : (
          <CalendarIcon className="w-4 h-4 text-muted-content shrink-0" />
        )}
      </button>
    );
  },
);

DatePickerTrigger.displayName = 'DatePicker.Trigger';
