// rate/description.tsx
// UI: description

"use client";
import React from "react";

import type { RateDescriptionProps } from "./types";

export const RateDescription: React.FC<RateDescriptionProps> = ({
    children,
    className = "",
    id,
}) => {
    return (
        <p
            id={id}
            className={`text-xs font-secondary text-muted-content mb-2 ${className}`}
        >
            {children}
        </p>
    );
};
