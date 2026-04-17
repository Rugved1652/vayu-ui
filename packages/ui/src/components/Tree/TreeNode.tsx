// TreeNode.tsx
// Recursive node renderer with keyboard navigation, checkbox, and selection

'use client';

import { clsx } from 'clsx';
import {
  Check,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Minus,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useTree } from './hooks';
import type { CheckboxState, TreeNode as TNode, TreeNodeItemProps } from './types';

// ---------------------------------------------------------------------------
// Size & variant config
// ---------------------------------------------------------------------------

const sizeConfig = {
  sm: {
    text: 'text-xs',
    icon: 'w-3 h-3',
    indent: 16,
    padding: 'py-1 px-2',
    checkbox: 'w-3 h-3',
  },
  md: {
    text: 'text-sm',
    icon: 'w-4 h-4',
    indent: 24,
    padding: 'py-2 px-3',
    checkbox: 'w-4 h-4',
  },
  lg: {
    text: 'text-base',
    icon: 'w-5 h-5',
    indent: 32,
    padding: 'py-2.5 px-4',
    checkbox: 'w-5 h-5',
  },
} as const;

const variantStyles = {
  default: {
    node: 'hover:bg-muted rounded-md',
    selected: 'bg-brand/10 text-brand',
    line: 'border-l-2 border-border',
  },
  filled: {
    node: 'hover:bg-muted rounded-md',
    selected:
      'bg-brand/15 border-l-4 border-brand text-brand',
    line: 'border-l-2 border-border',
  },
  bordered: {
    node: 'border border-transparent hover:border-border rounded-md',
    selected:
      'border-2 border-brand bg-brand/10 text-brand',
    line: 'border-l-2 border-border',
  },
  minimal: {
    node: 'hover:bg-muted/50',
    selected: 'text-brand font-semibold',
    line: 'border-l border-border',
  },
} as const;

