// warning-message.tsx
// UI: presentational

'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../utils';
import { useTextInput } from './TextInput';
import type { HelperTextProps } from './types';

const WarningMessage: React.FC<HelperTextProps> = ({ children, className = '' }) => {
  const { validationState } = useTextInput();

  if (validationState !== 'warning') return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        'mt-1.5 text-sm font-secondary text-warning flex items-center gap-1.5',
        className,
      )}
    >
      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
};

WarningMessage.displayName = 'TextInput.WarningMessage';

export { WarningMessage };
