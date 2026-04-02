// label.tsx
// UI: Label with optional char count

'use client';

import React from 'react';
import { cn } from '../utils';
import { useTextAreaContext } from './TextArea';
import type { TextAreaLabelProps } from './types';

export const TextAreaLabel = ({
  children,
  showCharCount = false,
  className,
  ...props
}: TextAreaLabelProps) => {
  const { charCount, maxLength, inputId, labelId } = useTextAreaContext();

  return (
    <div className="flex items-center justify-between px-2">
      <label
        id={labelId}
        htmlFor={inputId}
        className={cn('font-primary text-surface-content text-sm font-medium', className)}
        {...props}
      >
        {children}
      </label>
      {showCharCount && (
        <span
          className="text-xs font-secondary text-muted-content"
          aria-live="polite"
          aria-atomic="true"
        >
          {charCount}
          {maxLength && `/${maxLength}`}
        </span>
      )}
    </div>
  );
};

TextAreaLabel.displayName = 'TextArea.Label';
