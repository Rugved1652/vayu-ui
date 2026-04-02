// hooks.ts
// Logic

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { AffixPosition } from './types';

export function useAffixMeasure(
  innerRef: React.RefObject<HTMLDivElement | null>,
  placeholderRef: React.RefObject<HTMLDivElement | null>,
  offset: number,
  position: AffixPosition,
  target: HTMLElement | null,
  zIndex: number,
  onAffixed?: (affixed: boolean) => void,
) {
  const [isAffixed, setIsAffixed] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({});

  const prevAffixedRef = useRef(false);

  const updateAffixed = useCallback(
    (next: boolean) => {
      if (prevAffixedRef.current !== next) {
        onAffixed?.(next);
        prevAffixedRef.current = next;
      }
      setIsAffixed(next);
    },
    [onAffixed],
  );

  const measure = useCallback(() => {
    const el = innerRef.current;
    const placeholder = placeholderRef.current;
    if (!el || !placeholder) return;

    const elHeight = el.offsetHeight;
    const rect = placeholder.getBoundingClientRect();
    const isContainerMode = target instanceof HTMLElement;

    // Mode 1: Custom Container (Absolute)
    if (isContainerMode) {
      const containerRect = target.getBoundingClientRect();
      const scrollTop = target.scrollTop;

      if (position === 'top') {
        const shouldAffix = rect.top - containerRect.top <= offset;

        if (shouldAffix) {
          setPlaceholderHeight(elHeight);
          setAffixStyle({
            position: 'absolute',
            top: scrollTop + offset,
            left: rect.left - containerRect.left,
            width: rect.width,
            zIndex,
          });
          updateAffixed(true);
        } else {
          setPlaceholderHeight(0);
          setAffixStyle({});
          updateAffixed(false);
        }
      } else {
        const shouldAffix = rect.bottom - containerRect.bottom >= -offset;

        if (shouldAffix) {
          setPlaceholderHeight(elHeight);
          const containerVisibleBottom = target.clientHeight;

          setAffixStyle({
            position: 'absolute',
            top: scrollTop + (containerVisibleBottom - elHeight) - offset,
            left: rect.left - containerRect.left,
            width: rect.width,
            zIndex,
          });
          updateAffixed(true);
        } else {
          setPlaceholderHeight(0);
          setAffixStyle({});
          updateAffixed(false);
        }
      }
    }
    // Mode 2: Window (Fixed)
    else {
      const containerTop = 0;
      const containerBottom = window.innerHeight;

      if (position === 'top') {
        const shouldAffix = rect.top - containerTop <= offset;

        if (shouldAffix) {
          setPlaceholderHeight(elHeight);
          setAffixStyle({
            position: 'fixed',
            top: containerTop + offset,
            left: rect.left,
            width: rect.width,
            zIndex,
          });
          updateAffixed(true);
        } else {
          setPlaceholderHeight(0);
          setAffixStyle({});
          updateAffixed(false);
        }
      } else {
        const shouldAffix = rect.bottom - containerBottom >= -offset;

        if (shouldAffix) {
          setPlaceholderHeight(elHeight);
          setAffixStyle({
            position: 'fixed',
            bottom: offset,
            left: rect.left,
            width: rect.width,
            zIndex,
          });
          updateAffixed(true);
        } else {
          setPlaceholderHeight(0);
          setAffixStyle({});
          updateAffixed(false);
        }
      }
    }
  }, [offset, position, target, zIndex, updateAffixed]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  return { isAffixed, placeholderHeight, affixStyle, measure };
}

export function useAffixScroll(measure: () => void, target: HTMLElement | null) {
  const frameId = useRef<number | null>(null);
  const isTicking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!isTicking.current) {
      frameId.current = requestAnimationFrame(() => {
        measure();
        isTicking.current = false;
      });
      isTicking.current = true;
    }
  }, [measure]);

  useEffect(() => {
    const scrollTarget = target || window;

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
    };
  }, [measure, handleScroll, target]);
}
