// body.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-y-auto p-6',
        'text-sm font-secondary text-muted-content',
        className,
      )}
      {...props}
    />
  ),
);
ModalBody.displayName = 'Modal.Body';

export { ModalBody };
