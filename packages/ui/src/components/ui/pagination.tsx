import React from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from "lucide-react";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

type PageRange = "compact" | "extended" | "full";

interface BaseProps {
    className?: string;
}

// ============================================================================
// Logic Helper (Pure Function - Server Compatible)
// ============================================================================

const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    siblingCount: number = 1,
    pageRange: PageRange = "compact"
): (number | string)[] => {
    if (pageRange === "full") {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const totalNumbers = siblingCount * 2 + 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, "ellipsis-right", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1
        );
        return [1, "ellipsis-left", ...rightRange];
    }

    const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
    );
    return [1, "ellipsis-left", ...middleRange, "ellipsis-right", totalPages];
};

// ============================================================================
// Root Component
// ============================================================================

interface PaginationRootProps extends BaseProps, React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    "aria-label"?: string;
}

const PaginationRoot = React.forwardRef<HTMLElement, PaginationRootProps>(
    ({ children, className, "aria-label": ariaLabel = "Pagination", ...props }, ref) => {
        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                className={cn("flex flex-col gap-4", className)}
                {...props}
            >
                {children}
            </nav>
        );
    }
);
PaginationRoot.displayName = "PaginationRoot";

// ============================================================================
// Info Component
// ============================================================================

interface PaginationInfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
    totalItems: number;
    pageSize: number;
    currentPage: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
    totalItems,
    pageSize,
    currentPage,
    className,
    ...props
}) => {
    const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <p
            className={cn(
                "text-sm font-secondary text-ground-600 dark:text-ground-400",
                className
            )}
            role="status"
            aria-live="polite"
            {...props}
        >
            Showing{" "}
            <span className="font-semibold text-ground-900 dark:text-white">{startItem}</span>
            {" "}to{" "}
            <span className="font-semibold text-ground-900 dark:text-white">{endItem}</span>
            {" "}of{" "}
            <span className="font-semibold text-ground-900 dark:text-white">{totalItems}</span>
            {" "}results
        </p>
    );
};

// ============================================================================
// Buttons Component (Server Component with Next/Link)
// ============================================================================

interface PaginationButtonsProps extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    currentPage: number;
    totalPages: number;
    hrefBuilder: (page: number) => string;
    pageRange?: PageRange;
    siblingCount?: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    currentPage,
    totalPages,
    hrefBuilder,
    pageRange = "compact",
    siblingCount = 1,
    className,
    ...props
}) => {
    const pages = getPaginationRange(currentPage, totalPages, siblingCount, pageRange);

    const baseClasses = cn(
        "min-w-[36px] h-[36px] px-2.5 text-sm rounded",
        "font-secondary font-medium transition-all duration-150",
        "inline-flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
        "focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
        "border border-ground-300 dark:border-ground-700"
    );

    const inactiveClasses = cn(
        "bg-white dark:bg-ground-900",
        "text-ground-700 dark:text-ground-300",
        "hover:bg-ground-50 dark:hover:bg-ground-800",
        "hover:border-ground-400 dark:hover:border-ground-600"
    );

    const activeClasses = cn(
        "bg-primary-600 dark:bg-primary-500",
        "text-white",
        "border-primary-600 dark:border-primary-500"
    );

    const disabledClasses = "opacity-40 cursor-not-allowed pointer-events-none";

    const renderPageButton = (
        content: React.ReactNode,
        page: number | null,
        ariaLabel: string,
        isDisabled: boolean = false,
        isActive: boolean = false
    ) => {
        const classes = cn(
            baseClasses,
            isDisabled
                ? cn(inactiveClasses, disabledClasses)
                : isActive
                    ? activeClasses
                    : inactiveClasses
        );

        if (isDisabled) {
            return (
                <span className={classes} aria-disabled="true" aria-label={ariaLabel}>
                    {content}
                </span>
            );
        }

        if (isActive) {
            return (
                <span className={classes} aria-current="page" aria-label={ariaLabel}>
                    {content}
                </span>
            );
        }

        return (
            <Link href={hrefBuilder(page!)} className={classes} aria-label={ariaLabel}>
                {content}
            </Link>
        );
    };

    return (
        <div className={cn("flex items-center gap-1 flex-wrap", className)} role="group" {...props}>
            {/* First Page */}
            {renderPageButton(
                <ChevronsLeft className="w-4 h-4" aria-hidden="true" />,
                1,
                "First page",
                currentPage === 1
            )}

            {/* Previous Page */}
            {renderPageButton(
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />,
                currentPage - 1,
                "Previous page",
                currentPage === 1
            )}

            {/* Page Numbers */}
            {pages.map((page, index) => {
                if (typeof page === "string") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className={cn(
                                "min-w-[36px] h-[36px] px-2.5 text-sm rounded",
                                "inline-flex items-center justify-center text-ground-400 dark:text-ground-500 border border-transparent"
                            )}
                            aria-hidden="true"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </span>
                    );
                }

                const isActive = page === currentPage;
                return renderPageButton(page, page, `Go to page ${page}`, false, isActive);
            })}

            {/* Next Page */}
            {renderPageButton(
                <ChevronRight className="w-4 h-4" aria-hidden="true" />,
                currentPage + 1,
                "Next page",
                currentPage === totalPages
            )}

            {/* Last Page */}
            {renderPageButton(
                <ChevronsRight className="w-4 h-4" aria-hidden="true" />,
                totalPages,
                "Last page",
                currentPage === totalPages
            )}
        </div>
    );
};

