// indicator.tsx
// UI: hidden native input + visual checkbox

'use client';
import { clsx } from 'clsx';
import { forwardRef, useRef, useLayoutEffect, useState, useEffect } from 'react';

import { CheckIcon } from '../../icons/check-icon';
import { MinusIcon } from '../../icons/minus-icon';
import { useCheckboxContext } from './hooks';
import type { CheckboxIndicatorProps } from './types';

export const CheckboxIndicator = forwardRef<HTMLInputElement, CheckboxIndicatorProps>(
  ({ className, ...props }, ref) => {
    const {
      checked,
      indeterminate,
      disabled,
      error,
      checkboxId,
      errorId,
      descriptionId,
      onChange,
      name,
      value,
      required,
    } = useCheckboxContext();
    const localInputRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const setRefs = (node: HTMLInputElement | null) => {
      localInputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Handle indeterminate state
    useLayoutEffect(() => {
      if (localInputRef.current) {
        localInputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Build aria-describedby (client-side only to avoid SSR issues)
    const [describedBy, setDescribedBy] = useState<string | undefined>(undefined);

    useEffect(() => {
      const hasError = error && document.getElementById(errorId);
      const hasDescription = document.getElementById(descriptionId);
      const ids =
        [hasError ? errorId : null, hasDescription ? descriptionId : null]
          .filter(Boolean)
          .join(' ') || undefined;
      setDescribedBy(ids);
    }, [error, errorId, descriptionId]);

    return (
      <div className="relative inline-flex items-center">
        {/* Hidden native input */}
        <input
          ref={setRefs}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={clsx(
            'peer absolute w-5 h-5 opacity-0',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            className,
          )}
          {...props}
        />

        {/* Custom visual indicator */}
        <div
          className={clsx(
            'pointer-events-none',
            'relative flex items-center justify-center',
            'h-5 w-5 rounded-control border-2 transition-all duration-200',

            // Base unchecked state - using semantic tokens
            'bg-surface border-field',

            // Focus state (WCAG 2.2 AA)
            'peer-focus-visible:outline-none',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-focus/20',
            'peer-focus-visible:border-focus',

            // Checked state (not indeterminate)
            !indeterminate && 'peer-checked:bg-brand peer-checked:border-brand',

            // Indeterminate state (overrides checked)
            indeterminate && 'bg-brand border-brand',

            // Error state
            error && !checked && !indeterminate && 'border-destructive',

            // Hover state
            !disabled && !indeterminate && 'hover:border-brand',
            !disabled && 'peer-checked:hover:bg-brand/90',
            !disabled && indeterminate && 'hover:bg-brand/90',

            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          aria-hidden="true"
        >
          {indeterminate ? (
            <MinusIcon size={14} className="text-brand-content pointer-events-none" />
          ) : (
            <CheckIcon
              size={14}
              className={clsx(
                'text-brand-content pointer-events-none transition-opacity duration-200',
                checked ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
        </div>
      </div>
    );
  },
);

CheckboxIndicator.displayName = 'Checkbox.Indicator';
