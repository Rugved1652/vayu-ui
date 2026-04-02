// dropdowns.tsx
// UI: month and year dropdown lists (internal)

'use client';

import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { cn } from '../utils';
import { MONTH_NAMES } from './utils';

// Month dropdown

interface MonthDropdownListProps {
  currentDate: Date;
  selectMonth: (month: number) => void;
  onClose: () => void;
}

export const MonthDropdownList: React.FC<MonthDropdownListProps> = ({
  currentDate,
  selectMonth,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentMonthIndex = currentDate.getMonth();
  const [focusedIndex, setFocusedIndex] = useState(currentMonthIndex);
  const hasFocusedRef = useRef(false);

  const setCurrentMonthButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRefs.current[currentMonthIndex] = el;
      if (el && !hasFocusedRef.current) {
        hasFocusedRef.current = true;
        queueMicrotask(() => {
          el.scrollIntoView({ block: 'nearest' });
          el.focus();
        });
      }
    },
    [currentMonthIndex],
  );

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el;
    },
    [],
  );

  useLayoutEffect(() => {
    const button = buttonRefs.current[focusedIndex];
    if (button) {
      button.scrollIntoView({ block: 'nearest' });
      button.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < 11 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 11));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectMonth(index);
        onClose();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(11);
        break;
      case 'Tab':
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Months"
      aria-activedescendant={`month-${focusedIndex}`}
      className={cn(
        'absolute top-full left-0 mt-1 z-10',
        'bg-surface border border-border rounded-control shadow-elevated',
        'py-1 max-h-64 overflow-y-auto',
        'min-w-28',
      )}
    >
      {MONTH_NAMES.map((month, index) => (
        <button
          key={month}
          ref={index === currentMonthIndex ? setCurrentMonthButtonRef : setButtonRef(index)}
          id={`month-${index}`}
          type="button"
          role="option"
          aria-selected={currentMonthIndex === index}
          tabIndex={focusedIndex === index ? 0 : -1}
          onClick={() => {
            selectMonth(index);
            onClose();
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            'w-full px-3 py-1.5 text-left text-sm font-secondary',
            'transition-colors',
            currentMonthIndex === index
              ? 'bg-brand text-brand-content'
              : 'text-surface-content hover:bg-muted',
            'focus-visible:outline-none focus-visible:bg-muted',
          )}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

// Year dropdown

interface YearDropdownListProps {
  currentDate: Date;
  yearOptions: number[];
  selectYear: (year: number) => void;
  onClose: () => void;
}

export const YearDropdownList: React.FC<YearDropdownListProps> = ({
  currentDate,
  yearOptions,
  selectYear,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentYearIndex = yearOptions.indexOf(currentDate.getFullYear());
  const initialIndex = currentYearIndex >= 0 ? currentYearIndex : 50;
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);
  const hasFocusedRef = useRef(false);

  const setCurrentYearButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRefs.current[initialIndex] = el;
      if (el && !hasFocusedRef.current) {
        hasFocusedRef.current = true;
        queueMicrotask(() => {
          el.scrollIntoView({ block: 'nearest' });
          el.focus();
        });
      }
    },
    [initialIndex],
  );

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el;
    },
    [],
  );

  useLayoutEffect(() => {
    const button = buttonRefs.current[focusedIndex];
    if (button) {
      button.scrollIntoView({ block: 'nearest' });
      button.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, year: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < yearOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : yearOptions.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectYear(year);
        onClose();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(yearOptions.length - 1);
        break;
      case 'PageDown':
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 10, yearOptions.length - 1));
        break;
      case 'PageUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 10, 0));
        break;
      case 'Tab':
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Years"
      aria-activedescendant={`year-${focusedIndex}`}
      className={cn(
        'absolute top-full left-0 mt-1 z-10',
        'bg-surface border border-border rounded-control shadow-elevated',
        'py-1 max-h-64 overflow-y-auto',
        'min-w-24',
      )}
    >
      {yearOptions.map((year, index) => (
        <button
          key={year}
          ref={index === initialIndex ? setCurrentYearButtonRef : setButtonRef(index)}
          id={`year-${index}`}
          type="button"
          role="option"
          aria-selected={currentDate.getFullYear() === year}
          tabIndex={focusedIndex === index ? 0 : -1}
          onClick={() => {
            selectYear(year);
            onClose();
          }}
          onKeyDown={(e) => handleKeyDown(e, year)}
          className={cn(
            'w-full px-3 py-1.5 text-left text-sm font-secondary',
            'transition-colors',
            currentDate.getFullYear() === year
              ? 'bg-brand text-brand-content'
              : 'text-surface-content hover:bg-muted',
            'focus-visible:outline-none focus-visible:bg-muted',
          )}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
