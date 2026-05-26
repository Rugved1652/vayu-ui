import { ComponentRegistryEntry } from '../types.js';

export const treeEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'tree',
  name: 'Tree',
  type: 'component',
  category: 'data-display',
  capabilities: ['navigation-primitive'],

  // ── Description ───────────────────────────────────────
  description:
    'An accessible hierarchical tree component with expand/collapse, single selection, checkbox cascade, keyboard navigation, and search.',
  longDescription:
    'The Tree component renders a nested, expandable tree structure using the compound component pattern (Tree.Search, Tree.Actions, Tree.Container, Tree.Nodes, Tree.Node). It supports two interaction modes: normal (single selection with expand/collapse) and checkbox (multi-select with checked/unchecked/indeterminate states and parent-child cascade logic). Four visual variants (default, filled, bordered, minimal) and three sizes (sm, md, lg) adapt to different densities. Built-in keyboard navigation follows the WAI-ARIA tree pattern with Arrow keys, Home, End, Enter, and Space. Optional connecting guide lines, automatic folder/file icons, custom node icons, disabled nodes, action rendering, and a search toolbar provide a complete tree experience.',
  tags: [
    'tree',
    'hierarchy',
    'nested',
    'expand',
    'collapse',
    'checkbox',
    'selection',
    'keyboard-navigation',
    'search',
    'folder',
    'file',
    'data-display',
    'a11y',
  ],
  useCases: [
    'File system explorers showing folders and files with expand/collapse and selection',
    'Organization charts or category hierarchies for browsing nested taxonomies',
    'Permission trees with checkbox cascade to grant/revoke access at group and individual levels',
    'Settings panels with nested configuration options and single-select navigation',
    'Navigation sidebars with collapsible sections for documentation or admin dashboards',
    'Multi-select feature trees where parent selection auto-checks all descendants',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Tree',
  files: [
    {
      name: 'Tree.tsx',
      description:
        'Root component (TreeRoot) providing TreeContext, controlled/uncontrolled state for expansion, selection, and checking, plus TreeNodes compound sub-component assembly',
    },
    {
      name: 'TreeNode.tsx',
      description:
        'Recursive node renderer with expand/collapse chevron, checkbox, selection, connecting lines, icons, keyboard navigation, and action slots',
    },
    {
      name: 'TreeContainer.tsx',
      description: 'Bordered container wrapper with empty state fallback using Filter icon',
    },
    {
      name: 'TreeActions.tsx',
      description: 'Toolbar with Expand All and Collapse All buttons using Plus/Minus Lucide icons',
    },
    {
      name: 'TreeSearch.tsx',
      description:
        'Search input with Search icon, clear button, role="searchbox", and accessible labels',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript interfaces for TreeNode, TreeRootProps, TreeContextType, and all sub-component prop interfaces',
    },
    {
      name: 'hooks.ts',
      description: 'TreeContext creation and useTree hook for consuming tree state and actions',
    },
    {
      name: 'utils.ts',
      description:
        'Tree traversal utilities: getAllNodeIds, getParentIds, getChildIds, findNodeInTree, getVisibleNodeIds',
    },
    {
      name: 'index.ts',
      description: 'Barrel export file re-exporting Tree, useTree, and all type definitions',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Tree',
  subComponents: [
    {
      name: 'Search',
      fileName: 'TreeSearch.tsx',
      description:
        'Search input field with a search icon, clear button, and accessible labels. Must be wired to external search state.',
      props: [
        {
          name: 'searchQuery',
          type: 'string',
          required: true,
          description: 'Current search query value',
        },
        {
          name: 'onSearchChange',
          type: '(query: string) => void',
          required: true,
          description: 'Callback fired when the search input value changes',
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          defaultValue: "'Search tree…'",
          description: 'Placeholder text displayed when the search field is empty',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the search wrapper',
        },
      ],
    },
    {
      name: 'Actions',
      fileName: 'TreeActions.tsx',
      description:
        'Toolbar with Expand All and Collapse All buttons. Must be wired to external expand/collapse handlers.',
      props: [
        {
          name: 'onExpandAll',
          type: '() => void',
          required: true,
          description: 'Callback fired when the Expand All button is clicked',
        },
        {
          name: 'onCollapseAll',
          type: '() => void',
          required: true,
          description: 'Callback fired when the Collapse All button is clicked',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the actions toolbar',
        },
      ],
    },
    {
      name: 'Container',
      fileName: 'TreeContainer.tsx',
      description:
        'Bordered container wrapper with rounded corners and overflow handling. Renders an empty state with Filter icon when no children are provided.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Tree content to render inside the container',
        },
        {
          name: 'empty',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom empty state content; falls back to a default "No data" message',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the container',
        },
      ],
    },
    {
      name: 'Nodes',
      fileName: 'Tree.tsx',
      description:
        'Renders a flat array of TreeNode data by mapping each node to a Tree.Node component.',
      props: [
        {
          name: 'nodes',
          type: 'TreeNode[]',
          required: true,
          description: 'Array of tree node data to render',
        },
      ],
    },
    {
      name: 'Node',
      fileName: 'TreeNode.tsx',
      description:
        'Individual recursive tree node renderer. Automatically handles indentation, expand/collapse, checkbox, selection, icons, and keyboard focus. Typically used indirectly via Tree.Nodes.',
      props: [
        {
          name: 'node',
          type: 'TreeNode',
          required: true,
          description: 'Tree node data object with id, label, children, icon, disabled, and metadata',
        },
        {
          name: 'level',
          type: 'number',
          required: false,
          defaultValue: '0',
          description: 'Nesting depth level used for indentation calculation',
        },
      ],
    },
  ],
  hooks: ['useTree'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Tree sub-components (Search, Actions, Container, Nodes) composing the full tree UI',
    },
    {
      name: 'data',
      type: 'TreeNode[]',
      required: true,
      description: 'Array of tree nodes defining the hierarchical data structure',
    },
    {
      name: 'mode',
      type: "'normal' | 'checkbox'",
      required: false,
      defaultValue: "'normal'",
      description: 'Interaction mode: normal for single selection, checkbox for multi-select with cascade',
      options: ['normal', 'checkbox'],
    },
    {
      name: 'variant',
      type: "'default' | 'filled' | 'bordered' | 'minimal'",
      required: false,
      defaultValue: "'default'",
      description: 'Visual style variant for node selection highlighting and border treatment',
      options: ['default', 'filled', 'bordered', 'minimal'],
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "'md'",
      description: 'Node sizing affecting text size, icon size, padding, and indentation',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'showLines',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, renders vertical connecting guide lines between parent and child nodes',
    },
    {
      name: 'showIcons',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, renders default Folder/FolderOpen/File Lucide icons or custom node icons',
    },
    {
      name: 'defaultExpandAll',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, expands all nodes on initial render',
    },
    {
      name: 'defaultExpandedKeys',
      type: '(string | number)[]',
      required: false,
      defaultValue: '[]',
      description: 'Initial expanded node ids for uncontrolled mode',
    },
    {
      name: 'expandedKeys',
      type: '(string | number)[]',
      required: false,
      description: 'Controlled expanded node ids. Use with onExpandedChange.',
    },
    {
      name: 'onExpandedChange',
      type: '(keys: (string | number)[]) => void',
      required: false,
      description: 'Callback fired when the set of expanded nodes changes',
    },
    {
      name: 'selectedKey',
      type: 'string | number | null',
      required: false,
      description: 'Controlled selected node id in normal mode. Use with onSelect.',
    },
    {
      name: 'onSelect',
      type: '(key: string | number | null, node: TreeNode | null) => void',
      required: false,
      description: 'Callback fired when a node is selected in normal mode',
    },
    {
      name: 'defaultSelectedKey',
      type: 'string | number',
      required: false,
      description: 'Initial selected node id for uncontrolled normal mode',
    },
    {
      name: 'checkedKeys',
      type: '(string | number)[]',
      required: false,
      description: 'Controlled checked node ids in checkbox mode. Use with onCheck.',
    },
    {
      name: 'onCheck',
      type: '(keys: (string | number)[], checkedNodes: TreeNode[]) => void',
      required: false,
      description: 'Callback fired when checked nodes change in checkbox mode',
    },
    {
      name: 'defaultCheckedKeys',
      type: '(string | number)[]',
      required: false,
      defaultValue: '[]',
      description: 'Initial checked node ids for uncontrolled checkbox mode',
    },
    {
      name: 'checkStrictly',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, disables parent-child cascade so each node checks independently',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, disables all tree interactions globally',
    },
    {
      name: 'onNodeClick',
      type: '(node: TreeNode) => void',
      required: false,
      description: 'Callback fired when any node is clicked, regardless of selection mode',
    },
    {
      name: 'renderActions',
      type: '(node: TreeNode) => React.ReactNode',
      required: false,
      description: 'Render prop for custom action buttons/icons shown on node hover',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root tree element',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      defaultValue: "'Tree'",
      description: 'Accessible label for the tree. Ignored when aria-labelledby is provided.',
    },
    {
      name: 'aria-labelledby',
      type: 'string',
      required: false,
      description: 'ID of the element that labels the tree, overriding aria-label',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['default', 'filled', 'bordered', 'minimal'],
    default: 'default',
  },
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'expanded',
      prop: 'expandedKeys',
      isBoolean: false,
      description: 'Set of node ids that are currently expanded, revealing their children',
    },
    {
      name: 'selected',
      prop: 'selectedKey',
      isBoolean: false,
      description: 'Single selected node id in normal mode. Null when nothing is selected.',
    },
    {
      name: 'checked',
      prop: 'checkedKeys',
      isBoolean: false,
      description: 'Set of checked node ids in checkbox mode, including cascaded parent selections',
    },
    {
      name: 'focused',
      prop: 'focusedKey',
      isBoolean: false,
      description: 'Currently focused node id for keyboard navigation and visual focus ring',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Globally disables all tree interactions when true',
    },
    {
      name: 'checkStrictly',
      prop: 'checkStrictly',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, checkbox selections do not cascade to children or affect parent indeterminate state',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onExpandedChange',
      signature: '(keys: (string | number)[]) => void',
      description: 'Fired when a node is expanded or collapsed',
    },
    {
      name: 'onSelect',
      signature: '(key: string | number | null, node: TreeNode | null) => void',
      description: 'Fired when a node is selected in normal mode. Key is null when deselecting.',
    },
    {
      name: 'onCheck',
      signature: '(keys: (string | number)[], checkedNodes: TreeNode[]) => void',
      description: 'Fired when checked nodes change in checkbox mode, including cascade effects',
    },
    {
      name: 'onNodeClick',
      signature: '(node: TreeNode) => void',
      description: 'Fired when any node row is clicked, regardless of mode or selection outcome',
    },
    {
      name: 'onKeyDown (Node)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Handled internally for Arrow, Home, End, Enter, and Space tree navigation',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'tree',
    attributes: [
      {
        name: 'role',
        description: 'Set to "tree" on the root element, "treeitem" on each node, and "group" on child containers',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Set on the root tree element. Defaults to "Tree" unless aria-labelledby is provided.',
        managedByComponent: false,
      },
      {
        name: 'aria-labelledby',
        description: 'Set on the root tree element when provided, overriding aria-label',
        managedByComponent: false,
      },
      {
        name: 'aria-multiselectable',
        description: 'Set to true on the root tree in checkbox mode to indicate multiple selections are possible',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on treeitem nodes that have children to indicate expand/collapse state',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Set on treeitem nodes in normal mode to indicate selection state',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set on disabled treeitem nodes to indicate non-interactivity',
        managedByComponent: true,
      },
      {
        name: 'aria-level',
        description: 'Set on each treeitem to indicate its depth level in the hierarchy (1-based)',
        managedByComponent: true,
      },
      {
        name: 'aria-checked',
        description: 'Set on checkbox elements to "true", "false", or "mixed" for indeterminate state',
        managedByComponent: true,
      },
      {
        name: 'role="searchbox"',
        description: 'Set on the Tree.Search input to identify it as a search field',
        managedByComponent: true,
      },
      {
        name: 'role="toolbar"',
        description: 'Set on Tree.Actions container to identify the expand/collapse button group',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        behavior: 'Moves focus to the next visible node in the tree',
      },
      {
        key: 'ArrowUp',
        behavior: 'Moves focus to the previous visible node in the tree',
      },
      {
        key: 'ArrowRight',
        behavior: 'Expands a closed node, or moves focus to the first child of an already-expanded node',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Collapses an expanded node, or moves focus to the parent of a leaf node',
      },
      {
        key: 'Enter',
        behavior: 'Toggles expansion for parent nodes, or selects/checks a leaf node depending on mode',
      },
      {
        key: 'Space',
        behavior: 'Selects the node in normal mode, or toggles checkbox state in checkbox mode',
      },
      {
        key: 'Home',
        behavior: 'Moves focus to the first visible node in the tree',
      },
      {
        key: 'End',
        behavior: 'Moves focus to the last visible node in the tree',
      },
    ],
    focusManagement:
      'Only the currently focused node has tabIndex=0; all other nodes have tabIndex=-1. Focus moves via Arrow keys following the WAI-ARIA tree pattern. When a node receives focus, it is scrolled into view. The focus ring uses ring-focus for visibility.',
    wcagLevel: 'AA',
    notes:
      'Tree follows the WAI-ARIA Tree View pattern with role="tree", role="treeitem", and role="group". Checkbox cascade logic automatically checks/unchecks descendants and evaluates ancestors for indeterminate state unless checkStrictly is true. Connecting lines are aria-hidden. Default folder/file icons are decorative and aria-hidden; custom node icons should include their own labels if meaningful.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'lucide-react' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Buttons are used inside renderActions for per-node operations like edit, delete, or add',
    },
    {
      slug: 'typography',
      reason: 'Typography components can label the tree or provide empty-state messaging',
    },
    {
      slug: 'text-input',
      reason: 'Alternative search input patterns that integrate with Tree.Search state',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltips help describe action buttons rendered via renderActions on hover',
    },
    {
      slug: 'divider',
      reason: 'Dividers can separate Tree.Search/Tree.Actions from the Tree.Container content',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic File Tree',
      description:
        'A simple expandable file tree with default icons, selection, and connecting lines.',
      code: `import { Tree } from 'vayu-ui';

const data = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'components', label: 'components', children: [{ id: 'Button.tsx', label: 'Button.tsx' }] },
      { id: 'hooks', label: 'hooks', children: [{ id: 'useToggle.ts', label: 'useToggle.ts' }] },
    ],
  },
  { id: 'package.json', label: 'package.json' },
];

export default function BasicTree() {
  return (
    <Tree data={data}>
      <Tree.Container>
        <Tree.Nodes nodes={data} />
      </Tree.Container>
    </Tree>
  );
}`,
      tags: ['basic', 'file-tree', 'expand', 'selection'],
    },
    {
      title: 'Checkbox Tree with Cascade',
      description:
        'A checkbox tree where checking a parent automatically checks all descendants and updates ancestor indeterminate state.',
      code: `import { useState } from 'react';
import { Tree } from 'vayu-ui';

const data = [
  {
    id: 'permissions',
    label: 'Permissions',
    children: [
      { id: 'read', label: 'Read' },
      { id: 'write', label: 'Write' },
      { id: 'delete', label: 'Delete' },
    ],
  },
];

export default function CheckboxTree() {
  const [checked, setChecked] = useState<(string | number)[]>([]);

  return (
    <Tree data={data} mode="checkbox" checkedKeys={checked} onCheck={setChecked}>
      <Tree.Container>
        <Tree.Nodes nodes={data} />
      </Tree.Container>
    </Tree>
  );
}`,
      tags: ['checkbox', 'cascade', 'permissions', 'multi-select'],
    },
    {
      title: 'Controlled Expansion with Actions',
      description:
        'A tree with controlled expanded keys, expand all / collapse all toolbar, and search integration.',
      code: `import { useState, useMemo } from 'react';
import { Tree } from 'vayu-ui';

const data = [
  {
    id: 'animals',
    label: 'Animals',
    children: [
      { id: 'mammals', label: 'Mammals', children: [{ id: 'dog', label: 'Dog' }, { id: 'cat', label: 'Cat' }] },
      { id: 'birds', label: 'Birds', children: [{ id: 'eagle', label: 'Eagle' }] },
    ],
  },
];

export default function ControlledTree() {
  const [expanded, setExpanded] = useState<(string | number)[]>([]);
  const [query, setQuery] = useState('');

  const allIds = useMemo(() => {
    const ids: (string | number)[] = [];
    const walk = (nodes: typeof data) => {
      nodes.forEach((n) => {
        ids.push(n.id);
        if (n.children) walk(n.children);
      });
    };
    walk(data);
    return ids;
  }, []);

  return (
    <Tree data={data} expandedKeys={expanded} onExpandedChange={setExpanded}>
      <Tree.Search searchQuery={query} onSearchChange={setQuery} />
      <Tree.Actions onExpandAll={() => setExpanded(allIds)} onCollapseAll={() => setExpanded([])} />
      <Tree.Container>
        <Tree.Nodes nodes={data} />
      </Tree.Container>
    </Tree>
  );
}`,
      tags: ['controlled', 'actions', 'search', 'expand-all'],
    },
    {
      title: 'Tree with Custom Actions',
      description:
        'A tree rendering per-node action buttons that appear on hover using the renderActions prop.',
      code: `import { useState } from 'react';
import { Tree } from 'vayu-ui';
import { Pencil, Trash2 } from 'lucide-react';

const data = [
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'web', label: 'Website' },
      { id: 'app', label: 'Mobile App' },
    ],
  },
];

export default function ActionsTree() {
  const [selected, setSelected] = useState<string | number | null>(null);

  return (
    <Tree
      data={data}
      selectedKey={selected}
      onSelect={(key) => setSelected(key)}
      renderActions={(node) => (
        <div className="flex items-center gap-1">
          <button aria-label={'Edit ' + node.label} className="p-1 hover:bg-muted rounded">
            <Pencil className="w-3 h-3" />
          </button>
          <button aria-label={'Delete ' + node.label} className="p-1 hover:bg-muted rounded">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    >
      <Tree.Container>
        <Tree.Nodes nodes={data} />
      </Tree.Container>
    </Tree>
  );
}`,
      tags: ['actions', 'hover', 'edit', 'delete'],
    },
    {
      title: 'Variant and Size Comparison',
      description:
        'Demonstrates all four variants (default, filled, bordered, minimal) and three sizes (sm, md, lg).',
      code: `import { Tree } from 'vayu-ui';

const data = [
  { id: 'docs', label: 'Documentation', children: [{ id: 'readme', label: 'README.md' }] },
];

export default function VariantSizeTree() {
  const configs: { variant: 'default' | 'filled' | 'bordered' | 'minimal'; size: 'sm' | 'md' | 'lg' }[] = [
    { variant: 'default', size: 'sm' },
    { variant: 'filled', size: 'md' },
    { variant: 'bordered', size: 'lg' },
    { variant: 'minimal', size: 'md' },
  ];

  return (
    <div className="space-y-4">
      {configs.map(({ variant, size }) => (
        <Tree key={\`\${variant}-\${size}\`} data={data} variant={variant} size={size}>
          <Tree.Container>
            <Tree.Nodes nodes={data} />
          </Tree.Container>
        </Tree>
      ))}
    </div>
  );
}`,
      tags: ['variants', 'sizes', 'default', 'filled', 'bordered', 'minimal'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Forgetting to render Tree.Nodes inside Tree.Container',
      bad: '<Tree data={data}><Tree.Container /></Tree>',
      good: '<Tree data={data}><Tree.Container><Tree.Nodes nodes={data} /></Tree.Container></Tree>',
      reason:
        'Tree.Container only provides the bordered wrapper and empty state. Without Tree.Nodes, no tree data is rendered and the container shows the empty fallback.',
    },
    {
      title: 'Using Tree.Node directly without providing a node prop',
      bad: '<Tree.Node />',
      good: '<Tree.Nodes nodes={data} />',
      reason:
        'Tree.Node requires a full TreeNode object and internal context from TreeRoot. Use Tree.Nodes to map your data array correctly.',
    },
    {
      title: 'Mixing controlled and uncontrolled props for the same state',
      bad: '<Tree data={data} expandedKeys={expanded} defaultExpandedKeys={[\'root\']} />',
      good: '<Tree data={data} expandedKeys={expanded} onExpandedChange={setExpanded} />',
      reason:
        'Passing both controlled (expandedKeys) and uncontrolled (defaultExpandedKeys) props creates conflicting state management. Use one or the other.',
    },
    {
      title: 'Using node ids that are not unique across the entire tree',
      bad: '[{ id: 1, label: "A", children: [{ id: 1, label: "B" }] }]',
      good: '[{ id: 1, label: "A", children: [{ id: 2, label: "B" }] }]',
      reason:
        'Duplicate node ids break expansion, selection, and checkbox state tracking because the tree uses ids as unique keys. Always ensure ids are globally unique.',
    },
    {
      title: 'Rendering Tree.Search without wiring onSearchChange',
      bad: '<Tree.Search searchQuery="" />',
      good: '<Tree.Search searchQuery={query} onSearchChange={setQuery} />',
      reason:
        'Tree.Search is a controlled input. Without onSearchChange, the search field is read-only and the clear button will not function.',
    },
  ],
};
