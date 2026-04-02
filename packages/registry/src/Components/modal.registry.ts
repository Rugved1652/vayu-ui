export const modalRegistry = {
  component: 'Modal',
  slug: 'modal',
  category: 'overlay',

  complexity: 'compound' as const,

  description:
    'An accessible dialog overlay component with focus trap, keyboard navigation, and compound component API.',
  ai_summary:
    'A compound component that renders an accessible modal dialog using React portals with built-in focus trapping, keyboard navigation, scroll lock, and both controlled and uncontrolled state management patterns.',

  intent: [
    'Display focused content that requires user attention',
    'Show confirmation dialogs for destructive actions',
    'Present forms or complex interactions in an overlay',
    'Display detailed information without navigating away',
    'Capture user input in a modal context',
  ],

  ai_keywords: [
    'modal',
    'dialog',
    'overlay',
    'popup',
    'lightbox',
    'confirmation dialog',
    'alert dialog',
    'focus trap',
    'portal',
  ],

  when_to_use: [
    'When you need to display content that requires immediate user attention',
    'For confirmation dialogs before destructive actions',
    'When presenting forms or wizards in an overlay context',
    'To show detailed information without full page navigation',
    'When focus should be temporarily trapped within a component',
  ],

  when_not_to_use: [
    'For simple tooltips or hover information (use Tooltip instead)',
    'For navigation menus (use Dropdown or Navigation)',
    'For non-blocking notifications (use Toast instead)',
    'When content should be always visible on the page',
    'For complex multi-step flows that deserve their own page',
  ],

  composition: {
    root: 'Modal',
    slots: [
      'Modal.Trigger',
      'Modal.Overlay',
      'Modal.Content',
      'Modal.Header',
      'Modal.Body',
      'Modal.Footer',
      'Modal.Title',
      'Modal.Description',
      'Modal.Close',
    ],
    structure: [
      'Modal',
      'Modal.Trigger',
      'Modal.Overlay',
      'Modal.Content',
      'Modal.Header',
      'Modal.Body',
      'Modal.Footer',
      'Modal.Title',
      'Modal.Description',
      'Modal.Close',
    ],
    rules: [
      'Modal.Content must be used within Modal',
      'Modal.Title must be used within Modal.Header for proper aria-labelledby linking',
      'Modal.Description must be used within Modal.Header for proper aria-describedby linking',
      'Modal.Trigger is optional when using controlled state (open/onOpenChange)',
      'Modal.Close renders default X icon when no children provided',
      'Modal.Overlay is automatically rendered by Modal.Content via portal',
    ],
  },

  props: {
    Modal: [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Modal subcomponents (Trigger, Content, etc.)',
      },
      {
        name: 'open',
        type: 'boolean',
        required: false,
        default: undefined,
        description: 'Controlled open state. When provided, the component becomes controlled.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        required: false,
        description: 'Callback fired when the open state changes.',
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Initial open state for uncontrolled usage.',
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg" | "xl" | "full"',
        required: false,
        default: 'md',
        description: 'Maximum width of the modal panel.',
      },
      {
        name: 'closeOnOverlayClick',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Whether clicking the overlay closes the modal.',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Whether pressing Escape closes the modal.',
      },
    ],
    'Modal.Trigger': [
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Render as the child element instead of a default button.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Modal.Overlay': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the overlay backdrop.',
      },
    ],
    'Modal.Content': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the dialog panel.',
      },
    ],
    'Modal.Header': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Modal.Body': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Modal.Footer': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Modal.Title': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes. Renders as <h2> with auto-linked aria-labelledby.',
      },
    ],
    'Modal.Description': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes. Renders as <p> with auto-linked aria-describedby.',
      },
    ],
    'Modal.Close': [
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Render as the child element instead of a default button.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description:
          'Additional CSS classes. When no children provided, renders default X icon button.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        required: false,
        description:
          "Custom close button content. When omitted, renders X icon with aria-label='Close'.",
      },
    ],
  },

  variants: [
    {
      name: 'size',
      values: ['sm', 'md', 'lg', 'xl', 'full'],
      default: 'md',
      description:
        'Maximum width of the modal panel. sm=28rem, md=32rem, lg=40rem, xl=48rem, full=calc(100vw - 4rem)',
    },
  ],

  states: ['open', 'closed', 'hover', 'focus-visible'],

  responsive: {
    allowed: true,
    patterns: [
      'Modal automatically centers with p-4 padding on all screen sizes',
      'Full size variant adapts to viewport width with calc(100vw - 4rem)',
      'Content scrolls within Modal.Body for overflow handling on smaller screens',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'bg-ground-50',
        'bg-ground-950',
        'bg-ground-950/50',
        'bg-ground-100',
        'bg-ground-200',
        'bg-ground-700',
        'bg-ground-800',
        'text-ground-900',
        'text-ground-100',
        'text-ground-700',
        'text-ground-300',
        'text-ground-500',
        'text-ground-400',
        'border-ground-200',
        'border-ground-700',
        'ring-primary-500',
        'ring-offset-ground-950',
      ],
      radius: ['rounded-lg', 'rounded-md'],
      border: ['border'],
      spacing: ['p-6', 'p-4', 'p-1.5', 'px-4', 'py-2', 'pb-0', 'pt-0', 'gap-2', 'gap-4'],
      typography: [
        'text-sm',
        'text-lg',
        'font-semibold',
        'font-medium',
        'font-primary',
        'font-secondary',
      ],
    },
    recommended: {
      colors: ['bg-ground-50', 'bg-ground-950', 'text-ground-900', 'text-ground-100'],
      radius: ['rounded-lg'],
      spacing: ['p-6', 'gap-4'],
      typography: ['text-lg', 'font-semibold', 'font-primary'],
    },
    allowed: {
      colors: [
        'bg-ground-50',
        'bg-ground-950',
        'bg-ground-100',
        'bg-ground-200',
        'bg-ground-700',
        'bg-ground-800',
        'text-ground-900',
        'text-ground-100',
        'text-ground-700',
        'text-ground-300',
        'text-ground-500',
        'text-ground-400',
      ],
      radius: ['rounded-lg', 'rounded-md'],
      spacing: ['p-6', 'p-4', 'px-4', 'py-2', 'gap-2', 'gap-4'],
      typography: ['text-sm', 'text-lg', 'font-semibold', 'font-medium'],
    },
  },

  examples: [
    {
      name: 'Uncontrolled Modal',
      description: 'Modal that manages its own open/close state internally',
      code: `<Modal>
  <Modal.Trigger>Open Modal</Modal.Trigger>

  <Modal.Content>
    <Modal.Header>
      <div className="flex-1">
        <Modal.Title>Welcome</Modal.Title>
        <Modal.Description>
          This modal manages its own state.
        </Modal.Description>
      </div>
      <Modal.Close />
    </Modal.Header>

    <Modal.Body>
      <p>Your content here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100">
        Close
      </Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
    },
    {
      name: 'Controlled Modal',
      description: 'Modal with external state management via open and onOpenChange props',
      code: `const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open</button>

<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>
      <div className="flex-1">
        <Modal.Title>Controlled Modal</Modal.Title>
        <Modal.Description>External state control.</Modal.Description>
      </div>
      <Modal.Close />
    </Modal.Header>

    <Modal.Body>
      <p>Controlled by parent state.</p>
    </Modal.Body>

    <Modal.Footer>
      <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700">
        Cancel
      </Modal.Close>
      <button onClick={() => setOpen(false)}>Confirm</button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
    },
    {
      name: 'Different Sizes',
      description: 'Modal with different size variants',
      code: `<Modal size="sm">
  <Modal.Trigger>Small Modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Small Modal</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>28rem max width</Modal.Body>
  </Modal.Content>
</Modal>

<Modal size="lg">
  <Modal.Trigger>Large Modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Large Modal</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>40rem max width</Modal.Body>
  </Modal.Content>
</Modal>

<Modal size="full">
  <Modal.Trigger>Full Width Modal</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Full Width</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>calc(100vw - 4rem) max width</Modal.Body>
  </Modal.Content>
</Modal>`,
    },
    {
      name: 'Custom Trigger with asChild',
      description: 'Use a custom element as the trigger button',
      code: `<Modal>
  <Modal.Trigger asChild>
    <Button variant="primary">
      <Button.Text>Open Settings</Button.Text>
    </Button>
  </Modal.Trigger>

  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Settings</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>Settings content here.</Modal.Body>
  </Modal.Content>
</Modal>`,
    },
    {
      name: 'Confirmation Dialog',
      description: 'Modal for confirming destructive actions',
      code: `<Modal size="sm">
  <Modal.Trigger className="bg-red-500 text-white hover:bg-red-600">
    Delete Account
  </Modal.Trigger>

  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Delete Account?</Modal.Title>
      <Modal.Description>
        This action cannot be undone. All your data will be permanently removed.
      </Modal.Description>
    </Modal.Header>

    <Modal.Footer>
      <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700">
        Cancel
      </Modal.Close>
      <button className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
        Delete
      </button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
    },
  ],

  accessibility: {
    pattern: 'dialog',
    standards: [
      'WCAG 2.2 AA compliant',
      'WAI-ARIA Authoring Practices for Dialog Modal pattern',
      'Focus trap implementation per WCAG 2.4.3 Focus Order',
      'Focus return per WCAG 2.4.11 Focus Not Obscured',
    ],
    keyboard_support: [
      'Tab: Move focus to the next focusable element within the modal',
      'Shift + Tab: Move focus to the previous focusable element within the modal',
      'Escape: Close the modal (when closeOnEscape is true)',
      'Enter/Space: Activate the focused button or trigger',
    ],
    aria_attributes: [
      "role='dialog': Identifies the element as a dialog window",
      "aria-modal='true': Indicates the dialog is modal and blocks interaction with background content",
      'aria-labelledby: References Modal.Title for accessible name via auto-generated useId()',
      'aria-describedby: References Modal.Description for accessible description via auto-generated useId()',
      'aria-expanded: On trigger, indicates whether the modal is currently open',
      "aria-haspopup='dialog': On trigger, indicates it opens a dialog",
      "aria-hidden='true': On overlay and center wrapper to hide from accessibility tree",
      "aria-label='Close': On default close button for icon-only usage",
    ],
  },

  anti_patterns: [
    'Nesting Modal components can cause focus trap and z-index conflicts',
    'Using Modal without Modal.Title breaks aria-labelledby accessibility',
    'Missing Modal.Close prevents keyboard users from easily dismissing',
    'Rendering Modal.Content outside of Modal root breaks context',
    'Setting closeOnOverlayClick=false without providing alternative close method traps users',
    'Using Modal for simple notifications instead of Toast component',
  ],

  dependencies: {
    icons: ['X'],
    utilities: ['clsx'],
  },

  relationships: {
    used_with: ['Button', 'TextInput', 'Form', 'Card'],
    often_inside: ['Page layouts', 'Dashboard', 'App root'],
    often_contains: ['Button', 'TextInput', 'Typography', 'Form controls'],
  },

  related_components: ['Button', 'TextInput'],

  validation_rules: [
    'Modal.Content must be a descendant of Modal',
    'Modal.Title should be used within Modal.Header for proper ARIA linking',
    'Modal.Description should be used within Modal.Header for proper ARIA linking',
    'If open prop is provided, onOpenChange should also be provided for controlled usage',
    'Modal must have at least one way to close (overlay click, escape key, or close button)',
    'When using asChild on Modal.Trigger, ensure the child element can accept ref and onClick props',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add modal'],

  source: {
    file: 'packages/ui/src/components/ui/modal.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/modal',
    source_file: 'packages/ui/src/components/ui/modal.tsx',
    extracted: [
      'component',
      'description',
      'props',
      'variants',
      'examples',
      'accessibility',
      'installation',
      'source',
      'composition',
      'dependencies',
    ],
    inferred: [
      'ai_summary',
      'ai_keywords',
      'intent',
      'when_to_use',
      'when_not_to_use',
      'relationships',
      'validation_rules',
      'anti_patterns',
      'design_tokens',
      'related_components',
    ],
  },
};

export default modalRegistry;
