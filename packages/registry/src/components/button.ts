import { ComponentRegistryEntry } from '../types.js';

export const buttonEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'button',
  name: 'Button',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A versatile button component with variants, sizes, loading states, icon support, and badge notifications using the compound component pattern.',
  longDescription:
    'The Button component uses the compound component pattern (Button.Icon, Button.Badge, Button.Text) to compose rich button layouts. It supports five visual variants (primary, secondary, outline, ghost, destructive), three sizes (small, medium, large), async loading states with a spinner and customizable loading text, icon placement on either side of the label, and notification badges with absolute or inline positioning. All variants follow WCAG 2.2 AA accessibility standards.',
  tags: [
    'button',
    'click',
    'action',
    'submit',
    'cta',
    'form',
    'interactive',
    'loading',
    'badge',
    'icon',
    'feedback',
  ],
  useCases: [
    'Primary call-to-action buttons for form submissions and page-level actions',
    'Secondary or outline buttons for less prominent actions alongside a primary CTA',
    'Destructive action buttons for delete, remove, or irreversible operations',
    'Async operations that need a loading spinner and disabled state while pending',
    'Icon-only or icon-and-text buttons in toolbars, card headers, or navigation',
    'Notification buttons with badge indicators showing unread counts or status labels',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Button',
  files: [
    { name: 'Button.tsx', description: 'Root button component with variant styling, loading spinner, and all state management' },
    { name: 'ButtonIcon.tsx', description: 'Icon wrapper that scales with button size and supports accessible labels' },
    { name: 'ButtonBadge.tsx', description: 'Notification badge with value overflow, variant coloring, and absolute/inline positioning' },
    { name: 'ButtonText.tsx', description: 'Text wrapper with truncation support for button labels' },
    { name: 'types.ts', description: 'TypeScript type definitions for Button, Icon, Badge, and Text props, plus Status enum and variant/size unions' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Button',
  subComponents: [
    {
      name: 'Icon',
      fileName: 'ButtonIcon.tsx',
      description: 'Wraps an icon element inside the button, scaling it to match the button size and optionally providing an accessible label',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Icon element to render (e.g. a Lucide icon component)',
        },
        {
          name: 'size',
          type: "ButtonSize",
          required: false,
          defaultValue: "'small'",
          description: 'Controls the icon dimensions: small (16px), medium (20px), large (24px)',
          options: ['small', 'medium', 'large'],
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Accessible label for the icon; when provided, sets role="img" and aria-label; when omitted, the icon is aria-hidden',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the icon wrapper span',
        },
      ],
    },
    {
      name: 'Badge',
      fileName: 'ButtonBadge.tsx',
      description: 'Renders a notification badge with numeric or text value, overflow handling, and multiple positioning modes',
      props: [
        {
          name: 'value',
          type: 'number | string',
          required: false,
          description: 'Badge content: a number (with overflow handling) or a custom string label',
        },
        {
          name: 'max',
          type: 'number',
          required: false,
          defaultValue: '99',
          description: 'Maximum numeric value before displaying "{max}+" overflow text',
        },
        {
          name: 'position',
          type: "BadgePosition",
          required: false,
          defaultValue: "'top-right'",
          description: 'Badge placement relative to the button',
          options: ['top-right', 'top-left', 'inline-right', 'inline-left'],
        },
        {
          name: 'variant',
          type: "BadgeVariant",
          required: false,
          defaultValue: "'danger'",
          description: 'Color variant for the badge',
          options: ['primary', 'danger', 'warning', 'info', 'success'],
        },
        {
          name: 'showZero',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, displays the badge even when the numeric value is 0',
        },
        {
          name: 'size',
          type: "ButtonSize",
          required: false,
          defaultValue: "'small'",
          description: 'Controls badge dimensions to match button size',
          options: ['small', 'medium', 'large'],
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the badge span',
        },
      ],
    },
    {
      name: 'Text',
      fileName: 'ButtonText.tsx',
      description: 'Wraps button label text with built-in truncation for overflow handling',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Text content to display as the button label',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the text wrapper span',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'variant',
      type: "ButtonVariant",
      required: false,
      defaultValue: "'primary'",
      description: 'Visual style variant of the button',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    {
      name: 'size',
      type: "ButtonSize",
      required: false,
      defaultValue: "'small'",
      description: 'Button dimensions, padding, and font size',
      options: ['small', 'medium', 'large'],
    },
    {
      name: 'loading',
      type: 'Status',
      required: false,
      defaultValue: "Status.IDLE",
      description: 'Async loading state controlled by the Status enum: IDLE, PENDING, SUCCESS, REJECTED. PENDING shows a spinner and disables interaction.',
      options: ['idle', 'pending', 'success', 'rejected'],
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, the button stretches to fill the full width of its container',
    },
    {
      name: 'loadingText',
      type: 'string',
      required: false,
      defaultValue: "'Loading'",
      description: 'Text displayed next to the spinner during the PENDING loading state',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label for the button, especially important for icon-only buttons',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      required: false,
      defaultValue: "'button'",
      description: 'HTML button type attribute; defaults to "button" to prevent accidental form submission',
    },
  ],
  rendersAs: 'button',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    default: 'primary',
  },
  sizes: {
    propName: 'size',
    options: ['small', 'medium', 'large'],
    default: 'small',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'loading',
      prop: 'loading',
      values: ['idle', 'pending', 'success', 'rejected'],
      isBoolean: false,
      defaultValue: 'idle',
      description: 'Async operation state. When PENDING, the button shows a spinner, replaces children with loadingText, and disables interaction. SUCCESS and REJECTED can be used to trigger side effects while reverting to normal display.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Disables the button. Also automatically true when loading is PENDING, preventing duplicate clicks during async operations.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the button is clicked and not disabled or in a loading state',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLButtonElement>) => void',
      description: 'Fired when the button receives focus, which triggers the focus-visible ring',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLButtonElement>) => void',
      description: 'Fired when the button loses focus',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLButtonElement>) => void',
      description: 'Fired on key press while the button has focus; Enter and Space trigger the native click event',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'button',
    attributes: [
      {
        name: 'aria-disabled',
        description: 'Applied when the button is disabled or loading. Set to true alongside the native disabled attribute for screen reader compatibility.',
        managedByComponent: true,
      },
      {
        name: 'aria-busy',
        description: 'Set to true when the button is in the PENDING loading state, signaling to assistive technology that an async operation is in progress.',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" during loading so screen readers announce the loading state change without interrupting.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied when the aria-label prop is provided. Essential for icon-only buttons that have no visible text content.',
        managedByComponent: false,
      },
      {
        name: 'aria-hidden (Icon)',
        description: 'Set to true on Button.Icon when no label prop is provided, marking decorative icons as hidden from assistive technology.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Icon)',
        description: 'Set on Button.Icon when the label prop is provided, giving the icon an accessible name and switching its role to "img".',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Badge content)',
        description: 'The visible badge text is wrapped in aria-hidden="true" to prevent double-reading alongside the Badge role="status" label.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Activates the button (native HTML button behavior)',
      },
      {
        key: 'Space',
        behavior: 'Activates the button (native HTML button behavior)',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the next focusable element',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous focusable element',
      },
    ],
    focusManagement:
      'Focus-visible ring appears on keyboard focus using focus-visible:ring-2 with ring-offset. The ring color matches the variant (brand for primary, focus for secondary/outline/ghost, destructive for destructive). Pointer clicks do not trigger the ring.',
    wcagLevel: 'AA',
    notes:
      'The button uses native <button> elements for inherent keyboard and screen reader support. During loading, a screen-reader-only label announces the loadingText while the spinner is aria-hidden. Button.Badge uses role="status" with aria-live="polite" so badge value changes are announced automatically.',
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
      slug: 'text-input',
      reason: 'Commonly paired in forms where the button triggers submission of input data',
    },
    {
      slug: 'modal',
      reason: 'Buttons are used as trigger elements and footer actions (confirm/cancel) inside modals',
    },
    {
      slug: 'card',
      reason: 'Cards frequently contain action buttons in their headers or footers',
    },
    {
      slug: 'alert',
      reason: 'Destructive variant buttons are used alongside alerts for confirmation of critical actions',
    },
    {
      slug: 'tooltip',
      reason: 'Icon-only buttons benefit from tooltips to provide an accessible text description on hover',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Button Variants',
      description: 'All five visual variants displayed side by side: primary, secondary, outline, ghost, and destructive.',
      code: `import { Button } from 'vayu-ui';

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
      tags: ['variants', 'primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    {
      title: 'Button Sizes',
      description: 'Small, medium, and large button sizes using the secondary variant.',
      code: `import { Button } from 'vayu-ui';

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button size="small" variant="secondary">
        Small
      </Button>
      <Button size="medium" variant="secondary">
        Medium
      </Button>
      <Button size="large" variant="secondary">
        Large
      </Button>
    </div>
  );
}`,
      tags: ['sizes', 'small', 'medium', 'large'],
    },
    {
      title: 'Button with Icon',
      description: 'Buttons composed with Button.Icon and Button.Text sub-components, demonstrating icon placement on both sides of the label.',
      code: `import { Button } from 'vayu-ui';
