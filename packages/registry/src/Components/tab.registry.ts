export const tabRegistry = {
  component: 'Tabs',
  slug: 'tabs',
  category: 'Navigation',

  complexity: 'compound',

  description:
    'A set of layered sections of content—known as tab panels—that are displayed one at a time. A flexible, headless-style tabbed interface component with full dark/light mode support, controlled/uncontrolled modes, keyboard navigation, and full accessibility (WCAG 2.2 AA).',
  ai_summary:
    'Compound tabbed interface component with Tabs.List, Tabs.Trigger, and Tabs.Content subcomponents. Supports horizontal/vertical orientations, controlled/uncontrolled state, keyboard navigation, and WCAG 2.2 AA accessibility compliance.',

  intent: [
    'Organize content into separate views',
    'Switch between different panels of content',
    'Group related content under labeled tabs',
    'Provide navigation within a single page',
  ],
  ai_keywords: [
    'tabs',
    'tabbed interface',
    'navigation',
    'content switching',
    'tab panels',
    'tab list',
    'keyboard navigation',
    'accessibility',
  ],

  when_to_use: [
    'Organizing content into distinct categories',
    'Switching between different views or panels',
    'Grouping related settings or options',
    'Reducing visual clutter by showing one panel at a time',
    'Creating settings or configuration interfaces',
  ],
  when_not_to_use: [
    'When all content should be visible simultaneously',
    'For sequential or wizard-like flows',
    'When tabs would have drastically different heights',
    'For comparing content across multiple panels',

    'When there are more than 6-7 tabs (consider alternative navigation)',
  ],

  composition: {
    root: 'Tabs',
    slots: ['Tabs.List', 'Tabs.Trigger', 'Tabs.Content'],
    structure: ['Tabs', 'Tabs.List', 'Tabs.Trigger', 'Tabs.Content'],
    rules: [
      'Tabs.List must be a direct child of Tabs',
      'Tabs.Trigger must be inside Tabs.List',
      'Tabs.Content must be a direct child of Tabs',
      'Each Tabs.Trigger value must have a matching Tabs.Content value',
      'Tabs.List requires aria-label or aria-labelledby for accessibility',
    ],
  },

  props: {
    Tabs: [
      {
        name: 'defaultValue',
        type: 'string',
        required: false,
        description: 'The value of the tab to activate by default (uncontrolled mode)',
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'The controlled value of the tab to activate',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        required: false,
        description: 'Event handler called when the value changes',
      },
      {
        name: 'orientation',
        type: '"horizontal" | "vertical"',
        required: false,
        default: '"horizontal"',
        description: 'The orientation of the tabs',
      },
      {
        name: 'autoFocus',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Automatically move focus to the tab panel when activated',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The tab list and content components',
      },
    ],
    'Tabs.List': [
      {
        name: 'aria-label',
        type: 'string',
        required: false,
        description: 'Accessible label for the tab list. Required for WCAG 2.2 AA compliance',
      },
      {
        name: 'aria-labelledby',
        type: 'string',
        required: false,
        description: 'Alternative to aria-label, references an element that labels the tab list',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The tab triggers',
      },
    ],
    'Tabs.Trigger': [
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'A unique value for the tab',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether the trigger is disabled',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the trigger',
      },
    ],
    'Tabs.Content': [
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'A unique value for the content. Must match a trigger value',
      },
      {
        name: 'forceMount',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether to force mount the content when inactive',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content to display',
      },
    ],
  },

  variants: [
    {
      name: 'orientation',
      values: ['horizontal', 'vertical'],
      default: 'horizontal',
      description: 'Determines whether tabs are arranged horizontally or vertically',
    },
    {
      name: 'state',
      values: ['active', 'inactive', 'disabled'],
      default: 'inactive',
      description: 'The current state of a tab trigger',
    },
  ],

  states: ['active', 'inactive', 'disabled'],

  responsive: {
    allowed: true,
    patterns: [
      'Use vertical orientation on mobile devices for better touch targets',
      'Horizontal orientation works well for wider viewports',
      'Grid layouts can be applied to Tabs.List for responsive column distribution',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'primary-600',
        'primary-400',
        'primary-500',
        'primary-50',
        'primary-950/30',
        'ground-200',
        'ground-700',
        'ground-600',
        'ground-900',
        'ground-400',
        'ground-50',
        'ground-800/50',
      ],
      spacing: ['px-4', 'py-2', 'mt-4', 'pr-4', 'min-w-40', 'pl-4'],
      border: ['border-b-2', 'border-b', 'border-r', 'border-transparent', 'rounded'],
      typography: ['text-sm', 'font-medium'],
    },
    recommended: {
      colors: ['primary-600', 'primary-400', 'ground-600', 'ground-400'],
      border: ['border-b', 'border-r'],
      typography: ['text-sm', 'font-medium'],
    },
    allowed: {
      colors: ['primary-*', 'ground-*'],
      spacing: ['p-*', 'm-*', 'px-*', 'py-*', 'gap-*'],
      border: ['border-*', 'rounded-*'],
      typography: ['text-*', 'font-*'],
    },
  },

  examples: [
    {
      name: 'Horizontal Tabs',
      description: 'Basic horizontal tabbed interface with aria-label',
      code: `<Tabs defaultValue="account">
  <Tabs.List aria-label="Account settings" className="grid w-full grid-cols-2">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <h3 className="mb-2 text-lg font-medium">Account</h3>
      <p className="text-sm text-ground-600 dark:text-ground-400">
        Make changes to your account here.
      </p>
    </div>
  </Tabs.Content>
  <Tabs.Content value="password">
    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <h3 className="mb-2 text-lg font-medium">Password</h3>
      <p className="text-sm text-ground-600 dark:text-ground-400">
        Change your password here.
      </p>
    </div>
  </Tabs.Content>
</Tabs>`,
    },
    {
      name: 'Vertical Orientation',
      description: 'Vertical tabs for sidebar navigation patterns',
      code: `<Tabs defaultValue="profile" orientation="vertical">
  <Tabs.List aria-label="Settings navigation" className="min-w-50">
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile" className="pl-4">
    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <h4 className="mb-2 text-md font-medium">Profile Settings</h4>
      <p className="text-sm text-ground-600 dark:text-ground-400">
        Manage your personal information.
      </p>
    </div>
  </Tabs.Content>
  <Tabs.Content value="settings" className="pl-4">
    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <h4 className="mb-2 text-md font-medium">Application Settings</h4>
      <p className="text-sm text-ground-600 dark:text-ground-400">
        Configure your preferences.
      </p>
    </div>
  </Tabs.Content>
  <Tabs.Content value="notifications" className="pl-4">
    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <h4 className="mb-2 text-md font-medium">Notification Settings</h4>
      <p className="text-sm text-ground-600 dark:text-ground-400">
        Choose which notifications to receive.
      </p>
    </div>
  </Tabs.Content>
</Tabs>`,
    },
    {
      name: 'Disabled Tab',
      description: 'Tab with disabled state',
      code: `<Tabs defaultValue="enabled">
  <Tabs.List aria-label="Tab options" className="grid w-full grid-cols-2">
    <Tabs.Trigger value="enabled">Enabled Tab</Tabs.Trigger>
    <Tabs.Trigger value="disabled" disabled>Disabled Tab</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="enabled">
    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
      <p className="text-sm text-ground-600 dark:text-ground-400">
        This tab is active and can be selected.
      </p>
    </div>
  </Tabs.Content>
</Tabs>`,
    },
    {
      name: 'Controlled Tabs',
      description: 'Tabs with controlled state management',
      code: `function ControlledTabs() {
  const [value, setValue] = useState("tab1");

  return (
    <Tabs value={value} onValueChange={setValue}>
      <Tabs.List aria-label="Controlled tabs">
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs>
  );
}`,
    },
  ],

  accessibility: {
    pattern: 'ARIA Tabs Pattern',
    standards: ['WCAG 2.2 AA'],
    keyboard_support: [
      'ArrowRight: Move focus to next tab (horizontal orientation)',
      'ArrowLeft: Move focus to previous tab (horizontal orientation)',
      'ArrowDown: Move focus to next tab (vertical orientation)',
      'ArrowUp: Move focus to previous tab (vertical orientation)',
      'Home: Move focus to first tab',
      'End: Move focus to last tab',
      'Enter: Activate the focused tab',
      'Space: Activate the focused tab',
    ],
    aria_attributes: [
      'role="tablist" on Tabs.List',
      'role="tab" on Tabs.Trigger',
      'role="tabpanel" on Tabs.Content',
      'aria-selected on Tabs.Trigger (true/false)',
      'aria-disabled on Tabs.Trigger',
      'aria-controls on Tabs.Trigger (references tabpanel id)',
      'aria-labelledby on Tabs.Content (references tab id)',
      'aria-orientation on Tabs.List (horizontal/vertical)',
      'aria-label or aria-labelledby on Tabs.List (required)',
    ],
  },

  anti_patterns: [
    'Using tabs for sequential flows - use stepper or wizard instead',
    'Creating more than 6-7 tabs - consider alternative navigation',
    'Nesting tabs within tabs - creates confusing UX',
    'Missing aria-label or aria-labelledby on Tabs.List',
    'Mismatched value props between Tabs.Trigger and Tabs.Content',
    'Using tabs when all content should be visible at once',
  ],

  dependencies: {
    utilities: ['cn'],
  },

  relationships: {
    used_with: ['Card', 'Panel', 'Container'],
    often_inside: ['Card', 'Dialog', 'Panel', 'Sidebar'],
    often_contains: ['Typography', 'Form', 'List', 'Grid'],
  },

  related_components: [],

  validation_rules: [
    'Tabs.List must be a child of Tabs',
    'Tabs.Trigger must be inside Tabs.List',
    'Tabs.Content must be a child of Tabs',
    'Each Tabs.Trigger value must have a matching Tabs.Content value',
    'Tabs.List must have aria-label or aria-labelledby for accessibility',
    'Tabs must have at least one Tabs.Trigger and one Tabs.Content',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add tabs'],

  source: {
    file: 'packages/ui/src/components/ui/tab.tsx',
    language: 'TypeScript',
    framework: 'React',
  },

  meta: {
    doc_url: '/docs/components/tabs',
    source_file: 'packages/ui/src/components/ui/tab.tsx',
    extracted: [
      'component',
      'slug',
      'description',
      'props',
      'variants',
      'examples',
      'accessibility',
      'installation',
      'composition',
      'design_tokens',
    ],
    inferred: [
      'category',
      'complexity',
      'ai_summary',
      'intent',
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'responsive',
      'anti_patterns',
      'relationships',
      'validation_rules',
    ],
  },
};
