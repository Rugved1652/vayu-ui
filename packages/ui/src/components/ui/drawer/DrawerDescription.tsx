// description.tsx
// UI: presentational

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";
import { useDrawer } from "./Drawer";

const DrawerDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        const { descriptionId } = useDrawer();
        return (
            <p
                id={descriptionId}
                ref={ref}
                className={cn("text-sm text-muted-content", className)}
                {...props}
            />
        );
    }
);
DrawerDescription.displayName = "Drawer.Description";

export { DrawerDescription };
