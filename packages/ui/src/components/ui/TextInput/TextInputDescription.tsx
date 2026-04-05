// description.tsx
// UI: presentational

'use client';

import React from 'react';
import { cn } from '../utils';
import { useTextInput } from './TextInput';
import type { HelperTextProps } from './types';

const Description: React.FC<HelperTextProps> = ({ children, className = '' }) => {
  const { descriptionId } = useTextInput();

  return (
    <p
      id={descriptionId}
      className={cn('mt-1.5 text-sm font-secondary text-muted-content', className)}
    >
      {children}
    </p>
  );
};

Description.displayName = 'TextInput.Description';

export { Description };
