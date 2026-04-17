// footer.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 p-6 pt-0', className)}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'Modal.Footer';

export { ModalFooter };
