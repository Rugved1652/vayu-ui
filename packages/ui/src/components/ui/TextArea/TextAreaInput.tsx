// input.tsx
// UI: Textarea input with resize, size, and focus states

'use client';

import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { useTextAreaContext } from './TextArea';
import type { TextAreaInputProps } from './types';

const sizeConfig = {
  sm: {
    wrapper: 'px-2.5 py-1.5',
    text: 'text-sm',
  },
  md: {
    wrapper: 'px-3 py-2.5',
    text: 'text-base',
  },
  lg: {
    wrapper: 'px-4 py-3',
    text: 'text-lg',
  },
};

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
      error,
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

    const config = sizeConfig[size];

    const combinedClasses = cn(
      'w-full bg-surface border transition-all duration-200 outline-none',
      'font-secondary text-surface-content placeholder:text-muted-content',
      config.wrapper,
      config.text,
      getResizeClass(resize),
      'rounded-control',
      error
        ? 'border-destructive ring-2 ring-destructive/20'
        : isFocused
          ? 'border-focus ring-2 ring-focus/20'
          : 'border-field',
      disabled && 'opacity-60 cursor-not-allowed bg-muted',
      className,
    );

    const describedBy =
      [hasSupportText && supportTextId, error && errorTextId, ariaDescribedBy]
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
        aria-invalid={error}
        aria-describedby={describedBy}
        aria-errormessage={error ? errorTextId : undefined}
        aria-required={isRequired}
        aria-disabled={disabled}
        {...restProps}
      />
    );
  },
);

TextAreaInput.displayName = 'TextArea.Input';
