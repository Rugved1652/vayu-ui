// table-cell.tsx
// UI: presentational

import React from "react";
import { cn } from "../utils";
import { TableCellProps } from "./types";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, "aria-colindex": ariaColindex, "aria-rowindex": ariaRowindex, headers, ...props }, ref) => {
        return (
            <td
                ref={ref}
                className={cn(
                    "px-4 py-3 text-sm",
                    "text-surface-content",
                    className
                )}
                aria-colindex={ariaColindex}
                aria-rowindex={ariaRowindex}
                headers={headers}
                {...props}
            >
                {children}
            </td>
        );
    }
);

TableCell.displayName = "Table.Cell";

export default TableCell;
