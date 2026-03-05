"use client";

import { clsx } from "clsx";
import {
    Check,
    ChevronDown,
    ChevronRight,
    File,
    Filter,
    Folder,
    FolderOpen,
    Minus,
    Plus,
    Search,
    X,
} from "lucide-react";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useId,
    useMemo,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type TreeMode = "normal" | "checkbox";
type TreeVariant = "default" | "filled" | "bordered" | "minimal";
type TreeSize = "sm" | "md" | "lg";
type CheckboxState = "checked" | "unchecked" | "indeterminate";

interface TreeNode {
    id: string | number;
    label: string;
    icon?: ReactNode;
    children?: TreeNode[];
    disabled?: boolean;
    selectable?: boolean;
    metadata?: Record<string, unknown>;
}

// ============================================================================
// Context
// ============================================================================

interface TreeContextType {
    mode: TreeMode;
    variant: TreeVariant;
    size: TreeSize;
    showLines: boolean;
    showIcons: boolean;
    data: TreeNode[];
    expandedKeys: (string | number)[];
    selectedKey: string | number | null;
    checkedKeys: (string | number)[];
    disabled: boolean;
    toggleExpand: (nodeId: string | number) => void;
    handleSelect: (node: TreeNode) => void;
    handleCheck: (node: TreeNode, checked: boolean) => void;
    getCheckboxState: (node: TreeNode) => CheckboxState;
    renderActions?: (node: TreeNode) => ReactNode;
    checkStrictly: boolean;
    treeId: string;
}

const TreeContext = createContext<TreeContextType | null>(null);

const useTree = () => {
    const ctx = useContext(TreeContext);
    if (!ctx) throw new Error("Tree compound components must be used within <Tree>");
    return ctx;
};

// ============================================================================
// Size & Variant Config
// ============================================================================

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

// ============================================================================
// Utility Functions
// ============================================================================

function getAllNodeIds(nodes: TreeNode[]): (string | number)[] {
    const ids: (string | number)[] = [];
    const traverse = (node: TreeNode) => {
        ids.push(node.id);
        node.children?.forEach(traverse);
    };
    nodes.forEach(traverse);
    return ids;
}

function getParentIds(
    nodeId: string | number,
    nodes: TreeNode[]
): (string | number)[] {
    const parents: (string | number)[] = [];

    const findParent = (
        targetId: string | number,
        currentNodes: TreeNode[],
        parentId?: string | number
    ): boolean => {
        for (const node of currentNodes) {
            if (node.id === targetId) {
                if (parentId !== undefined) parents.push(parentId);
                return true;
            }
            if (node.children && findParent(targetId, node.children, node.id)) {
                if (parentId !== undefined) parents.push(parentId);
                return true;
            }
        }
        return false;
    };

    findParent(nodeId, nodes);
    return parents.reverse();
}

function getChildIds(node: TreeNode): (string | number)[] {
    const ids: (string | number)[] = [node.id];
    node.children?.forEach((child) => ids.push(...getChildIds(child)));
    return ids;
}

function findNodeInTree(
    nodeId: string | number,
    nodes: TreeNode[]
): TreeNode | null {
    for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
            const found = findNodeInTree(nodeId, node.children);
            if (found) return found;
        }
    }
    return null;
}

// ============================================================================
// Tree Root
// ============================================================================

interface TreeRootProps {
    children: ReactNode;
    data: TreeNode[];
    mode?: TreeMode;
    variant?: TreeVariant;
    size?: TreeSize;
    showLines?: boolean;
    showIcons?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: (string | number)[];
    expandedKeys?: (string | number)[];
    onExpandedChange?: (keys: (string | number)[]) => void;
    selectedKey?: string | number | null;
    onSelect?: (key: string | number | null, node: TreeNode | null) => void;
    defaultSelectedKey?: string | number;
    checkedKeys?: (string | number)[];
    onCheck?: (keys: (string | number)[], checkedNodes: TreeNode[]) => void;
    defaultCheckedKeys?: (string | number)[];
    checkStrictly?: boolean;
    disabled?: boolean;
    onNodeClick?: (node: TreeNode) => void;
    renderActions?: (node: TreeNode) => ReactNode;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
}

