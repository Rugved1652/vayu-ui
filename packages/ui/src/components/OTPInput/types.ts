// types.ts
// Types

import type { HTMLAttributes, InputHTMLAttributes } from 'react';
import type { InputSize, ValidationState } from '../../utils/input-styles';

export interface OTPInputContextValue {
  value: string;
  isFocused: boolean;
  maxLength: number;
  disabled: boolean;
  loading: boolean;
  id: string;
  validationState: ValidationState;
  size: InputSize;
}

export interface OTPInputRootProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  containerClassName?: string;
  /** Callback when the complete code is entered */
  onComplete?: (code: string) => void;
  /** Accessible label for the input */
  label?: string;
  /** Render prop for slots and separators */
  children?: React.ReactNode;
  /** @deprecated Use `validationState` instead. */
  hasError?: boolean;
  validationState?: ValidationState;
  size?: InputSize;
  loading?: boolean;
  /** ID of the element that describes the error message */
  errorMessageId?: string;
}

export interface OTPInputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface OTPInputSlotProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
}

export interface OTPInputSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
