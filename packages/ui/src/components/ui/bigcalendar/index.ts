// index.ts
// Public API

import BigCalendarRoot from "./bigcalendar";
import { Toolbar } from "./toolbar";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";
import { DayView } from "./day-view";

export type { CalendarView, CalendarEvent, BigCalendarProps } from "./types";

const BigCalendar = Object.assign(BigCalendarRoot, {
    Toolbar,
    MonthView,
    WeekView,
    DayView,
});

export { BigCalendar as default };
export { BigCalendar };
