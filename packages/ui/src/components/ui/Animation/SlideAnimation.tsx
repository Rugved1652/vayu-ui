// slide.tsx
// UI: presentational

import type { DirectionalAnimationProps } from './types';
import { directionAnimationMap } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationSlide({
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
        directionAnimationMap[direction],
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

AnimationSlide.displayName = 'Animation.Slide';
