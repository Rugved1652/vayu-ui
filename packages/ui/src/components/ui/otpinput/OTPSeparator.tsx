// separator.tsx
// UI: visual separator between slot groups

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { OTPInputSeparatorProps } from './types';

const OTPInputSeparator = forwardRef<HTMLDivElement, OTPInputSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={clsx('flex items-center justify-center px-2', className)}
      {...props}
    >
      {children ?? <div className="h-1.5 w-1.5 rounded-full bg-muted-content" />}
    </div>
  ),
);
OTPInputSeparator.displayName = 'OTPInput.Separator';

export { OTPInputSeparator };