import { Mail, Trash2, Send } from 'lucide-react';

export default function IconDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary">
        <Button.Icon>
          <Mail />
        </Button.Icon>
        <Button.Text>Email Login</Button.Text>
      </Button>
      <Button variant="destructive" size="small">
        <Button.Icon size="small">
          <Trash2 />
        </Button.Icon>
        <Button.Text>Delete</Button.Text>
      </Button>
      <Button variant="outline" size="large">
        <Button.Text>Send</Button.Text>
        <Button.Icon size="large">
          <Send />
        </Button.Icon>
      </Button>
    </div>
  );
}`,
      tags: ['icon', 'compound', 'lucide'],
    },
    {
      title: 'Loading State',
      description: 'Button with async loading state that shows a spinner and custom loading text during the PENDING state.',
      code: `import { Button, Status } from 'vayu-ui';
import React, { useState } from 'react';

export default function LoadingDemo() {
  const [loading, setLoading] = useState(Status.IDLE);

  const handleClick = () => {
    setLoading(Status.PENDING);
    setTimeout(() => setLoading(Status.SUCCESS), 2000);
    setTimeout(() => setLoading(Status.IDLE), 4000);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button
        variant="primary"
        loading={loading}
        onClick={handleClick}
        loadingText="Sending..."
      >
        Click to Load
      </Button>
    </div>
  );
}`,
      tags: ['loading', 'async', 'spinner', 'status'],
    },
    {
      title: 'Button with Badge',
      description: 'Buttons with notification badges showing counts, overflow values, and custom string labels in different positions and variants.',
      code: `import { Button } from 'vayu-ui';
