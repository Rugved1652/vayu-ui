// buttongroup.tsx
// Composition: UI + logic

import { cn } from '../utils';
import type { ButtonGroupProps, ButtonGroupRadius } from './types';

// ============================================================================
// Helper Maps - Design Tokens
// ============================================================================

const radiusClasses: Record<ButtonGroupRadius, string> = {
  control: 'rounded-control [&>button]:rounded-control',
  surface: 'rounded-surface [&>button]:rounded-surface',
  overlay: 'rounded-overlay [&>button]:rounded-overlay',
  full: 'rounded-full [&>button]:rounded-full',
};

// ============================================================================
// Component
// ============================================================================

/**
 * Groups multiple `<Button>` elements together.
 *
 * - Uses CSS to enforce sizing and border connections (Server Component safe).
 * - No Context or cloneElement required.
 * - WCAG 2.2 AA Compliant (Focus management via z-index).
 * - Uses semantic design tokens for consistent styling.
 *
 * @example
 * ```tsx
 * <ButtonGroup aria-label="Text alignment">
 *   <Button variant="outline"><Button.Text>Left</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Center</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Right</Button.Text></Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
  orientation = 'horizontal',
  size = 'medium',
  radius = 'control',
  fullWidth = false,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: ButtonGroupProps) {
  // Size classes using semantic design tokens
  const sizeClasses = {
    small: '[&>button]:px-3 [&>button]:py-2 [&>button]:text-sm [&>button]:min-h-[36px]',
    medium: '[&>button]:px-4 [&>button]:py-2.5 [&>button]:text-base [&>button]:min-h-[40px]',
    large: '[&>button]:px-6 [&>button]:py-3 [&>button]:text-lg [&>button]:min-h-[44px]',
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        // Base layout
        'inline-flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',

        // Full Width Logic
        fullWidth ? 'w-full [&>button]:flex-1' : 'w-auto',

        // Size Enforcement (CSS Override)
        sizeClasses[size],

        // Radius using semantic design tokens
        radiusClasses[radius],

        // WCAG Focus Management
        // Ensure the focused button sits on top of its siblings.
        // This ensures the focus ring is fully visible (WCAG 2.4.11).
        '[&>button:hover]:z-10',
        '[&>button:focus-visible]:z-10',

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type { ButtonGroupRadius };
