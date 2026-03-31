// SidebarFooter.tsx
// UI: presentational

"use client";

import React from "react";
import { useSidebar } from "./hooks";
import type { SidebarFooterProps } from "./types";

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
