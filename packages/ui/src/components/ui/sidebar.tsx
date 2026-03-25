"use client";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { createContext, useContext, useState, useEffect, useRef, useId } from "react";
import { Tooltip } from "./tooltip";

interface SidebarContextType {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobile: boolean;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar components must be used within SidebarProvider");
    }
    return context;
};

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
    children,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobile, setMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth < 768;
            setMobile(isMobile);
            // Close mobile menu if screen becomes larger
            if (!isMobile && mobileOpen) {
                setMobileOpen(false);
            }
        };

        // Check on mount
        checkMobile();

        // Add resize listener
        window.addEventListener("resize", checkMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkMobile);
    }, [mobileOpen]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && mobileOpen) {
                setMobileOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [mobileOpen]);

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                mobile,
                mobileOpen,
                setMobileOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { collapsed, mobile, mobileOpen, setMobileOpen } = useSidebar();
    const sidebarRef = useRef<HTMLElement>(null);

    // Focus trap for mobile menu
    useEffect(() => {
        if (mobile && mobileOpen && sidebarRef.current) {
            // Focus the sidebar when it opens
            sidebarRef.current.focus();

            // Trap focus within sidebar
            const focusableElements = sidebarRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === "Tab") {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            };

            document.addEventListener("keydown", handleTabKey);
            return () => document.removeEventListener("keydown", handleTabKey);
        }
    }, [mobile, mobileOpen]);

    return (
        <>
            {/* Mobile Overlay */}
            {mobile && mobileOpen && (
                <div
                    role="presentation"
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/50 dark:bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                id="sidebar-navigation"
                aria-label="Main navigation"
                tabIndex={mobile ? -1 : undefined}
                className={`
                    bg-sidebar
                    border-r border-border z-50 transition-all duration-300 ease-in-out
                    ${mobile ? "absolute inset-y-0 left-0 h-full" : "h-screen relative"}
                    ${collapsed && !mobile ? "w-20" : "w-72"}
                    ${mobile
                        ? mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        : "translate-x-0"
                    }
                    focus:outline-none
                `}
            >
                <div className="flex flex-col h-full ">{children}</div>
            </aside>
        </>
    );
};

interface SidebarHeaderProps {
    children: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children }) => {
    const { collapsed, mobile } = useSidebar();

    return (
        <div
            className={`p-6 border-b border-border ${collapsed && !mobile ? "px-4 overflow-hidden" : ""
                }`}
        >
            {children}
        </div>
    );
};

interface SidebarContentProps {
    children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
    return (
        <div className="flex-1 px-3 py-4 scrollbar-thin overflow-y-auto overflow-x-hidden scrollbar-thumb-muted-content/30 scrollbar-track-transparent">
            {children}
        </div>
    );
};

interface SidebarFooterProps {
    children: React.ReactNode;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children }) => {
    const { collapsed, mobile } = useSidebar();

    return (
        <div
            className={`p-4 border-t border-border ${collapsed && !mobile ? "px-2" : ""
                }`}
        >
            {children}
        </div>
    );
};

interface SidebarMenuProps {
    children: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
    return <nav className="space-y-1">{children}</nav>;
};

interface SidebarMenuGroupProps {
    label?: string;
    children: React.ReactNode;
}

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
    label,
    children,
}) => {
    const { collapsed, mobile } = useSidebar();

    return (
        <div className="mb-6">
            {label && !collapsed && (
                <h3 className="px-3 mb-2 text-xs font-primary font-semibold text-muted-content uppercase tracking-wider">
                    {label}
                </h3>
            )}
            {collapsed && !mobile && label && (
                <div className="h-px bg-border mx-3 mb-2" />
            )}
            <div className="space-y-1">{children}</div>
        </div>
    );
};

interface SidebarMenuItemProps {
    icon?: React.ReactNode;
    children: React.ReactNode;
    active?: boolean;
    badge?: string | number;
    href?: string;
    subItems?: Array<{
        label: string;
        active?: boolean;
        href?: string;
    }>;
}

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

    // Menu item content to render
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

    // Wrap with Tooltip when collapsed and not on mobile
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

export const SidebarToggle: React.FC = () => {
    const { collapsed, setCollapsed, mobile } = useSidebar();

    if (mobile) {
        return null;
    }

    return (
        <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}
            aria-expanded={!collapsed}
            className="absolute top-10 -right-6 -translate-x-1/2 translate-y-0 w-6 h-6 bg-surface border border-border rounded-full
                flex items-center justify-center text-muted-content hover:text-surface-content hover:bg-muted
                transition-all duration-200 shadow-lg z-10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
        >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
    );
};

export const MobileMenuButton: React.FC = () => {
    const { mobile, mobileOpen, setMobileOpen } = useSidebar();

    if (!mobile) {
        return null;
    }

    return (
        <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="sidebar-navigation"
            className="fixed top-4 left-4 z-60 p-2 bg-surface rounded-lg text-surface-content border border-border
                hover:bg-muted transition-colors shadow-lg
                focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );
};
