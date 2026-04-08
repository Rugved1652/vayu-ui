import { ComponentRegistryEntry } from '../types.js';

export const breadcrumbEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'breadcrumb',
  name: 'Breadcrumb',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'A navigation trail showing the user\'s location within a page hierarchy.',
  longDescription:
    'The Breadcrumb component uses the compound component pattern (Breadcrumb.List, Breadcrumb.Item, Breadcrumb.Link, Breadcrumb.Page, Breadcrumb.Separator, Breadcrumb.Ellipsis) to create an accessible navigation trail. It renders a semantic <nav> with an ordered list following WAI-ARIA breadcrumb patterns, supports custom separators, and provides an ellipsis indicator for collapsed paths.',
  tags: [
    'breadcrumb',
    'navigation',
    'trail',
    'hierarchy',
    'path',
    'nav',
    'wayfinding',
    'sitemap',
  ],
  useCases: [
    'Showing the user\'s current location within a deep page hierarchy',
    'Providing quick navigation back to parent pages in multi-level sites',
    'Improving SEO with semantic breadcrumb markup that search engines can parse',
    'Helping users understand site structure in documentation or e-commerce pages',
    'Replacing full navigation menus with a compact path indicator in content-heavy layouts',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Breadcrumb',
  files: [
    { name: 'Breadcrumb.tsx', description: 'Root navigation container rendering a <nav> with aria-label="breadcrumb"' },
    { name: 'BreadCrumbList.tsx', description: 'Ordered list wrapper with flex layout for breadcrumb items' },
    { name: 'BreadCrumbItem.tsx', description: 'List item container for individual breadcrumb entries' },
    { name: 'BreadCrumbLink.tsx', description: 'Clickable navigation link using Next.js Link with focus-visible styles' },
    { name: 'BreadCrumbPage.tsx', description: 'Current page indicator span with aria-current="page"' },
    { name: 'BreadCrumbSeparator.tsx', description: 'Visual separator between items, defaults to a chevron icon' },
    { name: 'BreadcrumbEllipsis.tsx', description: 'Overflow indicator for collapsed breadcrumb paths using a MoreHorizontal icon' },
    { name: 'types.ts', description: 'TypeScript type definitions for all breadcrumb props' },
    { name: 'index.ts', description: 'Barrel export file re-exporting all sub-components and types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Breadcrumb',
  subComponents: [
    {
      name: 'List',
      fileName: 'BreadCrumbList.tsx',
      description: 'Ordered list container that wraps all breadcrumb items, separators, and the page indicator',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'BreadcrumbItem, BreadcrumbSeparator, and BreadcrumbEllipsis components',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <ol> element',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'BreadCrumbItem.tsx',
      description: 'Inline-flex list item that wraps a BreadcrumbLink or BreadcrumbPage',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'BreadcrumbLink or BreadcrumbPage component for this level',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <li> element',
        },
      ],
    },
    {
      name: 'Link',
      fileName: 'BreadCrumbLink.tsx',
      description: 'Clickable navigation link using Next.js Link with WCAG-compliant focus ring and hover styles',
      props: [
        {
          name: 'href',
          type: 'string',
          required: true,
          description: 'URL or path for the breadcrumb link destination',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Text or content displayed for the link label',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the link element',
        },
      ],
    },
    {
      name: 'Page',
      fileName: 'BreadCrumbPage.tsx',
      description: 'Non-interactive span marking the current page with aria-current="page"',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Text label for the current page',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the page span element',
        },
      ],
    },
    {
      name: 'Separator',
      fileName: 'BreadCrumbSeparator.tsx',
      description: 'Visual divider between breadcrumb items; defaults to a ChevronRight icon but accepts custom content',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          defaultValue: '<ChevronRight />',
          description: 'Custom separator content; defaults to a right chevron icon when omitted',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the separator <li> element',
        },
      ],
    },
    {
      name: 'Ellipsis',
      fileName: 'BreadcrumbEllipsis.tsx',
      description: 'Overflow indicator for collapsed breadcrumb paths, rendered as a MoreHorizontal icon with screen reader text',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the ellipsis span element',
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
      description: 'BreadcrumbList component containing the full breadcrumb trail',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root <nav> element',
    },
  ],
  rendersAs: 'nav',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'current',
      prop: 'BreadcrumbPage (aria-current)',
      isBoolean: false,
      values: ['page'],
      defaultValue: 'page',
      description: 'The BreadcrumbPage sub-component always renders aria-current="page" to indicate the current location in the trail. All other items are links.',
    },
    {
      name: 'collapsed',
      prop: 'BreadcrumbEllipsis (presence)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When BreadcrumbEllipsis is present in the list, intermediate breadcrumb levels are collapsed with a "More" indicator. Screen readers announce "More" via sr-only text.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick (BreadcrumbLink)',
      signature: '(event: React.MouseEvent<HTMLAnchorElement>) => void',
      description: 'Fired when a breadcrumb link is clicked. Handled natively by Next.js Link for client-side navigation.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the root <nav> element with value "breadcrumb" to identify the navigation landmark.',
        managedByComponent: true,
      },
      {
        name: 'aria-current',
        description: 'Applied to BreadcrumbPage span with value "page" to indicate the current page in the breadcrumb trail.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to BreadcrumbSeparator and BreadcrumbEllipsis with value "true" since they are decorative elements not meant for screen readers.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus between BreadcrumbLink elements in order. BreadcrumbPage is not focusable since it represents the current page.',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus backward between BreadcrumbLink elements.',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused BreadcrumbLink and navigates to the linked page.',
      },
    ],
    focusManagement:
      'BreadcrumbLink elements are naturally focusable via Tab. Focus-visible styles show a ring (focus-visible:ring-2 focus-visible:ring-focus) to indicate the currently focused link. BreadcrumbPage is not focusable.',
    wcagLevel: 'AA',
    notes:
      'Follows the WAI-ARIA Breadcrumb Pattern. The root <nav> uses aria-label="breadcrumb" for landmark identification. Breadcrumb items use an ordered list (<ol>) for semantic structure. BreadcrumbSeparator and BreadcrumbEllipsis use role="presentation" and aria-hidden="true" to hide decorative content from assistive technologies. An sr-only "More" label is provided for the ellipsis to communicate its purpose to screen readers.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'tailwind-merge' },
    { name: 'lucide-react' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'typography',
      reason: 'Commonly used alongside breadcrumbs for page titles and section headings',
    },
    {
      slug: 'card',
      reason: 'Breadcrumbs are often placed inside Card headers for page-level navigation context',
    },
    {
      slug: 'sidebar',
      reason: 'Sidebar navigation pairs with breadcrumbs to show both global and hierarchical position',
    },
    {
      slug: 'tabs',
      reason: 'Tabs and breadcrumbs together provide multi-level navigation within a section',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Breadcrumb',
      description: 'Standard breadcrumb trail with Home > Components > Breadcrumb using the default chevron separator.',
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ['basic', 'default', 'chevron'],
    },
    {
      title: 'Custom Separator',
      description: 'Breadcrumb with a "/" separator passed as children to BreadcrumbSeparator instead of the default chevron icon.',
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function CustomSeparatorBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ['custom', 'separator', 'slash'],
    },
    {
      title: 'Collapsed Breadcrumb',
      description: 'Breadcrumb with an ellipsis indicator to collapse intermediate levels in deep navigation hierarchies.',
      code: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function CollapsedBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ['collapsed', 'ellipsis', 'overflow', 'deep'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Making BreadcrumbPage clickable',
      bad: '<BreadcrumbItem><BreadcrumbLink href="/current-page">Current Page</BreadcrumbLink></BreadcrumbItem>',
      good: '<BreadcrumbItem><BreadcrumbPage>Current Page</BreadcrumbPage></BreadcrumbItem>',
      reason: 'The current page in a breadcrumb trail must not be a link — it should use BreadcrumbPage which renders aria-current="page". Linking to the current page violates WAI-ARIA breadcrumb pattern and confuses screen reader users.',
    },
    {
      title: 'Using BreadcrumbLink or BreadcrumbPage outside BreadcrumbList',
      bad: '<Breadcrumb><BreadcrumbLink href="/">Home</BreadcrumbLink></Breadcrumb>',
      good: '<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
      reason: 'BreadcrumbLink and BreadcrumbPage must be wrapped in BreadcrumbItem and placed inside BreadcrumbList. The semantic structure requires <nav> > <ol> > <li> for proper accessibility.',
    },
    {
      title: 'Removing the separator between items',
      bad: '<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>',
      good: '<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>',
      reason: 'Omitting BreadcrumbSeparator between items removes the visual delimiter that helps sighted users distinguish breadcrumb levels. Always include a separator between each pair of items.',
    },
    {
      title: 'Overriding aria-label on the root nav',
      bad: '<Breadcrumb aria-label="site navigation">...</Breadcrumb>',
      good: '<Breadcrumb>...</Breadcrumb>',
      reason: 'The root Breadcrumb already sets aria-label="breadcrumb" which is the standard label for breadcrumb navigation landmarks. Overriding it reduces clarity for screen reader users.',
    },
    {
      title: 'Nesting breadcrumb components',
      bad: '<Breadcrumb><BreadcrumbList><BreadcrumbItem><Breadcrumb><BreadcrumbList>...</BreadcrumbList></Breadcrumb></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
      good: 'Use a single flat Breadcrumb with BreadcrumbEllipsis to collapse deep hierarchies.',
      reason: 'Nesting Breadcrumb components creates invalid HTML (nav inside li inside ol inside nav) and confuses assistive technologies. Use a flat structure with Ellipsis for deep paths.',
    },
  ],
};
