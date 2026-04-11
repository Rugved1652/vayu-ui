// toast-item.tsx
// UI: individual toast with timer, swipe, drag, progress bar

'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../utils';
import type { ToastItemProps, ToastType } from './types';
import { Icons } from './ToastIcons';
import { typeStyles, enterAnimationByPosition, exitAnimationByPosition } from './constants';

const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  onRemove,
  onHeightUpdate,
  isAllPaused,
  position,
  isExiting = false,
}) => {
  const [isLocalPaused, setIsLocalPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingTimeRef = useRef<number>(toast.duration || 0);
  const prevTypeRef = useRef<ToastType>(toast.type);

  const progressRef = useRef<HTMLDivElement>(null);

  const isPaused = isAllPaused || isLocalPaused;

  // Measure height for stack layout
  useEffect(() => {
    if (!itemRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) onHeightUpdate(toast.id, entry.contentRect.height);
    });
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [toast.id, onHeightUpdate]);

  // Timer with pause/resume
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isExiting || toast.duration === 0 || toast.type === 'loading') {
      prevTypeRef.current = toast.type;
      return;
    }

    if (prevTypeRef.current === 'loading') {
      remainingTimeRef.current = toast.duration || 0;
    }
    prevTypeRef.current = toast.type;

    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, remainingTimeRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, toast.duration, toast.type, isExiting]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current || toast.duration === 0 || toast.type === 'loading') return;
    const el = progressRef.current;
    el.style.animationPlayState = isPaused || isExiting ? 'paused' : 'running';
  }, [isPaused, toast.duration, toast.type, isExiting]);

  // Swipe to dismiss
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setIsLocalPaused(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartRef.current.x);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsLocalPaused(false);
    if (Math.abs(dragOffset) > 100) {
      handleClose();
    } else {
      setDragOffset(0);
    }
  };

  const handleClose = useCallback(() => {
    onRemove(toast.id);
    toast.onClose?.();
  }, [onRemove, toast]);

  const config = typeStyles[toast.type];
  const Icon = toast.icon ?? Icons[toast.type];
  const hasDuration =
    toast.duration !== undefined && toast.duration > 0 && toast.type !== 'loading';
  const dragOpacity = Math.max(0, 1 - Math.abs(dragOffset) / 150);

  return (
    <div
      ref={itemRef}
      className={cn(
        'pointer-events-auto relative w-full overflow-hidden rounded-surface shadow-elevated',
        !toast.customContent && 'border border-l-4',
        !toast.customContent && 'bg-surface',
        !toast.customContent && 'border-border',
        !toast.customContent && config.border,
        'transition-all duration-300 ease-out',
        isExiting && exitAnimationByPosition[position],
        !isExiting && enterAnimationByPosition[position],
        isDragging && 'select-none cursor-grabbing',
      )}
      style={{
        transform: `translateX(${dragOffset}px)`,
        opacity: isDragging ? dragOpacity : undefined,
        transition: isDragging ? 'none' : undefined,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role={config.role}
      aria-live={config.live}
      aria-atomic="true"
      aria-label={`${config.label} notification`}
      tabIndex={0}
    >
      {toast.customContent ? (
        toast.customContent
      ) : (
        <div className="flex items-start gap-3 p-4">
          <div className={cn('shrink-0 mt-0.5', config.icon)} aria-hidden="true">
            {Icon}
          </div>

          <div className="flex-1 min-w-0 font-secondary">
            {toast.title && (
              <div className="font-semibold font-primary text-sm text-surface-content mb-1 leading-tight">
                {toast.title}
              </div>
            )}
            {toast.description && (
              <div className="text-sm text-muted-content leading-relaxed">{toast.description}</div>
            )}
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  handleClose();
                }}
                className={cn(
                  'mt-2 text-sm font-medium text-surface-content underline-offset-2 hover:underline',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
                  'min-h-6 min-w-6',
                )}
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {toast.dismissible && (
            <button
              onClick={handleClose}
              className={cn(
                'shrink-0 flex items-center justify-center rounded-control p-1.5',
                'min-h-7 min-w-7',
                'text-muted-content',
                'hover:text-surface-content',
                'hover:bg-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
                'transition-colors',
              )}
              aria-label={`Dismiss ${config.label.toLowerCase()} notification`}
            >
              {Icons.close}
            </button>
          )}
        </div>
      )}

      {/* Countdown progress bar */}
      {hasDuration && !toast.customContent && (
        <div
          className="h-[3px] w-full bg-muted"
          role="progressbar"
          aria-label="Time remaining before auto-dismiss"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={progressRef}
            className={cn('h-full origin-left', config.progress)}
            style={{
              animation: `toast-progress ${toast.duration}ms linear forwards`,
              animationPlayState: isPaused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          />
        </div>
      )}
    </div>
  );
};

export { ToastItem };
