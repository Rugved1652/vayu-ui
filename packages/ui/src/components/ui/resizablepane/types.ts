// types.ts
// Types

import type { HTMLAttributes } from "react";

export type Direction = "horizontal" | "vertical";

export interface ResizablePaneProps extends HTMLAttributes<HTMLDivElement> {
    direction?: Direction;
    children: React.ReactNode;
}

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    children: React.ReactNode;
}

export interface HandleProps extends HTMLAttributes<HTMLDivElement> {
    step?: number;
}
