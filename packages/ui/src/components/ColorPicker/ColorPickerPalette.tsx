// palette.tsx
// UI: native color input

'use client';

import React, { forwardRef } from 'react';
import { Pipette } from 'lucide-react';
import { cn } from '../../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerPaletteProps } from './types';

export const ColorPickerPalette = forwardRef<HTMLInputElement, ColorPickerPaletteProps>(
  ({ label = 'Pick a color', className, ...props }, ref) => {
    const { color, setColor } = useColorPicker();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value);
    };

    return (
      <div className={className}>
        <label className="flex items-center gap-2 text-sm font-medium text-elevated-content mb-2">
          <Pipette className="w-4 h-4" aria-hidden="true" />
          {label}
        </label>
        <input
          ref={ref}
          type="color"
          value={color}
          onChange={handleChange}
          className={cn(
            'w-full h-12 rounded-control cursor-pointer',
            'border-2 border-border',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          )}
          {...props}
        />
      </div>
    );
  },
);

ColorPickerPalette.displayName = 'ColorPicker.Palette';
