// textarea.tsx
// Composition: Context, Root

'use client';

import React, { createContext, useContext, useState, useId } from 'react';
import { cn } from '../../utils';
import { inputRootLayout } from '../../utils/input-styles';
import type { TextAreaContextValue, TextAreaRootProps } from './types';
import { normalizeValidationState } from '../../utils/input-styles';

// Context
export const TextAreaContext = createContext<TextAreaContextValue | undefined>(undefined);

export const useTextAreaContext = () => {
  const context = useContext(TextAreaContext);
  if (!context) {
    throw new Error('TextArea compound components must be used within TextArea.Root');
  }
  return context;
};

// Root
const TextAreaRoot = ({
  children,
  size = 'md',
  error,
  validationState: validationStateProp,
  maxLength,
  disabled = false,
  loading = false,
  className,
}: TextAreaRootProps) => {
  const validationState = normalizeValidationState(validationStateProp ?? error);

  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [hasSupportText, setHasSupportText] = useState(false);

  const generatedId = useId();
  const inputId = `textarea-input-${generatedId}`;
  const supportTextId = `textarea-support-${generatedId}`;
  const errorTextId = `textarea-error-${generatedId}`;
  const labelId = `textarea-label-${generatedId}`;

  return (
    <TextAreaContext.Provider
      value={{
        isFocused,
        setIsFocused,
        charCount,
        setCharCount,
        maxLength,
        validationState,
        size,
        disabled,
        loading,
        inputId,
        supportTextId,
        errorTextId,
        labelId,
        setLabelId: () => {},
        hasSupportText,
        setHasSupportText,
      }}
    >
      <div className={cn(inputRootLayout, className)} role="group" aria-labelledby={labelId}>
        {children}
      </div>
    </TextAreaContext.Provider>
  );
};

TextAreaRoot.displayName = 'TextArea';

export default TextAreaRoot;
