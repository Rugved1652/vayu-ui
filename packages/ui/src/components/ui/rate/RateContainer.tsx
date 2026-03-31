// rate/container.tsx
// UI: layout container

"use client";
import React from "react";

import type { RateContainerProps } from "./types";

export const RateContainer: React.FC<RateContainerProps> = ({
    children,
    className = "",
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>{children}</div>
    );
};
