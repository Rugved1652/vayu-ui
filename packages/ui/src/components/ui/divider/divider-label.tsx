// divider-label.tsx
// UI: label text rendered between divider lines

import { cn } from "../utils";
import { labelColorMap } from "./types";
import type { DividerLabelProps } from "./types";

const DividerLabel = ({
    color = "default",
    className,
    children,
    ...props
}: DividerLabelProps) => {
    return (
        <span
            className={cn(
                "px-3 py-1 text-sm font-medium whitespace-nowrap font-secondary",
                labelColorMap[color],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default DividerLabel;
