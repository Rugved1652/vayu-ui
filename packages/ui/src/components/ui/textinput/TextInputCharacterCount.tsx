// character-count.tsx
// UI: presentational

'use client';

import React from 'react';
import { cn } from '../utils';
import { useTextInput } from './TextInput';
import type { CharacterCountProps } from './types';

const CharacterCount: React.FC<CharacterCountProps> = ({
  maxLength,
  showCount = 'always',
  threshold = 0.8,
  className = '',
}) => {
  const { value, isFocused } = useTextInput();
  const currentLength = value.length;
  const remaining = maxLength - currentLength;
  const percentage = currentLength / maxLength;
  const isNearLimit = percentage >= threshold;

  const shouldShow =
    showCount === 'always' ||
    (showCount === 'focus' && isFocused) ||
    (showCount === 'near-limit' && isNearLimit);

  if (!shouldShow) return null;

  return (
    <p
      className={cn(
        'mt-1.5 text-sm font-secondary text-right',
        remaining < 0 ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-muted-content',
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {currentLength} / {maxLength}
    </p>
  );
};

CharacterCount.displayName = 'TextInput.CharacterCount';

export { CharacterCount };
