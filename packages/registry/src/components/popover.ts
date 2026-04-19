import { ComponentRegistryEntry } from '../types.js';

export const popoverEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'popover',
  name: 'Popover',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A floating panel component with automatic positioning, collision detection, arrow rendering, and the compound component pattern.',
  longDescription:
    'The Popover component renders a floating panel anchored to a trigger element. It uses the compound component pattern (Popover.Trigger, Popover.Content) to compose popover layouts. It supports controlled and uncontrolled open state, four placement sides (top, right, bottom, left) with three alignment options each (start, center, end), configurable side and alignment offsets, optional directional arrows, intelligent viewport collision detection with automatic side flipping, modal mode with a backdrop overlay, click-outside dismissal, Escape key handling, and automatic focus management. The trigger supports asChild for custom elements while maintaining all ARIA attributes.',
  tags: [
    'popover',
    'popup',
    'overlay',
    'dropdown',
    'tooltip',
    'floating',
    'dialog',
    'menu',
    'positioned',
  ],
  useCases: [
    'Dropdown menus and action menus that appear on click near a trigger element',
    'Informational popovers that display supplementary content, descriptions, or hints without navigating away',
    'Form controls embedded in a floating panel, such as date pickers, color pickers, or inline selects',
    'Contextual toolbars or formatting options that appear near selected content',
    'Interactive card previews or profile cards that expand on click with richer details',
    'Modal-style confirmation dialogs using the modal prop for critical actions that require focused attention',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Popover',
  files: [
    { name: 'Popover.tsx', description: 'Root component providing PopoverContext, controlled/uncontrolled state management, click-outside dismissal, and Escape key handling' },
    { name: 'PopoverTrigger.tsx', description: 'Trigger button that toggles the popover; supports asChild for custom trigger elements with aria-expanded and aria-haspopup' },
    { name: 'PopoverContent.tsx', description: 'Positioned floating panel with collision detection, arrow rendering, auto-focus on open, and optional modal backdrop' },
    { name: 'hooks.ts', description: 'PopoverContext, usePopover hook for consuming context, and usePopoverPosition hook for viewport-aware positioning logic' },
    { name: 'types.ts', description: 'TypeScript type definitions for PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverContextType, and arrow position classes' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component via Object.assign and re-exporting all types' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Popover',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'PopoverTrigger.tsx',
      description: 'Button that toggles the popover open/closed. When asChild is true, merges event handlers and ARIA attributes onto the child element instead of rendering a default button.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render; either a custom element (with asChild) or the default button label text',
        },
        {
          name: 'asChild',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, merges event handlers and ARIA attributes onto the child element instead of rendering a wrapping button',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Disables the trigger, preventing popover toggling on click or keyboard activation',
        },
      ],
      supportsAsChild: true,
    },
    {
      name: 'Content',
      fileName: 'PopoverContent.tsx',
      description: 'Positioned floating panel anchored to the trigger. Handles auto-focus on open, collision detection with side flipping, optional arrow rendering, and modal backdrop mode.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to display inside the popover panel',
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          required: false,
          defaultValue: "'bottom'",
          description: 'Preferred placement side of the popover relative to the trigger',
          options: ['top', 'right', 'bottom', 'left'],
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          required: false,
          defaultValue: "'center'",
          description: 'Alignment of the popover along the trigger axis',
          options: ['start', 'center', 'end'],
        },
        {
          name: 'sideOffset',
          type: 'number',
          required: false,
          defaultValue: '8',
          description: 'Distance in pixels between the trigger and the popover content',
        },
        {
          name: 'alignOffset',
          type: 'number',
          required: false,
          defaultValue: '0',
          description: 'Offset in pixels along the alignment axis',
        },
        {
          name: 'showArrow',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, renders a small directional arrow pointing from the popover to the trigger',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'When true, automatically flips the popover to the opposite side if there is not enough viewport space',
        },
      ],
    },
  ],
  hooks: ['usePopover', 'usePopoverPosition'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Popover sub-components (Trigger, Content) composing the full popover UI',
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state. Use with onOpenChange for fully controlled mode.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the popover open state changes, for controlled usage',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial open state for uncontrolled mode',
    },
    {
      name: 'modal',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, renders a semi-transparent backdrop overlay behind the popover and sets aria-modal to "true"',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — positioning props (side, align, offsets) are the primary visual differentiators.

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the popover is visible. In controlled mode, set via the open prop; in uncontrolled mode, toggled by Trigger click, Escape key, or click-outside.',
    },
    {
      name: 'modal',
      prop: 'modal',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, renders a backdrop overlay that blocks interaction with the rest of the page and sets aria-modal="true" on the content.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      values: undefined,
      isBoolean: true,
      defaultValue: 'false',
      description: 'Disables the Trigger sub-component, preventing the popover from opening on click or keyboard activation.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the popover open state changes (toggled by Trigger click, closed via Escape key or click-outside). Use this in controlled mode.',
    },
    {
      name: 'onClick (Trigger)',
      signature: '(event: React.MouseEvent<HTMLElement>) => void',
      description: 'Fired when the Trigger is clicked, before the popover toggles. Respects the disabled prop.',
    },
    {
      name: 'onKeyDown (Trigger)',
      signature: '(event: React.KeyboardEvent<HTMLElement>) => void',
      description: 'Fired on key down while the trigger has focus. Enter and Space toggle the popover open state.',
    },
    {
      name: 'onClick (Backdrop)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the modal backdrop is clicked (only when modal=true), which closes the popover.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'dialog',
    attributes: [
      {
        name: 'aria-expanded',
        description: 'Set on Popover.Trigger to reflect whether the popover is currently open or closed',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup',
        description: 'Set to "dialog" on Popover.Trigger to indicate that activating it opens a popup dialog',
        managedByComponent: true,
      },
      {
        name: 'role="dialog"',
        description: 'Set on Popover.Content to identify it as a dialog for screen readers',
        managedByComponent: true,
      },
      {
        name: 'aria-modal',
        description: 'Set to "true" on Popover.Content when modal mode is enabled, restricting screen reader navigation to the popover content',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (arrow)',
        description: 'Set to "true" on the arrow element to hide the decorative arrow from the accessibility tree',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (backdrop)',
        description: 'Set to "true" on the modal backdrop overlay to hide it from the accessibility tree',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the popover and returns focus to the trigger element',
      },
      {
        key: 'Enter',
        behavior: 'Toggles the popover open/closed when focus is on the trigger',
      },
      {
        key: 'Space',
        behavior: 'Toggles the popover open/closed when focus is on the trigger',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the next focusable element inside the popover content',
      },
    ],
    focusManagement:
      'When the popover opens, focus moves to Popover.Content via a double requestAnimationFrame delay with tabIndex={-1}. When the popover closes via Escape, focus returns to the trigger element. Clicking outside the trigger or content closes the popover.',
    wcagLevel: 'AA',
    notes:
      'The popover uses role="dialog" on the content and aria-haspopup="dialog" on the trigger. Focus management uses a double-RAF pattern to ensure the content is rendered before focusing. The arrow and backdrop elements use aria-hidden="true" to avoid polluting the accessibility tree.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [
    {
      slug: 'button',
      reason: 'Popover.Trigger renders a Button component by default when asChild is not used',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Commonly used as a custom trigger element via asChild on Popover.Trigger',
    },
    {
      slug: 'modal',
      reason: 'Alternative overlay pattern for center-screen dialogs; both share controlled/uncontrolled state patterns',
    },
    {
      slug: 'tooltip',
      reason: 'Similar floating panel pattern for hover-triggered information; used alongside popovers for different interaction patterns',
    },
    {
      slug: 'typography',
      reason: 'Frequently used inside Popover.Content for headings, descriptions, and body text',
    },
    {
      slug: 'divider',
      reason: 'Used inside popover content to separate sections of a dropdown menu or action list',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Popover',
      description: 'A simple popover with a default trigger button and content panel positioned below.',
      code: `import { Popover, Typography } from 'vayu-ui';

export default function BasicPopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Content>
        <div className="p-2">
          <Typography.H4 variant="primary" className="mb-1">
            Dimensions
          </Typography.H4>
          <Typography.P variant="secondary">
            Set the dimensions for the layer.
          </Typography.P>
        </div>
      </Popover.Content>
    </Popover>
  );
}`,
      tags: ['basic', 'default', 'uncontrolled'],
    },
    {
      title: 'Popover with Arrow',
      description: 'A popover that renders above the trigger with a directional arrow pointing to it.',
      code: `import { Popover, Typography } from 'vayu-ui';

export default function ArrowPopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger>With Arrow</Popover.Trigger>
      <Popover.Content showArrow side="top">
        <div className="p-2">
          <Typography.P variant="secondary">
            This popover has an arrow pointing to the trigger.
          </Typography.P>
        </div>
      </Popover.Content>
    </Popover>
  );
}`,
      tags: ['arrow', 'top', 'directional'],
    },
    {
      title: 'Position Variants',
      description: 'All four placement sides (top, bottom, left, right) with arrows demonstrating directional positioning.',
      code: `import { Popover, Typography } from 'vayu-ui';

export default function PositionPopoverDemo() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <Popover>
        <Popover.Trigger>Top</Popover.Trigger>
        <Popover.Content side="top" align="center" showArrow>
          <div className="p-2">
            <Typography.P variant="secondary">Top Position</Typography.P>
          </div>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>Bottom</Popover.Trigger>
        <Popover.Content side="bottom" align="center" showArrow>
          <div className="p-2">
            <Typography.P variant="secondary">Bottom Position</Typography.P>
          </div>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>Left</Popover.Trigger>
        <Popover.Content side="left" align="center" showArrow>
          <div className="p-2">
            <Typography.P variant="secondary">Left Position</Typography.P>
          </div>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>Right</Popover.Trigger>
        <Popover.Content side="right" align="center" showArrow>
          <div className="p-2">
            <Typography.P variant="secondary">Right Position</Typography.P>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}`,
      tags: ['positions', 'top', 'bottom', 'left', 'right'],
    },
    {
      title: 'Alignment Options',
      description: 'All three alignment options (start, center, end) for bottom-positioned popovers.',
      code: `import { Popover, Typography } from 'vayu-ui';

export default function AlignmentPopoverDemo() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <Popover>
        <Popover.Trigger>Start</Popover.Trigger>
        <Popover.Content side="bottom" align="start">
          <div className="p-2">
            <Typography.P variant="secondary">align="start"</Typography.P>
          </div>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>Center</Popover.Trigger>
        <Popover.Content side="bottom" align="center">
          <div className="p-2">
            <Typography.P variant="secondary">align="center" (default)</Typography.P>
          </div>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>End</Popover.Trigger>
        <Popover.Content side="bottom" align="end">
          <div className="p-2">
            <Typography.P variant="secondary">align="end"</Typography.P>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}`,
      tags: ['alignment', 'start', 'center', 'end'],
    },
    {
      title: 'Custom Trigger with asChild',
      description: 'Using the asChild pattern to render a custom Button component as the popover trigger while maintaining all ARIA attributes.',
      code: `import { Popover, Button, Typography } from 'vayu-ui';

export default function CustomTriggerPopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="primary">Custom Trigger</Button>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <div className="p-2">
          <Typography.P variant="secondary">
            Using asChild pattern with custom trigger element
          </Typography.P>
        </div>
      </Popover.Content>
    </Popover>
  );
}`,
      tags: ['aschild', 'custom-trigger', 'button'],
    },
    {
      title: 'Controlled Popover',
      description: 'Popover with externally managed open state using open and onOpenChange props for programmatic control.',
      code: `import { useState } from 'react';
import { Popover, Button, Typography } from 'vayu-ui';

export default function ControlledPopoverDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Controlled Popover
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>Toggle</Popover.Trigger>
        <Popover.Content showArrow>
          <div className="p-2">
            <Typography.P variant="secondary">
              This popover is controlled by external state.
            </Typography.P>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </Popover.Content>
      </Popover>
    </>
  );
}`,
      tags: ['controlled', 'state', 'programmatic'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<Popover open={isVisible} defaultOpen={true}>',
      good: '<Popover open={isVisible} onOpenChange={setIsVisible}>',
      reason: 'Passing both open and defaultOpen creates conflicting state management. Use open + onOpenChange for controlled mode, or defaultOpen for uncontrolled mode — never both.',
    },
    {
      title: 'Using Popover.Trigger without asChild for custom elements',
      bad: '<Popover.Trigger><Button variant="primary">Open</Button></Popover.Trigger>',
      good: '<Popover.Trigger asChild><Button variant="primary">Open</Button></Popover.Trigger>',
      reason: 'Without asChild, Popover.Trigger wraps children in a <button> element, resulting in a nested <button> inside <button> which is invalid HTML and causes accessibility issues.',
    },
    {
      title: 'Using Popover.Content outside of Popover',
      bad: '<div><Popover.Content>Content</Popover.Content></div>',
      good: '<Popover><Popover.Trigger>Open</Popover.Trigger><Popover.Content>Content</Popover.Content></Popover>',
      reason: 'Popover.Content requires the Popover context (open state, trigger/content refs, positioning) provided by the root Popover component. Using it outside Popover throws a runtime error.',
    },
    {
      title: 'Setting avoidCollisions to false without testing viewport edges',
      bad: '<Popover.Content side="right" avoidCollisions={false}>',
      good: '<Popover.Content side="right" avoidCollisions={true}>',
      reason: 'Disabling collision detection can cause the popover to render outside the viewport, making content unreachable. Only disable it if you have guaranteed viewport space or custom overflow handling.',
    },
    {
      title: 'Omitting accessible content in Popover.Content',
      bad: '<Popover.Content><img src="chart.png" /></Popover.Content>',
      good: '<Popover.Content><img src="chart.png" alt="Q4 revenue chart" /><Typography.P variant="secondary">Revenue increased 15%</Typography.P></Popover.Content>',
      reason: 'The content panel uses role="dialog" which screen readers announce as a dialog. Ensure there is readable text content (headings, descriptions) so users understand the popover purpose.',
    },
  ],
};
