// BigCalendarEvent.tsx
// UI: reusable event chip with remove button

'use client';

import { clsx } from 'clsx';
import { forwardRef } from 'react';

import type { BigCalendarEventProps } from './types';
import { useCalendar } from './hooks';
import { getEventColorClasses } from './utils';

export const Event = forwardRef<HTMLDivElement, BigCalendarEventProps>(
  ({ event, showRemove, height, variant = 'default', className, onClick, onKeyDown, ...props }, ref) => {
    const { onEventClick, onEventRemove } = useCalendar();
    const colors = getEventColorClasses(event.color);
    const shouldShowRemove = showRemove ?? !!onEventRemove;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onEventClick?.(event);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onEventClick?.(event);
      }
      onKeyDown?.(e);
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEventRemove?.(event);
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${event.title}${event.allDay ? ', all day' : ''}`}
        className={clsx(
          'group font-secondary font-medium rounded-control border-l-2 truncate z-10',
          'transition-opacity hover:opacity-80',
          variant === 'compact'
            ? 'w-full text-left px-1.5 py-0.5 text-[11px]'
            : 'absolute left-0.5 right-0.5 px-1.5 py-0.5 text-[11px]',
          colors.bg,
          colors.text,
          colors.border,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          className,
        )}
        style={height != null ? { height: `${height}px` } : undefined}
        title={event.title}
        {...props}
      >
        <span className="flex items-center justify-between gap-1 truncate" aria-hidden="true">
          <span className="truncate">{event.title}</span>
          {shouldShowRemove && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleRemove}
              className={clsx(
                'inline-flex items-center justify-center shrink-0',
                'w-3.5 h-3.5 rounded-full',
                'opacity-0 group-hover:opacity-100',
                'hover:bg-black/10 dark:hover:bg-white/10',
                'transition-opacity',
              )}
              aria-label={`Remove ${event.title}`}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M1 1l6 6M7 1L1 7" />
              </svg>
            </button>
          )}
        </span>
      </div>
    );
  },
);

Event.displayName = 'BigCalendar.Event';
