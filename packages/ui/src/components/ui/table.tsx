import React from "react";
import { cn } from "../ui/utils";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Accessible description for screen readers
     */
    "aria-label"?: string;
    /**
     * Reference to element that describes the table
     */
    "aria-describedby"?: string;
    /**
     * Total number of columns (for large tables)
     */
    "aria-colcount"?: number;
    /**
     * Total number of rows (for large tables)
     */
    "aria-rowcount"?: number;
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Whether caption should be hidden from screen readers
     * @default false
     */
    hidden?: boolean;
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Whether this body contains empty data
     */
    empty?: boolean;
}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Row index for accessibility
     */
    "aria-rowindex"?: number;
    /**
     * Whether row is selected
     */
    selected?: boolean;
    /**
     * Whether row can be selected
     */
    selectable?: boolean;
}

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Column scope (row, col, rowgroup, colgroup)
     * @default "col"
     */
    scope?: "row" | "col" | "rowgroup" | "colgroup";
    /**
     * Column index for accessibility
     */
    "aria-colindex"?: number;
    /**
     * Sorting state (ascending, descending, none)
     */
    "aria-sort"?: "ascending" | "descending" | "none" | "other";
    /**
     * Whether column is sortable
     */
    sortable?: boolean;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Column index for accessibility
     */
    "aria-colindex"?: number;
    /**
     * Row index for accessibility
     */
    "aria-rowindex"?: number;
    /**
     * Whether cell is a header cell
     */
    headers?: string;
    /**
     * Whether cell spans multiple rows
     */
    rowspan?: number;
    /**
     * Whether cell spans multiple columns
     */
    colspan?: number;
}

/**
 * Table Component - Compound Pattern with WCAG 2.2 AA Compliance
 * A flexible, accessible table component with full dark/light mode support.
 * Built with semantic HTML and WCAG 2.2 AA accessibility guidelines.
 *
 * WCAG 2.2 AA Features:
 * - Proper semantic HTML table structure
 * - Scope attributes for header cells
 * - ARIA labels and descriptions
 * - Keyboard navigation support
 * - Sort indicators for sortable columns
 * - Row/column indices for large tables
 * - Focus management for interactive rows
 *
 * @example
 * ```tsx
 * <Table aria-label="User List">
 *   <Table.Caption>User List</Table.Caption>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.Header scope="col">Name</Table.Header>
 *       <Table.Header scope="col" sortable aria-sort="none">Email</Table.Header>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row aria-rowindex="1">
 *       <Table.Cell>John Doe</Table.Cell>
 *       <Table.Cell>john@example.com</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ children, className, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, "aria-colcount": ariaColcount, "aria-rowcount": ariaRowcount, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "w-full overflow-x-auto rounded-lg border",
                    "border-neutral-200 bg-white",
                    "dark:border-neutral-800 dark:bg-neutral-950",
                    "shadow-sm",
                    className
                )}
                role="region"
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
            >
                <table
                    ref={ref}
                    className="w-full border-collapse text-sm font-secondary"
                    role="table"
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

/**
 * TableCaption
 * Provides a title or description for the table
 * WCAG 2.2 AA: Captions help screen reader users understand table context
 */
const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    TableCaptionProps
>(({ children, className, hidden = false, ...props }, ref) => {
    return (
        <caption
            ref={ref}
            className={cn(
                "px-4 py-3 text-left font-primary text-base font-semibold",
                "text-neutral-900 dark:text-neutral-50",
                hidden && "sr-only",
                className
            )}
            {...props}
        >
            {children}
        </caption>
    );
});

TableCaption.displayName = "Table.Caption";

/**
 * TableHead
 * Contains header rows with column labels
 * WCAG 2.2 AA: Proper header structure for screen readers
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
 * Contains main data rows of table
 * WCAG 2.2 AA: Proper body structure for screen readers
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className, empty = false, ...props }, ref) => {
        return (
            <tbody
                ref={ref}
                className={cn(
                    "bg-white dark:bg-neutral-950",
                    "divide-y divide-neutral-200 dark:divide-neutral-800",
                    className
                )}
                role="rowgroup"
                aria-live={empty ? "polite" : undefined}
                {...props}
            >
                {children}
            </tbody>
        );
    }
);

TableBody.displayName = "Table.Body";

/**
 * TableFooter
 * Contains summary or total rows at the bottom of table
 * WCAG 2.2 AA: Footer structure for summary information
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <tfoot
                ref={ref}
                className={cn(
                    "border-t-2 font-semibold",
                    "border-neutral-200 bg-neutral-50",
                    "dark:border-neutral-800 dark:bg-neutral-900",
                    className
                )}
                role="rowgroup"
                {...props}
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
 * WCAG 2.2 AA: Proper row structure and focus management
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, className, "aria-rowindex": ariaRowindex, selected = false, selectable = false, ...props }, ref) => {
        return (
            <tr
                ref={ref}
                className={cn(
                    "transition-colors duration-200",
                    "hover:bg-neutral-50 dark:hover:bg-neutral-900/50",
                    selected && "bg-neutral-100 dark:bg-neutral-800",
                    selectable && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:ring-offset-2",
                    "tabindex",
                    selectable && "tabindex-0",
                    className
                )}
                role="row"
                aria-rowindex={ariaRowindex}
                aria-selected={selected}
                {...props}
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
 * WCAG 2.2 AA: Proper scope and ARIA attributes for accessibility
 */
const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
    ({ children, className, scope = "col", "aria-colindex": ariaColindex, "aria-sort": ariaSort, sortable = false, ...props }, ref) => {
        return (
            <th
                ref={ref}
                className={cn(
                    "px-4 py-3 text-left font-primary font-semibold text-sm whitespace-nowrap",
                    "text-neutral-700 dark:text-neutral-300",
                    sortable && "cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500",
                    className
                )}
                scope={scope}
                aria-colindex={ariaColindex}
                aria-sort={sortable ? (ariaSort || "none") : undefined}
                tabIndex={sortable ? 0 : undefined}
                {...props}
            >
                {children}
                {sortable && ariaSort !== "none" && (
                    <span className="ml-2 inline-block" aria-hidden="true">
                        {ariaSort === "ascending" ? "↑" : ariaSort === "descending" ? "↓" : "↕"}
                    </span>
                )}
            </th>
        );
    }
);

TableHeader.displayName = "Table.Header";

/**
 * TableCell
 * Data cell (td) containing table content
 * WCAG 2.2 AA: Proper cell structure with ARIA attributes
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, "aria-colindex": ariaColindex, "aria-rowindex": ariaRowindex, headers, rowspan, colspan, ...props }, ref) => {
        return (
            <td
                ref={ref}
                className={cn(
                    "px-4 py-3 text-sm",
                    "text-neutral-900 dark:text-neutral-100",
                    className
                )}
                aria-colindex={ariaColindex}
                aria-rowindex={ariaRowindex}
                headers={headers}
                rowSpan={rowspan}
                colSpan={colspan}
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

// Type for compound component
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
