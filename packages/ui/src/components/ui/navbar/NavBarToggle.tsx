// Toggle.tsx
// UI: mobile hamburger/X button

"use client";

import { cn } from "../utils";
import { useNavbar } from "./NavBar";
import type { NavbarToggleProps } from "./types";

export function NavbarToggle({ className, ...props }: NavbarToggleProps) {
    const { mobileOpen, setMobileOpen, menuId, triggerId } = useNavbar();

    return (
        <button
            id={triggerId}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className={cn(
                "md:hidden relative flex items-center justify-center w-10 h-10 rounded-control transition-colors",
                "text-muted-content hover:text-surface-content hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                className
            )}
            {...props}
        >
            <span className="flex flex-col items-center justify-center w-5 h-5">
                <span
                    className={cn(
                        "block h-0.5 w-5 bg-current transition-all rounded-full",
                        mobileOpen ? "rotate-45 translate-y-0.75" : "-translate-y-1"
                    )}
                />
                <span
                    className={cn(
                        "block h-0.5 w-5 bg-current transition-all rounded-full my-0.5",
                        mobileOpen ? "opacity-0" : "opacity-100"
                    )}
                />
                <span
                    className={cn(
                        "block h-0.5 w-5 bg-current transition-all rounded-full",
                        mobileOpen ? "-rotate-45 -translate-y-0.75" : "translate-y-1"
                    )}
                />
            </span>
        </button>
    );
}

NavbarToggle.displayName = "Navbar.Toggle";
