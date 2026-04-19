import { ComponentRegistryEntry } from '../types.js';

export const draggableEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'draggable',
  name: 'Draggable',
  type: 'component',
  category: 'utility',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible drag-and-drop sortable component with pointer and keyboard support, FLIP animations, portal-rendered overlays (preview, placeholder, drop indicator), and single-list or multi-container (Kanban) capability.',
  longDescription:
    'The Draggable component provides a complete drag-and-drop reordering system built entirely on React context, refs, and pointer events — no external DnD libraries required. It supports both single-list and multi-container (Kanban-style) modes, controlled or uncontrolled state management, and list or grid layouts. The compound component pattern exposes Draggable.Container, Draggable.Item, Draggable.Handle, Draggable.Preview, Draggable.Placeholder, and Draggable.DropIndicator for flexible composition. Dragging works via pointer events (mouse and touch) with a dedicated handle or full-item grab. Keyboard accessibility is first-class: Space to grab, Arrow keys to move, Space to drop, Escape to cancel — all announced to screen readers via an aria-live assertive region. FLIP animations provide smooth reorder transitions with a 200ms cubic-bezier easing. Visual feedback layers use React portals: a semi-transparent drag preview follows the cursor, a placeholder marks the drop position, and a brand-colored drop indicator line highlights the insertion point.',
  tags: [
    'drag',
    'drop',
    'sortable',
    'reorder',
    'dnd',
    'drag-and-drop',
    'list',
    'grid',
    'kanban',
    'drag-handle',
    'keyboard',
    'accessible',
  ],
  useCases: [
    'Reorder items in a single list with drag handles or full-item dragging, such as task priorities or playlist tracks',
    'Build Kanban-style boards with cross-container drag-and-drop between columns (e.g., To Do, In Progress, Done)',
    'Create sortable grid layouts with multi-column drag reordering for image galleries or dashboard widgets',
    'Provide fully accessible reordering via keyboard navigation (Space to grab, Arrow keys to move, Space to drop) for WCAG compliance',
    'Add rich visual feedback during drag with portal-rendered preview, placeholder, and drop indicator overlays',
    'Implement controlled or uncontrolled sortable state with onReorder and onContainersChange callbacks for external persistence',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Draggable',
  files: [
    { name: 'Draggable.tsx', description: 'Root component: manages drag state (controlled/uncontrolled), FLIP animation recording/playback, pointer and keyboard drag lifecycle, and live region for screen reader announcements' },
    { name: 'DraggableContainer.tsx', description: 'Layout container that registers with the root context, applies list or grid CSS, and sets the appropriate ARIA role (list or grid)' },
    { name: 'DraggableItem.tsx', description: 'Sortable item with pointer drag initiation, keyboard grab/move/drop handlers, ARIA attributes (aria-grabbed, aria-roledescription), and focus-visible ring styling' },
    { name: 'DraggableHandle.tsx', description: 'Dedicated drag handle button that intercepts pointer events, renders a default grip-dot SVG icon, and marks the parent item as handle-equipped' },
    { name: 'DraggablePreview.tsx', description: 'Portal-rendered drag preview that follows the cursor during pointer drag, cloning the active item\'s innerHTML at the captured offset' },
    { name: 'DraggablePlaceholder.tsx', description: 'Portal-rendered semi-transparent placeholder bar marking the current drop position during drag' },
    { name: 'DraggableDropIndicator.tsx', description: 'Portal-rendered brand-colored line indicator showing the exact insertion point during drag' },
    { name: 'hooks.ts', description: 'Internal hooks: useDraggableContext reads the DraggableContext, useItemContext reads the item-level DraggableItemContext — both throw descriptive errors when used outside their providers' },
    { name: 'types.ts', description: 'TypeScript interfaces for all prop types, context values (DraggableContextValue, DraggableItemContextValue), utility functions (arrayMove, getClosestIndex, getContainerAtPoint), and React contexts' },
    { name: 'index.ts', description: 'Barrel export assembling the Draggable compound component object (Container, Item, Handle, Preview, Placeholder, DropIndicator) and re-exporting all type definitions' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Draggable',
  subComponents: [
    {
      name: 'Container',
      fileName: 'DraggableContainer.tsx',
      description: 'Layout wrapper that determines the arrangement (list or grid) of sortable items. Registers itself with the root for multi-container drag detection. Sets ARIA role to "list" or "grid" based on layout.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Draggable.Item elements to render in this container',
        },
        {
          name: 'layout',
          type: "'list' | 'grid'",
          required: false,
          defaultValue: "'list'",
          description: 'Layout mode: "list" renders a vertical flex column, "grid" renders a CSS grid with configurable columns',
          options: ['list', 'grid'],
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          defaultValue: '3',
          description: 'Number of grid columns when layout is "grid". Ignored in list layout.',
        },
        {
          name: 'containerId',
          type: 'string',
          required: false,
          description: 'Unique identifier for this container in multi-container (Kanban) mode. Omit for single-list usage.',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Sortable list'",
          description: 'Accessible label for the container. Defaults to "Sortable list" if not provided.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default container layout styles',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'DraggableItem.tsx',
      description: 'A sortable item that can be dragged and reordered. Supports pointer drag (full-item or via Handle), keyboard drag (Space/Arrow/Escape), and applies ARIA sortable semantics with screen reader instructions.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render inside the sortable item',
        },
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Unique identifier for this item, matching an entry in the root items array or containers map',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the item cannot be dragged and appears visually dimmed with cursor-not-allowed',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default item styles (min-height, focus ring, active state)',
        },
      ],
    },
    {
      name: 'Handle',
      fileName: 'DraggableHandle.tsx',
      description: 'A dedicated drag handle button that renders a default grip-dot SVG icon. When present inside an Item, pointer drag is restricted to the handle only instead of the full item area.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom handle content; defaults to a six-dot grip SVG icon when omitted',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default handle styles (8×8 box, hover state, grab cursor)',
        },
      ],
    },
    {
      name: 'Preview',
      fileName: 'DraggablePreview.tsx',
      description: 'Portal-rendered overlay that follows the cursor during pointer drag, showing a snapshot of the dragged item at the captured offset. Hidden during keyboard drag.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Not used for content injection — the preview clones the active item\'s innerHTML automatically',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default preview styles (surface background, elevated shadow, border)',
        },
      ],
    },
    {
      name: 'Placeholder',
      fileName: 'DraggablePlaceholder.tsx',
      description: 'Portal-rendered semi-transparent bar that marks the current drop position during drag. Uses brand color at 30% opacity.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default placeholder styles (brand/30 background, rounded)',
        },
      ],
    },
    {
      name: 'DropIndicator',
      fileName: 'DraggableDropIndicator.tsx',
      description: 'Portal-rendered brand-colored line indicator showing the exact insertion point during drag. Adapts orientation to list (horizontal line) or grid (vertical line) layout.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default indicator styles (brand background, rounded, 2px line)',
        },
      ],
    },
  ],
  hooks: ['useDraggableContext', 'useItemContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Must include at least a Draggable.Container with Draggable.Item children. Optionally include Draggable.Preview, Draggable.Placeholder, and Draggable.DropIndicator for visual feedback.',
    },
    {
      name: 'items',
      type: 'string[]',
      required: false,
      description: 'Controlled array of item IDs defining the current order. Use with onReorder for externally managed state. Mutually exclusive with defaultItems in controlled mode.',
    },
    {
      name: 'defaultItems',
      type: 'string[]',
      required: false,
      defaultValue: '[]',
      description: 'Initial item IDs for uncontrolled mode. The component manages order internally and calls onReorder on each change.',
    },
    {
      name: 'onReorder',
      type: '(items: string[]) => void',
      required: false,
      description: 'Callback fired with the new item order after a successful drag-and-drop reorder. Called for both controlled and uncontrolled modes.',
    },
    {
      name: 'containers',
      type: 'ContainersMap',
      required: false,
      description: 'Controlled multi-container state mapping container IDs to arrays of item IDs. Enables Kanban-style cross-container dragging. Mutually exclusive with defaultContainers.',
    },
    {
      name: 'defaultContainers',
      type: 'ContainersMap',
      required: false,
      defaultValue: '{}',
      description: 'Initial multi-container state for uncontrolled Kanban mode. The component manages container state internally.',
    },
    {
      name: 'onContainersChange',
      type: '(containers: ContainersMap) => void',
      required: false,
      description: 'Callback fired with the updated container map after a cross-container or within-container reorder in multi-container mode.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root wrapper div',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'dragging',
      prop: 'activeId',
      isBoolean: false,
      defaultValue: 'null',
      description: 'An item is actively being dragged. The active item becomes semi-transparent (pointer drag) or gets a brand ring (keyboard drag). Set to the dragged item\'s value, or null when idle.',
    },
    {
      name: 'keyboardDragging',
      prop: 'isKeyboardDragging',
      isBoolean: true,
      defaultValue: 'false',
      description: 'True when the current drag operation was initiated via keyboard (Space key). Keyboard drags show a brand ring on the active item instead of hiding it.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Per-item disabled state. Disabled items have reduced opacity, cursor-not-allowed, and ignore all drag initiation events.',
    },
    {
      name: 'layout',
      prop: 'layout',
      isBoolean: false,
      values: ['list', 'grid'],
      defaultValue: "'list'",
      description: 'Determines the container layout mode. "list" is a vertical flex column; "grid" is a CSS grid with configurable columns. Affects ARIA roles, drag geometry calculation, and drop indicator orientation.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onReorder',
      signature: '(items: string[]) => void',
      description: 'Fired after a successful single-list reorder with the new item order array. Called for both controlled (items prop) and uncontrolled (defaultItems prop) modes.',
    },
    {
      name: 'onContainersChange',
      signature: '(containers: ContainersMap) => void',
      description: 'Fired after a successful multi-container reorder (within-container or cross-container) with the updated ContainersMap. Each key is a containerId mapping to its ordered item IDs.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role (Container)',
        description: 'Set to "list" when layout is "list" and "grid" when layout is "grid". Provides semantic structure for assistive technologies.',
        managedByComponent: true,
      },
      {
        name: 'role (Item)',
        description: 'Set to "listitem" in list layout and "gridcell" in grid layout. Paired with the container role for correct semantic hierarchy.',
        managedByComponent: true,
      },
      {
        name: 'aria-grabbed',
        description: 'Set to true on the actively dragged item. Undefined when the item is not being dragged, which omits the attribute from the DOM.',
        managedByComponent: true,
      },
      {
        name: 'aria-roledescription',
        description: 'Set to "sortable item" on each Draggable.Item to communicate that the item can be reordered via drag.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set to true on items with disabled=true. Undefined (omitted) when the item is enabled.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Set to "draggable-instructions" on each item, pointing to a visually hidden span with the text "Press Space to grab, arrow keys to move, Space to drop, Escape to cancel."',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Container)',
        description: 'Set on each Draggable.Container. Defaults to "Sortable list" if not explicitly provided via the aria-label prop.',
        managedByComponent: false,
      },
      {
        name: 'aria-live (LiveRegion)',
        description: 'Set to "assertive" on a visually hidden div inside the root. Polls every 100ms for new announcements and reads them to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic (LiveRegion)',
        description: 'Set to "true" on the live region div so screen readers announce the full message as a single unit.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Space',
        behavior: 'Grabs the focused item (starts keyboard drag) if no item is active. Drops the item at the current position if an item is being dragged.',
      },
      {
        key: 'Enter',
        behavior: 'Same as Space — grabs the focused item or drops the active item.',
      },
      {
        key: 'ArrowUp',
        behavior: 'In list layout: moves the dragged item one position up. In grid layout: moves the dragged item one row up (by column count). When not dragging: moves focus to the previous item.',
      },
      {
        key: 'ArrowDown',
        behavior: 'In list layout: moves the dragged item one position down. In grid layout: moves the dragged item one row down (by column count). When not dragging: moves focus to the next item.',
      },
      {
        key: 'ArrowLeft',
        behavior: 'In grid layout: moves the dragged item one position left. In list layout: moves focus to the previous item (when not dragging).',
      },
      {
        key: 'ArrowRight',
        behavior: 'In grid layout: moves the dragged item one position right. In list layout: moves focus to the next item (when not dragging).',
      },
      {
        key: 'Escape',
        behavior: 'Cancels the active drag operation and returns the item to its original position. Works for both pointer and keyboard drag.',
      },
    ],
    focusManagement:
      'Items use a roving tabindex pattern — only the focused item has tabIndex={0}, all others have tabIndex={-1}. Focus moves via arrow keys when not dragging. During keyboard drag, the active item gets a visible brand ring. The handle button has tabIndex={-1} to keep it out of the tab flow since the parent item handles all keyboard interaction.',
    wcagLevel: 'AA',
    notes:
      'All drag operations are fully keyboard-accessible with the Space/Arrow/Space pattern. Screen reader announcements ("Picked up item X", "Moved to position Y", "Dropped at position Z", "Reorder cancelled") use an aria-live assertive region with 100ms polling. The visually hidden instruction text ("Press Space to grab, arrow keys to move, Space to drop, Escape to cancel") is associated via aria-describedby on every item. The compound component pattern ensures correct ARIA role nesting (list/listitem or grid/gridcell).',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'Cards are commonly used as the visual content inside Draggable.Item for task boards and sortable lists',
    },
    {
      slug: 'badge',
      reason: 'Badges display counts or status labels on draggable items (e.g., priority, category)',
    },
    {
      slug: 'checkbox',
      reason: 'Checkboxes are often paired with draggable items in task lists to mark completion independently of reordering',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltips provide additional context on hover for drag handles or sortable items without cluttering the layout',
    },
    {
      slug: 'drawer',
      reason: 'Drawers can house detailed item editors that open when a draggable item is clicked or double-clicked',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Sortable List with Handles',
      description: 'A single-list layout where items can be reordered by dragging the handle grip icon. Uses controlled mode with onReorder callback.',
      code: `import { useState } from 'react';
import { Draggable } from 'vayu-ui';

const listItems = [
  { id: '1', title: 'Inbox', subtitle: '12 unread' },
  { id: '2', title: 'Photos', subtitle: '3,429 items' },
  { id: '3', title: 'Documents', subtitle: '156 files' },
  { id: '4', title: 'Music', subtitle: '2,847 tracks' },
  { id: '5', title: 'Videos', subtitle: '89 clips' },
];

function DraggableListDemo() {
  const [items, setItems] = useState(listItems);

  const handleReorder = (newOrder: string[]) => {
    setItems((prev) => newOrder.map((id) => prev.find((i) => i.id === id)!));
  };

  return (
    <Draggable items={items.map((i) => i.id)} onReorder={handleReorder}>
      <Draggable.Container layout="list">
        {items.map((item) => (
          <Draggable.Item key={item.id} value={item.id}>
            <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-surface hover:border-brand/30 transition-colors">
              <Draggable.Handle />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-content truncate">
                  {item.title}
                </p>
                <p className="text-xs text-muted-content">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </Draggable.Item>
        ))}
      </Draggable.Container>
      <Draggable.Preview />
      <Draggable.DropIndicator />
    </Draggable>
  );
}`,
      tags: ['list', 'handle', 'controlled', 'reorder', 'basic'],
    },
    {
      title: 'Sortable Grid Layout',
      description: 'A 3-column grid layout where items can be reordered in both horizontal and vertical directions via drag or keyboard arrows.',
      code: `import { useState } from 'react';
import { Draggable } from 'vayu-ui';

const gridItems = [
  { id: 'g1', title: 'Inbox', subtitle: '12' },
  { id: 'g2', title: 'Photos', subtitle: '3,429' },
  { id: 'g3', title: 'Docs', subtitle: '156' },
  { id: 'g4', title: 'Music', subtitle: '2,847' },
  { id: 'g5', title: 'Videos', subtitle: '89' },
  { id: 'g6', title: 'Archives', subtitle: '24' },
];

function DraggableGridDemo() {
  const [items, setItems] = useState(gridItems);

  const handleReorder = (newOrder: string[]) => {
    setItems((prev) => newOrder.map((id) => prev.find((i) => i.id === id)!));
  };

  return (
    <Draggable items={items.map((i) => i.id)} onReorder={handleReorder}>
      <Draggable.Container layout="grid" columns={3}>
        {items.map((item) => (
          <Draggable.Item key={item.id} value={item.id}>
            <div className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-surface hover:border-brand/30 transition-colors">
              <div className="flex items-center justify-between w-full">
                <Draggable.Handle />
                <span className="text-[10px] text-muted-content">
                  {item.subtitle}
                </span>
              </div>
              <p className="text-xs font-semibold text-surface-content">
                {item.title}
              </p>
            </div>
          </Draggable.Item>
        ))}
      </Draggable.Container>
      <Draggable.Preview />
      <Draggable.DropIndicator />
    </Draggable>
  );
}`,
      tags: ['grid', 'columns', 'controlled', 'multi-column'],
    },
    {
      title: 'Cross-Container Kanban Board',
      description: 'Multi-container drag-and-drop between two columns (To Do and Done). Items can be reordered within a column or moved between columns using the containers prop and onContainersChange callback.',
      code: `import { useState } from 'react';
import { Draggable, type ContainersMap } from 'vayu-ui';

const taskMap: Record<string, string> = {
  t1: 'Write unit tests',
  t2: 'Review PR #42',
  t3: 'Update changelog',
  t4: 'Setup CI pipeline',
  t5: 'Design token audit',
};

function DraggableCrossListDemo() {
  const [containers, setContainers] = useState<ContainersMap>({
    todo: ['t1', 't2', 't3'],
    done: ['t4', 't5'],
  });

  return (
    <Draggable containers={containers} onContainersChange={setContainers}>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-canvas rounded-surface p-4 border border-border">
          <h3 className="text-sm font-bold text-surface-content mb-3 uppercase tracking-wide">
            To Do ({containers.todo.length})
          </h3>
          <Draggable.Container containerId="todo" layout="list" aria-label="To Do items">
            {containers.todo.map((id) => (
              <Draggable.Item key={id} value={id}>
                <div className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border">
                  <Draggable.Handle />
                  <span className="text-sm text-surface-content">{taskMap[id]}</span>
                </div>
              </Draggable.Item>
            ))}
          </Draggable.Container>
        </div>

        <div className="bg-canvas rounded-surface p-4 border border-border">
          <h3 className="text-sm font-bold text-surface-content mb-3 uppercase tracking-wide">
            Done ({containers.done.length})
          </h3>
          <Draggable.Container containerId="done" layout="list" aria-label="Done items" className="min-h-[80px]">
            {containers.done.map((id) => (
              <Draggable.Item key={id} value={id}>
                <div className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border">
                  <Draggable.Handle />
                  <span className="text-sm text-surface-content">{taskMap[id]}</span>
                </div>
              </Draggable.Item>
            ))}
          </Draggable.Container>
        </div>
      </div>
      <Draggable.Preview />
      <Draggable.DropIndicator />
    </Draggable>
  );
}`,
      tags: ['kanban', 'multi-container', 'cross-list', 'columns', 'board'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside Draggable root',
      bad: '<Draggable.Item value="a">Item</Draggable.Item>',
      good: '<Draggable items={[...]} onReorder={fn}>\n  <Draggable.Container layout="list">\n    <Draggable.Item value="a">Item</Draggable.Item>\n  </Draggable.Container>\n</Draggable>',
      reason: 'Draggable.Item and all other sub-components read from DraggableContext via useDraggableContext(), which throws "Draggable compound components must be used inside <Draggable>" when the context is null. Always nest sub-components within a <Draggable> root.',
    },
    {
      title: 'Placing Handle outside an Item',
      bad: '<Draggable.Container layout="list">\n  <Draggable.Handle />\n  <Draggable.Item value="a">Item</Draggable.Item>\n</Draggable.Container>',
      good: '<Draggable.Item value="a">\n  <Draggable.Handle />\n  <span>Item content</span>\n</Draggable.Item>',
      reason: 'Draggable.Handle reads from DraggableItemContext via useItemContext(), which throws "Draggable.Handle must be used inside <Draggable.Item>" when used outside an Item. The Handle also sets itemCtx.hasHandle.current = true to disable full-item pointer drag.',
    },
    {
      title: 'Mixing items and containers props',
      bad: '<Draggable items={["a","b"]} containers={{ col1: ["a"] }} onReorder={fn} />',
      good: '// Single-list mode:\n<Draggable items={["a","b"]} onReorder={fn} />\n\n// Multi-container mode:\n<Draggable containers={{ col1: ["a","b"] }} onContainersChange={fn} />',
      reason: 'The root detects multi-container mode when containers or defaultContainers is defined (isMulti flag). Using both items and containers creates conflicting state sources. Pick one mode: items/onReorder for single-list, containers/onContainersChange for multi-container.',
    },
    {
      title: 'Omitting containerId in multi-container mode',
      bad: '<Draggable containers={containers} onContainersChange={setContainers}>\n  <Draggable.Container layout="list">\n    <Draggable.Item value="a">Item</Draggable.Item>\n  </Draggable.Container>\n</Draggable>',
      good: '<Draggable containers={containers} onContainersChange={setContainers}>\n  <Draggable.Container containerId="todo" layout="list" aria-label="To Do">\n    <Draggable.Item value="a">Item</Draggable.Item>\n  </Draggable.Container>\n</Draggable>',
      reason: 'In multi-container mode, each Draggable.Container must have a containerId that matches a key in the containers map. Without it, the container registers as "__default__" and item containment lookup fails, breaking cross-container drag detection.',
    },
    {
      title: 'Duplicating item values within a container',
      bad: '<Draggable items={["a","a","b"]} onReorder={fn}>\n  <Draggable.Container layout="list">\n    <Draggable.Item value="a">First</Draggable.Item>\n    <Draggable.Item value="a">Second</Draggable.Item>\n    <Draggable.Item value="b">Third</Draggable.Item>\n  </Draggable.Container>\n</Draggable>',
      good: '<Draggable items={["a1","a2","b"]} onReorder={fn}>\n  <Draggable.Container layout="list">\n    <Draggable.Item value="a1">First</Draggable.Item>\n    <Draggable.Item value="a2">Second</Draggable.Item>\n    <Draggable.Item value="b">Third</Draggable.Item>\n  </Draggable.Container>\n</Draggable>',
      reason: 'Item values are used as keys in itemRefs Map, DOM ids (draggable-item-${value}), and array lookup via indexOf. Duplicate values cause the second item to overwrite the first in the refs Map, breaking drag geometry and focus management. Each value must be unique within its container.',
    },
  ],
};
