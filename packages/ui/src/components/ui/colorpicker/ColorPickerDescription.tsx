// description.tsx
// UI: helper text

'use client';

import React from 'react';
import { cn } from '../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerDescriptionProps } from './types';

export const ColorPickerDescription: React.FC<ColorPickerDescriptionProps> = ({
  children,
  className = '',
}) => {
  const { descriptionId } = useColorPicker();

  return (
    <p
      id={descriptionId}
      className={cn('text-sm font-secondary text-muted-content mb-2', className)}
    >
      {children}
    </p>
  );
};

ColorPickerDescription.displayName = 'ColorPicker.Description';
