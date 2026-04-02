// checkbox.tsx
// Composition: state + context provider

'use client';
import { clsx } from 'clsx';
import React, { forwardRef, useId } from 'react';

import { CheckboxContext } from './hooks';
import type { CheckboxRootProps, CheckboxContextValue } from './types';

const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRootProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      error = false,
      onChange,
      name,
      value,
      required,
      className,
      children,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;
    const errorId = `${checkboxId}-error`;
    const descriptionId = `${checkboxId}-description`;

    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (newChecked: boolean) => {
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    const contextValue: CheckboxContextValue = {
      checked,
      indeterminate,
      disabled,
      error,
      checkboxId,
      errorId,
      descriptionId,
      name,
      value,
      required,
      onChange: handleChange,
    };

    return (
      <CheckboxContext.Provider value={contextValue}>
        <div ref={ref} className={clsx('flex flex-col gap-1', className)} {...props}>
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  },
);

CheckboxRoot.displayName = 'Checkbox.Root';

export default CheckboxRoot;
