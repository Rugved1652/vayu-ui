import { ComponentRegistryEntry } from '../types.js';

export const tourEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'tour',
  name: 'Tour',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A step-by-step guided tour component that highlights page elements with a spotlight overlay, positions a popover with an arrow pointer, and provides navigation controls for onboarding and feature discovery.',
  longDescription:
    'The Tour component guides users through a sequence of highlighted elements on the page. It renders a fixed SVG mask overlay with a spotlight cutout around the target element and a popover dialog with a directional arrow. The popover contains a header (title, step badge, close button), a body (string or JSX content), an optional progress bar, and a footer with Skip, Previous, and Next/Finish buttons. Steps are defined as an array of TourStep objects, each specifying a CSS selector target, placement direction, and optional overrides. The component supports controlled open state, keyboard navigation (ArrowRight, ArrowLeft, Escape), body scroll locking, automatic target scrolling, MutationObserver-based target detection, viewport clamping, and resize/scroll repositioning. The useTour hook provides imperative access to tour state and actions from anywhere within the Tour subtree.',
  tags: [
    'tour',
    'onboarding',
    'guided-tour',
    'walkthrough',
    'feature-discovery',
    'spotlight',
    'overlay',
    'popover',
    'step',
    'tutorial',
  ],
  useCases: [
    'Onboarding new users by walking them through key features of the application step by step',
    'Highlighting newly released features after a product update to drive adoption',
    'Guiding users through a complex multi-step workflow or form with contextual explanations',
    'Providing contextual help tooltips that progress through a sequence of UI elements',
    'Creating interactive product demos that highlight different parts of a dashboard or interface',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Tour',
  files: [
    { name: 'Tour.tsx', description: 'Root component providing TourContext, controlled state management, keyboard navigation, body scroll lock, and portal rendering' },
    { name: 'TourPopover.tsx', description: 'Popover dialog with directional arrow, header (title, step badge, close button), body content, progress bar, and footer navigation buttons' },
    { name: 'TourOverlay.tsx', description: 'SVG mask overlay with spotlight cutout around the target element and a branded highlight border' },
    { name: 'use-position.ts', description: 'Hook that calculates popover position relative to the target element with viewport clamping' },
    { name: 'use-target.ts', description: 'Hook that resolves the target element via CSS selector, observes DOM mutations, handles scroll-into-view, and tracks resize/scroll repositioning' },
    { name: 'hooks.ts', description: 'Export of the useTour hook for imperative access to tour state and navigation actions' },
    { name: 'types.ts', description: 'TypeScript type definitions for TourStep, TourContextValue, and TourProps' },
    { name: 'index.ts', description: 'Barrel export file re-exporting Tour, useTour, and all public types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Tour',
  subComponents: [],
  hooks: ['useTour'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The page content containing the elements targeted by tour steps (identified by CSS selectors)',
    },
    {
      name: 'steps',
      type: 'TourStep[]',
      required: true,
      description: 'Array of tour step definitions, each with a target selector, title, content, and optional placement/behavior overrides',
    },
    {
      name: 'isOpen',
      type: 'boolean',
      required: false,
      description: 'Controlled open state. When provided, the tour relies on the parent to manage visibility.',
    },
    {
      name: 'onClose',
      type: '() => void',
      required: false,
      description: 'Callback fired when the tour is closed via the close button, Escape key, or mask click',
    },
    {
      name: 'onComplete',
      type: '() => void',
      required: false,
      description: 'Callback fired when the user finishes the last step of the tour',
    },
    {
      name: 'onSkip',
      type: '() => void',
      required: false,
      description: 'Callback fired when the user skips the tour before completing all steps',
    },
    {
      name: 'showProgress',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Show a progress bar between the body and footer indicating tour completion percentage',
    },
    {
      name: 'showStepNumbers',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Show a "1 / N" step badge in the popover header',
    },
    {
      name: 'maskClickable',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Allow pointer events to pass through the overlay mask so users can interact with the page behind the tour',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Close the tour when the Escape key is pressed',
    },
    {
      name: 'closeOnMaskClick',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Close the tour when the user clicks on the overlay mask',
    },
    {
      name: 'scrollBehavior',
      type: 'ScrollBehavior',
      required: false,
      defaultValue: "'smooth'",
      description: 'Scroll behavior when scrolling the target element into view (smooth, auto, or instant)',
      options: ['smooth', 'auto', 'instant'],
    },
    {
      name: 'highlightedAreaClassName',
      type: 'string',
      required: false,
      description: 'Additional CSS class name applied to the spotlight border element around the highlighted target',
    },
    {
      name: 'maskClassName',
      type: 'string',
      required: false,
      description: 'Additional CSS class name applied to the overlay mask container',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — the tour popover has a fixed max-w-md width.

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'isOpen',
      prop: 'isOpen',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the tour is currently visible. In controlled mode, set via isOpen; otherwise toggled programmatically.',
    },
    {
      name: 'isTransitioning',
      prop: 'isTransitioning',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Brief opacity transition state (300ms) applied when navigating between steps for a smooth fade effect.',
    },
    {
      name: 'closeOnEscape',
      prop: 'closeOnEscape',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Whether pressing Escape dismisses the tour. Disable for mandatory walkthroughs.',
    },
    {
      name: 'closeOnMaskClick',
      prop: 'closeOnMaskClick',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether clicking the overlay mask dismisses the tour.',
    },
    {
      name: 'maskClickable',
      prop: 'maskClickable',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether pointer events pass through the mask to allow interaction with the page behind the tour.',
    },
    {
      name: 'scrollBehavior',
      prop: 'scrollBehavior',
      isBoolean: false,
      values: ['smooth', 'auto', 'instant'],
      defaultValue: "'smooth'",
      description: 'Scroll behavior used when bringing the target element into view.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClose',
      signature: '() => void',
      description: 'Fired when the tour is closed by any method (close button, Escape key, or mask click)',
    },
    {
      name: 'onComplete',
      signature: '() => void',
      description: 'Fired when the user finishes the last step by clicking the Finish button',
    },
    {
      name: 'onSkip',
      signature: '() => void',
      description: 'Fired when the user clicks the "Skip Tour" button before completing all steps',
    },
    {
      name: 'TourStep.onNext',
      signature: '() => void | Promise<void>',
      description: 'Per-step async hook called before advancing to the next step. Await it to gate progression.',
    },
    {
      name: 'TourStep.onPrev',
      signature: '() => void | Promise<void>',
      description: 'Per-step async hook called before going back to the previous step.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'dialog',
    attributes: [
      {
        name: 'aria-modal',
        description: 'Set to "true" on the popover dialog, informing screen readers that content outside the tour is inert',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Set on the popover dialog with an auto-generated id linked to the step title heading, providing an accessible name',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on the overlay mask, arrow element, and decorative icons to exclude them from the accessibility tree',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied to navigation buttons (Close, Skip Tour, Previous, Next/Finish) with descriptive labels for screen readers',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'A "polite" live region announces the current step number and title when navigating between steps',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic',
        description: 'Set to "true" on the live region to ensure the entire step announcement is read as a whole',
        managedByComponent: true,
      },
      {
        name: 'role="progressbar"',
        description: 'Applied to the progress bar container with aria-valuenow, aria-valuemin, and aria-valuemax for step progress tracking',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the tour when closeOnEscape is true (default)',
      },
      {
        key: 'ArrowRight',
        behavior: 'Advances to the next step (equivalent to clicking Next)',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Goes back to the previous step (equivalent to clicking Previous)',
      },
    ],
    focusManagement:
      'Body scroll is locked while the tour is open. The target element is scrolled into view with the configured scroll behavior. The popover renders via React portal at the document body level. A live region announces step changes for screen readers.',
    wcagLevel: 'AA',
    notes:
      'The popover uses role="dialog" with aria-modal="true" and is labeled via an auto-generated id linked to the step title. Navigation buttons have descriptive aria-labels. The SVG overlay and decorative elements are marked aria-hidden. The progress bar uses the progressbar role with appropriate aria attributes. Step changes are announced via an aria-live="polite" region.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'lucide-react' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Used as the trigger to start the tour and commonly placed inside tour step content for custom call-to-action elements',
    },
    {
      slug: 'typography',
      reason: 'Used for page headings and body text that serve as tour targets and for content within tour steps',
    },
    {
      slug: 'modal',
      reason: 'Tours often guide users to open and interact with modal dialogs; the two overlay patterns complement each other',
    },
    {
      slug: 'tooltip',
      reason: 'Can be used alongside tours — tooltips for quick hover hints, tours for structured multi-step onboarding',
    },
    {
      slug: 'divider',
      reason: 'Used in page layouts between content sections that are highlighted as tour targets',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Tour',
      description: 'Controlled tour with four steps targeting different page elements using various placements.',
      code: `import { useState } from 'react';
import { Tour, type TourStep, Typography, Button, Divider } from 'vayu-ui';

const steps: TourStep[] = [
  {
    target: '#tour-title',
    title: 'Welcome!',
    content:
      'This is the Tour component. It highlights elements on the page and guides the user step-by-step.',
    placement: 'bottom',
  },
  {
    target: '#tour-card-1',
    title: 'Feature Cards',
    content: 'Each card represents a feature. The spotlight draws attention to the relevant area.',
    placement: 'right',
  },
  {
    target: '#tour-card-2',
    title: 'Second Card',
    content: 'Navigate with arrow keys, or use the Previous / Next buttons.',
    placement: 'left',
  },
  {
    target: '#tour-cta',
    title: 'Call to Action',
    content:
      'Click Finish to complete the tour. You can also press Escape or click Skip at any time.',
    placement: 'top',
  },
];

export default function TourDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose flex flex-col gap-6 w-full max-w-lg">
      <Tour
        steps={steps}
        isOpen={open}
        onClose={() => setOpen(false)}
        onComplete={() => setOpen(false)}
        onSkip={() => setOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <Typography.H3 id="tour-title" className="text-lg">
            Tour Demo
          </Typography.H3>

          <div className="grid grid-cols-2 gap-3">
            <div id="tour-card-1" className="p-4 rounded-surface border border-border bg-surface">
              <Typography.P className="text-sm">Feature A</Typography.P>
            </div>
            <div id="tour-card-2" className="p-4 rounded-surface border border-border bg-surface">
              <Typography.P className="text-sm">Feature B</Typography.P>
            </div>
          </div>

          <Divider spacing="sm" decorative />

          <Button
            id="tour-cta"
            onClick={() => setOpen(true)}
            variant="primary"
            size="medium"
            className="w-fit"
          >
            <Button.Text>Start Tour</Button.Text>
          </Button>
        </div>
      </Tour>
    </div>
  );
}`,
      tags: ['basic', 'controlled', 'placement', 'onboarding'],
    },
    {
      title: 'Tour with Custom Buttons',
      description: 'Override the default navigation buttons for a step using the customButtons prop.',
      code: `import { useState } from 'react';
import { Tour, type TourStep, Button, Typography } from 'vayu-ui';

const steps: TourStep[] = [
  {
    target: '#intro-heading',
    title: 'Custom Buttons',
    content: 'This step uses custom buttons instead of the default Previous/Next controls.',
    placement: 'bottom',
    customButtons: (
      <div className="flex items-center justify-between w-full">
        <button className="text-sm text-muted-content">Dismiss</button>
        <div className="flex gap-2">
          <Button variant="secondary" size="small">
            <Button.Text>Learn More</Button.Text>
          </Button>
          <Button variant="primary" size="small">
            <Button.Text>Got It</Button.Text>
          </Button>
        </div>
      </div>
    ),
  },
];

export default function CustomButtonsTour() {
  const [open, setOpen] = useState(false);

  return (
    <Tour
      steps={steps}
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <div>
        <Typography.H3 id="intro-heading">Custom Buttons Demo</Typography.H3>
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Button.Text>Start</Button.Text>
        </Button>
      </div>
    </Tour>
  );
}`,
      tags: ['custom-buttons', 'advanced', 'override'],
    },
    {
      title: 'Tour with Async Step Hooks',
      description: 'Use onNext and onPrev async hooks on steps to gate progression, such as waiting for data or user confirmation.',
      code: `import { useState } from 'react';
import { Tour, type TourStep, Button, Typography } from 'vayu-ui';

const steps: TourStep[] = [
  {
    target: '#async-target',
    title: 'Async Step',
    content: 'This step waits for an async operation before allowing progression.',
    placement: 'bottom',
    onNext: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Async onNext completed');
    },
    onPrev: async () => {
      console.log('Going back...');
    },
  },
  {
    target: '#async-target',
    title: 'Second Step',
    content: 'You arrived here after the async hook completed.',
    placement: 'bottom',
  },
];

export default function AsyncTourDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Tour
      steps={steps}
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <div>
        <Typography.H3 id="async-target">Async Hooks Demo</Typography.H3>
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Button.Text>Start Async Tour</Button.Text>
        </Button>
      </div>
    </Tour>
  );
}`,
      tags: ['async', 'hooks', 'advanced', 'gated'],
    },
    {
      title: 'Imperative Control with useTour',
      description: 'Use the useTour hook to control the tour programmatically from anywhere in the Tour subtree.',
      code: `import { Tour, useTour, type TourStep, Button, Typography } from 'vayu-ui';

const steps: TourStep[] = [
  { target: '#hook-target', title: 'Step 1', content: 'First step.', placement: 'bottom' },
  { target: '#hook-target', title: 'Step 2', content: 'Second step.', placement: 'bottom' },
  { target: '#hook-target', title: 'Step 3', content: 'Third step.', placement: 'bottom' },
];

function TourControls() {
  const { isOpen, currentStep, nextStep, prevStep, goToStep, close } = useTour();

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="small" onClick={prevStep}>
        <Button.Text>Prev</Button.Text>
      </Button>
      <Typography.P className="text-sm">
        Step {isOpen ? currentStep + 1 : 0}
      </Typography.P>
      <Button variant="secondary" size="small" onClick={nextStep}>
        <Button.Text>Next</Button.Text>
      </Button>
      <Button variant="outline" size="small" onClick={() => goToStep(2)}>
        <Button.Text>Jump to 3</Button.Text>
      </Button>
      <Button variant="outline" size="small" onClick={close}>
        <Button.Text>Close</Button.Text>
      </Button>
    </div>
  );
}

export default function ImperativeTourDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Tour steps={steps} isOpen={open} onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-4">
        <Typography.H3 id="hook-target">useTour Hook Demo</Typography.H3>
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Button.Text>Start Tour</Button.Text>
        </Button>
        <TourControls />
      </div>
    </Tour>
  );
}`,
      tags: ['useTour', 'hook', 'imperative', 'programmatic'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using a target selector that does not exist in the DOM',
      bad: '{ target: "#nonexistent-element", title: "Missing", content: "..." }',
      good: '{ target: "#real-element", title: "Found", content: "..." }',
      reason: 'The tour uses document.querySelector to resolve targets. If the selector matches nothing, the spotlight and popover will not render correctly. Ensure target elements exist in the DOM before the tour step activates.',
    },
    {
      title: 'Using useTour outside of a Tour provider',
      bad: 'function MyComponent() { const { nextStep } = useTour(); return <button onClick={nextStep}>Next</button>; }',
      good: 'Place MyComponent as a child of <Tour> so useTour can access the TourContext.',
      reason: 'useTour relies on TourContext which is only available within the <Tour> component subtree. Calling it outside throws an error.',
    },
    {
      title: 'Setting maskClickable and closeOnMaskClick both to true',
      bad: '<Tour maskClickable={true} closeOnMaskClick={true}>',
      good: '<Tour maskClickable={false} closeOnMaskClick={true}>',
      reason: 'When maskClickable is true, pointer events pass through the mask and the overlay click handler never fires, making closeOnMaskClick ineffective. Use closeOnMaskClick only when the mask captures clicks.',
    },
    {
      title: 'Hardcoding CSS colors instead of design tokens for custom buttons',
      bad: '<button style={{ background: "#3b82f6", color: "white" }}>Next</button>',
      good: '<Button variant="primary"><Button.Text>Next</Button.Text></Button>',
      reason: 'The tour uses design tokens (bg-elevated, border-border, bg-brand) for consistent theming. Custom buttons should use the same token system to match the popover styling across light and dark modes.',
    },
    {
      title: 'Targeting elements inside other portals or iframes',
      bad: '{ target: ".modal-inside-portal", title: "Portal Target", content: "..." }',
      good: 'Ensure target elements are in the main document DOM, or delay the tour until portal content is mounted.',
      reason: 'The tour uses document.querySelector and getBoundingClientRect to find and measure targets. Elements inside nested portals or iframes may not be resolvable by the top-level query selector, causing positioning failures.',
    },
  ],
};
