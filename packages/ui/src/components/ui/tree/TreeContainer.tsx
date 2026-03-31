// tree-container.tsx
// UI: container wrapper

"use client";

import { clsx } from "clsx";
import { Filter } from "lucide-react";
import React from "react";

import type { TreeContainerProps } from "./types";

const TreeContainer: React.FC<TreeContainerProps> = ({
    children,
    empty,
    className,
}) => (
    <div
        className={clsx(
            "bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden",
            className
        )}
    >
        {children || empty || (
            <div className="p-8 text-center" role="status">
                <Filter
                    className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mx-auto mb-2"
                    aria-hidden="true"
                />
                <p className="text-neutral-500 dark:text-neutral-400 font-secondary text-sm">
                    No data
                </p>
            </div>
        )}
    </div>
);

TreeContainer.displayName = "Tree.Container";

export default TreeContainer;
