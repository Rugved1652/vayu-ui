// aspectratio.tsx
// Composition: UI + accessibility logic
import { cn } from '../utils';
import { forwardRef } from 'react';
import type { AspectRatioProps } from './types';
import { PRESET_MAP, OVERFLOW_CLASS, OBJECT_FIT_CLASS } from './types';

// ============================================================================
// AspectRatio
// ============================================================================

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      ratio = 'square',
      overflow = 'hidden',
      objectFit = 'cover',
      decorative = false,
      rounded = false,
      shadow = false,
      bordered = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isPreset = typeof ratio === 'string';
    const preset = isPreset ? PRESET_MAP[ratio] : null;
    // Safety check for 0 to avoid Infinity padding
    const numericRatio = preset ? preset.value : (ratio as number);

    // Accessibility
    // 1. If decorative, hide from accessibility tree
    // 2. If aria-label provided, use role="region" for meaningful content
    // 3. Default: generic container with no semantic role
    const passedAriaLabel = props['aria-label'];

    const getAriaProps = () => {
      if (decorative) {
        return {
          role: 'presentation' as const,
          'aria-hidden': true as const,
          'aria-label': undefined,
        };
      }

      if (passedAriaLabel) {
        return {
          role: 'region' as const,
          'aria-hidden': undefined,
        };
      }

      return {
        role: undefined,
        'aria-hidden': undefined,
      };
    };

    const ariaProps = getAriaProps();

    // Calculate Padding Bottom safely for custom ratios
    const paddingBottom = numericRatio > 0 ? `${100 / numericRatio}%` : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full',
          preset?.tw,
          OVERFLOW_CLASS[overflow],
          // Design system tokens
          rounded && 'rounded-surface',
          shadow && 'shadow-surface',
          bordered && 'border border-border',
          className,
        )}
        style={
          preset
            ? style
            : {
                paddingBottom,
                ...style,
              }
        }
        {...ariaProps}
        {...props}
      >
        <div
          className={cn(
            'absolute inset-0 w-full h-full',
            OBJECT_FIT_CLASS[objectFit],
            '[&>img]:w-full [&>img]:h-full [&>video]:w-full [&>video]:h-full',
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export default AspectRatio;
