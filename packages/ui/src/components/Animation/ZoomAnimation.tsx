// zoom.tsx
// UI: presentational

import type { ScaleAnimationProps } from './types';
import { zoomScaleMap } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationZoom({
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
        zoomScaleMap[scale],
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

AnimationZoom.displayName = 'Animation.Zoom';
