// trigger.tsx
// UI: Closed-state trigger button

'use client';

import { clsx } from 'clsx';
import { Command, Search } from 'lucide-react';
import React, { forwardRef } from 'react';
import { sizeClasses, variantClasses } from './config';
import type { CommandBoxTriggerProps } from './types';

export const CommandBoxTrigger = forwardRef<HTMLDivElement, CommandBoxTriggerProps>(
  ({ onClick, disabled, placeholder, size, variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('relative w-full', sizeClasses[size].container, className)}
        {...props}
      >
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-expanded={false}
          aria-haspopup="listbox"
          aria-label={placeholder}
          className={clsx(
            'w-full flex items-center gap-3 rounded-lg border-2 transition-all duration-200 font-secondary',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2',
            sizeClasses[size].input,
            variantClasses[variant],
            disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          )}
        >
          <Search
            className={clsx(
              sizeClasses[size].icon,
              'text-neutral-400 dark:text-neutral-500 flex-shrink-0',
            )}
          />
          <span className="flex-1 text-left text-neutral-500 dark:text-neutral-400 truncate font-secondary">
            {placeholder}
          </span>
          <div
            className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500"
            aria-hidden="true"
          >
            <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
              <Command className="w-3 h-3" />
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
              K
            </kbd>
          </div>
        </button>
      </div>
    );
  },
);

CommandBoxTrigger.displayName = 'CommandBox.Trigger';
