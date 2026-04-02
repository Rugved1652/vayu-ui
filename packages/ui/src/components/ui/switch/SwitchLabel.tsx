// label.tsx
// UI: presentational

import type { ReactNode } from 'react';
import { cn } from '../utils';

interface SwitchLabelProps {
  id: string;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  error?: boolean;
}

export function SwitchLabel({ id, label, description, disabled, error }: SwitchLabelProps) {
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;

  if (!label && !description) return null;

  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label
          id={labelId}
          htmlFor={id}
          className={cn(
            'text-sm font-medium select-none',
            'text-surface-content',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            error && !disabled && 'text-destructive',
          )}
        >
          {label}
        </label>
      )}

      {description && (
        <p
          id={descriptionId}
          className={cn('text-xs select-none', 'text-muted-content', disabled && 'opacity-50')}
        >
          {description}
        </p>
      )}
    </div>
  );
}
