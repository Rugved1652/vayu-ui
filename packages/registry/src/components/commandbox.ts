import { ComponentRegistryEntry } from '../types.js';

export const commandBoxEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'command-box',
  name: 'CommandBox',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A command palette component with fuzzy search, keyboard navigation, grouping, and overlay support using the compound component pattern.',
  longDescription:
    'The CommandBox is a combobox-driven command palette inspired by VS Code and Raycast. It uses the compound component pattern (CommandBox.Input, CommandBox.List, CommandBox.Item, CommandBox.Group, CommandBox.Empty, CommandBox.Separator, CommandBox.Overlay) to compose flexible command interfaces. It supports controlled and uncontrolled open state, fuzzy search filtering with custom filter functions, keyboard navigation with arrow keys and shortcuts, item grouping with labels, loading states, disabled items, and an overlay mode that uses a portal with backdrop. All interactions follow WAI-ARIA combobox/listbox patterns for full screen reader accessibility.',
  tags: [
    'command',
    'palette',
    'search',
    'combobox',
    'keyboard',
    'shortcut',
    'overlay',
    'menu',
    'navigation',
    'fuzzy',
    'command-palette',
  ],
  useCases: [
    'Application-wide command palette triggered by a keyboard shortcut (e.g. Cmd+K)',
    'Searchable list of actions, navigation links, or documents with grouped results',
    'Inline search/filter dropdown embedded within a page or panel without an overlay backdrop',
    'Quick-access menu for power users who prefer keyboard-driven workflows',
    'Document or page search with categorized results and keyboard navigation',
    'Action selector in IDEs, dashboards, or complex tools with many available commands',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'CommandBox',
  files: [
    { name: 'CommandBox.tsx', description: 'Root component managing open state, search filtering, keyboard navigation, and context provider' },
    { name: 'CommandBoxInput.tsx', description: 'Combobox input with search icon, keyboard arrow navigation, and ARIA combobox attributes' },
    { name: 'CommandBoxList.tsx', description: 'Listbox container with configurable max height and ARIA listbox role' },
    { name: 'CommandBoxItem.tsx', description: 'Option item with icon, description, keyboard shortcuts, highlight state, and ARIA option role' },
    { name: 'CommandBoxGroup.tsx', description: 'Labeled group container that auto-hides during search when no items match' },
    { name: 'CommandBoxEmpty.tsx', description: 'Empty state shown when no results match the search query' },
    { name: 'CommandBoxSeparator.tsx', description: 'Visual divider between groups that hides during single-group searches' },
    { name: 'CommandBoxOverlay.tsx', description: 'Portal-based overlay backdrop that closes on click and locks body scroll' },
    { name: 'types.ts', description: 'TypeScript type definitions for all CommandBox props, context, and item data' },
    { name: 'hooks.ts', description: 'React context, group context, useCommandBox hook, and fuzzy search scoring utility' },
    { name: 'index.ts', description: 'Barrel export assembling the compound component and re-exporting all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'CommandBox',
  subComponents: [
    {
      name: 'Input',
      fileName: 'CommandBoxInput.tsx',
      description: 'Combobox input field with search icon, handling arrow key navigation, Enter selection, and Home/End jumps',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          defaultValue: "'Type a command or search...'",
          description: 'Placeholder text shown in the search input',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom icon replacing the default Search icon in the input',
        },
      ],
    },
    {
      name: 'List',
      fileName: 'CommandBoxList.tsx',
      description: 'Scrollable listbox container with configurable max height and ARIA listbox role',
      props: [
        {
          name: 'maxHeight',
          type: 'string',
          required: false,
          defaultValue: "'320px'",
          description: 'Maximum height of the list area as a CSS value (e.g. "320px", "50vh")',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'CommandBoxItem.tsx',
      description: 'Selectable option with icon, description, keyboard shortcut display, highlight/disabled states, and ARIA option role',
      props: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Unique identifier for this item, used for selection, registration, and keyboard navigation',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the item is visible but non-interactive with reduced opacity',
        },
        {
          name: 'shortcut',
          type: 'string[]',
          required: false,
          description: 'Keyboard shortcut keys displayed on the right side of the item (e.g. ["⌘", "K"])',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element displayed on the left side of the item',
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Secondary text shown below the item title for additional context',
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Item title used for search filtering; falls back to children text content',
        },
      ],
    },
    {
      name: 'Group',
      fileName: 'CommandBoxGroup.tsx',
      description: 'Labeled group of items with a visible header; auto-hides when no items match the search query',
      props: [
        {
          name: 'label',
          type: 'string',
          required: true,
          description: 'Group header label displayed above the grouped items',
        },
      ],
    },
    {
      name: 'Empty',
      fileName: 'CommandBoxEmpty.tsx',
      description: 'Empty state message displayed when the search query returns no results',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom empty state content; defaults to "No results found"',
        },
      ],
    },
    {
      name: 'Separator',
      fileName: 'CommandBoxSeparator.tsx',
      description: 'Visual horizontal divider between groups; auto-hides during single-group filtered searches',
      props: [],
    },
    {
      name: 'Overlay',
      fileName: 'CommandBoxOverlay.tsx',
      description: 'Portal-based overlay wrapper that renders children in a centered modal with backdrop click-to-close',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content rendered inside the centered overlay portal',
        },
      ],
    },
  ],
  hooks: ['useKeyPress', 'useLockBodyScroll', 'useOnClickOutside'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state; use with onOpenChange for fully controlled behavior',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial open state for uncontrolled usage',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the open state changes, useful for controlled mode',
    },
    {
      name: 'onSelect',
      type: '(item: CommandBoxItemData) => void',
      required: false,
      description: 'Callback fired when an item is selected, receiving the item data object',
    },
    {
      name: 'filter',
      type: '((item: CommandBoxItemData, search: string) => number) | null',
      required: false,
      description: 'Custom filter function returning a relevance score (0–100); defaults to built-in fuzzy search',
    },
    {
      name: 'showShortcuts',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, displays keyboard shortcut badges on items that have the shortcut prop',
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, indicates the command box is loading; suppresses the empty state',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variants or size props — uses fixed design system styling

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls visibility of the command box. Supports both controlled (open + onOpenChange) and uncontrolled (defaultOpen) modes.',
    },
    {
      name: 'loading',
      prop: 'loading',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, indicates async loading. Suppresses the empty state so a custom loading indicator can be shown instead.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applies to individual CommandBox.Item elements. Disabled items are visible but non-interactive with reduced opacity and pointer-events-none.',
    },
    {
      name: 'highlighted',
      prop: 'highlightedIndex',
      isBoolean: false,
      values: ['number (0 to items.length - 1)'],
      description: 'Internally managed index tracking which item is visually highlighted via arrow key navigation. Applied as data-highlighted attribute and bg-brand/90 styling.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the command box opens or closes, including via Escape key, backdrop click, or programmatic setOpen',
    },
    {
      name: 'onSelect',
      signature: '(item: CommandBoxItemData) => void',
      description: 'Fired when an item is selected via Enter key, click, or Space key. Receives the full CommandBoxItemData object with id, title, description, icon, shortcut, group, disabled, onSelect, and data fields.',
    },
    {
      name: 'onKeyDown (Input)',
      signature: '(event: React.KeyboardEvent<HTMLInputElement>) => void',
      description: 'Internal handler on the input for ArrowDown (next), ArrowUp (previous), Enter (select), Home (first), End (last)',
    },
    {
      name: 'onKeyDown (Item)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Internal handler on each item for Enter and Space to trigger selection',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role="combobox" (Input)',
        description: 'Identifies the input as a combobox widget that controls a listbox popup',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (Input)',
        description: 'Set to true when the command box is open, indicating the listbox popup is visible',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup="listbox" (Input)',
        description: 'Declares that the combobox controls a listbox element',
        managedByComponent: true,
      },
      {
        name: 'aria-controls (Input)',
        description: 'References the listbox element ID for programmatic association between combobox and listbox',
        managedByComponent: true,
      },
      {
        name: 'aria-activedescendant (Input)',
        description: 'References the currently highlighted item ID, keeping screen reader focus in sync with visual highlight',
        managedByComponent: true,
      },
      {
        name: 'aria-autocomplete="list" (Input)',
        description: 'Indicates the combobox provides list-style autocomplete suggestions',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Search commands" (Input)',
        description: 'Provides an accessible name for the search input',
        managedByComponent: true,
      },
      {
        name: 'role="listbox" (List)',
        description: 'Identifies the list container as a listbox widget',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Command suggestions" (List)',
        description: 'Provides an accessible name for the listbox',
        managedByComponent: true,
      },
      {
        name: 'role="option" (Item)',
        description: 'Identifies each item as an option within the listbox',
        managedByComponent: true,
      },
      {
        name: 'aria-selected (Item)',
        description: 'Set to true when the item is currently highlighted via keyboard navigation',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled (Item)',
        description: 'Set to true on disabled items to communicate non-interactive state to assistive technology',
        managedByComponent: true,
      },
      {
        name: 'role="group" (Group)',
        description: 'Identifies the group container as a group of related options',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Group)',
        description: 'Set to the group label value, providing an accessible name for the option group',
        managedByComponent: true,
      },
      {
        name: 'role="status" (Empty)',
        description: 'Identifies the empty state message as a live status region',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite" (Empty)',
        description: 'Announces "no results" messages to screen readers without interrupting current speech',
        managedByComponent: true,
      },
      {
        name: 'role="separator" (Separator)',
        description: 'Identifies the separator as a structural divider between groups',
        managedByComponent: true,
      },
      {
        name: 'aria-orientation="horizontal" (Separator)',
        description: 'Declares the separator orientation as horizontal',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden="true" (Overlay backdrop)',
        description: 'Hides the backdrop overlay from the accessibility tree since it is purely decorative',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        behavior: 'Moves highlight to the next item; cycles to the first item from the last',
      },
      {
        key: 'ArrowUp',
        behavior: 'Moves highlight to the previous item; cycles to the last item from the first',
      },
      {
        key: 'Enter',
        behavior: 'Selects the currently highlighted item and fires the onSelect callback',
      },
      {
        key: 'Escape',
        behavior: 'Closes the command box and fires onOpenChange with false',
      },
      {
        key: 'Home',
        behavior: 'Moves highlight to the first item in the list',
      },
      {
        key: 'End',
        behavior: 'Moves highlight to the last item in the list',
      },
      {
        key: 'Space (on focused Item)',
        behavior: 'Selects the focused item, same as Enter',
      },
      {
        key: 'Custom shortcuts',
        behavior: 'Registered via useKeyPress on the root; triggers the corresponding item\'s onSelect callback',
      },
    ],
    focusManagement:
      'The input is automatically focused when the command box opens. Keyboard navigation moves a visual highlight between items using aria-activedescendant, keeping DOM focus on the input. When using overlay mode, body scroll is locked and clicking the backdrop closes the palette.',
    wcagLevel: 'AA',
    notes:
      'Follows the WAI-ARIA combobox pattern with listbox popup. The input uses role="combobox" with aria-controls pointing to the listbox, and aria-activedescendant tracks the highlighted option. Items use role="option" with aria-selected. Groups use role="group" with aria-label. The empty state uses role="status" with aria-live="polite" for dynamic announcements. All items have a minimum height of 44px for touch target compliance.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'lucide-react' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Buttons commonly trigger the command palette open state (e.g. "Open Command Box" button)',
    },
    {
      slug: 'modal',
      reason: 'Similar overlay pattern; CommandBox.Overlay uses portal-based rendering like modals',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltips can display keyboard shortcut hints on trigger buttons that open the command palette',
    },
    {
      slug: 'card',
      reason: 'Cards serve as containers for inline CommandBox instances without overlay',
    },
    {
      slug: 'text-input',
      reason: 'TextInput pairs with CommandBox in search-driven UIs where one triggers the other',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Command Palette with Overlay',
      description: 'A full command palette triggered by keyboard shortcut with overlay backdrop, grouped items, and shortcuts.',
      code: `import { useState } from 'react';
import { CommandBox, Button } from 'vayu-ui';
import { useKeyPress } from 'vayu-ui';
import { Home, Search, Settings, Plus } from 'lucide-react';

export default function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  useKeyPress([
    {
      keys: ['Ctrl', 'Shift', 'P'],
      callback: (e) => {
        e.preventDefault();
        setOpen((prev) => !prev);
      },
    },
  ]);

  const handleSelect = (item: { id: string; title: string }) => {
    console.log('Selected:', item);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open Command Box
      </Button>

      <CommandBox open={open} onOpenChange={setOpen} onSelect={handleSelect}>
        <CommandBox.Overlay>
          <CommandBox.Input placeholder="Type a command or search..." />
          <CommandBox.List>
            <CommandBox.Group label="Navigation">
              <CommandBox.Item id="home" shortcut={['⌘', 'H']} icon={<Home className="w-4 h-4" />}>
                Go to Home
              </CommandBox.Item>
              <CommandBox.Item id="search" shortcut={['⌘', 'S']} icon={<Search className="w-4 h-4" />}>
                Search
              </CommandBox.Item>
            </CommandBox.Group>

            <CommandBox.Separator />

            <CommandBox.Group label="Actions">
              <CommandBox.Item id="new-file" shortcut={['⌘', 'N']} icon={<Plus className="w-4 h-4" />}>
                New File
              </CommandBox.Item>
              <CommandBox.Item id="settings" shortcut={['⌘', ',']} icon={<Settings className="w-4 h-4" />}>
                Open Settings
              </CommandBox.Item>
            </CommandBox.Group>

            <CommandBox.Empty>No commands found. Try a different search.</CommandBox.Empty>
          </CommandBox.List>
        </CommandBox.Overlay>
      </CommandBox>
    </>
  );
}`,
      tags: ['overlay', 'keyboard-shortcut', 'command-palette', 'groups', 'shortcuts'],
    },
    {
      title: 'Inline CommandBox',
      description: 'An embedded command box without overlay backdrop, useful inside panels or cards.',
      code: `import { CommandBox } from 'vayu-ui';
import { User, Mail, Calendar, Star, Trash2 } from 'lucide-react';

export default function InlineDemo() {
  return (
    <div className="border border-border rounded-overlay overflow-hidden">
      <CommandBox>
        <CommandBox.Input placeholder="Search commands..." />
        <CommandBox.List maxHeight="240px">
          <CommandBox.Item id="profile" icon={<User className="w-4 h-4" />} description="View and edit your profile">
            View Profile
          </CommandBox.Item>
          <CommandBox.Item id="email" icon={<Mail className="w-4 h-4" />} description="Open email inbox">
            Email Inbox
          </CommandBox.Item>
          <CommandBox.Item id="calendar" icon={<Calendar className="w-4 h-4" />} description="View your calendar">
            Calendar
          </CommandBox.Item>
          <CommandBox.Item id="starred" icon={<Star className="w-4 h-4" />} description="View starred items">
            Starred Items
          </CommandBox.Item>
          <CommandBox.Item id="trash" icon={<Trash2 className="w-4 h-4" />} description="View deleted items" disabled>
            Trash (Disabled)
          </CommandBox.Item>
          <CommandBox.Empty>No results</CommandBox.Empty>
        </CommandBox.List>
      </CommandBox>
    </div>
  );
}`,
      tags: ['inline', 'embedded', 'descriptions', 'disabled'],
    },
    {
      title: 'With Descriptions and Groups',
      description: 'Grouped items with descriptions and shortcuts hidden, ideal for documentation search.',
      code: `import { CommandBox } from 'vayu-ui';
import { FileText, Download, Layers, Code, Zap } from 'lucide-react';

export default function DescriptionsDemo() {
  return (
    <div className="border border-border rounded-overlay overflow-hidden">
      <CommandBox showShortcuts={false}>
        <CommandBox.Input placeholder="Search documentation..." />
        <CommandBox.List maxHeight="280px">
          <CommandBox.Group label="Getting Started">
            <CommandBox.Item
              id="intro"
              icon={<FileText className="w-4 h-4" />}
              description="Learn the basics of the component library"
            >
              Introduction
            </CommandBox.Item>
            <CommandBox.Item
              id="installation"
              icon={<Download className="w-4 h-4" />}
              description="Install and configure VedUI in your project"
            >
              Installation Guide
            </CommandBox.Item>
          </CommandBox.Group>

          <CommandBox.Separator />

          <CommandBox.Group label="Core Concepts">
            <CommandBox.Item
              id="components"
              icon={<Layers className="w-4 h-4" />}
              description="Understanding the compound component pattern"
            >
              Components
            </CommandBox.Item>
            <CommandBox.Item
              id="theming"
              icon={<Code className="w-4 h-4" />}
              description="Customize the look and feel with design tokens"
            >
              Theming
            </CommandBox.Item>
            <CommandBox.Item
              id="hooks"
              icon={<Zap className="w-4 h-4" />}
              description="Reusable hooks for common patterns"
            >
              Hooks
            </CommandBox.Item>
          </CommandBox.Group>

          <CommandBox.Empty>No documentation found for your search.</CommandBox.Empty>
        </CommandBox.List>
      </CommandBox>
    </div>
  );
}`,
      tags: ['descriptions', 'groups', 'documentation', 'no-shortcuts'],
    },
    {
      title: 'Simple List',
      description: 'A minimal command box without groups or shortcuts, for flat option lists.',
      code: `import { CommandBox } from 'vayu-ui';

export default function SimpleListDemo() {
  return (
    <div className="border border-border rounded-overlay overflow-hidden">
      <CommandBox showShortcuts={false}>
        <CommandBox.Input placeholder="Quick search..." />
        <CommandBox.List maxHeight="200px">
          <CommandBox.Item id="opt1">Option One</CommandBox.Item>
          <CommandBox.Item id="opt2">Option Two</CommandBox.Item>
          <CommandBox.Item id="opt3">Option Three</CommandBox.Item>
          <CommandBox.Item id="opt4">Option Four</CommandBox.Item>
          <CommandBox.Item id="opt5">Option Five</CommandBox.Item>
          <CommandBox.Item id="opt6" disabled>
            Option Six (Disabled)
          </CommandBox.Item>
          <CommandBox.Empty>No options found</CommandBox.Empty>
        </CommandBox.List>
      </CommandBox>
    </div>
  );
}`,
      tags: ['simple', 'minimal', 'flat-list', 'disabled'],
    },
    {
      title: 'Loading State',
      description: 'Command box in loading state with disabled input and a spinner, for async command loading.',
      code: `import { CommandBox } from 'vayu-ui';

export default function LoadingDemo() {
  return (
    <div className="border border-border rounded-overlay overflow-hidden">
      <CommandBox showShortcuts={false} loading={true}>
        <CommandBox.Input placeholder="Loading commands..." disabled />
        <CommandBox.List>
          <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="py-8 text-center text-muted-content text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
              Loading commands...
            </div>
          </div>
        </CommandBox.List>
      </CommandBox>
    </div>
  );
}`,
      tags: ['loading', 'async', 'spinner', 'disabled-input'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using CommandBox without an id on Items',
      bad: '<CommandBox.Item>Home</CommandBox.Item>',
      good: '<CommandBox.Item id="home">Home</CommandBox.Item>',
      reason: 'The id prop is required on every Item for registration, keyboard navigation, ARIA activedescendant, and selection callbacks. Without it, the item cannot be tracked or selected.',
    },
    {
      title: 'Using CommandBox.Overlay without controlled open state',
      bad: '<CommandBox><CommandBox.Overlay>...</CommandBox.Overlay></CommandBox>',
      good: '<CommandBox open={open} onOpenChange={setOpen}><CommandBox.Overlay>...</CommandBox.Overlay></CommandBox>',
      reason: 'The Overlay renders via a portal and needs to know when to show/hide. Without controlled or defaultOpen state, the overlay has no trigger mechanism and the command box will remain invisible.',
    },
    {
      title: 'Nesting interactive elements inside CommandBox.Item',
      bad: '<CommandBox.Item id="link"><a href="/page">Go to page</a></CommandBox.Item>',
      good: '<CommandBox.Item id="link" onSelect={() => router.push("/page")}>Go to page</CommandBox.Item>',
      reason: 'Items already handle click and keyboard selection. Nesting interactive elements (links, buttons, inputs) breaks the ARIA option role and causes double-activation or focus management issues.',
    },
    {
      title: 'Using CommandBox.Group without a label',
      bad: '<CommandBox.Group><CommandBox.Item id="x">Item</CommandBox.Item></CommandBox.Group>',
      good: '<CommandBox.Group label="Actions"><CommandBox.Item id="x">Item</CommandBox.Item></CommandBox.Group>',
      reason: 'The label prop is required for the group\'s aria-label attribute. Without it, screen readers cannot identify the group, violating accessibility requirements.',
    },
    {
      title: 'Placing CommandBox.Input outside the list context',
      bad: '<CommandBox><CommandBox.Input /></CommandBox><CommandBox.List>...</CommandBox.List>',
      good: '<CommandBox><CommandBox.Input /><CommandBox.List>...</CommandBox.List></CommandBox>',
      reason: 'Input, List, Item, Group, and Empty all depend on the CommandBox context provider. Placing them outside the CommandBox root will crash because useCommandBox() returns undefined.',
    },
  ],
};
