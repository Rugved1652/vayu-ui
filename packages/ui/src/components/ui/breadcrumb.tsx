import React, { forwardRef } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";

// ============================================================================
// Breadcrumb Root
// ============================================================================

const Breadcrumb = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
}>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

// ============================================================================
// Breadcrumb List
// ============================================================================

const BreadcrumbList = forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
    ({ className, ...props }, ref) => (
        <ol
            ref={ref}
            className={clsx(
                "flex flex-wrap items-center gap-1.5 break-words text-sm text-ground-600 sm:gap-2.5 dark:text-ground-400",
                className
            )}
            {...props}
        />
    )
);
BreadcrumbList.displayName = "BreadcrumbList";

// ============================================================================
// Breadcrumb Item
// ============================================================================

const BreadcrumbItem = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => (
        <li
            ref={ref}
            className={clsx("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

// ============================================================================
// Breadcrumb Link
// ============================================================================

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    asChild?: boolean;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ asChild, className, ...props }, ref) => {
        const Comp = asChild ? Slot : "a";

        return (
            <Comp
                ref={ref}
                className={clsx(
                    "rounded transition-colors duration-(--transition-fast) ease-in-out hover:text-ground-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-ground-600 dark:focus-visible:ring-offset-ground-950 dark:hover:text-ground-100",
                    className
                )}
                {...props}
            />
        );
    }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

// ============================================================================
// Breadcrumb Page
// ============================================================================

const BreadcrumbPage = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={clsx("font-normal text-ground-950 dark:text-ground-100", className)}
            {...props}
        />
    )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

// ============================================================================
// Breadcrumb Separator
// ============================================================================

const BreadcrumbSeparator = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
    ({ children, className, ...props }, ref) => (
        <li
            ref={ref}
            role="presentation"
            aria-hidden="true"
            className={clsx("[&>svg]:size-3.5", className)}
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ============================================================================
// Breadcrumb Ellipsis
// ============================================================================

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            role="presentation"
            aria-hidden="true"
            className={clsx("flex h-9 w-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
        </span>
    )
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};