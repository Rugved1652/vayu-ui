// day-view.tsx
// UI: single day view with all-day events and hour grid

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useMemo } from 'react';

import { useCalendar } from './hooks';
import { getEventsForDay, getEventColorClasses, HOURS, formatHour } from './utils';

export const DayView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentDate, events, onEventClick, onDateClick, renderEvent } = useCalendar();

    const dayEvents = useMemo(() => getEventsForDay(events, currentDate), [events, currentDate]);
    const allDayEvents = dayEvents.filter((e) => e.allDay);
    const timedEvents = dayEvents.filter((e) => !e.allDay);

    return (
      <div ref={ref} className={clsx('flex-1 overflow-auto', className)} {...props}>
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
                      'px-2 py-1 text-xs font-secondary font-medium rounded border-l-2 transition-opacity hover:opacity-80',
                      colors.bg,
                      colors.text,
                      colors.border,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
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
                    'h-14 border-t border-ground-100 dark:border-ground-800/50 relative cursor-pointer',
                    'hover:bg-ground-50/50 dark:hover:bg-ground-900/30',
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
                          'absolute left-1 right-1 px-2 py-1 text-xs font-secondary font-medium rounded border-l-2 truncate z-10 transition-opacity hover:opacity-80',
                          colors.bg,
                          colors.text,
                          colors.border,
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
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
  },
);

DayView.displayName = 'BigCalendar.DayView';
