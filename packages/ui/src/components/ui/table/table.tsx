// table.tsx
// Composition: UI + wiring

import React from "react";
import { cn } from "../utils";
import { TableProps } from "./types";

import TableCaption from "./table-caption";
import TableHead from "./table-head";
import TableBody from "./table-body";
import TableFooter from "./table-footer";
import TableRow from "./table-row";
import TableHeader from "./table-header";
import TableCell from "./table-cell";

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ children, className, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, "aria-colcount": ariaColcount, "aria-rowcount": ariaRowcount, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "w-full overflow-x-auto rounded-surface border",
                    "border-border bg-surface",
                    "dark:border-border dark:bg-surface",
                    "shadow-surface"
                )}
            >
                <table
                    ref={ref}
                    className={cn("w-full border-collapse text-sm font-secondary", className)}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedby}
                    aria-colcount={ariaColcount}
                    aria-rowcount={ariaRowcount}
                    {...props}
                >
                    {children}
                </table>
            </div>
        );
    }
);

Table.displayName = "Table";

// Compound component typing
type TableComponent = React.ForwardRefExoticComponent<
    TableProps & React.RefAttributes<HTMLTableElement>
> & {
    Caption: typeof TableCaption;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Footer: typeof TableFooter;
    Row: typeof TableRow;
    Header: typeof TableHeader;
    Cell: typeof TableCell;
};

const TableWithCompounds = Table as TableComponent;

TableWithCompounds.Caption = TableCaption;
TableWithCompounds.Head = TableHead;
TableWithCompounds.Body = TableBody;
TableWithCompounds.Footer = TableFooter;
TableWithCompounds.Row = TableRow;
TableWithCompounds.Header = TableHeader;
TableWithCompounds.Cell = TableCell;

export default TableWithCompounds;

export {
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
