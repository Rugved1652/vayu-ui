import { ComponentRegistryEntry } from '../types.js';

export const otpInputEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'otp-input',
  name: 'OTPInput',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible one-time password input component with individual character slots, auto-advance, and support for grouped layouts with separators.',
  longDescription:
    'The OTPInput component uses the compound component pattern (OTPInput.Root, OTPInput.Group, OTPInput.Slot, OTPInput.Separator) to build accessible OTP/PIN entry fields. It renders a hidden native input with inputMode="numeric" and autoComplete="one-time-code" for mobile autofill, while displaying individual character slots with a blinking caret. Supports controlled and uncontrolled modes, error states with aria-invalid, disabled state, and grouped layouts with visual separators for patterns like 3-3 or 4-2 splits.',

  tags: [
    'otp',
    'pin',
    'verification',
    'authentication',
    '2fa',
    'two-factor',
    'code',
    'input',
    'numeric',
    'form',
  ],
  useCases: [
    'Two-factor authentication code entry during login flows',
    'PIN verification for account recovery or transaction confirmation',
    'Numeric confirmation dialogs for sensitive actions',
    'SMS-based one-time code verification with mobile autofill support',
    'Email verification code entry during signup',
    'Grouped OTP layouts with separators for readability (e.g. 3-3 split)',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'OTPInput',
  files: [
    { name: 'OTPInput.tsx', description: 'Root component with context provider and hidden native input handling focus, value, and keyboard events' },
    { name: 'OTPInputGroup.tsx', description: 'Presentational wrapper for grouping character slots' },
    { name: 'OTPInputSlot.tsx', description: 'Individual character slot with active focus ring, filled state styling, and blinking caret' },
    { name: 'OTPSeparator.tsx', description: 'Visual separator between slot groups with a default dot indicator' },
    { name: 'types.ts', description: 'TypeScript type definitions for all component props and context value' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines', optional: true },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'OTPInput',
  subComponents: [
    {
      name: 'Group',
      fileName: 'OTPInputGroup.tsx',
      description: 'Presentational flex wrapper for grouping character slots. Use multiple Groups with Separators between them for split layouts (e.g. 3-3).',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Slot elements to group together.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the group wrapper div.',
        },
      ],
    },
    {
      name: 'Slot',
      fileName: 'OTPInputSlot.tsx',
      description: 'Renders an individual character slot with active focus ring, filled state background, error styling, and an animated blinking caret on the active empty slot.',
      props: [
        {
          name: 'index',
          type: 'number',
          required: true,
          description: 'Zero-based position of this slot within the OTP code. Determines which character to display and which slot shows the caret.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the slot div.',
        },
      ],
    },
    {
      name: 'Separator',
      fileName: 'OTPSeparator.tsx',
      description: 'Renders a visual separator between Groups. Displays a small dot by default, or custom children.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom separator content. Defaults to a small muted dot.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the separator div.',
        },
      ],
    },
  ],
  hooks: ['useOTPInput'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled OTP value. When provided, the component operates in controlled mode.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when the value changes. Receives the current numeric string (digits only).',
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      defaultValue: '6',
      description: 'Maximum number of digits in the OTP code. Determines how many Slots to render and when onComplete fires.',
    },
    {
      name: 'onComplete',
      type: '(code: string) => void',
      required: false,
      description: 'Callback fired when all digits are entered. Receives the complete code string.',
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      defaultValue: '"One-time password"',
      description: 'Accessible label for the input group. Applied as aria-label on both the group container and hidden input.',
    },
    {
      name: 'hasError',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Whether the input has a validation error. Applies destructive styling to slots and sets aria-invalid on the input.',
    },
    {
      name: 'errorMessageId',
      type: 'string',
      required: false,
      description: 'ID of the element that describes the error message. Linked to the input via aria-errormessage.',
    },
    {
      name: 'containerClassName',
      type: 'string',
      required: false,
      description: 'CSS classes applied to the outermost container div wrapping the visual slots.',
    },
    {
      name: 'autoFocus',
      type: 'boolean',
      required: false,
      description: 'Whether the input should auto-focus on mount.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the input, preventing user interaction and applying reduced opacity.',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'Custom ID for the hidden input element. Auto-generated via useId() if not provided.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — fixed styling with state-based theming

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'focused',
      prop: 'autoFocus',
      isBoolean: true,
      defaultValue: 'false',
      description: 'The active slot shows a ring-2 focus indicator and a blinking caret when the input is focused. Auto-focusable on mount via autoFocus.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Prevents user interaction, applies opacity-50 and cursor-not-allowed, and sets aria-disabled on the group container.',
    },
    {
      name: 'error',
      prop: 'hasError',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applies destructive border and text color to slots, sets aria-invalid="true" on the hidden input, and shows destructive focus ring on the active slot.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(value: string) => void',
      description: 'Fired each time a digit is entered or deleted. Receives the current numeric string value with only digits.',
    },
    {
      name: 'onComplete',
      signature: '(code: string) => void',
      description: 'Fired when the value length reaches maxLength. Receives the complete OTP code string. Useful for auto-submitting verification.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to both the group container and the hidden input. Defaults to "One-time password" via the label prop.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Applied to the group container when the disabled prop is true.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description: 'Set to true on the hidden input when hasError is true, indicating a validation error to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-errormessage',
        description: 'Set on the hidden input to reference the error message element by ID when errorMessageId is provided.',
        managedByComponent: false,
      },
      {
        name: 'aria-describedby',
        description: 'Combined from errorMessageId and any user-provided aria-describedby on the root. Links descriptive content to the input.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on all Slot and Separator elements to prevent double-announcement — the hidden native input handles screen reader output.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: '0-9',
        behavior: 'Appends a digit to the value. Non-numeric characters are stripped automatically.',
      },
      {
        key: 'Backspace',
        behavior: 'Removes the last digit from the value.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to or from the hidden input element.',
      },
    ],
    focusManagement:
      'A single hidden input element manages focus. Clicking anywhere on the slot group focuses the input. The active slot (determined by current value length) shows a ring-2 focus indicator and a blinking caret animation.',
    wcagLevel: 'AA',
    notes:
      'Uses a hidden native input with inputMode="numeric" and autoComplete="one-time-code" for mobile browser autofill compatibility. All visual slot and separator elements use aria-hidden="true" to prevent double-announcement. The group container uses role="group" with an aria-label. Error states are communicated via aria-invalid and aria-errormessage on the input. The input strips non-digit characters and enforces maxLength.',
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
      reason: 'Used for submit/reset actions alongside the OTP input in verification forms',
    },
    {
      slug: 'text-input',
      reason: 'Commonly paired with email/phone inputs in authentication flows',
    },
    {
      slug: 'typography',
      reason: 'Used for labels, descriptions, and error messages around the OTP input',
    },
    {
      slug: 'alert',
      reason: 'Used to display verification status feedback (success or error) after OTP submission',
    },
    {
      slug: 'divider',
      reason: 'Used to separate different OTP configuration examples in demo layouts',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Controlled OTP Input',
      description: 'A controlled 6-digit OTP input with value state tracking and an onComplete callback.',
      code: `import { OTPInput } from 'vayu-ui';
import { useState } from 'react';

export default function BasicOTP() {
  const [value, setValue] = useState('');

  return (
    <OTPInput.Root
      value={value}
      onChange={setValue}
      maxLength={6}
      onComplete={(code) => console.log('Complete:', code)}
    >
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`,
      tags: ['basic', 'controlled', 'default'],
    },
    {
      title: 'Grouped with Separator',
      description: 'A 6-digit OTP input split into two groups of 3 with a visual separator between them.',
      code: `import { OTPInput } from 'vayu-ui';

export default function GroupedOTP() {
  return (
    <OTPInput.Root maxLength={6}>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
      </OTPInput.Group>
      <OTPInput.Separator />
      <OTPInput.Group>
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`,
      tags: ['grouped', 'separator', 'layout'],
    },
    {
      title: 'Error State',
      description: 'An OTP input displaying error styling with a validation error message.',
      code: `import { OTPInput } from 'vayu-ui';

export default function ErrorOTP() {
  return (
    <>
      <OTPInput.Root maxLength={6} hasError>
        <OTPInput.Group>
          <OTPInput.Slot index={0} />
          <OTPInput.Slot index={1} />
          <OTPInput.Slot index={2} />
          <OTPInput.Slot index={3} />
          <OTPInput.Slot index={4} />
          <OTPInput.Slot index={5} />
        </OTPInput.Group>
      </OTPInput.Root>
      <p className="text-destructive text-sm">Invalid code. Please try again.</p>
    </>
  );
}`,
      tags: ['error', 'validation', 'destructive'],
    },
    {
      title: 'Disabled',
      description: 'A disabled OTP input preventing user interaction with reduced opacity.',
      code: `import { OTPInput } from 'vayu-ui';

export default function DisabledOTP() {
  return (
    <OTPInput.Root maxLength={6} disabled>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`,
      tags: ['disabled', 'readonly'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using Slot outside OTPInput.Root',
      bad: '<div><OTPInput.Slot index={0} /></div>',
      good: '<OTPInput.Root><OTPInput.Group><OTPInput.Slot index={0} /></OTPInput.Group></OTPInput.Root>',
      reason: 'OTPInput.Slot reads state from OTPInputContext via useOTPInput(). Using it outside OTPInput.Root throws an error because no context provider exists.',
    },
    {
      title: 'Using onChange with React.ChangeEvent signature',
      bad: '<OTPInput.Root onChange={(e: React.ChangeEvent<HTMLInputElement>) => ...} />',
      good: '<OTPInput.Root onChange={(value: string) => ...} />',
      reason: "The OTPInput onChange prop receives a string (the current numeric value), not a React ChangeEvent. The component's types omit the HTML input onChange to prevent this mistake.",
    },
    {
      title: 'Hardcoding error styling on Slots',
      bad: '<OTPInput.Slot index={0} className="border-red-500 text-red-500" />',
      good: '<OTPInput.Root hasError><OTPInput.Slot index={0} /></OTPInput.Root>',
      reason: 'Hardcoding colors bypasses design tokens (destructive) and does not set aria-invalid="true" on the input. Always use the hasError prop for proper styling and accessibility.',
    },
    {
      title: 'Rendering non-numeric input characters',
      bad: '<OTPInput.Root maxLength={6}><input type="text" /></OTPInput.Root>',
      good: 'Use the component as-is — the hidden input already has inputMode="numeric" and pattern="[0-9]*" to enforce digits only.',
      reason: 'The hidden input strips non-digit characters (\\D) automatically. Adding your own input element inside OTPInput.Root breaks the compound pattern and conflicts with internal state management.',
    },
    {
      title: 'Using errorMessageId without a matching error element',
      bad: '<OTPInput.Root hasError errorMessageId="otp-error" />',
      good: '<OTPInput.Root hasError errorMessageId="otp-error" />\n<p id="otp-error" role="alert">Invalid code</p>',
      reason: 'errorMessageId sets aria-errormessage on the input, referencing an element by ID. Without a matching element, screen readers cannot locate the error description, making the error state inaccessible.',
    },
  ],
};
