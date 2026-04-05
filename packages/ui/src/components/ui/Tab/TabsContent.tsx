// tabs-content.tsx
// UI: tab panel content

'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '../utils';
import { useTabsContext } from './hooks';
import type { TabsContentProps } from './types';

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, forceMount = false, ...props }, ref) => {
    const { activeTab, autoFocus } = useTabsContext();
    const panelRef = useRef<HTMLDivElement>(null);
    const isActive = activeTab === value;

    // Auto-focus the panel when it becomes active
    useEffect(() => {
      if (isActive && autoFocus && panelRef.current) {
        const timer = setTimeout(() => {
          panelRef.current?.focus();
        }, 0);
        return () => clearTimeout(timer);
      }
    }, [isActive, autoFocus]);

    // Merge forwarded ref with internal ref
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    if (!isActive && !forceMount) {
      return null;
    }

    return (
      <div
        ref={setRefs}
        role="tabpanel"
        aria-labelledby={`tab-${value}`}
        id={`tabpanel-${value}`}
        tabIndex={isActive ? 0 : undefined}
        data-state={isActive ? 'active' : 'inactive'}
        hidden={!isActive && forceMount}
        className={cn('mt-4 focus:outline-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsContent.displayName = 'Tabs.Content';

export default TabsContent;
