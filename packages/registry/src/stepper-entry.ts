import { ComponentRegistryEntry } from './types.js';

export const stepperEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'stepper',
  name: 'Stepper',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description: 'A progress indicator that displays steps in a horizontal or vertical workflow with connectors, statuses, and keyboard navigation.',
  longDescription: 'Stepper shows a multi-step process progress using compound subcomponents. It supports horizontal and vertical orientations, five step statuses (active, completed, inactive, loading, error), clickable steps with keyboard navigation, and custom step indicators with icons or content.',
  tags: ['stepper', 'steps', 'progress', 'wizard', 'workflow', 'navigation', 'form-steps', 'multi-step', 'indicator'],
  useCases: [
    'Multi-step form wizards (account creation, checkout, onboarding)',
    'Displaying progress through a sequential process or workflow',
    'Showing step-by-step instructions or guides',
    'Tracking completion status in a linear task flow',
    'Interactive step navigation allowing users to jump between completed steps',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Stepper',
  files: [
    { name: 'Stepper.tsx', description: 'Root component with context providers and compound assembly' },
    { name: 'step.tsx', description: 'Individual step with connectors, layout, and keyboard handling' },
    { name: 'StepperIndicator.tsx', description: 'Step indicator circle with status-based styling' },
    { name: 'StepperContent.tsx', description: 'Content wrapper with orientation-aware layout' },
    { name: 'hooks.ts', description: 'Context definitions and status helper' },
    { name: 'types.ts', description: 'TypeScript type definitions' },
    { name: 'index.ts', description: 'Public API exports' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'StepperRoot',
  subComponents: [
    {
      name: 'Step',
      fileName: 'step.tsx',
      description: 'Individual step container that renders indicator, connectors, and content based on orientation',
      props: [
        {
          name: 'status',
          type: "'active' | 'completed' | 'inactive' | 'loading' | 'error'",
          required: false,
          description: 'Override the automatically computed step status. When omitted, status is derived from activeStep and step index.',
          options: ['active', 'completed', 'inactive', 'loading', 'error'],
        },
      ],
    },
    {
      name: 'Indicator',
      fileName: 'StepperIndicator.tsx',
      description: 'Circular step indicator that displays status-based styling, check marks, error icons, or custom content',
      props: [
        {
          name: 'icon',
          type: 'ReactNode',
          required: false,
          description: 'Custom icon to display inside the indicator circle instead of the default check or error symbol',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'StepperContent.tsx',
      description: 'Container for step title and description with orientation-aware padding and alignment',
      props: [],
    },
    {
      name: 'Title',
      fileName: 'StepperContent.tsx',
      description: 'Step title rendered as an h3 element with status-based text color',
      props: [],
    },
    {
      name: 'Description',
      fileName: 'StepperContent.tsx',
      description: 'Step description rendered as a p element with muted styling and horizontal line-clamping',
      props: [],
    },
  ],
  hooks: ['useStepperContext', 'useStepIndexContext', 'useStepStatusContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'activeStep',
      type: 'number',
      required: true,
      description: 'Zero-based index of the currently active step. Determines which step is highlighted and which connectors are filled.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      defaultValue: "'horizontal'",
      description: 'Layout direction for the stepper. Horizontal arranges steps in a row; vertical stacks them in a column.',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'onStepClick',
      type: '((step: number) => void) | undefined',
      required: false,
      description: 'Callback when a step is clicked. Receives the zero-based step index. When provided, steps become focusable and clickable with keyboard support.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'orientation',
    options: ['horizontal', 'vertical'],
    default: 'horizontal',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'active',
      prop: 'status',
      values: ['active'],
      isBoolean: false,
      description: 'The current step. Indicator shows brand-colored circle with a ring glow. Connectors to this step are highlighted.',
    },
    {
      name: 'completed',
      prop: 'status',
      values: ['completed'],
      isBoolean: false,
      description: 'A step that has been finished. Indicator shows a brand-filled circle with a check mark by default.',
    },
    {
      name: 'inactive',
      prop: 'status',
      values: ['inactive'],
      isBoolean: false,
      defaultValue: "'inactive'",
      description: 'A step not yet reached. Indicator shows a bordered muted circle.',
    },
    {
      name: 'loading',
      prop: 'status',
      values: ['loading'],
      isBoolean: false,
      description: 'A step currently processing. Indicator pulses with an animation.',
    },
    {
      name: 'error',
      prop: 'status',
      values: ['error'],
      isBoolean: false,
      description: 'A step that encountered an error. Indicator shows a destructive-colored circle with an exclamation mark by default.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onStepClick',
      signature: '(step: number) => void',
      description: 'Fires when a user clicks a step. Receives the zero-based step index. Only fires when onStepClick is provided to Stepper.Root.',
    },
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Native click handler on a Step element, fired alongside onStepClick.',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Native keydown handler on a Step element. Fires after internal keyboard navigation is processed.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'list',
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the root element as "Progress steps, {completed} of {total} completed"',
        managedByComponent: true,
      },
      {
        name: 'aria-current',
        description: 'Set to "step" on the currently active step',
        managedByComponent: true,
      },
      {
        name: 'aria-posinset',
        description: 'Set to the 1-based step position on each Step element',
        managedByComponent: true,
      },
      {
        name: 'aria-setsize',
        description: 'Set to the total number of steps on each Step element',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on the StepIndicator since status is communicated via sr-only text',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      { key: 'Enter', behavior: 'Activates the focused step (calls onStepClick)' },
      { key: 'Space', behavior: 'Activates the focused step (calls onStepClick)' },
      { key: 'ArrowRight', behavior: 'Moves focus to the next step in horizontal orientation' },
      { key: 'ArrowLeft', behavior: 'Moves focus to the previous step in horizontal orientation' },
      { key: 'ArrowDown', behavior: 'Moves focus to the next step in vertical orientation' },
      { key: 'ArrowUp', behavior: 'Moves focus to the previous step in vertical orientation' },
      { key: 'Home', behavior: 'Moves focus to the first step' },
      { key: 'End', behavior: 'Moves focus to the last step' },
    ],
    focusManagement: 'Clickable steps receive tabindex="0" and support roving focus via arrow keys. Non-clickable steppers set tabindex="-1".',
    wcagLevel: 'AA',
    notes: 'Each step includes a screen reader announcement ("Step {n} of {total}, {status}") via sr-only text. Focus-visible ring is shown on group focus-visible.',
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
      reason: 'Used for Next/Back/Submit controls to navigate between stepper steps',
    },
    {
      slug: 'typography',
      reason: 'Used for section headings above the stepper in demo layouts',
    },
    {
      slug: 'divider',
      reason: 'Used to separate horizontal and vertical stepper variants in the same page',
    },
    {
      slug: 'card',
      reason: 'Common wrapper for stepper content panels showing the current step details',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Horizontal Clickable Stepper',
      description: 'A horizontal stepper with clickable steps, custom icons, and navigation buttons.',
      tags: ['horizontal', 'clickable', 'icons'],
      code: `import { Stepper, Button } from 'vayu-ui';
import { useState } from 'react';
import { User, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  { title: 'Account', description: 'Create your account', icon: <User className="w-5 h-5" /> },
  { title: 'Address', description: 'Enter your address', icon: <MapPin className="w-5 h-5" /> },
  { title: 'Payment', description: 'Add payment method', icon: <CreditCard className="w-5 h-5" /> },
  { title: 'Confirm', description: 'Review and order', icon: <CheckCircle className="w-5 h-5" /> },
];

export default function Example() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="small"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
        >
          Back
        </Button>
        <Button
          size="small"
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
        >
          Next
        </Button>
      </div>

      <Stepper.Root activeStep={activeStep} onStepClick={setActiveStep}>
        {steps.map((step) => (
          <Stepper.Step key={step.title}>
            <Stepper.Indicator icon={step.icon} />
            <Stepper.Content>
              <Stepper.Title>{step.title}</Stepper.Title>
              <Stepper.Description>{step.description}</Stepper.Description>
            </Stepper.Content>
          </Stepper.Step>
        ))}
      </Stepper.Root>
    </>
  );
}`,
    },
    {
      title: 'Vertical Stepper with Numbered Indicators',
      description: 'A vertical stepper using numbered indicators instead of icons.',
      tags: ['vertical', 'numbered', 'basic'],
      code: `import { Stepper } from 'vayu-ui';
import { useState } from 'react';

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Address', description: 'Enter your address' },
  { title: 'Payment', description: 'Add payment method' },
  { title: 'Confirm', description: 'Review and order' },
];

export default function Example() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Stepper.Root activeStep={activeStep} orientation="vertical" onStepClick={setActiveStep}>
      {steps.map((step, index) => (
        <Stepper.Step key={step.title}>
          <Stepper.Indicator>{index + 1}</Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>{step.title}</Stepper.Title>
            <Stepper.Description>
              Complete the {step.title.toLowerCase()} step to continue.
            </Stepper.Description>
          </Stepper.Content>
        </Stepper.Step>
      ))}
    </Stepper.Root>
  );
}`,
    },
    {
      title: 'Loading and Error States',
      description: 'Demonstrates loading and error step statuses with custom indicator icons.',
      tags: ['loading', 'error', 'status', 'states'],
      code: `import { Stepper } from 'vayu-ui';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function Example() {
  return (
    <Stepper.Root activeStep={1}>
      <Stepper.Step>
        <Stepper.Indicator icon={<CheckCircle className="w-5 h-5" />} />
        <Stepper.Content>
          <Stepper.Title>Completed</Stepper.Title>
        </Stepper.Content>
      </Stepper.Step>
      <Stepper.Step status="loading">
        <Stepper.Indicator icon={<Loader2 className="w-5 h-5 animate-spin" />} />
        <Stepper.Content>
          <Stepper.Title>Loading</Stepper.Title>
        </Stepper.Content>
      </Stepper.Step>
      <Stepper.Step status="error">
        <Stepper.Indicator icon={<AlertCircle className="w-5 h-5" />} />
        <Stepper.Content>
          <Stepper.Title>Error</Stepper.Title>
        </Stepper.Content>
      </Stepper.Step>
      <Stepper.Step>
        <Stepper.Indicator>4</Stepper.Indicator>
        <Stepper.Content>
          <Stepper.Title>Pending</Stepper.Title>
        </Stepper.Content>
      </Stepper.Step>
    </Stepper.Root>
  );
}`,
    },
    {
      title: 'Non-Clickable Display Stepper',
      description: 'A display-only stepper without step click handlers for showing progress in a read-only context.',
      tags: ['non-clickable', 'display-only', 'read-only'],
      code: `import { Stepper } from 'vayu-ui';

const steps = [
  { title: 'Account' },
  { title: 'Address' },
  { title: 'Payment' },
  { title: 'Confirm' },
];

export default function Example() {
  return (
    <Stepper.Root activeStep={2}>
      {steps.map((step, index) => (
        <Stepper.Step key={step.title}>
          <Stepper.Indicator>{index + 1}</Stepper.Indicator>
          <Stepper.Content>
            <Stepper.Title>{step.title}</Stepper.Title>
          </Stepper.Content>
        </Stepper.Step>
      ))}
    </Stepper.Root>
  );
}`,
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Do not nest Stepper.Root inside another Stepper',
      bad: '<Stepper.Root><Stepper.Step><Stepper.Root>...</Stepper.Root></Stepper.Step></Stepper.Root>',
      good: 'Use a single Stepper.Root per workflow. If branching is needed, conditionally render different step arrays.',
      reason: 'Nesting steppers creates conflicting context providers and breaks keyboard navigation and ARIA semantics.',
    },
    {
      title: 'Do not override status without understanding auto-computation',
      bad: '<Stepper.Step status="completed"><Stepper.Indicator>1</Stepper.Indicator></Stepper.Step>',
      good: 'Omit the status prop and let it derive from activeStep, or use it intentionally for error/loading overrides.',
      reason: 'The status prop overrides automatic derivation. Setting it manually on every step defeats the purpose of activeStep-driven state.',
    },
    {
      title: 'Do not render StepIndicator outside of Stepper.Step',
      bad: '<div><Stepper.Indicator icon={...} /></div>',
      good: 'Always place Stepper.Indicator as a child of Stepper.Step so it receives status context.',
      reason: 'StepIndicator reads from StepStatusContext which is only provided inside a Stepper.Step.',
    },
    {
      title: 'Do not use negative or out-of-range activeStep values',
      bad: '<Stepper.Root activeStep={-1}>...</Stepper.Root>',
      good: 'Clamp activeStep between 0 and steps.length - 1.',
      reason: 'Negative or oversized activeStep values produce undefined visual states and incorrect ARIA labels.',
    },
    {
      title: 'Do not hardcode step indicator colors',
      bad: '<Stepper.Indicator className="bg-blue-500 text-white" />',
      good: 'Use the built-in status-driven styling which uses design tokens (bg-brand, bg-border, bg-destructive).',
      reason: 'Hardcoding colors bypasses design tokens and breaks theme consistency and dark mode support.',
    },
  ],
};
