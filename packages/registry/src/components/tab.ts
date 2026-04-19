import { ComponentRegistryEntry } from '../types.js';

export const tabEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'tab',
  name: 'Tab',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible tabbed interface component using the compound component pattern with horizontal/vertical orientation, controlled/uncontrolled modes, and full WCAG 2.2 AA keyboard navigation.',
  longDescription:
    'The Tab component provides a tabbed navigation interface using the compound component pattern (Tabs.List, Tabs.Trigger, Tabs.Content). It supports horizontal and vertical orientations, controlled (via value/onValueChange) and uncontrolled (via defaultValue) modes, automatic ARIA attribute management linking triggers to panels, roving tabindex for keyboard accessibility, optional auto-focus on panel activation, disabled tabs, and force-mounted panels for preserving state. All variants follow WCAG 2.2 AA accessibility standards with full arrow key, Home, End, Enter, and Space keyboard support.',
  tags: [
    'tab',
    'tabs',
    'navigation',
    'tablist',
    'tabpanel',
    'tabbed',
    'switch',
    'panel',
    'section',
    'toggle',
    'content',
  ],
  useCases: [
    'Switching between related content sections within the same page without navigation',
    'Organizing form fields or settings into logical groups (e.g. Account, Password, Notifications)',
    'Creating sidebar-style navigation with vertical tab orientation',
    'Building product detail pages with tabbed content (Overview, Details, Reviews, Settings)',
    'Implementing wizard-like interfaces where each tab represents a step',
    'Displaying content panels that need to preserve their state when hidden using forceMount',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Tab',
  files: [
    { name: 'Tab.tsx', description: 'Root component with context provider, controlled/uncontrolled state management, and compound component wiring' },
    { name: 'TabsList.tsx', description: 'Tablist container with ARIA role, orientation attribute, and full keyboard navigation (arrow keys, Home, End)' },
    { name: 'TabsTrigger.tsx', description: 'Tab trigger button with ARIA selected state, roving tabindex, disabled support, and orientation-aware styling' },
    { name: 'TabsContent.tsx', description: 'Tab panel with ARIA role, auto-focus support, force mount option, and active/inactive state management' },
    { name: 'hooks.ts', description: 'React context and useTabsContext hook for sharing active tab state across compound sub-components' },
    { name: 'types.ts', description: 'TypeScript type definitions for TabsOrientation, TabsContextValue, TabsProps, TabsListProps, TabsTriggerProps, and TabsContentProps' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting all types' },
    { name: 'README.md', description: 'Component anatomy, use cases, and file structure documentation' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Tabs',
  subComponents: [
    {
      name: 'List',
      fileName: 'TabsList.tsx',
      description: 'Container for tab triggers with ARIA tablist role, orientation-aware keyboard navigation, and accessible labeling via aria-label or aria-labelledby',
      props: [
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          description: 'Accessible label for the tab list. Required for WCAG 2.2 AA compliance when no visible label element exists.',
        },
        {
          name: 'aria-labelledby',
          type: 'string',
          required: false,
          description: 'ID of a visible element that labels the tab list. Alternative to aria-label for when a visible heading labels the tabs.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Tabs.Trigger elements to render as tab buttons inside the tab list',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the tablist container div',
        },
      ],
    },
    {
      name: 'Trigger',
      fileName: 'TabsTrigger.tsx',
      description: 'Tab trigger button with ARIA tab role, automatic selected/disabled states, roving tabindex, and orientation-aware styling',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Unique value identifying this tab. Used to match the trigger with its corresponding Tabs.Content panel.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Disables the tab trigger, removing it from keyboard navigation and preventing activation',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render as the tab label (text, icons, or both)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the tab trigger button',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'TabsContent.tsx',
      description: 'Tab panel with ARIA tabpanel role, auto-focus support, and optional force mounting for preserving state across tab switches',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Unique value matching a Tabs.Trigger value. The panel is visible when this value matches the active tab.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the panel stays mounted in the DOM when inactive (hidden via CSS). Useful for preserving component state like form inputs.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render inside the tab panel when active',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the tabpanel div',
        },
      ],
    },
  ],
  hooks: ['useTabsContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'Initial active tab value for uncontrolled mode. Used when the component manages its own state internally.',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled active tab value. When provided, the component becomes controlled and only changes via onValueChange.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when the active tab changes. Receives the new tab value as a string.',
    },
    {
      name: 'orientation',
      type: "TabsOrientation",
      required: false,
      defaultValue: "'horizontal'",
      description: 'Tab layout direction. Horizontal renders tabs in a row with bottom border; vertical renders tabs in a column with right border.',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'autoFocus',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, focus automatically moves to the active tab panel when a new tab is activated.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Tabs.List and Tabs.Content elements composing the tabbed interface',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root tabs container div',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No visual variants or sizes — component styling uses design tokens

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'active',
      prop: 'value',
      isBoolean: false,
      defaultValue: "''",
      description: 'The currently active tab. When a Tabs.Trigger value matches the active state, it renders with brand-colored styling and tabindex=0.',
    },
    {
      name: 'inactive',
      prop: 'value',
      isBoolean: false,
      description: 'Non-active tabs render with muted styling and tabindex=-1, removing them from the tab order until activated.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'A disabled Tabs.Trigger cannot be activated by click or keyboard. It is skipped during arrow key navigation and rendered with reduced opacity.',
    },
    {
      name: 'forceMounted',
      prop: 'forceMount',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true on Tabs.Content, the panel stays mounted in the DOM but hidden via the HTML hidden attribute when inactive. Preserves component state.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onValueChange',
      signature: '(value: string) => void',
      description: 'Fired when the active tab changes. Receives the value of the newly activated tab trigger.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role="tablist"',
        description: 'Applied to Tabs.List to identify it as a tab list container for assistive technology',
        managedByComponent: true,
      },
      {
        name: 'aria-orientation',
        description: 'Applied to the tablist element, set to "horizontal" or "vertical" to indicate tab navigation direction',
        managedByComponent: true,
      },
      {
        name: 'aria-label / aria-labelledby',
        description: 'Required accessible name for the tab list. Either aria-label or aria-labelledby must be provided for WCAG compliance.',
        managedByComponent: false,
      },
      {
        name: 'role="tab"',
        description: 'Applied to each Tabs.Trigger button to identify it as a tab control within the tablist',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Applied to each tab trigger, set to true for the active tab and false for inactive tabs',
        managedByComponent: true,
      },
      {
        name: 'aria-controls',
        description: 'Applied to each tab trigger with value "tabpanel-{value}", linking it to the corresponding panel by ID',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Applied to disabled tab triggers alongside the native disabled attribute for screen reader compatibility',
        managedByComponent: true,
      },
      {
        name: 'role="tabpanel"',
        description: 'Applied to each Tabs.Content div to identify it as the content panel associated with a tab',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Applied to each tab panel with value "tab-{value}", linking it back to its corresponding trigger by ID',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight',
        behavior: 'In horizontal orientation, moves focus to the next tab trigger (wraps from last to first)',
      },
      {
        key: 'ArrowLeft',
        behavior: 'In horizontal orientation, moves focus to the previous tab trigger (wraps from first to last)',
      },
      {
        key: 'ArrowDown',
        behavior: 'In vertical orientation, moves focus to the next tab trigger (wraps from last to first)',
      },
      {
        key: 'ArrowUp',
        behavior: 'In vertical orientation, moves focus to the previous tab trigger (wraps from first to last)',
      },
      {
        key: 'Home',
        behavior: 'Moves focus to the first enabled tab trigger',
      },
      {
        key: 'End',
        behavior: 'Moves focus to the last enabled tab trigger',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused tab trigger',
      },
      {
        key: 'Space',
        behavior: 'Activates the focused tab trigger',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus from the active tab trigger to the tab panel content',
      },
    ],
    focusManagement:
      'Uses roving tabindex pattern: the active tab trigger has tabindex=0, all inactive triggers have tabindex=-1. Arrow keys move focus between triggers. When autoFocus is true, focus automatically moves to the active tab panel after tab activation. Disabled triggers are skipped during keyboard navigation.',
    wcagLevel: 'AA',
    notes:
      'Each tab trigger and panel are linked bidirectionally via aria-controls and aria-labelledby using generated IDs (tab-{value} and tabpanel-{value}). The tablist requires an accessible name via aria-label or aria-labelledby for compliance. Arrow key navigation follows the WAI-ARIA Authoring Practices for Tabs pattern.',
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
      slug: 'button',
      reason: 'Action buttons are commonly placed inside tab panels for form submissions, navigation, and contextual actions',
    },
    {
      slug: 'card',
      reason: 'Tabs are frequently used inside cards to organize card content into switchable sections',
    },
    {
      slug: 'typography',
      reason: 'Heading and text components are used inside tab panels to structure content hierarchies',
    },
    {
      slug: 'divider',
      reason: 'Dividers separate content sections within tab panels for visual clarity',
    },
    {
      slug: 'badge',
      reason: 'Badges can be added to tab triggers to indicate notification counts or status on tab sections',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Horizontal Tabs',
      description: 'Default horizontal tab layout with two tabs and an accessible label provided via aria-labelledby referencing a heading element.',
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function HorizontalTabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Typography.H2 id="tabs-label" className="mb-4">
        Account Settings
      </Typography.H2>

      <Tabs defaultValue="account">
        <Tabs.List aria-labelledby="tabs-label" className="grid w-full grid-cols-2">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H3 className="mb-2">Account</Typography.H3>
            <Typography.P variant="secondary">
              Make changes to your account here. Click save when you're done.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="password">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H3 className="mb-2">Password</Typography.H3>
            <Typography.P variant="secondary">
              Change your password here. After saving, you'll be logged out.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ['horizontal', 'basic', 'aria-labelledby'],
    },
    {
      title: 'Vertical Tabs',
      description: 'Vertical orientation tabs for sidebar-style navigation with aria-label for accessibility.',
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function VerticalTabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="profile" orientation="vertical">
        <Tabs.List aria-label="Settings navigation" className="min-w-40">
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Profile Settings</Typography.H4>
            <Typography.P variant="secondary">
              Manage your personal information and preferences.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="settings" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Application Settings</Typography.H4>
            <Typography.P variant="secondary">
              Configure your application preferences and options.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Notification Settings</Typography.H4>
            <Typography.P variant="secondary">
              Choose which notifications you want to receive.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ['vertical', 'sidebar', 'orientation', 'aria-label'],
    },
    {
      title: 'Disabled Tab',
      description: 'Tab with a disabled trigger that cannot be activated by click or keyboard, useful for gating content behind permissions.',
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function DisabledTabDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="enabled">
        <Tabs.List aria-label="Tab options" className="grid w-full grid-cols-2">
          <Tabs.Trigger value="enabled">Enabled Tab</Tabs.Trigger>
          <Tabs.Trigger value="disabled" disabled>
            Disabled Tab
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="enabled">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.P variant="secondary">
              This tab is active and can be selected.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ['disabled', 'gated', 'permissions'],
    },
    {
      title: 'Tabs with Actions',
      description: 'Multi-tab layout integrating Button components inside tab panels for contextual actions like view, export, save, and reset.',
      code: `import { Tabs, Typography, Button } from 'vayu-ui';

export default function TabsWithActionsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="overview">
        <Tabs.List aria-label="Content sections" className="grid w-full grid-cols-3">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Overview Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Get a quick summary of your content and recent activity.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="primary" size="small">View Report</Button>
              <Button variant="outline" size="small">Export</Button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="details">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Details Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Dive deeper into your data with detailed analytics and insights.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="secondary" size="small">Analyze</Button>
              <Button variant="ghost" size="small">Download CSV</Button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Settings Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Configure your preferences and customize your experience.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="primary" size="small">Save Settings</Button>
              <Button variant="destructive" size="small">Reset</Button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ['actions', 'button', 'multi-tab', 'integration'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Missing accessible label on Tabs.List',
      bad: '<Tabs defaultValue="tab1"><Tabs.List><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List></Tabs>',
      good: '<Tabs defaultValue="tab1"><Tabs.List aria-label="Content sections"><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List></Tabs>',
      reason: 'The tablist requires an accessible name via aria-label or aria-labelledby for WCAG 2.2 AA compliance. Without it, screen readers cannot identify the purpose of the tab list.',
    },
    {
      title: 'Mismatched value between Trigger and Content',
      bad: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Content value="profile">...</Tabs.Content>',
      good: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Content value="account">...</Tabs.Content>',
      reason: 'Each Tabs.Trigger value must match exactly one Tabs.Content value. Mismatched values break the ARIA linkage (aria-controls, aria-labelledby) and leave panels permanently hidden or triggers with no panel.',
    },
    {
      title: 'Using controlled and uncontrolled props together',
      bad: '<Tabs defaultValue="tab1" value={state} onValueChange={fn}>...</Tabs>',
      good: '<Tabs value={state} onValueChange={fn}>...</Tabs>',
      reason: 'Do not mix defaultValue (uncontrolled) with value/onValueChange (controlled) on the same Tabs instance. Pick one mode: either let the component manage state with defaultValue, or fully control it with value and onValueChange.',
    },
    {
      title: 'Using Tabs compound components outside Tabs',
      bad: '<div><Tabs.List aria-label="Nav"><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List></div>',
      good: '<Tabs defaultValue="a"><Tabs.List aria-label="Nav"><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List><Tabs.Content value="a">Content</Tabs.Content></Tabs>',
      reason: 'Tabs.List, Tabs.Trigger, and Tabs.Content rely on the TabsContext provided by the root Tabs component. Using them outside Tabs will throw a runtime error: "Tabs compound components must be used within a Tabs component".',
    },
    {
      title: 'Duplicate value across Tabs.Trigger elements',
      bad: '<Tabs.Trigger value="tab">Tab 1</Tabs.Trigger><Tabs.Trigger value="tab">Tab 2</Tabs.Trigger>',
      good: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Trigger value="password">Password</Tabs.Trigger>',
      reason: 'Each Tabs.Trigger must have a unique value. Duplicate values cause both triggers to appear active simultaneously, break keyboard navigation (two elements share the same panel), and produce invalid ARIA with duplicate IDs.',
    },
  ],
};
