import { ComponentRegistryEntry } from '../types.js';

export const switchEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'switch',
  name: 'Switch',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible toggle switch with controlled/uncontrolled modes, label and description support, error states, and WCAG 2.2 AA compliance.',
  longDescription:
    'The Switch component renders a binary toggle control using a hidden native checkbox input with role="switch" for full accessibility. It supports both controlled mode (via checked + onCheckedChange) and uncontrolled mode (via defaultChecked). Optional label and description props render adjacent text linked to the input via aria-labelledby and aria-describedby. The visual track and thumb are rendered by internal SwitchTrack and SwitchLabel sub-components that are not user-facing. An error prop applies destructive styling and sets aria-invalid on the input. Focus-visible styling meets WCAG 2.2 AA requirements.',

  tags: [
    'switch',
    'toggle',
    'input',
    'form',
    'on-off',
    'controlled',
    'uncontrolled',
    'boolean',
    'settings',
    'aria',
  ],
  useCases: [
    'Toggling binary settings like dark mode, notifications, or auto-save preferences',
    'Building controlled form inputs that report on/off state to a parent component',
    'Displaying feature flags or preference toggles with label and description text',
    'Showing error states for failed preference saves or validation failures',
    'Creating interactive settings panels with multiple independent toggle controls',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Switch',
  files: [
    { name: 'Switch.tsx', description: 'Root component with controlled/uncontrolled state wiring and accessibility attributes' },
    { name: 'SwitchTrack.tsx', description: 'Visual track and thumb with checked, disabled, and error styling using design tokens' },
    { name: 'SwitchLabel.tsx', description: 'Label and description text with proper ARIA ID linking and disabled/error states' },
    { name: 'hooks.ts', description: 'useSwitchControl hook managing controlled and uncontrolled toggle state' },
    { name: 'types.ts', description: 'TypeScript type definitions for SwitchProps' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the component and its types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines', optional: true },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Switch',
  subComponents: [],
  hooks: ['useSwitchControl'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'label',
      type: 'ReactNode',
      required: false,
      description: 'Label text displayed next to the switch. Automatically linked to the input via aria-labelledby.',
    },
    {
      name: 'description',
      type: 'ReactNode',
      required: false,
      description: 'Description text displayed below the label. Linked to the input via aria-describedby for screen reader context.',
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Shows error styling (destructive ring on track) and sets aria-invalid on the input.',
    },
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      description: 'Controlled state value. When provided, the component operates in controlled mode and does not manage internal state.',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial checked state for uncontrolled mode. Ignored when checked is provided.',
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      required: false,
      description: 'Callback fired when the switch state changes. Receives the new boolean value. Works in both controlled and uncontrolled modes.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the switch, preventing user interaction and applying reduced opacity.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — uses fixed sizing and state-based styling

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'checked',
      prop: 'checked',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the switch is on. In controlled mode, set via the checked prop; in uncontrolled mode, managed internally via defaultChecked.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Prevents user interaction, applies opacity-50, and sets cursor-not-allowed on the label and track.',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applies destructive ring on the unchecked track and sets aria-invalid="true" on the hidden input.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onCheckedChange',
      signature: '(checked: boolean) => void',
      description: 'Fired when the user toggles the switch. Receives the new checked state as a boolean. Does not fire when disabled.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'switch',
    attributes: [
      {
        name: 'aria-checked',
        description: 'Reflects the current on/off state of the switch. Set to true when checked, false when unchecked.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description: 'Set to "true" when the error prop is true, indicating a validation error to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Automatically references the label element ID when a label prop is provided.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Automatically references the description element ID when a description prop is provided.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on the visual track element to prevent double-announcement — the hidden native input handles screen reader output.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Space',
        behavior: 'Toggles the switch on/off. Handled natively by the hidden checkbox input.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to or from the switch input. Focus ring appears only on keyboard focus via focus-visible.',
      },
    ],
    focusManagement:
      'Focus is managed by the hidden native input element. A custom focus-visible ring (ring-2 ring-focus ring-offset-2 ring-offset-canvas) appears only during keyboard navigation.',
    wcagLevel: 'AA',
    notes:
      'Uses a hidden native checkbox input with role="switch" for full screen reader and keyboard support. The visual track uses aria-hidden="true" to avoid double-announcement. Label and description are linked via generated IDs and aria-labelledby/aria-describedby. An auto-generated ID (via useId) ensures unique associations even with multiple switch instances on the same page.',
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
      slug: 'checkbox',
      reason: 'Used alongside switches in settings forms for multi-select vs toggle patterns',
    },
    {
      slug: 'button',
      reason: 'Used to submit forms containing switch toggles or as external toggle controls',
    },
    {
      slug: 'typography',
      reason: 'Used for section headings and grouping labels above switch groups',
    },
    {
      slug: 'alert',
      reason: 'Used to display form-level validation errors that include switch fields',
    },
    {
      slug: 'card',
      reason: 'Commonly wraps groups of switches in a settings panel or preferences card',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic',
      description: 'Uncontrolled switches with defaultChecked and aria-label for accessibility.',
      code: `import { Switch } from 'vayu-ui';

export default function BasicSwitch() {
  return (
    <div className="flex items-center gap-6">
      <Switch defaultChecked aria-label="Enable feature" />
      <Switch aria-label="Disable feature" />
    </div>
  );
}`,
      tags: ['basic', 'uncontrolled'],
    },
    {
      title: 'With Labels & Descriptions',
      description: 'Switches with label and description props for additional context.',
      code: `import { Switch } from 'vayu-ui';

export default function LabeledSwitch() {
  return (
    <div className="space-y-4">
      <Switch label="Auto-save" description="Automatically save changes as you work" />
      <Switch
        label="Email notifications"
        description="Receive updates about your account activity"
        defaultChecked
      />
    </div>
  );
}`,
      tags: ['label', 'description', 'uncontrolled'],
    },
    {
      title: 'States',
      description: 'Disabled and error state switches.',
      code: `import { Switch } from 'vayu-ui';

export default function StateSwitch() {
  return (
    <div className="space-y-4">
      <Switch disabled label="Disabled" description="This option is not available" />
      <Switch disabled defaultChecked label="Disabled & Checked" />
      <Switch error label="Error state" description="Failed to save preference" />
    </div>
  );
}`,
      tags: ['disabled', 'error', 'states'],
    },
    {
      title: 'Controlled',
      description: 'Controlled switches using checked and onCheckedChange with React state.',
      code: `import { Switch } from 'vayu-ui';
import { useState } from 'react';

export default function ControlledSwitch() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={notifications}
        onCheckedChange={setNotifications}
        label={\`Notifications: \${notifications ? 'On' : 'Off'}\`}
        description="Toggle push notifications"
      />
      <Switch
        checked={analytics}
        onCheckedChange={setAnalytics}
        label={\`Analytics: \${analytics ? 'On' : 'Off'}\`}
        description="Share anonymous usage data"
      />
    </div>
  );
}`,
      tags: ['controlled', 'state', 'dynamic-label'],
    },
    {
      title: 'Interactive Dark Mode Toggle',
      description: 'A controlled switch with external button controls for toggling and resetting.',
      code: `import { Switch, Button } from 'vayu-ui';
import { useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={darkMode}
        onCheckedChange={setDarkMode}
        label={\`Dark Mode: \${darkMode ? 'On' : 'Off'}\`}
        description="Toggle dark mode theme"
      />
      <div className="flex items-center gap-3">
        <Button variant="outline" size="small" onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </Button>
        <Button variant="ghost" size="small" onClick={() => setDarkMode(false)}>
          Reset
        </Button>
      </div>
    </div>
  );
}`,
      tags: ['controlled', 'interactive', 'button'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using onChange instead of onCheckedChange',
      bad: '<Switch onChange={(e) => ...} />',
      good: '<Switch onCheckedChange={(checked: boolean) => ...} />',
      reason: 'The SwitchProps type omits the native onChange. The component provides onCheckedChange which receives a clean boolean instead of a ChangeEvent.',
    },
    {
      title: 'Setting aria-checked or role manually',
      bad: '<Switch role="switch" aria-checked={value} />',
      good: '<Switch checked={value} />',
      reason: 'The component automatically manages role="switch" and aria-checked on the hidden input. Setting them manually on the wrapper div has no effect on the actual accessibility node.',
    },
    {
      title: 'Using the switch without a label or aria-label',
      bad: '<Switch checked={on} onCheckedChange={setOn} />',
      good: '<Switch label="Dark mode" checked={on} onCheckedChange={setOn} />',
      reason: 'Without a label prop or aria-label, screen readers cannot determine the purpose of the switch. Always provide at least one.',
    },
    {
      title: 'Using checked without onCheckedChange in controlled mode',
      bad: '<Switch checked={value} />',
      good: '<Switch checked={value} onCheckedChange={setValue} />',
      reason: 'Providing checked without onCheckedChange creates a read-only switch that cannot be toggled. In controlled mode, both props must be provided together.',
    },
  ],
};
