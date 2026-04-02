// text.tsx
// UI: presentational text wrapper

'use client';

import { clsx } from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import { TextProps } from './types';

const Text = forwardRef<HTMLSpanElement, TextProps>(({ children, className, ...props }, ref) => {
  return (
    <span ref={ref} className={clsx('truncate', className)} {...props}>
      {children}
    </span>
  );
});

Text.displayName = 'Button.Text';

export default Text;
