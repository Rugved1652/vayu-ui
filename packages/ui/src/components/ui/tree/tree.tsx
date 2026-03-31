// tree.tsx
// Composition: TreeRoot (state, context provider), TreeNodes

"use client";

import { clsx } from "clsx";
import React, { ReactNode, useCallback, useId, useMemo, useState } from "react";

import { TreeContext } from "./context";
import TreeNodeItem from "./tree-node";
import TreeSearch from "./tree-search";
import TreeActions from "./tree-actions";
import TreeContainer from "./tree-container";
import type {
    CheckboxState,
    TreeNode,
    TreeRootProps,
    TreeNodesProps,
} from "./types";

// Utilities

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

// TreeRoot

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

    const contextValue = useMemo(
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

TreeRoot.displayName = "Tree";

// TreeNodes

const TreeNodes: React.FC<TreeNodesProps> = ({ nodes }) => (
    <>
        {nodes.map((node) => (
            <TreeNodeItem key={node.id} node={node} />
        ))}
    </>
);

TreeNodes.displayName = "Tree.Nodes";

// Compound assembly

const Tree = Object.assign(TreeRoot, {
    Search: TreeSearch,
    Actions: TreeActions,
    Container: TreeContainer,
    Nodes: TreeNodes,
    Node: TreeNodeItem,
});

export default Tree;
