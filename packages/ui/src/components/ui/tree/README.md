# Tree

## Anatomy

- tree.tsx — composition (TreeRoot state + context provider, TreeNodes, compound assembly)
- tree-node.tsx — UI (recursive node renderer with checkbox, keyboard nav, icons)
- tree-search.tsx — UI (search input)
- tree-actions.tsx — UI (expand/collapse toolbar)
- tree-container.tsx — UI (container wrapper)
- types.ts — types
- context.ts — context + useTree hook
- index.ts — export

## Use Cases

- File/folder browser navigation
- Hierarchical data display with selection (single or checkbox)
- Filterable tree structures with expand/collapse controls
