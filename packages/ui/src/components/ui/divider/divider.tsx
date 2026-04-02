// divider.tsx
// Composition: root layout + compound assembly

import { cn } from '../utils';
import { spacingMap, verticalSpacingMap } from './types';
import type { DividerRootProps } from './types';
import DividerLine from './DividerLine';
import DividerLabel from './DividerLabel';

// ============================================================================
// DividerRoot
// ============================================================================

const DividerRoot = ({
  orientation = 'horizontal',
  spacing = 'md',
  decorative = false,
  className,
  children,
  ...props
}: DividerRootProps) => {
  const isHorizontal = orientation === 'horizontal';

  const layoutClasses = isHorizontal
    ? cn('flex items-center w-full', spacingMap[spacing])
    : cn('inline-flex flex-col items-center h-full min-h-[1em]', verticalSpacingMap[spacing]);

  // Accessibility Semantics
  // 1. Decorative → hidden
  // 2. Has Children (Label) → No role (content is readable)
  // 3. Default → Separator role
  const hasChildren = !!children;

  const ariaProps = decorative
    ? { 'aria-hidden': 'true' as const }
    : hasChildren
      ? {}
      : {
          role: 'separator',
          'aria-orientation': orientation,
        };

  if (!children) {
    return (
      <div className={cn(layoutClasses, className)} {...ariaProps} {...props}>
        <DividerLine orientation={orientation} />
      </div>
    );
  }

  return (
    <div className={cn(layoutClasses, className)} {...ariaProps} {...props}>
      {children}
    </div>
  );
};

// ============================================================================
// Compound Component
// ============================================================================

export const Divider = Object.assign(DividerRoot, {
  Line: DividerLine,
  Label: DividerLabel,
});

export default Divider;
