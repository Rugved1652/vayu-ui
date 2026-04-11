import { ComponentRegistryEntry } from '../types.js';

export const toasterEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'toaster',
  name: 'Toaster',
  type: 'component',
  category: 'feedback',

  // ── Description ───────────────────────────────────────
  description:
    'A Sonner-style toast notification system with stacking, swipe-to-dismiss, pause-on-hover, promise tracking, and compound sub-components for custom content.',
  longDescription:
    'The Toaster component provides a complete toast notification system built on React context and portals. ToastProvider wraps the application and exposes the useToast hook, which returns convenience methods (success, error, warning, info, loading, custom, promise) for triggering notifications. Toasts render in a fixed portal at z-index 2147483647 and group by position (six options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right). The stack supports Sonner-style visual stacking with up to 5 visible toasts, expand-on-hover behavior, and ghost exit animations. Individual toasts feature a countdown progress bar, pointer-based swipe-to-dismiss, automatic pause on hover/focus, and configurable duration (set to 0 for persistent toasts). The promise method auto-transitions loading toasts to success or error based on promise resolution. The compound component pattern exposes Toast.Title, Toast.Description, and Toast.Close for fully custom toast content rendered via toast.custom(). Each toast type uses appropriate ARIA roles (status for success/info/loading, alert for error/warning) and aria-live regions for screen reader announcements.',
  tags: [
    'toast',
    'notification',
    'snackbar',
    'alert',
    'feedback',
    'popup',
    'portal',
    'stack',
    'sonner',
    'promise',
    'non-blocking',
  ],
  useCases: [
    'Display transient success, error, warning, or info messages after user actions like saving, deleting, or submitting forms',
    'Show async operation progress with auto-transitioning loading states via the promise method',
    'Render fully custom notification content using compound sub-components (Toast.Title, Toast.Description) for rich layouts',
    'Present non-blocking confirmations with action buttons (Undo, View) that let users respond without interrupting workflow',
    'Display persistent notifications for critical alerts that require explicit dismissal (duration: 0)',
    'Stack multiple notifications with visual depth and expand-on-hover to review recent activity',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Toaster',
  files: [
    { name: 'ToastProvider.tsx', description: 'Composition root: React context, ToastProvider component wrapping children with ToastContainer, and useToast hook exposing all toast methods' },
    { name: 'ToastContainer.tsx', description: 'Portal-rendered container that groups toasts by position and renders a ToastStack for each active position' },
    { name: 'ToastStack.tsx', description: 'Sonner-style stack with expand/collapse on hover/focus, visual depth scaling, ghost exit animations, and overflow indicator' },
    { name: 'ToastItem.tsx', description: 'Individual toast with countdown timer, progress bar, swipe-to-dismiss via pointer events, pause/resume, and type-based styling' },
    { name: 'ToastUtilities.tsx', description: 'Compound sub-components: ToastTitle, ToastDescription, and ToastClose with forwarded refs and design token styling' },
    { name: 'ToastIcons.tsx', description: 'Inline SVG icons for each toast type (success, error, warning, info, loading) and the close button' },
    { name: 'constants.ts', description: 'Type style maps (border, icon, progress, role, aria-live), layout constants (VISIBLE_TOASTS, GAP, SCALE_STEP), and position class/animation mappings' },
    { name: 'types.ts', description: 'TypeScript interfaces for Toast, ToastOptions, ToastContextType, ToastContainerProps, ToastStackProps, ToastItemProps, and ToastProviderProps' },
    { name: 'index.ts', description: 'Barrel export assembling the Toast compound component object (Title, Description, Close), plus ToastProvider, useToast, and all type exports' },
    { name: 'README.md', description: 'Internal anatomy and use-case documentation for the Toaster component directory', optional: true },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'ToastProvider',
  subComponents: [
    {
      name: 'Title',
      fileName: 'ToastUtilities.tsx',
      description: 'Renders a bold heading for custom toast content. Forwards ref and accepts all div HTML attributes.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default title styling (font-semibold, text-sm)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Title text content',
        },
      ],
    },
    {
      name: 'Description',
      fileName: 'ToastUtilities.tsx',
      description: 'Renders muted descriptive text for custom toast content. Forwards ref and accepts all div HTML attributes.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default description styling (text-sm, text-muted-content)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Description text content',
        },
      ],
    },
    {
      name: 'Close',
      fileName: 'ToastUtilities.tsx',
      description: 'Renders a close/dismiss button for custom toast content. Forwards ref and accepts all button HTML attributes.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to merge with the default close button styling',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          required: false,
          description: 'Click handler for the close button',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          description: 'Accessible label for the close button; defaults to a visually hidden label if not provided',
        },
      ],
    },
  ],
  hooks: ['useToast'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Application content wrapped by the ToastProvider. ToastContainer is automatically appended alongside children.',
    },
    {
      name: 'defaultPosition',
      type: "ToastPosition",
      required: false,
      defaultValue: "'bottom-right'",
      description: 'Default position for toasts that do not specify a position. Applies to all convenience methods (success, error, etc.).',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    {
      name: 'defaultDuration',
      type: 'number',
      required: false,
      defaultValue: '5000',
      description: 'Default auto-dismiss duration in milliseconds. Set to 0 to make toasts persistent by default. Individual toasts can override this.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'type',
    options: ['success', 'error', 'warning', 'info', 'loading'],
    default: 'info',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'type',
      prop: 'type',
      isBoolean: false,
      values: ['success', 'error', 'warning', 'info', 'loading'],
      defaultValue: "'info'",
      description: 'Visual and semantic variant of the toast. Determines icon, border color, progress bar color, ARIA role, and aria-live politeness.',
    },
    {
      name: 'loading',
      prop: 'type',
      isBoolean: false,
      values: ['loading'],
      defaultValue: 'undefined',
      description: 'Loading toasts have no auto-dismiss timer, no close button, and show a spinning icon. Use toast.loading() or toast.promise() to trigger.',
    },
    {
      name: 'paused',
      prop: 'isAllPaused',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Timers pause when the user hovers over the stack or focuses a toast. Progress bar animation also pauses. Resumes on mouse leave or blur.',
    },
    {
      name: 'dismissible',
      prop: 'dismissible',
      isBoolean: true,
      defaultValue: 'true',
      description: 'When true, shows a close button and allows swipe-to-dismiss. Loading toasts override this to false by default.',
    },
    {
      name: 'exiting',
      prop: 'isExiting',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Ghost toast state during exit animation. The toast is removed from state but rendered as a ghost element for 300ms with exit animation classes.',
    },
    {
      name: 'expanded',
      prop: 'isExpanded',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Stack expands to show all visible toasts at full size on hover/focus. Collapsed state shows Sonner-style stacked depth with scale reduction.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClose',
      signature: '() => void',
      description: 'Callback fired when a toast is closed, regardless of dismissal method (close button, swipe, timer, or Escape key). Set per-toast via ToastOptions.',
    },
    {
      name: 'action.onClick',
      signature: '() => void',
      description: 'Callback fired when the toast action button is clicked. The toast is automatically dismissed after the action handler executes.',
    },
    {
      name: 'onPointerDown (ToastItem)',
      signature: '(event: React.PointerEvent<HTMLDivElement>) => void',
      description: 'Captures pointer for swipe-to-dismiss drag gesture. Sets pointer capture and pauses the toast timer.',
    },
    {
      name: 'onPointerMove (ToastItem)',
      signature: '(event: React.PointerEvent<HTMLDivElement>) => void',
      description: 'Tracks horizontal drag offset during swipe gesture. Updates visual translateX and opacity.',
    },
    {
      name: 'onPointerUp (ToastItem)',
      signature: '(event: React.PointerEvent<HTMLDivElement>) => void',
      description: 'Completes swipe gesture. Dismisses the toast if drag offset exceeds 100px, otherwise snaps back to original position.',
    },
    {
      name: 'onKeyDown (ToastStack)',
      signature: '(event: React.KeyboardEvent<HTMLElement>) => void',
      description: 'Handles Escape key to dismiss the first dismissible toast in the stack.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role',
        description: 'Set to "status" for success/info/loading toasts and "alert" for error/warning toasts. Matches the urgency of each notification type.',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" for success/info/loading toasts and "assertive" for error/warning toasts. Controls how screen readers announce new toasts.',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic',
        description: 'Set to "true" on each toast item so screen readers announce the full toast content as a single unit.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Set on each toast with format "{type} notification" (e.g. "Success notification", "Error notification"). Also set on the close button as "Dismiss {type} notification".',
        managedByComponent: true,
      },
      {
        name: 'aria-relevant',
        description: 'Set to "additions removals" on the stack section to announce new toasts and removed toasts to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on toast items beyond the visible limit (index >= 5) to prevent hidden stacked toasts from being announced.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Dismisses the first dismissible toast in the stack. Non-dismissible toasts are skipped.',
      },
      {
        key: 'Enter',
        behavior: 'Activates the overflow indicator button (when more than 5 toasts exist) to expand the stack and reveal hidden toasts.',
      },
      {
        key: ' ',
        behavior: 'Activates the overflow indicator button to expand the stack, same as Enter.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus between the close button and action button within a toast, and between toasts in the stack.',
      },
    ],
    focusManagement:
      'Each toast is focusable (tabIndex={0}). Hovering or focusing the toast stack expands it and pauses all timers. When focus leaves the stack (onBlur checks relatedTarget), the stack collapses and timers resume. The close button and action button both have visible focus rings via focus-visible:ring-2.',
    wcagLevel: 'AA',
    notes:
      'The component uses appropriate ARIA live regions based on toast urgency — assertive for errors/warnings, polite for success/info/loading. The section element wrapping each position group has an aria-label like "Notifications (bottom-right)". Swipe-to-dismiss uses pointer events which are not keyboard-accessible, but Escape provides an equivalent dismiss mechanism. Reduced motion is respected via animation classes that can be overridden with prefers-reduced-motion.',
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
      reason: 'Used as the trigger element to fire toast notifications from user interactions (form submit, delete, save)',
    },
    {
      slug: 'typography',
      reason: 'Used in documentation and demo layouts alongside toasts for headings and descriptive text',
    },
    {
      slug: 'divider',
      reason: 'Used in demo layouts to visually separate different toast feature sections',
    },
    {
      slug: 'spinner',
      reason: 'Alternative loading indicator for page-level loading states where toasts may not be appropriate',
    },
    {
      slug: 'modal',
      reason: 'Used together in confirmation flows — modal for blocking confirmations, toast for post-action feedback',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Setup and Standard Variants',
      description: 'Wrap your app with ToastProvider, then use the useToast hook to trigger success, error, warning, and info toasts.',
      code: `import { ToastProvider, useToast, Button } from 'vayu-ui';

function AppContent() {
  const toast = useToast();

  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={() =>
        toast.success('Operation successful', {
          description: 'Your changes have been saved.',
        })
      }>
        Success
      </Button>
      <Button variant="destructive" onClick={() =>
        toast.error('Operation failed', {
          description: 'Please try again later.',
        })
      }>
        Error
      </Button>
      <Button variant="outline" onClick={() =>
        toast.warning('Warning', {
          description: 'This action cannot be undone.',
        })
      }>
        Warning
      </Button>
      <Button variant="secondary" onClick={() =>
        toast.info('Information', {
          description: 'A new update is available.',
        })
      }>
        Info
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}`,
      tags: ['basic', 'setup', 'variants', 'success', 'error', 'warning', 'info'],
    },
    {
      title: 'Toast with Actions',
      description: 'Add an action button to toasts for inline responses like Undo or View without interrupting the user workflow.',
      code: `import { useToast, Button } from 'vayu-ui';

function ActionToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.info('File deleted', {
            description: 'Your file has been moved to trash.',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo clicked'),
            },
          })
        }
      >
        Delete with Undo
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Message sent', {
            description: 'Your message has been delivered.',
            action: {
              label: 'View',
              onClick: () => console.log('View clicked'),
            },
          })
        }
      >
        Send with View
      </Button>
    </div>
  );
}`,
      tags: ['action', 'undo', 'interactive', 'callback'],
    },
    {
      title: 'Promise and Loading States',
      description: 'Use toast.promise() for automatic loading-to-success/error transitions, or manually control loading toasts with updateToast.',
      code: `import { useToast, Button } from 'vayu-ui';

function PromiseToastDemo() {
  const toast = useToast();

  const handlePromiseSuccess = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Loading data...',
      success: 'Data loaded successfully!',
      error: 'Failed to load data',
    });
  };

  const handlePromiseError = () => {
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API Error')), 2000),
    );
    toast.promise(promise, {
      loading: 'Uploading file...',
      success: 'File uploaded!',
      error: 'Upload failed',
    }).catch(() => {});
  };

  const handleManualLoading = () => {
    const toastId = toast.loading('Processing...', {
      description: 'This may take a while',
    });
    setTimeout(() => {
      toast.updateToast(toastId, {
        type: 'success',
        description: 'Processing complete!',
      });
    }, 3000);
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handlePromiseSuccess}>Promise (Success)</Button>
      <Button variant="outline" onClick={handlePromiseError}>Promise (Error)</Button>
      <Button variant="secondary" onClick={handleManualLoading}>Manual Loading</Button>
    </div>
  );
}`,
      tags: ['promise', 'loading', 'async', 'update'],
    },
    {
      title: 'Duration Control',
      description: 'Control auto-dismiss timing with the duration option. Set to 0 for persistent toasts that require manual dismissal.',
      code: `import { useToast, Button } from 'vayu-ui';

function DurationToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={() =>
        toast.info('Quick toast', { duration: 2000 })
      }>
        2 Second
      </Button>
      <Button variant="outline" onClick={() =>
        toast.info('Long toast', { duration: 10000 })
      }>
        10 Second
      </Button>
      <Button variant="outline" onClick={() =>
        toast.info('Persistent toast', {
          duration: 0,
          description: 'Click to dismiss',
        })
      }>
        Persistent
      </Button>
    </div>
  );
}`,
      tags: ['duration', 'timeout', 'persistent', 'auto-dismiss'],
    },
    {
      title: 'Position Options',
      description: 'Position toasts at any of the six supported screen edges. Set a default position on ToastProvider or override per-toast.',
      code: `import { useToast, Button } from 'vayu-ui';

function PositionToastDemo() {
  const toast = useToast();

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button size="small" variant="outline"
        onClick={() => toast.info('Top Left', { position: 'top-left' })}>
        Top Left
      </Button>
      <Button size="small" variant="outline"
        onClick={() => toast.info('Top Center', { position: 'top-center' })}>
        Top Center
      </Button>
      <Button size="small" variant="outline"
        onClick={() => toast.info('Top Right', { position: 'top-right' })}>
        Top Right
      </Button>
      <Button size="small" variant="outline"
        onClick={() => toast.info('Bottom Left', { position: 'bottom-left' })}>
        Bottom Left
      </Button>
      <Button size="small" variant="outline"
        onClick={() => toast.info('Bottom Center', { position: 'bottom-center' })}>
        Bottom Center
      </Button>
      <Button size="small" variant="outline"
        onClick={() => toast.info('Bottom Right', { position: 'bottom-right' })}>
        Bottom Right
      </Button>
    </div>
  );
}`,
      tags: ['position', 'placement', 'top', 'bottom', 'left', 'right', 'center'],
    },
    {
      title: 'Custom Toast with Compound Components',
      description: 'Build fully custom toast content using toast.custom() with Toast.Title, Toast.Description, and Toast.Close sub-components.',
      code: `import { useState } from 'react';
import { useToast, Toast, ToastProvider, Button } from 'vayu-ui';

function CustomToastDemo() {
  const toast = useToast();

  const showCustomToast = () => {
    const id = toast.custom(
      <div className="w-full max-w-sm border border-border bg-surface p-4 shadow-elevated rounded-surface">
        <div className="flex items-start gap-4">
          <div className="bg-brand/10 p-2 rounded-control text-brand">
            👋
          </div>
          <div className="flex-1">
            <Toast.Title>Hello World</Toast.Title>
            <Toast.Description>
              This is a fully custom toast using compound components.
            </Toast.Description>
            <button
              onClick={() => toast.removeToast(id)}
              className="mt-2 text-sm font-medium text-brand hover:underline underline-offset-2"
            >
              Undo
            </button>
          </div>
        </div>
      </div>,
      { duration: 10000 },
    );
  };

  return (
    <Button variant="outline" onClick={showCustomToast}>
      Show Custom Toast
    </Button>
  );
}`,
      tags: ['custom', 'compound', 'title', 'description', 'close'],
    },
    {
      title: 'Non-Dismissible and Custom Icon',
      description: 'Create toasts that cannot be manually dismissed (only expire via duration) and override the default icon with custom SVG.',
      code: `import { useToast, Button } from 'vayu-ui';

function SpecialToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Important notice', {
            description: 'This toast cannot be dismissed by clicking X',
            dismissible: false,
            duration: 5000,
          })
        }
      >
        Non-Dismissible
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info('Custom Icon', {
            description: 'This toast has a custom icon',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            ),
          })
        }
      >
        Custom Icon
      </Button>
    </div>
  );
}`,
      tags: ['non-dismissible', 'custom-icon', 'svg', 'persistent'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using useToast outside ToastProvider',
      bad: "function App() { const toast = useToast(); return <div>...</div>; }",
      good: "function App() { return <ToastProvider><AppContent /></ToastProvider>; } function AppContent() { const toast = useToast(); return <div>...</div>; }",
      reason: 'useToast reads from ToastContext which is undefined outside ToastProvider. It throws an error: "useToast must be used within ToastProvider". Always call useToast in a component rendered as a child of ToastProvider.',
    },
    {
      title: 'Setting duration on loading toasts',
      bad: "toast.loading('Saving...', { duration: 3000 });",
      good: "toast.loading('Saving...'); // duration is automatically set to 0\n// Then update when done:\nsetTimeout(() => toast.updateToast(id, { type: 'success' }), 3000);",
      reason: 'The loading method always overrides duration to 0 and dismissible to false because loading toasts should persist until the operation completes. Use updateToast to transition to success/error when the async operation finishes.',
    },
    {
      title: 'Using toast.custom without compound sub-components',
      bad: "toast.custom(<div>Something happened</div>, { type: 'error' });",
      good: "toast.custom(\n  <div className=\"rounded-surface bg-surface p-4 shadow-elevated border border-border\">\n    <Toast.Title>Error</Toast.Title>\n    <Toast.Description>Something went wrong.</Toast.Description>\n  </div>,\n);",
      reason: 'While plain HTML works, using Toast.Title and Toast.Description ensures consistent typography, color tokens, and spacing. Custom content bypasses all default toast styling (border, icon, progress bar), so you must provide your own accessible structure.',
    },
    {
      title: 'Ignoring promise rejections from toast.promise',
      bad: "toast.promise(someAsyncFn(), { loading: 'Loading...', success: 'Done!', error: 'Failed!' });",
      good: "toast.promise(someAsyncFn(), { loading: 'Loading...', success: 'Done!', error: 'Failed!' }).catch(() => {});",
      reason: 'toast.promise re-throws the original error after updating the toast to show the error state. Without a .catch() handler, this results in an unhandled promise rejection warning in the console. Always handle the rejection, even if the toast already displays the error.',
    },
    {
      title: 'Rendering toasts inline instead of via ToastProvider',
      bad: '<div><ToastItem toast={myToast} onRemove={() => {}} /></div>',
      good: '<ToastProvider defaultPosition="bottom-right"><App /></ToastProvider>',
      reason: 'ToastItem, ToastStack, and ToastContainer are internal components managed by ToastProvider. They depend on shared state (heights, pause state, ghost toasts) that is only available within the stack context. Always trigger toasts via the useToast hook methods.',
    },
  ],
};
