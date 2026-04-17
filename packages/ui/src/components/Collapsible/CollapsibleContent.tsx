// content.tsx
// UI: presentational

'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useCollapsible } from './Collapsible';
import type { CollapsibleContentProps } from './types';

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, lines = 3, className, ...props }, ref) => {
    const { isOpen, contentId, triggerId } = useCollapsible();

    // Line-clamp styles for collapsed state
    const clampedStyle = {
      display: '-webkit-box' as unknown as 'block',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical' as unknown as 'horizontal',
      overflow: 'hidden' as const,
    };

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn('text-surface-content font-secondary text-para leading-relaxed', className)}
        style={!isOpen ? clampedStyle : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CollapsibleContent.displayName = 'Collapsible.Content';

export { CollapsibleContent };
