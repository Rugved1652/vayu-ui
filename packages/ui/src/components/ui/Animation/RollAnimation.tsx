// roll.tsx
// UI: presentational

import type { DirectionalAnimationProps } from './types';
import { rollAnimationMap } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationRoll({
  children,
  className,
  direction = 'left',
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
        rollAnimationMap[direction],
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

AnimationRoll.displayName = 'Animation.Roll';
