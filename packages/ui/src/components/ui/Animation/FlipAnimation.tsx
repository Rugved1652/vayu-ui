// flip.tsx
// UI: presentational

import type { DirectionalAnimationProps } from './types';
import { flipAnimationMap } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationFlip({
  children,
  className,
  direction = 'up',
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'none',
  ref,
  ...props
}: DirectionalAnimationProps) {
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
      )}
      {...props}
    >
      {children}
    </div>
  );
}

AnimationFlip.displayName = 'Animation.Flip';
