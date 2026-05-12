// loading-spinner.tsx
// UI: presentational

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTextInput } from './TextInput';
import { inputLoadingSpinnerStyles, inputLoadingAria } from '../../utils/input-styles';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useTextInput();

  if (!isLoading) return null;

  return <Loader2 className={inputLoadingSpinnerStyles} {...inputLoadingAria} />;
};

LoadingSpinner.displayName = 'TextInput.LoadingSpinner';

export { LoadingSpinner };
