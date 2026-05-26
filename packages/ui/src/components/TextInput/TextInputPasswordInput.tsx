// password-input.tsx
// UI: presentational

'use client';

import { forwardRef, useState, useEffect } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import { Input } from './Input';
import type { PasswordInputProps } from './types';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { inputType, size } = useTextInput();

  useEffect(() => {
    if (inputType !== 'password') {
      console.warn("PasswordInput should only be used with inputType='password'");
    }
  }, [inputType]);

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const btnPadding = size === 'sm' ? 'p-0.5' : 'p-1';

  return (
    <>
      <Input ref={ref} {...props} type={showPassword ? 'text' : 'password'} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={cn(
          'text-muted-content hover:text-surface-content transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded',
          btnPadding,
        )}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeClosed className={iconSize} /> : <Eye className={iconSize} />}
      </button>
    </>
  );
});

PasswordInput.displayName = 'TextInput.PasswordInput';

export { PasswordInput };
