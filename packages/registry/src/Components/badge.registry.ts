import type { VayuComponentDoc } from '../index';

export const badgeRegistry: VayuComponentDoc = {
  component: 'Badge',
  slug: 'badge',
  category: 'Display',

  complexity: 'simple',

  description:
    'Displays a badge or label component for status, counts, or categorization. Supports multiple variants, sizes, and interactive behaviors including clickable and dismissible modes.',
  ai_summary:
    'A versatile badge component for displaying status, labels, tags, and counts. Features six semantic variants (primary, secondary, warning, success, error, info), three sizes, and supports interactive (clickable) and dismissible modes with WCAG 2.2 AA accessibility compliance.',

  intent: [
    'Display status indicators',
    'Show notification counts',
    'Categorize content with tags',
    'Create filter chips',
    'Highlight featured items',
    'Show form validation states',
  ],
  ai_keywords: [
    'badge',
    'tag',
    'label',
    'status',
    'chip',
    'pill',
    'count',
    'indicator',
    'category',
    'filter',
  ],

  when_to_use: [
    'Showing status indicators (success, warning, error, info)',
    'Displaying notification counts or unread messages',
    'Creating removable tag chips for filters',
    'Categorizing content with labels',
    'Highlighting featured or new items',
    'Form validation feedback states',
  ],
  when_not_to_use: [
    'Primary navigation elements (use Button or Link instead)',
    'Form input fields (use Input instead)',
    'Main call-to-action buttons',
    'Long-form content display',
    'Complex interactive widgets',
  ],

  composition: {
    root: 'Badge',
    slots: [],
    structure: ['Badge'],
    rules: [],
  },

  props: {
    Badge: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'warning' | 'success' | 'error' | 'info'",
        required: false,
        default: 'primary',
        description: 'Visual style variant for different semantic purposes',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: 'md',
        description: 'Size of the badge (24px, 28px, or 32px height)',
      },
      {
        name: 'as',
        type: "'span' | 'div' | 'a'",
        required: false,
        description: 'Forces a specific HTML tag element',
      },
      {
        name: 'onClick',
        type: '() => void',
        required: false,
        description: 'Makes the badge interactive (renders as button element)',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: false,
        description: 'Adds a dismiss button with close icon',
      },
      {
        name: 'dismissLabel',
        type: 'string',
        required: false,
        default: 'Remove',
        description: 'Accessible label for the dismiss button',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Content to display inside the badge',
      },
    ],
  },

  variants: [
    {
      name: 'variant',
      values: ['primary', 'secondary', 'warning', 'success', 'error', 'info'],
      default: 'primary',
      description:
        'Semantic color variants: primary (brand), secondary (neutral), warning (attention), success (positive), error (critical), info (informational)',
    },
    {
      name: 'size',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      description:
        'Size variants: sm (24px), md (28px), lg (32px) - all meet WCAG 2.2 minimum touch targets',
    },
  ],

  states: ['static', 'interactive', 'dismissible', 'interactive+dismissible'],

  responsive: {
    allowed: false,
    patterns: [],
  },

  design_tokens: {
    used: {
      colors: [
        'primary-500',
        'primary-600',
        'primary-950',
        'ground-100',
        'ground-200',
        'ground-700',
        'ground-800',
        'warning-400',
        'warning-500',
        'warning-950',
        'success-600',
        'success-700',
        'error-600',
        'error-700',
        'info-600',
        'info-700',
      ],
      radius: ['rounded-full'],
      spacing: ['px-2.5', 'px-3', 'px-4', 'h-6', 'h-7', 'h-8'],
      typography: ['font-primary', 'font-medium', 'text-[10px]', 'text-xs', 'text-sm'],
    },
    recommended: {
      colors: ['primary-500', 'ground-100', 'success-600', 'warning-400', 'error-600', 'info-600'],
      radius: ['rounded-full'],
      typography: ['font-primary', 'font-medium'],
    },
    allowed: {
      colors: ['primary-*', 'ground-*', 'warning-*', 'success-*', 'error-*', 'info-*'],
      radius: ['rounded-full', 'rounded-md', 'rounded-lg'],
      spacing: ['px-*', 'py-*', 'h-*'],
      typography: ['font-primary', 'font-medium', 'text-*'],
    },
  },

  examples: [
    {
      name: 'Basic Variants',
      description: 'All six semantic variants of the Badge component',
      code: `import { Badge } from "vayu-ui";

<div className="flex gap-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
</div>`,
    },
    {
      name: 'Sizes',
      description: 'Three sizes meeting WCAG 2.2 minimum touch targets',
      code: `import { Badge } from "vayu-ui";

<div className="flex items-center gap-2">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>`,
    },
    {
      name: 'Interactive Badge',
      description: 'Clickable badge that renders as a button element',
      code: `import { Badge } from "vayu-ui";

<Badge variant="primary" onClick={() => alert("Badge clicked!")}>
  Click Me
</Badge>`,
    },
    {
      name: 'Dismissible Badge',
      description: 'Badge with a close button for removal',
      code: `import { Badge } from "vayu-ui";

<Badge
  variant="secondary"
  onDismiss={() => console.log("Badge dismissed")}
  dismissLabel="Remove tag"
>
  Removable Tag
</Badge>`,
    },
    {
      name: 'Interactive and Dismissible',
      description: 'Split-button pattern with separate click and dismiss actions',
      code: `import { Badge } from "vayu-ui";

<Badge
  variant="primary"
  onClick={() => alert("Filter applied!")}
  onDismiss={() => console.log("Filter removed")}
  dismissLabel="Remove filter"
>
  Active Filter
</Badge>`,
    },
  ],

  accessibility: {
    pattern: 'WCAG 2.2 Level AA',
    standards: [
      'WCAG 2.2 Level AA',
      'WCAG 2.4.7 Focus Visible',
      'WCAG 2.5.5 Touch Targets (minimum 24x24px)',
    ],
    keyboard_support: [
      'Tab - Move focus to/from interactive badges',
      'Enter/Space - Activate interactive badges',
      'Tab - Navigate between main action and dismiss button in split-button pattern',
    ],
    aria_attributes: [
      'type="button" - Prevents form submission when rendered as button',
      'aria-label="{dismissLabel}" - Accessible label for dismiss button',
      'role="group" - Container role for split-button pattern',
    ],
  },

  anti_patterns: [
    'Nesting badges inside buttons (causes invalid HTML)',
    "Using onClick for navigation links (use as='a' instead)",
    'Overusing primary variant for non-essential badges',
    'Using dismissible badges without providing dismissLabel',
    'Placing long content inside badges (use concise labels)',
  ],

  dependencies: {
    icons: ['XIcon'],
    utilities: ['cn'],
    components: [],
  },

  relationships: {
    used_with: [],
    often_inside: ['Card', 'ListItem', 'Table'],
    often_contains: [],
  },

  related_components: [],

  validation_rules: [
    'If onClick is provided, the badge automatically renders as a button element',
    'If both onClick and onDismiss are provided, uses split-button pattern with two separate buttons',
    'All sizes (sm, md, lg) meet WCAG 2.2 minimum touch target of 24x24px',
    'dismissLabel should be provided when onDismiss is used for accessibility',
  ],

  installation: ['npx vayu-ui init', 'npx vayu-ui add badge'],

  source: {
    file: 'packages/ui/src/components/ui/badge.tsx',
    language: 'TypeScript',
    framework: 'React',
  },

  meta: {
    doc_url: '/docs/components/badge',
    source_file: 'packages/ui/src/components/ui/badge.tsx',
    extracted: [
      'component',
      'slug',
      'props',
      'variants',
      'examples',
      'accessibility',
      'dependencies',
      'installation',
      'design_tokens',
    ],
    inferred: [
      'category',
      'complexity',
      'intent',
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'anti_patterns',
      'validation_rules',
      'relationships',
    ],
  },
};

export default badgeRegistry;
