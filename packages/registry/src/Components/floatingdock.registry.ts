export const floatingdockRegistry = {
  component: 'FloatingDock',
  slug: 'floatingdock',
  category: 'navigation',

  complexity: 'compound',

  description:
    'A fixed top-center navigation dock with tooltips, logo slot, dividers, and keyboard-accessible actions.',
  ai_summary:
    'A compound navigation component that renders as a fixed glassmorphism dock at the top-center of the viewport. Composed of Container, Item, Logo, and Divider subcomponents. Items support both link and button modes with integrated tooltips. Server-safe implementation using cloneElement for prop injection instead of Context.',

  intent: [
    'Provide persistent top-level navigation',
    'Create a macOS-style dock interface',
    'Offer quick access to primary actions',
    'Display brand logo alongside navigation items',
  ],

  ai_keywords: [
    'navigation',
    'dock',
    'floating',
    'toolbar',
    'menubar',
    'header',
    'persistent',
    'glassmorphism',
    'tooltips',
  ],

  when_to_use: [
    'Primary navigation for single-page applications',
    'Quick action toolbar for frequently used features',
    'Branded navigation bar with logo and actions',
    'Top-level app navigation that stays visible while scrolling',
  ],

  when_not_to_use: [
    'Mobile-first responsive navigation (consider a mobile drawer)',
    'Complex multi-level navigation hierarchies',
    'Forms or content-heavy layouts',
    'Sidebar or vertical navigation patterns',
  ],

  composition: {
    root: 'FloatingDock',
    slots: [
      'FloatingDock.Container',
      'FloatingDock.Item',
      'FloatingDock.Logo',
      'FloatingDock.Divider',
    ],
    structure: [
      'FloatingDock',
      'FloatingDock.Container',
      'FloatingDock.Item',
      'FloatingDock.Logo',
      'FloatingDock.Divider',
    ],
    rules: [
      'FloatingDock.Container must be a direct child of FloatingDock',
      'FloatingDock.Item, FloatingDock.Logo, and FloatingDock.Divider must be inside FloatingDock.Container',
      'FloatingDock.Item requires either href or onClick prop',
    ],
  },

  props: {
    FloatingDock: [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Typically FloatingDock.Container with nested items.',
      },
      {
        name: 'aria-label',
        type: 'string',
        default: 'Floating dock',
        description: 'Accessible name for the navigation.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional classes for the nav wrapper.',
      },
    ],
    'FloatingDock.Container': [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'FloatingDock.Item, FloatingDock.Logo, and FloatingDock.Divider components.',
      },
      {
        name: 'linkComponent',
        type: 'ElementType',
        default: 'Link',
        description: 'Custom link component for routing (defaults to Next.js Link).',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional classes for the container.',
      },
    ],
    'FloatingDock.Item': [
      {
        name: 'icon',
        type: 'ComponentType<{ className?: string; strokeWidth?: number }>',
        required: false,
        description: 'Icon component (e.g. Lucide icon).',
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Tooltip text and aria-label for the item.',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        description: 'URL — renders item as a link.',
      },
      {
        name: 'onClick',
        type: '() => void',
        required: false,
        description: 'Click handler — renders item as a button. Requires client-side boundary.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional classes for the item.',
      },
    ],
    'FloatingDock.Logo': [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Logo content (text or image).',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        description: 'URL for the logo link.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional classes for the logo.',
      },
    ],
    'FloatingDock.Divider': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional classes for the divider.',
      },
    ],
  },

  variants: [],

  states: ['default', 'hover', 'focus-visible', 'active'],

  responsive: {
    allowed: false,
    patterns: [],
  },

  design_tokens: {
    used: {
      colors: [
        'ground-50',
        'ground-950',
        'ground-200',
        'ground-800',
        'ground-600',
        'ground-400',
        'ground-900',
        'ground-100',
        'primary-500',
        'primary-600',
        'primary-400',
      ],
      radius: ['rounded-2xl', 'rounded-xl', 'rounded-lg'],
      border: ['border', 'border-ground-200/50', 'border-ground-800/50'],
      spacing: [
        'p-3',
        'px-3',
        'py-3',
        'px-4',
        'py-2',
        'gap-2',
        'mx-1',
        'w-5',
        'h-5',
        'w-px',
        'h-8',
      ],
      typography: ['text-xl', 'font-bold', 'tracking-wider', 'font-mono'],
    },
    recommended: {
      colors: ['ground-50/80', 'ground-950/80', 'primary-500'],
      radius: ['rounded-2xl', 'rounded-xl'],
      typography: ['font-mono'],
    },
    allowed: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-300',
        'ground-400',
        'ground-500',
        'ground-600',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
        'primary-50',
        'primary-100',
        'primary-200',
        'primary-300',
        'primary-400',
        'primary-500',
        'primary-600',
        'primary-700',
        'primary-800',
        'primary-900',
        'primary-950',
      ],
      radius: [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full',
      ],
      border: ['border', 'border-0', 'border-2', 'border-none'],
      spacing: [
        'p-0',
        'p-1',
        'p-2',
        'p-3',
        'p-4',
        'px-2',
        'px-3',
        'px-4',
        'py-2',
        'py-3',
        'gap-1',
        'gap-2',
        'gap-3',
        'gap-4',
      ],
      typography: [
        'text-sm',
        'text-base',
        'text-lg',
        'text-xl',
        'text-2xl',
        'font-normal',
        'font-medium',
        'font-semibold',
        'font-bold',
      ],
    },
  },

  examples: [
    {
      name: 'Basic Usage',
      description: 'A complete FloatingDock with logo, navigation items, and dividers.',
      code: `"use client";

import { FloatingDock } from "vayu-ui"
import { Home, Search, Bell, Settings, User, Mail, Heart } from "lucide-react"

export function Example() {
  const handleClick = (label: string) => {
    console.log(\`Clicked: \${label}\`)
  }

  return (
    <FloatingDock aria-label="Main navigation">
      <FloatingDock.Container>
        <FloatingDock.Logo href="/">App</FloatingDock.Logo>
        <FloatingDock.Divider />
        <FloatingDock.Item icon={Home} label="Home" href="/" />
        <FloatingDock.Item icon={Search} label="Search" onClick={() => handleClick("Search")} />
        <FloatingDock.Item icon={Mail} label="Messages" onClick={() => handleClick("Messages")} />
        <FloatingDock.Item icon={Bell} label="Notifications" onClick={() => handleClick("Notifications")} />
        <FloatingDock.Item icon={Heart} label="Favorites" onClick={() => handleClick("Favorites")} />
        <FloatingDock.Divider />
        <FloatingDock.Item icon={User} label="Profile" onClick={() => handleClick("Profile")} />
        <FloatingDock.Item icon={Settings} label="Settings" onClick={() => handleClick("Settings")} />
      </FloatingDock.Container>
    </FloatingDock>
  )
}`,
    },
    {
      name: 'Anatomy',
      description: 'Minimal structure showing all subcomponents.',
      code: `<FloatingDock aria-label="Navigation">
  <FloatingDock.Container>
    <FloatingDock.Logo href="/">Logo</FloatingDock.Logo>
    <FloatingDock.Divider />
    <FloatingDock.Item icon={Home} label="Home" href="/" />
    <FloatingDock.Item icon={Settings} label="Settings" onClick={() => {}} />
  </FloatingDock.Container>
</FloatingDock>`,
    },
  ],

  accessibility: {
    pattern: 'WAI-ARIA Navigation Pattern',
    standards: ['WCAG 2.1 Level AA', 'WAI-ARIA Navigation Pattern'],
    keyboard_support: [
      'Tab - Move between items',
      'Enter/Space - Activate item',
      'Shift+Tab - Navigate backwards',
    ],
    aria_attributes: [
      'aria-label on nav element for accessible name',
      "role='separator' on DockDivider",
      "aria-orientation='vertical' on DockDivider",
      "aria-hidden='true' on decorative icons",
      'aria-label on each DockItem for screen readers',
    ],
  },

  anti_patterns: [
    "Using onClick handlers without wrapping in 'use client' directive",
    'Placing FloatingDock.Item outside FloatingDock.Container',
    'Omitting label prop on FloatingDock.Item',
    'Using both href and onClick on the same item (href takes precedence)',
  ],

  dependencies: {
    icons: [],
    utilities: ['cn'],
    components: ['Tooltip', 'Link'],
  },

  relationships: {
    used_with: ['Tooltip', 'Badge'],
    often_inside: ['Layout', 'App'],
    often_contains: [],
  },

  related_components: ['Tooltip', 'Navbar', 'Sidebar'],

  validation_rules: [
    'FloatingDock.Container must be a direct child of FloatingDock',
    'FloatingDock.Item must have label prop',
    'FloatingDock.Item should have either href or onClick',
    "onClick handlers require client-side boundary ('use client')",
    'FloatingDock.Logo should contain content',
  ],

  installation: [
    'npx vayu-ui init    # Add Theme CSS if not added',
    'npx vayu-ui add floatingdock',
  ],

  source: {
    file: 'packages/ui/src/components/ui/floatingdock.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/floatingdock',
    source_file: 'packages/ui/src/components/ui/floatingdock.tsx',
    extracted: [
      'component',
      'description',
      'props',
      'accessibility',
      'examples',
      'installation',
      'composition',
    ],
    inferred: [
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'design_tokens',
      'validation_rules',
      'anti_patterns',
      'relationships',
    ],
  },
};
