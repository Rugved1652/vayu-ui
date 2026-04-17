// support-text.tsx
// UI: Support/helper text

'use client';

import React, { useEffect } from 'react';
import { cn } from '../../utils';
import { useTextAreaContext } from './TextArea';
import type { TextAreaSupportTextProps } from './types';

export const TextAreaSupportText = ({ children, className }: TextAreaSupportTextProps) => {
  const { supportTextId, setHasSupportText } = useTextAreaContext();

  useEffect(() => {
    setHasSupportText(true);
    return () => setHasSupportText(false);
  }, [setHasSupportText]);

  if (typeof children === 'string') {
    return (
      <p
        id={supportTextId}
        className={cn('text-xs font-secondary text-muted-content px-2', className)}
      >
        {children}
      </p>
    );
  }

  return (
    <ul
      id={supportTextId}
      className={cn(
        'text-xs font-secondary text-muted-content px-2 list-disc list-inside space-y-1',
        className,
      )}
    >
      {children.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
};

TextAreaSupportText.displayName = 'TextArea.SupportText';
