import { ComponentRegistryEntry } from '../types.js';

export const badgeEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'badge',
  name: 'Badge',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A compact status indicator that displays labels, counts, tags, or semantic status using variant-based styling.',
  longDescription:
    'The Badge component renders as a pill-shaped inline element with six semantic variants (brand, muted, warning, success, destructive, info) and three sizes (sm, md, lg). It supports interactive mode via onClick (renders as <button>), dismissible mode via onDismiss (renders a close button), and the combined interactive + dismissible state (renders sibling buttons inside a group container). All sizes meet WCAG 2.2 minimum target size requirements (24px).',
  tags: [
    'badge',
    'tag',
    'label',
    'status',
    'indicator',
    'counter',
    'chip',
    'pill',
    'notification',
    'filter',
    'category',
    'span',
  ],
  useCases: [
    'Displaying status indicators for success, warning, error, or informational states',
    'Rendering filter chips that can be clicked to apply and dismissed to remove',
    'Showing notification counts or unread indicators on UI elements',
    'Labeling content with category or taxonomy tags',
    'Building dismissible tag lists for user selections or preferences',
    'Creating interactive action badges that trigger callbacks on click',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Badge',
  files: [
    { name: 'Badge.tsx', description: 'Root component with variant/size styling, interactive/dismissible logic, and accessibility attributes' },
    { name: 'types.ts', description: 'TypeScript type definitions for BadgeProps, BadgeVariant, and BadgeSize' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the Badge component and types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Badge',
  subComponents: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'variant',
      type: "BadgeVariant",
      required: false,
      defaultValue: "'brand'",
      description: 'Semantic variant controlling background and text colors.',
      options: ['brand', 'muted', 'warning', 'success', 'destructive', 'info'],
    },
    {
      name: 'size',
      type: "BadgeSize",
      required: false,
      defaultValue: "'md'",
      description: 'Controls the badge height, padding, and font size. All sizes meet WCAG 2.2 minimum target dimensions.',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'as',
      type: "'span' | 'div' | 'a'",
      required: false,
      description: 'Forces a specific HTML element to render. When omitted, the component uses "button" if onClick is provided, otherwise "span".',
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Makes the badge interactive. When provided, the badge renders as a <button> element with hover and active states.',
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      description: 'Adds a dismiss button with an X icon. Can be combined with onClick for badges that are both clickable and dismissible.',
    },
    {
      name: 'dismissLabel',
      type: 'string',
      required: false,
      defaultValue: "'Remove'",
      description: 'Accessible label for the dismiss button, announced by screen readers.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content displayed inside the badge — typically a short text label.',
    },
  ],
  rendersAs: 'span',

  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['brand', 'muted', 'warning', 'success', 'destructive', 'info'],
    default: 'brand',
  },

  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'variant',
      prop: 'variant',
      isBoolean: false,
      values: ['brand', 'muted', 'warning', 'success', 'destructive', 'info'],
      defaultValue: "'brand'",
      description: 'Controls the visual style and semantic meaning. Brand is the primary style, muted de-emphasizes content, and the remaining variants convey status.',
    },
    {
      name: 'interactive',
      prop: 'onClick',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When onClick is provided, the badge renders as a <button> with cursor-pointer, hover:opacity-90, and active:scale-95 effects.',
    },
    {
      name: 'dismissible',
      prop: 'onDismiss',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When onDismiss is provided, a close button with an X icon appears. In static mode it sits inline; when combined with onClick, the badge uses a group layout with sibling buttons.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '() => void',
      description: 'Fired when the badge (or its main action area in dismissible mode) is clicked. Makes the badge interactive and renders it as a button.',
    },
    {
      name: 'onDismiss',
      signature: '() => void',
      description: 'Fired when the dismiss (X) button is clicked. Typically used to remove the badge from a list via state management.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the dismiss button. Defaults to "Remove" via dismissLabel prop, and should be overridden to describe what is being removed (e.g. "Remove React tag").',
        managedByComponent: true,
      },
      {
        name: 'role="group"',
        description: 'Applied to the outer span when the badge is both interactive and dismissible, to semantically group the two sibling button elements.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to the visual separator span between the action and dismiss buttons (interactive + dismissible mode), since it is purely decorative.',
        managedByComponent: true,
      },
      {
        name: 'type="button"',
        description: 'Applied to all internal button elements to prevent unintended form submission when the badge is used inside a form.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the badge when interactive (renders as button), or to the dismiss button when dismissible.',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused button — triggers onClick on the main action area or onDismiss on the dismiss button.',
      },
      {
        key: 'Space',
        behavior: 'Activates the focused button — triggers onClick on the main action area or onDismiss on the dismiss button.',
      },
    ],
    focusManagement:
      'All interactive elements (the badge itself when clickable, and the dismiss button) have visible focus rings via focus:ring-2 focus:ring-focus with ring-offset for contrast in both light and dark modes.',
    wcagLevel: 'AA',
    notes:
      'The sm size meets the WCAG 2.2 minimum target size of 24x24px. When both onClick and onDismiss are provided, the component avoids nesting buttons by rendering sibling buttons inside a span[role="group"], which is the correct ARIA pattern for grouped interactive elements.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Used alongside badges for filter actions, tag management, or "Add tag" UI patterns',
    },
    {
      slug: 'typography',
      reason: 'Commonly paired with headings or body text to show status next to labels',
    },
    {
      slug: 'card',
      reason: 'Badges are often placed inside card headers or footers for status indicators',
    },
    {
      slug: 'divider',
      reason: 'Used between badge groups or to separate badge sections in filter panels',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Badge Variants',
      description: 'All six semantic variants displayed side by side.',
      code: `import { Badge } from 'vayu-ui';

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="brand">Brand</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}`,
      tags: ['basic', 'variants', 'all'],
    },
    {
      title: 'Badge Sizes',
      description: 'Small (24px), medium (28px), and large (32px) badges.',
      code: `import { Badge } from 'vayu-ui';

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge size="sm" variant="brand">Small (24px)</Badge>
      <Badge size="md" variant="brand">Medium (28px)</Badge>
      <Badge size="lg" variant="brand">Large (32px)</Badge>
    </div>
  );
}`,
      tags: ['basic', 'sizes'],
    },
    {
      title: 'Interactive Badge',
      description: 'Clickable badges that render as buttons with onClick handlers.',
      code: `import { Badge } from 'vayu-ui';

export default function InteractiveBadge() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="info" onClick={() => alert('Badge clicked!')}>
        Click Me
      </Badge>
      <Badge variant="muted" onClick={() => alert('Action triggered!')}>
        Action
      </Badge>
    </div>
  );
}`,
      tags: ['interactive', 'clickable'],
    },
    {
      title: 'Dismissible Tags',
      description: 'Tag list where each badge can be removed via the dismiss button.',
      code: `import { useState } from 'react';
import { Badge } from 'vayu-ui';

export default function DismissibleTags() {
  const [tags, setTags] = useState(['React', 'Tailwind', 'Typescript', 'Next.js']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="muted"
          onDismiss={() => removeTag(tag)}
          dismissLabel={\`Remove \${tag}\`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}`,
      tags: ['dismissible', 'tags', 'stateful'],
    },
    {
      title: 'Interactive + Dismissible Filters',
      description: 'Badges that are both clickable (to apply a filter) and dismissible (to remove), rendering as a group with sibling buttons.',
      code: `import { useState } from 'react';
import { Badge } from 'vayu-ui';

export default function FilterBadges() {
  const [filters, setFilters] = useState([
    { id: 'f1', label: 'Active' },
    { id: 'f2', label: 'Verified' },
  ]);

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="brand"
          onClick={() => alert(\`Filter applied: \${filter.label}\`)}
          onDismiss={() => removeFilter(filter.id)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}`,
      tags: ['interactive', 'dismissible', 'filters', 'advanced'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Nesting Badge inside a button or link',
      bad: '<button><Badge variant="success">Active</Badge> Click me</button>',
      good: '<Badge variant="success" onClick={() => handleClick()}>Active</Badge>',
      reason: 'Badge already renders as a <button> when onClick is provided. Nesting buttons inside buttons or links creates invalid HTML and breaks keyboard accessibility.',
    },
    {
      title: 'Using onClick and onDismiss without dismissLabel',
      bad: '<Badge variant="brand" onClick={handleClick} onDismiss={handleDismiss}>Filter</Badge>',
      good: '<Badge variant="brand" onClick={handleClick} onDismiss={handleDismiss} dismissLabel="Remove Filter">Filter</Badge>',
      reason: 'Without a descriptive dismissLabel, the dismiss button announces "Remove" generically to screen readers. Always provide a label that identifies what is being dismissed.',
    },
    {
      title: 'Hardcoding colors instead of using variants',
      bad: '<Badge className="bg-red-500 text-white">Error</Badge>',
      good: '<Badge variant="destructive">Error</Badge>',
      reason: 'Hardcoding Tailwind colors bypasses the semantic design tokens and breaks dark mode support. Always use the variant prop for consistent theming.',
    },
    {
      title: 'Passing very long content into Badge',
      bad: '<Badge variant="info">This is a very long descriptive sentence that defeats the purpose of a badge</Badge>',
      good: '<Badge variant="info">Active</Badge>',
      reason: 'Badges are designed for short labels (1-3 words). Long content breaks the pill shape, overflows containers, and defeats the visual purpose. Use a Card or Alert for longer messages.',
    },
    {
      title: 'Using "as" prop to render interactive elements',
      bad: '<Badge as="a" href="/page" onClick={handleClick}>Link</Badge>',
      good: '<Badge onClick={handleClick}>Link</Badge>  // or use a proper link component',
      reason: 'The "as" prop forces a specific element but does not add appropriate link semantics or attributes. If you need a link, use a proper link component that handles href, accessibility, and routing.',
    },
  ],
};
