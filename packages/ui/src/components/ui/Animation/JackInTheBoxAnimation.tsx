// jackinthebox.tsx
// UI: presentational

import type { BaseAnimationProps } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationJackInTheBox({
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
        'animate-jack-in-the-box',
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

AnimationJackInTheBox.displayName = 'Animation.JackInTheBox';
