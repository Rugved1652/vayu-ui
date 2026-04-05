// handle.tsx
// UI: drag handle with mouse/touch/keyboard support (WCAG 2.2 AA)

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, useCallback, useId, useLayoutEffect, useRef } from 'react';
import type { HandleProps } from './types';
import { useResizablePane } from './ResizablePane';

const ResizablePaneHandle = forwardRef<HTMLDivElement, HandleProps>(
  ({ step = 2, 'aria-label': ariaLabel, className, ...props }, ref) => {
    const handleId = useId();
    const { direction, registerHandle, resize, sizes, getConstraints, containerRef } =
      useResizablePane();

    const indexRef = useRef<number | null>(null);
    useLayoutEffect(() => {
      if (indexRef.current === null) {
        indexRef.current = registerHandle(handleId);
      }
    }, [handleId, registerHandle]);

    const handleIndex = indexRef.current ?? 0;
    const isHorizontal = direction === 'horizontal';
    const panelSize = sizes[handleIndex] ?? 50;
    const constraints = getConstraints(handleIndex);

    // Mouse / Touch Drag
    const startDrag = useCallback(
      (startX: number, startY: number) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const total = isHorizontal ? rect.width : rect.height;
        let lastPos = isHorizontal ? startX : startY;

        const move = (x: number, y: number) => {
          const pos = isHorizontal ? x : y;
          const delta = ((pos - lastPos) / total) * 100;
          resize(handleIndex, delta);
          lastPos = pos;
        };

        const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
          e.preventDefault();
          move(e.touches[0].clientX, e.touches[0].clientY);
        };

        const cleanup = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', cleanup);
          document.removeEventListener('touchmove', onTouchMove);
          document.removeEventListener('touchend', cleanup);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', cleanup);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', cleanup);
        document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
      },
      [isHorizontal, resize, handleIndex, containerRef],
    );

    const onMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
      },
      [startDrag],
    );

    const onTouchStart = useCallback(
      (e: React.TouchEvent) => startDrag(e.touches[0].clientX, e.touches[0].clientY),
      [startDrag],
    );

    // Keyboard
    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        let delta = 0;
        const big = e.shiftKey ? step * 5 : step;

        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            delta = -big;
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            delta = big;
            break;
          case 'Home':
            delta = -(panelSize - constraints.min);
            break;
          case 'End':
            delta = constraints.max - panelSize;
            break;
          default:
            return;
        }

        e.preventDefault();
        resize(handleIndex, delta);
      },
      [resize, handleIndex, panelSize, constraints, step],
    );

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        aria-valuenow={Math.round(panelSize)}
        aria-valuemin={constraints.min}
        aria-valuemax={constraints.max}
        aria-label={ariaLabel ?? `Resize ${isHorizontal ? 'columns' : 'rows'}`}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onKeyDown={onKeyDown}
        className={clsx(
          // WCAG 2.5.8 Target Size: Minimum 24x24px hit area
          'shrink-0 relative flex items-center justify-center select-none',
          'transition-colors',

          // Focus Visible (WCAG 2.4.7)
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',

          // Layout & Hit Area
          isHorizontal ? 'w-6 cursor-col-resize' : 'h-6 cursor-row-resize',

          // Visual Styling
          'bg-transparent hover:bg-muted/50 dark:hover:bg-muted/30',

          className,
        )}
        {...props}
      >
        {/* Visual Grip */}
        <div
          className={clsx('rounded-full bg-brand', isHorizontal ? 'w-0.5 h-8' : 'h-0.5 w-8')}
          aria-hidden="true"
        />
      </div>
    );
  },
);
ResizablePaneHandle.displayName = 'ResizablePane.Handle';

export default ResizablePaneHandle;
