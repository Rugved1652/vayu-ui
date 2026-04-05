// table-row.tsx
// UI: presentational

import React from 'react';
import { cn } from '../utils';
import { TableRowProps } from './types';

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      children,
      className,
      'aria-rowindex': ariaRowindex,
      selected = false,
      selectable = false,
      ...props
    },
    ref,
  ) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors transition-medium',
          'hover:bg-muted dark:hover:bg-muted',
          selected && 'bg-muted dark:bg-muted',
          selectable &&
            'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          className,
        )}
        role="row"
        aria-rowindex={ariaRowindex}
        aria-selected={selectable ? selected : undefined}
        tabIndex={selectable ? 0 : undefined}
        {...props}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'Table.Row';

export default TableRow;
