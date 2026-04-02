// slide.tsx
// UI: Individual slide

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

const CarouselSlide = forwardRef<HTMLDivElement, import('./types').CarouselSlideProps>(
  ({ index, className, children, ...props }, ref) => {
    const { currentIndex } = useCarouselContext();
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
