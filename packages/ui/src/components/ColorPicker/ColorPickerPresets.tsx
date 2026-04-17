// presets.tsx
// UI: preset color grid (context-dependent)

'use client';

import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils';
import { useColorPicker } from './hooks';
import { getContrastColor } from './utils';
import type { ColorPickerPresetsProps } from './types';

export const ColorPickerPresets = forwardRef<HTMLDivElement, ColorPickerPresetsProps>(
  ({ label = 'Preset Colors', colors: customColors, columns = 8, className, ...props }, ref) => {
    const { color, setColor, presets: contextPresets, disabled } = useColorPicker();
    const colors = customColors || contextPresets;

    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <label className="block text-sm font-medium text-elevated-content mb-2">{label}</label>
        )}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          role="listbox"
          aria-label={label}
        >
          {colors.map((presetColor, index) => {
            const isSelected = color.toLowerCase() === presetColor.toLowerCase();
            const contrastColor = getContrastColor(presetColor);

            return (
              <button
                key={index}
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-label={`Select color ${presetColor}`}
                onClick={() => setColor(presetColor)}
                disabled={disabled}
                className={cn(
                  'aspect-square rounded-control border-2 transition-all duration-200',
                  'hover:scale-110 hover:shadow-elevated',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isSelected ? 'border-elevated-content ring-2 ring-focus' : 'border-border',
                )}
                style={{ backgroundColor: presetColor }}
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

ColorPickerPresets.displayName = 'ColorPicker.Presets';
