// loading-spinner.tsx
// UI: presentational

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';
import { useTextInput } from './TextInput';
import { inputLoadingAria } from '../../utils/input-styles';

const LoadingSpinner: React.FC = () => {
  const { isLoading, size } = useTextInput();

  if (!isLoading) return null;

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return <Loader2 className={cn('text-brand animate-spin shrink-0', iconSize)} {...inputLoadingAria} />;
};

LoadingSpinner.displayName = 'TextInput.LoadingSpinner';

export { LoadingSpinner };
