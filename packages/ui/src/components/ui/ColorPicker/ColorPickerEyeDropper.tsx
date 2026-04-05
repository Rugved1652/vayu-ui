// eyedropper.tsx
// UI: EyeDropper API

'use client';

import React, { forwardRef, useState } from 'react';
import { Pipette } from 'lucide-react';
import { cn } from '../utils';
import { useColorPicker } from './hooks';
import type { ColorPickerEyedropperProps } from './types';

export const ColorPickerEyedropper = forwardRef<HTMLButtonElement, ColorPickerEyedropperProps>(
  (
    {
      label = 'Pick from screen',
      unsupportedText = 'Eyedropper not supported in this browser',
      className,
      ...props
    },
    ref,
  ) => {
    const { setColor, disabled } = useColorPicker();
    const [isSupported, setIsSupported] = useState(true);
    const [isPicking, setIsPicking] = useState(false);

    const handlePick = async () => {
      // Check if EyeDropper API is available
      if (!('EyeDropper' in window)) {
        setIsSupported(false);
        return;
      }

      try {
        setIsPicking(true);
        // @ts-ignore - EyeDropper is not in TypeScript lib
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        setColor(result.sRGBHex);
      } catch (err) {
        // User cancelled or error occurred
        console.log('Eyedropper cancelled or error:', err);
      } finally {
        setIsPicking(false);
      }
    };

    if (!isSupported) {
      return <p className="text-sm text-muted-content italic">{unsupportedText}</p>;
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handlePick}
        disabled={disabled || isPicking}
        aria-label={label}
        aria-busy={isPicking}
        className={cn(
          'flex items-center gap-2 w-full px-3 py-2 rounded-control',
          'border-2 border-border bg-surface',
          'text-surface-content hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors',
          'font-secondary text-sm',
          className,
        )}
        {...props}
      >
        <Pipette className={cn('w-4 h-4', isPicking && 'animate-pulse')} aria-hidden="true" />
        {isPicking ? 'Picking...' : label}
      </button>
    );
  },
);

ColorPickerEyedropper.displayName = 'ColorPicker.Eyedropper';
