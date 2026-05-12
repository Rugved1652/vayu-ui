// field.tsx
// UI: presentational

'use client';

import React from 'react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import type { FieldProps } from './types';
import {
  inputBaseStyles,
  inputGapStyles,
  inputSizeStyles,
  inputBorderStyles,
  inputHoverBorder,
  inputDisabledMutedStyles,
} from '../../utils/input-styles';

const TextInputField: React.FC<FieldProps> = ({ children, className = '' }) => {
  const { isFocused, validationState, isDisabled, hasValue, size, setFocused } = useTextInput();

  const isActive = isFocused || hasValue;

  return (
    <div
      className={cn(
        inputBaseStyles,
        inputGapStyles,
        inputSizeStyles[size],
        validationState !== 'default'
          ? inputBorderStyles[validationState]
          : isActive
            ? 'border-brand'
            : cn(inputBorderStyles['default'], inputHoverBorder),
        isDisabled && inputDisabledMutedStyles,
        className,
      )}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-disabled={isDisabled}
    >
      {children}
    </div>
  );
};

TextInputField.displayName = 'TextInput.Field';

export { TextInputField };
