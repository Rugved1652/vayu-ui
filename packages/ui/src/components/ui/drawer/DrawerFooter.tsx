// footer.tsx
// UI: presentational

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";

const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-4",
                className
            )}
            {...props}
        />
    )
);
DrawerFooter.displayName = "Drawer.Footer";

export { DrawerFooter };
