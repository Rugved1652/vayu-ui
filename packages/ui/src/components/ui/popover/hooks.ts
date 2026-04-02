// hooks.ts
// Logic

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import type { PopoverContextType } from './types';

// Context

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within Popover');
  }
  return context;
};

export { PopoverContext };

// Positioning

interface PopoverPositionOptions {
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  sideOffset: number;
  alignOffset: number;
  avoidCollisions: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

interface PopoverPositionReturn {
  position: { top: number; left: number };
  currentSide: 'top' | 'right' | 'bottom' | 'left';
}

export function usePopoverPosition({
  side,
  align,
  sideOffset,
  alignOffset,
  avoidCollisions,
  triggerRef,
  contentRef,
  isOpen,
}: PopoverPositionOptions): PopoverPositionReturn {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [currentSide, setCurrentSide] = useState(side);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalSide = side;
    let top = 0;
    let left = 0;

    if (avoidCollisions) {
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      if (
        side === 'bottom' &&
        spaceBelow < contentRect.height + sideOffset &&
        spaceAbove > spaceBelow
      ) {
        finalSide = 'top';
      } else if (
        side === 'top' &&
        spaceAbove < contentRect.height + sideOffset &&
        spaceBelow > spaceAbove
      ) {
        finalSide = 'bottom';
      } else if (
        side === 'right' &&
        spaceRight < contentRect.width + sideOffset &&
        spaceLeft > spaceRight
      ) {
        finalSide = 'left';
      } else if (
        side === 'left' &&
        spaceLeft < contentRect.width + sideOffset &&
        spaceRight > spaceLeft
      ) {
        finalSide = 'right';
      }
    }

    setCurrentSide(finalSide);

    switch (finalSide) {
      case 'top':
        top = triggerRect.top - contentRect.height - sideOffset;
        break;
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        break;
      case 'left':
        left = triggerRect.left - contentRect.width - sideOffset;
        top = triggerRect.top;
        break;
      case 'right':
        left = triggerRect.right + sideOffset;
        top = triggerRect.top;
        break;
    }

    if (finalSide === 'top' || finalSide === 'bottom') {
      switch (align) {
        case 'start':
          left = triggerRect.left + alignOffset;
          break;
        case 'center':
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + alignOffset;
          break;
        case 'end':
          left = triggerRect.right - contentRect.width - alignOffset;
          break;
      }

      if (avoidCollisions) {
        if (left < 0) left = 8;
        if (left + contentRect.width > viewportWidth) left = viewportWidth - contentRect.width - 8;
      }
    }

    if (finalSide === 'left' || finalSide === 'right') {
      switch (align) {
        case 'start':
          top = triggerRect.top + alignOffset;
          break;
        case 'center':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + alignOffset;
          break;
        case 'end':
          top = triggerRect.bottom - contentRect.height - alignOffset;
          break;
      }

      if (avoidCollisions) {
        if (top < 0) top = 8;
        if (top + contentRect.height > viewportHeight)
          top = viewportHeight - contentRect.height - 8;
      }
    }

    setPosition({ top, left });
  }, [align, side, sideOffset, alignOffset, avoidCollisions, triggerRef, contentRef]);

  // Content resize observer (dynamic children)
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [isOpen, contentRef, updatePosition]);

  // Initial positioning with double RAF + scroll/resize
  useLayoutEffect(() => {
    if (!isOpen) return;

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePosition();
      });
    });

    window.addEventListener('scroll', updatePosition, {
      passive: true,
      capture: true,
    });
    window.addEventListener('resize', updatePosition, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  return { position, currentSide };
}
