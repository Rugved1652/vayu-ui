import { ComponentRegistryEntry } from '../types.js';

export const sidebarEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'sidebar',
  name: 'Sidebar',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description: 'A responsive sidebar navigation component with collapsible desktop mode, mobile overlay with focus trap, grouped menu items, badges, sub-items, and tooltips.',
  longDescription: 'Sidebar is a compound component providing a full navigation shell. It supports desktop collapsible mode (collapsed icon-only view with tooltips), mobile overlay mode with a hamburger toggle, focus trap, and escape-to-close. Menu items support icons, badges, active states, and expandable sub-items. The component auto-detects mobile viewport width (< 768px) and switches behavior accordingly.',
  tags: ['sidebar', 'navigation', 'drawer', 'menu', 'nav', 'sidebar-nav', 'responsive', 'collapsible', 'mobile-menu', 'layout'],
  useCases: [
    'Main application sidebar navigation with grouped menu items and nested links',
    'Collapsible dashboard sidebar that shrinks to icon-only view on desktop',
    'Mobile-friendly navigation drawer that overlays content on small screens',
    'Admin panel navigation with sectioned menu groups, badges, and active indicators',
    'Multi-level navigation with expandable sub-menu items',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Sidebar',
  files: [
    { name: 'Sidebar.tsx', description: 'SidebarProvider context and Sidebar root component with mobile overlay and focus trap' },
    { name: 'SidebarHeader.tsx', description: 'Header section with collapse-aware padding' },
    { name: 'SidebarContent.tsx', description: 'Scrollable content area with thin scrollbar styling' },
    { name: 'SidebarFooter.tsx', description: 'Footer section with collapse-aware padding' },
    { name: 'SidebarMenu.tsx', description: 'Nav wrapper and SidebarMenuGroup with labeled sections' },
    { name: 'SidebarMenuItem.tsx', description: 'Menu item with icon, badge, active state, sub-items, and collapsed tooltip' },
    { name: 'SidebarToggle.tsx', description: 'Collapse/expand toggle button positioned on the sidebar edge' },
    { name: 'SidebarMobileMenuButton.tsx', description: 'Hamburger/close button for mobile overlay mode' },
    { name: 'hooks.ts', description: 'SidebarContext and useSidebar hook' },
    { name: 'types.ts', description: 'TypeScript type definitions for all sub-components' },
    { name: 'index.ts', description: 'Public API exports' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Sidebar',
  subComponents: [
    {
      name: 'SidebarProvider',
      fileName: 'Sidebar.tsx',
      description: 'Context provider that manages collapsed, mobile, and mobileOpen state with resize detection and escape key handling',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Sidebar and page content wrapped by the provider',
        },
      ],
    },
    {
      name: 'SidebarHeader',
      fileName: 'SidebarHeader.tsx',
      description: 'Header section of the sidebar with a bottom border and collapse-aware padding',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Header content such as logo, app name, and toggle button',
        },
      ],
    },
    {
      name: 'SidebarContent',
      fileName: 'SidebarContent.tsx',
      description: 'Scrollable middle section for menu items with thin scrollbar styling',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'SidebarMenu and SidebarMenuGroup elements',
        },
      ],
    },
    {
      name: 'SidebarFooter',
      fileName: 'SidebarFooter.tsx',
      description: 'Footer section with a top border and collapse-aware padding',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Footer content such as user avatar and actions',
        },
      ],
    },
    {
      name: 'SidebarMenu',
      fileName: 'SidebarMenu.tsx',
      description: 'Nav wrapper element that groups SidebarMenuGroup children',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'SidebarMenuGroup elements containing menu items',
        },
      ],
    },
    {
      name: 'SidebarMenuGroup',
      fileName: 'SidebarMenu.tsx',
      description: 'Labeled section of menu items; label is hidden when sidebar is collapsed',
      props: [
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Group heading displayed above the menu items; hidden when collapsed',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'SidebarMenuItem elements in this group',
        },
      ],
    },
    {
      name: 'SidebarMenuItem',
      fileName: 'SidebarMenuItem.tsx',
      description: 'Individual navigation item with icon, badge, active state, expandable sub-items, and tooltip when collapsed',
      props: [
        {
          name: 'icon',
          type: 'React.ReactNode',
          required: false,
          description: 'Icon element displayed to the left of the item label',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Menu item label text',
        },
        {
          name: 'active',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Whether this item represents the current page',
        },
        {
          name: 'badge',
          type: 'string | number',
          required: false,
          description: 'Notification badge displayed to the right of the label',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'Navigation link URL; defaults to "#" if not provided',
        },
        {
          name: 'subItems',
          type: 'SubItem[]',
          required: false,
          description: 'Array of expandable sub-navigation items with label, href, and active fields',
        },
      ],
    },
    {
      name: 'SidebarToggle',
      fileName: 'SidebarToggle.tsx',
      description: 'Desktop-only collapse/expand button positioned on the sidebar edge; hidden in mobile mode',
      props: [],
    },
    {
      name: 'MobileMenuButton',
      fileName: 'SidebarMobileMenuButton.tsx',
      description: 'Mobile-only hamburger/close button to toggle the sidebar overlay; hidden on desktop',
      props: [],
    },
  ],
  hooks: ['useSidebar'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'SidebarHeader, SidebarContent, and SidebarFooter sub-components',
    },
  ],
  rendersAs: 'aside',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — states are managed internally via context

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'collapsed',
      prop: 'collapsed (context)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Desktop sidebar shrinks to 80px icon-only width. Labels, badges, and group headings are hidden; items show tooltips on hover.',
    },
    {
      name: 'mobile',
      prop: 'mobile (context)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Auto-detected when viewport is below 768px. Sidebar becomes an absolute-positioned overlay that slides in from the left.',
    },
    {
      name: 'mobileOpen',
      prop: 'mobileOpen (context)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls whether the mobile sidebar overlay is visible. Toggled by MobileMenuButton, overlay click, or Escape key.',
    },
    {
      name: 'active',
      prop: 'active (SidebarMenuItem)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Highlights the menu item with brand background and sets aria-current="page" on the link.',
    },
    {
      name: 'expanded',
      prop: 'expanded (SidebarMenuItem internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls whether sub-items are visible under a menu item. Toggled by clicking the parent item button.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick (MobileMenuButton)',
      signature: '() => void',
      description: 'Toggles the mobile sidebar overlay open/closed via context setMobileOpen',
    },
    {
      name: 'onClick (SidebarToggle)',
      signature: '() => void',
      description: 'Toggles the desktop collapsed/expanded state via context setCollapsed',
    },
    {
      name: 'onClick (SidebarMenuItem with subItems)',
      signature: '() => void',
      description: 'Toggles the expanded state of sub-items within a menu item',
    },
    {
      name: 'onClick (Mobile Overlay)',
      signature: '() => void',
      description: 'Closes the mobile sidebar overlay when the backdrop is clicked',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'navigation',
    attributes: [
      {
        name: 'aria-label',
        description: 'Set to "Main navigation" on the sidebar aside element',
        managedByComponent: true,
      },
      {
        name: 'aria-label (MobileMenuButton)',
        description: 'Dynamic label: "Open navigation menu" or "Close navigation menu" based on state',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (MobileMenuButton)',
        description: 'Reflects the mobileOpen state to communicate drawer visibility',
        managedByComponent: true,
      },
      {
        name: 'aria-controls (MobileMenuButton)',
        description: 'Set to "sidebar-navigation" linking the button to the sidebar panel',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (SidebarToggle)',
        description: 'Reflects the collapsed state (expanded when not collapsed)',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded (SidebarMenuItem)',
        description: 'Reflects the sub-item expanded state on menu items with subItems',
        managedByComponent: true,
      },
      {
        name: 'aria-controls (SidebarMenuItem)',
        description: 'Links the parent button to the sub-item region via generated submenu ID',
        managedByComponent: true,
      },
      {
        name: 'aria-current',
        description: 'Set to "page" on active menu items and active sub-items to indicate current page',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on the mobile overlay backdrop (role="presentation")',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      { key: 'Escape', behavior: 'Closes the mobile sidebar overlay' },
      { key: 'Tab', behavior: 'Focus is trapped within the mobile sidebar when open; wraps from last to first focusable element' },
      { key: 'Shift+Tab', behavior: 'Focus wraps from first to last focusable element in mobile mode' },
    ],
    focusManagement: 'When the mobile sidebar opens, focus moves to the sidebar element (tabIndex=-1). A focus trap cycles Tab/Shift+Tab between the first and last focusable elements inside the sidebar.',
    wcagLevel: 'AA',
    notes: 'The sidebar uses semantic HTML (aside, nav) with ARIA landmarks. MobileMenuButton links to the sidebar via aria-controls. Sub-menu regions use role="region" with descriptive aria-label.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'lucide-react' },
  ],
  registryDependencies: [
    {
      slug: 'tooltip',
      reason: 'SidebarMenuItem wraps collapsed items in a Tooltip to show labels when the sidebar is in icon-only mode',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'avatar',
      reason: 'Commonly used in SidebarFooter to display the current user profile',
    },
    {
      slug: 'typography',
      reason: 'Used for sidebar header branding, menu labels, and user info text',
    },
    {
      slug: 'button',
      reason: 'Used in the footer for logout and action buttons alongside the sidebar',
    },
    {
      slug: 'tooltip',
      reason: 'Required dependency — collapsed menu items display tooltips on hover',
    },
    {
      slug: 'divider',
      reason: 'Useful for separating sidebar sections or between header/content/footer',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Dashboard Sidebar with Groups and Badges',
      description: 'A full dashboard sidebar with header branding, grouped navigation, badges, sub-items, and a user footer.',
      tags: ['dashboard', 'groups', 'badges', 'sub-items', 'full-layout'],
      code: `import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarProvider,
  SidebarToggle,
  MobileMenuButton,
  useSidebar,
  Avatar,
  Typography,
  Button,
} from 'vayu-ui';
import {
  Settings,
  User,
  ShoppingBag,
  BarChart,
  HelpCircle,
  LogOut,
  Bell,
  Home,
  MessageSquare,
} from 'lucide-react';

const SidebarHeaderContent = () => {
  const { collapsed, mobile } = useSidebar();

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shrink-0">
        <span className="text-brand-content font-bold">V</span>
      </div>
      {(!collapsed || mobile) && (
        <div className="flex flex-col">
          <Typography.Label className="font-bold text-sm text-sidebar-content">
            Vayu UI
          </Typography.Label>
          <Typography.Label variant="secondary" className="text-xs">
            Dashboard
          </Typography.Label>
        </div>
      )}
      <div className="ml-auto">
        <SidebarToggle />
      </div>
    </div>
  );
};

export default function SidebarDemo() {
  return (
    <div className="h-150 w-full border border-border rounded-xl overflow-hidden flex bg-canvas relative">
      <SidebarProvider>
        <MobileMenuButton />
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderContent />
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuGroup label="Overview">
                <SidebarMenuItem icon={<Home size={20} />} active>
                  Dashboard
                </SidebarMenuItem>
                <SidebarMenuItem icon={<BarChart size={20} />}>Analytics</SidebarMenuItem>
                <SidebarMenuItem icon={<ShoppingBag size={20} />} badge="3">
                  Orders
                </SidebarMenuItem>
              </SidebarMenuGroup>

              <SidebarMenuGroup label="Management">
                <SidebarMenuItem
                  icon={<User size={20} />}
                  subItems={[
                    { label: 'All Users', href: '#' },
                    { label: 'Roles', href: '#' },
                    { label: 'Permissions', href: '#' },
                  ]}
                >
                  Users
                </SidebarMenuItem>
                <SidebarMenuItem icon={<MessageSquare size={20} />}>Messages</SidebarMenuItem>
                <SidebarMenuItem icon={<Bell size={20} />} badge="9+">
                  Notifications
                </SidebarMenuItem>
              </SidebarMenuGroup>

              <SidebarMenuGroup label="System">
                <SidebarMenuItem icon={<Settings size={20} />}>Settings</SidebarMenuItem>
                <SidebarMenuItem icon={<HelpCircle size={20} />}>Help Center</SidebarMenuItem>
              </SidebarMenuGroup>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3 p-1">
              <Avatar size="small" username="John Doe">
                <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
                <Avatar.Fallback />
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <Typography.Label className="text-sm font-medium text-sidebar-content truncate">
                  John Doe
                </Typography.Label>
                <Typography.Label variant="secondary" className="text-xs truncate">
                  john@example.com
                </Typography.Label>
              </div>
              <Button variant="ghost" size="small" className="ml-auto" aria-label="Logout">
                <Button.Icon size="small">
                  <LogOut size={18} />
                </Button.Icon>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-y-auto bg-canvas p-6">
          <Typography.H2 className="text-2xl font-bold text-canvas-content">
            Dashboard
          </Typography.H2>
        </main>
      </SidebarProvider>
    </div>
  );
}`,
    },
    {
      title: 'Minimal Sidebar',
      description: 'A basic sidebar with just menu items and no groups or badges.',
      tags: ['minimal', 'basic', 'simple'],
      code: `import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from 'vayu-ui';
import { Home, BarChart, Settings } from 'lucide-react';

export default function MinimalSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2 text-sm font-bold text-sidebar-content">App</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem icon={<Home size={20} />} active>Home</SidebarMenuItem>
            <SidebarMenuItem icon={<BarChart size={20} />}>Analytics</SidebarMenuItem>
            <SidebarMenuItem icon={<Settings size={20} />}>Settings</SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}`,
    },
    {
      title: 'Sidebar with Expandable Sub-Items',
      description: 'Menu items with nested sub-navigation links that expand on click.',
      tags: ['sub-items', 'expandable', 'nested'],
      code: `import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarProvider,
} from 'vayu-ui';
import { User, Shield, Bell } from 'lucide-react';

export default function SidebarWithSubItems() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuGroup label="Settings">
              <SidebarMenuItem
                icon={<User size={20} />}
                subItems={[
                  { label: 'Profile', href: '/settings/profile' },
                  { label: 'Account', href: '/settings/account' },
                ]}
              >
                User Settings
              </SidebarMenuItem>
              <SidebarMenuItem
                icon={<Shield size={20} />}
                subItems={[
                  { label: 'Roles', href: '/settings/roles' },
                  { label: 'Permissions', href: '/settings/permissions' },
                  { label: 'Audit Log', href: '/settings/audit', active: true },
                ]}
              >
                Security
              </SidebarMenuItem>
              <SidebarMenuItem icon={<Bell size={20} />}>Notifications</SidebarMenuItem>
            </SidebarMenuGroup>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}`,
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Do not use Sidebar components outside SidebarProvider',
      bad: '<Sidebar><SidebarContent>...</SidebarContent></Sidebar>',
      good: 'Always wrap with <SidebarProvider> at the layout level, then render <Sidebar> inside it.',
      reason: 'All sidebar sub-components call useSidebar() which throws if no SidebarProvider context is found.',
    },
    {
      title: 'Do not forget the relative parent for MobileMenuButton',
      bad: '<SidebarProvider><MobileMenuButton />...</SidebarProvider>',
      good: 'Wrap SidebarProvider in a container with className="relative" so MobileMenuButton (absolute positioning) stays inside the layout.',
      reason: 'MobileMenuButton uses absolute positioning. Without a positioned parent, it will be positioned relative to the nearest positioned ancestor or the viewport.',
    },
    {
      title: 'Do not hardcode sidebar widths or breakpoint values',
      bad: '<aside className="w-64 md:w-72">',
      good: 'Use the Sidebar component which manages width internally (w-72 expanded, w-20 collapsed) and detects mobile at 768px.',
      reason: 'Hardcoding widths conflicts with the internal collapse/expand animation and mobile responsive behavior.',
    },
    {
      title: 'Do not put MobileMenuButton inside Sidebar',
      bad: '<Sidebar><MobileMenuButton />...</Sidebar>',
      good: 'Place MobileMenuButton as a sibling of Sidebar, both inside SidebarProvider.',
      reason: 'MobileMenuButton must remain visible when the sidebar is hidden (mobile closed state). Placing it inside the sidebar means it slides away with the sidebar.',
    },
    {
      title: 'Do not override the nav role on SidebarMenu',
      bad: '<SidebarMenu className="role="list"">',
      good: 'Leave SidebarMenu as-is; it renders a <nav> element which is the correct semantic role for navigation.',
      reason: 'SidebarMenu renders a <nav> element. Overriding its role breaks landmark navigation for screen readers.',
    },
  ],
};
