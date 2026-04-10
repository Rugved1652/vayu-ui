// bounce.tsx
// UI: presentational

import type { ScaleAnimationProps } from './types';
import { bounceScaleMap } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationBounce({
  children,
  className,
  scale = 'medium',
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'none',
  ref,
  ...props
}: ScaleAnimationProps) {
  return (
    <div
      ref={ref}
      className={buildAnimationClasses(
        bounceScaleMap[scale],
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

AnimationBounce.displayName = 'Animation.Bounce';
