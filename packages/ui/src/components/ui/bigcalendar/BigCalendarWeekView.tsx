// week-view.tsx
// UI: week view with hour grid and day columns

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useMemo } from 'react';

import { useCalendar } from './hooks';
import {
  getWeekDays,
  isSameDay,
  isToday,
  getEventColorClasses,
  HOURS,
  formatHour,
  DAY_NAMES_SHORT,
} from './utils';

export const WeekView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentDate, events, weekStartsOn, onEventClick, onDateClick, renderEvent } =
      useCalendar();

    const weekDays = useMemo(
      () => getWeekDays(currentDate, weekStartsOn),
      [currentDate, weekStartsOn],
    );

    return (
      <div ref={ref} className={clsx('flex-1 overflow-auto', className)} {...props}>
        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-ground-200 dark:border-ground-800 sticky top-0 bg-white dark:bg-ground-950 z-10">
          <div />
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={clsx(
                'px-2 py-2 text-center border-l border-ground-200 dark:border-ground-800',
                isToday(day) && 'bg-primary-50 dark:bg-primary-900/10',
              )}
            >
              <div className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 uppercase">
                {DAY_NAMES_SHORT[day.getDay()]}
              </div>
              <div
                className={clsx(
                  'text-lg font-semibold font-primary',
                  isToday(day)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-ground-900 dark:text-white',
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
                      'h-14 border-l border-t border-ground-100 dark:border-ground-800/50 relative cursor-pointer',
                      'hover:bg-ground-50/50 dark:hover:bg-ground-900/30',
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
                            'absolute left-0.5 right-0.5 px-1.5 py-0.5 text-[11px] font-secondary font-medium rounded border-l-2 truncate z-10 transition-opacity hover:opacity-80',
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
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

WeekView.displayName = 'BigCalendar.WeekView';
