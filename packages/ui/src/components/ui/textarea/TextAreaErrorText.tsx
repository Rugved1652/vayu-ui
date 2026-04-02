// error-text.tsx
// UI: Error message display

'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils';
import { useTextAreaContext } from './TextArea';
import type { TextAreaErrorTextProps } from './types';

export const TextAreaErrorText = ({ children, className }: TextAreaErrorTextProps) => {
  const { errorTextId } = useTextAreaContext();

  if (typeof children === 'string') {
    return (
      <p
        id={errorTextId}
        role="alert"
        className={cn(
          'text-xs font-secondary text-destructive px-2 flex items-center gap-1',
          className,
        )}
      >
        <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
        {children}
      </p>
    );
  }

  return (
    <ul
      id={errorTextId}
      role="alert"
      className={cn(
        'text-xs font-secondary text-destructive px-2 list-disc list-inside space-y-1',
        className,
      )}
    >
      {children.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
};

TextAreaErrorText.displayName = 'TextArea.ErrorText';
