// utils.ts
// Logic

import type {
  AnimationDelay,
  AnimationDuration,
  AnimationFillMode,
  AnimationIteration,
} from './types';
import { durationMap, delayMap, iterationMap, fillModeMap } from './types';
import { cn } from '../../utils';

export function buildAnimationClasses(
  baseAnimation: string,
  duration: AnimationDuration,
  delay: AnimationDelay,
  iteration: AnimationIteration,
  fillMode: AnimationFillMode,
  className?: string,
): string {
  return cn(
    baseAnimation,
    durationMap[duration],
    delayMap[delay],
    iterationMap[iteration],
    fillModeMap[fillMode],
    'motion-reduce:opacity-100',
    className,
  );
}
