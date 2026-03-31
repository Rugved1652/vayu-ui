// month-view.tsx
// UI: month grid view with day cells and events

"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, useMemo } from "react";

import { useCalendar } from "./hooks";
import {
    getMonthDays,
    getEventsForDay,
    isToday,
    getEventColorClasses,
    DAY_NAMES_SHORT,
} from "./utils";

export const MonthView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
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
