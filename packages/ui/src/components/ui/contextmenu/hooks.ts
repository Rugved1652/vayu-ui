// hooks.ts
// Logic

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import {
  ContextMenuContextValue,
  RadioGroupCtxValue,
  SubmenuContextValue,
  MENU_ITEM_SELECTOR,
  VIEWPORT_PAD,
} from './types';

// Contexts

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export const RadioGroupContext = createContext<RadioGroupCtxValue | null>(null);

export const SubmenuContext = createContext<SubmenuContextValue | null>(null);

// Context hooks

export const useContextMenuCtx = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('ContextMenu compound components must be used within ContextMenu');
  return ctx;
};

// Shared hooks

export const useBodyScrollLock = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const orig = window.getComputedStyle(document.body).overflow;
    const origPR = window.getComputedStyle(document.body).paddingRight;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.body.style.overflow = orig;
      document.body.style.paddingRight = origPR;
    };
  }, [enabled]);
};

export const useMenuPosition = (
  position: { x: number; y: number } | undefined,
  contentRef: React.RefObject<HTMLDivElement | null>,
  sideOffset = 4,
  isSubmenu = false,
  enabled = true,
) => {
  const [adjusted, setAdjusted] = useState(position ?? { x: 0, y: 0 });
  const [maxHeight, setMaxHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!enabled || !position || !contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = position.x + sideOffset;
    if (x + rect.width > vw - VIEWPORT_PAD) {
      x = isSubmenu ? position.x - rect.width - sideOffset : vw - rect.width - VIEWPORT_PAD;
    }
    if (x < VIEWPORT_PAD) x = VIEWPORT_PAD;

    let y = isSubmenu ? position.y : position.y + sideOffset;
    if (y < VIEWPORT_PAD) y = VIEWPORT_PAD;

    let calculatedMaxHeight = vh - y - VIEWPORT_PAD;

    setAdjusted({ x, y });
    setMaxHeight(Math.max(0, calculatedMaxHeight));
  }, [position, sideOffset, isSubmenu, enabled, contentRef]);

  return { adjusted, maxHeight };
};

export const useMenuKeyboard = (
  contentRef: React.RefObject<HTMLDivElement | null>,
  onEscape: () => void,
  onArrowLeft?: () => void,
) => {
  const typeahead = useRef({
    buffer: '',
    timeout: null as ReturnType<typeof setTimeout> | null,
  });

  const getItems = useCallback(() => {
    if (!contentRef.current) return [];
    return Array.from(contentRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR));
  }, [contentRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getItems();
      if (items.length === 0) return;

      const cur = items.findIndex((i) => i === document.activeElement);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          e.stopPropagation();
          items[cur < items.length - 1 ? cur + 1 : 0]?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          e.stopPropagation();
          items[cur > 0 ? cur - 1 : items.length - 1]?.focus();
          break;
        }
        case 'Home':
          e.preventDefault();
          e.stopPropagation();
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          e.stopPropagation();
          items[items.length - 1]?.focus();
          break;
        case 'Tab': {
          e.preventDefault();
          e.stopPropagation();
          const next = e.shiftKey
            ? cur > 0
              ? cur - 1
              : items.length - 1
            : cur < items.length - 1
              ? cur + 1
              : 0;
          items[next]?.focus();
          break;
        }
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          onEscape();
          break;
        case 'ArrowLeft':
          if (onArrowLeft) {
            e.preventDefault();
            e.stopPropagation();
            onArrowLeft();
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            if (typeahead.current.timeout) clearTimeout(typeahead.current.timeout);
            typeahead.current.buffer += e.key.toLowerCase();
            const match = items.find((i) =>
              i.textContent?.toLowerCase().startsWith(typeahead.current.buffer),
            );
            match?.focus();
            typeahead.current.timeout = setTimeout(() => {
              typeahead.current.buffer = '';
            }, 500);
          }
          break;
      }
    },
    [getItems, onEscape, onArrowLeft],
  );

  return handleKeyDown;
};

export const useItemKeyDown = (disabled: boolean, action: () => void) =>
  useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        action();
      }
    },
    [disabled, action],
  );

// Shared style helper

export const baseItemStyles = (disabled: boolean, variant?: 'destructive') =>
  clsx(
    'px-3 py-2 mx-1 rounded-md flex items-center gap-3',
    'font-secondary text-sm transition-colors cursor-pointer',
    ' focus:outline-none focus-visible:bg-primary-50 focus-visible:text-primary-600',
    'dark:focus-visible:bg-primary-950 dark:focus-visible:text-primary-400',
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : variant === 'destructive'
        ? 'text-error-700 dark:text-error-300 hover:bg-error-50 dark:hover:bg-error-900/20'
        : 'text-neutral-900 dark:text-white hover:bg-primary-50 dark:hover:bg-primary-900/20',
  );
