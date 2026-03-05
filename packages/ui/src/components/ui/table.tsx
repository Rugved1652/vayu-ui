import React from "react";
import { cn } from "../ui/utils";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableCaptionProps {
    children: React.ReactNode;
    className?: string;
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableBodyProps {
    children: React.ReactNode;
    className?: string;
}

interface TableFooterProps {
    children: React.ReactNode;
    className?: string;
}

interface TableRowProps {
    children: React.ReactNode;
    className?: string;
}

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Table Component - Compound Pattern
 * A flexible, accessible table component with full dark/light mode support.
 * Built with semantic HTML and WCAG accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Caption>User List</Table.Caption>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.Header>Name</Table.Header>
 *       <Table.Header>Email</Table.Header>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>John Doe</Table.Cell>
 *       <Table.Cell>john@example.com</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "w-full overflow-x-auto rounded-lg border",
                    "border-neutral-200 bg-white",
                    "dark:border-neutral-800 dark:bg-neutral-950",
                    "shadow-sm",
                    className
                )}
            >
                <table
                    ref={ref}
                    className="w-full border-collapse text-sm font-secondary"
                    {...props}
                >
                    {children}
                </table>
            </div>
        );
    }
);

Table.displayName = "Table";

/**
 * TableCaption
 * Provides a title or description for the table
 */
const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    TableCaptionProps
>(({ children, className }, ref) => {
    return (
        <caption
            ref={ref}
            className={cn(
                "px-4 py-3 text-left font-primary text-base font-semibold",
                "text-neutral-900 dark:text-neutral-50",
                className
            )}
        >
            {children}
        </caption>
    );
});

TableCaption.displayName = "Table.Caption";

/**
 * TableHead
 * Contains header rows with column labels
 */
const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <thead
                ref={ref}
                className={cn(
                    "border-b-2",
                    "border-neutral-200 bg-neutral-50",
                    "dark:border-neutral-800 dark:bg-neutral-900",
                    className
                )}
                {...props}
            >
                {children}
            </thead>
        );
    }
);

TableHead.displayName = "Table.Head";

/**
 * TableBody
 * Contains the main data rows of the table
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className }, ref) => {
        return (
            <tbody
                ref={ref}
                className={cn(
                    "bg-white dark:bg-neutral-950",
                    "divide-y divide-neutral-200 dark:divide-neutral-800",
                    className
                )}
            >
                {children}
            </tbody>
        );
    }
);

TableBody.displayName = "Table.Body";

/**
 * TableFooter
 * Contains summary or total rows at the bottom of the table
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className }, ref) => {
        return (
            <tfoot
                ref={ref}
                className={cn(
                    "border-t-2 font-semibold",
                    "border-neutral-200 bg-neutral-50",
                    "dark:border-neutral-800 dark:bg-neutral-900",
                    className
                )}
            >
                {children}
            </tfoot>
        );
    }
);

TableFooter.displayName = "Table.Footer";

/**
 * TableRow
 * Individual row within the table
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, className }, ref) => {
        return (
            <tr
                ref={ref}
                className={cn(
                    "transition-colors transition-fast",
                    "hover:bg-neutral-50 dark:hover:bg-neutral-900/50",
                    className
                )}
            >
                {children}
            </tr>
        );
    }
);

TableRow.displayName = "Table.Row";

/**
 * TableHeader
 * Header cell (th) for column labels
 */
const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <th
                ref={ref}
                className={cn(
                    "px-4 py-3 text-left font-primary font-semibold text-sm whitespace-nowrap",
                    "text-neutral-700 dark:text-neutral-300",
                    className
                )}
                {...props}
            >
                {children}
            </th>
        );
    }
);

TableHeader.displayName = "Table.Header";

/**
 * TableCell
 * Data cell (td) containing table content
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <td
                ref={ref}
                className={cn(
                    "px-4 py-3 text-sm",
                    "text-neutral-900 dark:text-neutral-100",
                    className
                )}
                {...props}
            >
                {children}
            </td>
        );
    }
);

TableCell.displayName = "Table.Cell";

// Attach compound components
(Table as any).Caption = TableCaption;
(Table as any).Head = TableHead;
(Table as any).Body = TableBody;
(Table as any).Footer = TableFooter;
(Table as any).Row = TableRow;
(Table as any).Header = TableHeader;
(Table as any).Cell = TableCell;

// Type for the compound component
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

export default TableWithCompounds;

// Named exports for alternative import style
export {
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
