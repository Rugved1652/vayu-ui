// speed-control.tsx
// UI: Playback speed selector

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

const SPEED_OPTIONS: import('./types').SpeedMultiplier[] = [0.5, 1, 1.5, 2];

const CarouselSpeedControl = forwardRef<
  HTMLDivElement,
  import('./types').CarouselSpeedControlProps
>(({ className, showLabel = true, ...props }, ref) => {
  const { speed, setSpeed } = useCarouselContext();

  return (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
      {showLabel && (
        <label htmlFor="carousel-speed" className="text-sm text-muted-content">
          Speed:
        </label>
      )}
      <select
        id="carousel-speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value) as import('./types').SpeedMultiplier)}
        aria-label="Playback speed"
        className={cn(
          'px-2 py-1.5 rounded-control text-sm',
          'bg-surface text-surface-content',
          'border border-border',
          'hover:bg-muted/50 hover:border-field',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          'transition-all duration-150',
          'cursor-pointer',
        )}
      >
        {SPEED_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}x
          </option>
        ))}
      </select>
    </div>
  );
});

CarouselSpeedControl.displayName = 'Carousel.SpeedControl';

export default CarouselSpeedControl;
