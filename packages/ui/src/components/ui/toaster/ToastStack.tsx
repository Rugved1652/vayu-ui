// toast-stack.tsx
// UI: Sonner-style stack with expand/collapse

'use client';

import React, { useState, useCallback, useId } from 'react';
import { cn } from '../utils';
import type { ToastStackProps } from './types';
import { ToastItem } from './ToastItem';
import { VISIBLE_TOASTS, GAP, TOAST_HEIGHT_OFFSET, SCALE_STEP, positionClasses } from './constants';

const ToastStack: React.FC<ToastStackProps> = ({ position, toasts, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [isAllPaused, setIsAllPaused] = useState(false);
  const regionId = useId();
  const isBottom = position.startsWith('bottom');

  const handleHeightUpdate = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        const firstDismissible = toasts.find((t) => t.dismissible !== false);
        if (firstDismissible) onRemove(firstDismissible.id);
      }
    },
    [toasts, onRemove],
  );

  const getStackOffset = (index: number): number => {
    if (isExpanded) {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += (heights[toasts[i]!.id] || 64) + GAP;
      }
      return offset;
    }
    if (index >= VISIBLE_TOASTS) return 0;
    return index * TOAST_HEIGHT_OFFSET;
  };

  return (
    <section
      aria-label={`Notifications (${position})`}
      aria-live="polite"
      aria-relevant="additions removals"
      id={regionId}
      tabIndex={-1}
      className={cn('absolute flex flex-col p-4 pointer-events-none', positionClasses[position])}
      style={{
        width: '100%',
        maxWidth: '420px',
      }}
      onKeyDown={handleKeyDown}
    >
      <ol
        className="relative flex w-full flex-col pointer-events-auto list-none m-0 p-0"
        onMouseEnter={() => {
          setIsExpanded(true);
          setIsAllPaused(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
          setIsAllPaused(false);
        }}
        onFocus={() => {
          setIsExpanded(true);
          setIsAllPaused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsExpanded(false);
            setIsAllPaused(false);
          }
        }}
        style={{
          height: isExpanded
            ? toasts.reduce(
                (sum, t, i) => sum + (heights[t.id] || 64) + (i < toasts.length - 1 ? GAP : 0),
                0,
              )
            : (heights[toasts[0]?.id] || 64) +
              (Math.min(toasts.length, VISIBLE_TOASTS) - 1) * TOAST_HEIGHT_OFFSET,
          transition: 'height 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {toasts.map((toast, index) => {
          const isHidden = !isExpanded && index >= VISIBLE_TOASTS;
          const scale = isExpanded ? 1 : 1 - index * SCALE_STEP;
          const offset = getStackOffset(index);
          const direction = isBottom ? -1 : 1;

          return (
            <li
              key={toast.id}
              className="absolute left-0 right-0"
              style={{
                zIndex: toasts.length - index,
                transform: `translateY(${offset * direction}px) scale(${scale})`,
                transformOrigin: isBottom ? 'bottom center' : 'top center',
                opacity: isHidden ? 0 : 1,
                pointerEvents: isHidden ? 'none' : 'auto',
                transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                ...(isBottom ? { bottom: 0 } : { top: 0 }),
              }}
              aria-hidden={isHidden}
            >
              <ToastItem
                toast={toast}
                onRemove={onRemove}
                onHeightUpdate={handleHeightUpdate}
                isAllPaused={isAllPaused}
              />
            </li>
          );
        })}
      </ol>

      {!isExpanded && toasts.length > VISIBLE_TOASTS && (
        <div
          className={cn(
            'pointer-events-auto mt-1 self-center rounded-full px-2.5 py-1',
            'bg-surface-content text-surface',
            'text-xs font-medium shadow-control cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          )}
          role="button"
          tabIndex={0}
          aria-label={`Show all ${toasts.length} notifications`}
          onClick={() => setIsExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          +{toasts.length - VISIBLE_TOASTS}
        </div>
      )}
    </section>
  );
};

export { ToastStack };
