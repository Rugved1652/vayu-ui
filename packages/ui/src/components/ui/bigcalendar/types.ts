// types.ts
// Types

import { HTMLAttributes, ReactNode } from "react";

export type CalendarView = "month" | "week" | "day";

export interface CalendarEvent {
    id: string | number;
    title: string;
    start: Date;
    end: Date;
    color?: string;
    allDay?: boolean;
    description?: string;
    [key: string]: unknown;
}

export interface BigCalendarProps extends HTMLAttributes<HTMLDivElement> {
    /** Events to display. */
    events?: CalendarEvent[];
    /** Initial date to display. */
    defaultDate?: Date;
    /** Controlled current date. */
    date?: Date;
    /** Controlled view. */
    view?: CalendarView;
    /** Default view. */
    defaultView?: CalendarView;
    /** Called when navigating to a new date. */
    onDateChange?: (date: Date) => void;
    /** Called when switching view. */
    onViewChange?: (view: CalendarView) => void;
    /** Called when an event is clicked. */
    onEventClick?: (event: CalendarEvent) => void;
    /** Called when a date cell is clicked. */
    onDateClick?: (date: Date) => void;
    /** Day the week starts on: 0=Sun, 1=Mon. */
    weekStartsOn?: 0 | 1;
    /** Custom event renderer. */
    renderEvent?: (event: CalendarEvent) => ReactNode;
}

export interface CalendarContextValue {
    currentDate: Date;
    view: CalendarView;
    events: CalendarEvent[];
    weekStartsOn: 0 | 1;
    onEventClick?: (event: CalendarEvent) => void;
    onDateClick?: (date: Date) => void;
    renderEvent?: (event: CalendarEvent) => ReactNode;
    navigate: (dir: "prev" | "next" | "today") => void;
    setView: (view: CalendarView) => void;
}