const TreeRoot: React.FC<TreeRootProps> = ({
    children,
    data,
    mode = "normal",
    variant = "default",
    size = "md",
    showLines = true,
    showIcons = true,
    defaultExpandAll = false,
    defaultExpandedKeys = [],
    expandedKeys: controlledExpandedKeys,
    onExpandedChange,
    selectedKey: controlledSelectedKey,
    onSelect,
    defaultSelectedKey,
    checkedKeys: controlledCheckedKeys,
    onCheck,
    defaultCheckedKeys = [],
    checkStrictly = false,
    disabled = false,
    onNodeClick,
    renderActions,
    className,
    "aria-label": ariaLabel = "Tree",
    "aria-labelledby": ariaLabelledby,
}) => {
    const treeId = useId();

    const [internalExpandedKeys, setInternalExpandedKeys] = useState<
        (string | number)[]
    >(() => (defaultExpandAll ? getAllNodeIds(data) : defaultExpandedKeys));

    const [internalSelectedKey, setInternalSelectedKey] = useState<
        string | number | null
    >(defaultSelectedKey ?? null);

    const [internalCheckedKeys, setInternalCheckedKeys] = useState<
        (string | number)[]
    >(defaultCheckedKeys);

    const expandedKeys =
        controlledExpandedKeys ?? internalExpandedKeys;
    const selectedKey =
        mode === "normal"
            ? (controlledSelectedKey ?? internalSelectedKey)
            : null;
    const checkedKeys =
        mode === "checkbox"
            ? (controlledCheckedKeys ?? internalCheckedKeys)
            : [];

    const toggleExpand = useCallback(
        (nodeId: string | number) => {
            const next = expandedKeys.includes(nodeId)
                ? expandedKeys.filter((k) => k !== nodeId)
                : [...expandedKeys, nodeId];

            if (controlledExpandedKeys === undefined)
                setInternalExpandedKeys(next);
            onExpandedChange?.(next);
        },
        [expandedKeys, controlledExpandedKeys, onExpandedChange]
    );

    const handleSelect = useCallback(
        (node: TreeNode) => {
            if (mode !== "normal") return;
            if (node.disabled || node.selectable === false) return;

            const next = selectedKey === node.id ? null : node.id;

            if (controlledSelectedKey === undefined)
                setInternalSelectedKey(next);
            onSelect?.(next, next ? node : null);
            onNodeClick?.(node);
        },
        [mode, selectedKey, controlledSelectedKey, onSelect, onNodeClick]
    );

    const handleCheck = useCallback(
        (node: TreeNode, checked: boolean) => {
            if (mode !== "checkbox" || node.disabled) return;

            let next = [...checkedKeys];

            if (checkStrictly) {
                next = checked
                    ? [...next, node.id]
                    : next.filter((k) => k !== node.id);
            } else {
                const childIds = getChildIds(node);

                if (checked) {
                    next = [...new Set([...next, ...childIds])];
                } else {
                    next = next.filter((k) => !childIds.includes(k));
                }

                // Cascade parent state
                getParentIds(node.id, data).forEach((parentId) => {
                    const parent = findNodeInTree(parentId, data);
                    if (parent?.children) {
                        const allChecked = parent.children.every((c) =>
                            next.includes(c.id)
                        );
                        if (allChecked) {
                            if (!next.includes(parentId)) next.push(parentId);
                        } else {
                            next = next.filter((k) => k !== parentId);
                        }
                    }
                });
            }

            if (controlledCheckedKeys === undefined)
                setInternalCheckedKeys(next);

            const checkedNodes = next
                .map((k) => findNodeInTree(k, data))
                .filter(Boolean) as TreeNode[];
            onCheck?.(next, checkedNodes);
        },
        [mode, checkedKeys, checkStrictly, data, controlledCheckedKeys, onCheck]
    );

    const getCheckboxState = useCallback(
        (node: TreeNode): CheckboxState => {
            if (checkedKeys.includes(node.id)) return "checked";
            if (!node.children?.length) return "unchecked";

            const childIds = getChildIds(node).filter((id) => id !== node.id);
            const checkedCount = childIds.filter((id) =>
                checkedKeys.includes(id)
            ).length;

            if (checkedCount === 0) return "unchecked";
            if (checkedCount === childIds.length) return "checked";
            return "indeterminate";
        },
        [checkedKeys]
    );

    const contextValue = useMemo<TreeContextType>(
        () => ({
            mode,
            variant,
            size,
            showLines,
            showIcons,
            data,
            expandedKeys,
            selectedKey,
            checkedKeys,
            disabled,
            toggleExpand,
            handleSelect,
            handleCheck,
            getCheckboxState,
            renderActions,
            checkStrictly,
            treeId,
        }),
        [
            mode,
            variant,
            size,
            showLines,
            showIcons,
            data,
            expandedKeys,
            selectedKey,
            checkedKeys,
            disabled,
            toggleExpand,
            handleSelect,
            handleCheck,
            getCheckboxState,
            renderActions,
            checkStrictly,
            treeId,
        ]
    );

    return (
        <TreeContext.Provider value={contextValue}>
            <div
                className={clsx("w-full", className)}
                role="tree"
                aria-label={ariaLabelledby ? undefined : ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-multiselectable={mode === "checkbox" || undefined}
            >
                {children}
            </div>
        </TreeContext.Provider>
    );
};

// ============================================================================
// Tree Search
// ============================================================================

interface TreeSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    placeholder?: string;
    className?: string;
}

