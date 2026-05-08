'use client';

import { useState, useRef, useEffect } from 'react';
import type { UseInViewOptions } from '../components/Animation/types';

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
): { ref: React.RefObject<T | null>; isInView: boolean } => {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isInView };
};
