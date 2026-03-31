// SidebarMenuItem.tsx
// UI: menu item with icon, badge, tooltip, subitems

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useId } from "react";
import { Tooltip } from "../tooltip";
import { useSidebar } from "./hooks";
import type { SidebarMenuItemProps } from "./types";

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
    icon,
    children,
    active = false,
    badge,
    href,
    subItems,
}) => {
    const { collapsed, mobile } = useSidebar();
    const [expanded, setExpanded] = useState(false);
    const hasSubItems = subItems && subItems.length > 0;
    const itemId = useId();
    const submenuId = `submenu-${itemId}`;

    // Menu item content
    const menuItemContent = (
        <>
            {icon && (
                <span
                    className={`${active
                        ? "text-brand-content"
                        : "text-muted-content group-hover:text-surface-content"
                        } transition-colors shrink-0`}
                >
                    {icon}
                </span>
            )}

            {(!collapsed || mobile) && (
                <>
                    <span className="flex-1 text-left text-sm font-medium">
                        {children}
                    </span>
                    {badge && (
                        <span
                            className={`
                                px-2 py-0.5 text-xs font-semibold rounded-full
                                ${active
                                    ? "bg-brand-content/20 text-brand-content"
                                    : "bg-brand/20 text-brand"
                                }
                            `}
                        >
                            {badge}
                        </span>
                    )}
                    {hasSubItems && (
                        <ChevronRight
                            size={16}
                            className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
                        />
                    )}
                </>
            )}
        </>
    );

    // Link without subitems
    const linkElement = !hasSubItems && (
        <Link
            href={href || "#"}
            aria-current={active ? "page" : undefined}
            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-200 group relative
                focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                focus-visible:ring-offset-sidebar
                ${active
                    ? "bg-brand text-brand-content font-semibold"
                    : "text-surface-content hover:bg-muted hover:text-surface-content"
                }
                ${collapsed && !mobile ? "justify-center" : ""}
            `}
        >
            {menuItemContent}
        </Link>
    );

    // Button with subitems
    const buttonElement = hasSubItems && (
        <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={submenuId}
            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-200 group relative font-secondary
                focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                focus-visible:ring-offset-sidebar
                ${active
                    ? "bg-brand text-brand-content"
                    : "text-surface-content hover:bg-muted hover:text-surface-content"
                }
                ${collapsed && !mobile ? "justify-center" : ""}
            `}
        >
            {menuItemContent}
        </button>
    );

    const shouldWrapWithTooltip = collapsed && !mobile;

    return (
        <div>
            {shouldWrapWithTooltip ? (
                <Tooltip content={children} position="right" delay={300}>
                    {linkElement || buttonElement}
                </Tooltip>
            ) : (
                (linkElement || buttonElement)
            )}

            {/* Sub Items */}
            {hasSubItems && expanded && (!collapsed || mobile) && (
                <div
                    id={submenuId}
                    role="region"
                    aria-label={`${children} submenu`}
                    className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-3"
                >
                    {subItems.map((subItem, index) => (
                        <Link
                            href={subItem.href || "#"}
                            key={`${itemId}-${index}`}
                            aria-current={subItem.active ? "page" : undefined}
                            className={`
                                w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-secondary
                                transition-all duration-200
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                                focus-visible:ring-offset-sidebar
                                ${subItem.active
                                    ? "bg-muted text-surface-content font-medium"
                                    : "text-muted-content hover:bg-muted hover:text-surface-content"
                                }
                            `}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
