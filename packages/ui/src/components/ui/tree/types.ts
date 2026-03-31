// types.ts
// Types

import { ReactNode } from "react";

export type TreeMode = "normal" | "checkbox";
export type TreeVariant = "default" | "filled" | "bordered" | "minimal";
export type TreeSize = "sm" | "md" | "lg";
export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export interface TreeNode {
    id: string | number;
    label: string;
    icon?: ReactNode;
    children?: TreeNode[];
    disabled?: boolean;
    selectable?: boolean;
    metadata?: Record<string, unknown>;
}

export interface TreeContextType {
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

export interface TreeRootProps {
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

export interface TreeSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export interface TreeActionsProps {
    onExpandAll: () => void;
    onCollapseAll: () => void;
    className?: string;
}

export interface TreeContainerProps {
    children: ReactNode;
    empty?: ReactNode;
    className?: string;
}

export interface TreeNodeItemProps {
    node: TreeNode;
    level?: number;
}

export interface TreeNodesProps {
    nodes: TreeNode[];
}
