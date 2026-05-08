'use client';

import type { CSSProperties } from 'react';
import type { AnimateInViewProps, AnimationVariant } from './types';
import {
  directionAnimationMap,
  flipAnimationMap,
  bounceScaleMap,
  zoomScaleMap,
  rollAnimationMap,
} from './types';
import { buildAnimationClasses } from './utils';
import { cn } from '../../utils';
import { useInView } from '../../hooks/useInView';

function getBaseAnimationClass(
  variant: AnimationVariant,
  direction: string,
  scale: string,
): string {
  const variantMap: Record<AnimationVariant, string> = {
    fade: 'animate-fade-in',
    slide: directionAnimationMap[direction as keyof typeof directionAnimationMap],
    bounce: bounceScaleMap[scale as keyof typeof bounceScaleMap],
    flip: flipAnimationMap[direction as keyof typeof flipAnimationMap],
    rotate: 'animate-rotate-in',
    zoom: zoomScaleMap[scale as keyof typeof zoomScaleMap],
    roll: rollAnimationMap[direction as keyof typeof rollAnimationMap],
    jackInTheBox: 'animate-jack-in-the-box',
    hinge: 'animate-hinge',
  };
  return variantMap[variant];
}

export function AnimationInView({
  children,
  className,
  variant,
  direction = 'left',
  scale = 'medium',
  degrees = -200,
  duration = 'normal',
  delay = 'none',
  iteration = 1,
  fillMode = 'none',
  triggerOnce = true,
  threshold = 0.1,
  rootMargin = '0px',
  ...props
}: AnimateInViewProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const style: CSSProperties | undefined =
    variant === 'rotate'
      ? ({ '--rotation-start': `${degrees}deg`, ...props.style } as CSSProperties)
      : (props.style as CSSProperties | undefined);

  if (!isInView) {
    return (
      <div ref={ref} className={cn('opacity-0', className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={style}
      className={buildAnimationClasses(
        getBaseAnimationClass(variant, direction, scale),
        duration,
        delay,
        iteration,
        fillMode,
        className,
      )}
    >
      {children}
    </div>
  );
}

AnimationInView.displayName = 'Animation.InView';
