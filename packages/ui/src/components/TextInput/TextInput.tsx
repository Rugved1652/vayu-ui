// textinput.tsx
// Composition: context + root

'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { cn } from '../../utils';
import type {
  TextInputRootProps,
  TextInputContextValue,
  LabelProps,
  FieldProps,
  InputProps,
  PasswordInputProps,
  NumberInputProps,
  SearchInputProps,
  HelperTextProps,
  IconProps,
  CharacterCountProps,
  ClearButtonProps,
} from './types';
import { TextInputLabel } from './TextInputLabel';
import { TextInputField } from './TextInputField';
import { Input } from './Input';
import { PasswordInput } from './TextInputPasswordInput';
import { NumberInput } from './TextInputNumberInput';
import { SearchInput } from './TextInputSearchInput';
import { Description } from './TextInputDescription';
import { Icon } from './TextInputIcon';
import { LoadingSpinner } from './TextInputLoadingSpinner';
import { SuccessMessage } from './TextInputSuccessMessage';
import { ErrorMessage } from './TextInputErrorMessage';
import { WarningMessage } from './TextInputWarningMessage';
import { CharacterCount } from './TextInputCharacterCount';
import { ClearButton } from './TextInputClearButton';

// Context

const TextInputContext = createContext<TextInputContextValue | undefined>(undefined);

export const useTextInput = () => {
  const context = useContext(TextInputContext);
  if (!context) {
    throw new Error('TextInput compound components must be used within TextInput.Root');
  }
  return context;
};

// Root

const TextInputRoot = forwardRef<HTMLDivElement, TextInputRootProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue = '',
      onChange,
      inputType = 'text',
      size = 'md',
      validationState = 'default',
      disabled = false,
      readOnly = false,
      required = false,
      loading = false,
      className = '',
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const baseId = useId();
    const inputId = `${baseId}-input`;
    const errorId = `${baseId}-error`;
    const descriptionId = `${baseId}-description`;
    const labelId = `${baseId}-label`;

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const setValue = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange],
    );

    const clearValue = useCallback(() => {
      setValue('');
    }, [setValue]);

    const hasValue = value.trim() !== '';

    const contextValue = useMemo<TextInputContextValue>(
      () => ({
        inputId,
        errorId,
        descriptionId,
        labelId,
        value,
        isFocused,
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired: required,
        isLoading: loading,
        validationState,
        hasValue,
        inputType,
        size,
        setValue,
        setFocused: setIsFocused,
        clearValue,
        inputRef: inputRef as React.RefObject<HTMLInputElement>,
      }),
      [
        inputId,
        errorId,
        descriptionId,
        labelId,
        value,
        isFocused,
        disabled,
        readOnly,
        required,
        loading,
        validationState,
        hasValue,
        inputType,
        size,
        setValue,
        clearValue,
      ],
    );

    return (
      <TextInputContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)}>
          {children}
        </div>
      </TextInputContext.Provider>
    );
  },
);

TextInputRoot.displayName = 'TextInput.Root';

// Compound component with placeholder subcomponents (real ones assigned in index.ts)
const TextInput = Object.assign(TextInputRoot, {
  Label: TextInputLabel,
  Field: TextInputField,
  Input: Input,
  PasswordInput: PasswordInput,
  NumberInput: NumberInput,
  SearchInput: SearchInput,
  Description: Description,
  ErrorMessage: ErrorMessage,
  WarningMessage: WarningMessage,
  SuccessMessage: SuccessMessage,
  Icon: Icon,
  LoadingSpinner: LoadingSpinner,
  CharacterCount: CharacterCount,
  ClearButton: ClearButton,
});

export default TextInput;
