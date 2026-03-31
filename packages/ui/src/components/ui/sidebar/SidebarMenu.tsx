// SidebarMenu.tsx
// UI: presentational

"use client";

import React from "react";
import { useSidebar } from "./hooks";
import type { SidebarMenuProps, SidebarMenuGroupProps } from "./types";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
    return <nav className="space-y-1">{children}</nav>;
};

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
