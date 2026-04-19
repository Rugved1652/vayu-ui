import { ComponentRegistryEntry } from '../types.js';

export const textAreaEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'text-area',
  name: 'TextArea',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A compound multi-line text input component with character counting, validation states, resize control, and accessible label/error/support text sub-components.',
  longDescription:
    'The TextArea component uses the compound component pattern (TextArea.Label, TextArea.Input, TextArea.SupportText, TextArea.ErrorText, TextArea.CharCount) to build accessible multi-line text inputs. It supports controlled and uncontrolled modes, three sizes (sm, md, lg), error and disabled states, configurable resize behavior (none, vertical, horizontal, both), character counting with maxLength enforcement, and string or string-array content for support and error text. All ARIA attributes (labelledby, describedby, invalid, errormessage, required, disabled) are managed automatically via React context.',

  tags: [
    'textarea',
    'multi-line',
    'input',
    'form',
    'validation',
    'character-count',
    'text-field',
    'comment',
    'message',
  ],
  useCases: [
    'Multi-line comment or feedback form with character limit enforcement',
    'Bio or about-me fields with character counting in the label',
    'Form text areas with validation error messages and support text',
    'Accessible labeled textareas with required indicators and ARIA attributes',
    'Contact or message forms with resize-controlled input areas',
    'Form fields displaying multiple validation guidelines as a list',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'TextArea',
  files: [
    {
      name: 'TextArea.tsx',
      description:
        'Root component with context provider managing focus, character count, error state, and auto-generated ARIA IDs',
    },
    {
      name: 'TextAreaLabel.tsx',
      description:
        'Label element linked to the input via htmlFor/id, with optional inline character count display',
    },
    {
      name: 'TextAreaInput.tsx',
      description:
        'Textarea element with forwardRef, resize control, size-based styling, focus ring, and ARIA attributes',
    },
    {
      name: 'TextAreaSupportText.tsx',
      description:
        'Helper text linked to the input via aria-describedby, supports string or string-array children',
    },
    {
      name: 'TextAreaErrorText.tsx',
      description:
        'Error message with role="alert", destructive styling, and AlertCircle icon, supports string or string-array children',
    },
    {
      name: 'TextAreaCharCount.tsx',
      description:
        'Standalone character counter with aria-live="polite" for screen reader announcements',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for all component props, context value, and union types',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component and re-exporting types',
    },
    {
      name: 'README.md',
      description: 'Component documentation and usage guidelines',
      optional: true,
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'TextArea',
  subComponents: [
    {
      name: 'Label',
      fileName: 'TextAreaLabel.tsx',
      description:
        'Renders a label element linked to the input via htmlFor/id. Optionally displays an inline character count with aria-live="polite".',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text content.',
        },
        {
          name: 'showCharCount',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description:
            'Whether to display the character count inline next to the label text.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the label element.',
        },
      ],
    },
    {
      name: 'Input',
      fileName: 'TextAreaInput.tsx',
      description:
        'The textarea element with forwardRef support. Manages focus ring styling, resize behavior, size-based padding, and ARIA attributes. Fires onChange to update character count in context.',
      props: [
        {
          name: 'resize',
          type: "'none' | 'vertical' | 'horizontal' | 'both'",
          required: false,
          defaultValue: "'vertical'",
          description: 'Controls the resize direction of the textarea element.',
          options: ['none', 'vertical', 'horizontal', 'both'],
        },
        {
          name: 'rows',
          type: 'number',
          required: false,
          defaultValue: '4',
          description: 'Number of visible text rows for the textarea.',
        },
        {
          name: 'value',
          type: 'string',
          required: false,
          description: 'Controlled value for the textarea.',
        },
        {
          name: 'onChange',
          type: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
          required: false,
          description:
            'Called when the textarea value changes. Also updates the internal character count.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the textarea element.',
        },
      ],
    },
    {
      name: 'SupportText',
      fileName: 'TextAreaSupportText.tsx',
      description:
        'Renders helper text linked to the input via aria-describedby. Renders a paragraph for string children or an unordered list for string-array children.',
      props: [
        {
          name: 'children',
          type: 'string | string[]',
          required: true,
          description:
            'Support text content. A string renders as a paragraph; an array renders as a bulleted list.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the support text container.',
        },
      ],
    },
    {
      name: 'ErrorText',
      fileName: 'TextAreaErrorText.tsx',
      description:
        'Renders an error message with role="alert", destructive styling, and an AlertCircle icon. Renders a paragraph for string children or an unordered list for string-array children.',
      props: [
        {
          name: 'children',
          type: 'string | string[]',
          required: true,
          description:
            'Error text content. A string renders as a paragraph with icon; an array renders as a bulleted list.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the error text container.',
        },
      ],
    },
    {
      name: 'CharCount',
      fileName: 'TextAreaCharCount.tsx',
      description:
        'Standalone character counter displayed outside the label. Announces count changes to screen readers via aria-live="polite".',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the character count element.',
        },
      ],
    },
  ],
  hooks: ['useTextAreaContext'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'Compound sub-components (Label, Input, SupportText, ErrorText, CharCount).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "'md'",
      description:
        'Controls the padding and font size of the textarea input.',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'Whether the textarea is in an error state. Applies destructive border, ring styling, and links error text via aria-errormessage.',
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      description:
        'Maximum character count. Enforced as the HTML maxLength attribute and displayed in character count sub-components.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'Whether the textarea is disabled. Applies opacity, cursor, and muted background styling.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes for the root wrapper div.',
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
      prop: 'isFocused (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Textarea has focus. Applies focus ring (ring-focus/20) and focus border color.',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Error validation state. Applies destructive border, error ring, and links error text via aria-errormessage.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disabled state. Applies opacity-60, cursor-not-allowed, muted background, and aria-disabled.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature:
        '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
      description:
        'Fires when the textarea value changes. Also updates the internal character count.',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLTextAreaElement>) => void',
      description:
        'Fires when the textarea gains focus. Also sets internal focus state for styling.',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLTextAreaElement>) => void',
      description:
        'Fires when the textarea loses focus. Also clears internal focus state.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'aria-labelledby',
        description:
          'Root wrapper references the label ID so screen readers associate the group with its label.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description:
          'Set to true on the textarea when the error prop is true on the root.',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description:
          'Dynamically composed from supportTextId and errorTextId based on which sub-components are present.',
        managedByComponent: true,
      },
      {
        name: 'aria-errormessage',
        description:
          'Set to errorTextId when error state is active, pointing to the ErrorText sub-component.',
        managedByComponent: true,
      },
      {
        name: 'aria-required',
        description:
          'Set to true on the textarea when the required HTML attribute is passed to TextArea.Input.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description:
          'Set to true on the textarea when the disabled prop is true on the root.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description:
          'Applied to CharCount and inline label char count so screen readers announce count changes without interrupting.',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic="true"',
        description:
          'Applied alongside aria-live on character count elements so the entire count is announced as a whole.',
        managedByComponent: true,
      },
      {
        name: 'role="alert"',
        description:
          'Applied to ErrorText sub-component so screen readers immediately announce error messages.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior:
          'Moves focus to the textarea. Focus ring and border styling are applied via internal isFocused state.',
      },
      {
        key: 'Shift+Tab',
        behavior:
          'Moves focus away from the textarea to the previous focusable element.',
      },
    ],
    focusManagement:
      'Focus ring with ring-focus/20 and border-focus is shown on focus and removed on blur via internal isFocused state.',
    wcagLevel: 'AA',
    notes: 'The component uses auto-generated IDs (via React.useId) for label, input, support text, and error text elements, ensuring aria-labelledby, htmlFor, aria-describedby, and aria-errormessage are always correctly linked. SupportText registers its presence via context so aria-describedby is only populated when support text exists.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'lucide-react' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason:
        'Single-line counterpart — use TextInput for short inputs and TextArea for multi-line inputs within the same form.',
    },
    {
      slug: 'button',
      reason:
        'Submit and cancel actions are commonly placed below TextArea fields in forms.',
    },
    {
      slug: 'form',
      reason:
        'TextArea fields are typically wrapped in a form component for submission and validation orchestration.',
    },
    {
      slug: 'divider',
      reason:
        'Used to separate multiple TextArea sections or form field groups in demos and layouts.',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default TextArea',
      description: 'Basic usage with a label and placeholder text.',
      code: `import { TextArea } from 'vayu-ui';

export default function DefaultTextArea() {
  return (
    <TextArea>
      <TextArea.Label>Description</TextArea.Label>
      <TextArea.Input placeholder="Enter a description..." />
    </TextArea>
  );
}`,
      tags: ['basic', 'default'],
    },
    {
      title: 'With Character Count',
      description:
        'TextArea with a maxLength constraint and character count displayed in the label.',
      code: `import { TextArea } from 'vayu-ui';
import { useState } from 'react';

export default function CharCountTextArea() {
  const [bio, setBio] = useState('');

  return (
    <TextArea maxLength={200}>
      <TextArea.Label showCharCount>Bio</TextArea.Label>
      <TextArea.Input
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
    </TextArea>
  );
}`,
      tags: ['character-count', 'controlled', 'max-length'],
    },
    {
      title: 'Validation with Error and Support Text',
      description:
        'TextArea showing error state with error text and support text, including array-based messages.',
      code: `import { TextArea } from 'vayu-ui';

export default function ValidationTextArea() {
  return (
    <TextArea error>
      <TextArea.Label>Feedback Guidelines</TextArea.Label>
      <TextArea.Input placeholder="Enter your feedback" />
      <TextArea.SupportText>
        {[
          'Be specific and constructive',
          'Include examples when possible',
          'Keep it respectful',
        ]}
      </TextArea.SupportText>
      <TextArea.ErrorText>
        {['Minimum 20 characters required', 'Must include specific details']}
      </TextArea.ErrorText>
    </TextArea>
  );
}`,
      tags: ['validation', 'error', 'support-text', 'array'],
    },
    {
      title: 'Resize Options',
      description:
        'All four resize modes: none, vertical (default), horizontal, and both.',
      code: `import { TextArea } from 'vayu-ui';

export default function ResizeTextArea() {
  return (
    <div className="space-y-4">
      <TextArea>
        <TextArea.Label>No Resize</TextArea.Label>
        <TextArea.Input resize="none" placeholder="Fixed size" />
      </TextArea>
      <TextArea>
        <TextArea.Label>Vertical Resize (default)</TextArea.Label>
        <TextArea.Input resize="vertical" placeholder="Resizes vertically" />
      </TextArea>
      <TextArea>
        <TextArea.Label>Horizontal Resize</TextArea.Label>
        <TextArea.Input resize="horizontal" placeholder="Resizes horizontally" />
      </TextArea>
      <TextArea>
        <TextArea.Label>Both Resize</TextArea.Label>
        <TextArea.Input resize="both" placeholder="Resizes both directions" />
      </TextArea>
    </div>
  );
}`,
      tags: ['resize', 'layout'],
    },
    {
      title: 'Standalone Character Count',
      description:
        'Character count displayed below the input instead of in the label.',
      code: `import { TextArea } from 'vayu-ui';
import { useState } from 'react';

export default function StandaloneCharCount() {
  const [message, setMessage] = useState('');

  return (
    <TextArea maxLength={100}>
      <TextArea.Label>Message</TextArea.Label>
      <TextArea.Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TextArea.CharCount />
    </TextArea>
  );
}`,
      tags: ['character-count', 'standalone'],
    },
    {
      title: 'With Form Actions',
      description:
        'TextArea paired with submit and cancel buttons in a form layout.',
      code: `import { TextArea, Button } from 'vayu-ui';

export default function FormTextArea() {
  return (
    <>
      <TextArea>
        <TextArea.Label>Your Message</TextArea.Label>
        <TextArea.Input placeholder="Write something..." rows={4} />
        <TextArea.SupportText>Press submit when you're done.</TextArea.SupportText>
      </TextArea>
      <div className="flex gap-3">
        <Button variant="primary">Submit</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </>
  );
}`,
      tags: ['form', 'buttons', 'actions'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using ErrorText without error prop',
      bad: `<TextArea>
  <TextArea.Label>Comment</TextArea.Label>
  <TextArea.Input placeholder="..." />
  <TextArea.ErrorText>Too short</TextArea.ErrorText>
</TextArea>`,
      good: `<TextArea error>
  <TextArea.Label>Comment</TextArea.Label>
  <TextArea.Input placeholder="..." />
  <TextArea.ErrorText>Too short</TextArea.ErrorText>
</TextArea>`,
      reason:
        "Without error={true} on the root, the textarea won't get destructive styling, aria-invalid, or aria-errormessage. The error state must be driven from the root.",
    },
    {
      title: 'Wrapping textarea directly instead of using compound sub-components',
      bad: `<TextArea className="flex gap-4">
  <label>Notes</label>
  <textarea placeholder="..." />
</TextArea>`,
      good: `<TextArea>
  <TextArea.Label>Notes</TextArea.Label>
  <TextArea.Input placeholder="..." />
</TextArea>`,
      reason:
        'Native label/textarea elements bypass context-based ID linking, ARIA attribute management, character counting, and focus styling. Always use the compound sub-components.',
    },
    {
      title: 'Setting maxLength only on the Input instead of the root',
      bad: `<TextArea>
  <TextArea.Label>Bio</TextArea.Label>
  <TextArea.Input maxLength={200} />
  <TextArea.CharCount />
</TextArea>`,
      good: `<TextArea maxLength={200}>
  <TextArea.Label>Bio</TextArea.Label>
  <TextArea.Input />
  <TextArea.CharCount />
</TextArea>`,
      reason:
        'maxLength must be set on the root TextArea so the context can share it with CharCount and Label (showCharCount). Setting it only on Input breaks character count display.',
    },
    {
      title: 'Using sub-components outside of TextArea root',
      bad: `<div>
  <TextArea.Label>Name</TextArea.Label>
  <TextArea.Input />
</div>`,
      good: `<TextArea>
  <TextArea.Label>Name</TextArea.Label>
  <TextArea.Input />
</TextArea>`,
      reason:
        'All sub-components rely on useTextAreaContext which throws if used outside a TextArea root. They need the context provider for IDs, state, and ARIA linking.',
    },
    {
      title: 'Passing non-string content to SupportText or ErrorText',
      bad: `<TextArea.SupportText><span>Helper text</span></TextArea.SupportText>`,
      good: `<TextArea.SupportText>Helper text</TextArea.SupportText>`,
      reason:
        'SupportText and ErrorText accept only string or string[] as children — they render as <p>/<ul> elements. Passing React nodes will cause a runtime type error.',
    },
  ],
};
