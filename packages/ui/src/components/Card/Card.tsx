// card.tsx
// Composition: Card root with interactive logic and styling

import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { CardProps } from './types';
import { useCardKeyboardInteraction } from './hooks';

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      interactive = false,
      href,
      target,
      rel,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isClickable = interactive || !!href || !!onClick;

    // Base styles using semantic design tokens
    const baseStyles = cn(
      'flex flex-col transition-all duration-200',
      'bg-surface',
      'border border-border',
      'rounded-surface p-5 gap-3',
      'shadow-surface hover:shadow-elevated',
    );

    // WCAG 2.2 AA: Focus visible styling using semantic focus token
    const focusStyles =
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

    const rootClasses = cn(
      baseStyles,
      isClickable && !disabled && 'cursor-pointer',
      isClickable && !disabled && focusStyles,
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className,
    );

    // Linked card
    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={rootClasses}
          aria-disabled={disabled || undefined}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    // Interactive card (button-like)
    if (isClickable && !disabled) {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          className={rootClasses}
          onClick={onClick}
          onKeyDown={useCardKeyboardInteraction(onClick, disabled)}
          aria-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Static card
    return (
      <div ref={ref} className={rootClasses} aria-disabled={disabled || undefined} {...props}>
        {children}
      </div>
    );
  },
);

CardRoot.displayName = 'Card';

export default CardRoot;