import { Bell } from 'lucide-react';

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      <Button variant="secondary">
        <Button.Icon>
          <Bell />
        </Button.Icon>
        <Button.Badge value={3} variant="danger" />
      </Button>

      <Button variant="outline">
        <Button.Text>Messages</Button.Text>
        <Button.Badge value={12} max={9} variant="primary" position="top-right" />
      </Button>

      <Button variant="ghost">
        <Button.Text>Updates</Button.Text>
        <Button.Badge value="New" variant="info" position="inline-right" />
      </Button>
    </div>
  );
}`,
      tags: ['badge', 'notification', 'count', 'compound'],
    },
    {
      title: 'Disabled State',
      description: 'Buttons in the disabled state across multiple variants, showing the reduced opacity and non-interactive behavior.',
      code: `import { Button } from 'vayu-ui';

export default function DisabledDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  );
}`,
      tags: ['disabled', 'states'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Icon-only button without aria-label',
      bad: '<Button variant="ghost"><Button.Icon><Trash2 /></Button.Icon></Button>',
      good: '<Button variant="ghost" aria-label="Delete item"><Button.Icon><Trash2 /></Button.Icon></Button>',
      reason: 'Without an aria-label, screen readers announce an unlabeled button or nothing at all. Every button must have an accessible name, either from visible text or an aria-label prop.',
    },
    {
      title: 'Using type="submit" on non-form buttons',
      bad: '<Button onClick={handleClick}>Filter</Button>',
      good: '<Button type="button" onClick={handleClick}>Filter</Button>',
      reason: 'While the component defaults to type="button", if you override it to type="submit" outside a form, or forget that the default was previously "submit" in older code, it can cause unexpected page reloads. Always be intentional about the type attribute.',
    },
    {
      title: 'Placing interactive elements inside Button',
      bad: '<Button><a href="/link">Go</a></Button><Button><input type="checkbox" /></Button>',
      good: '<Button onClick={() => router.push("/link")}>Go</Button>',
      reason: 'Nesting interactive elements (links, inputs, other buttons) inside a <button> violates HTML spec and breaks accessibility. Use the button\'s onClick handler instead.',
    },
    {
      title: 'Setting loading to true instead of Status enum',
      bad: '<Button loading={true}>Submit</Button>',
      good: '<Button loading={Status.PENDING}>Submit</Button>',
      reason: 'The loading prop expects a Status enum value (idle, pending, success, rejected), not a boolean. Passing true or false will not match any valid state and the button will behave unexpectedly.',
    },
    {
      title: 'Using Button.Badge or Button.Text outside Button',
      bad: '<div><Button.Badge value={5} /></div>',
      good: '<Button variant="secondary"><Button.Badge value={5} /></Button>',
      reason: 'Badge positions like "top-right" and "top-left" use absolute positioning that requires the Button\'s relative positioning context. Rendering Badge or Text outside a Button breaks layout and visual alignment.',
    },
  ],
};
