// rotate.tsx
// UI: presentational

import type { CSSProperties } from 'react';
import type { RotateAnimationProps } from './types';
import { buildAnimationClasses } from './utils';

export function AnimationRotate({
  children,
  className,
  degrees = -200,
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'none',
  ref,
  ...props
}: RotateAnimationProps) {
  const style: CSSProperties = {
    '--rotation-start': `${degrees}deg`,
    ...props.style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={buildAnimationClasses(
        'animate-rotate-in',
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

AnimationRotate.displayName = 'Animation.Rotate';
