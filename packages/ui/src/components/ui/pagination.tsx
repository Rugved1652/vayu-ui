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
    HTMLAttributes,
    ReactNode,
    useContext,
    useMemo,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";


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
// CVA Variants
// ============================================================================

const paginationButtonVariants = cva(
    "font-secondary font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "rounded",
                outlined: "rounded border-2",
                rounded: "rounded-full",
                pills: "rounded-full",
            },
            isActive: {
                true: "",
                false: "",
            },
            isDisabled: {
                true: "opacity-50 cursor-not-allowed",
                false: "",
            },
        },
        compoundVariants: [
            // Default variant
            {
                variant: "default",
                isActive: true,
                className: "bg-primary-600 dark:bg-primary-500 text-white",
            },
            {
                variant: "default",
                isActive: false,
                isDisabled: false,
                className:
                    "bg-ground-100 dark:bg-ground-800 text-ground-700 dark:text-ground-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400",
            },
            // Outlined variant
            {
                variant: "outlined",
                isActive: true,
                className:
                    "bg-primary-600 dark:bg-primary-500 text-white border-primary-600 dark:border-primary-500",
            },
            {
                variant: "outlined",
                isActive: false,
                isDisabled: false,
                className:
                    "bg-white dark:bg-ground-900 border-ground-300 dark:border-ground-700 text-ground-700 dark:text-ground-300 hover:border-primary-500 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400",
            },
            // Rounded variant
            {
                variant: "rounded",
                isActive: true,
                className:
                    "bg-primary-600 dark:bg-primary-500 text-white shadow-outer",
            },
            {
                variant: "rounded",
                isActive: false,
                isDisabled: false,
                className:
                    "bg-ground-100 dark:bg-ground-800 text-ground-700 dark:text-ground-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400",
            },
            // Pills variant
            {
                variant: "pills",
                isActive: true,
                className:
                    "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-outer",
            },
            {
                variant: "pills",
                isActive: false,
                isDisabled: false,
                className:
                    "bg-ground-100 dark:bg-ground-800 text-ground-700 dark:text-ground-300 hover:bg-ground-200 dark:hover:bg-ground-700",
            },
        ],
        defaultVariants: {
            variant: "default",
            isActive: false,
            isDisabled: false,
        },
    }
);

// ============================================================================
// Main Pagination Component
// ============================================================================

interface PaginationRootProps
    extends Omit<HTMLAttributes<HTMLElement>, "aria-label"> {
    children: ReactNode;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: PaginationVariant;
    size?: PaginationSize;
    pageRange?: PageRange;
    disabled?: boolean;
    siblingCount?: number;
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
    className,
    "aria-label": ariaLabel = "Pagination",
    ...props
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
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

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
        return cn(
            paginationButtonVariants({ variant, isActive, isDisabled }),
            config.button
        );
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
                className={cn("flex flex-col gap-4", className)}
                {...props}
            >
                {children}
            </nav>
        </PaginationContext.Provider>
    );
};

// ============================================================================
// Pagination Info
// ============================================================================

interface PaginationInfoProps extends HTMLAttributes<HTMLParagraphElement> {
    totalItems: number;
    pageSize: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
    totalItems,
    pageSize,
    className,
    ...props
}) => {
    const { currentPage } = usePagination();

    const startItem = (currentPage - 1) * pageSize + 1;
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
            <span className="font-semibold text-ground-900 dark:text-white">
                {startItem}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-ground-900 dark:text-white">
                {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-ground-900 dark:text-white">
                {totalItems}
            </span>{" "}
            results
        </p>
    );
};

// ============================================================================
// Page Size Selector
// ============================================================================

