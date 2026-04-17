// table-caption.tsx
// UI: presentational

import React from 'react';
import { cn } from '../../utils';
import { TableCaptionProps } from './types';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ children, className, visuallyHidden = false, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn(
          'px-4 py-3 text-left font-primary text-base font-semibold',
          'text-canvas-content',
          visuallyHidden && 'sr-only',
          className,
        )}
        {...props}
      >
        {children}
      </caption>
    );
  },
);

TableCaption.displayName = 'Table.Caption';

export default TableCaption;
