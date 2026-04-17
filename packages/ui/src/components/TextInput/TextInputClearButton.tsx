// clear-button.tsx
// UI: presentational

'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import type { ClearButtonProps } from './types';

const ClearButton: React.FC<ClearButtonProps> = ({ onClear, className = '' }) => {
  const { clearValue, hasValue } = useTextInput();

  if (!hasValue) return null;

  const handleClear = () => {
    clearValue();
    onClear?.();
  };

  return (
    <button
      type="button"
      onClick={handleClear}
      className={cn(
        'text-muted-content hover:text-surface-content transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded p-1',
        className,
      )}
      aria-label="Clear input"
    >
      <X className="w-4 h-4" />
    </button>
  );
};

ClearButton.displayName = 'TextInput.ClearButton';

export { ClearButton };
