// success-message.tsx
// UI: presentational

'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../utils';
import { useTextInput } from './TextInput';
import type { HelperTextProps } from './types';

const SuccessMessage: React.FC<HelperTextProps> = ({ children, className = '' }) => {
  const { validationState } = useTextInput();

  if (validationState !== 'success') return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        'mt-1.5 text-sm font-secondary text-success flex items-center gap-1.5',
        className,
      )}
    >
      <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
};

SuccessMessage.displayName = 'TextInput.SuccessMessage';

export { SuccessMessage };
