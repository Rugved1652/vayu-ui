// week-view.tsx
// UI: week view with hour grid and day columns

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useCallback, useMemo, useRef } from 'react';

import { useCalendar } from './hooks';
import { Event } from './BigCalendarEvent';
import {
  getWeekDays,
  isSameDay,
  isToday,
  formatDateAria,
  formatDateHourAria,
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

    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

    const cellIndex = useCallback(
      (hourIdx: number, dayIdx: number) => hourIdx * 7 + dayIdx,
      [],
    );

    const handleCellKeyDown = useCallback(
      (e: React.KeyboardEvent, hourIdx: number, dayIdx: number, day: Date, hour: number) => {
        let hNext = hourIdx;
        let dNext = dayIdx;

        if (e.key === 'ArrowRight') dNext = dayIdx + 1;
        else if (e.key === 'ArrowLeft') dNext = dayIdx - 1;
        else if (e.key === 'ArrowDown') hNext = hourIdx + 1;
        else if (e.key === 'ArrowUp') hNext = hourIdx - 1;
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const d = new Date(day);
          d.setHours(hour);
          onDateClick?.(d);
          return;
        } else return;

        if (dNext >= 0 && dNext < 7 && hNext >= 0 && hNext < 24) {
          e.preventDefault();
          cellRefs.current[cellIndex(hNext, dNext)]?.focus();
        }
      },
      [onDateClick, cellIndex],
    );

    return (
      <div ref={ref} className={clsx('flex-1 overflow-auto', className)} {...props}>
        {/* Day headers */}
        <div role="row" className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border sticky top-0 bg-surface z-10">
          <div role="columnheader" aria-hidden="true" />
          {weekDays.map((day, i) => (
            <div
              key={i}
              role="columnheader"
              aria-label={formatDateAria(day)}
              className={clsx(
                'px-2 py-2 text-center border-l border-border',
                isToday(day) && 'bg-brand/10',
              )}
            >
              <div className="text-xs font-secondary font-medium text-muted-content uppercase" aria-hidden="true">
                {DAY_NAMES_SHORT[day.getDay()]}
              </div>
              <div
                className={clsx(
                  'text-lg font-semibold font-primary',
                  isToday(day)
                    ? 'text-brand'
                    : 'text-surface-content',
                )}
                aria-hidden="true"
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Hour grid */}
        <div
          role="grid"
          aria-label={`Week of ${formatDateAria(weekDays[0])}`}
          className="grid grid-cols-[60px_repeat(7,1fr)]"
        >
          {HOURS.map((hour, hourIdx) => (
            <div key={hour} role="row" className="contents">
              {/* Time label */}
              <div className="h-14 flex items-start justify-end pr-2 pt-0.5" role="rowheader">
                <span className="text-[10px] font-secondary text-muted-content" aria-label={formatHour(hour)}>
                  {formatHour(hour)}
                </span>
              </div>

              {/* Day columns */}
              {weekDays.map((day, di) => {
                const hourEvents = events.filter((e) => {
                  const s = new Date(e.start);
                  return isSameDay(s, day) && s.getHours() === hour && !e.allDay;
                });

                const idx = cellIndex(hourIdx, di);

                return (
                  <div
                    key={di}
                    ref={(el) => {
                      cellRefs.current[idx] = el;
                    }}
                    role="gridcell"
                    tabIndex={idx === 0 ? 0 : -1}
                    aria-label={formatDateHourAria(day, hour)}
                    className={clsx(
                      'h-14 border-l border-t border-border relative cursor-pointer',
                      'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus',
                    )}
                    onClick={() => {
                      const d = new Date(day);
                      d.setHours(hour);
                      onDateClick?.(d);
                    }}
                    onKeyDown={(e) => handleCellKeyDown(e, hourIdx, di, day, hour)}
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

                      const durationHours =
                        (new Date(event.end).getTime() - new Date(event.start).getTime()) /
                        (1000 * 60 * 60);
                      const heightPx = Math.max(durationHours * 56, 24);

                      return (
                        <Event
                          key={event.id}
                          event={event}
                          height={heightPx}
                        />
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
