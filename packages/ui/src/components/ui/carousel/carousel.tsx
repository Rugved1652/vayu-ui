// carousel.tsx
// Composition: UI + logic (root component + context provider)

'use client';

import React, { useCallback, useEffect, useState, forwardRef } from 'react';
import { cn } from '../utils';
import { CarouselContext, usePrefersReducedMotion } from './hooks';
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

    // Calculate effective interval based on speed
    const effectiveInterval = interval / speed;

    // Navigation functions
    const goTo = useCallback(
      (index: number) => {
        if (loop) {
          setCurrentIndex((index + totalItems) % totalItems);
        } else {
          setCurrentIndex(Math.max(0, Math.min(index, totalItems - 1)));
        }
      },
      [totalItems, loop],
    );

    const goNext = useCallback(() => {
      if (loop || currentIndex < totalItems - 1) {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }
    }, [totalItems, loop, currentIndex]);

    const goPrevious = useCallback(() => {
      if (loop || currentIndex > 0) {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      }
    }, [totalItems, loop, currentIndex]);

    // AutoPlay logic with interval
    useEffect(() => {
      // Don't auto-play if user prefers reduced motion, is paused by hover, or not playing
      if (!isPlaying || prefersReducedMotion || isPausedByHover) {
        return;
      }

      const timer = setInterval(() => {
        if (loop || currentIndex < totalItems - 1) {
          setCurrentIndex((prev) => (prev + 1) % totalItems);
        } else {
          // Stop at the end if not looping
          setIsPlaying(false);
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
    ]);

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalItems,
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
