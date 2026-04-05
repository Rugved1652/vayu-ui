// fade.tsx
// UI: presentational

'use client';

import { forwardRef } from 'react';
import type { BaseAnimationProps } from './types';
import { usePrefersReducedMotion } from './hooks';
import { buildAnimationClasses } from './utils';

export const AnimationFade = forwardRef<HTMLDivElement, BaseAnimationProps>(
  (
    {
      children,
      className,
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
          'animate-fade-in',
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

AnimationFade.displayName = 'Animation.Fade';