const TreeSearch: React.FC<TreeSearchProps> = ({
    searchQuery,
    onSearchChange,
    placeholder = "Search tree…",
    className,
}) => {
    const searchId = useId();

    const handleClear = useCallback(() => {
        onSearchChange("");
    }, [onSearchChange]);

    return (
        <div className={clsx("relative", className)}>
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                aria-hidden="true"
            />
            <input
                id={searchId}
                type="text"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-secondary text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="Search tree"
            />
            {searchQuery && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    aria-label="Clear search"
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </div>
    );
};

// ============================================================================
// Tree Actions
// ============================================================================

interface TreeActionsProps {
    onExpandAll: () => void;
    onCollapseAll: () => void;
    className?: string;
}

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

// ============================================================================
// Tree Container
// ============================================================================

interface TreeContainerProps {
    children: ReactNode;
    empty?: ReactNode;
    className?: string;
}

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

// ============================================================================
// Tree Node Item
// ============================================================================

interface TreeNodeItemProps {
    node: TreeNode;
    level?: number;
}

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

    // Checkbox renderer
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

    // Node icon renderer
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

// ============================================================================
// Tree Nodes (renders all root nodes)
// ============================================================================

interface TreeNodesProps {
    nodes: TreeNode[];
}

const TreeNodes: React.FC<TreeNodesProps> = ({ nodes }) => (
    <>
        {nodes.map((node) => (
            <TreeNodeItem key={node.id} node={node} />
        ))}
    </>
);

// ============================================================================
// Compound Export
// ============================================================================

const Tree = Object.assign(TreeRoot, {
    Search: TreeSearch,
    Actions: TreeActions,
    Container: TreeContainer,
    Nodes: TreeNodes,
    Node: TreeNodeItem,
});

export { Tree, useTree };
export type {
    CheckboxState,
    TreeActionsProps,
    TreeContainerProps,
    TreeMode,
    TreeNode,
    TreeNodeItemProps,
    TreeNodesProps,
    TreeRootProps,
    TreeSearchProps,
    TreeSize,
    TreeVariant,
};
