// media.tsx
// UI: Card media/image with overlay support

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { CardMediaProps } from './types';

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ src, alt, aspectRatio = '16/9', fit = 'cover', overlay, className, ...props }, ref) => {
    const fitClass =
      fit === 'cover' ? 'object-cover' : fit === 'contain' ? 'object-contain' : 'object-fill';

    return (
      <div
        ref={ref}
        className={cn(
          'relative -mx-[inherit] overflow-hidden first:-mt-[inherit] first:rounded-t-[inherit] last:-mb-[inherit] last:rounded-b-[inherit]',
          className,
        )}
        style={{ aspectRatio }}
        {...props}
      >
        {/* Image */}
        <img src={src} alt={alt} className={cn('w-full h-full', fitClass)} loading="lazy" />

        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4">
            {overlay}
          </div>
        )}
      </div>
    );
  },
);

CardMedia.displayName = 'Card.Media';
