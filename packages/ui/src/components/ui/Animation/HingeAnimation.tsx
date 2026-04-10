// hinge.tsx
// UI: presentational

import type { BaseAnimationProps } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationHinge({
  children,
  className,
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'forwards',
  ref,
  ...props
}: BaseAnimationProps) {
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
      )}
      {...props}
    >
      {children}
    </div>
  );
}

AnimationHinge.displayName = 'Animation.Hinge';
