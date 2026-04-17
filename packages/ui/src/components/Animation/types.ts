// types.ts
// Types

export type AnimationDuration = 'slower' | 'slow' | 'normal' | 'fast' | 'faster';
export type AnimationDelay = 'none' | 'short' | 'medium' | 'long';
export type AnimationIteration = 1 | 2 | 3 | 'infinite';
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type AnimationScale = 'small' | 'medium' | 'large';

import { type HTMLAttributes, type ReactNode, type Ref } from 'react';

export interface BaseAnimationProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
  duration?: AnimationDuration;
  delay?: AnimationDelay;
  iteration?: AnimationIteration;
  fillMode?: AnimationFillMode;
}

export interface DirectionalAnimationProps extends BaseAnimationProps {
  direction?: AnimationDirection;
}

export interface ScaleAnimationProps extends BaseAnimationProps {
  scale?: AnimationScale;
}

export interface RotateAnimationProps extends BaseAnimationProps {
  degrees?: number;
}

// Mappings

/**
 * Duration mapping using CSS custom properties from the design system.
 * These align with --transition-* tokens for consistency.
 */
export const durationMap: Record<AnimationDuration, string> = {
  slower: 'duration-[2000ms]',
  slow: 'duration-[1500ms]',
  normal: 'duration-1000',
  fast: 'duration-700',
  faster: 'duration-500',
};

/**
 * Delay mapping for staggered animations.
 * Useful for sequential entrance animations.
 */
export const delayMap: Record<AnimationDelay, string> = {
  none: 'delay-0',
  short: 'delay-150',
  medium: 'delay-300',
  long: 'delay-500',
};

/**
 * Iteration count using arbitrary properties for precise control.
 */
export const iterationMap: Record<AnimationIteration, string> = {
  1: '[animation-iteration-count:1]',
  2: '[animation-iteration-count:2]',
  3: '[animation-iteration-count:3]',
  infinite: '[animation-iteration-count:infinite]',
};

/**
 * Fill mode for animation state preservation.
 */
export const fillModeMap: Record<AnimationFillMode, string> = {
  none: '[animation-fill-mode:none]',
  forwards: '[animation-fill-mode:forwards]',
  backwards: '[animation-fill-mode:backwards]',
  both: '[animation-fill-mode:both]',
};

/**
 * Direction to slide animation mapping.
 */
export const directionAnimationMap: Record<AnimationDirection, string> = {
  left: 'animate-slide-in-left',
  right: 'animate-slide-in-right',
  up: 'animate-slide-in-up',
  down: 'animate-slide-in-down',
};

/**
 * Direction to flip animation mapping.
 */
export const flipAnimationMap: Record<AnimationDirection, string> = {
  up: 'animate-flip-in-x',
  down: 'animate-flip-in-x [animation-direction:reverse]',
  left: 'animate-flip-in-y',
  right: 'animate-flip-in-y [animation-direction:reverse]',
};

/**
 * Direction to roll animation mapping.
 */
export const rollAnimationMap: Record<AnimationDirection, string> = {
  left: 'animate-roll-in',
  right: 'animate-roll-in-right',
  up: 'animate-roll-in-up',
  down: 'animate-roll-in-down',
};

/**
 * Scale to bounce animation mapping.
 */
export const bounceScaleMap: Record<AnimationScale, string> = {
  small: 'animate-bounce-in-small',
  medium: 'animate-bounce-in',
  large: 'animate-bounce-in-large',
};

/**
 * Scale to zoom animation mapping.
 */
export const zoomScaleMap: Record<AnimationScale, string> = {
  small: 'animate-zoom-in-small',
  medium: 'animate-zoom-in',
  large: 'animate-zoom-in-large',
};
