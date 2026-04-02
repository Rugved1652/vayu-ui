// number-input.tsx
// UI: presentational

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useTextInput } from './TextInput';
import { Input } from './Input';
import type { NumberInputProps } from './types';

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ numberType = 'decimal', min, max, step, ...props }, ref) => {
    const { setValue, value } = useTextInput();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.metaKey || e.ctrlKey) return;

      const key = e.key;
      const input = e.currentTarget;
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Tab',
        'Home',
        'End',
      ];

      if (allowedKeys.includes(key)) return;

      if (/^\d$/.test(key)) return;

      if (key === '-' && (numberType === 'integer' || numberType === 'decimal')) {
        const hasMinusSign = value.includes('-');
        const isAtStart = selectionStart === 0;

        if (hasMinusSign && !hasSelection) {
          e.preventDefault();
          return;
        }
        if (!isAtStart && !hasSelection) {
          e.preventDefault();
          return;
        }
        return;
      }

      if (key === '.' && (numberType === 'decimal' || numberType === 'positive')) {
        const hasDecimalPoint = value.includes('.');

        if (hasDecimalPoint && !hasSelection) {
          e.preventDefault();
          return;
        }
        return;
      }

      e.preventDefault();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedData = e.clipboardData.getData('text');

      if (numberType === 'natural') {
        if (!/^\d+$/.test(pastedData)) {
          e.preventDefault();
        }
      } else if (numberType === 'integer') {
        if (!/^-?\d+$/.test(pastedData)) {
          e.preventDefault();
        }
      } else if (numberType === 'positive') {
        if (!/^\d*\.?\d*$/.test(pastedData)) {
          e.preventDefault();
        }
      } else if (numberType === 'decimal') {
        if (!/^-?\d*\.?\d*$/.test(pastedData)) {
          e.preventDefault();
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const numValue = parseFloat(value);

      if (!isNaN(numValue)) {
        let constrainedValue = numValue;
        if (min !== undefined && numValue < min) {
          constrainedValue = min;
        }
        if (max !== undefined && numValue > max) {
          constrainedValue = max;
        }

        if (constrainedValue !== numValue) {
          setValue(String(constrainedValue));
        }
      }

      props.onBlur?.(e);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  },
);

NumberInput.displayName = 'TextInput.NumberInput';

export { NumberInput };
