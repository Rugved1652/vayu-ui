import { ComponentRegistryEntry } from '../types.js';

export const tooltipEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'tooltip',
  name: 'Tooltip',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A portal-based tooltip component that displays contextual content on hover or focus, with four placement positions, seven color variants, configurable show/hide delays, directional arrows, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The Tooltip component renders a floating portal element positioned relative to a trigger. It supports four placements (top, bottom, left, right) with automatic viewport-edge clamping. Seven color variants map to design tokens (default/elevated, brand, muted, success, warning, destructive, info). Show and hide delays are independently configurable. A directional arrow is rendered via a rotated square div. The tooltip body is hoverable (WCAG 2.5.7) — the hide delay keeps it visible while the cursor moves toward it. Touch targets are enforced at a minimum of 44×44px (WCAG 2.5.8) by default, but can be disabled for inline text usage. The component uses React portals for z-index layering and requestAnimationFrame for flicker-free positioning.',
  tags: [
    'tooltip',
    'overlay',
    'popover',
    'hover',
    'focus',
    'hint',
    'label',
    'portal',
    'positioning',
    'a11y',
    'wcag',
  ],
  useCases: [
    'Display helpful hints or descriptions when users hover over or focus on interactive elements',
    'Provide accessible labels for icon-only buttons that have no visible text',
    'Show contextual status information (success, warning, error) near relevant UI elements',
    'Add supplementary detail to form fields, badges, or truncated text without cluttering the layout',
    'Create hoverable info panels that users can move their cursor into without the tooltip disappearing',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Tooltip',
  files: [
    { name: 'Tooltip.tsx', description: 'ForwardRef component with portal rendering, positioning logic, show/hide timing, and variant styling' },
    { name: 'types.ts', description: 'TypeScript interfaces for TooltipProps, TooltipPosition, and TooltipVariant' },
    { name: 'index.ts', description: 'Barrel export file re-exporting Tooltip and all type definitions' },
    { name: 'README.md', description: 'Component anatomy and use-case documentation' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Tooltip',
  subComponents: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'content',
      type: 'React.ReactNode',
      required: true,
      description: 'Tooltip content — plain string or rich JSX rendered inside the tooltip body',
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'left' | 'right'",
      required: false,
      defaultValue: "'top'",
      description: 'Placement of the tooltip relative to the trigger element',
      options: ['top', 'bottom', 'left', 'right'],
    },
    {
      name: 'delay',
      type: 'number',
      required: false,
      defaultValue: '200',
      description: 'Delay in milliseconds before the tooltip becomes visible after hover/focus',
    },
    {
      name: 'hideDelay',
      type: 'number',
      required: false,
      defaultValue: '150',
      description: 'Delay in milliseconds before the tooltip disappears after the cursor leaves the trigger',
    },
    {
      name: 'variant',
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info'",
      required: false,
      defaultValue: "'default'",
      description: 'Color variant applied to the tooltip background and text via design tokens',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'destructive', 'info'],
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, the tooltip will not appear on hover or focus',
    },
    {
      name: 'showArrow',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to render a directional arrow pointing from the tooltip to the trigger',
    },
    {
      name: 'ensureTouchTarget',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Enforce a minimum 24×24px touch target on the trigger for WCAG 2.5.8 compliance; set false for inline text tooltips',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The trigger element that shows the tooltip on hover or focus',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['default', 'primary', 'secondary', 'success', 'warning', 'destructive', 'info'],
    default: 'default',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'visible',
      prop: 'isVisible (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'The tooltip portal is mounted and positioned; controlled internally by hover/focus timeouts',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Tooltip is completely suppressed — no portal renders on hover or focus',
    },
    {
      name: 'mounted',
      prop: 'mounted (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Client-side hydration flag; portal only renders after mount to avoid SSR mismatches',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onMouseEnter',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires on the trigger wrapper; starts the show delay timer',
    },
    {
      name: 'onMouseLeave',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires on the trigger wrapper; starts the hide delay timer',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fires when the trigger receives keyboard focus; starts the show delay timer',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fires when the trigger loses focus; starts the hide delay timer',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'tooltip',
    attributes: [
      {
        name: 'aria-describedby',
        description: 'Applied to the trigger element when the tooltip is visible; references the tooltip portal element by auto-generated ID to associate descriptive content with the trigger',
        managedByComponent: true,
      },
      {
        name: 'role="tooltip"',
        description: 'Applied to the tooltip portal element to identify it as a tooltip for assistive technology',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to the directional arrow div to hide the decorative element from the accessibility tree',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Focuses the trigger element, which initiates the show delay and displays the tooltip',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus away from the trigger, which initiates the hide delay and dismisses the tooltip',
      },
      {
        key: 'Escape',
        behavior: 'Immediately dismisses the visible tooltip regardless of hide delay',
      },
    ],
    focusManagement:
      'The trigger element is focusable via keyboard Tab navigation. onFocus triggers the tooltip show timer; onBlur triggers the hide timer. The tooltip body is mouse-interactive (pointer-events-auto) to allow hover persistence per WCAG 2.5.7.',
    wcagLevel: 'AA',
    notes:
      'Implements WCAG 2.5.7 (Dragging Movements) by making the tooltip body hoverable with a configurable hide delay. Implements WCAG 2.5.8 (Target Size — Minimum) with a default 24×24px minimum touch target on the trigger (ensureTouchTarget). The tooltip portal uses role="tooltip" and the trigger uses aria-describedby to create the required programmatic association. The decorative arrow is hidden with aria-hidden="true".',
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
      reason: 'Tooltips are most commonly attached to Button elements, especially icon-only buttons that need a text label',
    },
    {
      slug: 'badge',
      reason: 'Badges with truncated or abbreviated text benefit from tooltips showing the full label',
    },
    {
      slug: 'typography',
      reason: 'Typography.Link and inline text elements can use tooltips for supplementary context or definitions',
    },
    {
      slug: 'avatar',
      reason: 'Avatars often display the user name in a tooltip on hover for compact layouts',
    },
    {
      slug: 'card',
      reason: 'Cards with metadata or truncated descriptions can surface full content via tooltips',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Positions',
      description: 'Four directional placements (top, bottom, left, right) around trigger buttons.',
      code: `import { Tooltip, Button } from 'vayu-ui';

export default function PositionsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} content={\`Tooltip on \${pos}\`} position={pos}>
          <Button variant="outline" size="small" className="capitalize">
            {pos}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}`,
      tags: ['position', 'top', 'bottom', 'left', 'right'],
    },
    {
      title: 'Variants',
      description: 'Color variants matching status tokens — default, success, warning, destructive, and primary.',
      code: `import { Tooltip, Button } from 'vayu-ui';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip content="Default tooltip" variant="default">
        <Button variant="ghost" size="small">
          <Button.Icon>
            <Info className="w-4 h-4" aria-hidden="true" />
          </Button.Icon>
          <span className="sr-only">Info</span>
        </Button>
      </Tooltip>
      <Tooltip content="Success!" variant="success">
        <Button variant="ghost" size="small">
          <Button.Icon>
            <CheckCircle className="w-4 h-4 text-success" aria-hidden="true" />
          </Button.Icon>
          <span className="sr-only">Success</span>
        </Button>
      </Tooltip>
      <Tooltip content="Warning — check this" variant="warning">
        <Button variant="ghost" size="small">
          <Button.Icon>
            <AlertTriangle className="w-4 h-4 text-warning" aria-hidden="true" />
          </Button.Icon>
          <span className="sr-only">Warning</span>
        </Button>
      </Tooltip>
      <Tooltip content="Error occurred" variant="destructive">
        <Button variant="ghost" size="small">
          <Button.Icon>
            <XCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
          </Button.Icon>
          <span className="sr-only">Error</span>
        </Button>
      </Tooltip>
      <Tooltip content="Primary action" variant="primary">
        <Button variant="primary" size="small">
          Primary
        </Button>
      </Tooltip>
    </div>
  );
}`,
      tags: ['variant', 'default', 'success', 'warning', 'destructive', 'primary'],
    },
    {
      title: 'Options',
      description: 'Disabled tooltip, arrow hidden, and custom show delay configuration.',
      code: `import { Tooltip, Button } from 'vayu-ui';

export default function OptionsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip content="This won't show" disabled>
        <Button variant="secondary" size="small" disabled>
          Disabled
        </Button>
      </Tooltip>
      <Tooltip content="No arrow" showArrow={false}>
        <Button variant="outline" size="small">
          No Arrow
        </Button>
      </Tooltip>
      <Tooltip content="Slow delay" delay={800}>
        <Button variant="outline" size="small">
          800ms Delay
        </Button>
      </Tooltip>
    </div>
  );
}`,
      tags: ['disabled', 'arrow', 'delay', 'options'],
    },
    {
      title: 'Accessibility',
      description: 'Hoverable tooltip with extended hide delay (WCAG 2.5.7) and inline text tooltip with touch target disabled.',
      code: `import { Tooltip, Button, Typography } from 'vayu-ui';
import { Accessibility } from 'lucide-react';

export default function AccessibilityDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip
        content="You can hover over this tooltip without it disappearing (WCAG 2.5.7)"
        hideDelay={300}
      >
        <Button variant="outline" size="small">
          <Button.Icon>
            <Accessibility className="w-4 h-4" aria-hidden="true" />
          </Button.Icon>
          Hoverable
        </Button>
      </Tooltip>
      <Tooltip
        content="No minimum touch target enforced (useful for inline text)"
        ensureTouchTarget={false}
      >
        <Typography.Link className="cursor-help">Inline text</Typography.Link>
      </Tooltip>
    </div>
  );
}`,
      tags: ['a11y', 'accessibility', 'wcag', 'hoverable', 'touch-target'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Putting critical information only in a tooltip',
      bad: '<Tooltip content="Deleting this item is permanent and cannot be undone"><Button variant="destructive">Delete</Button></Tooltip>',
      good: '<Button variant="destructive" onClick={openConfirmDialog}>Delete</Button> with a confirmation Modal showing the warning',
      reason: 'Tooltips are supplementary — they disappear on mouse leave, Escape, or scroll. Critical actions, warnings, or required instructions must be persistently visible, not hidden behind a hover interaction.',
    },
    {
      title: 'Using Tooltip for form validation messages',
      bad: '<Tooltip content="Email is required" variant="destructive"><TextInput /></Tooltip>',
      good: '<TextInput error="Email is required" /> with visible inline error text below the field',
      reason: 'Validation errors must be persistently visible and programmatically associated via aria-describedby on the input. Tooltips are transient and will not pass WCAG 3.3.1 (Error Identification) or 3.3.3 (Error Suggestion).',
    },
    {
      title: 'Wrapping non-interactive elements without ensuring focusability',
      bad: '<Tooltip content="Detail"><span>Some text</span></Tooltip>',
      good: '<Tooltip content="Detail"><button type="button" className="...">Some text</button></Tooltip>',
      reason: 'The tooltip trigger uses onFocus/onBlur to show/hide. Plain <span> elements are not keyboard-focusable by default, so the tooltip will be invisible to keyboard and assistive technology users.',
    },
    {
      title: 'Setting hideDelay to 0',
      bad: '<Tooltip content="Gone instantly" hideDelay={0}>...',
      good: '<Tooltip content="Persists briefly" hideDelay={150}>...',
      reason: 'A zero hide delay makes the tooltip disappear the instant the cursor leaves the trigger, violating WCAG 2.5.7 (Dragging Movements). Users need time to move their cursor into the tooltip body. Use at least 100–150ms.',
    },
    {
      title: 'Disabling ensureTouchTarget on interactive triggers',
      bad: '<Tooltip ensureTouchTarget={false}><Button size="small">Tiny</Button></Tooltip>',
      good: '<Tooltip ensureTouchTarget><Button size="small">Small</Button></Tooltip>',
      reason: 'ensureTouchTarget enforces WCAG 2.5.8 minimum target sizes. Only disable it for inline text tooltips where the surrounding text provides sufficient hit area. Interactive triggers like buttons need the minimum size.',
    },
  ],
};