interface PageSizeSelectorProps extends HTMLAttributes<HTMLDivElement> {
    pageSize: number;
    pageSizeOptions?: number[];
    onPageSizeChange: (size: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
    pageSize,
    pageSizeOptions = [10, 20, 50, 100],
    onPageSizeChange,
    className,
    ...props
}) => {
    const { disabled, config } = usePagination();

    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            <label
                htmlFor="page-size-select"
                className="text-sm font-secondary text-ground-600 dark:text-ground-400"
            >
                Show:
            </label>
            <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                disabled={disabled}
                className={cn(
                    config.select,
                    "bg-white dark:bg-ground-900 border-2 border-ground-300 dark:border-ground-700 rounded font-secondary text-ground-700 dark:text-ground-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                aria-label="Items per page"
            >
                {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <span className="text-sm font-secondary text-ground-600 dark:text-ground-400">
                per page
            </span>
        </div>
    );
};

// ============================================================================
// Pagination Controls Container
// ============================================================================

interface PaginationControlsProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-4 flex-wrap",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

// ============================================================================
// Pagination Buttons Container
// ============================================================================

interface PaginationButtonsProps extends HTMLAttributes<HTMLDivElement> {}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    className,
    ...props
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

    const isRoundedVariant = variant === "rounded" || variant === "pills";

    return (
        <div className={cn("flex items-center gap-1", className)} role="group" {...props}>
            {/* First page */}
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1 || disabled}
                className={getButtonStyles(false, currentPage === 1 || disabled)}
                aria-label="Go to first page"
            >
                <ChevronsLeft className={config.icon} aria-hidden="true" />
            </button>

            {/* Previous page */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={getButtonStyles(false, currentPage === 1 || disabled)}
                aria-label="Go to previous page"
            >
                <ChevronLeft className={config.icon} aria-hidden="true" />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => {
                if (typeof page === "string") {
                    return (
                        <span
                            key={`${page}-${index}`}
                            className={cn(
                                config.button,
                                isRoundedVariant ? "rounded-full" : "rounded",
                                "bg-transparent text-ground-400 dark:text-ground-600 flex items-center justify-center"
                            )}
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
                <ChevronRight className={config.icon} aria-hidden="true" />
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
                <ChevronsRight className={config.icon} aria-hidden="true" />
            </button>
        </div>
    );
};

// ============================================================================
// Jump to Page
// ============================================================================

interface JumpToPageProps extends HTMLAttributes<HTMLFormElement> {}

const JumpToPage: React.FC<JumpToPageProps> = ({ className, ...props }) => {
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

    const isRoundedVariant = variant === "rounded" || variant === "pills";

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex items-center gap-2", className)}
            {...props}
        >
            <label
                htmlFor="jump-to-page"
                className="text-sm font-secondary text-ground-600 dark:text-ground-400"
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
                className={cn(
                    config.input,
                    "bg-white dark:bg-ground-900 border-2 border-ground-300 dark:border-ground-700 rounded font-secondary text-ground-700 dark:text-ground-300 placeholder-ground-400 dark:placeholder-ground-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                aria-label="Page number"
            />
            <button
                type="submit"
                disabled={disabled}
                className={cn(
                    config.button,
                    isRoundedVariant ? "rounded-full" : "rounded",
                    "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950"
                )}
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

const compactPaginationVariants = cva(
    "font-secondary font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
    {
        variants: {
            size: {
                sm: "px-3 py-1.5 text-xs",
                md: "px-4 py-2 text-sm",
                lg: "px-5 py-2.5 text-base",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

interface CompactPaginationProps
    extends Omit<HTMLAttributes<HTMLElement>, "aria-label"> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    size?: PaginationSize;
    disabled?: boolean;
    "aria-label"?: string;
}

const CompactPagination: React.FC<CompactPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    size = "md",
    disabled = false,
    className,
    "aria-label": ariaLabel = "Pagination",
    ...props
}) => {
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
            className={cn("flex items-center justify-between gap-4", className)}
            {...props}
        >
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1 || disabled}
                className={cn(
                    compactPaginationVariants({ size }),
                    "bg-white dark:bg-ground-900 border-2 border-ground-300 dark:border-ground-700 rounded text-ground-700 dark:text-ground-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-500 dark:hover:border-primary-600"
                )}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                Previous
            </button>

            <span
                className="text-sm font-secondary text-ground-700 dark:text-ground-300"
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
                className={cn(
                    compactPaginationVariants({ size }),
                    "bg-white dark:bg-ground-900 border-2 border-ground-300 dark:border-ground-700 rounded text-ground-700 dark:text-ground-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-500 dark:hover:border-primary-600"
                )}
                aria-label="Go to next page"
            >
                Next
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
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

export type PaginationButtonVariants = VariantProps<
    typeof paginationButtonVariants
>;
export type CompactPaginationVariants = VariantProps<
    typeof compactPaginationVariants
>;