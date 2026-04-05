// hooks.ts
// Logic

import { useEffect, useState } from 'react';

/**
 * Detects if the user has requested reduced motion in their OS settings.
 * Essential for preventing vestibular disorders triggers and WCAG 2.2 compliance.
 * @see https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (SSR safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
