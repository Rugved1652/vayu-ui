// utils.ts
// Logic: date utilities and constants

import moment from 'moment';
import type { DateRange } from './types';

// Constants

export const DAY_NAMES_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAY_NAMES_FULL = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
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
export const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Date utilities

export const getMonthDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = moment(firstDay).subtract(diff, 'days');
  const days: Date[] = [];

  for (let i = 0; i < 42; i++) {
    days.push(startOfWeek.clone().add(i, 'days').toDate());
  }
  return days;
};

export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return moment(a).isSame(moment(b), 'day');
};

export const isSameMonth = (a: Date, b: Date): boolean => {
  return moment(a).isSame(moment(b), 'month');
};

export const isToday = (date: Date): boolean => {
  return moment(date).isSame(moment(), 'day');
};

export const formatDate = (date: Date, format: string): string => {
  return moment(date).format(format);
};

export const isDateInRange = (date: Date, range: DateRange | null): boolean => {
  if (!range?.startDate || !range?.endDate) return false;
  const d = moment(date);
  return (
    d.isSameOrAfter(moment(range.startDate), 'day') &&
    d.isSameOrBefore(moment(range.endDate), 'day')
  );
};

export const isRangeStart = (date: Date, range: DateRange | null): boolean => {
  if (!range?.startDate) return false;
  return isSameDay(date, range.startDate);
};

export const isRangeEnd = (date: Date, range: DateRange | null): boolean => {
  if (!range?.endDate) return false;
  return isSameDay(date, range.endDate);
};

export const isRangeHovered = (
  date: Date,
  range: DateRange | null,
  hoverDate: Date | null,
): boolean => {
  if (!range?.startDate || range.endDate || !hoverDate) return false;
  const d = moment(date);
  const start = moment(range.startDate);
  const hover = moment(hoverDate);

  if (hover.isBefore(start)) {
    return d.isSameOrAfter(hover, 'day') && d.isSameOrBefore(start, 'day');
  }
  return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(hover, 'day');
};
