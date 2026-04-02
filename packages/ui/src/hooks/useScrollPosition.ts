'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
  directionY: 'up' | 'down' | null;
  directionX: 'left' | 'right' | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number;
}

export interface UseScrollPositionOptions {
  throttle?: number;
  element?: React.RefObject<HTMLElement | null>;
}

export const useScrollPosition = (options: UseScrollPositionOptions = {}): ScrollPosition => {
  const { throttle: throttleMs = 50, element } = options;

  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    directionY: null,
    directionX: null,
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  const prevY = useRef(0);
  const prevX = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    let scrollX: number;
    let scrollY: number;
    let scrollHeight: number;
    let clientHeight: number;

    if (element?.current) {
      const el = element.current;
      scrollX = el.scrollLeft;
      scrollY = el.scrollTop;
      scrollHeight = el.scrollHeight;
      clientHeight = el.clientHeight;
    } else {
      scrollX = window.scrollX;
      scrollY = window.scrollY;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    }

    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 100, 100) : 0;

    const directionY: 'up' | 'down' | null =
      scrollY > prevY.current ? 'down' : scrollY < prevY.current ? 'up' : null;
    const directionX: 'left' | 'right' | null =
      scrollX > prevX.current ? 'right' : scrollX < prevX.current ? 'left' : null;

    prevY.current = scrollY;
    prevX.current = scrollX;

    setPosition({
      x: scrollX,
      y: scrollY,
      directionY,
      directionX,
      isAtTop: scrollY <= 0,
      isAtBottom: scrollY >= maxScroll - 1,
      progress,
    });
  }, [element]);

  useEffect(() => {
    const target = element?.current ?? window;
    let lastTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastTime < throttleMs) {
        if (!ticking.current) {
          ticking.current = true;
          requestAnimationFrame(() => {
            update();
            ticking.current = false;
          });
        }
        return;
      }
      lastTime = now;
      update();
    };

    update();

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [element, throttleMs, update]);

  return position;
};
