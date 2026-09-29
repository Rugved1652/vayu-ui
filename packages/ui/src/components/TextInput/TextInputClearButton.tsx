// clear-button.tsx
// UI: presentational

'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import type { ClearButtonProps } from './types';

const ClearButton: React.FC<ClearButtonProps> = ({ onClear, className = '' }) => {
  const { clearValue, hasValue, size, isDisabled, isReadOnly } = useTextInput();

  if (!hasValue) return null;

  const handleClear = () => {
    if (isDisabled || isReadOnly) return;
    clearValue();
    onClear?.();
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-4 h-4';
  const btnPadding = size === 'sm' ? 'p-0.5' : 'p-1';

  return (
    <button
      type="button"
      disabled={isDisabled || isReadOnly}
      onClick={handleClear}
      className={cn(
        'shrink-0 text-muted-content enabled:hover:text-surface-content disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded',
        btnPadding,
        className,
      )}
      aria-label="Clear input"
    >
      <X className={iconSize} />
    </button>
  );
};

ClearButton.displayName = 'TextInput.ClearButton';

export { ClearButton };
