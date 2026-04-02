// CommandBoxList.tsx
// Scrollable listbox container

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useCommandBox } from './hooks';
import type { CommandBoxListProps } from './types';

export const CommandBoxList = forwardRef<HTMLDivElement, CommandBoxListProps>(
  ({ maxHeight = '320px', className, children, ...props }, ref) => {
    const { listboxId, listRef } = useCommandBox();
    const localRef = useRef<HTMLDivElement | null>(null);

    // Merge refs
    useEffect(() => {
      if (localRef.current) {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current = localRef.current;
        if (typeof ref === 'function') ref(localRef.current);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = localRef.current;
      }
    }, [localRef.current, ref, listRef]);

    return (
      <div
        ref={localRef}
        role="listbox"
        id={listboxId}
        aria-label="Command suggestions"
        className={clsx('overflow-y-auto p-2', className)}
        style={{ maxHeight }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CommandBoxList.displayName = 'CommandBox.List';
