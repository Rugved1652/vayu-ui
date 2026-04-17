// hooks.ts
// Logic
'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { ItemsPerSlide } from './types';

// Context will be created in carousel.tsx
export const CarouselContext = React.createContext<import('./types').CarouselContextValue | null>(
  null,
);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel compound components must be used within a Carousel component');
  }
  return context;
};

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

const BREAKPOINTS: Record<string, string> = {
  '2xl': '(min-width: 1536px)',
  xl: '(min-width: 1280px)',
  lg: '(min-width: 1024px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 640px)',
};

const BREAKPOINT_ORDER = ['2xl', 'xl', 'lg', 'md', 'sm'] as const;

export const useResolvedItemsPerSlide = (itemsPerSlide?: ItemsPerSlide): number => {
  const is2xl = useMediaQuery(BREAKPOINTS['2xl']);
  const isXl = useMediaQuery(BREAKPOINTS.xl);
  const isLg = useMediaQuery(BREAKPOINTS.lg);
  const isMd = useMediaQuery(BREAKPOINTS.md);
  const isSm = useMediaQuery(BREAKPOINTS.sm);

  const matches = useMemo(
    () => ({ '2xl': is2xl, xl: isXl, lg: isLg, md: isMd, sm: isSm }),
    [is2xl, isXl, isLg, isMd, isSm],
  );

  return useMemo(() => {
    if (itemsPerSlide === undefined) return 1;
    if (typeof itemsPerSlide === 'number') return itemsPerSlide;

    // Check from largest breakpoint down
    for (const bp of BREAKPOINT_ORDER) {
      if (matches[bp] && itemsPerSlide[bp] !== undefined) {
        return itemsPerSlide[bp]!;
      }
    }
    return itemsPerSlide.base;
  }, [itemsPerSlide, matches]);
};
