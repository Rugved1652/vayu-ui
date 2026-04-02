import { VayuComponentDoc } from '../types';

export const toasterRegistry: VayuComponentDoc = {
  component: 'Toaster',
  slug: 'toaster',
  category: 'feedback',

  complexity: 'compound',

  description:
    'A notification component with imperative API, stacked animations, and custom toast support using compound components. Provides toast notifications with multiple types (success, error, warning, info, loading), customizable positioning, auto-dismiss with progress bar, and swipe-to-dismiss functionality.',

  ai_summary:
    'Toast notification system with ToastProvider context, useToast hook for imperative API, and compound components for custom content. Supports stacked Sonner-style animations, pause on hover, keyboard dismissal, and promise-based loading states.',

  intent: [
    'Display temporary feedback messages',
    'Notify users of action results',
    'Show loading states for async operations',
    'Alert users to errors or warnings',
    'Provide non-blocking notifications',
  ],

  ai_keywords: [
    'toast',
    'notification',
    'snackbar',
    'alert',
    'feedback',
    'message',
    'popup',
    'imperative',
    'context',
    'provider',
  ],

  when_to_use: [
    'Showing success/error feedback after form submission',
    'Displaying async operation status with promise tracking',
    'Non-critical notifications that should auto-dismiss',
    'Stacked notifications in a specific screen corner',
    'Custom notification content with actions',
  ],

  when_not_to_use: [
    'Critical errors requiring immediate user attention (use Dialog instead)',
    'Persistent notifications that need to remain visible',
    'In-page messages that should not overlay content',
    'Complex forms requiring validation feedback inline',
  ],

  composition: {
    root: 'ToastProvider',
    slots: ['Toast.Title', 'Toast.Description', 'Toast.Close'],
    structure: ['ToastProvider', 'useToast', 'Toast.Title', 'Toast.Description', 'Toast.Close'],
    rules: [
      'ToastProvider must wrap the application or component tree',
      'useToast hook must be called within ToastProvider context',
      'Toast compound components (Title, Description, Close) are for custom toast content only',
      'Call toast methods (success, error, etc.) from useToast hook to trigger notifications',
    ],
  },

  props: {
    ToastProvider: [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'Child components that will have access to toast context',
      },
      {
        name: 'defaultPosition',
        type: 'ToastPosition',
        default: 'bottom-right',
        description:
          'Default position for all toasts. Options: "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"',
      },
      {
        name: 'maxToasts',
        type: 'number',
        default: 5,
        description: 'Maximum number of toasts visible at once',
      },
      {
        name: 'defaultDuration',
        type: 'number',
        default: 5000,
        description: 'Default auto-dismiss duration in milliseconds',
      },
    ],
    ToastOptions: [
      {
        name: 'type',
        type: '"success" | "error" | "warning" | "info" | "loading"',
        description: 'Visual style and behavior variant of the toast',
      },
      {
        name: 'title',
        type: 'ReactNode',
        description: 'Primary heading text of the toast',
      },
      {
        name: 'description',
        type: 'ReactNode',
        description: 'Secondary body text of the toast',
      },
      {
        name: 'duration',
        type: 'number',
        default: 5000,
        description: 'Duration in ms before auto-dismiss. Set to 0 for persistent toasts',
      },
      {
        name: 'position',
        type: 'ToastPosition',
        description:
          'Position override for this toast. Options: "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"',
      },
      {
        name: 'action',
        type: '{ label: ReactNode; onClick: () => void }',
        description: 'Optional action button configuration',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Callback fired when toast is dismissed',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: true,
        description: 'Whether the close button is visible',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Custom icon to replace the default type icon',
      },
      {
        name: 'customContent',
        type: 'ReactNode',
        description: 'Completely custom toast content (bypasses default layout)',
      },
    ],
    'useToast returns': [
      {
        name: 'success',
        type: '(message: ReactNode, options?) => string',
        description: 'Shows a success toast, returns toast ID',
      },
      {
        name: 'error',
        type: '(message: ReactNode, options?) => string',
        description: 'Shows an error toast, returns toast ID',
      },
      {
        name: 'warning',
        type: '(message: ReactNode, options?) => string',
        description: 'Shows a warning toast, returns toast ID',
      },
      {
        name: 'info',
        type: '(message: ReactNode, options?) => string',
        description: 'Shows an info toast, returns toast ID',
      },
      {
        name: 'loading',
        type: '(message: ReactNode, options?) => string',
        description: 'Shows a loading toast (no auto-dismiss), returns toast ID',
      },
      {
        name: 'promise',
        type: '<T>(promise: Promise<T>, messages, options?) => Promise<T>',
        description: 'Handles loading/success/error states for a promise automatically',
      },
      {
        name: 'custom',
        type: '(content: ReactNode, options?) => string',
        description: 'Renders custom JSX content as toast, returns toast ID',
      },
      {
        name: 'updateToast',
        type: '(id: string, options: Partial<ToastOptions>) => void',
        description: 'Updates an existing toast by ID',
      },
      {
        name: 'removeToast',
        type: '(id: string) => void',
        description: 'Removes a toast by ID',
      },
      {
        name: 'toasts',
        type: 'Toast[]',
        description: 'Current array of active toasts',
      },
      {
        name: 'addToast',
        type: '(options: ToastOptions) => string',
        description: 'Low-level method to add a toast with full options',
      },
    ],
    'Toast.Title': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Title content',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    'Toast.Description': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Description content',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
    'Toast.Close': [
      {
        name: 'onClick',
        type: '() => void',
        description: 'Click handler for dismiss',
      },
      {
        name: 'aria-label',
        type: 'string',
        description: 'Accessibility label for the close button',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes',
      },
    ],
  },

  variants: [
    {
      name: 'type',
      values: ['success', 'error', 'warning', 'info', 'loading'],
      description: 'Visual variant determining icon, colors, and accessibility role',
    },
    {
      name: 'position',
      values: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      default: 'bottom-right',
      description: 'Screen position where toasts appear',
    },
  ],

  states: ['success', 'error', 'warning', 'info', 'loading', 'exiting'],

  responsive: {
    allowed: true,
    patterns: [
      'Toast width is responsive with maxWidth of 420px',
      'Stack expands on hover/focus to show all toasts',
      'Touch-friendly swipe-to-dismiss gesture',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'success-500',
        'success-600',
        'success-400',
        'error-500',
        'error-600',
        'error-400',
        'warning-500',
        'warning-600',
        'warning-400',
        'info-500',
        'info-600',
        'info-400',
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-400',
        'ground-500',
        'ground-600',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
      ],
      radius: ['rounded-lg', 'rounded-md', 'rounded-full'],
      border: ['border', 'border-l-4'],
      spacing: ['p-4', 'p-1.5', 'px-2.5', 'py-1', 'mt-0.5', 'mt-1', 'mt-2', 'gap-3'],
      typography: [
        'text-sm',
        'text-xs',
        'font-semibold',
        'font-medium',
        'font-primary',
        'font-secondary',
      ],
    },
    recommended: {
      colors: ['success-500', 'error-500', 'warning-500', 'info-500', 'ground-50', 'ground-900'],
      radius: ['rounded-lg'],
      typography: ['text-sm', 'font-semibold'],
    },
    allowed: {
      colors: ['success-*', 'error-*', 'warning-*', 'info-*', 'ground-*', 'primary-*'],
      radius: ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full'],
      border: ['border', 'border-l-2', 'border-l-4'],
      spacing: ['p-*', 'px-*', 'py-*', 'm-*', 'mx-*', 'my-*', 'gap-*'],
      typography: ['text-xs', 'text-sm', 'text-base'],
    },
  },

  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple toast notification triggered by button click',
      code: `import { useToast, ToastProvider, Button } from "vayu-ui";

export default function App() {
  const toast = useToast();

  return (
    <ToastProvider>
      <Button
        onClick={() =>
          toast.success("Success", {
            description: "Action completed successfully"
          })
        }
      >
        Show Toast
      </Button>
    </ToastProvider>
  );
}`,
    },
    {
      name: 'Promise-based Toast',
      description: 'Automatically handles loading, success, and error states for async operations',
      code: `const toast = useToast();

const handleSubmit = async () => {
  await toast.promise(
    fetch('/api/submit', { method: 'POST' }),
    {
      loading: 'Submitting...',
      success: 'Form submitted successfully!',
      error: 'Failed to submit form'
    }
  );
};`,
    },
    {
      name: 'Custom Toast Content',
      description: 'Using compound components for completely custom layouts',
      code: `import { useToast, Toast } from "vayu-ui";

const toast = useToast();

toast.custom(
  <div className="w-full max-w-sm border border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-950 p-4 shadow-lg rounded-lg">
    <div className="flex items-start gap-4">
      <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded text-primary-600 dark:text-primary-400">
        🎉
      </div>
      <div className="flex-1">
        <Toast.Title>Custom Notification</Toast.Title>
        <Toast.Description>This is a completely custom toast.</Toast.Description>
      </div>
    </div>
  </div>
)`,
    },
    {
      name: 'Toast with Action',
      description: 'Toast with an interactive action button',
      code: `const toast = useToast();

toast.error("Delete failed", {
  description: "Could not delete the item",
  action: {
    label: "Retry",
    onClick: () => handleRetry()
  }
});`,
    },
    {
      name: 'Provider Setup',
      description: 'Add ToastProvider to root layout',
      code: `import { ToastProvider } from 'vayu-ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}`,
    },
    {
      name: 'Loading to Success Transition',
      description: 'Update a loading toast to success/error when operation completes',
      code: `const toast = useToast();

const handleAsync = async () => {
  const toastId = toast.loading("Processing...");

  try {
    await doSomething();
    toast.updateToast(toastId, {
      type: "success",
      description: "Complete!",
      duration: 3000,
      dismissible: true
    });
  } catch (err) {
    toast.updateToast(toastId, {
      type: "error",
      description: "Failed",
      duration: 5000,
      dismissible: true
    });
  }
};`,
    },
  ],

  accessibility: {
    pattern: 'ARIA Live Region',
    standards: [
      'WCAG 2.1 Level AA',
      'WAI-ARIA Authoring Practices',
      'prefers-reduced-motion support',
    ],
    keyboard_support: [
      'Escape - Dismiss the first dismissible toast',
      'Tab - Navigate between interactive elements within toast',
      'Enter/Space - Activate action buttons or expand collapsed toasts',
    ],
    aria_attributes: [
      'role="status" for info/success toasts',
      'role="alert" for error/warning toasts',
      'aria-live="polite" for non-critical notifications',
      'aria-live="assertive" for critical notifications',
      'aria-atomic="true" on toast items',
      'aria-label on close buttons',
      'aria-relevant="additions removals" on toast region',
      'aria-hidden on hidden stacked toasts',
      'role="progressbar" on countdown indicator',
    ],
  },

  anti_patterns: [
    'Using toast for critical errors that require blocking user interaction',
    'Nesting ToastProvider multiple times in the component tree',
    'Calling useToast outside of ToastProvider context',
    'Setting very short durations that prevent users from reading messages',
    'Using loading toasts without eventually updating to success/error',
    'Creating too many simultaneous toasts (exceeds maxToasts limit)',
  ],

  dependencies: {
    icons: [],
    utilities: ['cn'],
    components: [],
  },

  relationships: {
    used_with: ['Button', 'Form', 'Dialog'],
    often_inside: ['RootLayout', 'App'],
    often_contains: [],
  },

  related_components: ['Dialog', 'Alert', 'Badge', 'Spinner'],

  validation_rules: [
    'useToast must be called within a ToastProvider context',
    'ToastProvider should be placed at the root level of the app',
    'Loading toasts should be updated to success/error when operation completes',
    'Toast with duration 0 will not auto-dismiss',
    'maxToasts limits the number of visible toasts per position',
    'Custom content bypasses default toast layout and styling',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add toaster'],

  source: {
    file: 'packages/ui/src/components/ui/toaster.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/toaster',
    source_file: 'packages/ui/src/components/ui/toaster.tsx',
    extracted: [
      'component',
      'props',
      'variants',
      'accessibility',
      'examples',
      'composition',
      'design_tokens',
    ],
    inferred: [
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'anti_patterns',
      'validation_rules',
      'relationships',
    ],
  },
};

export default toasterRegistry;
