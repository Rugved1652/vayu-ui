// index.ts
// Public API

import BigCalendarRoot from './BigCalendar';
import { Toolbar } from './BigCalendarToolbar';
import { MonthView } from './BigCalendarMonthView';
import { WeekView } from './BigCalendarWeekView';
import { DayView } from './BigCalendarDayView';
import { Event } from './BigCalendarEvent';

export type { CalendarView, CalendarEvent, BigCalendarProps, BigCalendarEventProps } from './types';

const BigCalendar = Object.assign(BigCalendarRoot, {
  Toolbar,
  MonthView,
  WeekView,
  DayView,
  Event,
});

export { BigCalendar as default };
export { BigCalendar };
