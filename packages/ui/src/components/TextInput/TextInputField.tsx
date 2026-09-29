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
  inputControlSizeStyles,
  getInputControlStateStyles,
} from '../../utils/input-styles';

const TextInputField: React.FC<FieldProps> = ({ children, className = '' }) => {
  const { isFocused, validationState, isDisabled, hasValue, size, setFocused } = useTextInput();

  const isActive = isFocused || hasValue;

  return (
    <div
      className={cn(
        inputBaseStyles,
        inputGapStyles,
        inputControlSizeStyles[size],
        getInputControlStateStyles(validationState, isActive, isDisabled),
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
