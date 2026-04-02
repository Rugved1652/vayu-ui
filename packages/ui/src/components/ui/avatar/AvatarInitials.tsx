// AvatarInitials.tsx
// UI: Generated initials with background color

'use client';

import React, { useMemo, forwardRef } from 'react';
import { cn } from '../utils';
import type { AvatarInitialsProps } from './types';
import { generateInitials, getInitialsColor } from './hooks';

const AvatarInitials = forwardRef<HTMLSpanElement, AvatarInitialsProps>(
  ({ username, className, ...props }, ref) => {
    const initials = useMemo(() => generateInitials(username), [username]);
    const backgroundColor = useMemo(() => getInitialsColor(username), [username]);

    if (!initials) return null;

    return (
      <span
        ref={ref}
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'text-white font-primary font-semibold select-none rounded-full',
          className,
        )}
        style={{ backgroundColor }}
        aria-hidden="true"
        {...props}
      >
        {initials}
      </span>
    );
  },
);

AvatarInitials.displayName = 'Avatar.Initials';

export { AvatarInitials };
