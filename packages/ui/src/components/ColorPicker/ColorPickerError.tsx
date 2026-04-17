// error.tsx
// UI: error message

'use client';

import React from 'react';
import { cn } from '../../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerErrorProps } from './types';

export const ColorPickerError: React.FC<ColorPickerErrorProps> = ({ children, className = '' }) => {
  const { errorId, validationState } = useColorPicker();

  if (validationState !== 'error') return null;

  return (
    <p
      id={errorId}
      role="alert"
      aria-live="polite"
      className={cn('mt-1.5 text-sm font-secondary text-destructive', className)}
    >
      {children}
    </p>
  );
};

ColorPickerError.displayName = 'ColorPicker.Error';
