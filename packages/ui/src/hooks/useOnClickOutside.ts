'use client';
import { useEffect, RefObject } from 'react';

type EventType = MouseEvent | TouchEvent | PointerEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: EventType) => void,
) => {
  useEffect(() => {
    const refArray = Array.isArray(refs) ? refs : [refs];

    const listener = (event: EventType) => {
      const target = event.target as Node;
      // Do nothing if clicking inside any of the ref elements
      if (refArray.some((ref) => ref.current && ref.current.contains(target))) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    document.addEventListener('pointerdown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('pointerdown', listener);
    };
  }, [refs, handler]);
};
