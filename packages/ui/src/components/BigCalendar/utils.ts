// utils.ts
// Logic: date helpers, event filtering, display constants

import type { CalendarEvent } from './types';

// ============================================================================
// Date Helpers
// ============================================================================

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

export function startOfWeek(d: Date, weekStartsOn: 0 | 1): Date {
  const day = d.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  const s = new Date(d);
  s.setDate(s.getDate() - diff);
  s.setHours(0, 0, 0, 0);
  return s;
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function getMonthDays(year: number, month: number, weekStartsOn: 0 | 1): Date[] {
  const firstDay = new Date(year, month, 1);
  const start = startOfWeek(firstDay, weekStartsOn);
  const days: Date[] = [];

  let current = new Date(start);
  // Always show 6 weeks for consistent grid
  while (days.length < 42) {
    days.push(new Date(current));
    current = addDays(current, 1);
  }
  return days;
}

export function getWeekDays(date: Date, weekStartsOn: 0 | 1): Date[] {
  const start = startOfWeek(date, weekStartsOn);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

// ============================================================================
// Hour Display
// ============================================================================

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function formatHour(h: number): string {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

// ============================================================================
// Event Filtering
// ============================================================================

export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    return start <= dayEnd && end >= dayStart;
  });
}

// ============================================================================
// Display Constants
// ============================================================================

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DAY_NAMES_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/** Format a date for screen reader aria-labels (e.g. "Monday, January 6, 2026"). */
export function formatDateAria(d: Date): string {
  return `${DAY_NAMES_FULL[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Format a date + hour for screen reader aria-labels (e.g. "Monday, January 6, 2026 at 9:00 AM"). */
export function formatDateHourAria(d: Date, hour: number): string {
  return `${formatDateAria(d)} at ${formatHour(hour)}`;
}

// ============================================================================
// Event Colors
// ============================================================================

const EVENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-l-blue-500',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
    border: 'border-l-green-500',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-300',
    border: 'border-l-red-500',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-l-amber-500',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border-l-purple-500',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-800 dark:text-pink-300',
    border: 'border-l-pink-500',
  },
  primary: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-l-blue-500',
  },
  brand: {
    bg: 'bg-brand/15',
    text: 'text-brand',
    border: 'border-l-brand',
  },
};

export function getEventColorClasses(color?: string) {
  return EVENT_COLORS[color || 'brand'] || EVENT_COLORS.brand;
}
