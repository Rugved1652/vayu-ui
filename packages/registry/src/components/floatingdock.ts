import { ComponentRegistryEntry } from '../types.js';

export const floatingDockEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'floating-dock',
  name: 'FloatingDock',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'A fixed-position navigation dock with icon-based items, tooltips, a glassmorphism container, and a brand logo area using the compound component pattern.',
  longDescription:
    'The FloatingDock component renders a fixed navigation bar at the top of the viewport. It uses the compound component pattern (FloatingDock.Container, FloatingDock.Item, FloatingDock.Logo, FloatingDock.Divider) to compose dock layouts. Items support icons with Lucide-style components, optional navigation links or click handlers, and built-in tooltips. The container applies a glassmorphism backdrop-blur effect. The Logo sub-component provides a branded anchor or static element. FloatingDock.Divider is re-exported from the shared Divider component for visual grouping.',
  tags: [
    'dock',
    'navigation',
    'navbar',
    'toolbar',
    'fixed',
    'floating',
    'icon',
    'tooltip',
    'glassmorphism',
    'brand',
    'menu',
  ],
  useCases: [
    'Application-level navigation bar fixed to the top of the viewport with icon shortcuts',
    'Dashboard toolbar providing quick access to search, notifications, and settings',
    'Brand header combining a logo with icon-based action items',
    'Contextual action strip for tools and utilities in productivity apps',
    'Compact icon-only navigation for mobile or sidebar-free layouts',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'FloatingDock',
  files: [
    { name: 'FloatingDock.tsx', description: 'Root nav wrapper component, fixed-positioned at the top of the viewport' },
    { name: 'FloatingDockContainer.tsx', description: 'Glassmorphism flex container that injects linkComponent into children via cloneElement' },
    { name: 'FloatingDockItem.tsx', description: 'Interactive navigation item with icon, tooltip, hover scale animation, and link or button rendering' },
    { name: 'FloatingDockLogo.tsx', description: 'Brand logo element with optional href link and hover color transition' },
    { name: 'types.ts', description: 'TypeScript type definitions for DockBaseProps, DockItemProps, DockLogoProps, and InjectedDockProps' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component with Container, Item, Logo, and Divider sub-components' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'FloatingDock',
  subComponents: [
    {
      name: 'Container',
      fileName: 'FloatingDockContainer.tsx',
      description: 'Glassmorphism flex container that wraps dock items and injects a shared linkComponent prop into children via React.cloneElement',
      props: [
        {
          name: 'linkComponent',
          type: 'React.ElementType',
          required: false,
          description: 'Custom link component to inject into child DockItem and DockLogo elements (defaults to Next.js Link)',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Dock items, logos, and dividers to render inside the container',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the container div',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'FloatingDockItem.tsx',
      description: 'Interactive navigation item with icon, tooltip, hover animation, and conditional link or button rendering based on href prop',
      props: [
        {
          name: 'icon',
          type: "React.ComponentType<{ className?: string; strokeWidth?: number }>",
          required: false,
          description: 'Icon component to render (e.g. a Lucide icon). Receives className and strokeWidth props.',
        },
        {
          name: 'label',
          type: 'string',
          required: true,
          description: 'Accessible label and tooltip text for the dock item',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'When provided, renders as a link; when omitted, renders as a button',
        },
        {
          name: 'onClick',
          type: '() => void',
          required: false,
          description: 'Click handler for the dock item',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the item element',
        },
      ],
    },
    {
      name: 'Logo',
      fileName: 'FloatingDockLogo.tsx',
      description: 'Brand logo element that renders as a link when href is provided, or a static div otherwise, with hover color transition',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Logo content to display (e.g. brand name text or an image)',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'When provided, renders the logo as a link (typically to home page)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the logo element',
        },
      ],
    },
    {
      name: 'Divider',
      fileName: 'Divider.tsx',
      description: 'Visual separator between dock items, re-exported from the shared Divider component. Supports vertical orientation for use in horizontal dock layouts.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          required: false,
          defaultValue: "'horizontal'",
          description: 'Orientation of the divider line; use "vertical" inside the dock',
          options: ['horizontal', 'vertical'],
        },
        {
          name: 'spacing',
          type: "'none' | 'sm' | 'md' | 'lg'",
          required: false,
          defaultValue: "'md'",
          description: 'Spacing around the divider',
          options: ['none', 'sm', 'md', 'lg'],
        },
        {
          name: 'decorative',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, marks the divider as decorative (aria-hidden) rather than a semantic separator',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Dock content, typically a FloatingDock.Container wrapping items, logos, and dividers',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      defaultValue: "'Floating dock'",
      description: 'Accessible label for the navigation landmark, announced by screen readers',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root nav element',
    },
  ],
  rendersAs: 'nav',

  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — FloatingDock uses design tokens directly

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'hovered',
      prop: 'motion-safe:hover',
      isBoolean: true,
      description: 'Dock items scale up 110% and translate upward 2px on hover with a smooth transition and muted background appears',
    },
    {
      name: 'focused',
      prop: 'focus-visible',
      isBoolean: true,
      description: 'Focus-visible ring appears on keyboard focus with ring-focus color and 2px offset from surface background',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '() => void',
      description: 'Fired when a DockItem without an href is clicked',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'navigation',
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the root nav element to identify the navigation landmark. Defaults to "Floating dock" but should be overridden with a descriptive label.',
        managedByComponent: false,
      },
      {
        name: 'aria-label (Item)',
        description: 'Each DockItem receives an aria-label matching its label prop for screen reader identification.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Icon)',
        description: 'Icons inside DockItem are marked aria-hidden="true" since the label prop provides the accessible text.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Logo)',
        description: 'When Logo renders as a link, it receives aria-label="Home" for screen reader context.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the next dock item or logo link',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous dock item or logo link',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused dock item link or button',
      },
      {
        key: 'Space',
        behavior: 'Activates the focused dock item button (href-less items only)',
      },
    ],
    focusManagement:
      'Each DockItem is focusable via keyboard Tab navigation. Focus-visible ring (ring-focus with surface offset) appears on keyboard focus only, not on pointer hover.',
    wcagLevel: 'AA',
    notes:
      'The root element uses a <nav> landmark with aria-label. Dock items with href render as links (native focus and activation); those without href render as <button type="button">. Icons are decorative (aria-hidden) since the label prop provides accessible text. Tooltips provide visual labels on hover but are supplementary — all items have aria-label for screen readers.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [
    {
      slug: 'divider',
      reason: 'FloatingDock.Divider is re-exported from the shared Divider component for visual grouping between dock items',
    },
    {
      slug: 'tooltip',
      reason: 'FloatingDock.Item uses the Tooltip component internally to display item labels on hover',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'tooltip',
      reason: 'Used internally by DockItem to show labels on hover; can also wrap additional dock elements for custom tooltips',
    },
    {
      slug: 'avatar',
      reason: 'Commonly used alongside FloatingDock for a user profile avatar as the last dock item',
    },
    {
      slug: 'button',
      reason: 'Dock items without href render as buttons; Button may be used for additional dock-adjacent actions',
    },
    {
      slug: 'badge',
      reason: 'Notification badges are frequently paired with dock items (e.g. notification bell with count)',
    },
    {
      slug: 'divider',
      reason: 'FloatingDock.Divider separates logical groups of items (e.g. navigation vs. actions)',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'FloatingDock with Navigation Items',
      description: 'A complete dock with logo, dividers, and icon-based navigation items with click handlers.',
      code: `import { FloatingDock } from 'vayu-ui';
import { Home, Search, Bell, Settings, User, Mail, Heart } from 'lucide-react';

export default function DockDemo() {
  const handleClick = (label: string) => {
    console.log('Clicked:', label);
  };

  return (
    <FloatingDock aria-label="Main navigation">
      <FloatingDock.Container>
        <FloatingDock.Logo href="/">Vayu UI</FloatingDock.Logo>
        <FloatingDock.Divider orientation="vertical" spacing="none" decorative />
        <FloatingDock.Item icon={Search} label="Search" onClick={() => handleClick('Search')} />
        <FloatingDock.Item icon={Mail} label="Messages" onClick={() => handleClick('Messages')} />
        <FloatingDock.Item icon={Bell} label="Notifications" onClick={() => handleClick('Notifications')} />
        <FloatingDock.Item icon={Heart} label="Favorites" onClick={() => handleClick('Favorites')} />
        <FloatingDock.Divider orientation="vertical" spacing="none" decorative />
        <FloatingDock.Item icon={User} label="Profile" onClick={() => handleClick('Profile')} />
        <FloatingDock.Item icon={Settings} label="Settings" onClick={() => handleClick('Settings')} />
      </FloatingDock.Container>
    </FloatingDock>
  );
}`,
      tags: ['basic', 'navigation', 'icons', 'click-handlers', 'logo'],
    },
    {
      title: 'FloatingDock with Link Items',
      description: 'Dock items with href prop render as navigable links instead of buttons.',
      code: `import { FloatingDock } from 'vayu-ui';
import { Home, Search, Bell, Settings } from 'lucide-react';

export default function LinkDockDemo() {
  return (
    <FloatingDock aria-label="Site navigation">
      <FloatingDock.Container>
        <FloatingDock.Item icon={Home} label="Home" href="/" />
        <FloatingDock.Item icon={Search} label="Search" href="/search" />
        <FloatingDock.Item icon={Bell} label="Notifications" href="/notifications" />
        <FloatingDock.Item icon={Settings} label="Settings" href="/settings" />
      </FloatingDock.Container>
    </FloatingDock>
  );
}`,
      tags: ['links', 'navigation', 'routing'],
    },
    {
      title: 'FloatingDock with Custom Link Component',
      description: 'Pass a custom linkComponent to Container to use React Router, custom Link, or any routing library instead of Next.js Link.',
      code: `import { FloatingDock } from 'vayu-ui';
import { Link } from 'react-router-dom';
import { Home, Search, Settings } from 'lucide-react';

export default function CustomLinkDock() {
  return (
    <FloatingDock aria-label="App navigation">
      <FloatingDock.Container linkComponent={Link}>
        <FloatingDock.Item icon={Home} label="Home" href="/" />
        <FloatingDock.Item icon={Search} label="Search" href="/search" />
        <FloatingDock.Item icon={Settings} label="Settings" href="/settings" />
      </FloatingDock.Container>
    </FloatingDock>
  );
}`,
      tags: ['custom-link', 'react-router', 'routing'],
    },
    {
      title: 'FloatingDock Logo Only',
      description: 'A minimal dock with only a logo, demonstrating that the Logo renders as a static div when no href is provided.',
      code: `import { FloatingDock } from 'vayu-ui';

export default function LogoOnlyDock() {
  return (
    <FloatingDock aria-label="Brand bar">
      <FloatingDock.Container>
        <FloatingDock.Logo>MyApp</FloatingDock.Logo>
      </FloatingDock.Container>
    </FloatingDock>
  );
}`,
      tags: ['logo', 'minimal', 'brand'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting aria-label on the dock',
      bad: '<FloatingDock><FloatingDock.Container>...</FloatingDock.Container></FloatingDock>',
      good: '<FloatingDock aria-label="Main navigation"><FloatingDock.Container>...</FloatingDock.Container></FloatingDock>',
      reason: 'The root <nav> element requires an aria-label to distinguish it from other navigation landmarks on the page. While the component defaults to "Floating dock", you should provide a descriptive label specific to your use case.',
    },
    {
      title: 'Placing DockItem outside Container',
      bad: '<FloatingDock><FloatingDock.Item icon={Home} label="Home" /></FloatingDock>',
      good: '<FloatingDock><FloatingDock.Container><FloatingDock.Item icon={Home} label="Home" /></FloatingDock.Container></FloatingDock>',
      reason: 'DockItem expects to receive the injected linkComponent prop from Container via cloneElement. Items placed outside Container will not receive this prop and will fall back to Next.js Link, which may fail in non-Next.js projects.',
    },
    {
      title: 'Using label as visible text instead of accessible name',
      bad: '<FloatingDock.Item icon={Search}>Search</FloatingDock.Item>',
      good: '<FloatingDock.Item icon={Search} label="Search" />',
      reason: 'DockItem does not render children as visible text — the label prop is used for both the tooltip content and the aria-label. Passing children instead of the label prop will result in no accessible name and no tooltip.',
    },
    {
      title: 'Mixing next/link in non-Next.js projects without linkComponent',
      bad: '<FloatingDock.Container><FloatingDock.Item icon={Home} label="Home" href="/" /></FloatingDock.Container>',
      good: '<FloatingDock.Container linkComponent={CustomLink}><FloatingDock.Item icon={Home} label="Home" href="/" /></FloatingDock.Container>',
      reason: 'Without a custom linkComponent, DockItem and DockLogo default to Next.js Link. In non-Next.js projects (React Router, Remix, etc.), this will cause import errors. Always pass your router\'s Link component via Container\'s linkComponent prop.',
    },
    {
      title: 'Overriding the fixed positioning',
      bad: '<FloatingDock className="relative bottom-4">...</FloatingDock>',
      good: '<FloatingDock>...</FloatingDock>',
      reason: 'The FloatingDock is designed as a fixed-position element pinned to the top of the viewport. Overriding its positioning with relative, absolute, or bottom classes breaks the intended floating behavior and may cause layout issues.',
    },
  ],
};
