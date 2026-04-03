// utils.ts
// Tree traversal utilities

import type { TreeNode } from './types';

/** Collect every node id in the tree (depth-first). */
export function getAllNodeIds(nodes: TreeNode[]): (string | number)[] {
  const ids: (string | number)[] = [];
  const walk = (node: TreeNode) => {
    ids.push(node.id);
    node.children?.forEach(walk);
  };
  nodes.forEach(walk);
  return ids;
}

/** Return the chain of ancestor ids for a given node (root → immediate parent). */
export function getParentIds(
  nodeId: string | number,
  nodes: TreeNode[],
): (string | number)[] {
  const parents: (string | number)[] = [];

  const find = (
    target: string | number,
    list: TreeNode[],
    parentId?: string | number,
  ): boolean => {
    for (const node of list) {
      if (node.id === target) {
        if (parentId !== undefined) parents.push(parentId);
        return true;
      }
      if (node.children && find(target, node.children, node.id)) {
        if (parentId !== undefined) parents.push(parentId);
        return true;
      }
    }
    return false;
  };

  find(nodeId, nodes);
  return parents.reverse();
}

/** Return the node itself + all descendant ids. */
export function getChildIds(node: TreeNode): (string | number)[] {
  const ids: (string | number)[] = [node.id];
  node.children?.forEach((child) => ids.push(...getChildIds(child)));
  return ids;
}

/** Find a node by id anywhere in the tree. */
export function findNodeInTree(
  nodeId: string | number,
  nodes: TreeNode[],
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

/**
 * Flatten the tree respecting expanded state.
 * Returns ids in visual/DOM order for keyboard navigation.
 */
export function getVisibleNodeIds(
  nodes: TreeNode[],
  expandedKeys: Set<string | number>,
): (string | number)[] {
  const ids: (string | number)[] = [];

  const walk = (list: TreeNode[]) => {
    for (const node of list) {
      ids.push(node.id);
      if (node.children?.length && expandedKeys.has(node.id)) {
        walk(node.children);
      }
    }
  };

  walk(nodes);
  return ids;
}
