// AvatarFallback.tsx
// UI: Default avatar image

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import type { AvatarFallbackProps } from './types';

const AvatarFallback = forwardRef<HTMLImageElement, AvatarFallbackProps>(
  (
    {
      src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      alt = 'Default avatar',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <img
        ref={ref}
        src={src}
        alt=""
        className={cn(
          'absolute inset-0 w-full h-full object-cover rounded-full',
          'opacity-80 dark:opacity-60',
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

AvatarFallback.displayName = 'Avatar.Fallback';

export { AvatarFallback };
