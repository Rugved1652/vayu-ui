// day-view.tsx
// UI: single day view with all-day events and hour grid

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useCallback, useMemo, useRef } from 'react';

import { useCalendar } from './hooks';
import { Event } from './BigCalendarEvent';
import { getEventsForDay, formatDateAria, formatDateHourAria, HOURS, formatHour } from './utils';

export const DayView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentDate, events, onEventClick, onDateClick, renderEvent } = useCalendar();

    const dayEvents = useMemo(() => getEventsForDay(events, currentDate), [events, currentDate]);
    const allDayEvents = dayEvents.filter((e) => e.allDay);
    const timedEvents = dayEvents.filter((e) => !e.allDay);

    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleCellKeyDown = useCallback(
      (e: React.KeyboardEvent, hourIdx: number) => {
        let next = -1;
        if (e.key === 'ArrowDown') next = hourIdx + 1;
        else if (e.key === 'ArrowUp') next = hourIdx - 1;
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const d = new Date(currentDate);
          d.setHours(hourIdx, 0, 0, 0);
          onDateClick?.(d);
          return;
        } else return;

        if (next >= 0 && next < 24) {
          e.preventDefault();
          cellRefs.current[next]?.focus();
        }
      },
      [currentDate, onDateClick],
    );

    return (
      <div ref={ref} className={clsx('flex-1 overflow-auto', className)} {...props}>
        {/* All-day events */}
        {allDayEvents.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-muted/30">
            <p className="text-xs font-secondary font-medium text-muted-content mb-1">
              All day
            </p>
            <div className="flex flex-wrap gap-1" role="list" aria-label="All-day events">
              {allDayEvents.map((event) => (
                <Event key={event.id} event={event} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Hour grid */}
        <div
          role="grid"
          aria-label={`Day view for ${formatDateAria(currentDate)}`}
          className="grid grid-cols-[60px_1fr]"
        >
          {HOURS.map((hour, hourIdx) => {
            const hourEvents = timedEvents.filter((e) => {
              const s = new Date(e.start);
              return s.getHours() === hour;
            });

            return (
              <div key={hour} role="row" className="contents">
                <div className="h-14 flex items-start justify-end pr-2 pt-0.5" role="rowheader">
                  <span className="text-[10px] font-secondary text-muted-content" aria-label={formatHour(hour)}>
                    {formatHour(hour)}
                  </span>
                </div>

                <div
                  ref={(el) => {
                    cellRefs.current[hourIdx] = el;
                  }}
                  role="gridcell"
                  tabIndex={hourIdx === 0 ? 0 : -1}
                  aria-label={formatDateHourAria(currentDate, hour)}
                  className={clsx(
                    'h-14 border-t border-border relative cursor-pointer',
                    'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus',
                  )}
                  onClick={() => {
                    const d = new Date(currentDate);
                    d.setHours(hour, 0, 0, 0);
                    onDateClick?.(d);
                  }}
                  onKeyDown={(e) => handleCellKeyDown(e, hourIdx)}
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
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

DayView.displayName = 'BigCalendar.DayView';
