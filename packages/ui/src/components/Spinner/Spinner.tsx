// Spinner.tsx
// Composition: UI + wiring

import { cn } from '../../utils';
import type { SpinnerProps, SpinnerSize } from './types';

// ============================================================================
// Size Configuration
// ============================================================================

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

// ============================================================================
// Component
// ============================================================================

/**
 * Spinner — A WCAG 2.2 AA compliant loading indicator component.
 *
 * Displays an animated circular spinner using design system tokens.
 * Fully accessible with proper ARIA attributes for screen readers.
 *
 * @example
 * ```tsx
 * <Spinner size="md" aria-label="Loading content" />
 * ```
 */
function Spinner({
  className,
  size = 'md',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      className={cn(
        'rounded-full border-2 border-brand border-t-transparent',
        'animate-spin motion-reduce:animate-none',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
}

export { Spinner };
