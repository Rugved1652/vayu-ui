// viewport.tsx
// UI: Viewport with touch and keyboard handling
'use client';
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

// Layout
const CarouselViewport = forwardRef<HTMLDivElement, import('./types').CarouselViewportProps>(
  ({ className, children, ...props }, ref) => {
    const {
      currentIndex,
      totalItems,
      itemsPerSlide,
      totalPages,
      goNext,
      goPrevious,
      goTo,
    } = useCarouselContext();

    const isMultiItem = itemsPerSlide > 1;

    // Touch handling
    const touchStartX = useRef<number | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goNext();
        } else {
          goPrevious();
        }
      }

      touchStartX.current = null;
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          if (isMultiItem) {
            goTo((totalPages - 1) * itemsPerSlide);
          } else {
            goTo(totalItems - 1);
          }
          break;
      }
    };

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        viewportRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // Track transform for multi-item mode
    const trackStyle = useMemo(() => {
      if (!isMultiItem) return undefined;
      const translatePercent = currentIndex * (100 / itemsPerSlide);
      return {
        transform: `translateX(-${translatePercent}%)`,
      };
    }, [isMultiItem, currentIndex, totalItems]);

    const currentPage = isMultiItem ? Math.floor(currentIndex / itemsPerSlide) + 1 : currentIndex + 1;
    const pageCount = isMultiItem ? totalPages : totalItems;

    if (isMultiItem) {
      return (
        <div
          ref={setRefs}
          role="group"
          aria-label={`Page ${currentPage} of ${pageCount}`}
          className={cn('overflow-hidden relative rounded-surface', className)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          {...props}
        >
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Page {currentPage} of {pageCount}
          </div>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={trackStyle}
          >
            {children}
          </div>
        </div>
      );
    }

    // Single-item mode: original crossfade behavior
    return (
      <div
        ref={setRefs}
        role="group"
        aria-label={`Slide ${currentIndex + 1} of ${totalItems}`}
        className={cn('overflow-hidden relative rounded-surface', className)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        {...props}
      >
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Slide {currentIndex + 1} of {totalItems}
        </div>
        {children}
      </div>
    );
  },
);

CarouselViewport.displayName = 'Carousel.Viewport';

export default CarouselViewport;
