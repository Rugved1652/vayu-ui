'use client';

import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { useTextInput } from './TextInput';
import { Input } from './Input';
import { formatNumber, isNumericInput, normalizeNumber } from './number-format';
import type { NumberInputProps } from './types';

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      numberType = 'decimal',
      format = false,
      min,
      max,
      step,
      onBlur,
      onKeyDown,
      onPaste,
      ...props
    },
    ref,
  ) => {
    const { setValue, value, inputRef } = useTextInput();
    const caret = useRef<number | null>(null);
    const displayValue = format ? formatNumber(value) : value;
    useLayoutEffect(() => {
      if (caret.current !== null && inputRef.current === document.activeElement) {
        inputRef.current.setSelectionRange(caret.current, caret.current);
      }
      caret.current = null;
    }, [displayValue, inputRef]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget;
      const raw = format ? input.value.replaceAll(',', '') : input.value;
      if (!isNumericInput(raw, numberType)) return;
      const next = format ? normalizeNumber(raw) : raw;
      if (format) {
        const prefix = input.value
          .slice(0, input.selectionStart ?? input.value.length)
          .replaceAll(',', '');
        const normalizedPrefix = normalizeNumber(prefix);
        const formatted = formatNumber(next);
        let count = 0;
        let position = 0;
        while (position < formatted.length && count < normalizedPrefix.length) {
          if (formatted[position] !== ',') count++;
          position++;
        }
        caret.current = position;
      }
      setValue(next);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      let next = normalizeNumber(value);
      if (next === '-' || next === '-0' || next === '-0.') next = next === '-' ? '' : '0';
      if (next.endsWith('.')) next = next.slice(0, -1);
      const number = Number(next);
      if (next !== '' && Number.isFinite(number)) {
        if (min !== undefined && number < min) next = String(min);
        if (max !== undefined && number > max) next = String(max);
      }
      if (next !== value) setValue(next);
      onBlur?.(event);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode={numberType === 'integer' || numberType === 'natural' ? 'numeric' : 'decimal'}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        min={min}
        max={max}
        step={step}
      />
    );
  },
);
NumberInput.displayName = 'TextInput.NumberInput';
export { NumberInput };
