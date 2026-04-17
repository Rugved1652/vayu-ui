// datepicker.tsx
// Composition: context, hooks, root component

'use client';

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  forwardRef,
  useCallback,
} from 'react';
import moment from 'moment';
import { cn } from '../../utils';
import { isSameDay } from './utils';
import type {
  DatePickerMode,
  DatePickerValue,
  DateRange,
  DatePickerContextValue,
  DatePickerRootProps,
} from './types';

// Context

const DatePickerContext = createContext<DatePickerContextValue | undefined>(undefined);

export const useDatePicker = (): DatePickerContextValue => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('DatePicker compound components must be used within DatePicker.Root');
  }
  return context;
};

// Hook: merge refs

export function useMergeRefs<T = unknown>(
  ...refs: Array<React.RefObject<T | null> | React.ForwardedRef<T> | undefined>
): React.RefCallback<T | null> {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.RefObject<T | null>).current = node;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}

// Root component

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(
  (
    {
      children,
      mode = 'single',
      value,
      defaultValue,
      onChange,
      disabled = false,
      disabledWeekdays = [],
      disabledDates = [],
      placeholder = 'Select date',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const parseDefaultValue = (): {
      date: Date | null;
      range: DateRange | null;
    } => {
      if (!defaultValue) return { date: null, range: null };
      if (mode === 'range' && 'startDate' in defaultValue) {
        return {
          date: null,
          range: defaultValue as DateRange,
        };
      }
      return {
        date: defaultValue as Date,
        range: null,
      };
    };

    const initial = parseDefaultValue();

    // State
    const [internalDate, setInternalDate] = useState<Date | null>(initial.date);
    const [internalRange, setInternalRange] = useState<DateRange | null>(initial.range);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [rangeHoverDate, setRangeHoverDate] = useState<Date | null>(null);
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

    // Refs
    const triggerRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Get current values
    const selectedDate = isControlled ? (mode === 'single' ? (value as Date) : null) : internalDate;
    const selectedRange = isControlled
      ? mode === 'range'
        ? (value as DateRange)
        : null
      : internalRange;

    // Handlers
    const setSelectedDate = (date: Date | null) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
    };

    const setSelectedRange = (range: DateRange | null) => {
      if (!isControlled) setInternalRange(range);
      onChange?.(range);
    };

    const handleClear = () => {
      if (mode === 'single') {
        setSelectedDate(null);
      } else {
        setSelectedRange(null);
      }
      setRangeHoverDate(null);
    };

    // Navigation handlers
    const goToMonth = (direction: 1 | -1) => {
      setCurrentDate((prev) => moment(prev).add(direction, 'month').toDate());
    };

    const goToYear = (direction: 1 | -1) => {
      setCurrentDate((prev) => moment(prev).add(direction, 'year').toDate());
    };

    const goToToday = () => {
      setCurrentDate(new Date());
      setFocusedDate(new Date());
    };

    const selectMonth = (month: number) => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setMonth(month);
        return next;
      });
      setMonthDropdownOpen(false);
    };

    const selectYear = (year: number) => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setFullYear(year);
        return next;
      });
      setYearDropdownOpen(false);
    };

    // Disabled check helper
    const isDateDisabled = (date: Date): boolean => {
      if (disabledWeekdays.includes(date.getDay())) return true;
      return disabledDates.some((d) => isSameDay(d, date));
    };

    // Scroll lock when open
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          triggerRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          setMonthDropdownOpen(false);
          setYearDropdownOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          if (monthDropdownOpen || yearDropdownOpen) {
            setMonthDropdownOpen(false);
            setYearDropdownOpen(false);
            return;
          }
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, monthDropdownOpen, yearDropdownOpen]);

    // Context value
    const contextValue: DatePickerContextValue = {
      mode,
      selectedDate,
      selectedRange,
      currentDate,
      open,
      setSelectedDate,
      setSelectedRange,
      setOpen,
      setCurrentDate,
      goToMonth,
      goToYear,
      goToToday,
      selectMonth,
      selectYear,
      disabled,
      disabledWeekdays,
      disabledDates,
      isDateDisabled,
      rangeHoverDate,
      setRangeHoverDate,
      focusedDate,
      setFocusedDate,
      monthDropdownOpen,
      setMonthDropdownOpen,
      yearDropdownOpen,
      setYearDropdownOpen,
      triggerRef,
      calendarRef,
      handleClear,
    };

    return (
      <DatePickerContext.Provider value={contextValue}>
        <div ref={ref} className={cn('relative inline-block', className)} {...props}>
          {children}
        </div>
      </DatePickerContext.Provider>
    );
  },
);

DatePickerRoot.displayName = 'DatePicker.Root';
