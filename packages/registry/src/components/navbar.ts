import { ComponentRegistryEntry } from '../types.js';

export const navbarEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'navbar',
  name: 'Navbar',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'A responsive navigation bar with compound sub-components for brand, desktop items, actions, and a mobile slide-out menu with focus trapping and body scroll locking.',
  longDescription:
    'The Navbar component uses the compound component pattern (Navbar.Container, Navbar.Brand, Navbar.Items, Navbar.Item, Navbar.Actions, Navbar.Toggle, Navbar.MobileMenu, Navbar.MobileItem, Navbar.Separator) to compose fully responsive navigation bars. Desktop mode displays items and actions inline; mobile mode provides a hamburger toggle that opens a slide-out dialog panel. The component manages accessibility automatically: aria-expanded/aria-controls link the toggle to the mobile menu, the menu has role="dialog" and aria-modal="true", a focus trap keeps Tab/Shift+Tab within the open panel, and the Escape key closes it with focus returned to the toggle. Body scroll is locked and background content is set to inert when the mobile menu is open. A scrollbar-width compensation prevents layout shift. Items support an active prop that applies aria-current="page" and brand styling. Both Navbar.Item and Navbar.MobileItem accept a linkComponent prop (defaults to Next.js Link) for custom routing integration.',
  tags: [
    'navbar',
    'navigation',
    'header',
    'nav',
    'menu',
    'responsive',
    'mobile',
    'hamburger',
    'sidebar',
    'link',
    'brand',
  ],
  useCases: [
    'Build a top-level site navigation bar with logo, page links, and CTA buttons',
    'Create a responsive navigation that collapses to a hamburger menu on mobile viewports',
    'Display the current page with active link styling and aria-current="page" for screen readers',
    'Organize action buttons (sign in, sign up) alongside navigation links in the desktop header',
    'Implement a mobile slide-out menu with focus trapping, backdrop dismiss, and Escape key support',
    'Use a custom router Link component by injecting linkComponent into Navbar.Item or Navbar.MobileItem',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'NavBar',
  files: [
    { name: 'NavBar.tsx', description: 'Root component with context provider, mobile open state, escape key handler, body scroll lock, and background inert management' },
    { name: 'NavbarContainer.tsx', description: 'Responsive max-width wrapper that centers and pads the navigation content' },
    { name: 'NavBarBrand.tsx', description: 'Brand/logo area rendered as a flex container with gap' },
    { name: 'NavbarMenuItems.tsx', description: 'Desktop navigation list (NavbarItems) and individual navigation link items (NavbarItem) with active state styling' },
    { name: 'NavBarActions.tsx', description: 'Desktop action buttons area hidden on mobile, rendered as a flex row' },
    { name: 'NavBarToggle.tsx', description: 'Mobile hamburger/X toggle button with animated icon transitions and ARIA expanded state' },
    { name: 'NavBarMobileMenu.tsx', description: 'Mobile slide-out panel with backdrop, close button, focus trap, and mobile navigation items (NavbarMobileMenu + NavbarMobileItem)' },
    { name: 'NavBarSeparator.tsx', description: 'Horizontal divider for separating sections within the mobile menu' },
    { name: 'types.ts', description: 'TypeScript interfaces for all Navbar sub-component props, context value, and injected link props' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting all types' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Navbar',
  subComponents: [
    {
      name: 'Container',
      fileName: 'NavbarContainer.tsx',
      description: 'Responsive max-width wrapper that centers content horizontally with configurable breakpoint',
      props: [
        {
          name: 'maxWidth',
          type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'",
          required: false,
          defaultValue: "'xl'",
          description: 'Maximum width breakpoint for the navigation content area',
          options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
        },
      ],
    },
    {
      name: 'Brand',
      fileName: 'NavBarBrand.tsx',
      description: 'Brand/logo area rendered as a shrink-0 flex container for logo and company name',
      props: [],
    },
    {
      name: 'Items',
      fileName: 'NavbarMenuItems.tsx',
      description: 'Desktop navigation list container; hidden on mobile, displayed as a horizontal flex row on md+ breakpoints',
      props: [],
    },
    {
      name: 'Item',
      fileName: 'NavbarMenuItems.tsx',
      description: 'Individual desktop navigation link with active state styling and aria-current support',
      props: [
        {
          name: 'active',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Marks the item as the current page; applies brand styling and aria-current="page"',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          defaultValue: "'#'",
          description: 'Navigation URL passed to the link component',
        },
        {
          name: 'linkComponent',
          type: 'ElementType',
          required: false,
          defaultValue: 'Link (from next/link)',
          description: 'Custom component used for rendering the link; defaults to Next.js Link',
        },
      ],
    },
    {
      name: 'Actions',
      fileName: 'NavBarActions.tsx',
      description: 'Desktop action buttons area; hidden on mobile, displayed as a flex row with gap on md+ breakpoints',
      props: [],
    },
    {
      name: 'Toggle',
      fileName: 'NavBarToggle.tsx',
      description: 'Mobile hamburger/X button with animated three-line icon that toggles the mobile menu',
      props: [],
    },
    {
      name: 'MobileMenu',
      fileName: 'NavBarMobileMenu.tsx',
      description: 'Mobile slide-out panel with backdrop overlay, close button, focus trap, and scrollable content area',
      props: [],
    },
    {
      name: 'MobileItem',
      fileName: 'NavBarMobileMenu.tsx',
      description: 'Mobile navigation link that closes the menu on click and supports active state styling',
      props: [
        {
          name: 'active',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Marks the item as the current page; applies brand styling and aria-current="page"',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          defaultValue: "'#'",
          description: 'Navigation URL passed to the link component',
        },
        {
          name: 'onClick',
          type: '() => void',
          required: false,
          description: 'Click handler called after the mobile menu closes',
        },
        {
          name: 'linkComponent',
          type: 'ElementType',
          required: false,
          defaultValue: 'Link (from next/link)',
          description: 'Custom component used for rendering the link; defaults to Next.js Link',
        },
      ],
    },
    {
      name: 'Separator',
      fileName: 'NavBarSeparator.tsx',
      description: 'Horizontal divider for visually separating sections within the mobile menu',
      props: [],
    },
  ],
  hooks: ['useNavbar'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'mainContentSelector',
      type: 'string',
      required: false,
      defaultValue: "'main'",
      description: 'CSS selector for the main content element that gets set to inert when the mobile menu is open, preventing background interaction',
    },
  ],
  rendersAs: 'nav',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'mobileOpen',
      prop: 'mobileOpen (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls the mobile menu open/close state. When true: menu slides in, backdrop appears, body scroll is locked, and main content is set to inert. Managed internally via NavbarToggle click.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onToggle (NavbarToggle)',
      signature: '() => void',
      description: 'Fired when the hamburger/X toggle button is clicked; flips the mobileOpen state between true and false',
    },
    {
      name: 'onClose (MobileMenu)',
      signature: '() => void',
      description: 'Fired when the mobile menu is closed via backdrop click, close button click, or Escape key. Returns focus to the toggle button.',
    },
    {
      name: 'onClick (MobileItem)',
      signature: '() => void',
      description: 'Fired when a mobile navigation item is clicked; closes the mobile menu first, then calls the provided onClick handler',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'navigation',
    attributes: [
      {
        name: 'aria-label="Main navigation"',
        description: 'Applied to the root <nav> element to identify the primary navigation landmark',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Applied to the toggle button; reflects the mobile menu open/close state for screen readers',
        managedByComponent: true,
      },
      {
        name: 'aria-controls',
        description: 'Applied to the toggle button; references the mobile menu panel ID to associate the control with its target',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Toggle)',
        description: 'Dynamic label on the toggle button: "Open navigation menu" when closed, "Close navigation menu" when open',
        managedByComponent: true,
      },
      {
        name: 'role="dialog"',
        description: 'Applied to the mobile menu panel to signal a dialog overlay to assistive technology',
        managedByComponent: true,
      },
      {
        name: 'aria-modal="true"',
        description: 'Applied to the mobile menu panel to indicate that background content is inert while the menu is open',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Navigation menu" (MobileMenu)',
        description: 'Labels the mobile menu dialog for screen reader identification',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Close navigation menu" (Close button)',
        description: 'Labels the close button inside the mobile menu panel',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden="true" (Backdrop)',
        description: 'Hides the backdrop overlay from the accessibility tree since it is purely decorative',
        managedByComponent: true,
      },
      {
        name: 'aria-current="page"',
        description: 'Applied to Navbar.Item and Navbar.MobileItem when the active prop is true, indicating the current page to screen readers',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Escape',
        behavior: 'Closes the mobile menu and returns focus to the toggle button',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the next focusable element within the mobile menu (trapped when menu is open)',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous focusable element within the mobile menu (trapped when menu is open)',
      },
    ],
    focusManagement:
      'When the mobile menu opens, focus is moved to the close button after a 50ms delay. Tab and Shift+Tab are trapped within the menu panel so focus cannot escape to background content. When the menu closes (via Escape, backdrop click, close button, or item click), focus is returned to the toggle button via document.getElementById(triggerId).focus().',
    wcagLevel: 'AA',
    notes:
      'The root renders as a <nav> landmark with aria-label. The mobile menu uses role="dialog" with aria-modal="true" and a manual focus trap. Background content is set to the inert attribute (not aria-hidden) to prevent all interaction. The toggle button uses id/aria-controls to link to the menu panel, and aria-expanded to communicate state. Body scroll is locked with overflow:hidden and scrollbar-width padding compensation to prevent layout shift.',
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
      reason: 'Buttons are commonly placed in Navbar.Actions for CTAs like "Sign in" and "Get started", and in the mobile menu for mobile CTAs',
    },
    {
      slug: 'typography',
      reason: 'Typography.H5 or similar headings are used inside Navbar.Brand to render the site name or logo text',
    },
    {
      slug: 'divider',
      reason: 'Dividers separate navigation items from action buttons in the mobile menu using Navbar.Separator',
    },
    {
      slug: 'avatar',
      reason: 'Avatars can appear in Navbar.Brand or Navbar.Actions for user profile indicators and account menus',
    },
    {
      slug: 'badge',
      reason: 'Badges can be used on Navbar.Item elements to indicate notification counts or new feature labels',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Navbar',
      description: 'A complete responsive navbar with brand, navigation items with active state, action buttons, and a mobile menu.',
      code: `import { Navbar, Button, Typography, Divider } from 'vayu-ui';

export default function NavbarDemo() {
  return (
    <Navbar>
      <Navbar.Container>
        <Navbar.Brand>
          <Typography.H5 variant="primary" font="primary" className="text-lg font-bold">
            Acme
          </Typography.H5>
        </Navbar.Brand>

        <Navbar.Items>
          <Navbar.Item active>Home</Navbar.Item>
          <Navbar.Item>Products</Navbar.Item>
          <Navbar.Item>About</Navbar.Item>
          <Navbar.Item>Contact</Navbar.Item>
        </Navbar.Items>

        <Navbar.Actions>
          <Button variant="ghost" size="small">
            <Button.Text>Sign in</Button.Text>
          </Button>
          <Button variant="primary" size="small">
            <Button.Text>Get started</Button.Text>
          </Button>
        </Navbar.Actions>

        <Navbar.Toggle />
      </Navbar.Container>

      <Navbar.MobileMenu>
        <Navbar.MobileItem active>Home</Navbar.MobileItem>
        <Navbar.MobileItem>Products</Navbar.MobileItem>
        <Navbar.MobileItem>About</Navbar.MobileItem>
        <Navbar.MobileItem>Contact</Navbar.MobileItem>
        <Divider spacing="sm" decorative />
        <div className="flex flex-col gap-2 px-4">
          <Button variant="ghost" size="small" fullWidth>
            <Button.Text>Sign in</Button.Text>
          </Button>
          <Button variant="primary" size="small" fullWidth>
            <Button.Text>Get started</Button.Text>
          </Button>
        </div>
      </Navbar.MobileMenu>
    </Navbar>
  );
}`,
      tags: ['default', 'responsive', 'mobile', 'brand', 'actions', 'active'],
    },
    {
      title: 'Narrow Container Navbar',
      description: 'A navbar using a narrower max-width container for compact page layouts.',
      code: `import { Navbar, Button, Typography } from 'vayu-ui';

export default function NarrowNavbar() {
  return (
    <Navbar>
      <Navbar.Container maxWidth="md">
        <Navbar.Brand>
          <Typography.H5 variant="primary" font="primary" className="text-lg font-bold">
            Docs
          </Typography.H5>
        </Navbar.Brand>

        <Navbar.Items>
          <Navbar.Item active>Getting Started</Navbar.Item>
          <Navbar.Item>API Reference</Navbar.Item>
          <Navbar.Item>Examples</Navbar.Item>
        </Navbar.Items>

        <Navbar.Toggle />
      </Navbar.Container>

      <Navbar.MobileMenu>
        <Navbar.MobileItem active>Getting Started</Navbar.MobileItem>
        <Navbar.MobileItem>API Reference</Navbar.MobileItem>
        <Navbar.MobileItem>Examples</Navbar.MobileItem>
      </Navbar.MobileMenu>
    </Navbar>
  );
}`,
      tags: ['narrow', 'container', 'max-width', 'docs'],
    },
    {
      title: 'Navbar with Separators',
      description: 'A navbar using Separator to divide mobile menu sections into groups.',
      code: `import { Navbar, Button, Typography } from 'vayu-ui';

export default function SeparatedNavbar() {
  return (
    <Navbar>
      <Navbar.Container>
        <Navbar.Brand>
          <Typography.H5 variant="primary" font="primary" className="text-lg font-bold">
            MyApp
          </Typography.H5>
        </Navbar.Brand>

        <Navbar.Items>
          <Navbar.Item active>Dashboard</Navbar.Item>
          <Navbar.Item>Settings</Navbar.Item>
        </Navbar.Items>

        <Navbar.Actions>
          <Button variant="ghost" size="small">
            <Button.Text>Log out</Button.Text>
          </Button>
        </Navbar.Actions>

        <Navbar.Toggle />
      </Navbar.Container>

      <Navbar.MobileMenu>
        <Navbar.MobileItem active>Dashboard</Navbar.MobileItem>
        <Navbar.MobileItem>Settings</Navbar.MobileItem>
        <Navbar.Separator />
        <Navbar.MobileItem>Help</Navbar.MobileItem>
        <Navbar.MobileItem>Log out</Navbar.MobileItem>
      </Navbar.MobileMenu>
    </Navbar>
  );
}`,
      tags: ['separator', 'sections', 'grouped', 'mobile'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using Navbar sub-components outside of <Navbar>',
      bad: '<Navbar.Items><Navbar.Item>Home</Navbar.Item></Navbar.Items>',
      good: '<Navbar><Navbar.Container><Navbar.Items><Navbar.Item>Home</Navbar.Item></Navbar.Items></Navbar.Container></Navbar>',
      reason: 'All Navbar sub-components except the root use the Navbar context via useNavbar(). Rendering them outside <Navbar> throws an error: "Navbar compound components must be used inside <Navbar>".',
    },
    {
      title: 'Forgetting Navbar.Toggle when using MobileMenu',
      bad: '<Navbar><Navbar.Container><Navbar.Brand>Logo</Navbar.Brand></Navbar.Container><Navbar.MobileMenu>...</Navbar.MobileMenu></Navbar>',
      good: '<Navbar><Navbar.Container><Navbar.Brand>Logo</Navbar.Brand><Navbar.Toggle /></Navbar.Container><Navbar.MobileMenu>...</Navbar.MobileMenu></Navbar>',
      reason: 'Without Navbar.Toggle, users have no way to open the mobile menu. The toggle button provides aria-expanded, aria-controls, and the click handler that sets mobileOpen to true.',
    },
    {
      title: 'Putting mobile-only content in Navbar.Items or Navbar.Actions',
      bad: '<Navbar.Items><Navbar.Item className="md:hidden">Menu</Navbar.Item></Navbar.Items>',
      good: 'Place mobile-only items inside Navbar.MobileMenu instead; Navbar.Items and Navbar.Actions are hidden on mobile via md: breakpoints',
      reason: 'Navbar.Items and Navbar.Actions use "hidden md:flex" — they are invisible below the md breakpoint. Adding mobile content there wastes renders. Use Navbar.MobileMenu for mobile-specific items.',
    },
    {
      title: 'Using Navbar.Item href with onClick simultaneously for navigation',
      bad: '<Navbar.Item href="/page" onClick={() => doSomething()}>Link</Navbar.Item>',
      good: '<Navbar.Item href="/page">Link</Navbar.Item>  // handle side effects in the page component or router middleware',
      reason: 'Navbar.Item renders as a Link component. Combining href with a custom onClick can cause race conditions between client-side navigation and your handler. If you need custom click behavior, use a plain element inside the list instead.',
    },
    {
      title: 'Nesting Navbar inside another landmark nav element',
      bad: '<nav><Navbar>...</Navbar></nav>',
      good: '<Navbar>...</Navbar>  // Navbar already renders as <nav aria-label="Main navigation">',
      reason: 'Navbar renders as a <nav> element with aria-label="Main navigation". Nesting it inside another <nav> creates a confusing landmark structure for screen readers.',
    },
  ],
};
