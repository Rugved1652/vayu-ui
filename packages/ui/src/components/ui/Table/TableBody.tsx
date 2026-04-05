// table-body.tsx
// UI: presentational

import React from 'react';
import { cn } from '../utils';
import { TableBodyProps } from './types';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, empty = false, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          'bg-surface dark:bg-surface',
          'divide-y divide-border dark:divide-border',
          className,
        )}
        aria-live={empty ? 'polite' : undefined}
        {...props}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'Table.Body';

export default TableBody;
