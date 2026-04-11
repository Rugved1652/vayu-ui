// toast-stack.tsx
// UI: Sonner-style stack with expand/collapse

'use client';

import React, { useState, useCallback, useId, useRef } from 'react';
import { cn } from '../utils';
import type { Toast, ToastStackProps } from './types';
import { ToastItem } from './ToastItem';
import { VISIBLE_TOASTS, GAP, TOAST_HEIGHT_OFFSET, SCALE_STEP, positionClasses } from './constants';

interface GhostToast {
  id: string;
  toast: Toast;
  offset: number;
  scale: number;
  zIndex: number;
}

const ToastStack: React.FC<ToastStackProps> = ({ position, toasts, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [isAllPaused, setIsAllPaused] = useState(false);
  const [ghostToasts, setGhostToasts] = useState<GhostToast[]>([]);
  const regionId = useId();
  const isBottom = position.startsWith('bottom');
  const direction = isBottom ? -1 : 1;

  // Ref to access current toasts in handleRemove without stale closures
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  const handleHeightUpdate = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  // Remove toast from parent immediately, keep as ghost for exit animation
  const handleRemove = useCallback(
    (id: string) => {
      const currentToasts = toastsRef.current;
      const index = currentToasts.findIndex((t) => t.id === id);
      if (index === -1) return;

      const toast = currentToasts[index]!;
      const offset = index < VISIBLE_TOASTS ? index * TOAST_HEIGHT_OFFSET : 0;
      const scale = 1 - Math.min(index, VISIBLE_TOASTS) * SCALE_STEP;

      setGhostToasts((prev) => [
        ...prev,
        { id: toast.id, toast, offset, scale, zIndex: currentToasts.length - index },
      ]);
      onRemove(id);

      setTimeout(() => {
        setGhostToasts((prev) => prev.filter((g) => g.id !== id));
      }, 300);
    },
    [onRemove],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        const firstDismissible = toasts.find((t) => t.dismissible !== false);
        if (firstDismissible) handleRemove(firstDismissible.id);
      }
    },
    [toasts, handleRemove],
  );

  const visibleToasts = toasts.slice(0, VISIBLE_TOASTS);

  const getStackOffset = (index: number): number => {
    if (index >= VISIBLE_TOASTS) return 0;
    if (isExpanded) {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += (heights[visibleToasts[i]!.id] || 64) + GAP;
      }
      return offset;
    }
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
            ? visibleToasts.reduce(
              (sum, t, i) => sum + (heights[t.id] || 64) + (i < visibleToasts.length - 1 ? GAP : 0),
              0,
            )
            : (heights[toasts[0]?.id] || 64) +
            (Math.min(toasts.length, VISIBLE_TOASTS) - 1) * TOAST_HEIGHT_OFFSET,
          transition: 'height 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Active toasts */}
        {toasts.map((toast, index) => {
          const isHidden = index >= VISIBLE_TOASTS;
          const scale = isExpanded || isHidden ? 1 : 1 - index * SCALE_STEP;
          const offset = getStackOffset(index);

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
                onRemove={handleRemove}
                onHeightUpdate={handleHeightUpdate}
                isAllPaused={isAllPaused}
                position={position}
              />
            </li>
          );
        })}

        {/* Ghost toasts (exit animation) */}
        {ghostToasts.map((ghost) => (
          <li
            key={`ghost-${ghost.id}`}
            className="absolute left-0 right-0"
            style={{
              zIndex: ghost.zIndex,
              transform: `translateY(${ghost.offset * direction}px) scale(${ghost.scale})`,
              transformOrigin: isBottom ? 'bottom center' : 'top center',
              opacity: 1,
              pointerEvents: 'none',
              transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              ...(isBottom ? { bottom: 0 } : { top: 0 }),
            }}
          >
            <ToastItem
              toast={ghost.toast}
              onRemove={() => { }}
              onHeightUpdate={handleHeightUpdate}
              isAllPaused={isAllPaused}
              position={position}
              isExiting={true}
            />
          </li>
        ))}
      </ol>

      {toasts.length > VISIBLE_TOASTS && (
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
