import { ComponentRegistryEntry } from '../types.js';

export const gridLayoutEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'grid-layout',
  name: 'GridLayout',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'A dashboard-style draggable and resizable grid layout component with coordinate-based positioning, collision resolution, vertical compaction, responsive breakpoints, and full keyboard accessibility.',
  longDescription:
    'The GridLayout component provides a complete dashboard-style grid layout system built entirely on React context, refs, and pointer events — no external layout libraries required. Items are positioned on a coordinate grid defined by x, y, w, h values and can be dragged to reposition and resized via corner/edge handles. The compound component pattern exposes GridLayout.Container, GridLayout.Item, GridLayout.DragHandle, GridLayout.ResizeHandle, and GridLayout.Placeholder for flexible composition. Dragging and resizing work via pointer events (mouse and touch) with grid snapping. Collision resolution automatically pushes overlapping items downward, and vertical compaction fills gaps by moving items upward. Responsive breakpoints adjust the column count based on container width. Keyboard accessibility is first-class: Space to grab, Arrow keys to move, Shift+Arrow keys to resize, Space to drop, Escape to cancel — all announced to screen readers via an aria-live assertive region. FLIP animations provide smooth layout transitions with a 200ms cubic-bezier easing.',
  tags: [
    'grid',
    'layout',
    'dashboard',
    'draggable',
    'resizable',
    'grid-layout',
    'widgets',
    'drag',
    'resize',
    'responsive',
    'keyboard',
    'accessible',
  ],
  useCases: [
    'Build customizable dashboards with draggable and resizable widget cards (analytics, charts, stats)',
    'Create editable page layouts where users can arrange content blocks on a grid',
    'Implement dashboard-style admin panels with widget repositioning and resizing',
    'Provide fully accessible grid layout editing via keyboard navigation (Space to grab, Arrow keys to move/resize) for WCAG compliance',
    'Add responsive breakpoint-aware layouts that automatically reflow when the viewport changes',
    'Implement serializable layouts that can be saved and restored as JSON arrays',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'GridLayout',
  files: [
    { name: 'GridLayout.tsx', description: 'Root component: manages layout state (controlled/uncontrolled), FLIP animation recording/playback, drag and resize lifecycle, responsive breakpoints, and live region for screen reader announcements' },
    { name: 'GridLayoutContainer.tsx', description: 'Positioning context container that measures its own width via ResizeObserver, triggers responsive breakpoint matching, and sets ARIA role="grid"' },
    { name: 'GridItem.tsx', description: 'Absolutely-positioned grid item that computes its pixel position from grid coordinates, handles pointer drag and keyboard move/resize events, and provides ARIA attributes' },
    { name: 'GridDragHandle.tsx', description: 'Dedicated drag handle button that intercepts pointer events, renders a default grip-dot SVG icon, and restricts drag initiation to the handle only' },
    { name: 'GridResizeHandle.tsx', description: 'Resize handle sub-component that renders directional handles at corners/edges (default: south-east), supporting 8 directions (n, s, e, w, ne, nw, se, sw)' },
    { name: 'GridPlaceholder.tsx', description: 'Portal-rendered dashed-border overlay showing where the dragged/resized item will land in the grid' },
    { name: 'algorithms.ts', description: 'Pure functions for grid math: computeColWidth, pixelToGrid, gridToPixel, itemsOverlap, resolveCollisions, compactLayout, computeResize, matchBreakpoint, adjustLayoutForCols — zero React dependencies, fully unit-testable' },
    { name: 'hooks.ts', description: 'Internal hooks: useGridLayoutContext reads the GridLayoutContext, useGridItemContext reads the item-level GridItemContext — both throw descriptive errors when used outside their providers' },
    { name: 'types.ts', description: 'TypeScript interfaces for all prop types, context values (GridLayoutContextValue, GridItemContextValue), layout item definition (GridLayoutItem), resize directions, responsive breakpoints, and React contexts' },
    { name: 'index.ts', description: 'Barrel export assembling the GridLayout compound component object (Container, Item, DragHandle, ResizeHandle, Placeholder) and re-exporting all type definitions' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'GridLayout',
  subComponents: [
    {
      name: 'Container',
      fileName: 'GridLayoutContainer.tsx',
      description: 'Positioning context wrapper for grid items. Uses position: relative and measures its own width via ResizeObserver to trigger responsive breakpoint matching. Sets ARIA role="grid".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'GridLayout.Item elements to render in this container',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Grid layout'",
          description: 'Accessible label for the container. Defaults to "Grid layout" if not provided.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default container styles',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'GridItem.tsx',
      description: 'An absolutely-positioned grid item that computes its pixel position from grid coordinates (x, y, w, h). Supports pointer drag and keyboard move/resize with ARIA semantics.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render inside the grid item',
        },
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Unique item identifier matching an entry in the layout array',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the item cannot be dragged or resized and appears visually dimmed',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default item styles',
        },
      ],
    },
    {
      name: 'DragHandle',
      fileName: 'GridDragHandle.tsx',
      description: 'A dedicated drag handle button that renders a default grip-dot SVG icon. When present inside an Item, pointer drag is restricted to the handle only.',
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
          description: 'Additional CSS classes to merge with the default handle styles',
        },
      ],
    },
    {
      name: 'ResizeHandle',
      fileName: 'GridResizeHandle.tsx',
      description: 'Resize handle sub-component that renders directional handles at specified corners/edges. Default renders at the south-east corner. Supports all 8 directions.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom resize handle content; defaults to a small resize indicator icon at the SE corner',
        },
        {
          name: 'directions',
          type: 'ResizeDirection[]',
          required: false,
          defaultValue: '["se"]',
          description: 'Which edges/corners to render handles for. Options: "n", "s", "e", "w", "ne", "nw", "se", "sw".',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default resize handle styles',
        },
      ],
    },
    {
      name: 'Placeholder',
      fileName: 'GridPlaceholder.tsx',
      description: 'Portal-rendered dashed-border overlay that shows where the dragged/resized item will land in the grid. Uses brand color at low opacity.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default placeholder styles',
        },
      ],
    },
  ],
  hooks: ['useGridLayoutContext', 'useGridItemContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Must include a GridLayout.Container with GridLayout.Item children. Optionally include GridLayout.Placeholder for visual feedback.',
    },
    {
      name: 'layout',
      type: 'GridLayoutItem[]',
      required: true,
      description: 'Controlled array of layout items, each with {i, x, y, w, h, minW?, maxW?, minH?, maxH?, static?}. Use with onLayoutChange for externally managed state.',
    },
    {
      name: 'defaultLayout',
      type: 'GridLayoutItem[]',
      required: false,
      description: 'Initial layout for uncontrolled mode. The component manages layout internally and calls onLayoutChange on each change.',
    },
    {
      name: 'onLayoutChange',
      type: '(layout: GridLayoutItem[]) => void',
      required: false,
      description: 'Callback fired with the updated layout array after a successful drag, resize, or breakpoint change.',
    },
    {
      name: 'cols',
      type: 'number',
      required: false,
      defaultValue: '12',
      description: 'Number of columns in the grid. Override when using breakpoints to set the default/large-screen column count.',
    },
    {
      name: 'rowHeight',
      type: 'number',
      required: false,
      defaultValue: '50',
      description: 'Height of a single grid row in pixels.',
    },
    {
      name: 'gap',
      type: 'number',
      required: false,
      defaultValue: '16',
      description: 'Gap between grid items in pixels.',
    },
    {
      name: 'maxRows',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Maximum number of rows. 0 means unlimited.',
    },
    {
      name: 'compactOnMove',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to vertically compact items (fill gaps) after each move or resize.',
    },
    {
      name: 'breakpoints',
      type: 'Breakpoints',
      required: false,
      description: 'Responsive breakpoint configuration mapping breakpoint names to {columns, rowHeight}. Defaults to lg=12, md=10, sm=6, xs=4, xxs=2.',
    },
    {
      name: 'breakpointWidths',
      type: 'Record<string, number>',
      required: false,
      description: 'Width thresholds for each breakpoint. Defaults to lg=1200, md=996, sm=768, xs=480, xxs=0.',
    },
    {
      name: 'preventCollision',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'If true, items cannot overlap during drag (clamp to empty spaces instead of pushing).',
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
      description: 'An item is actively being dragged. The active item gets reduced opacity and a brand ring. Set to the dragged item\'s id, or null when idle.',
    },
    {
      name: 'resizing',
      prop: 'interactionType',
      isBoolean: false,
      values: ['drag', 'resize'],
      defaultValue: 'null',
      description: 'Current interaction type. "drag" when repositioning, "resize" when resizing, null when idle.',
    },
    {
      name: 'placeholder',
      prop: 'placeholder',
      isBoolean: false,
      defaultValue: 'null',
      description: 'The target grid position (x, y, w, h) where the active item will land if dropped now. Shown as a dashed-border overlay.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onLayoutChange',
      signature: '(layout: GridLayoutItem[]) => void',
      description: 'Fired after a successful drag, resize, or responsive breakpoint change with the new layout array. Each item has updated x, y, w, h values.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role (Container)',
        description: 'Set to "grid" on the container div. Provides semantic structure for assistive technologies.',
        managedByComponent: true,
      },
      {
        name: 'role (Item)',
        description: 'Set to "gridcell" on each grid item. Paired with the container "grid" role for correct semantic hierarchy.',
        managedByComponent: true,
      },
      {
        name: 'aria-grabbed',
        description: 'Set to true on the actively dragged item. Undefined when the item is not being dragged.',
        managedByComponent: true,
      },
      {
        name: 'aria-roledescription',
        description: 'Set to "draggable grid item" on each GridLayout.Item.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set to true on items with disabled=true. Undefined when enabled.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Set to "grid-item-instructions" on each item, pointing to a visually hidden span with keyboard instructions.',
        managedByComponent: true,
      },
      {
        name: 'aria-live (LiveRegion)',
        description: 'Set to "assertive" on a visually hidden div for screen reader announcements.',
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
        behavior: 'When dragging: moves the item one row up. When Shift is held: resizes the item one row shorter. When not dragging: moves focus to the previous item.',
      },
      {
        key: 'ArrowDown',
        behavior: 'When dragging: moves the item one row down. When Shift is held: resizes the item one row taller. When not dragging: moves focus to the next item.',
      },
      {
        key: 'ArrowLeft',
        behavior: 'When dragging: moves the item one column left. When Shift is held: resizes the item one column narrower. When not dragging: moves focus to the previous item.',
      },
      {
        key: 'ArrowRight',
        behavior: 'When dragging: moves the item one column right. When Shift is held: resizes the item one column wider. When not dragging: moves focus to the next item.',
      },
      {
        key: 'Escape',
        behavior: 'Cancels the active drag or resize operation and returns the item to its original position.',
      },
    ],
    focusManagement:
      'Items use a roving tabindex pattern — only the focused item has tabIndex={0}, all others have tabIndex={-1}. Focus moves via arrow keys when not dragging. During keyboard drag, the active item gets a visible brand ring.',
    wcagLevel: 'AA',
    notes:
      'All drag and resize operations are fully keyboard-accessible. Screen reader announcements use an aria-live assertive region with 100ms polling. The visually hidden instruction text is associated via aria-describedby on every item.',
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
      reason: 'Cards are commonly used as the visual content inside GridLayout.Item for dashboard widgets',
    },
    {
      slug: 'draggable',
      reason: 'Draggable provides list/grid reordering, while GridLayout provides coordinate-based positioning — they serve complementary use cases',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Dashboard Grid',
      description: 'A 12-column dashboard with 6 widgets of varying sizes. Items can be dragged to reposition with collision resolution and vertical compaction.',
      code: `import { useState } from 'react';
import { GridLayout, type GridLayoutItem } from 'vayu-ui';

const initialLayout: GridLayoutItem[] = [
  { i: 'a', x: 0, y: 0, w: 4, h: 2 },
  { i: 'b', x: 4, y: 0, w: 4, h: 2 },
  { i: 'c', x: 8, y: 0, w: 4, h: 4 },
  { i: 'd', x: 0, y: 2, w: 8, h: 2 },
  { i: 'e', x: 0, y: 4, w: 6, h: 3 },
  { i: 'f', x: 6, y: 4, w: 6, h: 3 },
];

function DashboardDemo() {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <GridLayout layout={layout} onLayoutChange={setLayout} cols={12} rowHeight={80} gap={16}>
      <GridLayout.Container>
        {layout.map((item) => (
          <GridLayout.Item key={item.i} id={item.i}>
            <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-surface h-full">
              <GridLayout.DragHandle />
              <span className="text-sm font-semibold text-surface-content">
                Widget {item.i.toUpperCase()}
              </span>
            </div>
          </GridLayout.Item>
        ))}
      </GridLayout.Container>
      <GridLayout.Placeholder />
    </GridLayout>
  );
}`,
      tags: ['dashboard', 'basic', 'drag', 'controlled'],
    },
    {
      title: 'Resizable Dashboard Widgets',
      description: 'A dashboard with widgets that can be both dragged and resized via the south-east corner handle.',
      code: `import { useState } from 'react';
import { GridLayout, type GridLayoutItem } from 'vayu-ui';

const initialLayout: GridLayoutItem[] = [
  { i: 'w1', x: 0, y: 0, w: 6, h: 2, minW: 2, minH: 1 },
  { i: 'w2', x: 6, y: 0, w: 6, h: 2, minW: 2, minH: 1 },
  { i: 'w3', x: 0, y: 2, w: 4, h: 3, minW: 2, minH: 2 },
  { i: 'w4', x: 4, y: 2, w: 8, h: 3, minW: 3, minH: 2 },
];

function ResizableDashboard() {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <GridLayout layout={layout} onLayoutChange={setLayout} cols={12} rowHeight={60} gap={12}>
      <GridLayout.Container>
        {layout.map((item) => (
          <GridLayout.Item key={item.i} id={item.i}>
            <div className="flex flex-col gap-2 p-4 bg-surface border border-border rounded-surface h-full overflow-hidden">
              <div className="flex items-center justify-between">
                <GridLayout.DragHandle />
                <span className="text-sm font-semibold text-surface-content">
                  {item.i.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-content">
                {item.w}×{item.h} grid units
              </p>
            </div>
            <GridLayout.ResizeHandle />
          </GridLayout.Item>
        ))}
      </GridLayout.Container>
      <GridLayout.Placeholder />
    </GridLayout>
  );
}`,
      tags: ['resize', 'dashboard', 'handle', 'min-max'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside GridLayout root',
      bad: '<GridLayout.Container><GridLayout.Item id="a">Item</GridLayout.Item></GridLayout.Container>',
      good: '<GridLayout layout={layout} onLayoutChange={setLayout}>\n  <GridLayout.Container>\n    <GridLayout.Item id="a">Item</GridLayout.Item>\n  </GridLayout.Container>\n</GridLayout>',
      reason: 'GridLayout sub-components read from GridLayoutContext via useGridLayoutContext(), which throws when used outside a <GridLayout> root.',
    },
    {
      title: 'Using DragHandle or ResizeHandle outside an Item',
      bad: '<GridLayout.Container>\n  <GridLayout.DragHandle />\n  <GridLayout.Item id="a">Item</GridLayout.Item>\n</GridLayout.Container>',
      good: '<GridLayout.Item id="a">\n  <GridLayout.DragHandle />\n  <span>Item content</span>\n</GridLayout.Item>',
      reason: 'GridDragHandle and GridResizeHandle read from GridItemContext via useGridItemContext(), which throws when used outside a GridLayout.Item.',
    },
    {
      title: 'Not providing a layout prop',
      bad: '<GridLayout><GridLayout.Container>...</GridLayout.Container></GridLayout>',
      good: 'const layout = [{ i: "a", x: 0, y: 0, w: 4, h: 2 }];\n<GridLayout layout={layout} onLayoutChange={setLayout}>\n  <GridLayout.Container>\n    <GridLayout.Item id="a">Widget</GridLayout.Item>\n  </GridLayout.Container>\n</GridLayout>',
      reason: 'The layout prop is required and defines the position and size of each item. Without it, the component has no items to render.',
    },
    {
      title: 'Mismatching item IDs between layout and JSX',
      bad: 'const layout = [{ i: "a", x: 0, y: 0, w: 4, h: 2 }];\n<GridLayout.Item id="b">Widget</GridLayout.Item>',
      good: 'const layout = [{ i: "a", x: 0, y: 0, w: 4, h: 2 }];\n<GridLayout.Item id="a">Widget</GridLayout.Item>',
      reason: 'Each GridLayout.Item must have an id that matches the "i" field of an entry in the layout array. Mismatched IDs cause the item to not render.',
    },
  ],
};
