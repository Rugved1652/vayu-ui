// bigcalendar.tsx
// Composition: root component with state management and context provider

'use client';

import { clsx } from 'clsx';
import { forwardRef, useCallback, useState } from 'react';

import type { BigCalendarProps, CalendarView } from './types';
import { CalendarContext } from './hooks';
import { Toolbar } from './BigCalendarToolbar';
import { MonthView } from './BigCalendarMonthView';
import { WeekView } from './BigCalendarWeekView';
import { DayView } from './BigCalendarDayView';

const BigCalendarRoot = forwardRef<HTMLDivElement, BigCalendarProps>(
  (
    {
      events = [],
      defaultDate,
      date: controlledDate,
      view: controlledView,
      defaultView = 'month',
      onDateChange,
      onViewChange,
      onEventClick,
      onDateClick,
      onEventRemove,
      weekStartsOn = 0,
      renderEvent,
      className,
      children,
      ...props
    },
    ref,
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
      [controlledDate, onDateChange],
    );

    const setView = useCallback(
      (v: CalendarView) => {
        if (!controlledView) setInternalView(v);
        onViewChange?.(v);
      },
      [controlledView, onViewChange],
    );

    const navigate = useCallback(
      (dir: 'prev' | 'next' | 'today') => {
        if (dir === 'today') {
          setDate(new Date());
          return;
        }

        const d = new Date(currentDate);
        const delta = dir === 'prev' ? -1 : 1;

        if (view === 'month') {
          d.setMonth(d.getMonth() + delta);
        } else if (view === 'week') {
          d.setDate(d.getDate() + 7 * delta);
        } else {
          d.setDate(d.getDate() + delta);
        }

        setDate(d);
      },
      [currentDate, view, setDate],
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
          onEventRemove,
          renderEvent,
          navigate,
          setView,
          setDate,
        }}
      >
        <div
          ref={ref}
          role="application"
          aria-label="Calendar"
          className={clsx(
            'flex flex-col border border-border rounded-surface bg-surface overflow-hidden',
            className,
          )}
          {...props}
        >
          {children ?? (
            <>
              <Toolbar />
              {view === 'month' && <MonthView />}
              {view === 'week' && <WeekView />}
              {view === 'day' && <DayView />}
            </>
          )}
        </div>
      </CalendarContext.Provider>
    );
  },
);

BigCalendarRoot.displayName = 'BigCalendar';

export default BigCalendarRoot;
