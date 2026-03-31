// tree-actions.tsx
// UI: toolbar actions

"use client";

import { clsx } from "clsx";
import { Minus, Plus } from "lucide-react";
import React from "react";

import type { TreeActionsProps } from "./types";

const TreeActions: React.FC<TreeActionsProps> = ({
    onExpandAll,
    onCollapseAll,
    className,
}) => (
    <div className={clsx("flex items-center gap-2", className)} role="toolbar" aria-label="Tree actions">
        <button
            onClick={onExpandAll}
            className="px-3 py-1.5 text-xs font-secondary font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md transition-colors flex items-center gap-1"
            aria-label="Expand all nodes"
        >
            <Plus className="w-3 h-3" aria-hidden="true" />
            Expand All
        </button>
        <button
            onClick={onCollapseAll}
            className="px-3 py-1.5 text-xs font-secondary font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md transition-colors flex items-center gap-1"
            aria-label="Collapse all nodes"
        >
            <Minus className="w-3 h-3" aria-hidden="true" />
            Collapse All
        </button>
    </div>
);

TreeActions.displayName = "Tree.Actions";

export default TreeActions;
