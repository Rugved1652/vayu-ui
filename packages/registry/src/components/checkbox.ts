import { ComponentRegistryEntry } from '../types.js';

export const checkboxEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'checkbox',
  name: 'Checkbox',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible checkbox control with support for checked, indeterminate, disabled, and error states using the compound component pattern.',
  longDescription:
    'The Checkbox component uses the compound component pattern (Checkbox.Indicator, Checkbox.Label, Checkbox.Description, Checkbox.Error) to build accessible checkbox controls. It supports both controlled and uncontrolled modes, an indeterminate state for "select all" patterns, and form integration via name, value, and required props. Accessibility is handled through a hidden native input element that provides full screen reader support, keyboard interaction, and ARIA attributes like aria-invalid and aria-describedby.',

  tags: [
    'checkbox',
    'input',
    'form',
    'toggle',
    'selection',
    'controlled',
    'uncontrolled',
    'indeterminate',
    'validation',
    'aria',
    'boolean',
  ],
  useCases: [
    'Accepting terms and conditions or privacy policy agreements',
    'Selecting multiple items from a list with a "select all" indeterminate pattern',
    'Tabling feature preferences or notification settings on/off',
    'Collecting boolean consent or confirmation from users in forms',
    'Displaying form validation errors alongside checkbox inputs',
    'Building filter groups with multiple selectable options',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'CheckBox',
  files: [
    { name: 'CheckBox.tsx', description: 'Root component with controlled/uncontrolled state management and context provider' },
    { name: 'CheckBoxIndicator.tsx', description: 'Visual checkbox indicator with hidden native input, ARIA attributes, and focus styling' },
    { name: 'CheckBoxLabel.tsx', description: 'Label element linked to the checkbox input via htmlFor' },
    { name: 'CheckBoxDescription.tsx', description: 'Helper text linked to the checkbox via aria-describedby' },
    { name: 'CheckBoxError.tsx', description: 'Error message with role="alert" and aria-live for screen reader announcements' },
    { name: 'hooks.ts', description: 'CheckboxContext provider and useCheckboxContext consumer hook' },
    { name: 'types.ts', description: 'TypeScript type definitions for all component props and context value' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines', optional: true },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Checkbox',
  subComponents: [
    {
      name: 'Indicator',
      fileName: 'CheckBoxIndicator.tsx',
      description: 'Renders a hidden native checkbox input for accessibility, overlaid with a custom visual indicator showing check, minus (indeterminate), or empty states.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the hidden native input element.',
        },
      ],
    },
    {
      name: 'Label',
      fileName: 'CheckBoxLabel.tsx',
      description: 'Renders a label element with htmlFor linked to the checkbox input ID for accessible click-to-toggle behavior.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text or inline content describing the checkbox.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the label element.',
        },
      ],
    },
    {
      name: 'Description',
      fileName: 'CheckBoxDescription.tsx',
      description: 'Renders helper or descriptive text linked to the checkbox via aria-describedby for screen reader context.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Descriptive text providing additional context about the checkbox.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the description paragraph element.',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'CheckBoxError.tsx',
      description: 'Renders an error message with role="alert" and aria-live="polite" for immediate screen reader announcement.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Error message text describing the validation failure.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the error paragraph element.',
        },
      ],
    },
  ],
  hooks: ['useCheckboxContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      description: 'Controlled checked state. When provided, the component operates in controlled mode and does not manage internal state.',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial checked state for uncontrolled mode. Ignored when checked is provided.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Shows the indeterminate (minus icon) visual state. Used for "select all" patterns where some but not all items are selected.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the checkbox, preventing user interaction and applying reduced opacity.',
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Shows error styling (destructive border) and sets aria-invalid="true" on the input.',
    },
    {
      name: 'onChange',
      type: '(checked: boolean) => void',
      required: false,
      description: 'Callback fired when the checked state changes. Receives the new boolean value.',
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Form input name attribute, used for form submission.',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Form input value attribute, submitted with form data when checked.',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      description: 'Marks the checkbox as required for form validation.',
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
      description: 'Whether the checkbox is selected. In controlled mode, set via the checked prop; in uncontrolled mode, managed internally via defaultChecked.',
    },
    {
      name: 'indeterminate',
      prop: 'indeterminate',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Shows a minus icon instead of a checkmark. Typically used in parent checkboxes to indicate partial selection in a group.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Prevents user interaction, applies opacity-50, and sets cursor-not-allowed.',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applies destructive border color and sets aria-invalid="true" on the native input for screen reader error indication.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(checked: boolean) => void',
      description: 'Fired when the user toggles the checkbox. Receives the new checked state as a boolean. Works in both controlled and uncontrolled modes.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-invalid',
        description: 'Set to "true" when the error prop is true, indicating a validation error to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Dynamically built client-side to reference both the error element (when error is true) and the description element (when present), linking them to the input.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on the visual indicator div to prevent double-announcement — the hidden native input handles screen reader output.',
        managedByComponent: true,
      },
      {
        name: 'role="alert"',
        description: 'Applied to the Error sub-component so screen readers immediately announce validation errors.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description: 'Applied to the Error sub-component to announce error changes without interrupting the user.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Space',
        behavior: 'Toggles the checkbox checked state. Handled natively by the hidden input element.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to or from the checkbox input. Focus ring appears only on keyboard focus via focus-visible.',
      },
    ],
    focusManagement:
      'Focus is managed by the hidden native input element. A custom focus-visible ring (ring-2 ring-focus/20 border-focus) appears only during keyboard navigation, not on mouse click.',
    wcagLevel: 'AA',
    notes:
      'Uses a hidden native checkbox input for full screen reader and keyboard support. The visual indicator uses aria-hidden="true" to avoid double-announcement. Label is linked via htmlFor for click-to-toggle. Description and error elements are referenced via aria-describedby. Error messages use role="alert" with aria-live="polite" for immediate screen reader feedback.',
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
      reason: 'Used alongside checkboxes in forms for submit actions or "select all" buttons',
    },
    {
      slug: 'text-input',
      reason: 'Commonly used together in form layouts for mixed input types',
    },
    {
      slug: 'badge',
      reason: 'Used to show counts or status labels next to checkbox options',
    },
    {
      slug: 'typography',
      reason: 'Used for section headings and grouping labels above checkbox groups',
    },
    {
      slug: 'alert',
      reason: 'Used to display form-level validation errors that include checkbox fields',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Controlled Checkbox',
      description: 'A controlled checkbox that manages checked state via React useState.',
      code: `import { Checkbox } from 'vayu-ui';
import { useState } from 'react';

export default function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col">
          <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ['basic', 'controlled', 'state'],
    },
    {
      title: 'Uncontrolled with Description',
      description: 'An uncontrolled checkbox using defaultChecked with a description for additional context.',
      code: `import { Checkbox } from 'vayu-ui';

export default function DescriptionCheckbox() {
  return (
    <Checkbox>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col gap-1">
          <Checkbox.Label>Marketing emails</Checkbox.Label>
          <Checkbox.Description>
            Receive updates about new products and features
          </Checkbox.Description>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ['uncontrolled', 'description', 'helper-text'],
    },
    {
      title: 'Error State',
      description: 'A checkbox displaying validation error styling and an error message.',
      code: `import { Checkbox } from 'vayu-ui';

export default function ErrorCheckbox() {
  return (
    <Checkbox error>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col gap-1">
          <Checkbox.Label>Required field</Checkbox.Label>
          <Checkbox.Error>You must accept to continue</Checkbox.Error>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ['error', 'validation', 'required'],
    },
    {
      title: 'Indeterminate Select All',
      description: 'A parent checkbox with indeterminate state controlling a group of child checkboxes, implementing a select-all pattern.',
      code: `import { Checkbox } from 'vayu-ui';
import { useState } from 'react';

export default function SelectAllCheckbox() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Notifications']);
  const allItems = ['Notifications', 'Marketing', 'Security updates'];

  const isAllSelected = selectedItems.length === allItems.length;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < allItems.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? allItems : []);
  };

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={handleSelectAll}
      >
        <div className="flex items-center gap-3">
          <Checkbox.Indicator />
          <Checkbox.Label>Select all email preferences</Checkbox.Label>
        </div>
      </Checkbox>

      {allItems.map((item) => (
        <Checkbox
          key={item}
          checked={selectedItems.includes(item)}
          onChange={() => handleItemToggle(item)}
        >
          <div className="flex items-center gap-3 ml-6">
            <Checkbox.Indicator />
            <Checkbox.Label>{item}</Checkbox.Label>
          </div>
        </Checkbox>
      ))}
    </div>
  );
}`,
      tags: ['indeterminate', 'select-all', 'group', 'controlled'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using onChange from HTMLAttributes instead of the Checkbox prop',
      bad: '<Checkbox onChange={(e: React.ChangeEvent) => ...}>...</Checkbox>',
      good: '<Checkbox onChange={(checked: boolean) => ...}>...</Checkbox>',
      reason: 'The Checkbox onChange prop receives a boolean (the new checked state), not a React ChangeEvent. The component\'s types omit the HTML div onChange to prevent this mistake.',
    },
    {
      title: 'Setting indeterminate via ref on the Checkbox root',
      bad: 'const ref = useRef(); ref.current.indeterminate = true; <Checkbox ref={ref}>...</Checkbox>',
      good: '<Checkbox indeterminate={isIndeterminate}>...</Checkbox>',
      reason: 'The ref on Checkbox points to the wrapper div, not the input. The indeterminate prop is handled internally via useLayoutEffect on the hidden native input element.',
    },
    {
      title: 'Using Checkbox.Indicator outside Checkbox',
      bad: '<div><Checkbox.Indicator /></div>',
      good: '<Checkbox><Checkbox.Indicator /></Checkbox>',
      reason: 'Checkbox.Indicator reads state from CheckboxContext. Using it outside a Checkbox parent throws an error because useCheckboxContext requires a provider.',
    },
    {
      title: 'Hardcoding error styling instead of using the error prop',
      bad: '<Checkbox className="border-red-500"><Checkbox.Indicator /><Checkbox.Label>...</Checkbox.Label></Checkbox>',
      good: '<Checkbox error><Checkbox.Indicator /><Checkbox.Label>...</Checkbox.Label></Checkbox>',
      reason: 'Hardcoding colors bypasses the design tokens (destructive) and does not set aria-invalid="true" on the input. Always use the error prop for proper styling and accessibility.',
    },
  ],
};
