// next.tsx
// UI: Next navigation button

import React, { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import { useCarouselContext } from './hooks';

const CarouselNext = forwardRef<HTMLButtonElement, import('./types').CarouselNavigationProps>(
  ({ className, showLabel = false, ...props }, ref) => {
    const { goNext, currentIndex, loop, totalItems, itemsPerSlide, totalPages } = useCarouselContext();
    const isMultiItem = itemsPerSlide > 1;
    const isDisabled = isMultiItem
      ? !loop && Math.floor(currentIndex / itemsPerSlide) >= totalPages - 1
      : !loop && currentIndex === totalItems - 1;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goNext}
        disabled={isDisabled}
        aria-label="Next slide"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 z-10',
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
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
        {showLabel && <span className="mr-1">Next</span>}
      </button>
    );
  },
);

CarouselNext.displayName = 'Carousel.Next';

export default CarouselNext;
