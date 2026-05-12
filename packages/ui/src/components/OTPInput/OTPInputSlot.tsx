// slot.tsx
// UI: individual character slot with focus/caret

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { useOTPInput } from './OTPInput';
import type { OTPInputSlotProps } from './types';
import {
  inputSlotSizeStyles,
  inputBorderStyles,
} from '../../utils/input-styles';

const OTPInputSlot = forwardRef<HTMLDivElement, OTPInputSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, isFocused, maxLength, disabled, validationState, size } = useOTPInput();
    const char = value[index];
    const isActive = isFocused && index === Math.min(value.length, maxLength - 1);
    const hasValue = char !== undefined && char !== '';
    const showBrand = isActive || hasValue;

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={clsx(
          inputSlotSizeStyles[size],
          'relative flex items-center justify-center',
          'border-2',
          'transition-all duration-150',
          // Overlap with previous slot to avoid double 4px seams
          '[&:not(:first-child)]:-ml-[2px]',
          // Border color — brand for active/filled, otherwise state color
          showBrand
            ? 'border-brand z-10'
            : inputBorderStyles[validationState],
          // Text
          validationState === 'error' ? 'text-destructive' : 'text-surface-content',
          // Corners — only first and last slot in their container get rounding
          'first:rounded-l',
          'last:rounded-r',
          // Filled state background
          hasValue && validationState !== 'error' && 'bg-muted',
          hasValue && validationState === 'error' && 'bg-destructive/10',
          // Disabled
          disabled && 'opacity-50',
          className,
        )}
        {...props}
      >
        <span className="font-secondary">{char}</span>
        {/* Fake Caret */}
        {isActive && !hasValue && !disabled && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className={clsx(
                'h-4 w-0.5 bg-surface-content',
                'animate-caret-blink motion-reduce:hidden',
              )}
            />
          </div>
        )}
      </div>
    );
  },
);
OTPInputSlot.displayName = 'OTPInput.Slot';

export { OTPInputSlot };
