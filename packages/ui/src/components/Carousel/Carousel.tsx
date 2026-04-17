// carousel.tsx
// Composition: UI + logic (root component + context provider)

'use client';

import React, { useCallback, useEffect, useState, forwardRef } from 'react';
import { cn } from '../../utils';
import { CarouselContext, usePrefersReducedMotion, useResolvedItemsPerSlide } from './hooks';
import type { CarouselProps, CarouselContextValue, SpeedMultiplier } from './types';

// Root Component
const CarouselBase = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      totalItems,
      autoPlay = false,
      interval = 3000,
      loop = true,
      defaultSpeed = 1,
      defaultIndex = 0,
      itemsPerSlide: itemsPerSlideProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [speed, setSpeed] = useState<SpeedMultiplier>(defaultSpeed);
    const [isPausedByHover, setIsPausedByHover] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    const itemsPerSlide = useResolvedItemsPerSlide(itemsPerSlideProp);
    const isMultiItem = itemsPerSlide > 1;

    // Compute last valid start index
    const lastStartIndex = isMultiItem
      ? Math.max(0, Math.ceil(totalItems / itemsPerSlide) * itemsPerSlide - itemsPerSlide)
      : totalItems - 1;
    const totalPages = Math.ceil(totalItems / itemsPerSlide);

    // Calculate effective interval based on speed
    const effectiveInterval = interval / speed;

    // Snap index to a valid page start position
    const snapIndex = useCallback(
      (index: number) => {
        if (isMultiItem) {
          const snapped = Math.round(index / itemsPerSlide) * itemsPerSlide;
          return Math.min(Math.max(0, snapped), lastStartIndex);
        }
        return Math.max(0, Math.min(index, totalItems - 1));
      },
      [isMultiItem, itemsPerSlide, lastStartIndex, totalItems],
    );

    // Navigation functions
    const goTo = useCallback(
      (index: number) => {
        if (loop) {
          setCurrentIndex(snapIndex((index + totalItems) % totalItems));
        } else {
          setCurrentIndex(snapIndex(index));
        }
      },
      [totalItems, loop, snapIndex],
    );

    const goNext = useCallback(() => {
      if (isMultiItem) {
        const nextIndex = currentIndex + itemsPerSlide;
        if (loop) {
          setCurrentIndex(nextIndex >= totalItems ? 0 : snapIndex(nextIndex));
        } else if (nextIndex <= lastStartIndex) {
          setCurrentIndex(snapIndex(nextIndex));
        }
      } else {
        if (loop || currentIndex < totalItems - 1) {
          setCurrentIndex((prev) => (prev + 1) % totalItems);
        }
      }
    }, [totalItems, loop, currentIndex, isMultiItem, itemsPerSlide, lastStartIndex, snapIndex]);

    const goPrevious = useCallback(() => {
      if (isMultiItem) {
        const prevIndex = currentIndex - itemsPerSlide;
        if (loop) {
          setCurrentIndex(prevIndex < 0 ? lastStartIndex : snapIndex(prevIndex));
        } else if (prevIndex >= 0) {
          setCurrentIndex(snapIndex(prevIndex));
        }
      } else {
        if (loop || currentIndex > 0) {
          setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
        }
      }
    }, [totalItems, loop, currentIndex, isMultiItem, itemsPerSlide, lastStartIndex, snapIndex]);

    // AutoPlay logic with interval
    useEffect(() => {
      if (!isPlaying || prefersReducedMotion || isPausedByHover) {
        return;
      }

      const timer = setInterval(() => {
        if (isMultiItem) {
          const nextIndex = currentIndex + itemsPerSlide;
          if (loop) {
            setCurrentIndex(nextIndex >= totalItems ? 0 : snapIndex(nextIndex));
          } else if (nextIndex <= lastStartIndex) {
            setCurrentIndex(snapIndex(nextIndex));
          } else {
            setIsPlaying(false);
          }
        } else {
          if (loop || currentIndex < totalItems - 1) {
            setCurrentIndex((prev) => (prev + 1) % totalItems);
          } else {
            setIsPlaying(false);
          }
        }
      }, effectiveInterval);

      return () => clearInterval(timer);
    }, [
      isPlaying,
      effectiveInterval,
      loop,
      totalItems,
      currentIndex,
      prefersReducedMotion,
      isPausedByHover,
      isMultiItem,
      itemsPerSlide,
      lastStartIndex,
      snapIndex,
    ]);

    // Clamp currentIndex when itemsPerSlide changes (responsive breakpoint shift)
    useEffect(() => {
      setCurrentIndex((prev) => {
        const snapped = snapIndex(prev);
        return snapped;
      });
    }, [snapIndex]);

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalItems,
      itemsPerSlide,
      totalPages,
      isPlaying,
      setIsPlaying,
      speed,
      setSpeed,
      loop,
      goTo,
      goNext,
      goPrevious,
      interval,
      isPausedByHover,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="region"
          aria-label="Image carousel"
          aria-roledescription="carousel"
          className={cn('relative', className)}
          onMouseEnter={() => setIsPausedByHover(true)}
          onMouseLeave={() => setIsPausedByHover(false)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);

CarouselBase.displayName = 'Carousel';

// Export default for composition
export default CarouselBase;
