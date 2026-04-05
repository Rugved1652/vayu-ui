// title.tsx
// UI: presentational

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../utils';
import { useModal } from './Modal';

const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useModal();
    return (
      <h2
        id={titleId}
        ref={ref}
        className={cn('text-lg font-semibold font-primary text-elevated-content', className)}
        {...props}
      />
    );
  },
);
ModalTitle.displayName = 'Modal.Title';

export { ModalTitle };
