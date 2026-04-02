// flip.tsx
// UI: presentational

'use client';

import { forwardRef } from 'react';
import type { DirectionalAnimationProps } from './types';
import { flipAnimationMap } from './types';
import { usePrefersReducedMotion } from './hooks';
import { buildAnimationClasses } from './utils';

export const AnimationFlip = forwardRef<HTMLDivElement, DirectionalAnimationProps>(
  (
    {
      children,
      className,
      direction = 'up',
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
          flipAnimationMap[direction],
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

AnimationFlip.displayName = 'Animation.Flip';
