// table-header.tsx
// UI: presentational (sort icon logic)

import React from 'react';
import { cn } from '../utils';
import { TableHeaderProps } from './types';

const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
  (
    {
      children,
      className,
      scope = 'col',
      'aria-colindex': ariaColindex,
      'aria-sort': ariaSort,
      sortable = false,
      ...props
    },
    ref,
  ) => {
    const renderSortIcon = () => {
      if (!sortable) return null;
      if (ariaSort === 'ascending')
        return (
          <span className="ml-2" aria-hidden="true">
            ↑
          </span>
        );
      if (ariaSort === 'descending')
        return (
          <span className="ml-2" aria-hidden="true">
            ↓
          </span>
        );
      return (
        <span className="ml-2 opacity-50" aria-hidden="true">
          ↕
        </span>
      );
    };

    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 text-left font-primary font-semibold text-sm whitespace-nowrap',
          'text-muted-content',
          sortable &&
            'cursor-pointer hover:bg-muted transition-colors transition-medium select-none',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          className,
        )}
        scope={scope}
        aria-colindex={ariaColindex}
        aria-sort={sortable ? ariaSort || 'none' : undefined}
        tabIndex={sortable ? 0 : undefined}
        {...props}
      >
        <div className="inline-flex items-center">
          {children}
          {renderSortIcon()}
        </div>
      </th>
    );
  },
);

TableHeader.displayName = 'Table.Header';

export default TableHeader;
