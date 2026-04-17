// badge.tsx
// UI: presentational badge notification

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import { BadgeProps, ButtonSize, BadgeVariant, BadgePosition } from './types';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = 'small',
      value,
      max = 99,
      position = 'top-right',
      variant = 'danger',
      showZero = false,
      className,
      ...props
    },
    ref,
  ) => {
    const getBadgeContent = () => {
      if (typeof value === 'number') {
        if (value === 0 && !showZero) return null;
        return value > max ? `${max}+` : value.toString();
      }
      return value;
    };

    const badgeContent = getBadgeContent();
    const showBadge = badgeContent !== null && badgeContent !== undefined;

    if (!showBadge) return null;

    const badgeSizeClasses: Record<ButtonSize, string> = {
      small: 'min-w-[20px] h-[20px] text-[11px] px-1.5',
      medium: 'min-w-[22px] h-[22px] text-xs px-2',
      large: 'min-w-[24px] h-[24px] text-xs px-2',
    };

    const badgeVariantClasses: Record<BadgeVariant, string> = {
      primary: 'bg-brand text-brand-content',
      danger: 'bg-destructive text-destructive-content',
      warning: 'bg-warning text-warning-content',
      info: 'bg-info text-info-content',
      success: 'bg-success text-success-content',
    };

    const badgePositionClasses: Record<BadgePosition, string> = {
      'top-right': 'absolute -top-1.5 -right-1.5',
      'top-left': 'absolute -top-1.5 -left-1.5',
      'inline-right': 'relative ml-1',
      'inline-left': 'relative mr-1',
    };

    const getAriaLabel = () => {
      if (typeof value === 'number') {
        const count = value > max ? `more than ${max}` : value;
        return `${count} notification${value !== 1 ? 's' : ''}`;
      }
      return value ? String(value) : undefined;
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={getAriaLabel()}
        className={clsx(
          'inline-flex items-center justify-center',
          'rounded-full font-semibold leading-none',
          'border-2 border-canvas',
          'shadow-control',
          'z-10',
          badgeSizeClasses[size],
          badgeVariantClasses[variant],
          badgePositionClasses[position],
          className,
        )}
        {...props}
      >
        <span aria-hidden="true">{badgeContent}</span>
      </span>
    );
  },
);

Badge.displayName = 'Button.Badge';

export default Badge;
