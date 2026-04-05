// tabs-list.tsx
// UI: tablist container with keyboard navigation

'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '../utils';
import { useTabsContext } from './hooks';
import type { TabsListProps } from './types';

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (
    { className, children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
    ref,
  ) => {
    const { orientation } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation (ARIA authoring practices)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!listRef.current) return;

        const triggers = Array.from(
          listRef.current.querySelectorAll(
            '[role="tab"]:not([disabled]):not([data-disabled="true"])',
          ),
        ) as HTMLElement[];

        if (triggers.length === 0) return;

        const currentIndex = triggers.findIndex((trigger) => trigger === document.activeElement);

        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        const isHorizontal = orientation === 'horizontal';
        const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

        switch (e.key) {
          case nextKey:
            e.preventDefault();
            nextIndex = (currentIndex + 1) % triggers.length;
            break;
          case prevKey:
            e.preventDefault();
            nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            nextIndex = triggers.length - 1;
            break;
          default:
            return;
        }

        triggers[nextIndex]?.click();
        triggers[nextIndex]?.focus();
      };

      const listElement = listRef.current;
      if (listElement) {
        listElement.addEventListener('keydown', handleKeyDown);
        return () => listElement.removeEventListener('keydown', handleKeyDown);
      }
    }, [orientation]);

    // Merge forwarded ref with internal ref
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        listRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <div
        ref={setRefs}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          'inline-flex items-center',
          orientation === 'horizontal'
            ? 'border-b border-border'
            : 'flex-col border-r border-border pr-4 min-w-40',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = 'Tabs.List';

export default TabsList;
