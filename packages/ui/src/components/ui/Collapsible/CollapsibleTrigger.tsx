// trigger.tsx
// UI: presentational

'use client';
import { forwardRef } from 'react';
import { cn } from '../utils';
import { useCollapsible } from './Collapsible';
import type { CollapsibleTriggerProps } from './types';

const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ showText = 'Show more', hideText = 'Show less', className, ...props }, ref) => {
    const { isOpen, toggle, contentId, triggerId } = useCollapsible();

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className={cn(
          'mt-2 text-sm font-medium text-brand',
          'hover:underline underline-offset-2',
          'focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:rounded-sm',
          'transition-colors duration-fast',
          className,
        )}
        {...props}
      >
        {isOpen ? hideText : showText}
      </button>
    );
  },
);

CollapsibleTrigger.displayName = 'Collapsible.Trigger';

export { CollapsibleTrigger };
