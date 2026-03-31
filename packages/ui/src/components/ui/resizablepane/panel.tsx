// panel.tsx
// UI: individual resizable panel

"use client";

import { clsx } from "clsx";
import React, { forwardRef, useId, useLayoutEffect, useRef } from "react";
import type { PanelProps } from "./types";
import { useResizablePane } from "./resizablepane";

const ResizablePanePanel = forwardRef<HTMLDivElement, PanelProps>(
    ({ defaultSize = 50, minSize = 10, maxSize = 90, children, className, style, ...props }, ref) => {
        const panelId = useId();
        const { registerPanel, sizes, direction } = useResizablePane();
        const indexRef = useRef<number | null>(null);

        useLayoutEffect(() => {
            if (indexRef.current === null) {
                indexRef.current = registerPanel(panelId, defaultSize, minSize, maxSize);
            }
        }, [panelId, registerPanel, defaultSize, minSize, maxSize]);

        const index = indexRef.current;
        const size = index !== null && index < sizes.length ? sizes[index] : defaultSize;

        return (
            <div
                ref={ref}
                style={{
                    ...style,
                    [direction === "horizontal" ? "width" : "height"]: `${size}%`,
                    flexShrink: 0,
                    flexGrow: 0,
                }}
                className={clsx("overflow-auto", className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
ResizablePanePanel.displayName = "ResizablePane.Panel";

export default ResizablePanePanel;
