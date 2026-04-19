import { ComponentRegistryEntry } from '../types.js';

export const buttonGroupEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'button-group',
  name: 'ButtonGroup',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A layout component that groups multiple Button elements with consistent sizing, spacing, and WCAG-compliant focus management.',
  longDescription:
    'ButtonGroup wraps child <Button> elements in a flex container and enforces uniform size, spacing, and border-radius via CSS descendant selectors. It supports horizontal and vertical orientations, full-width stretching, and four radius variants using semantic design tokens. No Context or cloneElement is required — sizing is applied purely through CSS, making the component safe for Server Components. Focus management uses z-index to ensure the focus-visible ring is never clipped by adjacent buttons (WCAG 2.4.11).',
  tags: [
    'button',
    'group',
    'toolbar',
    'action',
    'segmented',
    'layout',
    'flex',
    'orientation',
  ],
  useCases: [
    'Grouping related action buttons such as text alignment (left, center, right)',
    'Creating toolbar-style interfaces with consistent sizing and spacing',
    'Building segmented controls with mutually exclusive button options',
    'Displaying confirm/cancel action pairs that span the full container width',
    'Organizing icon-only buttons into a compact horizontal or vertical strip',
    'Ensuring uniform size and border-radius across a set of mixed-variant buttons',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'ButtonGroup',
  files: [
    { name: 'ButtonGroup.tsx', description: 'Root component that renders a flex container with role="group", CSS-enforced sizing, radius tokens, and z-index focus management' },
    { name: 'types.ts', description: 'TypeScript type definitions for ButtonGroupProps and ButtonGroupRadius union' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the component and all types' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'ButtonGroup',
  subComponents: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      defaultValue: "'horizontal'",
      description: 'Stack buttons in a row or column layout',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      defaultValue: "'medium'",
      description: 'Forces uniform padding, font size, and min-height on all child buttons via CSS descendant selectors',
      options: ['small', 'medium', 'large'],
    },
    {
      name: 'radius',
      type: "ButtonGroupRadius",
      required: false,
      defaultValue: "'control'",
      description: 'Border radius variant using semantic design tokens, applied to the group container and all child buttons',
      options: ['control', 'surface', 'overlay', 'full'],
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, the group stretches to full container width and each child button gets flex-1',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Button elements to group together',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label for the button group; essential for screen readers to announce the group purpose',
    },
    {
      name: 'aria-labelledby',
      type: 'string',
      required: false,
      description: 'ID of an element that labels this button group, as an alternative to aria-label',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['small', 'medium', 'large'],
    default: 'medium',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'orientation',
      prop: 'orientation',
      values: ['horizontal', 'vertical'],
      isBoolean: false,
      defaultValue: 'horizontal',
      description: 'Controls whether buttons are laid out in a row (flex-row) or column (flex-col).',
    },
    {
      name: 'fullWidth',
      prop: 'fullWidth',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, the group becomes w-full and each child button receives flex-1 to distribute space evenly.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the group container is clicked; individual button clicks bubble up to this handler',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fired when any element within the group receives focus',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fired when focus leaves the group container',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Fired on key press while the group or a child button has focus',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'role="group"',
        description: 'Applied to the root div to semantically group the child buttons as a related set of controls.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Passed through from the aria-label prop to provide an accessible name for the group. Required when there is no visible group heading.',
        managedByComponent: false,
      },
      {
        name: 'aria-labelledby',
        description: 'Passed through from the aria-labelledby prop to reference an external element that labels the group.',
        managedByComponent: false,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the first child button (or next focusable element if already inside the group)',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous focusable element outside the group',
      },
    ],
    focusManagement:
      'Child buttons receive a z-index bump on :hover and :focus-visible ([&>button:hover]:z-10, [&>button:focus-visible]:z-10) so the focus ring is never clipped by adjacent button borders (WCAG 2.4.11 Focus Appearance).',
    wcagLevel: 'AA',
    notes:
      'The group uses role="group" which is announced by screen readers as a landmark for the contained buttons. Either aria-label or aria-labelledby should always be provided so assistive technology can convey the group\'s purpose. Individual buttons retain their native keyboard and screen reader support.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [
    {
      slug: 'button',
      reason: 'ButtonGroup is designed to wrap Button elements; child buttons are required for correct sizing and spacing behavior',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'ButtonGroup wraps Button elements — every usage requires at least two Button children',
    },
    {
      slug: 'tooltip',
      reason: 'Icon-only buttons inside ButtonGroup benefit from tooltips to provide accessible text descriptions on hover',
    },
    {
      slug: 'card',
      reason: 'Cards frequently contain grouped action buttons (e.g. edit/delete) in headers or footers',
    },
    {
      slug: 'popover',
      reason: 'Button groups can serve as trigger elements for popover menus with additional actions',
    },
    {
      slug: 'divider',
      reason: 'Dividers separate distinct button groups visually when multiple groups appear in a toolbar',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Horizontal (Outline)',
      description: 'Basic horizontal button group with outline variant buttons, the default orientation.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function HorizontalOutline() {
  return (
    <ButtonGroup aria-label="Text alignment options">
      <Button variant="outline">
        <Button.Text>Left</Button.Text>
      </Button>
      <Button variant="outline">
        <Button.Text>Center</Button.Text>
      </Button>
      <Button variant="outline">
        <Button.Text>Right</Button.Text>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['horizontal', 'outline', 'basic'],
    },
    {
      title: 'Primary Variant',
      description: 'Button group with primary variant buttons for a prominent action set.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function PrimaryGroup() {
  return (
    <ButtonGroup aria-label="Save options">
      <Button variant="primary">
        <Button.Text>Save</Button.Text>
      </Button>
      <Button variant="primary">
        <Button.Text>Save &amp; Close</Button.Text>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['primary', 'action'],
    },
    {
      title: 'Vertical Orientation',
      description: 'Vertically stacked button group using orientation="vertical".',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function VerticalGroup() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Vertical actions" className="w-fit">
      <Button variant="outline">
        <Button.Text>Top</Button.Text>
      </Button>
      <Button variant="outline">
        <Button.Text>Middle</Button.Text>
      </Button>
      <Button variant="outline">
        <Button.Text>Bottom</Button.Text>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['vertical', 'orientation'],
    },
    {
      title: 'Full Width',
      description: 'Button group that spans the full container width with evenly distributed buttons.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function FullWidthGroup() {
  return (
    <ButtonGroup fullWidth aria-label="Confirmation actions">
      <Button variant="secondary">
        <Button.Text>Cancel</Button.Text>
      </Button>
      <Button variant="primary">
        <Button.Text>Confirm</Button.Text>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['full-width', 'confirm', 'cancel'],
    },
    {
      title: 'Mixed Variants',
      description: 'Button group combining outline, secondary, and primary variants for progressive action emphasis.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function MixedVariants() {
  return (
    <ButtonGroup aria-label="Mixed action buttons">
      <Button variant="outline">
        <Button.Text>Back</Button.Text>
      </Button>
      <Button variant="secondary">
        <Button.Text>Save Draft</Button.Text>
      </Button>
      <Button variant="primary">
        <Button.Text>Submit</Button.Text>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['mixed', 'variants', 'wizard'],
    },
    {
      title: 'With Icons',
      description: 'Button group with icon-only outline buttons for a compact formatting toolbar.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function IconGroup() {
  return (
    <ButtonGroup aria-label="Formatting options">
      <Button variant="outline">
        <Button.Icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          </svg>
        </Button.Icon>
      </Button>
      <Button variant="outline">
        <Button.Icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" x2="10" y1="4" y2="4" />
            <line x1="14" x2="15" y1="20" y2="4" />
            <line x1="5" x2="19" y1="20" y2="20" />
          </svg>
        </Button.Icon>
      </Button>
      <Button variant="outline">
        <Button.Icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8" />
            <path d="M14 12H6" />
            <path d="M10 8l-4 4 4 4" />
          </svg>
        </Button.Icon>
      </Button>
    </ButtonGroup>
  );
}`,
      tags: ['icons', 'toolbar', 'svg'],
    },
    {
      title: 'Radius Variants',
      description: 'All four radius options (control, surface, overlay, full) demonstrated side by side.',
      code: `import { Button, ButtonGroup } from 'vayu-ui';

export default function RadiusVariants() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup radius="control" aria-label="Control radius">
        <Button variant="outline"><Button.Text>A</Button.Text></Button>
        <Button variant="outline"><Button.Text>B</Button.Text></Button>
      </ButtonGroup>
      <ButtonGroup radius="surface" aria-label="Surface radius">
        <Button variant="outline"><Button.Text>A</Button.Text></Button>
        <Button variant="outline"><Button.Text>B</Button.Text></Button>
      </ButtonGroup>
      <ButtonGroup radius="overlay" aria-label="Overlay radius">
        <Button variant="outline"><Button.Text>A</Button.Text></Button>
        <Button variant="outline"><Button.Text>B</Button.Text></Button>
      </ButtonGroup>
      <ButtonGroup radius="full" aria-label="Full radius">
        <Button variant="outline"><Button.Text>A</Button.Text></Button>
        <Button variant="outline"><Button.Text>B</Button.Text></Button>
      </ButtonGroup>
    </div>
  );
}`,
      tags: ['radius', 'control', 'surface', 'overlay', 'full'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Missing aria-label on ButtonGroup',
      bad: '<ButtonGroup>\n  <Button variant="outline">Left</Button>\n  <Button variant="outline">Right</Button>\n</ButtonGroup>',
      good: '<ButtonGroup aria-label="Text alignment options">\n  <Button variant="outline">Left</Button>\n  <Button variant="outline">Right</Button>\n</ButtonGroup>',
      reason: 'Without an accessible name, screen readers announce the group role but cannot convey its purpose. Always provide aria-label or aria-labelledby so users understand what the grouped buttons control.',
    },
    {
      title: 'Using ButtonGroup for non-button children',
      bad: '<ButtonGroup>\n  <span>Option A</span>\n  <span>Option B</span>\n</ButtonGroup>',
      good: '<ButtonGroup aria-label="Options">\n  <Button variant="outline"><Button.Text>Option A</Button.Text></Button>\n  <Button variant="outline"><Button.Text>Option B</Button.Text></Button>\n</ButtonGroup>',
      reason: 'ButtonGroup applies CSS descendant selectors targeting direct <button> children ([&>button]:...) for sizing, radius, and focus management. Non-button children will not receive the enforced styles or proper z-index behavior.',
    },
    {
      title: 'Nesting ButtonGroups inside each other',
      bad: '<ButtonGroup aria-label="Outer">\n  <ButtonGroup aria-label="Inner">\n    <Button variant="outline">A</Button>\n  </ButtonGroup>\n  <Button variant="outline">B</Button>\n</ButtonGroup>',
      good: '<ButtonGroup aria-label="Actions">\n  <Button variant="outline">A</Button>\n  <Button variant="outline">B</Button>\n  <Button variant="outline">C</Button>\n</ButtonGroup>',
      reason: 'Nesting groups creates confusing semantics for assistive technology and breaks the [&>button] CSS selectors that only target direct child buttons. Use a single flat group or separate groups side by side.',
    },
    {
      title: 'Using fullWidth with a single button',
      bad: '<ButtonGroup fullWidth>\n  <Button variant="primary">Submit</Button>\n</ButtonGroup>',
      good: '<Button variant="primary" fullWidth>Submit</Button>',
      reason: 'A ButtonGroup with a single child adds unnecessary wrapper markup and semantic noise. Use the Button component directly with its own fullWidth prop instead.',
    },
    {
      title: 'Using vertical orientation without constraining width',
      bad: '<ButtonGroup orientation="vertical">\n  <Button variant="outline">Short</Button>\n  <Button variant="outline">Much longer label</Button>\n</ButtonGroup>',
      good: '<ButtonGroup orientation="vertical" className="w-fit" aria-label="Actions">\n  <Button variant="outline">Short</Button>\n  <Button variant="outline">Much longer label</Button>\n</ButtonGroup>',
      reason: 'Without a width constraint (e.g. w-fit or a fixed width), a vertical group will stretch to the full container width. Use className="w-fit" to let the column shrink to the widest button.',
    },
  ],
};
