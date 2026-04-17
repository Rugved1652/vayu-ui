// table-footer.tsx
// UI: presentational

import React from 'react';
import { cn } from '../../utils';
import { TableFooterProps } from './types';

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'border-t-2 font-semibold',
          'border-border bg-muted',
          'dark:border-border dark:bg-muted',
          className,
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  },
);

TableFooter.displayName = 'Table.Footer';

export default TableFooter;
