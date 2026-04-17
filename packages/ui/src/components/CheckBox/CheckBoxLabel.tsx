// label.tsx
// UI: accessible label

'use client';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { useCheckboxContext } from './hooks';
import type { CheckboxLabelProps } from './types';

export const CheckboxLabel = forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { checkboxId, disabled } = useCheckboxContext();

    return (
      <label
        ref={ref}
        htmlFor={checkboxId}
        className={clsx(
          'text-sm font-medium text-surface-content',
          'select-none',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </label>
    );
  },
);

CheckboxLabel.displayName = 'Checkbox.Label';
