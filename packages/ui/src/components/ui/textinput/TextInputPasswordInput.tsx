// password-input.tsx
// UI: presentational

'use client';

import { forwardRef, useState, useEffect } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { useTextInput } from './TextInput';
import { Input } from './Input';
import type { PasswordInputProps } from './types';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { inputType } = useTextInput();

  useEffect(() => {
    if (inputType !== 'password') {
      console.warn("PasswordInput should only be used with inputType='password'");
    }
  }, [inputType]);

  return (
    <>
      <Input ref={ref} {...props} type={showPassword ? 'text' : 'password'} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-muted-content hover:text-surface-content transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded p-1"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </>
  );
});

PasswordInput.displayName = 'TextInput.PasswordInput';

export { PasswordInput };
