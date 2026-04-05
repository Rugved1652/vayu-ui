// index.ts
// Public API

import BigCalendarRoot from './BigCalendar';
import { Toolbar } from './BigCalendarToolbar';
import { MonthView } from './BigCalendarMonthView';
import { WeekView } from './BigCalendarWeekView';
import { DayView } from './BigCalendarDayView';

export type { CalendarView, CalendarEvent, BigCalendarProps } from './types';

const BigCalendar = Object.assign(BigCalendarRoot, {
  Toolbar,
  MonthView,
  WeekView,
  DayView,
});

export { BigCalendar as default };
export { BigCalendar };
