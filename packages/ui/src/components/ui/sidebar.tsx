"use client";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobile: boolean;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebar = () => {
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

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                mobile: false,
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

    return (
        <>
            {/* Mobile Overlay */}
            {mobile && mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 dark:bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
           h-screen bg-white dark:bg-neutral-950
          border-r border-neutral-200 dark:border-neutral-800 z-50 transition-all duration-300 ease-in-out relative
          ${collapsed && !mobile ? "w-20" : "w-72"}
          ${mobile
                        ? mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        : "translate-x-0"
                    }
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
            className={`p-6 border-b border-neutral-200 dark:border-neutral-800 ${collapsed && !mobile ? "px-4" : ""
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
        <div className="flex-1  px-3 py-4 scrollbar-thin overflow-y-auto overflow-x-hidden scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
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
            className={`p-4 border-t border-neutral-200 dark:border-neutral-800 ${collapsed && !mobile ? "px-2" : ""
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
                <h3 className="px-3 mb-2 text-xs font-primary font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    {label}
                </h3>
            )}
            {collapsed && !mobile && label && (
                <div className="h-px bg-neutral-200 dark:bg-neutral-700 mx-3 mb-2" />
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

    return (
        <div>
            {!hasSubItems && (
                <Link
                    href={href || "#"}
                    className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-all duration-200 group relative
          ${active
                            ? "bg-primary-600 text-white dark:text-neutral-50 font-semibold"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                        }
          ${collapsed && !mobile ? "justify-center" : ""}
        `}
                >
                    {icon && (
                        <span
                            className={`${active
                                    ? "text-white dark:text-neutral-50"
                                    : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
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
                                            ? "bg-white/20 dark:bg-white/20 text-white"
                                            : "bg-primary-500/20 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400"
                                        }
              `}
                                >
                                    {badge}
                                </span>
                            )}
                            {hasSubItems && (
                                <ChevronRight
                                    size={16}
                                    className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""
                                        }`}
                                />
                            )}
                        </>
                    )}

                    {collapsed && !mobile && (
                        <div
                            className="absolute left-full ml-2 px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm rounded-md
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-neutral-200 dark:border-neutral-800"
                        >
                            {children}
                        </div>
                    )}
                </Link>
            )}
            {hasSubItems && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-all duration-200 group relative font-secondary
          ${active
                            ? "bg-primary-600 text-white dark:text-white "
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                        }
          ${collapsed && !mobile ? "justify-center" : ""}
        `}
                >
                    {icon && (
                        <span
                            className={`${active
                                    ? "text-white dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
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
                                            ? "bg-white/20 dark:bg-white/20 text-white"
                                            : "bg-primary-500/20 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400"
                                        }
              `}
                                >
                                    {badge}
                                </span>
                            )}
                            {hasSubItems && (
                                <ChevronRight
                                    size={16}
                                    className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""
                                        }`}
                                />
                            )}
                        </>
                    )}

                    {collapsed && !mobile && (
                        <div
                            className="absolute left-full ml-2 px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm rounded-md
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-neutral-200 dark:border-neutral-800"
                        >
                            {children}
                        </div>
                    )}
                </button>
            )}
            {/* Sub Items */}
            {hasSubItems && expanded && (!collapsed || mobile) && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-neutral-200 dark:border-neutral-800/50 pl-3">
                    {subItems.map((subItem, index) => (
                        <Link
                            href={subItem.href || "#"}
                            key={index}
                            className={`
                w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-secondary
                transition-all duration-200
                ${subItem.active
                                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 font-medium"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
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
            style={{
                top: "50px",
                right: "-38px",
                transform: "translateX(-50%) translateY(0)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "white",
            }}
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-10 -right-3  -translate-x-1/2 translate-y-0 w-6 h-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-full
                 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700
                 transition-all duration-200 shadow-lg z-10"
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
            className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white border border-neutral-200 dark:border-transparent
                 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-lg md:hidden"
        >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );
};
