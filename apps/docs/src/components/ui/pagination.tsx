// src/components/Pagination.tsx

"use client";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from "lucide-react";
import React, {
    createContext,
    FormEvent,
    ReactNode,
    useContext,
    useMemo,
} from "react";

/**
 * Pagination Component - Compound Pattern with Accessibility
 *
 * A fully accessible pagination component with:
 * - Compound component pattern for flexible composition
 * - Full keyboard navigation support
 * - ARIA labels and proper navigation semantics
 * - Multiple visual variants and sizes
 * - Page range options (compact, extended, full)
 * - Page size selector
 * - Jump to page functionality
 * - Info display
 * - Mobile-friendly compact mode
 * - Screen reader friendly
 */

// ============================================================================
// Types
// ============================================================================

type PaginationVariant = "default" | "outlined" | "rounded" | "pills";
type PaginationSize = "sm" | "md" | "lg";
type PageRange = "compact" | "extended" | "full";

// ============================================================================
// Context
// ============================================================================

interface PaginationContextType {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant: PaginationVariant;
    size: PaginationSize;
    pageRange: PageRange;
    disabled: boolean;
    siblingCount: number;
    pageNumbers: (number | string)[];
    handlePageChange: (page: number) => void;
    getButtonStyles: (isActive: boolean, isDisabled: boolean) => string;
    config: {
        button: string;
        icon: string;
        input: string;
        select: string;
    };
}

const PaginationContext = createContext<PaginationContextType | undefined>(
    undefined
);

const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error(
            "Pagination compound components must be used within Pagination"
        );
    }
    return context;
};

// ============================================================================
// Size Configuration
// ============================================================================

const sizeConfig = {
    sm: {
        button: "px-2 py-1 text-xs",
        icon: "w-3 h-3",
        input: "px-2 py-1 text-xs w-16",
        select: "px-2 py-1 text-xs",
    },
    md: {
        button: "px-3 py-2 text-sm",
        icon: "w-4 h-4",
        input: "px-3 py-1.5 text-sm w-20",
        select: "px-3 py-1.5 text-sm",
    },
    lg: {
        button: "px-4 py-2.5 text-base",
        icon: "w-5 h-5",
        input: "px-4 py-2 text-base w-24",
        select: "px-4 py-2 text-base",
    },
};

// ============================================================================
// Main Pagination Component
// ============================================================================

interface PaginationRootProps {
    children: ReactNode;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: PaginationVariant;
    size?: PaginationSize;
    pageRange?: PageRange;
    disabled?: boolean;
    siblingCount?: number;
    className?: string;
    /**
     * Accessible label for the pagination navigation
     */
    "aria-label"?: string;
}

const PaginationRoot: React.FC<PaginationRootProps> = ({
    children,
    currentPage,
    totalPages,
    onPageChange,
    variant = "default",
    size = "md",
    pageRange = "compact",
    disabled = false,
    siblingCount = 1,
    className = "",
    "aria-label": ariaLabel = "Pagination",
}) => {
    const config = sizeConfig[size];

    // Calculate page numbers to display
    const pageNumbers = useMemo(() => {
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
    }, [currentPage, totalPages, siblingCount, pageRange]);

    const getButtonStyles = (isActive: boolean, isDisabled: boolean): string => {
        const baseStyles = `
      font-secondary font-medium transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${config.button}
    `;

        if (isDisabled) {
            return `${baseStyles} opacity-50 cursor-not-allowed`;
        }

        switch (variant) {
            case "outlined":
                return `
          ${baseStyles}
          border-2 border-neutral-300 dark:border-neutral-700
          ${isActive
                        ? "bg-primary-600 dark:bg-primary-500 text-white border-primary-600 dark:border-primary-500"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-primary-500 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
                    }
        `;

            case "rounded":
                return `
          ${baseStyles}
          rounded-full
          ${isActive
                        ? "bg-primary-600 dark:bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400"
                    }
        `;

            case "pills":
                return `
          ${baseStyles}
          rounded-full
          ${isActive
                        ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }
        `;

            default:
                return `
          ${baseStyles}
          rounded-md
          ${isActive
                        ? "bg-primary-600 dark:bg-primary-500 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400"
                    }
        `;
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage || disabled)
            return;
        onPageChange(page);
    };

    const contextValue: PaginationContextType = {
        currentPage,
        totalPages,
        onPageChange,
        variant,
        size,
        pageRange,
        disabled,
        siblingCount,
        pageNumbers,
        handlePageChange,
        getButtonStyles,
        config,
    };

    return (
        <PaginationContext.Provider value={contextValue}>
            <nav
                aria-label={ariaLabel}
                className={`flex flex-col gap-4 ${className}`}
            >
                {children}
            </nav>
        </PaginationContext.Provider>
    );
};

