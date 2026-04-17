// table-head.tsx
// UI: presentational

import React from 'react';
import { cn } from '../../utils';
import { TableHeadProps } from './types';

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'border-b-2',
          'border-border bg-muted',
          'dark:border-border dark:bg-muted',
          className,
        )}
        {...props}
      >
        {children}
      </thead>
    );
  },
);

TableHead.displayName = 'Table.Head';

export default TableHead;
