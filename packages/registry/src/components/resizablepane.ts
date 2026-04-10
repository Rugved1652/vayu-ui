import { ComponentRegistryEntry } from '../types.js';

export const resizablePaneEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'resizable-pane',
  name: 'ResizablePane',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'Accessible, draggable split-pane layout with mouse, touch, and keyboard resize support.',
  longDescription:
    'The ResizablePane component uses the compound component pattern (ResizablePane.Panel, ResizablePane.Handle) to create split-pane layouts with draggable dividers. Panels are sized as percentages of the container, support min/max constraints, and can be nested for complex grid layouts. Handles support mouse drag, touch drag, and full keyboard navigation with WAI-ARIA separator semantics.',
  tags: [
    'resizable',
    'split-pane',
    'panel',
    'layout',
    'divider',
    'drag',
    'handle',
    'sidebar',
  ],
  useCases: [
    'Building IDE-style layouts with a resizable sidebar and main content area',
    'Creating dashboard layouts where users adjust panel proportions to focus on specific data',
    'Implementing split-view editors or diff viewers with adjustable column widths',
    'Designing file explorer + detail panel layouts common in file management UIs',
    'Building nested resizable grids for complex data visualization workspaces',
    'Creating top/bottom split layouts for log viewers or terminal emulators',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'ResizablePane',
  files: [
    { name: 'ResizablePane.tsx', description: 'Root component with context provider, panel registration, and resize logic' },
    { name: 'ResizablePanel.tsx', description: 'Individual panel that registers itself and renders content within sized flex slots' },
    { name: 'ResizablePaneHandle.tsx', description: 'Draggable divider handle with mouse, touch, and keyboard resize support' },
    { name: 'types.ts', description: 'TypeScript type definitions for Direction, ResizablePaneProps, PanelProps, and HandleProps' },
    { name: 'index.ts', description: 'Barrel export re-exporting the compound component, types, and useResizablePane hook' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'ResizablePane',
  subComponents: [
    {
      name: 'Panel',
      fileName: 'ResizablePanel.tsx',
      description: 'A single resizable panel that registers with the parent ResizablePane and renders children in a proportionally sized flex slot',
      props: [
        {
          name: 'defaultSize',
          type: 'number',
          required: false,
          defaultValue: '50',
          description: 'Initial size as a percentage of the container (0–100)',
        },
        {
          name: 'minSize',
          type: 'number',
          required: false,
          defaultValue: '10',
          description: 'Minimum size as a percentage; panel cannot be resized below this value',
        },
        {
          name: 'maxSize',
          type: 'number',
          required: false,
          defaultValue: '90',
          description: 'Maximum size as a percentage; panel cannot be resized above this value',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content rendered inside the resizable panel',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the panel wrapper div',
        },
      ],
    },
    {
      name: 'Handle',
      fileName: 'ResizablePaneHandle.tsx',
      description: 'Draggable divider between two panels with visual grip indicator, supporting mouse, touch, and keyboard resize',
      props: [
        {
          name: 'step',
          type: 'number',
          required: false,
          defaultValue: '2',
          description: 'Percentage change per arrow key press; multiplied by 5 when Shift is held',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          description: 'Accessible label for the handle; defaults to "Resize columns" or "Resize rows"',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the handle wrapper div',
        },
      ],
    },
  ],
  hooks: ['useResizablePane'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      required: false,
      defaultValue: "'horizontal'",
      description: 'Layout direction: horizontal arranges panels in a row, vertical in a column',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'ResizablePane.Panel and ResizablePane.Handle components in alternating order',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root flex container',
    },
  ],
  rendersAs: 'div',

  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: 'direction',
    options: ['horizontal', 'vertical'],
    default: 'horizontal',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'sizes',
      prop: 'defaultSize (internal state via context)',
      isBoolean: false,
      values: ['number[] (percentage values)'],
      defaultValue: '[]',
      description: 'Array of panel sizes in percentages, managed internally. Each panel registers its defaultSize on mount and is adjusted during drag/keyboard resize.',
    },
    {
      name: 'dragging',
      prop: 'handle interaction (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Active drag state on a Handle. While dragging, the body cursor is set to col-resize or row-resize and text selection is disabled.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onMouseDown (internal)',
      signature: '(e: React.MouseEvent) => void',
      description: 'Handle mouse-down initiates drag mode, attaching mousemove and mouseup listeners to the document. Handled internally.',
    },
    {
      name: 'onTouchStart (internal)',
      signature: '(e: React.TouchEvent) => void',
      description: 'Handle touch-start initiates drag mode for mobile, attaching touchmove and touchend listeners. Prevents page scroll during drag. Handled internally.',
    },
    {
      name: 'onKeyDown (internal)',
      signature: '(e: React.KeyboardEvent) => void',
      description: 'Handle keyboard handler for Arrow keys (resize by step), Shift+Arrow (resize by step×5), Home (resize to minimum), and End (resize to maximum). Handled internally.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role="separator"',
        description: 'Applied to each Handle to identify it as a draggable divider between sections.',
        managedByComponent: true,
      },
      {
        name: 'aria-orientation',
        description: 'Applied to Handle; set to "vertical" when direction is horizontal (columns split vertically) and "horizontal" when direction is vertical.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuenow',
        description: 'Applied to Handle; reflects the current size of the preceding panel as a rounded percentage.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemin',
        description: 'Applied to Handle; set to the preceding panel\'s minSize constraint.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemax',
        description: 'Applied to Handle; set to the preceding panel\'s maxSize constraint.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied to Handle; defaults to "Resize columns" for horizontal or "Resize rows" for vertical. Can be overridden per handle.',
        managedByComponent: true,
      },
      {
        name: 'tabIndex={0}',
        description: 'Applied to Handle to make it keyboard focusable for WCAG 2.4.7 focus visibility.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight / ArrowDown',
        behavior: 'Increases the preceding panel size by step%. In horizontal mode, ArrowRight resizes; in vertical mode, ArrowDown resizes.',
      },
      {
        key: 'ArrowLeft / ArrowUp',
        behavior: 'Decreases the preceding panel size by step%. In horizontal mode, ArrowLeft resizes; in vertical mode, ArrowUp resizes.',
      },
      {
        key: 'Shift + Arrow',
        behavior: 'Increases or decreases the preceding panel size by step×5% for faster adjustment.',
      },
      {
        key: 'Home',
        behavior: 'Resizes the preceding panel to its minimum size (minSize).',
      },
      {
        key: 'End',
        behavior: 'Resizes the preceding panel to its maximum size (maxSize).',
      },
    ],
    focusManagement:
      'Handles are focusable via Tab. A visible focus ring (focus-visible:ring-2 ring-focus) appears on keyboard focus, satisfying WCAG 2.4.7. The handle hit area is at least 24×24px (WCAG 2.5.8).',
    wcagLevel: 'AA',
    notes:
      'The handle grip indicator uses bg-brand for visibility. During active drag, document body cursor is set and text selection is disabled to prevent interference. Touch events call preventDefault to stop page scrolling during resize.',
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
      reason: 'ResizablePane is often placed inside a Card container for bordered, rounded split layouts',
    },
    {
      slug: 'tab',
      reason: 'Tabs can be placed inside resizable panels for multi-view layouts like IDEs',
    },
    {
      slug: 'typography',
      reason: 'Commonly used inside panels for headings, descriptions, and content text',
    },
    {
      slug: 'scroll-area',
      reason: 'Panels with overflow content often need scroll containers alongside the resize behavior',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Horizontal Split',
      description: 'Two panels arranged side by side with a draggable handle. Drag the handle left or right to resize panels.',
      code: `import { ResizablePane } from 'vayu-ui';

export default function HorizontalSplit() {
  return (
    <div className="h-48 border-2 border-border rounded-surface overflow-hidden">
      <ResizablePane direction="horizontal">
        <ResizablePane.Panel defaultSize={30} minSize={15}>
          <div className="h-full p-4 bg-brand/10">Sidebar</div>
        </ResizablePane.Panel>
        <ResizablePane.Handle />
        <ResizablePane.Panel defaultSize={70} minSize={30}>
          <div className="h-full p-4">Dashboard</div>
        </ResizablePane.Panel>
      </ResizablePane>
    </div>
  );
}`,
      tags: ['horizontal', 'basic', 'two-panel'],
    },
    {
      title: 'Vertical Split',
      description: 'Two panels stacked vertically with a horizontal draggable handle. Drag up or down to resize panels.',
      code: `import { ResizablePane } from 'vayu-ui';

export default function VerticalSplit() {
  return (
    <div className="h-64 border-2 border-border rounded-surface overflow-hidden">
      <ResizablePane direction="vertical">
        <ResizablePane.Panel defaultSize={40} minSize={20}>
          <div className="h-full p-4 bg-brand/10">Top Panel</div>
        </ResizablePane.Panel>
        <ResizablePane.Handle />
        <ResizablePane.Panel defaultSize={60} minSize={20}>
          <div className="h-full p-4">Bottom Panel</div>
        </ResizablePane.Panel>
      </ResizablePane>
    </div>
  );
}`,
      tags: ['vertical', 'basic', 'two-panel'],
    },
    {
      title: 'Nested Horizontal and Vertical',
      description: 'A horizontal split with a nested vertical split in the second panel, creating a 2×2 grid layout.',
      code: `import { ResizablePane } from 'vayu-ui';

export default function NestedLayout() {
  return (
    <div className="h-48 border-2 border-border rounded-surface overflow-hidden">
      <ResizablePane direction="horizontal">
        <ResizablePane.Panel defaultSize={30} minSize={15}>
          <div className="h-full p-4 bg-brand/10">Sidebar</div>
        </ResizablePane.Panel>
        <ResizablePane.Handle />
        <ResizablePane.Panel defaultSize={70} minSize={30}>
          <ResizablePane direction="vertical">
            <ResizablePane.Panel defaultSize={40} minSize={20}>
              <div className="h-full p-4 bg-brand/10">Top Panel</div>
            </ResizablePane.Panel>
            <ResizablePane.Handle />
            <ResizablePane.Panel defaultSize={60} minSize={20}>
              <div className="h-full p-4">Bottom Panel</div>
            </ResizablePane.Panel>
          </ResizablePane>
        </ResizablePane.Panel>
      </ResizablePane>
    </div>
  );
}`,
      tags: ['nested', 'grid', 'horizontal', 'vertical', 'advanced'],
    },
    {
      title: 'Three Panels',
      description: 'Three side-by-side panels with two handles. Each handle has a custom aria-label for accessibility.',
      code: `import { ResizablePane } from 'vayu-ui';

export default function ThreePanels() {
  return (
    <div className="h-48 border-2 border-border rounded-surface overflow-hidden">
      <ResizablePane direction="horizontal">
        <ResizablePane.Panel defaultSize={25} minSize={15}>
          <div className="h-full p-4 bg-brand/10">Nav</div>
        </ResizablePane.Panel>
        <ResizablePane.Handle aria-label="Resize navigation and content" />
        <ResizablePane.Panel defaultSize={50} minSize={25}>
          <div className="h-full p-4">Content</div>
        </ResizablePane.Panel>
        <ResizablePane.Handle aria-label="Resize content and aside" />
        <ResizablePane.Panel defaultSize={25} minSize={15}>
          <div className="h-full p-4 bg-brand/10">Aside</div>
        </ResizablePane.Panel>
      </ResizablePane>
    </div>
  );
}`,
      tags: ['three-panel', 'horizontal', 'custom-label', 'advanced'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting Handle between panels',
      bad: '<ResizablePane><ResizablePane.Panel /><ResizablePane.Panel /></ResizablePane>',
      good: '<ResizablePane><ResizablePane.Panel /><ResizablePane.Handle /><ResizablePane.Panel /></ResizablePane>',
      reason: 'Panels must be separated by Handle components. Without handles, panels cannot be resized and the layout becomes static.',
    },
    {
      title: 'Using size values outside 0–100',
      bad: '<ResizablePane.Panel defaultSize={200} minSize={-10}>',
      good: '<ResizablePane.Panel defaultSize={50} minSize={10} maxSize={90}>',
      reason: 'Panel sizes are percentages (0–100). Values outside this range break the flex layout calculation and may cause panels to overflow or collapse.',
    },
    {
      title: 'Using Panel or Handle outside ResizablePane',
      bad: '<div><ResizablePane.Panel>Content</ResizablePane.Panel></div>',
      good: '<ResizablePane><ResizablePane.Panel>Content</ResizablePane.Panel></ResizablePane>',
      reason: 'Panel and Handle depend on the ResizablePaneContext provided by the root ResizablePane. Using them standalone throws a runtime error.',
    },
    {
      title: 'Setting minSize greater than maxSize',
      bad: '<ResizablePane.Panel minSize={80} maxSize={20}>',
      good: '<ResizablePane.Panel minSize={20} maxSize={80}>',
      reason: 'minSize must be less than or equal to maxSize. Inverted constraints break the resize clamp logic and produce unpredictable layout behavior.',
    },
    {
      title: 'Forgetting overflow-hidden on the container',
      bad: '<div><ResizablePane>...</ResizablePane></div>',
      good: '<div className="overflow-hidden border border-border rounded-surface"><ResizablePane>...</ResizablePane></div>',
      reason: 'The parent container must have overflow-hidden (and a defined height for vertical layouts). Without it, resized panels can overflow the viewport and cause layout shifts.',
    },
  ],
};
