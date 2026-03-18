import React, { Children, HTMLAttributes, ElementType, ComponentType, isValidElement } from "react";
import Link from "next/link";
import { cn } from "./utils";
import { Tooltip } from "./tooltip";

// ============================================================================
// Types
// ============================================================================

interface DockBaseProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    "aria-label"?: string;
}

interface DockItemProps extends HTMLAttributes<HTMLElement> {
    icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
    href?: string;
    onClick?: () => void; // Note: Requires client-side boundary where used
}

interface DockLogoProps extends HTMLAttributes<HTMLElement> {
    href?: string;
    children: React.ReactNode;
}

// Internal prop injected via cloneElement
interface InjectedDockProps {
    linkComponent?: ElementType;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Root Dock Component (Server-Safe)
 * Does not use Context or forwardRef.
 */
const Dock = ({ 
    children, 
    className, 
    "aria-label": ariaLabel = "Floating dock",
    ...props 
}: DockBaseProps) => {
    // Note: We wrap children handling in a generic div/nav structure
    return (
        <nav
            aria-label={ariaLabel}
            className={cn(
                "fixed top-3 left-1/2 -translate-x-1/2 z-50",
                className
            )}
            {...props}
        >
            {children}
        </nav>
    );
};

/**
 * Container for Dock Items
 * Handles the glassmorphism background and layout.
 */
const DockContainer = ({
    children,
    className,
    linkComponent: LinkComponent = Link,
    ...props
}: HTMLAttributes<HTMLDivElement> & { linkComponent?: ElementType }) => {
    
    // We clone children to inject the linkComponent prop so we don't need Context
    const renderedChildren = Children.map(children, (child) => {
        if (isValidElement(child)) {
            // Inject linkComponent into DockItem and DockLogo
            return React.cloneElement(child as React.ReactElement<InjectedDockProps>, {
                linkComponent: LinkComponent,
            });
        }
        return child;
    });

    return (
        <div
            className={cn(
                "flex items-center gap-2 px-3 py-3",
                "bg-ground-50/80 dark:bg-ground-950/80 backdrop-blur-xl",
                "border border-ground-200/50 dark:border-ground-800/50",
                "rounded-2xl shadow-2xl shadow-ground-500/10 dark:shadow-ground-950/20",
                className
            )}
            {...props}
        >
            {renderedChildren}
        </div>
    );
};

/**
 * Interactive Item
 */
const DockItem = ({
    icon: Icon,
    label,
    href,
    onClick,
    className,
    linkComponent: LinkComponent = Link,
    ...props
}: DockItemProps & InjectedDockProps) => {

    // Common class logic
    const itemClasses = cn(
        "group relative p-3 rounded-xl cursor-pointer",
        "transition-all duration-300 ease-out",
        // WCAG Focus Indicator (CSS only)
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ground-50 dark:focus-visible:ring-offset-ground-950",
        // Animations (Respects prefers-reduced-motion)
        "motion-safe:hover:scale-110 motion-safe:hover:-translate-y-2",
        "bg-transparent hover:bg-ground-200/50 dark:hover:bg-ground-800/50",
        className
    );

    const content = (
        <>
            {Icon && (
                <Icon
                    className="w-5 h-5 text-ground-600 dark:text-ground-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            )}
        </>
    );

    if (href) {
        return (
            <Tooltip content={label} position="bottom">
                <LinkComponent
                    href={href}
                    className={itemClasses}
                    onClick={onClick}
                    aria-label={label}
                    {...props}
                >
                    {content}
                </LinkComponent>
            </Tooltip>
        );
    }

    return (
        <Tooltip content={label} position="bottom">
            <button
                type="button"
                className={itemClasses}
                onClick={onClick}
                aria-label={label}
                {...props}
            >
                {content}
            </button>
        </Tooltip>
    );
};

/**
 * Logo Item
 */
const DockLogo = ({
    href,
    children,
    className,
    linkComponent: LinkComponent = Link,
    ...props
}: DockLogoProps & InjectedDockProps) => {
    
    const logoClasses = cn(
        "px-4 py-2 text-xl font-bold tracking-wider font-mono",
        "text-ground-900 dark:text-ground-100",
        "hover:text-primary-600 transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg",
        className
    );

    if (href) {
        return (
            <LinkComponent 
                href={href} 
                className={logoClasses} 
                aria-label="Home"
                {...props}
            >
                {children}
            </LinkComponent>
        );
    }

    return (
        <div className={logoClasses} {...props}>
            {children}
        </div>
    );
};

/**
 * Divider
 */
const DockDivider = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            role="separator"
            aria-orientation="vertical"
            className={cn(
                "w-px h-8 mx-1 self-center",
                "bg-ground-200/50 dark:bg-ground-800/50",
                className
            )}
            {...props}
        />
    );
};

// ============================================================================
// Exports
// ============================================================================

const FloatingDock = Object.assign(Dock, {
    Container: DockContainer,
    Item: DockItem,
    Logo: DockLogo,
    Divider: DockDivider,
});

export { FloatingDock };