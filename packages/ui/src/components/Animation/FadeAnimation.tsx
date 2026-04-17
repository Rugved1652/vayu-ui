// fade.tsx
// UI: presentational

import type { BaseAnimationProps } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationFade({
  children,
  className,
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'none',
  ref,
  ...props
}: BaseAnimationProps) {
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
      )}
      {...props}
    >
      {children}
    </div>
  );
}

AnimationFade.displayName = 'Animation.Fade';
