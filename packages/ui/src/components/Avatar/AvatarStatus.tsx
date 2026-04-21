// AvatarStatus.tsx
// UI: Status indicator dot

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import type { AvatarStatusProps } from './types';
import { useAvatarSize } from './hooks';

const statusBadgeSizes: Record<string, { size: string; border: string; offset: string }> = {
  small: { size: 'w-3 h-3', border: 'border', offset: '-bottom-0 -right-0' },
  medium: { size: 'w-4 h-4', border: 'border-2', offset: '-bottom-0.5 -right-0.5' },
  large: { size: 'w-5 h-5', border: 'border-2', offset: '-bottom-0.5 -right-0.5' },
  xlarge: { size: 'w-6 h-6', border: 'border-2', offset: '-bottom-1 -right-1' },
};

const AvatarStatus = forwardRef<HTMLSpanElement, AvatarStatusProps>(
  ({ status, label, className, ...props }, ref) => {
    const avatarSize = useAvatarSize();
    const badge = statusBadgeSizes[avatarSize] ?? statusBadgeSizes.medium;

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
          'absolute rounded-full border-canvas z-10 shadow-surface',
          badge.size,
          badge.border,
          badge.offset,
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
