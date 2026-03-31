// MobileMenuButton.tsx
// UI: hamburger/close button

"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { useSidebar } from "./hooks";

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
