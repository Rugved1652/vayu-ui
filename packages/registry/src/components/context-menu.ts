import { ComponentRegistryEntry } from '../types.js';

export const contextMenuEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'context-menu',
  name: 'ContextMenu',
  type: 'component',
  category: 'overlay',
  capabilities: ['overlay-primitive'],

  // ── Description ───────────────────────────────────────
  description:
    'An accessible right-click context menu with keyboard navigation, typeahead search, submenus, checkbox and radio items, and viewport-aware positioning.',
  longDescription:
    'The ContextMenu component renders a floating menu on right-click (or ContextMenu key / Shift+F10) using React portals. It uses the compound component pattern (ContextMenu.Trigger, ContextMenu.Content, ContextMenu.Item, ContextMenu.CheckboxItem, ContextMenu.RadioGroup, ContextMenu.RadioItem, ContextMenu.Sub, ContextMenu.SubTrigger, ContextMenu.SubContent, ContextMenu.Separator, ContextMenu.Label) to compose rich menu layouts. It supports Arrow key navigation, Home/End focus jumps, Escape dismissal, typeahead search to jump to items, viewport clamping to prevent overflow, body scroll locking while open, and cascading submenus with hover and keyboard activation. Items support icons, keyboard shortcuts, disabled states, and destructive styling.',
  tags: [
    'context-menu',
    'right-click',
    'menu',
    'overlay',
    'popup',
    'portal',
    'submenu',
    'checkbox',
    'radio',
    'keyboard-navigation',
    'typeahead',
    'a11y',
  ],
  useCases: [
    'Right-click context menus on files, cards, or list items for actions like copy, paste, delete, rename',
    'Application menus with nested submenus for organizing large sets of actions (Edit > Find > Replace)',
    'Toggle menus with checkbox items for showing/hiding UI panels, columns, or view options',
    'Single-select menus with radio items for switching themes, zoom levels, or sort modes',
    'Destructive action confirmation menus with visual emphasis on dangerous items',
    'Keyboard-accessible menus triggered via the ContextMenu key or Shift+F10 for power users',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'ContextMenu',
  files: [
    {
      name: 'ContextMenu.tsx',
      description:
        'Root component providing ContextMenuContext, open/close state management, body scroll lock, click-outside dismissal, Escape handling, and cursor position tracking',
    },
    {
      name: 'ContextMenuTrigger.tsx',
      description:
        'Trigger area that opens the menu on right-click, left-click dismissal, and ContextMenu / Shift+F10 keyboard activation',
    },
    {
      name: 'ContextMenuContent.tsx',
      description:
        'Portal-rendered menu container with viewport clamping, focus trapping, typeahead support, and scroll/resize repositioning',
    },
    {
      name: 'ContextMenuItem.tsx',
      description:
        'Selectable menu item with icon, shortcut label, destructive styling, Arrow/Home/End keyboard navigation, and click selection',
    },
    {
      name: 'ContextMenuCheckBoxItem.tsx',
      description:
        'Checkbox menu item with checked state, onCheckedChange callback, icon, shortcut, and aria-checked support',
    },
    {
      name: 'ContextMenuRadioGroup.tsx',
      description:
        'Radio group wrapper providing RadioGroupContext for managing a single selected value among RadioItem children',
    },
    {
      name: 'ContextMenuSub.tsx',
      description:
        'Submenu wrapper providing SubContext with open/close timeouts, typeahead, and trigger/subMenu ref management',
    },
    {
      name: 'ContextMenuSeparator.tsx',
      description:
        'Visual separator line with role="separator" and aria-orientation="horizontal" for grouping menu items',
    },
    {
      name: 'ContextMenuLabel.tsx',
      description:
        'Non-interactive menu section label with uppercase, semibold, muted styling and role="presentation"',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript interfaces for all props, context values, focus selectors, and viewport constants',
    },
    {
      name: 'hooks.ts',
      description:
        'Context hooks (useContextMenuCtx, useSubCtx), typeahead hook, item key-down hook, focusable item helper, and shared base item styles',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component via Object.assign and re-exporting all types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'ContextMenu',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'ContextMenuTrigger.tsx',
      description:
        'Area that opens the context menu on right-click or ContextMenu / Shift+F10 keyboard activation. Left-click closes an already-open menu.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content rendered inside the trigger area',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, disables all trigger interactions (right-click, keyboard, left-click)',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'ContextMenuContent.tsx',
      description:
        'Portal-rendered menu container positioned at the cursor with viewport clamping, focus management, and typeahead support.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Menu items, separators, labels, and submenus rendered inside the content',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          required: false,
          defaultValue: "'start'",
          description: 'Horizontal alignment of the menu relative to the cursor position',
          options: ['start', 'center', 'end'],
        },
        {
          name: 'sideOffset',
          type: 'number',
          required: false,
          defaultValue: '4',
          description: 'Pixel offset from the cursor position when positioning the menu',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'ContextMenuItem.tsx',
      description:
        'Single selectable menu item. Closes the menu on click or Enter/Space. Supports icons, keyboard shortcuts, disabled state, and destructive styling.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text rendered inside the menu item',
        },
        {
          name: 'onSelect',
          type: '() => void',
          required: false,
          description: 'Callback fired when the item is selected via click or keyboard activation',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the item is non-interactive and visually dimmed',
        },
        {
          name: 'destructive',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, applies destructive color styling (text-destructive) to the item',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Optional icon rendered to the left of the item label',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description: 'Optional keyboard shortcut text rendered to the right of the item label',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      fileName: 'ContextMenuCheckBoxItem.tsx',
      description:
        'Menu item with a checkbox indicator. Toggles checked state on click without closing the menu. Supports indeterminate state via parent cascade logic.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text rendered inside the checkbox item',
        },
        {
          name: 'checked',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Whether the checkbox is currently checked',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          required: false,
          description: 'Callback fired when the checked state changes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the checkbox item is non-interactive',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Optional icon rendered to the left of the checkbox item label',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description: 'Optional keyboard shortcut text rendered to the right of the label',
        },
      ],
    },
    {
      name: 'RadioGroup',
      fileName: 'ContextMenuRadioGroup.tsx',
      description:
        'Wrapper that provides radio group context. Children should be ContextMenu.RadioItem elements.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'RadioItem children managed by this group',
        },
        {
          name: 'value',
          type: 'string',
          required: false,
          description: 'Currently selected radio value',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          required: false,
          description: 'Callback fired when a radio item is selected',
        },
      ],
    },
    {
      name: 'RadioItem',
      fileName: 'ContextMenuRadioGroup.tsx',
      description:
        'Single-select radio menu item rendered inside a RadioGroup. Displays a filled circle when selected.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text rendered inside the radio item',
        },
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Unique value identifying this radio option',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the radio item is non-interactive',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Optional icon rendered to the left of the radio item label',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description: 'Optional keyboard shortcut text rendered to the right of the label',
        },
      ],
    },
    {
      name: 'Sub',
      fileName: 'ContextMenuSub.tsx',
      description:
        'Wrapper that provides submenu context for SubTrigger and SubContent. Manages open/close timeouts and typeahead.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'SubTrigger and SubContent components composing the submenu',
        },
      ],
    },
    {
      name: 'SubTrigger',
      fileName: 'ContextMenuSub.tsx',
      description:
        'Menu item that opens a nested submenu on hover or ArrowRight/Enter/Space. Displays a right-facing chevron indicator.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text rendered inside the submenu trigger',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the submenu trigger is non-interactive',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Optional icon rendered to the left of the submenu trigger label',
        },
      ],
    },
    {
      name: 'SubContent',
      fileName: 'ContextMenuSub.tsx',
      description:
        'Portal-rendered submenu container positioned relative to its SubTrigger with viewport clamping, focus management, and ArrowLeft to close.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Menu items rendered inside the submenu',
        },
      ],
    },
    {
      name: 'Separator',
      fileName: 'ContextMenuSeparator.tsx',
      description:
        'Horizontal line separating groups of menu items. Uses role="separator" for screen readers.',
      props: [],
    },
    {
      name: 'Label',
      fileName: 'ContextMenuLabel.tsx',
      description:
        'Non-interactive section label with uppercase, semibold, muted styling. Uses role="presentation".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text content',
        },
      ],
    },
  ],
  hooks: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'ContextMenu sub-components (Trigger, Content, and their children) composing the full context menu UI',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the menu open state changes',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No visual variants or sizes — styling is fixed via design tokens.

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'isOpen',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Whether the context menu is visible. Managed internally by the root component and exposed via onOpenChange.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the menu opens (right-click, ContextMenu key) or closes (Escape, click outside, item select)',
    },
    {
      name: 'onSelect (Item)',
      signature: '() => void',
      description: 'Fired when a ContextMenu.Item is clicked or activated via Enter/Space',
    },
    {
      name: 'onCheckedChange (CheckboxItem)',
      signature: '(checked: boolean) => void',
      description: 'Fired when a ContextMenu.CheckboxItem is toggled',
    },
    {
      name: 'onValueChange (RadioGroup)',
      signature: '(value: string) => void',
      description: 'Fired when a ContextMenu.RadioItem inside a RadioGroup is selected',
    },
    {
      name: 'onContextMenu (Trigger)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Native right-click event intercepted by the trigger to open the menu',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'menu',
    attributes: [
      {
        name: 'role',
        description: 'Set to "menu" on ContextMenu.Content and "menu" on SubContent, informing screen readers this is a menu',
        managedByComponent: true,
      },
      {
        name: 'aria-orientation',
        description: 'Set to "vertical" on the menu container to indicate vertical item layout',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup',
        description: 'Set to "menu" on the trigger element to indicate it opens a menu',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on SubTrigger to indicate whether the submenu is open or closed',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set on disabled menu items (Item, CheckboxItem, RadioItem, SubTrigger) to indicate non-interactivity',
        managedByComponent: true,
      },
      {
        name: 'aria-checked',
        description: 'Set on CheckboxItem and RadioItem to reflect their selection state',
        managedByComponent: true,
      },
      {
        name: 'role="separator"',
        description: 'Applied to Separator so screen readers announce it as a structural divider',
        managedByComponent: true,
      },
      {
        name: 'role="group"',
        description: 'Applied to RadioGroup wrapper to group radio items semantically',
        managedByComponent: true,
      },
      {
        name: 'tabIndex',
        description: 'Set to -1 on all menu items so focus is managed programmatically rather than via natural tab order',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the menu (or submenu) and returns focus to the trigger element',
      },
      {
        key: 'ArrowDown',
        behavior: 'Moves focus to the next focusable item in the menu; wraps from last to first',
      },
      {
        key: 'ArrowUp',
        behavior: 'Moves focus to the previous focusable item in the menu; wraps from first to last',
      },
      {
        key: 'ArrowRight',
        behavior: 'Opens a submenu if focused on a SubTrigger, or moves focus to the first item in an open submenu',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Closes an open submenu and returns focus to its SubTrigger',
      },
      {
        key: 'Enter',
        behavior: 'Selects a menu item, toggles a checkbox, or opens a submenu',
      },
      {
        key: 'Space',
        behavior: 'Selects a menu item, toggles a checkbox, or opens a submenu',
      },
      {
        key: 'Home',
        behavior: 'Moves focus to the first focusable item in the current menu',
      },
      {
        key: 'End',
        behavior: 'Moves focus to the last focusable item in the current menu',
      },
      {
        key: 'ContextMenu / Shift+F10',
        behavior: 'Opens the context menu at the trigger center when using keyboard navigation',
      },
      {
        key: 'Typeahead (A–Z, 0–9)',
        behavior: 'Moves focus to the next item whose label starts with the typed character sequence',
      },
    ],
    focusManagement:
      'When the menu opens, the first focusable item is automatically focused. Tab is intentionally disabled within the menu; all navigation uses Arrow keys, Home, End, Enter, and Space. When the menu closes, focus returns to the page naturally. Submenus open on hover (with delay) or ArrowRight, and close on ArrowLeft or Escape.',
    wcagLevel: 'AA',
    notes:
      'The menu uses role="menu" with aria-orientation="vertical" and manages focus via roving tabIndex (-1 on all items). Typeahead search accumulates keystrokes for 500ms to match item labels. Viewport clamping ensures the menu is always fully visible. Body scroll is locked while any context menu is open.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [
    {
      slug: 'use-on-click-outside',
      reason:
        'ContextMenu uses useOnClickOutside to close when clicking outside',
    },
    {
      slug: 'use-lock-body-scroll',
      reason:
        'ContextMenu uses useLockBodyScroll to prevent body scrolling when open',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason:
        'Buttons are commonly used as the visual content inside ContextMenu.Trigger and as action targets within menu items',
    },
    {
      slug: 'typography',
      reason: 'Typography components can be used inside Trigger or for rich content labels',
    },
    {
      slug: 'divider',
      reason: 'Divider can be used as an alternative visual separator inside complex menus',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltips can describe menu items with icons that lack explicit text labels',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Context Menu',
      description:
        'A simple right-click menu with copy, paste, and delete actions using ContextMenu.Item.',
      code: `import { ContextMenu } from 'vayu-ui';

export default function BasicContextMenu() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger className="p-8 bg-surface border border-border rounded-surface text-center">
        Right-click here
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item onSelect={() => console.log('Copy')}>Copy</ContextMenu.Item>
        <ContextMenu.Item onSelect={() => console.log('Paste')}>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item destructive onSelect={() => console.log('Delete')}>
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}`,
      tags: ['basic', 'right-click', 'item', 'destructive'],
    },
    {
      title: 'Context Menu with Icons and Shortcuts',
      description:
        'Menu items with Lucide icons and keyboard shortcut labels for a professional application menu.',
      code: `import { ContextMenu } from 'vayu-ui';
import { Copy, ClipboardPaste, Trash2, Scissors } from 'lucide-react';

export default function IconShortcutMenu() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger className="p-8 bg-surface border border-border rounded-surface text-center">
        Right-click for actions
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item icon={<Copy className="w-4 h-4" />} shortcut="Ctrl+C" onSelect={() => console.log('Copy')}>
          Copy
        </ContextMenu.Item>
        <ContextMenu.Item icon={<Scissors className="w-4 h-4" />} shortcut="Ctrl+X" onSelect={() => console.log('Cut')}>
          Cut
        </ContextMenu.Item>
        <ContextMenu.Item icon={<ClipboardPaste className="w-4 h-4" />} shortcut="Ctrl+V" onSelect={() => console.log('Paste')}>
          Paste
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item
          icon={<Trash2 className="w-4 h-4" />}
          destructive
          shortcut="Del"
          onSelect={() => console.log('Delete')}
        >
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}`,
      tags: ['icons', 'shortcuts', 'lucide', 'actions'],
    },
    {
      title: 'Checkbox and Radio Items',
      description:
        'A context menu with checkbox toggles for view options and radio items for theme selection.',
      code: `import { useState } from 'react';
import { ContextMenu } from 'vayu-ui';

export default function CheckboxRadioMenu() {
  const [showGrid, setShowGrid] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState('system');

  return (
    <ContextMenu>
      <ContextMenu.Trigger className="p-8 bg-surface border border-border rounded-surface text-center">
        Right-click for settings
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Label>View Options</ContextMenu.Label>
        <ContextMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show Grid
        </ContextMenu.CheckboxItem>
        <ContextMenu.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
          Show Sidebar
        </ContextMenu.CheckboxItem>

        <ContextMenu.Separator />

        <ContextMenu.Label>Theme</ContextMenu.Label>
        <ContextMenu.RadioGroup value={theme} onValueChange={setTheme}>
          <ContextMenu.RadioItem value="light">Light</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="dark">Dark</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="system">System</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu>
  );
}`,
      tags: ['checkbox', 'radio', 'view-options', 'theme'],
    },
    {
      title: 'Nested Submenus',
      description:
        'A context menu with nested submenus for organizing actions into hierarchical groups.',
      code: `import { ContextMenu } from 'vayu-ui';

export default function SubmenuDemo() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger className="p-8 bg-surface border border-border rounded-surface text-center">
        Right-click for nested menu
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item onSelect={() => console.log('New File')}>New File</ContextMenu.Item>
        <ContextMenu.Item onSelect={() => console.log('Open')}>Open…</ContextMenu.Item>

        <ContextMenu.Separator />

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item onSelect={() => console.log('Export PNG')}>PNG</ContextMenu.Item>
            <ContextMenu.Item onSelect={() => console.log('Export JPG')}>JPG</ContextMenu.Item>
            <ContextMenu.Item onSelect={() => console.log('Export SVG')}>SVG</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item onSelect={() => console.log('Copy Link')}>Copy Link</ContextMenu.Item>
            <ContextMenu.Item onSelect={() => console.log('Email')}>Email</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
      </ContextMenu.Content>
    </ContextMenu>
  );
}`,
      tags: ['submenu', 'nested', 'hierarchy', 'export'],
    },
    {
      title: 'Controlled Open State',
      description:
        'Programmatically control the menu open state using onOpenChange for analytics or side effects.',
      code: `import { useState } from 'react';
import { ContextMenu } from 'vayu-ui';

export default function ControlledContextMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContextMenu onOpenChange={setIsOpen}>
      <ContextMenu.Trigger className="p-8 bg-surface border border-border rounded-surface text-center">
        {isOpen ? 'Menu is open' : 'Right-click here'}
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item onSelect={() => console.log('Action 1')}>Action 1</ContextMenu.Item>
        <ContextMenu.Item onSelect={() => console.log('Action 2')}>Action 2</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}`,
      tags: ['controlled', 'onOpenChange', 'state'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using ContextMenu without a Trigger',
      bad: '<ContextMenu><ContextMenu.Content>…</ContextMenu.Content></ContextMenu>',
      good: '<ContextMenu><ContextMenu.Trigger>…</ContextMenu.Trigger><ContextMenu.Content>…</ContextMenu.Content></ContextMenu>',
      reason:
        'Without a Trigger, there is no element to capture right-clicks or keyboard activation events. The menu will never open.',
    },
    {
      title: 'Nesting interactive elements inside Item',
      bad: '<ContextMenu.Item><button>Nested</button></ContextMenu.Item>',
      good: '<ContextMenu.Item onSelect={handleAction}>Action</ContextMenu.Item>',
      reason:
        'Nesting buttons, links, or other interactive elements inside a menuitem violates ARIA and HTML specs, breaks keyboard navigation, and causes focus management issues.',
    },
    {
      title: 'Forgetting to handle onSelect for actionable items',
      bad: '<ContextMenu.Item>Delete</ContextMenu.Item>',
      good: '<ContextMenu.Item onSelect={() => deleteItem()}>Delete</ContextMenu.Item>',
      reason:
        'Without an onSelect handler, clicking or pressing Enter/Space on an item does nothing. Users expect menu items to perform an action.',
    },
    {
      title: 'Using SubTrigger or SubContent outside Sub',
      bad: '<ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger>',
      good: '<ContextMenu.Sub><ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger><ContextMenu.SubContent>…</ContextMenu.SubContent></ContextMenu.Sub>',
      reason:
        'SubTrigger and SubContent rely on SubContext for open/close state, positioning, and typeahead. Using them outside Sub throws a runtime error.',
    },
    {
      title: 'Placing too many items in a single menu without grouping',
      bad: '<ContextMenu.Content>{items.map((i) => <ContextMenu.Item key={i}>{i}</ContextMenu.Item>)}</ContextMenu.Content>',
      good: '<ContextMenu.Content><ContextMenu.Label>Edit</ContextMenu.Label>…<ContextMenu.Separator /><ContextMenu.Label>View</ContextMenu.Label>…</ContextMenu.Content>',
      reason:
        'Long ungrouped menus are overwhelming and hard to navigate. Use Label and Separator to create logical sections and improve scannability.',
    },
  ],
};
