// loading-spinner.tsx
// UI: presentational

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTextInput } from './TextInput';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useTextInput();

  if (!isLoading) return null;

  return <Loader2 className="w-5 h-5 text-brand animate-spin" aria-label="Loading" />;
};

LoadingSpinner.displayName = 'TextInput.LoadingSpinner';

export { LoadingSpinner };
