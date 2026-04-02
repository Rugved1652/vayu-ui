// button.tsx
// Composition: UI + logic

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Status, ButtonProps, ButtonSize, ButtonVariant } from './types';

// ============================================================================
// Spinner Component
// ============================================================================

const Spinner = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin w-4 h-4"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
));
Spinner.displayName = 'Spinner';

// ============================================================================
// Main Button Component
// ============================================================================

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'small',
      loading = Status.IDLE,
      fullWidth = false,
      loadingText = 'Loading',
      disabled = false,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isLoading = loading === Status.PENDING;
    const isDisabled = disabled || isLoading;

    // Size variants
    const sizeClasses = {
      small: 'px-3 py-2 text-sm gap-2 min-h-[36px]',
      medium: 'px-4 py-2.5 text-base gap-2.5 min-h-[40px]',
      large: 'px-6 py-3 text-lg gap-3 min-h-[44px]',
    };

    // Variant styles using semantic design tokens
    const variantClasses: Record<ButtonVariant, string> = {
      primary: clsx(
        'bg-brand text-brand-content',
        'border border-brand/80',
        'hover:bg-brand/90 active:bg-brand/80',
        'shadow-control',
      ),
      secondary: clsx(
        'bg-muted hover:bg-muted/80 active:bg-muted/70',
        'text-surface-content font-medium',
        'border border-border hover:border-border/80',
        'shadow-control',
        'dark:bg-muted dark:hover:bg-muted/80',
        'dark:text-surface-content dark:border-border',
      ),
      outline: clsx(
        'bg-transparent hover:bg-muted/50 active:bg-muted/70',
        'text-surface-content font-medium',
        'border-2 border-border hover:border-border/80',
        'dark:hover:bg-muted/50 dark:active:bg-muted/70',
        'dark:text-surface-content dark:border-border',
      ),
      ghost: clsx(
        'bg-transparent hover:bg-muted/50 active:bg-muted/70',
        'text-muted-content hover:text-surface-content font-medium',
        'border border-transparent',
        'dark:hover:bg-muted/50 dark:active:bg-muted/70',
        'dark:text-muted-content dark:hover:text-surface-content',
      ),
      destructive: clsx(
        'bg-destructive text-destructive-content',
        'border border-destructive/80',
        'hover:bg-destructive/90 active:bg-destructive/80',
        'shadow-control',
        'dark:bg-destructive dark:text-destructive-content',
        'dark:border-destructive/80',
        'dark:hover:bg-destructive/90 dark:active:bg-destructive/80',
      ),
    };

    const buttonClasses = clsx(
      'relative inline-flex items-center justify-center',
      'rounded-control',
      'font-medium',
      'transition-all duration-150 ease-in-out',
      'outline-none focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-offset-2',
      variant === 'primary' && 'focus-visible:ring-brand',
      variant === 'secondary' && 'focus-visible:ring-focus',
      variant === 'outline' && 'focus-visible:ring-focus',
      variant === 'ghost' && 'focus-visible:ring-focus',
      variant === 'destructive' && 'focus-visible:ring-destructive',
      'focus-visible:ring-offset-canvas',
      sizeClasses[size],
      variantClasses[variant],
      fullWidth ? 'w-full' : 'w-auto',
      isDisabled && 'cursor-not-allowed opacity-60 pointer-events-none',
      !isDisabled && 'active:scale-[0.98]',
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-live={isLoading ? 'polite' : undefined}
        aria-label={ariaLabel}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        className={buttonClasses}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner aria-hidden="true" />
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true">{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

ButtonRoot.displayName = 'Button';

export default ButtonRoot;
