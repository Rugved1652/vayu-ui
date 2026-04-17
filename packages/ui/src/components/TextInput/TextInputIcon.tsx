// icon.tsx
// UI: presentational

'use client';

import React from 'react';
import { cn } from '../../utils';
import type { IconProps } from './types';

const Icon: React.FC<IconProps> = ({ children, className = '' }) => {
  return <span className={cn('text-muted-content flex items-center', className)}>{children}</span>;
};

Icon.displayName = 'TextInput.Icon';

export { Icon };
