"use client";

import { clsx } from "clsx";
import {
    createContext,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

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

interface CalendarContextValue {
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

// ============================================================================
// Helpers
// ============================================================================

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isToday(d: Date): boolean {
    return isSameDay(d, new Date());
}

function startOfWeek(d: Date, weekStartsOn: 0 | 1): Date {
    const day = d.getDay();
    const diff = (day - weekStartsOn + 7) % 7;
    const s = new Date(d);
    s.setDate(s.getDate() - diff);
    s.setHours(0, 0, 0, 0);
    return s;
}

function addDays(d: Date, n: number): Date {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
}

function getMonthDays(year: number, month: number, weekStartsOn: 0 | 1): Date[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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

function getWeekDays(date: Date, weekStartsOn: 0 | 1): Date[] {
    const start = startOfWeek(date, weekStartsOn);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function formatHour(h: number): string {
    if (h === 0) return "12 AM";
    if (h < 12) return `${h} AM`;
    if (h === 12) return "12 PM";
    return `${h - 12} PM`;
}

function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
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

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ============================================================================
// Context
// ============================================================================

const CalendarContext = createContext<CalendarContextValue | null>(null);

function useCalendar() {
    const ctx = useContext(CalendarContext);
    if (!ctx) throw new Error("BigCalendar compound components must be used inside <BigCalendar>");
    return ctx;
}

// ============================================================================
// Default Event Colors
// ============================================================================

const EVENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-300", border: "border-l-blue-500" },
    green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300", border: "border-l-green-500" },
    red: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", border: "border-l-red-500" },
    amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-800 dark:text-amber-300", border: "border-l-amber-500" },
    purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-800 dark:text-purple-300", border: "border-l-purple-500" },
    pink: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-800 dark:text-pink-300", border: "border-l-pink-500" },
    primary: { bg: "bg-primary-100 dark:bg-primary-900/30", text: "text-primary-800 dark:text-primary-300", border: "border-l-primary-500" },
};

function getEventColorClasses(color?: string) {
    return EVENT_COLORS[color || "primary"] || EVENT_COLORS.primary;
}

// ============================================================================
// BigCalendar Root
// ============================================================================

const BigCalendarRoot = forwardRef<HTMLDivElement, BigCalendarProps>(
    (
        {
            events = [],
            defaultDate,
            date: controlledDate,
            view: controlledView,
            defaultView = "month",
            onDateChange,
            onViewChange,
            onEventClick,
            onDateClick,
            weekStartsOn = 0,
            renderEvent,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [internalDate, setInternalDate] = useState(defaultDate || new Date());
        const [internalView, setInternalView] = useState<CalendarView>(defaultView);

        const currentDate = controlledDate ?? internalDate;
        const view = controlledView ?? internalView;

        const setDate = useCallback(
            (d: Date) => {
                if (!controlledDate) setInternalDate(d);
                onDateChange?.(d);
            },
            [controlledDate, onDateChange]
        );

        const setView = useCallback(
            (v: CalendarView) => {
                if (!controlledView) setInternalView(v);
                onViewChange?.(v);
            },
            [controlledView, onViewChange]
        );

        const navigate = useCallback(
            (dir: "prev" | "next" | "today") => {
                if (dir === "today") {
                    setDate(new Date());
                    return;
                }

                const d = new Date(currentDate);
                const delta = dir === "prev" ? -1 : 1;

                if (view === "month") {
                    d.setMonth(d.getMonth() + delta);
                } else if (view === "week") {
                    d.setDate(d.getDate() + 7 * delta);
                } else {
                    d.setDate(d.getDate() + delta);
                }

                setDate(d);
            },
            [currentDate, view, setDate]
        );

        return (
            <CalendarContext.Provider
                value={{
                    currentDate,
                    view,
                    events,
                    weekStartsOn,
                    onEventClick,
                    onDateClick,
                    renderEvent,
                    navigate,
                    setView,
                }}
            >
                <div
                    ref={ref}
                    className={clsx(
                        "flex flex-col border border-ground-200 dark:border-ground-800 rounded-xl bg-white dark:bg-ground-950 overflow-hidden",
                        className
                    )}
                    {...props}
                >
                    {children ?? (
                        <>
                            <Toolbar />
                            {view === "month" && <MonthView />}
                            {view === "week" && <WeekView />}
                            {view === "day" && <DayView />}
                        </>
                    )}
                </div>
            </CalendarContext.Provider>
        );
    }
);

BigCalendarRoot.displayName = "BigCalendar";

// ============================================================================
// Toolbar
// ============================================================================

const Toolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { currentDate, view, navigate, setView } = useCalendar();

        const title = useMemo(() => {
            if (view === "month") {
                return `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            }
            if (view === "day") {
                return `${DAY_NAMES_SHORT[currentDate.getDay()]}, ${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
            }
            // week
            const start = startOfWeek(currentDate, 0);
            const end = addDays(start, 6);
            if (start.getMonth() === end.getMonth()) {
                return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
            }
            return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
        }, [currentDate, view]);

        const views: CalendarView[] = ["month", "week", "day"];

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b border-ground-200 dark:border-ground-800",
                    className
                )}
                {...props}
            >
                {/* Nav */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("today")}
                        className="px-3 py-1.5 text-sm font-medium font-secondary rounded-md border border-ground-300 dark:border-ground-700 hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("prev")}
                        aria-label="Previous"
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("next")}
                        aria-label="Next"
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                    <h2 className="text-lg font-semibold font-primary text-ground-900 dark:text-white ml-2">
                        {title}
                    </h2>
                </div>

                {/* View Switcher */}
                <div className="flex rounded-lg border border-ground-300 dark:border-ground-700 overflow-hidden">
                    {views.map((v) => (
                        <button
                            key={v}
                            type="button"
                            onClick={() => setView(v)}
                            className={clsx(
                                "px-3 py-1.5 text-sm font-medium font-secondary capitalize transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:z-10",
                                view === v
                                    ? "bg-primary-500 text-white"
                                    : "bg-white dark:bg-ground-900 text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800"
                            )}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
);

Toolbar.displayName = "BigCalendar.Toolbar";

// ============================================================================
// Month View
// ============================================================================

const MonthView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { currentDate, events, weekStartsOn, onEventClick, onDateClick, renderEvent } =
            useCalendar();

        const days = useMemo(
            () => getMonthDays(currentDate.getFullYear(), currentDate.getMonth(), weekStartsOn),
            [currentDate, weekStartsOn]
        );

        const dayHeaders = useMemo(() => {
            const ordered = [...DAY_NAMES_SHORT];
            if (weekStartsOn === 1) {
                ordered.push(ordered.shift()!);
            }
            return ordered;
        }, [weekStartsOn]);

        return (
            <div ref={ref} className={clsx("flex-1", className)} {...props}>
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-ground-200 dark:border-ground-800">
                    {dayHeaders.map((d) => (
                        <div
                            key={d}
                            className="px-2 py-2 text-xs font-semibold font-secondary text-ground-500 dark:text-ground-400 text-center uppercase tracking-wider"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 auto-rows-fr">
                    {days.map((day, i) => {
                        const dayEvents = getEventsForDay(events, day);
                        const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                        const today = isToday(day);

                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "min-h-[100px] border-b border-r border-ground-100 dark:border-ground-800/50 p-1.5 transition-colors cursor-pointer",
                                    "hover:bg-ground-50 dark:hover:bg-ground-900/50",
                                    !isCurrentMonth && "bg-ground-50/50 dark:bg-ground-900/30",
                                    i % 7 === 0 && "border-l-0",
                                )}
                                onClick={() => onDateClick?.(day)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span
                                        className={clsx(
                                            "inline-flex items-center justify-center w-7 h-7 text-xs font-medium font-secondary rounded-full",
                                            today
                                                ? "bg-primary-500 text-white"
                                                : isCurrentMonth
                                                    ? "text-ground-900 dark:text-ground-100"
                                                    : "text-ground-400 dark:text-ground-600"
                                        )}
                                    >
                                        {day.getDate()}
                                    </span>
                                </div>

                                {/* Events */}
                                <div className="flex flex-col gap-0.5">
                                    {dayEvents.slice(0, 3).map((event) => {
                                        if (renderEvent) {
                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEventClick?.(event);
                                                    }}
                                                >
                                                    {renderEvent(event)}
                                                </div>
                                            );
                                        }

                                        const colors = getEventColorClasses(event.color);
                                        return (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEventClick?.(event);
                                                }}
                                                className={clsx(
                                                    "w-full text-left px-1.5 py-0.5 text-[11px] font-secondary font-medium rounded truncate border-l-2 transition-opacity hover:opacity-80",
                                                    colors.bg,
                                                    colors.text,
                                                    colors.border,
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                                )}
                                                title={event.title}
                                            >
                                                {event.title}
                                            </button>
                                        );
                                    })}
                                    {dayEvents.length > 3 && (
                                        <span className="text-[10px] font-secondary text-ground-500 dark:text-ground-400 px-1.5">
                                            +{dayEvents.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

MonthView.displayName = "BigCalendar.MonthView";

// ============================================================================
// Week View
// ============================================================================

const WeekView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { currentDate, events, weekStartsOn, onEventClick, onDateClick, renderEvent } =
            useCalendar();

        const weekDays = useMemo(() => getWeekDays(currentDate, weekStartsOn), [currentDate, weekStartsOn]);

        return (
            <div ref={ref} className={clsx("flex-1 overflow-auto", className)} {...props}>
                {/* Day headers */}
                <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-ground-200 dark:border-ground-800 sticky top-0 bg-white dark:bg-ground-950 z-10">
                    <div />
                    {weekDays.map((day, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "px-2 py-2 text-center border-l border-ground-200 dark:border-ground-800",
                                isToday(day) && "bg-primary-50 dark:bg-primary-900/10"
                            )}
                        >
                            <div className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 uppercase">
                                {DAY_NAMES_SHORT[day.getDay()]}
                            </div>
                            <div
                                className={clsx(
                                    "text-lg font-semibold font-primary",
                                    isToday(day)
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-ground-900 dark:text-white"
                                )}
                            >
                                {day.getDate()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hour grid */}
                <div className="grid grid-cols-[60px_repeat(7,1fr)]">
                    {HOURS.map((hour) => (
                        <div key={hour} className="contents">
                            {/* Time label */}
                            <div className="h-14 flex items-start justify-end pr-2 pt-0.5">
                                <span className="text-[10px] font-secondary text-ground-400 dark:text-ground-500">
                                    {formatHour(hour)}
                                </span>
                            </div>

                            {/* Day columns */}
                            {weekDays.map((day, di) => {
                                const hourEvents = events.filter((e) => {
                                    const s = new Date(e.start);
                                    return isSameDay(s, day) && s.getHours() === hour && !e.allDay;
                                });

                                return (
                                    <div
                                        key={di}
                                        className={clsx(
                                            "h-14 border-l border-t border-ground-100 dark:border-ground-800/50 relative cursor-pointer",
                                            "hover:bg-ground-50/50 dark:hover:bg-ground-900/30"
                                        )}
                                        onClick={() => {
                                            const d = new Date(day);
                                            d.setHours(hour);
                                            onDateClick?.(d);
                                        }}
                                    >
                                        {hourEvents.map((event) => {
                                            if (renderEvent) {
                                                return (
                                                    <div
                                                        key={event.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onEventClick?.(event);
                                                        }}
                                                    >
                                                        {renderEvent(event)}
                                                    </div>
                                                );
                                            }

                                            const colors = getEventColorClasses(event.color);
                                            const durationHours =
                                                (new Date(event.end).getTime() - new Date(event.start).getTime()) /
                                                (1000 * 60 * 60);
                                            const heightPx = Math.max(durationHours * 56, 24);

                                            return (
                                                <button
                                                    key={event.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEventClick?.(event);
                                                    }}
                                                    className={clsx(
                                                        "absolute left-0.5 right-0.5 px-1.5 py-0.5 text-[11px] font-secondary font-medium rounded border-l-2 truncate z-10 transition-opacity hover:opacity-80",
                                                        colors.bg,
                                                        colors.text,
                                                        colors.border,
                                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                                    )}
                                                    style={{ height: `${heightPx}px` }}
                                                    title={event.title}
                                                >
                                                    {event.title}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

WeekView.displayName = "BigCalendar.WeekView";

// ============================================================================
// Day View
// ============================================================================

const DayView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { currentDate, events, onEventClick, onDateClick, renderEvent } = useCalendar();

        const dayEvents = useMemo(() => getEventsForDay(events, currentDate), [events, currentDate]);
        const allDayEvents = dayEvents.filter((e) => e.allDay);
        const timedEvents = dayEvents.filter((e) => !e.allDay);

        return (
            <div ref={ref} className={clsx("flex-1 overflow-auto", className)} {...props}>
                {/* All-day events */}
                {allDayEvents.length > 0 && (
                    <div className="px-4 py-2 border-b border-ground-200 dark:border-ground-800 bg-ground-50 dark:bg-ground-900/50">
                        <p className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 mb-1">
                            All day
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {allDayEvents.map((event) => {
                                const colors = getEventColorClasses(event.color);
                                return (
                                    <button
                                        key={event.id}
                                        type="button"
                                        onClick={() => onEventClick?.(event)}
                                        className={clsx(
                                            "px-2 py-1 text-xs font-secondary font-medium rounded border-l-2 transition-opacity hover:opacity-80",
                                            colors.bg,
                                            colors.text,
                                            colors.border,
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                        )}
                                    >
                                        {event.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Hour grid */}
                <div className="grid grid-cols-[60px_1fr]">
                    {HOURS.map((hour) => {
                        const hourEvents = timedEvents.filter((e) => {
                            const s = new Date(e.start);
                            return s.getHours() === hour;
                        });

                        return (
                            <div key={hour} className="contents">
                                <div className="h-14 flex items-start justify-end pr-2 pt-0.5">
                                    <span className="text-[10px] font-secondary text-ground-400 dark:text-ground-500">
                                        {formatHour(hour)}
                                    </span>
                                </div>

                                <div
                                    className={clsx(
                                        "h-14 border-t border-ground-100 dark:border-ground-800/50 relative cursor-pointer",
                                        "hover:bg-ground-50/50 dark:hover:bg-ground-900/30"
                                    )}
                                    onClick={() => {
                                        const d = new Date(currentDate);
                                        d.setHours(hour, 0, 0, 0);
                                        onDateClick?.(d);
                                    }}
                                >
                                    {hourEvents.map((event) => {
                                        if (renderEvent) {
                                            return (
                                                <div
                                                    key={event.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEventClick?.(event);
                                                    }}
                                                >
                                                    {renderEvent(event)}
                                                </div>
                                            );
                                        }

                                        const colors = getEventColorClasses(event.color);
                                        const durationHours =
                                            (new Date(event.end).getTime() - new Date(event.start).getTime()) /
                                            (1000 * 60 * 60);
                                        const heightPx = Math.max(durationHours * 56, 24);

                                        return (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEventClick?.(event);
                                                }}
                                                className={clsx(
                                                    "absolute left-1 right-1 px-2 py-1 text-xs font-secondary font-medium rounded border-l-2 truncate z-10 transition-opacity hover:opacity-80",
                                                    colors.bg,
                                                    colors.text,
                                                    colors.border,
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                                                )}
                                                style={{ height: `${heightPx}px` }}
                                                title={event.title}
                                            >
                                                {event.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

DayView.displayName = "BigCalendar.DayView";

// ============================================================================
// Compound Export
// ============================================================================

export const BigCalendar = Object.assign(BigCalendarRoot, {
    Toolbar,
    MonthView,
    WeekView,
    DayView,
});

export default BigCalendar;
