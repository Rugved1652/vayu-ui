// gallery.tsx
// UI: Thumbnail gallery

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import { useCarouselContext } from './hooks';

const CarouselGallery = forwardRef<HTMLDivElement, import('./types').CarouselGalleryProps>(
  ({ items, className, ...props }, ref) => {
    const { currentIndex, goTo } = useCarouselContext();

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Slide thumbnails"
        className={cn(
          'flex items-center gap-2 overflow-x-auto py-2',
          'scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
          className,
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}: ${item.alt}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'shrink-0',
                'w-16 h-12 rounded-control overflow-hidden',
                'border-2 transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                isActive ? 'border-brand ring-2 ring-brand/20' : 'border-border hover:border-muted',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain bg-elevated"
              />
            </button>
          );
        })}
      </div>
    );
  },
);

CarouselGallery.displayName = 'Carousel.Gallery';

export default CarouselGallery;
