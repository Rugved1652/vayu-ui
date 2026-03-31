// group.tsx
// UI: presentational group wrapper

import { forwardRef } from "react";
import { clsx } from "clsx";
import type { OTPInputGroupProps } from "./types";

const OTPInputGroup = forwardRef<HTMLDivElement, OTPInputGroupProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            role="presentation"
            className={clsx("flex items-center", className)}
            {...props}
        >
            {children}
        </div>
    )
);
OTPInputGroup.displayName = "OTPInput.Group";

export { OTPInputGroup };
