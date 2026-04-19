import { ComponentRegistryEntry } from '../types.js';

export const textInputEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'text-input',
  name: 'TextInput',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A compound text input component supporting multiple input types, validation states, character counting, and specialized variants like password, number, and search inputs.',
  longDescription:
    'The TextInput component uses the compound component pattern (TextInput.Label, TextInput.Field, TextInput.Input, etc.) to build accessible form inputs. It supports controlled and uncontrolled modes, multiple input types (text, email, password, number, tel, url, search), four validation states (default, error, warning, success), three sizes (sm, md, lg), character counting with configurable display modes, a clear button, and a loading spinner. Specialized sub-components include PasswordInput with a visibility toggle, NumberInput with keyboard-filtered numeric validation and min/max constraints, and SearchInput with a built-in search icon. All ARIA attributes (labelledby, describedby, invalid, required) are managed automatically via React context.',

  tags: [
    'input',
    'text',
    'email',
    'password',
    'number',
    'search',
    'tel',
    'url',
    'form',
    'validation',
    'field',
    'text-field',
  ],
  useCases: [
    'Email address input with icon and validation message',
    'Password entry with show/hide toggle and strength feedback',
    'Numeric input with integer, decimal, positive, or natural number constraints',
    'Search bar with clear button and controlled value',
    'Form fields with required/optional indicators and description text',
    'Input with character count limit and near-limit warning',
    'Multi-state form validation displaying error, warning, or success messages',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'TextInput',
  files: [
    { name: 'TextInput.tsx', description: 'Root component with context provider managing value, focus, validation, and state for all sub-components' },
    { name: 'Input.tsx', description: 'Base input element with ARIA attributes (labelledby, describedby, invalid, required) and icon slot support' },
    { name: 'TextInputField.tsx', description: 'Field wrapper applying size-based padding, validation border colors, and focus ring styling' },
    { name: 'TextInputLabel.tsx', description: 'Label with htmlFor linkage, required asterisk indicator, and optional badge support' },
    { name: 'TextInputDescription.tsx', description: 'Helper text linked to the input via aria-describedby' },
    { name: 'TextInputErrorMessage.tsx', description: 'Error message with role="alert" and aria-live, conditionally shown when validationState is "error"' },
    { name: 'TextInputWarningMessage.tsx', description: 'Warning message with role="status" and aria-live, conditionally shown when validationState is "warning"' },
    { name: 'TextInputSuccessMessage.tsx', description: 'Success message with role="status" and aria-live, conditionally shown when validationState is "success"' },
    { name: 'TextInputIcon.tsx', description: 'Icon wrapper for left/right icons within the field' },
    { name: 'TextInputClearButton.tsx', description: 'Clear button that appears when the input has a value, with aria-label="Clear input"' },
    { name: 'TextInputCharacterCount.tsx', description: 'Character count display with configurable visibility (always, focus, near-limit) and threshold' },
    { name: 'TextInputLoadingSpinner.tsx', description: 'Animated spinner shown when the loading prop is true' },
    { name: 'TextInputPasswordInput.tsx', description: 'Password input with visibility toggle (Eye/EyeClosed icons) and aria-label on toggle button' },
    { name: 'TextInputNumberInput.tsx', description: 'Number input with keyboard filtering, paste validation, and min/max blur constraints per numberType' },
    { name: 'TextInputSearchInput.tsx', description: 'Search input with built-in Search icon from lucide-react' },
    { name: 'types.ts', description: 'TypeScript type definitions for all component props, context value, and union types' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines', optional: true },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'TextInput',
  subComponents: [
    {
      name: 'Label',
      fileName: 'TextInputLabel.tsx',
      description: 'Renders a label element linked to the input via htmlFor/id. Shows a required asterisk when the root required prop is true, or an "(optional)" badge when the optional prop is set.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text content.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the label element.',
        },
        {
          name: 'optional',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, displays an "(optional)" badge next to the label text.',
        },
      ],
    },
    {
      name: 'Field',
      fileName: 'TextInputField.tsx',
      description: 'Wraps the input and icons in a styled container. Applies size-based padding, validation border colors (destructive, warning, success), and focus ring styling. Handles focus/blur events to update context state.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Input element and optional icons to render inside the field.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the field wrapper.',
        },
      ],
    },
    {
      name: 'Input',
      fileName: 'Input.tsx',
      description: 'The base HTML input element with automatic ARIA attributes (aria-labelledby, aria-describedby, aria-invalid, aria-required). Merges the internal ref with a forwarded ref. Supports left and right icon slots.',
      props: [
        {
          name: 'leftIcon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element rendered on the left side of the input.',
        },
        {
          name: 'rightIcon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element rendered on the right side of the input.',
        },
        {
          name: 'type',
          type: "InputType",
          required: false,
          description: 'Overrides the inputType set on the root TextInput component.',
          options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the input element.',
        },
      ],
    },
    {
      name: 'PasswordInput',
      fileName: 'TextInputPasswordInput.tsx',
      description: 'Password-specific input with a visibility toggle button (Eye/EyeClosed icons). Automatically shows/hides the password. Should be used inside TextInput.Field when the root inputType is "password".',
      props: [
        {
          name: 'leftIcon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element rendered on the left side of the input.',
        },
        {
          name: 'rightIcon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element rendered on the right side of the input (shown alongside the visibility toggle).',
        },
        {
          name: 'type',
          type: "InputType",
          required: false,
          description: 'Overrides the inputType set on the root TextInput component.',
          options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the input element.',
        },
      ],
    },
    {
      name: 'NumberInput',
      fileName: 'TextInputNumberInput.tsx',
      description: 'Numeric input with keyboard filtering, paste validation, and blur constraints based on numberType. Supports integer, decimal, positive, and natural number modes with min/max enforcement.',
      props: [
        {
          name: 'numberType',
          type: "NumberType",
          required: false,
          defaultValue: "'decimal'",
          description: 'Type of number validation to apply. Controls allowed keys, paste validation, and accepted character patterns.',
          options: ['integer', 'decimal', 'positive', 'natural'],
        },
        {
          name: 'min',
          type: 'number',
          required: false,
          description: 'Minimum allowed value. The value is constrained to this minimum on blur.',
        },
        {
          name: 'max',
          type: 'number',
          required: false,
          description: 'Maximum allowed value. The value is constrained to this maximum on blur.',
        },
        {
          name: 'step',
          type: 'number',
          required: false,
          description: 'Step increment for the native number input. Passed through to the HTML input element.',
        },
      ],
    },
    {
      name: 'SearchInput',
      fileName: 'TextInputSearchInput.tsx',
      description: 'Search-specific input with a built-in Search icon from lucide-react. Extends native input attributes (except type, value, onChange, size).',
      props: [],
    },
    {
      name: 'Description',
      fileName: 'TextInputDescription.tsx',
      description: 'Helper text rendered below the field. Linked to the input via the auto-generated descriptionId and aria-describedby.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Description text content.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the description element.',
        },
      ],
    },
    {
      name: 'ErrorMessage',
      fileName: 'TextInputErrorMessage.tsx',
      description: 'Error message with an AlertCircle icon, role="alert", and aria-live="polite". Only rendered when the root validationState is "error".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Error message text content.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the error message element.',
        },
      ],
    },
    {
      name: 'WarningMessage',
      fileName: 'TextInputWarningMessage.tsx',
      description: 'Warning message with an AlertCircle icon, role="status", and aria-live="polite". Only rendered when the root validationState is "warning".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Warning message text content.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the warning message element.',
        },
      ],
    },
    {
      name: 'SuccessMessage',
      fileName: 'TextInputSuccessMessage.tsx',
      description: 'Success message with a CheckCircle icon, role="status", and aria-live="polite". Only rendered when the root validationState is "success".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Success message text content.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the success message element.',
        },
      ],
    },
    {
      name: 'Icon',
      fileName: 'TextInputIcon.tsx',
      description: 'Wrapper for rendering icons inside the field. Positions the icon and applies muted text color.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Icon element to render (e.g. a lucide-react icon component).',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the icon wrapper.',
        },
      ],
    },
    {
      name: 'ClearButton',
      fileName: 'TextInputClearButton.tsx',
      description: 'A button that clears the input value. Only visible when the input has a value. Uses an X icon and has aria-label="Clear input".',
      props: [
        {
          name: 'onClear',
          type: '() => void',
          required: false,
          description: 'Additional callback fired after the value is cleared.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the clear button.',
        },
      ],
    },
    {
      name: 'CharacterCount',
      fileName: 'TextInputCharacterCount.tsx',
      description: 'Displays current character count relative to maxLength. Supports configurable visibility (always, on focus, or near limit) with threshold-based color changes.',
      props: [
        {
          name: 'maxLength',
          type: 'number',
          required: true,
          description: 'Maximum allowed character count. Used to calculate remaining count and near-limit percentage.',
        },
        {
          name: 'showCount',
          type: "'always' | 'focus' | 'near-limit'",
          required: false,
          defaultValue: "'always'",
          description: 'When to display the character count: always, only when the input is focused, or only when near the limit.',
          options: ['always', 'focus', 'near-limit'],
        },
        {
          name: 'threshold',
          type: 'number',
          required: false,
          defaultValue: '0.8',
          description: 'Fraction of maxLength at which the count is considered "near limit" and switches to warning color (0 to 1).',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the character count element.',
        },
      ],
    },
    {
      name: 'LoadingSpinner',
      fileName: 'TextInputLoadingSpinner.tsx',
      description: 'Animated spinner (Loader2 icon) shown inside the field when the root loading prop is true. Uses aria-label="Loading" for accessibility.',
      props: [],
    },
  ],
  hooks: ['useTextInput'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled input value. When provided, the component operates in controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      defaultValue: "''",
      description: 'Initial value for uncontrolled mode.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when the input value changes. Receives the new string value.',
    },
    {
      name: 'inputType',
      type: "InputType",
      required: false,
      defaultValue: "'text'",
      description: 'The HTML input type. Determines which specialized input variant is used (e.g. password shows a toggle, number enables numeric filtering).',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    {
      name: 'size',
      type: "InputSize",
      required: false,
      defaultValue: "'md'",
      description: 'Input size affecting padding, text size, and icon sizing.',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'validationState',
      type: "ValidationState",
      required: false,
      defaultValue: "'default'",
      description: 'Current validation state. Controls border color, ring color, and which message sub-component is visible.',
      options: ['default', 'error', 'warning', 'success'],
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables the input, preventing user interaction.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Makes the input read-only. The value is visible but cannot be edited.',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Marks the input as required. Shows a required asterisk on the Label and sets aria-required on the input.',
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Shows a loading spinner inside the field when true.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      defaultValue: "''",
      description: 'Additional CSS classes applied to the root container div.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'focused',
      prop: 'isFocused',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied when the input element has focus. Shows a focus ring on the Field wrapper and may trigger CharacterCount display in "focus" mode.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Prevents user interaction with the input. Applied to the HTML input element via the disabled attribute.',
    },
    {
      name: 'readOnly',
      prop: 'readOnly',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Makes the input non-editable while keeping it focusable and selectable.',
    },
    {
      name: 'required',
      prop: 'required',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Marks the input as required. Sets aria-required="true" and shows an asterisk on the Label.',
    },
    {
      name: 'loading',
      prop: 'loading',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Shows a spinning Loader2 icon inside the field via the LoadingSpinner sub-component.',
    },
    {
      name: 'validation',
      prop: 'validationState',
      values: ['default', 'error', 'warning', 'success'],
      isBoolean: false,
      defaultValue: "'default'",
      description: 'Controls the visual validation state. Applies themed border and ring colors, and determines which message sub-component (Error, Warning, Success) is visible.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(value: string) => void',
      description: 'Fired each time the input value changes. Receives the new string value, not a React ChangeEvent.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-labelledby',
        description: 'Automatically links the input to the Label component via a generated labelId. Applied to the Input element.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'References the Description element via a generated descriptionId. When validationState is "error", also includes the ErrorMessage element via errorId.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description: 'Set to true on the Input element when validationState is "error", indicating a validation error to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-required',
        description: 'Set to true on the Input element when the required prop is true.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied to the ClearButton ("Clear input"), LoadingSpinner ("Loading"), and the PasswordInput toggle button ("Show password"/"Hide password").',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" on ErrorMessage (role="alert"), WarningMessage (role="status"), SuccessMessage (role="status"), and CharacterCount (aria-atomic="true").',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on required asterisk icons, validation message icons, and the PasswordInput toggle icon to prevent screen reader announcement.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to or from the input element.',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus backwards from the input element.',
      },
    ],
    focusManagement:
      'The input element receives focus via Tab. The Field wrapper visually responds with a focus ring (ring-2 ring-focus/20). Focus state is tracked in context and shared with sub-components like CharacterCount.',
    wcagLevel: 'AA',
    notes:
      'All label/input associations use auto-generated IDs via useId(). The Description is linked via aria-describedby, and when in error state the ErrorMessage is also included in aria-describedby. Error messages use role="alert" for immediate screen reader announcement. Validation icons use aria-hidden to prevent redundant announcement. The PasswordInput toggle uses aria-label to communicate its purpose. NumberInput uses inputMode="numeric" for mobile numeric keyboards and filters keyboard/paste input to valid characters per numberType.',
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
      reason: 'Used for submit/reset actions alongside text inputs in forms',
    },
    {
      slug: 'checkbox',
      reason: 'Commonly paired with text inputs in form layouts for agreement/consent fields',
    },
    {
      slug: 'otp-input',
      reason: 'Used alongside text inputs in authentication flows (email + OTP verification)',
    },
    {
      slug: 'card',
      reason: 'Used as a container for grouping text inputs in form layouts',
    },
    {
      slug: 'tooltip',
      reason: 'Used to provide contextual help or hints for text input fields',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Input with Icon',
      description: 'A text input with an email icon, label, and description.',
      code: `import { TextInput } from 'vayu-ui';
import { Mail } from 'lucide-react';

export default function BasicInput() {
  return (
    <TextInput>
      <TextInput.Label>Email Address</TextInput.Label>
      <TextInput.Field>
        <TextInput.Icon>
          <Mail className="w-4 h-4" />
        </TextInput.Icon>
        <TextInput.Input placeholder="Enter your email" />
      </TextInput.Field>
      <TextInput.Description>We'll never share your email.</TextInput.Description>
    </TextInput>
  );
}`,
      tags: ['basic', 'icon', 'description'],
    },
    {
      title: 'Required and Optional Fields',
      description: 'A required field showing a red asterisk and an optional field with an "(optional)" badge.',
      code: `import { TextInput } from 'vayu-ui';
import { User } from 'lucide-react';

export default function RequiredOptional() {
  return (
    <>
      <TextInput required>
        <TextInput.Label>Full Name</TextInput.Label>
        <TextInput.Field>
          <TextInput.Icon>
            <User className="w-4 h-4" />
          </TextInput.Icon>
          <TextInput.Input placeholder="Enter your full name" />
        </TextInput.Field>
      </TextInput>
      <TextInput>
        <TextInput.Label optional>Nickname</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="What should we call you?" />
        </TextInput.Field>
      </TextInput>
    </>
  );
}`,
      tags: ['required', 'optional', 'form'],
    },
    {
      title: 'Password Input with Toggle',
      description: 'A password input with a visibility toggle button and a description.',
      code: `import { TextInput } from 'vayu-ui';
import { Lock } from 'lucide-react';

export default function PasswordInput() {
  return (
    <TextInput inputType="password">
      <TextInput.Label>Password</TextInput.Label>
      <TextInput.Field>
        <TextInput.Icon>
          <Lock className="w-4 h-4" />
        </TextInput.Icon>
        <TextInput.PasswordInput placeholder="Enter password" />
      </TextInput.Field>
      <TextInput.Description>Must be at least 8 characters.</TextInput.Description>
    </TextInput>
  );
}`,
      tags: ['password', 'visibility-toggle', 'auth'],
    },
    {
      title: 'Search Input with Clear Button',
      description: 'A controlled search input with a built-in search icon and a clear button.',
      code: `import { TextInput } from 'vayu-ui';
import { useState } from 'react';

export default function SearchInput() {
  const [value, setValue] = useState('');

  return (
    <TextInput value={value} onChange={setValue}>
      <TextInput.Label>Search</TextInput.Label>
      <TextInput.Field>
        <TextInput.SearchInput placeholder="Search users..." />
        <TextInput.ClearButton />
      </TextInput.Field>
    </TextInput>
  );
}`,
      tags: ['search', 'clear', 'controlled'],
    },
    {
      title: 'Number Inputs with Constraints',
      description: 'Natural number, integer, and positive decimal inputs with different numberType constraints and min/max clamping.',
      code: `import { TextInput } from 'vayu-ui';
import { DollarSign } from 'lucide-react';

export default function NumberInputs() {
  return (
    <>
      <TextInput inputType="number">
        <TextInput.Label>Age (Natural numbers only)</TextInput.Label>
        <TextInput.Field>
          <TextInput.NumberInput numberType="natural" placeholder="Enter your age" />
        </TextInput.Field>
      </TextInput>
      <TextInput inputType="number">
        <TextInput.Label>Temperature (Integer)</TextInput.Label>
        <TextInput.Field>
          <TextInput.NumberInput numberType="integer" placeholder="e.g., -10 or 25" />
        </TextInput.Field>
      </TextInput>
      <TextInput inputType="number">
        <TextInput.Label>Price (Positive decimal)</TextInput.Label>
        <TextInput.Field>
          <TextInput.Icon>
            <DollarSign className="w-4 h-4" />
          </TextInput.Icon>
          <TextInput.NumberInput numberType="positive" placeholder="0.00" />
        </TextInput.Field>
      </TextInput>
      <TextInput inputType="number" defaultValue="5">
        <TextInput.Label>Quantity (0-10)</TextInput.Label>
        <TextInput.Field>
          <TextInput.NumberInput numberType="natural" min={0} max={10} />
        </TextInput.Field>
        <TextInput.Description>
          Value constrained between 0 and 10 on blur.
        </TextInput.Description>
      </TextInput>
    </>
  );
}`,
      tags: ['number', 'integer', 'decimal', 'constraints'],
    },
    {
      title: 'Validation States',
      description: 'Inputs demonstrating error, warning, and success validation states with their respective message components.',
      code: `import { TextInput } from 'vayu-ui';
import { Mail, User } from 'lucide-react';

export default function ValidationStates() {
  return (
    <>
      <TextInput validationState="error" defaultValue="invalid-email">
        <TextInput.Label>Email</TextInput.Label>
        <TextInput.Field>
          <TextInput.Icon>
            <Mail className="w-4 h-4" />
          </TextInput.Icon>
          <TextInput.Input />
        </TextInput.Field>
        <TextInput.ErrorMessage>Please enter a valid email address.</TextInput.ErrorMessage>
      </TextInput>
      <TextInput validationState="warning" defaultValue="weak">
        <TextInput.Label>Password Strength</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input />
        </TextInput.Field>
        <TextInput.WarningMessage>
          Password is weak. Consider adding special characters.
        </TextInput.WarningMessage>
      </TextInput>
      <TextInput validationState="success" defaultValue="john.doe">
        <TextInput.Label>Username</TextInput.Label>
        <TextInput.Field>
          <TextInput.Icon>
            <User className="w-4 h-4" />
          </TextInput.Icon>
          <TextInput.Input />
        </TextInput.Field>
        <TextInput.SuccessMessage>Username is available!</TextInput.SuccessMessage>
      </TextInput>
    </>
  );
}`,
      tags: ['validation', 'error', 'warning', 'success'],
    },
    {
      title: 'Character Count',
      description: 'A controlled input with character count display and a clear button.',
      code: `import { TextInput } from 'vayu-ui';
import { useState } from 'react';

export default function CharacterCount() {
  const [value, setValue] = useState('');

  return (
    <TextInput value={value} onChange={setValue}>
      <TextInput.Label>Bio</TextInput.Label>
      <TextInput.Field>
        <TextInput.Input placeholder="Tell us about yourself" maxLength={50} />
        <TextInput.ClearButton />
      </TextInput.Field>
      <TextInput.CharacterCount maxLength={50} showCount="always" />
    </TextInput>
  );
}`,
      tags: ['character-count', 'controlled', 'clear'],
    },
    {
      title: 'Input Sizes',
      description: 'Text inputs in small, medium (default), and large sizes.',
      code: `import { TextInput } from 'vayu-ui';

export default function InputSizes() {
  return (
    <>
      <TextInput size="sm">
        <TextInput.Label>Small</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="Small input" />
        </TextInput.Field>
      </TextInput>
      <TextInput size="md">
        <TextInput.Label>Medium (default)</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="Medium input" />
        </TextInput.Field>
      </TextInput>
      <TextInput size="lg">
        <TextInput.Label>Large</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="Large input" />
        </TextInput.Field>
      </TextInput>
    </>
  );
}`,
      tags: ['sizes', 'sm', 'md', 'lg'],
    },
    {
      title: 'Loading, Disabled, and Read-Only States',
      description: 'Inputs demonstrating loading spinner, disabled, and read-only states.',
      code: `import { TextInput } from 'vayu-ui';

export default function InputStates() {
  return (
    <>
      <TextInput loading>
        <TextInput.Label>Loading</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="Checking..." />
          <TextInput.LoadingSpinner />
        </TextInput.Field>
      </TextInput>
      <TextInput disabled>
        <TextInput.Label>Disabled</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input placeholder="Cannot edit" />
        </TextInput.Field>
      </TextInput>
      <TextInput readOnly defaultValue="Read-only value">
        <TextInput.Label>Read Only</TextInput.Label>
        <TextInput.Field>
          <TextInput.Input />
        </TextInput.Field>
      </TextInput>
    </>
  );
}`,
      tags: ['loading', 'disabled', 'readonly', 'states'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside TextInput root',
      bad: '<div><TextInput.Input placeholder="..." /></div>',
      good: '<TextInput><TextInput.Field><TextInput.Input placeholder="..." /></TextInput.Field></TextInput>',
      reason: 'Sub-components like Input, Label, and Field read state from TextInputContext via useTextInput(). Using them outside the TextInput root throws an error because no context provider exists.',
    },
    {
      title: 'Using onChange with React.ChangeEvent signature',
      bad: '<TextInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => ...} />',
      good: '<TextInput onChange={(value: string) => ...} />',
      reason: "The TextInput onChange prop receives a string (the current value), not a React ChangeEvent. The component's types omit the HTML input onChange to prevent this mistake.",
    },
    {
      title: 'Setting inputType="password" without PasswordInput',
      bad: '<TextInput inputType="password"><TextInput.Field><TextInput.Input /></TextInput.Field></TextInput>',
      good: '<TextInput inputType="password"><TextInput.Field><TextInput.PasswordInput /></TextInput.Field></TextInput>',
      reason: 'When inputType is "password", use TextInput.PasswordInput instead of TextInput.Input. PasswordInput provides the visibility toggle button with proper aria-label for accessibility.',
    },
    {
      title: 'Hardcoding validation colors on the Field',
      bad: '<TextInput validationState="error"><TextInput.Field className="border-red-500"><TextInput.Input /></TextInput.Field></TextInput>',
      good: '<TextInput validationState="error"><TextInput.Field><TextInput.Input /></TextInput.Field></TextInput>',
      reason: 'The Field component already applies design-token-based validation colors (border-destructive, border-warning, border-success). Hardcoding colors bypasses the design system and does not update with theme changes.',
    },
    {
      title: 'Placing ErrorMessage outside the TextInput root',
      bad: '<TextInput validationState="error">...</TextInput><p className="text-red-500">Error message</p>',
      good: '<TextInput validationState="error"><TextInput.Label>Email</TextInput.Label><TextInput.Field><TextInput.Input /></TextInput.Field><TextInput.ErrorMessage>Please enter a valid email.</TextInput.ErrorMessage></TextInput>',
      reason: 'The ErrorMessage sub-component is automatically linked to the input via aria-describedby using a generated errorId. Placing it outside the TextInput root breaks this association and the message will not be announced by screen readers.',
    },
  ],
};
