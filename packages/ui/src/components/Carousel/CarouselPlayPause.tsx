// play-pause.tsx
// UI: Play/pause slideshow button

import React, { forwardRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '../../utils';
import { useCarouselContext } from './hooks';

const CarouselPlayPause = forwardRef<HTMLButtonElement, import('./types').CarouselPlayPauseProps>(
  ({ className, showLabel = false, ...props }, ref) => {
    const { isPlaying, setIsPlaying } = useCarouselContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        className={cn(
          'flex items-center justify-center gap-2',
          'px-3 py-2 rounded-control',
          'bg-surface text-surface-content',
          'border border-border',
          'hover:bg-muted/50 hover:border-field',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          'transition-all duration-150',
          className,
        )}
        {...props}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" aria-hidden="true" />
            {showLabel && <span>Pause</span>}
          </>
        ) : (
          <>
            <Play className="w-4 h-4" aria-hidden="true" />
            {showLabel && <span>Play</span>}
          </>
        )}
      </button>
    );
  },
);

CarouselPlayPause.displayName = 'Carousel.PlayPause';

export default CarouselPlayPause;
