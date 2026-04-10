// slide.tsx
// UI: Individual slide

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

const CarouselSlide = forwardRef<HTMLDivElement, import('./types').CarouselSlideProps>(
  ({ index, className, children, ...props }, ref) => {
    const { currentIndex, itemsPerSlide, totalItems } = useCarouselContext();
    const isMultiItem = itemsPerSlide > 1;

    if (isMultiItem) {
      const pageStart = currentIndex;
      const pageEnd = Math.min(currentIndex + itemsPerSlide, totalItems);
      const isVisible = index >= pageStart && index < pageEnd;

      return (
        <div
          ref={ref}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1}`}
          aria-hidden={!isVisible}
          data-index={index}
          data-active={isVisible}
          className={cn('px-1', className)}
          style={{
            flex: `0 0 calc(100% / ${itemsPerSlide})`,
            maxWidth: `calc(100% / ${itemsPerSlide})`,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Single-item mode: crossfade behavior
    const isActive = index === currentIndex;

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1}`}
        aria-hidden={!isActive}
        data-index={index}
        data-active={isActive}
        className={cn(
          'transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CarouselSlide.displayName = 'Carousel.Slide';

export default CarouselSlide;
