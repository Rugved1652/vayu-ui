import { ComponentRegistryEntry } from '../types.js';

export const accordionEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'accordion',
  name: 'Accordion',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A vertically stacked set of expandable panels that reveal hidden content sections.',
  longDescription:
    'The Accordion component uses the compound component pattern (Accordion.Item, Accordion.Header, Accordion.Body) to create accessible, animated collapsible sections. It supports single-expand and multi-expand modes with WAI-ARIA compliant keyboard navigation.',
  tags: [
    'accordion',
    'collapsible',
    'expandable',
    'disclosure',
    'faq',
    'toggle',
    'panel',
    'section',
  ],
  useCases: [
    'Displaying FAQ sections where users expand answers one at a time',
    'Organizing long-form content into collapsible sections to reduce page scrolling',
    'Creating multi-step guides where each step reveals details on demand',
    'Building settings panels with grouped options that expand/collapse',
    'Showing product feature lists with expandable descriptions',
    'Creating sidebar navigation with collapsible category groups',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Accordion',
  files: [
    { name: 'Accordion.tsx', description: 'Root component with state management and context provider' },
    { name: 'AccordionItem.tsx', description: 'Container for a single collapsible section, handles item registration' },
    { name: 'AccordionHeader.tsx', description: 'Clickable trigger button with expand/collapse toggle and keyboard navigation' },
    { name: 'AccordionBody.tsx', description: 'Collapsible content panel with smooth height animation and ARIA region' },
    { name: 'types.ts', description: 'TypeScript type definitions for all props and context' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Accordion',
  subComponents: [
    {
      name: 'Item',
      fileName: 'AccordionItem.tsx',
      description: 'Wraps a single collapsible section containing a Header and Body pair',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Header and Body sub-components for this item',
        },
        {
          name: 'itemId',
          type: 'string',
          required: true,
          description: 'Unique identifier for this accordion item, used for ARIA attributes and state management',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the item wrapper div',
        },
      ],
    },
    {
      name: 'Header',
      fileName: 'AccordionHeader.tsx',
      description: 'Clickable trigger that toggles the associated Body panel open/closed',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text or content displayed in the header button',
        },
        {
          name: 'itemId',
          type: 'string',
          required: true,
          description: 'Must match the itemId of the corresponding Item and Body',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the header button element',
        },
      ],
    },
    {
      name: 'Body',
      fileName: 'AccordionBody.tsx',
      description: 'Animated collapsible content panel linked to a Header by shared itemId',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content displayed inside the collapsible panel when expanded',
        },
        {
          name: 'itemId',
          type: 'string',
          required: true,
          description: 'Must match the itemId of the corresponding Item and Header',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the inner content wrapper',
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
      description: 'Accordion.Item components to render as collapsible sections',
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, multiple items can be expanded simultaneously; when false, expanding one collapses others',
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
      prop: 'itemId (internal state via context)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Each item has an independent open/closed state managed internally. When allowMultiple is false, only one item can be open at a time.',
    },
    {
      name: 'animating',
      prop: 'height (internal)',
      isBoolean: false,
      values: ['0', 'scrollHeight', 'auto'],
      defaultValue: '0',
      description: 'Body panels animate between 0 and scrollHeight using CSS transitions on the height property, settling to auto when fully expanded.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick (internal)',
      signature: '() => void',
      description: 'Header click toggles the associated panel open/closed. Handled internally — no exposed callback prop.',
    },
    {
      name: 'onKeyDown (internal)',
      signature: '(e: React.KeyboardEvent) => void',
      description: 'Header keyboard handler for arrow navigation between items, Home/End jumps, and Escape to close. Handled internally.',
    },
    {
      name: 'onTransitionEnd (internal)',
      signature: '() => void',
      description: 'Fired on Body panel after height animation completes. Unmounts hidden content and sets height to auto for dynamic content. Handled internally.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-expanded',
        description: 'Applied to each Header button; true when the associated panel is open, false when closed.',
        managedByComponent: true,
      },
      {
        name: 'aria-controls',
        description: 'Applied to Header button; references the panel ID (e.g. "accordion-panel-{itemId}") to associate the trigger with its content panel.',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Applied to Body panel; references the header ID (e.g. "accordion-header-{itemId}") to label the region.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to Body panel; true when collapsed, false when expanded. Prevents screen readers from reading hidden content.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (chevron)',
        description: 'Applied to the chevron icon span inside the Header; always true since it is a decorative indicator.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        behavior: 'Moves focus to the next accordion header. Wraps from last to first.',
      },
      {
        key: 'ArrowUp',
        behavior: 'Moves focus to the previous accordion header. Wraps from first to last.',
      },
      {
        key: 'Home',
        behavior: 'Moves focus to the first accordion header.',
      },
      {
        key: 'End',
        behavior: 'Moves focus to the last accordion header.',
      },
      {
        key: 'Escape',
        behavior: 'Closes the currently open panel when pressed on an expanded header.',
      },
    ],
    focusManagement:
      'When a panel opens, focus moves to the first focusable element inside the panel after the animation. When a panel closes while it contains the active element, focus returns to the corresponding header button.',
    wcagLevel: 'AA',
    notes:
      'Body panels use role="region" and are labelled by their headers. Header buttons are wrapped in h3 elements for heading semantics. The component follows the WAI-ARIA Accordion Pattern.',
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
      reason: 'Commonly used inside Accordion.Body for formatted text content',
    },
    {
      slug: 'divider',
      reason: 'Used between multiple accordion groups or as visual separators in docs layouts',
    },
    {
      slug: 'card',
      reason: 'Accordion is often placed inside Card containers for grouped content sections',
    },
    {
      slug: 'tabs',
      reason: 'Alternative to Accordion for switching between content sections without collapsing',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Accordion',
      description: 'Single-expand accordion where only one panel can be open at a time. Expanding a new panel automatically collapses the previous one.',
      code: `import { Accordion } from 'vayu-ui';

export default function BasicAccordion() {
  return (
    <Accordion>
      <Accordion.Item itemId="item-1">
        <Accordion.Header itemId="item-1">Is it accessible?</Accordion.Header>
        <Accordion.Body itemId="item-1">
          Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="item-2">
        <Accordion.Header itemId="item-2">Is it styled?</Accordion.Header>
        <Accordion.Body itemId="item-2">
          Yes. It comes with default styles that matches the other components' aesthetic.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="item-3">
        <Accordion.Header itemId="item-3">Is it animated?</Accordion.Header>
        <Accordion.Body itemId="item-3">
          Yes. It's animated by default, but you can disable it if you prefer.
          Animations respect prefers-reduced-motion preferences.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}`,
      tags: ['basic', 'single-expand', 'default'],
    },
    {
      title: 'Multi-Expand Accordion',
      description: 'Accordion with allowMultiple enabled so multiple panels can be open simultaneously.',
      code: `import { Accordion } from 'vayu-ui';

export default function MultiAccordion() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item itemId="multi-1">
        <Accordion.Header itemId="multi-1">Section One</Accordion.Header>
        <Accordion.Body itemId="multi-1">
          Content for section one. Multiple sections can be open at the same time.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="multi-2">
        <Accordion.Header itemId="multi-2">Section Two</Accordion.Header>
        <Accordion.Body itemId="multi-2">
          Content for section two. This can stay open while section one is also expanded.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="multi-3">
        <Accordion.Header itemId="multi-3">Section Three</Accordion.Header>
        <Accordion.Body itemId="multi-3">
          Content for section three.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}`,
      tags: ['multi-expand', 'allow-multiple', 'advanced'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mismatched itemId values',
      bad: '<Accordion.Item itemId="a"><Accordion.Header itemId="b">Title</Accordion.Header></Accordion.Item>',
      good: '<Accordion.Item itemId="a"><Accordion.Header itemId="a">Title</Accordion.Header><Accordion.Body itemId="a">...</Accordion.Body></Accordion.Item>',
      reason: 'The itemId on Item, Header, and Body must all match. Mismatched IDs break ARIA associations (aria-controls, aria-labelledby) and panel state management.',
    },
    {
      title: 'Duplicate itemId values',
      bad: '<Accordion.Item itemId="faq"><Accordion.Header itemId="faq">Q1</Accordion.Header></Accordion.Item><Accordion.Item itemId="faq"><Accordion.Header itemId="faq">Q2</Accordion.Header></Accordion.Item>',
      good: '<Accordion.Item itemId="faq-1"><Accordion.Header itemId="faq-1">Q1</Accordion.Header></Accordion.Item><Accordion.Item itemId="faq-2"><Accordion.Header itemId="faq-2">Q2</Accordion.Header></Accordion.Item>',
      reason: 'Each itemId must be unique across the accordion. Duplicate IDs break HTML uniqueness, ARIA references, and internal state tracking.',
    },
    {
      title: 'Using Header or Body outside Accordion',
      bad: '<div><Accordion.Header itemId="x">Title</Accordion.Header></div>',
      good: '<Accordion><Accordion.Item itemId="x"><Accordion.Header itemId="x">Title</Accordion.Header></Accordion.Item></Accordion>',
      reason: 'Header and Body depend on AccordionContext provided by the root Accordion. Using them standalone throws a runtime error.',
    },
    {
      title: 'Omitting itemId on sub-components',
      bad: '<Accordion.Header>Section Title</Accordion.Header>',
      good: '<Accordion.Header itemId="section-1">Section Title</Accordion.Header>',
      reason: 'itemId is required on Item, Header, and Body. Without it, the component cannot register items, manage open state, or generate correct ARIA IDs.',
    },
    {
      title: 'Nesting accordions',
      bad: '<Accordion><Accordion.Item itemId="1"><Accordion.Body><Accordion>...</Accordion></Accordion.Body></Accordion.Item></Accordion>',
      good: 'Use a flat accordion structure or a different pattern like Tabs for hierarchical content.',
      reason: 'Nested accordions create confusing keyboard navigation, ambiguous heading levels, and a poor user experience. Restructure the content instead.',
    },
  ],
};
