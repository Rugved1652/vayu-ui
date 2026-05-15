'use client';

import { useEffect } from 'react';
import { trackComponentView } from '@/lib/analytics';

/**
 * Component View Tracker
 * Tracks when users view component documentation pages
 */
interface ComponentViewTrackerProps {
  componentName: string | undefined;
  category?: string | undefined;
}

export function ComponentViewTracker({ componentName, category }: ComponentViewTrackerProps) {
  useEffect(() => {
    if (componentName) {
      trackComponentView(componentName, category);
    }
  }, [componentName, category]);

  return null;
}
