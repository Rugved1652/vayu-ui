// types.ts
// Types

import React from "react";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
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

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Visually hides the caption while keeping it accessible to screen readers
     * @default false
     */
    visuallyHidden?: boolean;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
    /**
     * Whether this body contains empty data (adds aria-live region)
     */
    empty?: boolean;
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
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

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
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

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
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
