// input.tsx
// UI: Textarea input with resize, size, and focus states

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import { useTextAreaContext } from './TextArea';
import type { TextAreaInputProps } from './types';
import {
  inputBaseStyles,
  inputSizeStyles,
  inputTextStyles,
  inputBorderStyles,
  inputDisabledMutedStyles,
} from '../../utils/input-styles';

const getResizeClass = (resize: TextAreaInputProps['resize']) => {
  switch (resize) {
    case 'none':
      return 'resize-none';
    case 'vertical':
      return 'resize-y';
    case 'horizontal':
      return 'resize-x';
    case 'both':
      return 'resize';
    default:
      return 'resize-y';
  }
};

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      resize = 'vertical',
      rows = 4,
      value,
      onChange,
      className,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    },
    ref,
  ) => {
    const {
      isFocused,
      setIsFocused,
      setCharCount,
      maxLength,
      validationState,
      size,
      disabled,
      inputId,
      supportTextId,
      errorTextId,
      hasSupportText,
    } = useTextAreaContext();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    const isFilled = value !== undefined && value !== '';
    const showBrand = isFocused || isFilled;

    const combinedClasses = cn(
      inputBaseStyles,
      inputSizeStyles[size],
      inputTextStyles,
      getResizeClass(resize),
      'rounded-control',
      'outline-none',
      validationState === 'default'
        ? [showBrand ? 'border-brand' : 'border-field hover:border-brand']
        : inputBorderStyles[validationState],
      disabled && inputDisabledMutedStyles,
      className,
    );

    const hasError = validationState === 'error';
    const describedBy =
      [hasSupportText && supportTextId, hasError && errorTextId, ariaDescribedBy]
        .filter(Boolean)
        .join(' ') || undefined;

    const isRequired = restProps.required === true;

    return (
      <textarea
        ref={ref}
        id={inputId}
        className={combinedClasses}
        rows={rows}
        value={value}
        onChange={handleChange}
        onFocus={(e) => {
          setIsFocused(true);
          restProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          restProps.onBlur?.(e);
        }}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        aria-errormessage={hasError ? errorTextId : undefined}
        aria-required={isRequired}
        aria-disabled={disabled}
        {...restProps}
      />
    );
  },
);

TextAreaInput.displayName = 'TextArea.Input';
