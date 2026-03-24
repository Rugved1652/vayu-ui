import React from "react";
import { cn } from "../ui/utils";

// --- Interfaces ---

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
     * Total number of columns (for large/virtualized tables)
     */
    "aria-colcount"?: number;
    /**
     * Total number of rows (for large/virtualized tables)
     */
    "aria-rowcount"?: number;
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Visually hides the caption while keeping it accessible to screen readers
     * @default false
     */
    visuallyHidden?: boolean;
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Whether this body contains empty data (adds aria-live region)
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
     * Row index for accessibility (useful if rows are virtualized/filtered)
     */
    "aria-rowindex"?: number;
    /**
     * Whether row is selected
     */
    selected?: boolean;
    /**
     * Whether row can be selected (adds keyboard focus)
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
     * Sorting state
     */
    "aria-sort"?: "ascending" | "descending" | "none" | "other";
    /**
     * Whether column is sortable (adds visual indicator and interaction cues)
     */
    sortable?: boolean;
}

// Removed manual rowspan/colspan from interface to avoid conflict with React.TdHTMLAttributes
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
}

// --- Components ---

/**
 * Table Component - Compound Pattern with WCAG 2.2 AA Compliance
 *
 * Fixes applied:
 * - Removed redundant region role on wrapper to prevent double announcement.
 * - Fixed "tabindex" class bug in TableRow (now uses proper attribute).
 * - Fixed sort icon visibility for unsorted sortable columns.
 * - Fixed prop naming (visuallyHidden vs hidden).
 */
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

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    TableCaptionProps
>(({ children, className, visuallyHidden = false, ...props }, ref) => {
    return (
        <caption
            ref={ref}
            className={cn(
                "px-4 py-3 text-left font-primary text-base font-semibold",
                "text-canvas-content",
                visuallyHidden && "sr-only", // Renamed from 'hidden' for clarity
                className
            )}
            {...props}
        >
            {children}
        </caption>
    );
});

TableCaption.displayName = "Table.Caption";

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <thead
                ref={ref}
                className={cn(
                    "border-b-2",
                    "border-border bg-muted",
                    "dark:border-border dark:bg-muted",
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

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className, empty = false, ...props }, ref) => {
        return (
            <tbody
                ref={ref}
                className={cn(
                    "bg-surface dark:bg-surface",
                    "divide-y divide-border dark:divide-border",
                    className
                )}
                aria-live={empty ? "polite" : undefined}
                {...props}
            >
                {children}
            </tbody>
        );
    }
);

TableBody.displayName = "Table.Body";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <tfoot
                ref={ref}
                className={cn(
                    "border-t-2 font-semibold",
                    "border-border bg-muted",
                    "dark:border-border dark:bg-muted",
                    className
                )}
                {...props}
            >
                {children}
            </tfoot>
        );
    }
);

TableFooter.displayName = "Table.Footer";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, className, "aria-rowindex": ariaRowindex, selected = false, selectable = false, ...props }, ref) => {
        return (
            <tr
                ref={ref}
                className={cn(
                    "transition-colors transition-medium",
                    "hover:bg-muted dark:hover:bg-muted",
                    selected && "bg-muted dark:bg-muted",
                    selectable && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    className
                )}
                role="row"
                aria-rowindex={ariaRowindex}
                aria-selected={selectable ? selected : undefined}
                tabIndex={selectable ? 0 : undefined} // FIX: Moved from className to proper attribute
                {...props}
            >
                {children}
            </tr>
        );
    }
);

TableRow.displayName = "Table.Row";

const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
    ({ children, className, scope = "col", "aria-colindex": ariaColindex, "aria-sort": ariaSort, sortable = false, ...props }, ref) => {
        // Determine icon based on state
        const renderSortIcon = () => {
            if (!sortable) return null;
            
            // Use aria-hidden on the visual icon since the state is exposed via aria-sort
            if (ariaSort === "ascending") return <span className="ml-2" aria-hidden="true">↑</span>;
            if (ariaSort === "descending") return <span className="ml-2" aria-hidden="true">↓</span>;
            // Unsorted but sortable (shows affordance)
            return <span className="ml-2 opacity-50" aria-hidden="true">↕</span>;
        };

        return (
            <th
                ref={ref}
                className={cn(
                    "px-4 py-3 text-left font-primary font-semibold text-sm whitespace-nowrap",
                    "text-muted-content",
                    sortable && "cursor-pointer hover:bg-muted transition-colors transition-medium select-none",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    className
                )}
                scope={scope}
                aria-colindex={ariaColindex}
                aria-sort={sortable ? (ariaSort || "none") : undefined}
                tabIndex={sortable ? 0 : undefined}
                {...props}
            >
                <div className="inline-flex items-center">
                    {children}
                    {renderSortIcon()}
                </div>
            </th>
        );
    }
);

TableHeader.displayName = "Table.Header";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, "aria-colindex": ariaColindex, "aria-rowindex": ariaRowindex, headers, ...props }, ref) => {
        // Note: rowSpan and colSpan are passed via ...props automatically from React.TdHTMLAttributes
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

// --- Compound Component Typing & Exports ---

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