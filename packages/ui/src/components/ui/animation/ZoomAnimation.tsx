// zoom.tsx
// UI: presentational

'use client';

import { forwardRef } from 'react';
import type { ScaleAnimationProps } from './types';
import { zoomScaleMap } from './types';
import { usePrefersReducedMotion } from './hooks';
import { buildAnimationClasses } from './utils';

export const AnimationZoom = forwardRef<HTMLDivElement, ScaleAnimationProps>(
  (
    {
      children,
      className,
      scale = 'medium',
      duration = 'normal',
      delay = 'none',
      iteration = 1,
      fillMode = 'none',
      onAnimationEnd,
      onAnimationStart,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = usePrefersReducedMotion();

    return (
      <div
        ref={ref}
        className={buildAnimationClasses(
          zoomScaleMap[scale],
          duration,
          delay,
          iteration,
          fillMode,
          className,
          reduceMotion,
        )}
        onAnimationEnd={onAnimationEnd}
        onAnimationStart={onAnimationStart}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AnimationZoom.displayName = 'Animation.Zoom';
