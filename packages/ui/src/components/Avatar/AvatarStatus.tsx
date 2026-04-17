// AvatarStatus.tsx
// UI: Status indicator dot

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import type { AvatarStatusProps } from './types';

const AvatarStatus = forwardRef<HTMLSpanElement, AvatarStatusProps>(
  ({ status, label, className, ...props }, ref) => {
    const statusConfig = {
      online: { color: 'bg-success', label: 'Online' },
      offline: { color: 'bg-muted-content', label: 'Offline' },
      away: { color: 'bg-warning', label: 'Away' },
      busy: { color: 'bg-destructive', label: 'Busy' },
    };

    const config = statusConfig[status];

    return (
      <span
        ref={ref}
        className={cn(
          'absolute -bottom-0.5 -right-0.5',
          'w-5 h-5 rounded-full',
          'border-2 border-canvas',
          'z-10 shadow-surface',
          config.color,
          className,
        )}
        role="status"
        aria-label={label || config.label}
        title={label || config.label}
        {...props}
      />
    );
  },
);

AvatarStatus.displayName = 'Avatar.Status';

export { AvatarStatus };
