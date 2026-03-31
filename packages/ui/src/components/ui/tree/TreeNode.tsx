// tree-node.tsx
// UI: recursive node renderer

"use client";

import { clsx } from "clsx";
import {
    Check,
    ChevronDown,
    ChevronRight,
    File,
    Folder,
    FolderOpen,
    Minus,
} from "lucide-react";
import React, { useCallback } from "react";

import { useTree } from "./hooks";
import type { TreeNode } from "./types";

// Config

const sizeConfig = {
    sm: {
        text: "text-xs",
        icon: "w-3 h-3",
        indent: 16,
        padding: "py-1 px-2",
        checkbox: "w-3 h-3",
    },
    md: {
        text: "text-sm",
        icon: "w-4 h-4",
        indent: 24,
        padding: "py-2 px-3",
        checkbox: "w-4 h-4",
    },
    lg: {
        text: "text-base",
        icon: "w-5 h-5",
        indent: 32,
        padding: "py-2.5 px-4",
        checkbox: "w-5 h-5",
    },
} as const;

const variantStyles = {
    default: {
        node: "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md",
        selected:
            "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
        line: "border-l-2 border-neutral-200 dark:border-neutral-800",
    },
    filled: {
        node: "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md",
        selected:
            "bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 border-l-4 border-primary-600 dark:border-primary-400",
        line: "border-l-2 border-neutral-300 dark:border-neutral-700",
    },
    bordered: {
        node: "border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 rounded-md",
        selected:
            "border-2 border-primary-500 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300",
        line: "border-l-2 border-neutral-200 dark:border-neutral-800",
    },
    minimal: {
        node: "hover:bg-neutral-50 dark:hover:bg-neutral-900",
        selected: "text-primary-600 dark:text-primary-400 font-semibold",
        line: "border-l border-neutral-300 dark:border-neutral-700",
    },
} as const;

// Component

import type { TreeNodeItemProps } from "./types";

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, level = 0 }) => {
    const {
        mode,
        variant,
        size,
        showLines,
        showIcons,
        expandedKeys,
        selectedKey,
        toggleExpand,
        handleSelect,
        handleCheck,
        getCheckboxState,
        renderActions,
    } = useTree();

    const config = sizeConfig[size];
    const styles = variantStyles[variant];

    const isExpanded = expandedKeys.includes(node.id);
    const isSelected = mode === "normal" && selectedKey === node.id;
    const hasChildren = Boolean(node.children?.length);
    const checkState = mode === "checkbox" ? getCheckboxState(node) : "unchecked";

    const handleNodeClick = useCallback(() => {
        if (mode === "normal") handleSelect(node);
        if (hasChildren) toggleExpand(node.id);
    }, [mode, handleSelect, node, hasChildren, toggleExpand]);

    const handleCheckboxClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            handleCheck(node, checkState !== "checked");
        },
        [handleCheck, node, checkState]
    );

    const handleCheckboxKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                handleCheck(node, checkState !== "checked");
            }
        },
        [handleCheck, node, checkState]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (mode === "normal") {
                    handleSelect(node);
                } else if (mode === "checkbox") {
                    handleCheck(node, checkState !== "checked");
                }
            }
            if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
                e.preventDefault();
                toggleExpand(node.id);
            }
            if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
                e.preventDefault();
                toggleExpand(node.id);
            }
        },
        [mode, handleSelect, handleCheck, node, checkState, hasChildren, isExpanded, toggleExpand]
    );

    const handleChevronClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            toggleExpand(node.id);
        },
        [toggleExpand, node.id]
    );

    // Checkbox

    const renderCheckbox = () => {
        if (mode !== "checkbox") return null;

        return (
            <div
                onClick={handleCheckboxClick}
                onKeyDown={handleCheckboxKeyDown}
                className={clsx(
                    config.checkbox,
                    "shrink-0 rounded border-2 flex items-center justify-center transition-all duration-200",
                    node.disabled
                        ? "opacity-50 cursor-not-allowed border-neutral-300 dark:border-neutral-700"
                        : checkState === "checked" || checkState === "indeterminate"
                            ? "bg-primary-600 dark:bg-primary-500 border-primary-600 dark:border-primary-500 cursor-pointer"
                            : "border-neutral-300 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-600 cursor-pointer"
                )}
                role="checkbox"
                aria-checked={
                    checkState === "indeterminate"
                        ? "mixed"
                        : checkState === "checked"
                }
                aria-label={`${checkState === "checked" ? "Uncheck" : "Check"} ${node.label}`}
                tabIndex={0}
            >
                {checkState === "checked" && (
                    <Check className="w-full h-full text-white p-0.5" aria-hidden="true" />
                )}
                {checkState === "indeterminate" && (
                    <Minus className="w-full h-full text-white p-0.5" aria-hidden="true" />
                )}
            </div>
        );
    };

    // Icon

    const renderNodeIcon = () => {
        if (!showIcons) return null;

        if (node.icon) {
            return (
                <span className={config.icon} aria-hidden="true">
                    {node.icon}
                </span>
            );
        }

        if (hasChildren) {
            return isExpanded ? (
                <FolderOpen
                    className={clsx(config.icon, "text-warning-500 dark:text-warning-400")}
                    aria-hidden="true"
                />
            ) : (
                <Folder
                    className={clsx(config.icon, "text-warning-500 dark:text-warning-400")}
                    aria-hidden="true"
                />
            );
        }

        return (
            <File
                className={clsx(config.icon, "text-neutral-500 dark:text-neutral-400")}
                aria-hidden="true"
            />
        );
    };

    return (
        <div role="none">
            <div
                className={clsx(
                    config.padding,
                    styles.node,
                    "flex items-center gap-2 transition-all duration-200 font-secondary relative group",
                    config.text,
                    isSelected
                        ? styles.selected
                        : "text-neutral-900 dark:text-white",
                    node.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                )}
                style={{ paddingLeft: `${level * config.indent + 12}px` }}
                onClick={handleNodeClick}
                role="treeitem"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-selected={mode === "normal" ? isSelected : undefined}
                aria-disabled={node.disabled || undefined}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                {/* Connecting line */}
                {showLines && level > 0 && (
                    <div
                        className={clsx("absolute top-0 bottom-0", styles.line)}
                        style={{ left: `${(level - 1) * config.indent + 12}px` }}
                        aria-hidden="true"
                    />
                )}

                {/* Expand / collapse chevron */}
                {hasChildren ? (
                    <div
                        onClick={handleChevronClick}
                        className="shrink-0"
                        aria-hidden="true"
                    >
                        {isExpanded ? (
                            <ChevronDown
                                className={clsx(config.icon, "text-neutral-600 dark:text-neutral-400")}
                            />
                        ) : (
                            <ChevronRight
                                className={clsx(config.icon, "text-neutral-600 dark:text-neutral-400")}
                            />
                        )}
                    </div>
                ) : (
                    <div className={clsx(config.icon, "shrink-0")} aria-hidden="true" />
                )}

                {renderCheckbox()}
                {renderNodeIcon()}

                <span className="flex-1 truncate">{node.label}</span>

                {renderActions && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        {renderActions(node)}
                    </div>
                )}
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div role="group" aria-label={`${node.label} children`}>
                    {node.children!.map((child) => (
                        <TreeNodeItem key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

TreeNodeItem.displayName = "Tree.Node";

export default TreeNodeItem;
