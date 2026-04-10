import { ComponentRegistryEntry } from '../types.js';

export const collapsibleEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'collapsible',
  name: 'Collapsible',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A toggleable content section with line-clamp truncation and smooth show/hide behavior.',
  longDescription:
    'The Collapsible component uses the compound component pattern (Collapsible.Content, Collapsible.Trigger) to create accessible expand/collapse sections with CSS line-clamp truncation. It supports both controlled and uncontrolled open state via context, with auto-generated ARIA IDs for screen reader compliance.',
  tags: [
    'collapsible',
    'expandable',
    'collapse',
    'show-more',
    'toggle',
    'truncate',
    'line-clamp',
    'disclosure',
  ],
  useCases: [
    'Truncating long text with a "Show more" toggle to reduce initial page height',
    'Creating expandable/collapsible content sections in product descriptions or article previews',
    'Building controlled collapsible panels where open state is managed externally by parent logic',
    'Displaying FAQ answers or support content that starts collapsed and expands on demand',
    'Showing preview snippets of reviews or comments with a "Read more" link for the full text',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Collapsible',
  files: [
    { name: 'Collapsible.tsx', description: 'Root component with context provider and state management' },
    { name: 'CollapsibleContent.tsx', description: 'Content panel with CSS line-clamp truncation when collapsed' },
    { name: 'CollapsibleTrigger.tsx', description: 'Button trigger that toggles content with customizable labels' },
    { name: 'types.ts', description: 'TypeScript type definitions for all props and context' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Collapsible',
  subComponents: [
    {
      name: 'Content',
      fileName: 'CollapsibleContent.tsx',
      description: 'Content panel that displays text with CSS line-clamp truncation when collapsed and full text when expanded',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to display inside the collapsible panel',
        },
        {
          name: 'lines',
          type: 'number',
          required: false,
          defaultValue: '3',
          description: 'Number of visible lines when the content is collapsed',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the content wrapper div',
        },
      ],
    },
    {
      name: 'Trigger',
      fileName: 'CollapsibleTrigger.tsx',
      description: 'Button that toggles the collapsible content open or closed, displaying configurable label text',
      props: [
        {
          name: 'showText',
          type: 'string',
          required: false,
          defaultValue: "'Show more'",
          description: 'Label text displayed when the content is collapsed',
        },
        {
          name: 'hideText',
          type: 'string',
          required: false,
          defaultValue: "'Show less'",
          description: 'Label text displayed when the content is expanded',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the trigger button element',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Collapsible.Content and Collapsible.Trigger sub-components',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Whether the collapsible starts in the expanded state (uncontrolled mode)',
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state — when provided, the component ignores internal state',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the open state changes, receives the new boolean value',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container div',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open / defaultOpen',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls whether the content is fully visible or truncated. Supports both controlled (via open prop) and uncontrolled (via defaultOpen prop) modes.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the trigger is clicked or external logic changes the open state. Receives the new open value.',
    },
    {
      name: 'onClick (internal)',
      signature: '() => void',
      description: 'Trigger button click handler that toggles the open state. Handled internally via context toggle function.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: undefined,
    attributes: [
      {
        name: 'aria-expanded',
        description: 'Applied to Collapsible.Trigger button; true when content is visible, false when collapsed.',
        managedByComponent: true,
      },
      {
        name: 'aria-controls',
        description: 'Applied to Collapsible.Trigger button; references the auto-generated content panel ID to associate the trigger with its content.',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Applied to Collapsible.Content panel; references the auto-generated trigger button ID to label the region.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Toggles the collapsible content open/closed when the trigger button is focused.',
      },
      {
        key: 'Space',
        behavior: 'Toggles the collapsible content open/closed when the trigger button is focused.',
      },
    ],
    focusManagement:
      'Focus remains on the trigger button after toggling. Content does not steal focus when expanded or collapsed.',
    wcagLevel: 'AA',
    notes:
      'Content panel uses role="region" to identify it as a live content region. ARIA IDs are auto-generated via React.useId() ensuring uniqueness. Content remains in the accessibility tree even when collapsed via line-clamp — screen readers can still navigate to the region.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'tailwind-merge' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'typography',
      reason: 'Commonly used alongside Collapsible for headings above collapsible sections',
    },
    {
      slug: 'card',
      reason: 'Collapsible is often placed inside Card containers for grouped content sections',
    },
    {
      slug: 'accordion',
      reason: 'Alternative pattern for multiple expand/collapse sections with single-expand support',
    },
    {
      slug: 'tab',
      reason: 'Alternative to Collapsible for switching between content sections without collapsing',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Collapsible',
      description: 'Default uncontrolled collapsible with 3-line truncation and "Show more"/"Show less" toggle.',
      code: `import { Collapsible } from 'vayu-ui';

const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';

export default function BasicCollapsible() {
  return (
    <Collapsible>
      <Collapsible.Content lines={3}>{longText}</Collapsible.Content>
      <Collapsible.Trigger />
    </Collapsible>
  );
}`,
      tags: ['basic', 'uncontrolled', 'default'],
    },
    {
      title: 'Custom Trigger Text',
      description: 'Collapsible with custom "Read more"/"Read less" labels and 2-line clamp.',
      code: `import { Collapsible } from 'vayu-ui';

const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';

export default function CustomTextCollapsible() {
  return (
    <Collapsible>
      <Collapsible.Content lines={2}>{longText}</Collapsible.Content>
      <Collapsible.Trigger showText="Read more" hideText="Read less" />
    </Collapsible>
  );
}`,
      tags: ['custom-labels', 'line-clamp'],
    },
    {
      title: 'Controlled State',
      description: 'Collapsible with externally managed open state, allowing programmatic toggle via an external button.',
      code: `import { useState } from 'react';
import { Collapsible } from 'vayu-ui';

export default function ControlledCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <Collapsible.Content lines={2}>
          This is a controlled collapsible. The open state is managed externally.
        </Collapsible.Content>
        <Collapsible.Trigger />
      </Collapsible>
      <button onClick={() => setOpen(!open)}>
        External Toggle ({open ? 'Open' : 'Closed'})
      </button>
    </>
  );
}`,
      tags: ['controlled', 'external-state'],
    },
    {
      title: 'Default Open',
      description: 'Collapsible that starts in the expanded state using defaultOpen prop.',
      code: `import { Collapsible } from 'vayu-ui';

export default function DefaultOpenCollapsible() {
  return (
    <Collapsible defaultOpen>
      <Collapsible.Content lines={2}>
        This collapsible starts in the open state by default. Click "Show less" to collapse it.
      </Collapsible.Content>
      <Collapsible.Trigger />
    </Collapsible>
  );
}`,
      tags: ['default-open', 'uncontrolled'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside Collapsible root',
      bad: '<div><Collapsible.Trigger /></div>',
      good: '<Collapsible><Collapsible.Content>...</Collapsible.Content><Collapsible.Trigger /></Collapsible>',
      reason: 'Content and Trigger depend on CollapsibleContext provided by the root Collapsible. Using them standalone throws a runtime error: "Collapsible components must be used within Collapsible.Root".',
    },
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<Collapsible defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>...</Collapsible>',
      good: '<Collapsible open={isOpen} onOpenChange={setIsOpen}>...</Collapsible>',
      reason: 'When the open prop is provided, the component runs in controlled mode and ignores defaultOpen. Supplying both is misleading — pick one pattern and stick with it.',
    },
    {
      title: 'Omitting Content before Trigger',
      bad: '<Collapsible><Collapsible.Trigger /></Collapsible>',
      good: '<Collapsible><Collapsible.Content lines={3}>Content here</Collapsible.Content><Collapsible.Trigger /></Collapsible>',
      reason: 'The Trigger toggles content visibility. Without a Content sibling, the trigger button has nothing to expand/collapse, resulting in a broken UI.',
    },
    {
      title: 'Using onOpenChange without open prop',
      bad: '<Collapsible onOpenChange={handleChange}>...</Collapsible>',
      good: '<Collapsible open={isOpen} onOpenChange={setIsOpen}>...</Collapsible>',
      reason: 'While onOpenChange works in uncontrolled mode (it fires as a side-effect callback), relying on it to sync external state without the open prop will cause the UI and state to diverge. Use the controlled pattern (open + onOpenChange) when syncing external state.',
    },
    {
      title: 'Setting lines to 0 or negative values',
      bad: '<Collapsible.Content lines={0}>Content</Collapsible.Content>',
      good: '<Collapsible.Content lines={3}>Content</Collapsible.Content>',
      reason: 'The lines prop maps to -webkit-line-clamp. A value of 0 or negative results in undefined browser behavior — the content may not clamp at all or disappear entirely. Use a positive integer (default is 3).',
    },
  ],
};
