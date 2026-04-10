import { ComponentRegistryEntry } from '../types.js';

export const drawerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'drawer',
  name: 'Drawer',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A slide-in panel component that opens from any screen edge, supporting four positions, modal/non-modal modes, focus trapping, and the compound component pattern.',
  longDescription:
    'The Drawer component slides in from the left, right, top, or bottom of the viewport and overlays the main content. It uses the compound component pattern (Drawer.Trigger, Drawer.Overlay, Drawer.Content, Drawer.Header, Drawer.Title, Drawer.Description, Drawer.Footer, Drawer.Close, Drawer.Portal) to compose rich panel layouts. It supports controlled and uncontrolled open state, modal mode with a backdrop overlay and body scroll lock, focus trapping within the drawer content, and keyboard navigation (Escape to close, Tab cycling). The built-in close button uses the Lucide X icon. All sub-components forward refs and accept className overrides.',
  tags: [
    'drawer',
    'panel',
    'sidebar',
    'slide-in',
    'overlay',
    'modal',
    'dialog',
    'sheet',
    'navigation',
    'off-canvas',
  ],
  useCases: [
    'Side navigation panel that slides in from the left or right on mobile viewports',
    'Edit forms or detail panels that overlay the page without full navigation',
    'Notification or message trays that slide down from the top of the screen',
    'Share sheets or action sheets that slide up from the bottom on mobile',
    'Filter panels in data-heavy interfaces that let users refine results without leaving the page',
    'Multi-step workflows presented as a focused overlay without a full-page modal',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Drawer',
  files: [
    { name: 'Drawer.tsx', description: 'Root component providing DrawerContext, controlled/uncontrolled state, and body scroll lock in modal mode' },
    { name: 'DrawerTrigger.tsx', description: 'Button that opens the drawer; supports asChild for custom trigger elements with aria-expanded and aria-haspopup' },
    { name: 'DrawerOverlay.tsx', description: 'Semi-transparent backdrop behind the drawer content in modal mode; optionally dismissible on click' },
    { name: 'DrawerContent.tsx', description: 'Positioned panel container with focus trapping, keyboard navigation, slide animations, and a built-in close button' },
    { name: 'DrawerHeader.tsx', description: 'Flex column layout for the header area containing Title and Description' },
    { name: 'DrawerTitle.tsx', description: 'Heading element with auto-generated id linked to aria-labelledby on the content' },
    { name: 'DrawerDescription.tsx', description: 'Paragraph element with auto-generated id linked to aria-describedby on the content' },
    { name: 'DrawerFooter.tsx', description: 'Flex row layout at the bottom of the drawer for action buttons' },
    { name: 'DrawerClose.tsx', description: 'Button that closes the drawer; supports asChild for custom close elements' },
    { name: 'DrawerPortal.tsx', description: 'Pass-through placeholder for future portal rendering support' },
    { name: 'types.ts', description: 'TypeScript type definitions for DrawerRootProps, DrawerSide, DrawerContextType, and all sub-component props' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component via Object.assign and re-exporting all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Drawer',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'DrawerTrigger.tsx',
      description: 'Button that opens the drawer. When asChild is true, clones the child element instead of rendering a default button.',
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
      fileName: 'DrawerOverlay.tsx',
      description: 'Semi-transparent backdrop rendered behind the drawer content. Only visible when modal is true and the drawer is open.',
      props: [
        {
          name: 'dismissible',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'When true, clicking the overlay closes the drawer',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'DrawerContent.tsx',
      description: 'The main panel container. Handles positioning based on the side prop, slide animations, focus trapping, and keyboard navigation. Includes a built-in close button.',
      props: [
        {
          name: 'trapFocus',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'When true, Tab and Shift+Tab cycle focus within the drawer content and auto-focus the first focusable element on open',
        },
      ],
    },
    {
      name: 'Header',
      fileName: 'DrawerHeader.tsx',
      description: 'Flex column layout for the header area, typically containing Title and Description sub-components.',
      props: [],
    },
    {
      name: 'Title',
      fileName: 'DrawerTitle.tsx',
      description: 'Heading element whose auto-generated id is linked to the content panel via aria-labelledby for screen reader access.',
      props: [],
    },
    {
      name: 'Description',
      fileName: 'DrawerDescription.tsx',
      description: 'Paragraph element whose auto-generated id is linked to the content panel via aria-describedby for screen reader access.',
      props: [],
    },
    {
      name: 'Footer',
      fileName: 'DrawerFooter.tsx',
      description: 'Flex row layout pinned to the bottom of the drawer for action buttons (Save, Cancel, etc.).',
      props: [],
    },
    {
      name: 'Close',
      fileName: 'DrawerClose.tsx',
      description: 'Button that closes the drawer. When asChild is true, clones the child element instead of rendering a default button.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, merges the close handler onto the child element instead of rendering a wrapping button',
        },
      ],
      supportsAsChild: true,
    },
    {
      name: 'Portal',
      fileName: 'DrawerPortal.tsx',
      description: 'Pass-through wrapper for future portal rendering. Currently renders children directly.',
      props: [],
    },
  ],
  hooks: ['useDrawer'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Drawer sub-components (Trigger, Overlay, Content, etc.) composing the full drawer UI',
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
      description: 'Callback fired when the drawer open state changes, for controlled usage',
    },
    {
      name: 'side',
      type: "DrawerSide",
      required: false,
      defaultValue: "'right'",
      description: 'Edge of the viewport the drawer slides in from',
      options: ['left', 'right', 'top', 'bottom'],
    },
    {
      name: 'modal',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, renders a backdrop overlay and locks body scroll while the drawer is open',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial open state for uncontrolled mode',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — side positioning is the primary visual differentiator.

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the drawer is visible. In controlled mode, set via the open prop; in uncontrolled mode, toggled by Trigger and Close.',
    },
    {
      name: 'modal',
      prop: 'modal',
      isBoolean: true,
      defaultValue: 'true',
      description: 'When true, a semi-transparent overlay covers the page behind the drawer and body scroll is locked. When false, the drawer renders without a backdrop and does not trap focus.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the drawer open state changes (opened via Trigger, closed via Close/Escape/overlay click). Use this in controlled mode.',
    },
    {
      name: 'onClick (Trigger)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the Trigger is clicked, before the drawer opens. Call event.preventDefault() to prevent opening.',
    },
    {
      name: 'onClick (Overlay)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the Overlay is clicked. If dismissible is true (default), the drawer closes after the handler.',
    },
    {
      name: 'onClick (Close)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the Close button is clicked, before the drawer closes.',
    },
    {
      name: 'onKeyDown (Content)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Fired on key down within the drawer content. Escape closes the drawer; Tab/Shift+Tab cycle focus when trapFocus is true.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'dialog',
    attributes: [
      {
        name: 'aria-modal',
        description: 'Set to "true" on Drawer.Content, informing screen readers that content outside the dialog is inert',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby',
        description: 'Set on Drawer.Content with the auto-generated id from Drawer.Title, linking the dialog to its accessible name',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Set on Drawer.Content with the auto-generated id from Drawer.Description, linking the dialog to its description',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on Drawer.Trigger to indicate whether the drawer is currently open or closed',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup',
        description: 'Set to "dialog" on Drawer.Trigger to indicate that activating it opens a dialog',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on Drawer.Overlay to hide the backdrop from the accessibility tree',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Set to "Close drawer" on the built-in close button inside Drawer.Content',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the drawer when focus is inside the content panel',
      },
      {
        key: 'Tab',
        behavior: 'Cycles focus to the next focusable element inside the drawer; wraps from last to first when trapFocus is true',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Cycles focus to the previous focusable element inside the drawer; wraps from first to last when trapFocus is true',
      },
    ],
    focusManagement:
      'When the drawer opens and trapFocus is true, the first focusable element inside the content is auto-focused after a 50ms delay. Tab and Shift+Tab wrap focus within the drawer. Body scroll is locked in modal mode to prevent background interaction.',
    wcagLevel: 'AA',
    notes:
      'Title and Description ids are generated via React.useId() and automatically linked to the dialog via aria-labelledby and aria-describedby. When using the drawer, always include a Drawer.Title for a valid accessible name. The built-in close button includes both an aria-label and sr-only text for screen readers.',
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
      reason: 'Used as the trigger element via asChild on Drawer.Trigger and as footer actions (Save, Cancel) via Drawer.Close',
    },
    {
      slug: 'text-input',
      reason: 'Form drawers commonly contain TextInput fields for editing data (profile, settings, filters)',
    },
    {
      slug: 'typography',
      reason: 'Used for body text and labels inside drawer content for consistent styling',
    },
    {
      slug: 'divider',
      reason: 'Separates the header area from the body content in standard drawer layouts',
    },
    {
      slug: 'alert',
      reason: 'Alerts can appear inside a drawer for form validation feedback or confirmation messages',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Right Drawer (Default)',
      description: 'A form drawer sliding in from the right side with profile editing fields and Save/Cancel footer actions.',
      code: `import { Drawer, Button, TextInput, Divider } from 'vayu-ui';

export default function RightDrawerDemo() {
  return (
    <Drawer side="right">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Right</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Profile</Drawer.Title>
          <Drawer.Description>
            Make changes to your profile here. Click save when you're done.
          </Drawer.Description>
        </Drawer.Header>
        <Divider spacing="md" />
        <div className="py-4 space-y-4">
          <TextInput>
            <TextInput.Label>Name</TextInput.Label>
            <TextInput.Field>
              <TextInput.Input placeholder="John Doe" />
            </TextInput.Field>
          </TextInput>
          <TextInput>
            <TextInput.Label>Username</TextInput.Label>
            <TextInput.Field>
              <TextInput.Input placeholder="@johndoe" />
            </TextInput.Field>
          </TextInput>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Drawer.Close>
          <Button>Save changes</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}`,
      tags: ['right', 'form', 'edit', 'default'],
    },
    {
      title: 'Left Navigation Drawer',
      description: 'A navigation drawer sliding in from the left side with a menu of ghost-styled button links.',
      code: `import { Drawer, Button, Divider } from 'vayu-ui';

export default function LeftDrawerDemo() {
  return (
    <Drawer side="left">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Left</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Navigation</Drawer.Title>
          <Drawer.Description>Navigate through the application.</Drawer.Description>
        </Drawer.Header>
        <Divider spacing="md" />
        <div className="py-4">
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                Settings
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                Profile
              </Button>
            </li>
          </ul>
        </div>
      </Drawer.Content>
    </Drawer>
  );
}`,
      tags: ['left', 'navigation', 'menu', 'sidebar'],
    },
    {
      title: 'Top Notifications Drawer',
      description: 'A notifications tray sliding down from the top of the viewport with unread message cards and a "Mark all as read" action.',
      code: `import { Drawer, Button, Typography, Divider } from 'vayu-ui';

export default function TopDrawerDemo() {
  return (
    <Drawer side="top">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Top</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Notifications</Drawer.Title>
          <Drawer.Description>You have 3 unread messages.</Drawer.Description>
        </Drawer.Header>
        <Divider spacing="md" />
        <div className="py-4 space-y-2">
          <div className="rounded-surface bg-muted p-4">
            <Typography.P variant="primary" className="text-sm font-medium">
              New comment on your post
            </Typography.P>
            <Typography.P variant="secondary" className="text-xs">
              2 minutes ago
            </Typography.P>
          </div>
          <div className="rounded-surface bg-muted p-4">
            <Typography.P variant="primary" className="text-sm font-medium">
              System update completed
            </Typography.P>
            <Typography.P variant="secondary" className="text-xs">
              1 hour ago
            </Typography.P>
          </div>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button className="w-full">Mark all as read</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}`,
      tags: ['top', 'notifications', 'tray', 'messages'],
    },
    {
      title: 'Bottom Share Drawer',
      description: 'A share sheet sliding up from the bottom with a read-only URL input and a copy button.',
      code: `import { Drawer, Button, TextInput, Divider } from 'vayu-ui';

export default function BottomDrawerDemo() {
  return (
    <Drawer side="bottom">
      <Drawer.Trigger asChild>
        <Button variant="outline">Open Bottom</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Share this page</Drawer.Title>
          <Drawer.Description>Anyone with the link can view this content.</Drawer.Description>
        </Drawer.Header>
        <Divider spacing="md" />
        <div className="py-4 flex items-center space-x-2">
          <TextInput className="flex-1" value="https://example.com/share/x8j92" readOnly>
            <TextInput.Field>
              <TextInput.Input />
            </TextInput.Field>
          </TextInput>
          <Button variant="secondary">Copy</Button>
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}`,
      tags: ['bottom', 'share', 'action-sheet', 'url'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting Drawer.Title',
      bad: '<Drawer.Content><Drawer.Header><Drawer.Description>Settings</Drawer.Description></Drawer.Header></Drawer.Content>',
      good: '<Drawer.Content><Drawer.Header><Drawer.Title>Settings</Drawer.Title><Drawer.Description>Configure your preferences.</Drawer.Description></Drawer.Header></Drawer.Content>',
      reason: 'The dialog requires an accessible name via aria-labelledby, which is linked to Drawer.Title. Without it, screen readers cannot identify the drawer purpose.',
    },
    {
      title: 'Mixing controlled and uncontrolled props',
      bad: '<Drawer open={isVisible} defaultOpen={true}>',
      good: '<Drawer open={isVisible} onOpenChange={setIsVisible}>',
      reason: 'Passing both open and defaultOpen creates conflicting state management. Use open + onOpenChange for controlled mode, or defaultOpen for uncontrolled mode — never both.',
    },
    {
      title: 'Using Drawer.Overlay without modal mode',
      bad: '<Drawer modal={false}><Drawer.Overlay /><Drawer.Content>...</Drawer.Content></Drawer>',
      good: '<Drawer modal={false}><Drawer.Content>...</Drawer.Content></Drawer>',
      reason: 'The Overlay only renders when modal is true. Setting modal={false} with an Overlay will result in the Overlay never appearing, creating dead code and confusion.',
    },
    {
      title: 'Nesting drawers inside each other',
      bad: '<Drawer><Drawer.Content><Drawer><Drawer.Trigger>Open inner</Drawer.Trigger></Drawer></Drawer.Content></Drawer>',
      good: 'Close the first drawer before opening the second, or use a different overlay pattern like a modal for the second layer.',
      reason: 'Nesting drawers creates conflicting focus traps, z-index stacking issues, and broken body scroll lock management. Each drawer expects to be the top-level overlay.',
    },
  ],
};
