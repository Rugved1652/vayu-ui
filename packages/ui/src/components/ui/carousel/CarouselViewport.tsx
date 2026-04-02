// viewport.tsx
// UI: Viewport with touch and keyboard handling
'use client';
import React, { forwardRef, useCallback, useRef } from 'react';
import { cn } from '../utils';
import { useCarouselContext } from './hooks';

// Layout
const CarouselViewport = forwardRef<HTMLDivElement, import('./types').CarouselViewportProps>(
  ({ className, children, ...props }, ref) => {
    const { currentIndex, totalItems, goNext, goPrevious, goTo } = useCarouselContext();

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

      // Minimum swipe distance of 50px
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
          goTo(totalItems - 1);
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
        {/* Live region for screen readers */}
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
