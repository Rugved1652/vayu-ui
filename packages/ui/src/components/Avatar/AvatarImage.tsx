// AvatarImage.tsx
// UI: Image with loading states and fallback support

'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';
import type { AvatarImageProps } from './types';

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, fallbackSrc, alt = '', className, onError, onLoad, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [tryingFallback, setTryingFallback] = useState(false);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (fallbackSrc && !tryingFallback) {
        setTryingFallback(true);
        setImageLoading(true);
        setImageError(false);
      } else {
        setImageError(true);
        setImageLoading(false);
      }
      onError?.(e);
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setImageError(false);
      setImageLoading(false);
      onLoad?.(e);
    };

    const currentSrc = tryingFallback && fallbackSrc ? fallbackSrc : src;

    if (imageError || !currentSrc) return null;

    return (
      <>
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover rounded-full',
            'motion-safe:transition-opacity motion-safe:duration-300',
            imageLoading ? 'opacity-0' : 'opacity-100',
            className,
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
          {...props}
        />
        {imageLoading && (
          <span
            className="absolute inset-0 flex items-center justify-center bg-muted rounded-full"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <span
              className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full motion-safe:animate-spin"
              aria-hidden="true"
            ></span>
          </span>
        )}
      </>
    );
  },
);

AvatarImage.displayName = 'Avatar.Image';

export { AvatarImage };
