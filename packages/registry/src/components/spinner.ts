import { ComponentRegistryEntry } from '../types.js';

export const spinnerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'spinner',
  name: 'Spinner',
  type: 'component',
  category: 'feedback',

  // ── Description ───────────────────────────────────────
  description:
    'A WCAG 2.2 AA compliant animated circular loading indicator with three sizes, accessible ARIA attributes, and reduced-motion support.',
  longDescription:
    'The Spinner component renders an animated circular border spinner as an inline loading indicator. It uses design system tokens (border-brand) for consistent styling and supports three sizes: sm (w-4 h-4), md (w-6 h-6), and lg (w-8 h-8). The component includes built-in accessibility with role="status", aria-live="polite", aria-busy="true", and a screen-reader-only text node. Animations automatically respect prefers-reduced-motion via Tailwind\'s motion-reduce:animate-none. Custom colors can be applied via the className prop using semantic tokens like border-info, border-success, border-warning, or border-destructive.',
  tags: [
    'spinner',
    'loading',
    'loader',
    'progress',
    'indicator',
    'spinner',
    'pending',
    'async',
    'feedback',
    'span',
    'animation',
    'aria',
  ],
  useCases: [
    'Indicating loading state inside buttons, forms, or action areas during async operations',
    'Providing accessible inline loading feedback with proper ARIA announcements for screen readers',
    'Displaying page-level or section-level loading indicators while data is being fetched',
    'Showing loading state alongside descriptive text to communicate what is currently loading',
    'Customizing loading indicator colors to match semantic status (info, success, warning, error)',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Spinner',
  files: [
    { name: 'index.ts', description: 'Barrel export for Spinner component and types' },
    { name: 'types.ts', description: 'TypeScript type definitions for SpinnerProps and SpinnerSize' },
    { name: 'Spinner.tsx', description: 'Spinner component with size configuration, ARIA attributes, and reduced-motion support' },
    { name: 'README.md', description: 'Component documentation, anatomy, and use cases' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Spinner',
  subComponents: [],
  hooks: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'size',
      type: "SpinnerSize",
      required: false,
      defaultValue: "'md'",
      description: 'Size of the spinner: sm (w-4 h-4), md (w-6 h-6), lg (w-8 h-8).',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      defaultValue: "'Loading'",
      description: 'Accessible label announced by screen readers to describe what is loading.',
    },
  ],
  rendersAs: 'span',

  // ── Variants ──────────────────────────────────────────
  // No variant prop — Spinner has a fixed border-based visual style

  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'spinning',
      prop: 'animation',
      isBoolean: true,
      defaultValue: 'true',
      description:
        'The spinner is always in a spinning state when rendered. Animations respect prefers-reduced-motion via motion-reduce:animate-none, rendering a static circle for users who prefer reduced motion.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'status',
    attributes: [
      {
        name: 'role="status"',
        description: 'Creates an ARIA live region that announces the loading state to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description:
          'Announces loading state changes without interrupting the user. Screen readers will announce the aria-label when the spinner appears.',
        managedByComponent: true,
      },
      {
        name: 'aria-busy="true"',
        description: 'Indicates the element is currently being updated and content is not yet available.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description:
          'Defaults to "Loading" and should be overridden to describe what is loading (e.g. "Loading user profile"). Required for screen reader users to understand context.',
        managedByComponent: false,
      },
    ],
    keyboardInteractions: [],
    focusManagement:
      'The Spinner is a non-interactive status indicator. It does not receive focus or participate in keyboard navigation. Screen readers detect it via role="status" and aria-live="polite".',
    wcagLevel: 'AA',
    notes:
      'Includes a screen-reader-only text node (<span className="sr-only">) with the aria-label value as a fallback for assistive technologies. Animations respect prefers-reduced-motion via Tailwind\'s motion-reduce:animate-none class.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Spinner is commonly used inside buttons to indicate loading/processing state during async actions',
    },
    {
      slug: 'skeleton',
      reason: 'Both are loading feedback components — Spinner for inline indicators, Skeleton for content placeholders',
    },
    {
      slug: 'text-input',
      reason: 'Spinner can indicate async validation or search-in-progress state within text input fields',
    },
    {
      slug: 'card',
      reason: 'Spinner can serve as a loading indicator inside cards while card content is being fetched',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Spinner Sizes',
      description: 'Three available sizes: sm, md (default), and lg.',
      code: `import { Spinner } from 'vayu-ui';

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" aria-label="Loading (small)" />
      <Spinner size="md" aria-label="Loading (medium)" />
      <Spinner size="lg" aria-label="Loading (large)" />
    </div>
  );
}`,
      tags: ['basic', 'sizes'],
    },
    {
      title: 'Spinner with Loading Text',
      description: 'Pair the spinner with descriptive text to communicate what is loading.',
      code: `import { Spinner } from 'vayu-ui';

export default function SpinnerWithText() {
  return (
    <div
      className="flex items-center gap-3"
      role="status"
      aria-live="polite"
    >
      <Spinner size="sm" aria-label="Fetching user data" />
      <p className="text-sm text-muted-content">Fetching user data...</p>
    </div>
  );
}`,
      tags: ['text', 'loading', 'inline'],
    },
    {
      title: 'Spinner Button Integration',
      description: 'Using Spinner inside a Button to indicate async processing state.',
      code: `import { Button, Status } from 'vayu-ui';
import { useState } from 'react';

export default function SpinnerButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Button
      variant="primary"
      size="medium"
      loading={isLoading ? Status.PENDING : Status.IDLE}
      onClick={handleSubmit}
      loadingText="Processing..."
    >
      Submit Form
    </Button>
  );
}`,
      tags: ['button', 'async', 'loading'],
    },
    {
      title: 'Custom Color Spinners',
      description: 'Override border colors using semantic design tokens via className.',
      code: `import { Spinner } from 'vayu-ui';

export default function CustomColorSpinners() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="md" className="border-info border-t-transparent" aria-label="Loading info" />
      <Spinner size="md" className="border-success border-t-transparent" aria-label="Loading success" />
      <Spinner size="md" className="border-warning border-t-transparent" aria-label="Loading warning" />
      <Spinner size="md" className="border-destructive border-t-transparent" aria-label="Loading error" />
    </div>
  );
}`,
      tags: ['custom', 'colors', 'semantic'],
    },
    {
      title: 'Accessible Spinner',
      description: 'Providing a descriptive aria-label for screen reader users.',
      code: `import { Spinner } from 'vayu-ui';

export default function AccessibleSpinner() {
  return (
    <div className="flex items-center gap-3">
      <Spinner size="md" aria-label="Loading your dashboard preferences" />
      <p className="text-sm text-muted-content">
        Screen readers announce "Loading your dashboard preferences"
      </p>
    </div>
  );
}`,
      tags: ['accessible', 'aria', 'screen-reader'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting the aria-label prop',
      bad: '<Spinner size="md" />',
      good: '<Spinner size="md" aria-label="Loading search results" />',
      reason:
        'While the component defaults aria-label to "Loading", a generic label does not tell screen reader users what is actually loading. Always provide a descriptive aria-label that identifies the specific loading context.',
    },
    {
      title: 'Using Spinner for non-loading decorative purposes',
      bad: '<Spinner size="sm" className="border-muted" />',
      good: '<span className="inline-block w-4 h-4 rounded-full border-2 border-muted border-t-transparent animate-spin" />',
      reason:
        'Spinner includes ARIA attributes (role="status", aria-busy="true", aria-live="polite") that signal a loading state to assistive technology. Using it decoratively creates false accessibility announcements.',
    },
    {
      title: 'Hiding the Spinner with display:none instead of conditional rendering',
      bad: '<Spinner style={{ display: isLoading ? "inline-block" : "none" }} />',
      good: '{isLoading && <Spinner aria-label="Loading data" />}',
      reason:
        'Using display:none keeps the spinner\'s ARIA live region in the DOM, which may cause screen readers to announce a loading state that is not visible. Conditional rendering cleanly adds and removes the element.',
    },
    {
      title: 'Overriding the animation with custom CSS keyframes',
      bad: '<Spinner className="animate-bounce" />',
      good: '<Spinner />  /* uses built-in animate-spin with motion-reduce support */',
      reason:
        'The built-in animate-spin animation is paired with motion-reduce:animate-none to respect prefers-reduced-motion. Custom animations bypass this accessibility safeguard and may cause discomfort for motion-sensitive users.',
    },
  ],
};
