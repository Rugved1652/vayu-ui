// toolbar.tsx
// UI: navigation controls and view switcher

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useMemo } from 'react';

import type { CalendarView } from './types';
import { useCalendar } from './hooks';
import { MONTH_NAMES, DAY_NAMES_SHORT, startOfWeek, addDays } from './utils';

export const Toolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentDate, view, navigate, setView } = useCalendar();

    const title = useMemo(() => {
      if (view === 'month') {
        return `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      }
      if (view === 'day') {
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

    const views: CalendarView[] = ['month', 'week', 'day'];

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b border-ground-200 dark:border-ground-800',
          className,
        )}
        {...props}
      >
        {/* Nav */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('today')}
            className="px-3 py-1.5 text-sm font-medium font-secondary rounded-md border border-ground-300 dark:border-ground-700 hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => navigate('prev')}
            aria-label="Previous"
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => navigate('next')}
            aria-label="Next"
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-ground-100 dark:hover:bg-ground-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
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
                'px-3 py-1.5 text-sm font-medium font-secondary capitalize transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:z-10',
                view === v
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-ground-900 text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800',
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

Toolbar.displayName = 'BigCalendar.Toolbar';