// ---------------------------------------------------------------------------
// TreeNodeItem
// ---------------------------------------------------------------------------

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, level = 0 }) => {
  const {
    mode,
    variant,
    size,
    showLines,
    showIcons,
    expandedKeys,
    selectedKey,
    focusedKey,
    setFocusedKey,
    toggleExpand,
    handleSelect,
    handleCheck,
    getCheckboxState,
    getVisibleNodeIds,
    renderActions,
  } = useTree();

  const ref = useRef<HTMLDivElement>(null);
  const config = sizeConfig[size];
  const styles = variantStyles[variant];

  const isExpanded = expandedKeys.includes(node.id);
  const isSelected = mode === 'normal' && selectedKey === node.id;
  const isFocused = focusedKey === node.id;
  const hasChildren = Boolean(node.children?.length);
  const checkState =
    mode === 'checkbox' ? getCheckboxState(node) : 'unchecked';

  // Focus this node when focusedKey changes to it
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus({ preventScroll: false });
    }
  }, [isFocused]);

  // ---- Keyboard navigation (tree-level) ----

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const visibleIds = getVisibleNodeIds();
      const idx = visibleIds.indexOf(node.id);

      const moveFocus = (nextIdx: number) => {
        const nextId = visibleIds[nextIdx];
        if (nextId !== undefined) setFocusedKey(nextId);
      };

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (idx < visibleIds.length - 1) moveFocus(idx + 1);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (idx > 0) moveFocus(idx - 1);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (hasChildren && !isExpanded) {
            toggleExpand(node.id);
          } else if (hasChildren && isExpanded) {
            // Move to first child (next in visible order)
            if (idx < visibleIds.length - 1) moveFocus(idx + 1);
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (hasChildren && isExpanded) {
            toggleExpand(node.id);
          } else if (idx > 0) {
            // Move to parent (previous in visible order)
            moveFocus(idx - 1);
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          moveFocus(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          moveFocus(visibleIds.length - 1);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (hasChildren) {
            toggleExpand(node.id);
          } else if (mode === 'normal') {
            handleSelect(node);
          } else if (mode === 'checkbox') {
            handleCheck(node, checkState !== 'checked');
          }
          break;
        }
        case ' ': {
          e.preventDefault();
          if (mode === 'normal') {
            handleSelect(node);
          } else if (mode === 'checkbox') {
            handleCheck(node, checkState !== 'checked');
          }
          break;
        }
        default: {
          // Typeahead: jump to next node starting with typed char
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            const ch = e.key.toLowerCase();
            const start = idx + 1;
            for (let i = start; i < visibleIds.length; i++) {
              // We need the label but only have the id here —
              // typeahead is best-effort; skip if we can't resolve.
            }
          }
        }
      }
    },
    [
      node,
      mode,
      hasChildren,
      isExpanded,
      checkState,
      getVisibleNodeIds,
      setFocusedKey,
      toggleExpand,
      handleSelect,
      handleCheck,
    ],
  );

  // ---- Click handlers ----

  const handleNodeClick = useCallback(() => {
    setFocusedKey(node.id);
    if (mode === 'normal') handleSelect(node);
    if (hasChildren) toggleExpand(node.id);
  }, [mode, handleSelect, node, hasChildren, toggleExpand, setFocusedKey]);

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleCheck(node, checkState !== 'checked');
    },
    [handleCheck, node, checkState],
  );

  const handleCheckboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        handleCheck(node, checkState !== 'checked');
      }
    },
    [handleCheck, node, checkState],
  );

  const handleChevronClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleExpand(node.id);
    },
    [toggleExpand, node.id],
  );

  // ---- Render helpers ----

  const renderCheckbox = () => {
    if (mode !== 'checkbox') return null;

    return (
      <div
        onClick={handleCheckboxClick}
        onKeyDown={handleCheckboxKeyDown}
        className={clsx(
          config.checkbox,
          'shrink-0 rounded border-2 flex items-center justify-center',
          'transition-all duration-200',
          node.disabled
            ? 'opacity-50 cursor-not-allowed border-border'
            : checkState === 'checked' || checkState === 'indeterminate'
              ? 'bg-brand border-brand cursor-pointer'
              : 'border-border hover:border-brand cursor-pointer',
        )}
        role="checkbox"
        aria-checked={
          checkState === 'indeterminate'
            ? 'mixed'
            : checkState === 'checked'
        }
        aria-label={`${checkState === 'checked' ? 'Uncheck' : 'Check'} ${node.label}`}
        tabIndex={-1}
      >
        {checkState === 'checked' && (
          <Check className="w-full h-full text-brand-content p-0.5" aria-hidden="true" />
        )}
        {checkState === 'indeterminate' && (
          <Minus className="w-full h-full text-brand-content p-0.5" aria-hidden="true" />
        )}
      </div>
    );
  };

  const renderNodeIcon = () => {
    if (!showIcons) return null;

    if (node.icon) {
      return (
        <span className={clsx(config.icon, 'shrink-0')} aria-hidden="true">
          {node.icon}
        </span>
      );
    }

    if (hasChildren) {
      return isExpanded ? (
        <FolderOpen className={clsx(config.icon, 'text-warning')} aria-hidden="true" />
      ) : (
        <Folder className={clsx(config.icon, 'text-warning')} aria-hidden="true" />
      );
    }

    return (
      <File className={clsx(config.icon, 'text-muted-content')} aria-hidden="true" />
    );
  };

  // ---- Render ----

  return (
    <div role="none">
      <div
        ref={ref}
        className={clsx(
          config.padding,
          styles.node,
          'flex items-center gap-2 transition-all duration-200 font-secondary relative group',
          config.text,
          isSelected ? styles.selected : 'text-surface-content',
          isFocused && 'ring-2 ring-inset ring-focus',
          node.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        )}
        style={{ paddingLeft: `${level * config.indent + 12}px` }}
        onClick={handleNodeClick}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={mode === 'normal' ? isSelected : undefined}
        aria-disabled={node.disabled || undefined}
        aria-level={level + 1}
        tabIndex={isFocused ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        {/* Connecting line */}
        {showLines && level > 0 && (
          <div
            className={clsx('absolute top-0 bottom-0', styles.line)}
            style={{ left: `${(level - 1) * config.indent + 12}px` }}
            aria-hidden="true"
          />
        )}

        {/* Expand / collapse chevron */}
        {hasChildren ? (
          <div
            onClick={handleChevronClick}
            className="shrink-0 cursor-pointer"
            aria-hidden="true"
          >
            {isExpanded ? (
              <ChevronDown className={clsx(config.icon, 'text-muted-content')} />
            ) : (
              <ChevronRight className={clsx(config.icon, 'text-muted-content')} />
            )}
          </div>
        ) : (
          <div className={clsx(config.icon, 'shrink-0')} aria-hidden="true" />
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

TreeNodeItem.displayName = 'Tree.Node';

export default TreeNodeItem;
