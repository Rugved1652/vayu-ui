// Container.tsx
// UI: responsive max-width wrapper

"use client";

import { cn } from "../utils";
import type { NavbarContainerProps } from "./types";

export function NavbarContainer({ maxWidth = "xl", className, children, ...props }: NavbarContainerProps) {
    const maxWidthClasses: Record<string, string> = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "mx-auto flex items-center justify-between px-4 py-3",
                maxWidthClasses[maxWidth],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

NavbarContainer.displayName = "Navbar.Container";
