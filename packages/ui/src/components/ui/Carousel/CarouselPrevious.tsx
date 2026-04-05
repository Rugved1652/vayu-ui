// previous.tsx
// UI: Previous navigation button

import React, { forwardRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

const CarouselPrevious = forwardRef<HTMLButtonElement, import('./types').CarouselNavigationProps>(
  ({ className, showLabel = false, ...props }, ref) => {
    const { goPrevious, currentIndex, loop, totalItems } = useCarouselContext();
    const isDisabled = !loop && currentIndex === 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goPrevious}
        disabled={isDisabled}
        aria-label="Previous slide"
        className={cn(
          'absolute left-2 top-1/2 -translate-y-1/2 z-10',
          'flex items-center justify-center',
          'w-10 h-10 rounded-full',
          'bg-elevated/90 text-elevated-content',
          'border border-border shadow-control',
          'hover:bg-surface hover:border-brand',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:pointer-events-none',
          'transition-all duration-150',
          className,
        )}
        {...props}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        {showLabel && <span className="ml-1">Previous</span>}
      </button>
    );
  },
);

CarouselPrevious.displayName = 'Carousel.Previous';

export default CarouselPrevious;