// ============================================================================
// Pagination Info
// ============================================================================

interface PaginationInfoProps {
    totalItems: number;
    pageSize: number;
    className?: string;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
    totalItems,
    pageSize,
    className = "",
}) => {
    const { currentPage } = usePagination();

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <p
            className={`text-sm font-secondary text-neutral-600 dark:text-neutral-400 ${className}`}
            role="status"
            aria-live="polite"
        >
            Showing{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
                {startItem}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
                {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
                {totalItems}
            </span>{" "}
            results
        </p>
    );
};

// ============================================================================
// Page Size Selector
// ============================================================================

interface PageSizeSelectorProps {
    pageSize: number;
    pageSizeOptions?: number[];
    onPageSizeChange: (size: number) => void;
    className?: string;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
    pageSize,
    pageSizeOptions = [10, 20, 50, 100],
    onPageSizeChange,
    className = "",
}) => {
    const { disabled, config } = usePagination();

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <label
                htmlFor="page-size-select"
                className="text-sm font-secondary text-neutral-600 dark:text-neutral-400"
            >
                Show:
            </label>
            <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                disabled={disabled}
                className={`
          ${config.select}
          bg-white dark:bg-neutral-900
          border-2 border-neutral-300 dark:border-neutral-700
          rounded-md font-secondary
          text-neutral-700 dark:text-neutral-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
                aria-label="Items per page"
            >
                {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <span className="text-sm font-secondary text-neutral-600 dark:text-neutral-400">
                per page
            </span>
        </div>
    );
};

// ============================================================================
// Pagination Controls Container
// ============================================================================

interface PaginationControlsProps {
    children: ReactNode;
    className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 flex-wrap ${className}`}
        >
            {children}
        </div>
    );
};

// ============================================================================
// Pagination Buttons Container
// ============================================================================

