// logo.tsx
// UI: brand logo item

import type { HTMLAttributes, ElementType } from "react";
import Link from "next/link";
import { cn } from "../utils";
import type { DockLogoProps, InjectedDockProps } from "./types";

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

export default DockLogo;
