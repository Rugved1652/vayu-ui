import { ComponentRegistryEntry } from '../types.js';

export const menubarEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'menubar',
  name: 'Menubar',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'A compound menubar component with nested menus, keyboard navigation, checkbox items, radio groups, submenus, and full ARIA accessibility.',
  longDescription:
    'The Menubar component provides a horizontal or vertical navigation bar with dropdown menus, following the WAI-ARIA menubar pattern. It supports nested submenus with unlimited depth, checkbox items for toggle states, radio groups for single-choice selections, labeled groups, separators, icons, and keyboard shortcut display. Full keyboard navigation includes arrow keys, Home/End, Escape, Enter/Space, and typeahead. Menus render via portals to avoid clipping, position dynamically using element tracking, and close on outside clicks or Escape. All items support disabled and danger states.',
  tags: [
    'menubar',
    'menu',
    'navigation',
    'dropdown',
    'submenu',
    'context',
    'toolbar',
    'accessibility',
    'keyboard',
    'portal',
    'checkbox',
    'radio',
    'compound',
  ],
  useCases: [
    'Application-level navigation bar with File, Edit, View menus (VS Code, Figma style)',
    'Rich text editor toolbar menus with formatting options and keyboard shortcuts',
    'Settings panels with checkbox toggles and radio group selections in dropdown menus',
    'Context-aware actions with nested submenus for categorised operations',
    'Dangerous action menus that visually distinguish destructive items like Delete or Clear',
    'Dashboard or IDE layouts needing a compact, keyboard-navigable menu system',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'MenuBar',
  files: [
    {
      name: 'MenuBar.tsx',
      description:
        'Root menubar component managing active menu state, orientation, trigger registration, and outside-click/Escape handling',
    },
    {
      name: 'Menu.tsx',
      description:
        'Top-level menu with trigger button, dropdown panel rendered via Portal, positioning, and keyboard navigation',
    },
    {
      name: 'MenubarItem.tsx',
      description:
        'Menu item with icon, shortcut display, danger variant, and onSelect callback',
    },
    {
      name: 'MenubarCheckBoxItem.tsx',
      description:
        'Toggle menu item with checkmark indicator, checked/onCheckedChange controlled props',
    },
    {
      name: 'MenubarRadioGroup.tsx',
      description:
        'Contains MenuRadioGroup (group container with value/onValueChange) and MenuRadioItem (radio option with dot indicator)',
    },
    {
      name: 'MenubarSubMenu.tsx',
      description:
        'Nested submenu with hover-delay open/close, chevron indicator, and recursive keyboard navigation',
    },
    {
      name: 'MenubarLabel.tsx',
      description:
        'Non-interactive label for grouping menu items with role="presentation"',
    },
    {
      name: 'MenubarSeparator.tsx',
      description:
        'Visual divider between menu item groups with role="separator"',
    },
    {
      name: 'MenubarPortal.tsx',
      description:
        'Portal wrapper that renders children into document.body to avoid clipping',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for Orientation, MenubarContextValue, MenuContextValue, and menu item selector constants',
    },
    {
      name: 'hooks.ts',
      description:
        'Context providers, useMenubarContext, useMenuContext, useTypeahead, useFocusItems, and useMenuNavigation hooks',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export assembling the compound Menubar component with all sub-components and type exports',
    },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Menubar',
  subComponents: [
    {
      name: 'Menu',
      fileName: 'Menu.tsx',
      description:
        'Top-level dropdown menu with a trigger button and a portal-rendered panel',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description:
            'Menu items, separators, labels, submenus, and radio groups to render inside the dropdown',
        },
        {
          name: 'trigger',
          type: 'React.ReactNode',
          required: true,
          description:
            'Content displayed on the menubar that toggles the dropdown when clicked',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Disables the trigger button, preventing the menu from opening',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'SubMenu',
      fileName: 'MenubarSubMenu.tsx',
      description:
        'Nested submenu that opens to the right of its trigger on hover or keyboard activation',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description:
            'Items and separators rendered inside the nested submenu',
        },
        {
          name: 'trigger',
          type: 'React.ReactNode',
          required: true,
          description:
            'Content displayed as the submenu trigger label with a chevron indicator',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Disables the submenu trigger, preventing it from opening',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'Item',
      fileName: 'MenubarItem.tsx',
      description:
        'Clickable menu item with optional icon, keyboard shortcut, and danger styling',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label content for the menu item',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description:
            'Icon element rendered to the left of the label (aria-hidden)',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description:
            'Keyboard shortcut displayed to the right of the item (e.g. "⌘S")',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Disables the item and prevents interaction',
        },
        {
          name: 'danger',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Applies destructive styling (red text and hover) for dangerous actions',
        },
        {
          name: 'onSelect',
          type: '() => void',
          required: false,
          description:
            'Callback fired when the item is activated; closes all menus afterward',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'CheckboxItem',
      fileName: 'MenubarCheckBoxItem.tsx',
      description:
        'Toggle menu item with a checkmark indicator and controlled checked state',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label content for the checkbox item',
        },
        {
          name: 'checked',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Controlled checked state; when true, displays a checkmark indicator',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          required: false,
          description:
            'Callback fired when the checked state changes, receives the new boolean value',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description:
            'Icon element rendered to the left of the label (aria-hidden)',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description:
            'Keyboard shortcut displayed to the right of the item',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Disables the checkbox item and prevents interaction',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'RadioGroup',
      fileName: 'MenubarRadioGroup.tsx',
      description:
        'Container for radio items enforcing single selection with shared value state',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description:
            'MenuRadioItem components to render as radio options',
        },
        {
          name: 'value',
          type: 'string',
          required: false,
          description:
            'Currently selected value matching a child RadioItem value prop',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          required: false,
          description:
            'Callback fired when a radio item is selected, receives the item value',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'RadioItem',
      fileName: 'MenubarRadioGroup.tsx',
      description:
        'Single-choice menu item within a RadioGroup, displaying a dot indicator when selected',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label content for the radio item',
        },
        {
          name: 'value',
          type: 'string',
          required: true,
          description:
            'Unique value identifying this radio option within its RadioGroup',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description:
            'Icon element rendered to the left of the label (aria-hidden)',
        },
        {
          name: 'shortcut',
          type: 'string',
          required: false,
          description:
            'Keyboard shortcut displayed to the right of the item',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Disables the radio item and prevents interaction',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'Label',
      fileName: 'MenubarLabel.tsx',
      description:
        'Non-interactive section label for grouping related menu items',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Text content to display as a section heading',
        },
      ],
      supportsAsChild: false,
    },
    {
      name: 'Separator',
      fileName: 'MenubarSeparator.tsx',
      description:
        'Visual horizontal divider between menu item groups',
      props: [],
      supportsAsChild: false,
    },
  ],
  hooks: [
    'useMenubarContext',
    'useMenuContext',
    'useTypeahead',
    'useFocusItems',
    'useMenuNavigation',
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'Menu components (Menubar.Menu) to display as top-level menu entries in the bar',
    },
    {
      name: 'orientation',
      type: 'Orientation',
      required: false,
      defaultValue: "'horizontal'",
      description:
        'Layout direction of the menubar; horizontal arranges menus left-to-right, vertical stacks them top-to-bottom',
      options: ['horizontal', 'vertical'],
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'activeMenu (internal)',
      isBoolean: true,
      defaultValue: 'null (closed)',
      description:
        'Tracks which menu dropdown is currently visible; only one menu can be open at a time. Clicking a trigger toggles its menu; clicking outside or pressing Escape closes all menus.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Available on Menu trigger, Item, CheckboxItem, RadioItem, and SubMenu. Disables interaction, applies reduced opacity, and sets aria-disabled.',
    },
    {
      name: 'checked',
      prop: 'checked',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Controlled state on CheckboxItem; when true, displays a checkmark SVG indicator and sets aria-checked="true".',
    },
    {
      name: 'selected',
      prop: 'value (on RadioGroup)',
      isBoolean: false,
      description:
        'Determined by matching the RadioGroup value prop against each RadioItem value. The matching item shows a filled-circle indicator and aria-checked="true".',
    },
    {
      name: 'danger',
      prop: 'danger',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Applied to Item to indicate a destructive action; uses destructive color tokens for text and hover states.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onSelect',
      signature: '() => void',
      description:
        'Fired when a Menubar.Item is activated via click or keyboard; closes all menus after invocation',
    },
    {
      name: 'onCheckedChange',
      signature: '(checked: boolean) => void',
      description:
        'Fired when a CheckboxItem is toggled; receives the new boolean checked state',
    },
    {
      name: 'onValueChange',
      signature: '(value: string) => void',
      description:
        'Fired when a RadioItem is selected within a RadioGroup; receives the selected item value string',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'menubar',
    attributes: [
      {
        name: 'aria-orientation',
        description:
          'Set on the root menubar element to declare layout direction ("horizontal" or "vertical")',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup',
        description:
          'Set to "true" on Menu and SubMenu trigger buttons to indicate they open a popup',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description:
          'Set on trigger buttons; true when the associated menu/submenu is open, false when closed',
        managedByComponent: true,
      },
      {
        name: 'aria-controls',
        description:
          'Links a trigger button to its dropdown panel ID when open; omitted when closed',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description:
          'Set on each dropdown panel (role="menu") referencing its trigger button ID',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description:
          'Set on disabled menu items, triggers, and checkbox/radio items alongside native disabled',
        managedByComponent: true,
      },
      {
        name: 'aria-checked',
        description:
          'Set on CheckboxItem (role="menuitemcheckbox") and RadioItem (role="menuitemradio") to reflect checked/selected state',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter / Space',
        behavior:
          'Activates a menu item, toggles a checkbox, selects a radio item, or opens a menu/submenu trigger',
      },
      {
        key: 'ArrowDown',
        behavior:
          'Opens a menu and focuses the first item, or moves focus to the next item in a dropdown',
      },
      {
        key: 'ArrowUp',
        behavior:
          'Opens a menu and focuses the last item, or moves focus to the previous item in a dropdown',
      },
      {
        key: 'ArrowRight',
        behavior:
          'In horizontal menubar, moves focus to the next menu trigger. Inside a menu, opens a submenu. Inside a submenu, moves focus to next item.',
      },
      {
        key: 'ArrowLeft',
        behavior:
          'In horizontal menubar, moves focus to the previous menu trigger. Inside a submenu, closes it and returns focus to the parent trigger.',
      },
      {
        key: 'Home',
        behavior:
          'Moves focus to the first menu item or first menubar trigger',
      },
      {
        key: 'End',
        behavior:
          'Moves focus to the last menu item or last menubar trigger',
      },
      {
        key: 'Escape',
        behavior:
          'Closes the current menu/submenu and returns focus to its trigger. At top level, closes all menus.',
      },
      {
        key: 'Typeahead (printable characters)',
        behavior:
          'Types into a 500ms buffer to jump to the first matching menu item label (case-insensitive)',
      },
    ],
    focusManagement:
      'Focus-visible ring (ring-2 ring-focus ring-offset-2) appears on keyboard focus for trigger buttons and menu items. Focus moves between triggers and dropdown items via arrow keys. Outside clicks and Escape return focus to the originating trigger.',
    wcagLevel: 'AA',
    notes:
      'Uses WAI-ARIA menubar pattern with proper role hierarchy: menubar > menu > menuitem/menuitemcheckbox/menuitemradio. Separator uses role="separator", labels use role="presentation". All menus render via React portals into document.body for z-index reliability. Each trigger and panel receives a unique auto-generated ID via useId().',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason:
        'Toolbar action buttons commonly placed alongside a menubar in application chrome',
    },
    {
      slug: 'tooltip',
      reason:
        'Provides supplemental context for menu items or toolbar buttons near the menubar',
    },
    {
      slug: 'popover',
      reason:
        'Similar overlay pattern for contextual panels triggered from toolbar areas',
    },
    {
      slug: 'typography',
      reason:
        'Used in demo layouts to label menubar sections and display state readouts',
    },
    {
      slug: 'divider',
      reason:
        'Visual separation between the menubar and content areas in application layouts',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Menubar with Icons and Shortcuts',
      description:
        'A simple menubar with File and Edit menus demonstrating items with icons, keyboard shortcuts, separators, and a disabled state.',
      code: `'use client';
import React from 'react';
import { Menubar } from 'vayu-ui';
import { File, Save, Printer, Scissors, Copy, Clipboard } from 'lucide-react';

export default function BasicMenubar() {
  return (
    <Menubar>
      <Menubar.Menu trigger="File">
        <Menubar.Item icon={<File size={14} />} shortcut="⌘N">
          New Tab
        </Menubar.Item>
        <Menubar.Item icon={<Save size={14} />} shortcut="⌘S" disabled>
          Save
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item icon={<Printer size={14} />} shortcut="⌘P">
          Print...
        </Menubar.Item>
      </Menubar.Menu>

      <Menubar.Menu trigger="Edit">
        <Menubar.Item icon={<Scissors size={14} />} shortcut="⌘X">
          Cut
        </Menubar.Item>
        <Menubar.Item icon={<Copy size={14} />} shortcut="⌘C">
          Copy
        </Menubar.Item>
        <Menubar.Item icon={<Clipboard size={14} />} shortcut="⌘V">
          Paste
        </Menubar.Item>
      </Menubar.Menu>
    </Menubar>
  );
}`,
      tags: ['basic', 'icons', 'shortcuts', 'disabled'],
    },
    {
      title: 'Checkbox and Radio Items',
      description:
        'View menu with CheckboxItem toggles for panel visibility and a RadioGroup for zoom level selection.',
      code: `'use client';
import React, { useState } from 'react';
import { Menubar } from 'vayu-ui';

export default function CheckboxRadioMenubar() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('100%');

  return (
    <Menubar>
      <Menubar.Menu trigger="View">
        <Menubar.CheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
          shortcut="⌘/"
        >
          Show Status Bar
        </Menubar.CheckboxItem>
        <Menubar.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Show Panel
        </Menubar.CheckboxItem>
        <Menubar.Separator />
        <Menubar.Label>Zoom</Menubar.Label>
        <Menubar.RadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
          <Menubar.RadioItem value="50%">50%</Menubar.RadioItem>
          <Menubar.RadioItem value="100%">100%</Menubar.RadioItem>
          <Menubar.RadioItem value="200%">200%</Menubar.RadioItem>
        </Menubar.RadioGroup>
      </Menubar.Menu>
    </Menubar>
  );
}`,
      tags: ['checkbox', 'radio', 'toggle', 'controlled'],
    },
    {
      title: 'Nested Submenus and Danger Items',
      description:
        'Menus with nested SubMenu components for categorised actions and a danger-styled item for destructive operations.',
      code: `'use client';
import React from 'react';
import { Menubar } from 'vayu-ui';
import { Share2, Bold, Italic, Trash2 } from 'lucide-react';

export default function SubmenuMenubar() {
  return (
    <Menubar>
      <Menubar.Menu trigger="File">
        <Menubar.SubMenu trigger="Share">
          <Menubar.Item icon={<Share2 size={14} />}>Email Link</Menubar.Item>
          <Menubar.Item>Messages</Menubar.Item>
          <Menubar.SubMenu trigger="Social Media">
            <Menubar.Item>Twitter</Menubar.Item>
            <Menubar.Item>Facebook</Menubar.Item>
          </Menubar.SubMenu>
        </Menubar.SubMenu>
      </Menubar.Menu>

      <Menubar.Menu trigger="Format">
        <Menubar.Item icon={<Bold size={14} />} shortcut="⌘B">
          Bold
        </Menubar.Item>
        <Menubar.Item icon={<Italic size={14} />} shortcut="⌘I">
          Italic
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item danger icon={<Trash2 size={14} />}>
          Clear Formatting
        </Menubar.Item>
      </Menubar.Menu>
    </Menubar>
  );
}`,
      tags: ['submenu', 'nested', 'danger', 'destructive'],
    },
    {
      title: 'Complete Editor Menubar',
      description:
        'Full-featured menubar mimicking an IDE/editor with File, Edit, View, Format, and Help menus — demonstrates all sub-component types working together.',
      code: `'use client';
import React, { useState } from 'react';
import { Menubar } from 'vayu-ui';
import {
  File, FolderOpen, Save, Printer, Scissors, Copy, Clipboard,
  Undo, Redo, Share2, Trash2, Bold, Italic, Underline,
} from 'lucide-react';

export default function EditorMenubar() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('100%');

  return (
    <Menubar>
      <Menubar.Menu trigger="File">
        <Menubar.Item icon={<File size={14} />} shortcut="⌘N">New Tab</Menubar.Item>
        <Menubar.Item icon={<FolderOpen size={14} />} shortcut="⌘O">Open File...</Menubar.Item>
        <Menubar.Item icon={<Save size={14} />} shortcut="⌘S" disabled>Save</Menubar.Item>
        <Menubar.Separator />
        <Menubar.SubMenu trigger="Share">
          <Menubar.Item icon={<Share2 size={14} />}>Email Link</Menubar.Item>
          <Menubar.SubMenu trigger="Social Media">
            <Menubar.Item>Twitter</Menubar.Item>
            <Menubar.Item>Facebook</Menubar.Item>
          </Menubar.SubMenu>
        </Menubar.SubMenu>
        <Menubar.Separator />
        <Menubar.Item icon={<Printer size={14} />} shortcut="⌘P">Print...</Menubar.Item>
      </Menubar.Menu>

      <Menubar.Menu trigger="Edit">
        <Menubar.Item icon={<Undo size={14} />} shortcut="⌘Z">Undo</Menubar.Item>
        <Menubar.Item icon={<Redo size={14} />} shortcut="⇧⌘Z">Redo</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item icon={<Scissors size={14} />} shortcut="⌘X">Cut</Menubar.Item>
        <Menubar.Item icon={<Copy size={14} />} shortcut="⌘C">Copy</Menubar.Item>
        <Menubar.Item icon={<Clipboard size={14} />} shortcut="⌘V">Paste</Menubar.Item>
      </Menubar.Menu>

      <Menubar.Menu trigger="View">
        <Menubar.CheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Show Status Bar
        </Menubar.CheckboxItem>
        <Menubar.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Show Panel
        </Menubar.CheckboxItem>
        <Menubar.Separator />
        <Menubar.Label>Zoom</Menubar.Label>
        <Menubar.RadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
          <Menubar.RadioItem value="50%">50%</Menubar.RadioItem>
          <Menubar.RadioItem value="100%">100%</Menubar.RadioItem>
          <Menubar.RadioItem value="200%">200%</Menubar.RadioItem>
        </Menubar.RadioGroup>
      </Menubar.Menu>

      <Menubar.Menu trigger="Format">
        <Menubar.Item icon={<Bold size={14} />} shortcut="⌘B">Bold</Menubar.Item>
        <Menubar.Item icon={<Italic size={14} />} shortcut="⌘I">Italic</Menubar.Item>
        <Menubar.Item icon={<Underline size={14} />} shortcut="⌘U">Underline</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item danger icon={<Trash2 size={14} />}>Clear Formatting</Menubar.Item>
      </Menubar.Menu>

      <Menubar.Menu trigger="Help">
        <Menubar.Item>Documentation</Menubar.Item>
        <Menubar.Item>Feedback</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item>About Vayu UI</Menubar.Item>
      </Menubar.Menu>
    </Menubar>
  );
}`,
      tags: ['complete', 'editor', 'all-features', 'full-demo'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using menu items outside a Menu',
      bad: '<Menubar.Item icon={<Icon />}>Action</Menubar.Item>',
      good: '<Menubar.Menu trigger="Actions"><Menubar.Item icon={<Icon />}>Action</Menubar.Item></Menubar.Menu>',
      reason:
        'Item, CheckboxItem, RadioItem, SubMenu, Label, and Separator all require MenuContext from a parent Menu. Rendering them standalone throws a runtime error.',
    },
    {
      title: 'CheckboxItem without onCheckedChange',
      bad: '<Menubar.CheckboxItem checked={true}>Toggle</Menubar.CheckboxItem>',
      good: '<Menubar.CheckboxItem checked={enabled} onCheckedChange={setEnabled}>Toggle</Menubar.CheckboxItem>',
      reason:
        'Without an onCheckedChange handler, the checkbox will never update its visual state on click. Always pair checked with onCheckedChange for controlled behavior.',
    },
    {
      title: 'RadioItem without a parent RadioGroup',
      bad: '<Menubar.RadioItem value="a">Option A</Menubar.RadioItem>',
      good: '<Menubar.RadioGroup value={val} onValueChange={setVal}><Menubar.RadioItem value="a">Option A</Menubar.RadioItem></Menubar.RadioGroup>',
      reason:
        'RadioItem reads its selected state from RadioGroup context. Without a parent RadioGroup, it cannot determine or update its checked state.',
    },
    {
      title: 'Deeply nested submenus beyond 2-3 levels',
      bad: 'Menubar.SubMenu > SubMenu > SubMenu > SubMenu > ...',
      good: 'Limit nesting to 2 levels (submenu within submenu). For deeper hierarchies, restructure into separate menus or a different navigation pattern.',
      reason:
        'Deeply nested submenus degrade usability, make keyboard navigation cumbersome, and can overflow the viewport. Most accessibility guidelines recommend keeping nesting shallow.',
    },
    {
      title: 'Missing trigger on Menu or SubMenu',
      bad: '<Menubar.Menu><Menubar.Item>Action</Menubar.Item></Menubar.Menu>',
      good: '<Menubar.Menu trigger="File"><Menubar.Item>Action</Menubar.Item></Menubar.Menu>',
      reason:
        'The trigger prop is required — it provides the visible button on the menubar bar and the accessible label for the dropdown panel. Without it, the menu cannot be opened or identified.',
    },
  ],
};
