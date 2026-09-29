'use client';
import { useEffect, RefObject, useRef } from 'react';

type EventType = MouseEvent | TouchEvent | PointerEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | ReadonlyArray<RefObject<HTMLElement | null>>,
  handler: (event: EventType) => void,
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const refArray: ReadonlyArray<RefObject<HTMLElement | null>> =
      'current' in refs ? [refs] : refs;

    const listener = (event: EventType) => {
      const target = event.target as Node;
      // Do nothing if clicking inside any of the ref elements
      if (refArray.some((ref) => ref.current && ref.current.contains(target))) {
        return;
      }
      handlerRef.current(event);
    };

    const events =
      typeof window.PointerEvent === 'function'
        ? (['pointerdown'] as const)
        : (['mousedown', 'touchstart'] as const);
    for (const event of events) document.addEventListener(event, listener as EventListener);

    return () => {
      for (const event of events) document.removeEventListener(event, listener as EventListener);
    };
  }, [refs]);
};
