// label.tsx
// UI: accessible label

'use client';

import React from 'react';
import { cn } from '../../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerLabelProps } from './types';

export const ColorPickerLabel: React.FC<ColorPickerLabelProps> = ({
  children,
  className = '',
  optional = false,
}) => {
  const { labelId, inputId } = useColorPicker();

  return (
    <label
      id={labelId}
      htmlFor={inputId}
      className={cn('block font-primary font-medium text-surface-content mb-1.5', className)}
    >
      {children}
      {optional && (
        <span className="text-muted-content text-sm font-secondary font-normal ml-2">
          (optional)
        </span>
      )}
    </label>
  );
};

ColorPickerLabel.displayName = 'ColorPicker.Label';
