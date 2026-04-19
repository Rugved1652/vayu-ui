import { ComponentRegistryEntry } from '../types.js';

export const radioGroupEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'radio-group',
  name: 'RadioGroup',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible radio group component for single selection from multiple options, supporting controlled and uncontrolled modes, vertical and horizontal layouts, descriptions, error validation, and the compound component pattern.',
  longDescription:
    'The RadioGroup component uses the compound component pattern (RadioGroup.Item) to compose radio selection interfaces. It supports controlled (via value + onChange) and uncontrolled (via defaultValue) modes, vertical and horizontal orientation, group-level and item-level labels with descriptions, disabled state at both group and item levels, error validation with error text, required field marking, and full WCAG 2.2 AA accessibility with ARIA radiogroup semantics and keyboard navigation.',
  tags: [
    'radio',
    'radiogroup',
    'selection',
    'choice',
    'input',
    'form',
    'option',
    'single-select',
    'controlled',
    'accessible',
  ],
  useCases: [
    'Single-selection form fields where the user must pick exactly one option from a list',
    'Subscription plan or pricing tier selectors with descriptive text per option',
    'Settings or preference panels with mutually exclusive choices (e.g. size, orientation)',
    'Survey or questionnaire forms requiring one answer per question',
    'Filter or sort controls where only one filter can be active at a time',
    'Priority or severity selectors in issue tracking and ticket systems',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'RadioGroup',
  files: [
    {
      name: 'RadioGroup.tsx',
      description:
        'Root radio group component with context provider, label/description/error rendering, and ARIA radiogroup semantics',
    },
    {
      name: 'RadioItem.tsx',
      description:
        'Individual radio item with visual circle indicator, label, description, and hidden native input for accessibility',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for RadioGroupProps, RadioItemProps, and RadioGroupContextType',
    },
    {
      name: 'hooks.ts',
      description:
        'Internal React context and useRadioGroup hook for sharing state between group and items',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component (RadioGroup.Item) and re-exporting all types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'RadioGroup',
  subComponents: [
    {
      name: 'Item',
      fileName: 'RadioItem.tsx',
      description:
        'Renders a single radio option with a visual circle indicator, label text, optional description, and a hidden native radio input for accessibility',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description:
            'Unique value for this radio item, used as the selected value when chosen',
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Display text shown next to the radio circle',
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description:
            'Secondary text displayed below the label for additional context',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Disables this specific radio item regardless of group disabled state',
        },
      ],
    },
  ],
  hooks: ['useRadioGroup'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description:
        'Controlled selected value. When provided, the component operates in controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      defaultValue: "''",
      description:
        'Initial selected value for uncontrolled mode. Ignored when value prop is set.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description:
        'Callback fired when the user selects a different radio item. Receives the new value as a string.',
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description:
        'Name attribute for the radio inputs. Auto-generates a unique name via useId if not provided.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables all radio items in the group.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      required: false,
      defaultValue: "'vertical'",
      description:
        'Layout direction for the radio items: stacked vertically or arranged horizontally.',
      options: ['vertical', 'horizontal'],
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Group label text displayed above the radio items.',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Descriptive text displayed below the group label.',
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'Displays the group in an error state with invalid styling and error text.',
    },
    {
      name: 'errorText',
      type: 'string',
      required: false,
      description:
        'Error message displayed below the radio items when error is true.',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'Marks the group as required, showing a visual asterisk and setting aria-required.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'RadioGroup.Item elements to render as radio options.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variants or sizes — the component has orientation but it's not a visual variant

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'orientation',
      prop: 'orientation',
      values: ['vertical', 'horizontal'],
      isBoolean: false,
      defaultValue: 'vertical',
      description:
        'Layout direction of radio items. Vertical stacks items in a column; horizontal arranges them in a row with wrapping.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disables all radio items in the group. Individual items can also be disabled independently via their own disabled prop.',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Shows an error state with aria-invalid on the radiogroup and displays errorText below the items.',
    },
    {
      name: 'required',
      prop: 'required',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Marks the group as required with a visual asterisk on the label and aria-required on the radiogroup.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(value: string) => void',
      description:
        'Fires when the user selects a different radio item. Receives the value of the newly selected item.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'radiogroup',
    attributes: [
      {
        name: 'aria-labelledby',
        description:
          "References the label element's auto-generated ID to associate the group label with the radiogroup.",
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description:
          'References the description and/or error text element IDs to provide additional context to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-required',
        description:
          'Set to true when the required prop is true, signaling to assistive technology that a selection is mandatory.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description:
          'Set to true when the error prop is true, indicating the current selection has a validation error.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description:
          "Applied to each hidden native radio input, using the item's label text or falling back to its value.",
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description:
          'Applied to the visual radio circle indicator so decorative elements are not announced by screen readers.',
        managedByComponent: true,
      },
      {
        name: 'role="alert"',
        description:
          'Applied to the error text container along with aria-live="polite" so validation errors are announced to screen readers.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the first (or next) radio item in the group',
      },
      {
        key: 'Shift+Tab',
        behavior:
          'Moves focus to the previous radio item or out of the group',
      },
      {
        key: 'Space',
        behavior: 'Selects the focused radio item',
      },
      {
        key: 'Enter',
        behavior: 'Selects the focused radio item',
      },
    ],
    focusManagement:
      'Focus rings appear on native radio inputs via peer-focus-visible utilities with ring-2 and ring-focus styling. Visual focus is indicated on the radio circle. Tab navigates into the group; native browser arrow key navigation moves between items within the group.',
    wcagLevel: 'AA',
    notes:
      'Uses hidden native <input type="radio"> elements for inherent accessibility and browser arrow-key navigation. The visual circle is aria-hidden. Each input gets a unique id via the group name and item value. The group container has role="radiogroup" with proper aria-labelledby and aria-describedby associations. Error messages use role="alert" with aria-live="polite" for automatic announcement.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'checkbox',
      reason:
        'Checkboxes are the multi-select counterpart to radio groups in forms requiring both single and multiple selection',
    },
    {
      slug: 'text-input',
      reason:
        'Often used together in forms where radio selects a category and text input provides additional detail',
    },
    {
      slug: 'button',
      reason:
        'Form submission buttons commonly appear alongside radio groups in complete form layouts',
    },
    {
      slug: 'card',
      reason:
        'Radio groups are frequently placed inside cards for settings panels and preference selections',
    },
    {
      slug: 'alert',
      reason:
        'Used together to display validation feedback when a required radio group is submitted without selection',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic RadioGroup',
      description:
        'A controlled radio group for selecting a subscription plan with descriptive text per option.',
      code: `import { RadioGroup } from 'vayu-ui';
import { useState } from 'react';

export default function BasicDemo() {
  const [plan, setPlan] = useState('pro');

  return (
    <RadioGroup
      label="Subscription Plan"
      description="Choose the plan that fits your needs."
      value={plan}
      onChange={setPlan}
      required
    >
      <RadioGroup.Item
        value="free"
        label="Free"
        description="Basic features, limited storage."
      />
      <RadioGroup.Item
        value="pro"
        label="Pro"
        description="All features, 100GB storage."
      />
      <RadioGroup.Item
        value="enterprise"
        label="Enterprise"
        description="Unlimited everything, priority support."
      />
    </RadioGroup>
  );
}`,
      tags: ['basic', 'controlled', 'description', 'required'],
    },
    {
      title: 'Horizontal Layout',
      description:
        'Radio buttons arranged horizontally using the orientation prop.',
      code: `import { RadioGroup } from 'vayu-ui';
import { useState } from 'react';

export default function HorizontalDemo() {
  const [size, setSize] = useState('');

  return (
    <RadioGroup
      label="Size"
      description="Select your preferred size."
      orientation="horizontal"
      value={size}
      onChange={setSize}
    >
      <RadioGroup.Item value="sm" label="Small" />
      <RadioGroup.Item value="md" label="Medium" />
      <RadioGroup.Item value="lg" label="Large" />
      <RadioGroup.Item value="xl" label="X-Large" />
    </RadioGroup>
  );
}`,
      tags: ['horizontal', 'orientation', 'layout'],
    },
    {
      title: 'Error State with Disabled Item',
      description:
        'A radio group showing validation error styling with one disabled option.',
      code: `import { RadioGroup } from 'vayu-ui';

export default function ErrorDemo() {
  return (
    <RadioGroup
      label="Priority"
      description="Select a priority level for your ticket."
      error
      errorText="Please select a priority level."
    >
      <RadioGroup.Item value="low" label="Low" />
      <RadioGroup.Item value="medium" label="Medium" />
      <RadioGroup.Item value="high" label="High" disabled />
    </RadioGroup>
  );
}`,
      tags: ['error', 'validation', 'disabled', 'error-text'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using RadioGroup.Item outside a RadioGroup',
      bad: '<div><RadioGroup.Item value="a" label="Option A" /></div>',
      good: '<RadioGroup onChange={handleChange}><RadioGroup.Item value="a" label="Option A" /></RadioGroup>',
      reason:
        'RadioGroup.Item relies on the RadioGroup context (useRadioGroup) for shared value, onChange, name, and disabled state. Rendering it outside a RadioGroup throws an error.',
    },
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<RadioGroup value="a" defaultValue="b" onChange={fn}>...</RadioGroup>',
      good: '<RadioGroup value="a" onChange={fn}>...</RadioGroup>',
      reason:
        'Providing both value and defaultValue is contradictory. Use value + onChange for controlled mode, or defaultValue alone for uncontrolled mode. When value is provided, defaultValue is ignored.',
    },
    {
      title: 'Duplicate item values in the same group',
      bad: '<RadioGroup><RadioGroup.Item value="a" /><RadioGroup.Item value="a" /></RadioGroup>',
      good: '<RadioGroup><RadioGroup.Item value="option-1" /><RadioGroup.Item value="option-2" /></RadioGroup>',
      reason:
        'Each RadioGroup.Item must have a unique value within its group. Duplicate values cause incorrect selection behavior and broken accessibility (duplicate IDs on native inputs).',
    },
    {
      title: 'Using for multi-select instead of Checkbox',
      bad: '<RadioGroup><RadioGroup.Item value="a" /><RadioGroup.Item value="b" /></RadioGroup> // user expects to select both',
      good: 'Use Checkbox components for multi-select scenarios. RadioGroup is for single selection only.',
      reason:
        'Radio buttons are semantically for mutually exclusive single selection. If users need to select multiple options, use individual Checkbox components instead.',
    },
    {
      title: 'Omitting value prop on RadioGroup.Item',
      bad: '<RadioGroup><RadioGroup.Item label="Option A" /></RadioGroup>',
      good: '<RadioGroup><RadioGroup.Item value="a" label="Option A" /></RadioGroup>',
      reason:
        'The value prop is required on every RadioGroup.Item. Without it, the item cannot be identified as selected, the native input has no value, and the auto-generated ID will be broken.',
    },
  ],
};