interface PaginationButtonsProps {
    className?: string;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    className = "",
}) => {
    const {
        currentPage,
        totalPages,
        pageNumbers,
        handlePageChange,
        getButtonStyles,
        disabled,
        variant,
        config,
    } = usePagination();

    return (
        <div className={`flex items-center gap-1 ${className}`} role="group">
            {/* First page */}
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1 || disabled}
                className={getButtonStyles(false, currentPage === 1 || disabled)}
                aria-label="Go to first page"
            >
                <ChevronsLeft className={config.icon} />
            </button>

            {/* Previous page */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={getButtonStyles(false, currentPage === 1 || disabled)}
                aria-label="Go to previous page"
            >
                <ChevronLeft className={config.icon} />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => {
                if (typeof page === "string") {
                    return (
                        <span
                            key={`${page}-${index}`}
                            className={`
                ${config.button}
                ${variant === "rounded" || variant === "pills"
                                    ? "rounded-full"
                                    : "rounded-md"
                                }
                bg-transparent text-neutral-400 dark:text-neutral-600 flex items-center justify-center
              `}
                            aria-hidden="true"
                        >
                            <MoreHorizontal className={config.icon} />
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={disabled}
                        className={getButtonStyles(page === currentPage, disabled)}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next page */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || disabled}
                className={getButtonStyles(
                    false,
                    currentPage === totalPages || disabled
                )}
                aria-label="Go to next page"
            >
                <ChevronRight className={config.icon} />
            </button>

            {/* Last page */}
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages || disabled}
                className={getButtonStyles(
                    false,
                    currentPage === totalPages || disabled
                )}
                aria-label="Go to last page"
            >
                <ChevronsRight className={config.icon} />
            </button>
        </div>
    );
};

// ============================================================================
// Jump to Page
// ============================================================================

interface JumpToPageProps {
    className?: string;
}

const JumpToPage: React.FC<JumpToPageProps> = ({ className = "" }) => {
    const { totalPages, handlePageChange, disabled, variant, config } =
        usePagination();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const page = parseInt(formData.get("page") as string);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            handlePageChange(page);
            e.currentTarget.reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 ${className}`}
        >
            <label
                htmlFor="jump-to-page"
                className="text-sm font-secondary text-neutral-600 dark:text-neutral-400"
            >
                Go to:
            </label>
            <input
                id="jump-to-page"
                type="number"
                name="page"
                min={1}
                max={totalPages}
                placeholder={`1-${totalPages}`}
                disabled={disabled}
                className={`
          ${config.input}
          bg-white dark:bg-neutral-900
          border-2 border-neutral-300 dark:border-neutral-700
          rounded-md font-secondary
          text-neutral-700 dark:text-neutral-300
          placeholder-neutral-400 dark:placeholder-neutral-600
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
                aria-label="Page number"
            />
            <button
                type="submit"
                disabled={disabled}
                className={`
          ${config.button}
          ${variant === "rounded" || variant === "pills"
                        ? "rounded-full"
                        : "rounded-md"
                    }
          bg-primary-600 dark:bg-primary-500 text-white
          hover:bg-primary-700 dark:hover:bg-primary-600
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
                aria-label="Go to page"
            >
                Go
            </button>
        </form>
    );
};

// ============================================================================
// Compact Pagination (Mobile-friendly)
// ============================================================================

interface CompactPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    size?: PaginationSize;
    disabled?: boolean;
    className?: string;
    /**
     * Accessible label for the pagination
     */
    "aria-label"?: string;
}

const CompactPagination: React.FC<CompactPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    size = "md",
    disabled = false,
    className = "",
    "aria-label": ariaLabel = "Pagination",
}) => {
    const sizeConfigLocal = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
    };

    const config = sizeConfigLocal[size];

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav
            aria-label={ariaLabel}
            className={`flex items-center justify-between gap-4 ${className}`}
        >
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1 || disabled}
                className={`
          ${config}
          bg-white dark:bg-neutral-900
          border-2 border-neutral-300 dark:border-neutral-700
          rounded-lg font-secondary font-medium
          text-neutral-700 dark:text-neutral-300
          hover:bg-primary-50 dark:hover:bg-primary-900/30
          hover:border-primary-500 dark:hover:border-primary-600
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center gap-2
        `}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </button>

            <span
                className="text-sm font-secondary text-neutral-700 dark:text-neutral-300"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                Page{" "}
                <span className="font-bold text-primary-600 dark:text-primary-400">
                    {currentPage}
                </span>{" "}
                of <span className="font-bold">{totalPages}</span>
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages || disabled}
                className={`
          ${config}
          bg-white dark:bg-neutral-900
          border-2 border-neutral-300 dark:border-neutral-700
          rounded-lg font-secondary font-medium
          text-neutral-700 dark:text-neutral-300
          hover:bg-primary-50 dark:hover:bg-primary-900/30
          hover:border-primary-500 dark:hover:border-primary-600
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center gap-2
        `}
                aria-label="Go to next page"
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    );
};

// ============================================================================
// Export Compound Component
// ============================================================================

export const Pagination = Object.assign(PaginationRoot, {
    Info: PaginationInfo,
    PageSizeSelector: PageSizeSelector,
    Controls: PaginationControls,
    Buttons: PaginationButtons,
    JumpToPage: JumpToPage,
    Compact: CompactPagination,
});

// ============================================================================
// Type Exports
// ============================================================================

export type {
    CompactPaginationProps,
    JumpToPageProps,
    PageRange,
    PageSizeSelectorProps,
    PaginationButtonsProps,
    PaginationControlsProps,
    PaginationInfoProps,
    PaginationRootProps,
    PaginationSize,
    PaginationVariant,
};
