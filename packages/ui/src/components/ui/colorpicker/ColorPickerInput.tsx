// input.tsx
// UI: text input with format sync

'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { cn } from '../utils';
import { useColorPicker } from './hooks';
import { formatColor, isValidColor, parseColor } from './utils';
import type { ColorPickerInputProps } from './types';

export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(
  ({ placeholder = '#000000', className, ...props }, ref) => {
    const {
      color,
      format,
      disabled,
      validationState,
      setColor,
      inputId,
      labelId,
      descriptionId,
      errorId,
      inputRef,
    } = useColorPicker();

    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Sync input with color when not focused
    useEffect(() => {
      if (!isFocused) {
        setInputValue(formatColor(color, format));
      }
    }, [color, format, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const parsed = parseColor(value);
      if (parsed) {
        setColor(parsed);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      // Reset to formatted value if invalid
      if (!isValidColor(inputValue)) {
        setInputValue(formatColor(color, format));
      }
    };

    // Merge refs
    const mergedRef = (node: HTMLInputElement | null) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputRef as any).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref as any).current = node;
      }
    };

    const stateClasses = {
      default: 'border-field focus:border-focus focus:ring-2 focus:ring-focus/20',
      error: 'border-destructive ring-2 ring-destructive/20',
      warning: 'border-warning ring-2 ring-warning/20',
      success: 'border-success ring-2 ring-success/20',
    };

    return (
      <input
        ref={mergedRef}
        id={inputId}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        aria-labelledby={labelId}
        aria-describedby={
          validationState === 'error' ? `${descriptionId} ${errorId}` : descriptionId
        }
        aria-invalid={validationState === 'error'}
        className={cn(
          'flex-1 px-3 py-2 rounded-control border-2',
          'bg-surface text-surface-content font-mono text-sm',
          'placeholder:text-muted-content',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none',
          'transition-all duration-200',
          'font-secondary',
          stateClasses[validationState],
          className,
        )}
        {...props}
      />
    );
  },
);

ColorPickerInput.displayName = 'ColorPicker.Input';
