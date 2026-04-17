// month-view.tsx
// UI: month grid view with day cells and events

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useCallback, useMemo, useRef } from 'react';

import { useCalendar } from './hooks';
import { Event } from './BigCalendarEvent';
import {
  getMonthDays,
  getEventsForDay,
  isToday,
  formatDateAria,
  DAY_NAMES_SHORT,
  DAY_NAMES_FULL,
  MONTH_NAMES,
} from './utils';

export const MonthView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const {
      currentDate,
      events,
      weekStartsOn,
      onEventClick,
      onDateClick,
      renderEvent,
      setView,
      setDate,
    } = useCalendar();

    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const focusedIndex = useRef<number>(-1);

    const days = useMemo(
      () => getMonthDays(currentDate.getFullYear(), currentDate.getMonth(), weekStartsOn),
      [currentDate, weekStartsOn],
    );

    const dayHeaders = useMemo(() => {
      const ordered = [...DAY_NAMES_SHORT];
      if (weekStartsOn === 1) {
        ordered.push(ordered.shift()!);
      }
      return ordered;
    }, [weekStartsOn]);

    const fullDayNames = useMemo(() => {
      const ordered = [...DAY_NAMES_FULL];
      if (weekStartsOn === 1) {
        ordered.push(ordered.shift()!);
      }
      return ordered;
    }, [weekStartsOn]);

    const handleDayClick = useCallback(
      (day: Date) => {
        onDateClick?.(day);
        setDate(day);
        setView('day');
      },
      [onDateClick, setDate, setView],
    );

    const handleDayKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        let nextIndex = -1;
        if (e.key === 'ArrowRight') nextIndex = index + 1;
        else if (e.key === 'ArrowLeft') nextIndex = index - 1;
        else if (e.key === 'ArrowDown') nextIndex = index + 7;
        else if (e.key === 'ArrowUp') nextIndex = index - 7;
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleDayClick(days[index]);
          return;
        }

        if (nextIndex >= 0 && nextIndex < days.length) {
          e.preventDefault();
          cellRefs.current[nextIndex]?.focus();
        }
      },
      [days, handleDayClick],
    );

    return (
      <div ref={ref} className={clsx('flex-1', className)} {...props}>
        {/* Day headers */}
        <div role="row" className="grid grid-cols-7 border-b border-border">
          {dayHeaders.map((d, i) => (
            <div
              key={d}
              role="columnheader"
              aria-label={fullDayNames[i]}
              className="px-2 py-2 text-xs font-semibold font-secondary text-muted-content text-center uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells grid */}
        <div
          role="grid"
          aria-label={`${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          className="grid grid-cols-7 auto-rows-fr"
        >
          {days.map((day, i) => {
            const dayEvents = getEventsForDay(events, day);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const today = isToday(day);

            return (
              <div
                key={i}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                role="gridcell"
                tabIndex={i === 0 ? 0 : -1}
                aria-label={formatDateAria(day)}
                aria-selected={today || undefined}
                className={clsx(
                  'min-h-[100px] border-b border-r border-border p-1.5 transition-colors cursor-pointer',
                  'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus',
                  !isCurrentMonth && 'bg-muted/30',
                  i % 7 === 0 && 'border-l-0',
                )}
                onClick={() => handleDayClick(day)}
                onKeyDown={(e) => handleDayKeyDown(e, i)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={clsx(
                      'inline-flex items-center justify-center w-7 h-7 text-xs font-medium font-secondary rounded-full',
                      today
                        ? 'bg-brand text-brand-content'
                        : isCurrentMonth
                          ? 'text-surface-content'
                          : 'text-muted-content/50',
                    )}
                    aria-hidden="true"
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

                    return (
                      <Event
                        key={event.id}
                        event={event}
                        variant="compact"
                      />
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <span
                      className="text-[10px] font-secondary text-muted-content px-1.5"
                      aria-label={`${dayEvents.length - 3} more events`}
                    >
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
  },
);

MonthView.displayName = 'BigCalendar.MonthView';
