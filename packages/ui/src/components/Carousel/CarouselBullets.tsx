// bullets.tsx
// UI: Slide indicator dots

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import { useCarouselContext } from './hooks';

const CarouselBullets = forwardRef<HTMLDivElement, import('./types').CarouselBulletsProps>(
  ({ className, ...props }, ref) => {
    const { currentIndex, totalItems, itemsPerSlide, totalPages, goTo } = useCarouselContext();
    const isMultiItem = itemsPerSlide > 1;

    const bulletCount = isMultiItem ? totalPages : totalItems;
    const currentPage = isMultiItem ? Math.floor(currentIndex / itemsPerSlide) : currentIndex;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slide indicators"
        className={cn('flex items-center justify-center gap-2 mt-4', className)}
        {...props}
      >
        {Array.from({ length: bulletCount }, (_, index) => {
          const isActive = index === currentPage;
          const goToIndex = isMultiItem ? index * itemsPerSlide : index;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to ${isMultiItem ? 'page' : 'slide'} ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(goToIndex)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                isActive ? 'bg-brand w-6' : 'bg-muted hover:bg-brand/60',
              )}
            />
          );
        })}
      </div>
    );
  },
);

CarouselBullets.displayName = 'Carousel.Bullets';

export default CarouselBullets;
