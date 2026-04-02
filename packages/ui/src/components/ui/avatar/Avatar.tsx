// Avatar.tsx
// Composition: Root component + compound pattern wiring
'use client';

import { forwardRef } from 'react';
import { cn } from '../utils';
import type { AvatarRootProps } from './types';
import { AvatarImage } from './AvatarImage';
import { AvatarInitials } from './AvatarInitials';
import { AvatarFallback } from './AvatarFallback';
import { AvatarStatus as AvatarStatusComponent } from './AvatarStatus';

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(
  (
    {
      size = 'medium',
      username = '',
      alt,
      status,
      className,
      onClick,
      tabIndex,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      small: 'w-8 h-8 text-xs',
      medium: 'w-12 h-12 text-sm',
      large: 'w-16 h-16 text-lg',
      xlarge: 'w-24 h-24 text-2xl',
    };

    const sizeClass = typeof size === 'string' ? sizeClasses[size] : '';

    const getAltText = () => {
      if (alt) return alt;
      if (username) return `${username}'s avatar`;
      return 'User avatar';
    };

    const fullAltText = status ? `${getAltText()} (${status})` : getAltText();
    const isInteractive = onClick !== undefined;
    const role = isInteractive ? 'button' : 'img';

    const avatarClasses = cn(
      'relative inline-flex items-center justify-center',
      'rounded-full',
      'bg-muted',
      'border-2 border-border',
      'shadow-surface',
      'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      isInteractive && 'cursor-pointer hover:shadow-elevated active:scale-95',
      sizeClass,
      className,
    );

    return (
      <span
        ref={ref}
        className={avatarClasses}
        style={
          typeof size === 'number' ? { width: size, height: size, fontSize: size * 0.4 } : undefined
        }
        role={role}
        aria-label={fullAltText}
        tabIndex={isInteractive ? (tabIndex !== undefined ? tabIndex : 0) : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {children}
      </span>
    );
  },
);

AvatarRoot.displayName = 'Avatar';

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Initials: AvatarInitials,
  Fallback: AvatarFallback,
  Status: AvatarStatusComponent,
});

export default Avatar;
