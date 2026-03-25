import React, { Children, HTMLAttributes, ElementType, ComponentType, isValidElement } from "react";
import Link from "next/link";
import { cn } from "./utils";
import { Tooltip } from "./tooltip";
import { Divider } from "./divider";

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
                "bg-surface/80 backdrop-blur-surface",
                "border border-border/50",
                "rounded-overlay shadow-elevated",
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
const DockItem = (allProps: DockItemProps & InjectedDockProps) => {
    const {
        icon: Icon,
        label,
        href,
        onClick,
        className,
        linkComponent: LinkComponent = Link,
        ...props
    } = allProps;

    // Common class logic
    const itemClasses = cn(
        "group relative p-3 rounded-surface cursor-pointer",
        "transition-all duration-300 ease-out",
        // WCAG Focus Indicator (CSS only)
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        // Animations (Respects prefers-reduced-motion)
        "motion-safe:hover:scale-110 motion-safe:hover:-translate-y-2",
        "bg-transparent hover:bg-muted/50",
        className
    );

    const content = (
        <>
            {Icon && (
                <Icon
                    className="w-5 h-5 text-muted-content group-hover:text-brand transition-colors"
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
const DockLogo = (allProps: DockLogoProps & InjectedDockProps) => {
    const {
        href,
        children,
        className,
        linkComponent: LinkComponent = Link,
        ...props
    } = allProps;
    
    const logoClasses = cn(
        "px-4 py-2 text-xl font-bold tracking-wider font-mono",
        "text-canvas-content",
        "hover:text-brand transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-surface",
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

// ============================================================================
// Exports
// ============================================================================

const FloatingDock = Object.assign(Dock, {
    Container: DockContainer,
    Item: DockItem,
    Logo: DockLogo,
    Divider: Divider,
});

export { FloatingDock };