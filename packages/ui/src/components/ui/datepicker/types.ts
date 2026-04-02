// types.ts
// Types

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from 'react';

export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export type DatePickerValue = Date | DateRange | null;

// Context

interface DatePickerContextValue {
  mode: DatePickerMode;
  selectedDate: Date | null;
  selectedRange: DateRange | null;
  currentDate: Date;
  open: boolean;
  setSelectedDate: (date: Date | null) => void;
  setSelectedRange: (range: DateRange | null) => void;
  setOpen: (open: boolean) => void;
  setCurrentDate: (date: Date) => void;
  goToMonth: (direction: 1 | -1) => void;
  goToYear: (direction: 1 | -1) => void;
  goToToday: () => void;
  selectMonth: (month: number) => void;
  selectYear: (year: number) => void;
  disabled: boolean;
  disabledWeekdays: number[];
  disabledDates: Date[];
  isDateDisabled: (date: Date) => boolean;
  rangeHoverDate: Date | null;
  setRangeHoverDate: (date: Date | null) => void;
  focusedDate: Date | null;
  setFocusedDate: (date: Date | null) => void;
  monthDropdownOpen: boolean;
  setMonthDropdownOpen: (open: boolean) => void;
  yearDropdownOpen: boolean;
  setYearDropdownOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  calendarRef: RefObject<HTMLDivElement | null>;
  handleClear: () => void;
}

// Props

export interface DatePickerRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  children: ReactNode;
  mode?: DatePickerMode;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  disabled?: boolean;
  disabledWeekdays?: number[];
  disabledDates?: Date[];
  placeholder?: string;
}

export interface DatePickerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

export interface DatePickerCalendarProps extends HTMLAttributes<HTMLDivElement> {}

export interface DatePickerCalendarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export type { DatePickerContextValue };
