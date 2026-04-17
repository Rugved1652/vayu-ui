// swatches.tsx
// UI: standalone swatch selector (self-contained, no context)

'use client';

import React, { forwardRef, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils';
import { getContrastColor } from './utils';
import type { ColorPickerSwatchesProps } from './types';

export const ColorPickerSwatches = forwardRef<HTMLDivElement, ColorPickerSwatchesProps>(
  (
    {
      colors,
      value,
      onChange,
      size = 'md',
      columns = 8,
      label,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value || colors[0]);
    const isControlled = value !== undefined;
    const selectedColor = isControlled ? value : internalValue;

    const handleSelect = (color: string) => {
      if (!isControlled) {
        setInternalValue(color);
      }
      onChange?.(color);
    };

    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    };

    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <label className="block font-primary text-surface-content text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          role="listbox"
          aria-label={label || 'Color swatches'}
        >
          {colors.map((color, index) => {
            const isSelected = selectedColor?.toLowerCase() === color.toLowerCase();
            const contrastColor = getContrastColor(color);

            return (
              <button
                key={index}
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-label={`Select color ${color}`}
                onClick={() => handleSelect(color)}
                disabled={disabled}
                className={cn(
                  sizeClasses[size],
                  'rounded-control border-2 transition-all duration-200',
                  'hover:scale-110 hover:shadow-elevated',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isSelected ? 'border-surface-content ring-2 ring-focus' : 'border-border',
                )}
                style={{ backgroundColor: color }}
              >
                {isSelected && (
                  <Check
                    className="w-4 h-4 mx-auto"
                    style={{ color: contrastColor }}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

ColorPickerSwatches.displayName = 'ColorPicker.Swatches';