// ============================================================================
// Compact Pagination (Server Component)
// ============================================================================

interface CompactPaginationProps extends BaseProps, React.HTMLAttributes<HTMLElement> {
    currentPage: number;
    totalPages: number;
    hrefBuilder: (page: number) => string;
    "aria-label"?: string;
}

const CompactPagination: React.FC<CompactPaginationProps> = ({
    currentPage,
    totalPages,
    hrefBuilder,
    className,
    "aria-label": ariaLabel = "Pagination",
    ...props
}) => {
    const buttonClasses = cn(
        "h-[36px] px-3 text-sm rounded",
        "font-secondary font-medium transition-all duration-150",
        "inline-flex items-center justify-center gap-1.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
        "focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
        "border border-ground-300 dark:border-ground-700",
        "bg-white dark:bg-ground-900 text-ground-700 dark:text-ground-300",
        "hover:bg-ground-50 dark:hover:bg-ground-800 hover:border-ground-400 dark:hover:border-ground-600"
    );

    const disabledButtonClasses = cn(buttonClasses, "opacity-40 cursor-not-allowed pointer-events-none");

    return (
        <nav
            aria-label={ariaLabel}
            className={cn("flex items-center justify-between gap-4", className)}
            {...props}
        >
            {/* Previous */}
            {currentPage === 1 ? (
                <span className={disabledButtonClasses} aria-disabled="true">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </span>
            ) : (
                <Link href={hrefBuilder(currentPage - 1)} className={buttonClasses}>
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </Link>
            )}

            {/* Status */}
            <span
                className="text-sm font-secondary text-ground-600 dark:text-ground-400 tabular-nums"
                role="status"
                aria-live="polite"
            >
                Page{" "}
                <span className="font-bold text-primary-600 dark:text-primary-400">
                    {currentPage}
                </span>
                {" "}of {totalPages}
            </span>

            {/* Next */}
            {currentPage === totalPages ? (
                <span className={disabledButtonClasses} aria-disabled="true">
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </span>
            ) : (
                <Link href={hrefBuilder(currentPage + 1)} className={buttonClasses}>
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </Link>
            )}
        </nav>
    );
};

// ============================================================================
// Export
// ============================================================================

export const Pagination = {
    Root: PaginationRoot,
    Info: PaginationInfo,
    Buttons: PaginationButtons,
    Compact: CompactPagination,
};
