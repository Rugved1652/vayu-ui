// hinge.tsx
// UI: presentational

'use client';

import { forwardRef } from 'react';
import type { BaseAnimationProps } from './types';
import { usePrefersReducedMotion } from './hooks';
import { buildAnimationClasses } from './utils';

export const AnimationHinge = forwardRef<HTMLDivElement, BaseAnimationProps>(
  (
    {
      children,
      className,
      duration = 'normal',
      delay = 'none',
      iteration = 1,
      fillMode = 'forwards',
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
          'animate-hinge',
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

AnimationHinge.displayName = 'Animation.Hinge';
