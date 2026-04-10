import { ComponentRegistryEntry } from '../types.js';

export const modalEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'modal',
  name: 'Modal',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible dialog component with focus trapping, keyboard navigation, body scroll locking, and the compound component pattern.',
  longDescription:
    'The Modal component renders a centered dialog overlay using React portals. It uses the compound component pattern (Modal.Trigger, Modal.Content, Modal.Header, Modal.Title, Modal.Description, Modal.Body, Modal.Footer, Modal.Close) to compose rich dialog layouts. It supports controlled and uncontrolled open state, five size presets (sm, md, lg, xl, full), configurable overlay click and Escape key dismissal, automatic focus trapping within the modal content, body scroll locking with scrollbar compensation, and automatic focus return to the trigger element on close. The built-in close button uses the Lucide X icon. All sub-components forward refs and accept className overrides.',
  tags: [
    'modal',
    'dialog',
    'overlay',
    'popup',
    'lightbox',
    'confirmation',
    'form-dialog',
    'portal',
    'focus-trap',
  ],
  useCases: [
    'Confirmation dialogs for destructive actions like deleting an account or removing data',
    'Form dialogs for creating or editing records without navigating away from the current page',
    'Informational popups that display detailed content, terms of service, or privacy policies',
    'Multi-step wizards presented as a focused overlay within a single page application',
    'Image or content lightboxes that display media at larger sizes over the page',
    'Cookie consent or announcement banners that require explicit user acknowledgment',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Modal',
  files: [
    { name: 'Modal.tsx', description: 'Root component providing ModalContext, controlled/uncontrolled state management, body scroll lock, and compound component assembly' },
    { name: 'ModalTrigger.tsx', description: 'Button that opens the modal; supports asChild for custom trigger elements with aria-expanded and aria-haspopup' },
    { name: 'ModalOverlay.tsx', description: 'Semi-transparent backdrop with backdrop blur; optionally dismissible on click based on closeOnOverlayClick prop' },
    { name: 'ModalContent.tsx', description: 'Portal-rendered dialog container with focus trapping, keyboard navigation, Escape handling, and auto-generated ARIA attributes' },
    { name: 'ModalHeader.tsx', description: 'Flex row layout for the header area, typically containing Title, Description, and Close sub-components' },
    { name: 'ModalTitle.tsx', description: 'Heading element with auto-generated id linked to aria-labelledby on the dialog' },
    { name: 'ModalDescription.tsx', description: 'Paragraph element with auto-generated id linked to aria-describedby on the dialog' },
    { name: 'ModalBody.tsx', description: 'Scrollable content area with flex-1 to fill available space between header and footer' },
    { name: 'ModalFooter.tsx', description: 'Flex row layout at the bottom of the modal for action buttons (Confirm, Cancel, etc.)' },
    { name: 'ModalClose.tsx', description: 'Button that closes the modal; renders a Lucide X icon by default, supports asChild for custom close elements' },
    { name: 'types.ts', description: 'TypeScript type definitions for ModalProps, ModalSize, ModalContextType, and all sub-component prop interfaces' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component via Object.assign and re-exporting all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Modal',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'ModalTrigger.tsx',
      description: 'Button that opens the modal. When asChild is true, clones the child element instead of rendering a default button.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, merges event handlers and ARIA attributes onto the child element instead of rendering a wrapping button',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render; either a custom element (with asChild) or the button label text',
        },
      ],
      supportsAsChild: true,
    },
    {
      name: 'Overlay',
      fileName: 'ModalOverlay.tsx',
      description: 'Semi-transparent backdrop with backdrop blur rendered behind the modal content. Clicking it closes the modal when closeOnOverlayClick is true.',
      props: [],
    },
    {
      name: 'Content',
      fileName: 'ModalContent.tsx',
      description: 'Portal-rendered dialog container. Handles focus trapping, keyboard navigation (Escape and Tab), and links Title/Description via ARIA attributes.',
      props: [],
    },
    {
      name: 'Header',
      fileName: 'ModalHeader.tsx',
      description: 'Flex row layout for the header area, typically containing Title, Description, and Close sub-components.',
      props: [],
    },
    {
      name: 'Title',
      fileName: 'ModalTitle.tsx',
      description: 'Heading element whose auto-generated id is linked to the dialog via aria-labelledby for screen reader access.',
      props: [],
    },
    {
      name: 'Description',
      fileName: 'ModalDescription.tsx',
      description: 'Paragraph element whose auto-generated id is linked to the dialog via aria-describedby for screen reader access.',
      props: [],
    },
    {
      name: 'Body',
      fileName: 'ModalBody.tsx',
      description: 'Scrollable content area with flex-1 to fill available space between the header and footer.',
      props: [],
    },
    {
      name: 'Footer',
      fileName: 'ModalFooter.tsx',
      description: 'Flex row layout pinned to the bottom of the modal for action buttons (Confirm, Cancel, etc.).',
      props: [],
    },
    {
      name: 'Close',
      fileName: 'ModalClose.tsx',
      description: 'Button that closes the modal. Renders a Lucide X icon by default. When asChild is true, clones the child element instead.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, merges the close handler onto the child element instead of rendering the default X icon button',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom content for the close button; when omitted, renders the default Lucide X icon',
        },
      ],
      supportsAsChild: true,
    },
  ],
  hooks: ['useModal'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Modal sub-components (Trigger, Content, Header, etc.) composing the full modal UI',
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state. Use with onOpenChange for fully controlled mode.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the modal open state changes, for controlled usage',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial open state for uncontrolled mode',
    },
    {
      name: 'size',
      type: "ModalSize",
      required: false,
      defaultValue: "'md'",
      description: 'Width preset for the modal dialog. Maps to maxWidth: sm=28rem, md=32rem, lg=40rem, xl=48rem, full=calc(100vw - 4rem)',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    {
      name: 'closeOnOverlayClick',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, clicking the overlay backdrop closes the modal',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, pressing the Escape key closes the modal',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant prop — size is the primary visual differentiator.
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg', 'xl', 'full'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the modal is visible. In controlled mode, set via the open prop; in uncontrolled mode, toggled by Trigger and Close.',
    },
    {
      name: 'size',
      prop: 'size',
      isBoolean: false,
      values: ['sm', 'md', 'lg', 'xl', 'full'],
      defaultValue: "'md'",
      description: 'Width preset controlling the maximum width of the modal dialog.',
    },
    {
      name: 'closeOnOverlayClick',
      prop: 'closeOnOverlayClick',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Whether clicking the overlay backdrop dismisses the modal. Disable for critical confirmation dialogs.',
    },
    {
      name: 'closeOnEscape',
      prop: 'closeOnEscape',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Whether pressing Escape dismisses the modal. Disable for mandatory user-action dialogs.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the modal open state changes (opened via Trigger, closed via Close/Escape/overlay click). Use this in controlled mode.',
    },
    {
      name: 'onClick (Trigger)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the Trigger is clicked, before the modal opens. Call event.preventDefault() to prevent opening.',
    },
    {
      name: 'onClick (Overlay)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the Overlay is clicked. If closeOnOverlayClick is true (default), the modal closes after the handler.',
    },
    {
      name: 'onClick (Close)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the Close button is clicked, before the modal closes. Call event.preventDefault() to prevent closing.',
    },
    {
      name: 'onKeyDown (Content)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Fired on key down within the modal content. Escape closes the modal; Tab/Shift+Tab cycle focus within the trap.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'dialog',
    attributes: [
      {
        name: 'aria-modal',
        description: 'Set to "true" on Modal.Content, informing screen readers that content outside the dialog is inert',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Set on Modal.Content with the auto-generated id from Modal.Title, linking the dialog to its accessible name',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Set on Modal.Content with the auto-generated id from Modal.Description, linking the dialog to its description',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on Modal.Trigger to indicate whether the modal is currently open or closed',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup',
        description: 'Set to "dialog" on Modal.Trigger to indicate that activating it opens a dialog',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on Modal.Overlay to hide the backdrop from the accessibility tree',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Set to "Close" on the default close button rendered by Modal.Close',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the modal when focus is inside the content panel (unless closeOnEscape is false)',
      },
      {
        key: 'Tab',
        behavior: 'Cycles focus to the next focusable element inside the modal; wraps from last to first element',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Cycles focus to the previous focusable element inside the modal; wraps from first to last element',
      },
    ],
    focusManagement:
      'When the modal opens, the first focusable element inside Modal.Content is auto-focused after a 50ms delay. Tab and Shift+Tab wrap focus within the modal content. When the modal closes, focus returns to the trigger element that opened it. Body scroll is locked while the modal is open, with scrollbar width compensation to prevent layout shift.',
    wcagLevel: 'AA',
    notes:
      'Title and Description ids are generated via React.useId() and automatically linked to the dialog via aria-labelledby and aria-describedby. Always include a Modal.Title for a valid accessible name. The default close button includes both an aria-label and sr-only text for screen readers.',
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
      reason: 'Used as the trigger element via asChild on Modal.Trigger and as footer actions (Confirm, Cancel) via Modal.Close',
    },
    {
      slug: 'text-input',
      reason: 'Form modals commonly contain TextInput fields for editing data (profile, settings, filters)',
    },
    {
      slug: 'typography',
      reason: 'Used for body text, headings, and labels inside modal content for consistent styling',
    },
    {
      slug: 'alert',
      reason: 'Alerts can appear inside a modal for form validation feedback or warning messages before destructive actions',
    },
    {
      slug: 'divider',
      reason: 'Separates the header area from the body content in standard modal layouts',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Uncontrolled Modal',
      description: 'State is managed internally. Use Modal.Trigger to open and Modal.Close or overlay/Escape to close.',
      code: `import { Modal, Button, Typography } from 'vayu-ui';

export default function UncontrolledModalDemo() {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <Button variant="primary">Open Modal</Button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <div className="flex-1">
            <Modal.Title>Welcome Message</Modal.Title>
            <Modal.Description>
              This modal manages its own open state internally.
            </Modal.Description>
          </div>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <Typography.P>
            This is a simple modal dialog. You can close it by clicking the X
            button, clicking outside the modal, or pressing the Escape key.
          </Typography.P>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="secondary">Close</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}`,
      tags: ['uncontrolled', 'basic', 'trigger', 'default'],
    },
    {
      title: 'Controlled Modal',
      description: 'Control the modal state externally with open and onOpenChange props for programmatic opening.',
      code: `import { useState } from 'react';
import { Modal, Button, Typography } from 'vayu-ui';

export default function ControlledModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Controlled Modal
      </Button>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content>
          <Modal.Header>
            <div className="flex-1">
              <Modal.Title>Controlled State</Modal.Title>
              <Modal.Description>
                This modal is controlled by external state.
              </Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Typography.P>
              The open state is managed by the parent component. This is useful
              when you need to open the modal programmatically or track the
              state.
            </Typography.P>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Modal.Close>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}`,
      tags: ['controlled', 'state', 'programmatic'],
    },
    {
      title: 'Form Modal',
      description: 'Modal containing a form with labeled inputs for editing user profile information.',
      code: `import { Modal, Button, Typography } from 'vayu-ui';

export default function FormModalDemo() {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <Button variant="primary">Edit Profile</Button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <div className="flex-1">
            <Modal.Title>Edit Profile</Modal.Title>
            <Modal.Description>
              Update your personal information below.
            </Modal.Description>
          </div>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <form className="space-y-4">
            <div>
              <Typography.Label htmlFor="name-input" className="block mb-1.5">
                Full Name
              </Typography.Label>
              <input
                type="text"
                id="name-input"
                placeholder="John Doe"
                className="w-full px-3 py-2 rounded-control border border-field bg-surface text-surface-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
            <div>
              <Typography.Label htmlFor="email-input" className="block mb-1.5">
                Email Address
              </Typography.Label>
              <input
                type="email"
                id="email-input"
                placeholder="john@example.com"
                className="w-full px-3 py-2 rounded-control border border-field bg-surface text-surface-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Modal.Close>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}`,
      tags: ['form', 'edit', 'input', 'profile'],
    },
    {
      title: 'Destructive Action Confirmation',
      description: 'Small modal for confirming destructive actions with closeOnOverlayClick disabled to force explicit user choice.',
      code: `import { useState } from 'react';
import { Modal, Button, Typography } from 'vayu-ui';

export default function DestructiveModalDemo() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
        Delete Account
      </Button>

      <Modal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        size="sm"
        closeOnOverlayClick={false}
      >
        <Modal.Content>
          <Modal.Header>
            <div className="flex-1">
              <Modal.Title>Delete Account?</Modal.Title>
              <Modal.Description>This action cannot be undone.</Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Typography.P>
              Are you sure you want to delete your account? All of your data will
              be permanently removed.
            </Typography.P>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Modal.Close>
            <Button
              variant="destructive"
              onClick={() => {
                alert('Account deleted!');
                setIsDeleteOpen(false);
              }}
            >
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}`,
      tags: ['destructive', 'confirmation', 'delete', 'size-sm'],
    },
    {
      title: 'Size Variants',
      description: 'Demonstrates all five size presets (sm, md, lg, xl, full) for different content needs.',
      code: `import { Modal, Button, Typography } from 'vayu-ui';

export default function SizeModalDemo() {
  const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Modal key={size} size={size}>
          <Modal.Trigger asChild>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Header>
              <div className="flex-1">
                <Modal.Title>{size.toUpperCase()} Modal</Modal.Title>
                <Modal.Description>
                  This modal uses the {size} size variant.
                </Modal.Description>
              </div>
              <Modal.Close />
            </Modal.Header>

            <Modal.Body>
              <Typography.P>
                This modal demonstrates the <strong>{size}</strong> size option.
                {size === 'full' && ' It takes up almost the entire viewport width.'}
              </Typography.P>
            </Modal.Body>

            <Modal.Footer>
              <Modal.Close asChild>
                <Button variant="secondary">Close</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      ))}
    </div>
  );
}`,
      tags: ['sizes', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    {
      title: 'Configuration Options',
      description: 'Demonstrates disabling overlay click close and Escape key close for important notices.',
      code: `import { Modal, Button, Typography } from 'vayu-ui';

export default function ConfigModalDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Modal closeOnOverlayClick={false}>
        <Modal.Trigger asChild>
          <Button variant="outline">No Overlay Close</Button>
        </Modal.Trigger>

        <Modal.Content>
          <Modal.Header>
            <div className="flex-1">
              <Modal.Title>Important Notice</Modal.Title>
              <Modal.Description>
                This modal cannot be closed by clicking outside.
              </Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Typography.P>
              You must explicitly close this modal using the X button or the
              close button below. Clicking the overlay won't work.
            </Typography.P>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="primary">Got it</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal closeOnEscape={false}>
        <Modal.Trigger asChild>
          <Button variant="outline">No Escape Close</Button>
        </Modal.Trigger>

        <Modal.Content>
          <Modal.Header>
            <div className="flex-1">
              <Modal.Title>No Escape Key</Modal.Title>
              <Modal.Description>
                Pressing Escape won't close this modal.
              </Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Typography.P>
              The Escape key is disabled for this modal. Use the close buttons
              instead.
            </Typography.P>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close>
              <Button variant="primary">Close</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}`,
      tags: ['configuration', 'overlay-click', 'escape', 'no-close'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting Modal.Title',
      bad: '<Modal.Content><Modal.Header><Modal.Description>Settings</Modal.Description></Modal.Header></Modal.Content>',
      good: '<Modal.Content><Modal.Header><Modal.Title>Settings</Modal.Title><Modal.Description>Configure your preferences.</Modal.Description></Modal.Header></Modal.Content>',
      reason: 'The dialog requires an accessible name via aria-labelledby, which is linked to Modal.Title. Without it, screen readers cannot identify the modal purpose.',
    },
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<Modal open={isVisible} defaultOpen={true}>',
      good: '<Modal open={isVisible} onOpenChange={setIsVisible}>',
      reason: 'Passing both open and defaultOpen creates conflicting state management. Use open + onOpenChange for controlled mode, or defaultOpen for uncontrolled mode — never both.',
    },
    {
      title: 'Using Modal.Close without asChild for custom content',
      bad: '<Modal.Close><Button variant="destructive">Delete</Button></Modal.Close>',
      good: '<Modal.Close asChild><Button variant="destructive">Delete</Button></Modal.Close>',
      reason: 'Without asChild, Modal.Close wraps children in a <button> element, resulting in a nested <button> inside <button> which is invalid HTML and causes accessibility issues.',
    },
    {
      title: 'Nesting modals inside each other',
      bad: '<Modal><Modal.Content><Modal><Modal.Trigger>Open inner</Modal.Trigger></Modal></Modal.Content></Modal>',
      good: 'Close the first modal before opening the second, or use a different overlay pattern like a drawer for the second layer.',
      reason: 'Nesting modals creates conflicting focus traps, z-index stacking issues, and broken body scroll lock management. Each modal expects to be the top-level overlay.',
    },
  ],
};
