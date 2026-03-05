"use client";

import { clsx } from "clsx";
import React, {
    ComponentType,
    ElementType,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useId,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

interface DockItem {
    /** Lucide icon component or any renderable icon. */
    icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
    /**
     * Label — displayed in the tooltip.
     * Use `"divider"` or `"logo"` for special items.
     */
    label: string;
    /** Navigate to this URL. */
    href?: string;
    /** Click handler. */
    onClick?: () => void;
    /** Logo text (only used when `label === "logo"`). */
    logoText?: string;
}

interface FloatingDockProps extends HTMLAttributes<HTMLElement> {
    /** Dock items to render. */
    items: DockItem[];
    /** Accessible label for the `<nav>`. */
    "aria-label"?: string;
    /** Component used for link items (e.g. Next.js `Link`). */
    linkComponent?: ElementType;
}

// ============================================================================
// FloatingDock
// ============================================================================

const FloatingDock = forwardRef<HTMLElement, FloatingDockProps>(
    (
        {
            items,
            className,
            "aria-label": ariaLabel = "Floating dock",
            linkComponent: LinkComponent = "a",
            ...props
        },
        ref
    ) => {
        const baseId = useId();
        const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

        const showTooltip = useCallback(
            (idx: number) => setHoveredIdx(idx),
            []
        );
        const hideTooltip = useCallback(
            () => setHoveredIdx(null),
            []
        );

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                className={clsx(
                    "fixed top-3 left-1/2 -translate-x-1/2 sm:w-auto w-[90%] z-50",
                    className
                )}
                {...props}
            >
                <div className="flex items-center flex-row-reverse gap-2 px-3 py-3 bg-ground-50/80 dark:bg-ground-950/80 backdrop-blur-xl border border-ground-200/50 dark:border-ground-800/50 rounded-2xl shadow-2xl shadow-ground-500/10 dark:shadow-ground-950/20">
                    {items.map((item, idx) => {
                        const tooltipId = `${baseId}-tip-${idx}`;
                        const isHovered = hoveredIdx === idx;

                        // ----- Divider -----
                        if (item.label === "divider") {
                            return (
                                <div
                                    key={`divider-${idx}`}
                                    role="separator"
                                    aria-orientation="vertical"
                                    className="w-px h-8 bg-ground-200/50 dark:bg-ground-800/50 mx-1"
                                />
                            );
                        }

                        // ----- Logo -----
                        if (item.label === "logo") {
                            const logo = (
                                <span className="text-xl font-bold text-ground-900 dark:text-ground-100 tracking-wider drop-shadow-md hover:text-primary-600 transition-colors cursor-pointer font-mono">
                                    {item.logoText ?? "Logo"}
                                </span>
                            );

                            if (item.href) {
                                return (
                                    <LinkComponent
                                        key={`logo-${idx}`}
                                        href={item.href}
                                        className="px-4 py-2"
                                        aria-label={item.logoText ?? "Home"}
                                    >
                                        {logo}
                                    </LinkComponent>
                                );
                            }

                            return (
                                <div
                                    key={`logo-${idx}`}
                                    className="px-4 py-2"
                                >
                                    {logo}
                                </div>
                            );
                        }

                        // ----- Normal item -----
                        const Icon = item.icon;
                        const content = (
                            <>
                                {Icon && (
                                    <Icon
                                        className="w-5 h-5 text-ground-600 dark:text-ground-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                                        strokeWidth={1.5}
                                        aria-hidden="true"
                                    />
                                )}

                                {/* Tooltip */}
                                <span
                                    id={tooltipId}
                                    role="tooltip"
                                    className={clsx(
                                        "absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-ground-900/90 backdrop-blur-lg border border-ground-700/50 rounded-lg text-xs whitespace-nowrap transition-opacity pointer-events-none shadow-lg text-ground-50",
                                        isHovered
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </>
                        );

                        const containerClass =
                            "group relative p-3 hover:bg-ground-200/50 dark:hover:bg-ground-800/50 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer";

                        const a11y = {
                            "aria-describedby":
                                isHovered ? tooltipId : undefined,
                            onMouseEnter: () => showTooltip(idx),
                            onMouseLeave: hideTooltip,
                            onFocus: () => showTooltip(idx),
                            onBlur: hideTooltip,
                        };

                        if (item.href) {
                            return (
                                <LinkComponent
                                    key={`item-${idx}`}
                                    href={item.href}
                                    className={containerClass}
                                    aria-label={item.label}
                                    onClick={item.onClick}
                                    {...a11y}
                                >
                                    {content}
                                </LinkComponent>
                            );
                        }

                        return (
                            <button
                                key={`item-${idx}`}
                                type="button"
                                className={containerClass}
                                aria-label={item.label}
                                onClick={item.onClick}
                                {...a11y}
                            >
                                {content}
                            </button>
                        );
                    })}
                </div>
            </nav>
        );
    }
);

FloatingDock.displayName = "FloatingDock";

// ============================================================================
// Exports
// ============================================================================

export { FloatingDock };
export type { DockItem, FloatingDockProps };
