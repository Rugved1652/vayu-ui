import { ComponentRegistryEntry } from '../types.js';

export const paginationEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'pagination',
  name: 'Pagination',
  type: 'component',
  category: 'navigation',

  // ── Description ───────────────────────────────────────
  description:
    'Navigation component for browsing through paged content with full page buttons, compact prev/next, and item info display.',
  longDescription:
    'The Pagination component uses the compound component pattern (Pagination.Root, Pagination.Info, Pagination.Buttons, Pagination.Compact) to provide flexible page navigation. Root renders a semantic <nav> landmark, Info displays "Showing X to Y of Z results" with live region updates, Buttons provides full first/prev/page-numbers/next/last navigation with configurable page ranges (compact, extended, full), and Compact offers a mobile-friendly prev/next-only variant. All navigation uses Next.js Link for server-rendered routing.',
  tags: [
    'pagination',
    'navigation',
    'pager',
    'pages',
    'nav',
    'page-numbers',
    'next-previous',
    'browsing',
    'data-table',
    'list',
  ],
  useCases: [
    'Navigating through paginated table data or search results',
    'Providing page controls below content lists with item count info',
    'Mobile-friendly pagination with a compact prev/next-only layout',
    'Displaying "Showing X to Y of Z" item ranges for data views',
    'Full page navigation with first, last, and numbered page buttons',
    'Configuring page range display density (compact, extended, or full) based on available space',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Pagination',
  files: [
    { name: 'Pagination.tsx', description: 'Compound export composing Root, Info, Buttons, and Compact sub-components' },
    { name: 'PaginationRoot.tsx', description: 'Nav landmark wrapper with aria-label="Pagination" and flex column layout' },
    { name: 'PaginationInfo.tsx', description: '"Showing X to Y of Z results" display with role="status" and aria-live="polite"' },
    { name: 'PaginationButtons.tsx', description: 'Full page navigation rendering first/prev/page-numbers/next/last buttons with Next.js Link' },
    { name: 'CompactPagination.tsx', description: 'Mobile-friendly prev/next-only variant with inline page indicator and nav landmark' },
    { name: 'utils.ts', description: 'Page range calculation logic with compact/extended/full modes and ellipsis placement' },
    { name: 'types.ts', description: 'TypeScript interfaces for all pagination props and PageRange type' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Pagination',
  subComponents: [
    {
      name: 'Root',
      fileName: 'PaginationRoot.tsx',
      description: 'Semantic <nav> landmark wrapper that provides aria-label and vertical flex layout for Info and Buttons',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'PaginationInfo and/or PaginationButtons components to display inside the nav',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the root <nav> element',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Pagination'",
          description: 'Accessible label for the navigation landmark; defaults to "Pagination"',
        },
      ],
    },
    {
      name: 'Info',
      fileName: 'PaginationInfo.tsx',
      description: 'Displays "Showing X to Y of Z results" with live region announcements for screen readers',
      props: [
        {
          name: 'totalItems',
          type: 'number',
          required: true,
          description: 'Total number of items across all pages',
        },
        {
          name: 'pageSize',
          type: 'number',
          required: true,
          description: 'Number of items displayed per page',
        },
        {
          name: 'currentPage',
          type: 'number',
          required: true,
          description: 'The currently active page number (1-based)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <p> element',
        },
      ],
    },
    {
      name: 'Buttons',
      fileName: 'PaginationButtons.tsx',
      description: 'Full page navigation with first/prev/page-numbers/next/last buttons, configurable page range modes, and Next.js Link routing',
      props: [
        {
          name: 'currentPage',
          type: 'number',
          required: true,
          description: 'The currently active page number (1-based)',
        },
        {
          name: 'totalPages',
          type: 'number',
          required: true,
          description: 'Total number of pages',
        },
        {
          name: 'hrefBuilder',
          type: '(page: number) => string',
          required: true,
          description: 'Function that returns the URL for a given page number, used by Next.js Link href',
        },
        {
          name: 'pageRange',
          type: "PageRange",
          required: false,
          defaultValue: "'compact'",
          description: 'Controls how many page numbers are shown: compact (ellipsis for distant pages), extended (more visible pages), or full (all pages)',
          options: ['compact', 'extended', 'full'],
        },
        {
          name: 'siblingCount',
          type: 'number',
          required: false,
          defaultValue: '1',
          description: 'Number of sibling pages to show on each side of the current page in compact/extended modes',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the buttons container <div>',
        },
      ],
    },
    {
      name: 'Compact',
      fileName: 'CompactPagination.tsx',
      description: 'Mobile-friendly prev/next-only pagination with inline "Page X of Y" indicator, rendering its own <nav> landmark',
      props: [
        {
          name: 'currentPage',
          type: 'number',
          required: true,
          description: 'The currently active page number (1-based)',
        },
        {
          name: 'totalPages',
          type: 'number',
          required: true,
          description: 'Total number of pages',
        },
        {
          name: 'hrefBuilder',
          type: '(page: number) => string',
          required: true,
          description: 'Function that returns the URL for a given page number, used by Next.js Link href',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the root <nav> element',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Pagination'",
          description: 'Accessible label for the navigation landmark; defaults to "Pagination"',
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
      description: 'PaginationInfo and/or PaginationButtons components to render inside the navigation landmark',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root <nav> element',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      defaultValue: "'Pagination'",
      description: 'Accessible label for the navigation landmark',
    },
  ],
  rendersAs: 'nav',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'pageRange',
    options: ['compact', 'extended', 'full'],
    default: 'compact',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'active',
      prop: 'currentPage',
      isBoolean: false,
      defaultValue: 'undefined (required)',
      description: 'The currently active page receives aria-current="page", brand-colored background, and distinct visual styling to indicate the selected page.',
    },
    {
      name: 'disabled',
      prop: 'currentPage (boundary detection)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'First/Previous buttons are disabled when currentPage === 1; Next/Last buttons are disabled when currentPage === totalPages. Disabled buttons use aria-disabled="true", reduced opacity, and pointer-events-none.',
    },
    {
      name: 'page-range',
      prop: 'pageRange',
      isBoolean: false,
      values: ['compact', 'extended', 'full'],
      defaultValue: "'compact'",
      description: 'Controls the density of displayed page numbers. "compact" uses ellipsis with 1 sibling, "extended" shows more pages with configurable siblingCount, and "full" shows every page number.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the <nav> element with value "Pagination" (customizable) to identify the navigation landmark for screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-current',
        description: 'Applied to the active page button with value "page" to indicate the currently selected page to assistive technologies.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Applied to disabled navigation buttons (first/prev at page 1, next/last at last page) with value "true" to communicate non-interactive state.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to chevron icons and ellipsis indicators with value "true" since they are decorative and not meant for screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Applied to the PaginationInfo paragraph and Compact page indicator with value "polite" so screen readers announce page changes.',
        managedByComponent: true,
      },
      {
        name: 'role="status"',
        description: 'Applied to PaginationInfo and Compact page indicator elements to mark them as live regions for page change announcements.',
        managedByComponent: true,
      },
      {
        name: 'role="group"',
        description: 'Applied to the PaginationButtons container <div> to group the navigation buttons as a single control set.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus between page number links and first/prev/next/last navigation links in order.',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus backward through navigation links.',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused page link and navigates to the corresponding page URL.',
      },
    ],
    focusManagement:
      'All navigation links are focusable via Tab. Focus-visible styles show a ring (focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1) to indicate the currently focused link. Disabled buttons are rendered as non-interactive spans and are not focusable.',
    wcagLevel: 'AA',
    notes:
      'Follows WAI-ARIA Navigation Pattern. The root element renders a semantic <nav> landmark. Page changes are announced via aria-live="polite" on the info/status regions. Disabled boundary buttons use aria-disabled="true" rather than removing elements to maintain consistent layout. Active page uses aria-current="page" per WAI-ARIA pagination best practices.',
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
      slug: 'table',
      reason: 'Pagination is most commonly paired with data tables for browsing large datasets',
    },
    {
      slug: 'typography',
      reason: 'Used alongside pagination for page titles and section headings that contextualize the paginated content',
    },
    {
      slug: 'divider',
      reason: 'Commonly placed between different pagination variants in layouts showing multiple pagination styles',
    },
    {
      slug: 'breadcrumb',
      reason: 'Both are navigation landmarks — breadcrumbs show hierarchical position while pagination shows sequential position',
    },
    {
      slug: 'card',
      reason: 'Paginated content is often wrapped in cards with pagination controls placed in the card footer',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Pagination with Info',
      description: 'Standard pagination showing item count info ("Showing X to Y of Z") and full page navigation with compact page range.',
      code: `import { Pagination } from 'vayu-ui';

const buildPageUrl = (page: number) => \`?page=\${page}\`;

export default function DefaultPagination() {
  const currentPage = 1;
  const totalItems = 450;
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Pagination.Root aria-label="Default pagination">
      <Pagination.Info
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <div className="flex justify-center">
        <Pagination.Buttons
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={buildPageUrl}
        />
      </div>
    </Pagination.Root>
  );
}`,
      tags: ['basic', 'default', 'info', 'compact'],
    },
    {
      title: 'Extended Page Range',
      description: 'Pagination with more visible page numbers using pageRange="extended" and siblingCount={2} to show 2 sibling pages on each side of the current page.',
      code: `import { Pagination } from 'vayu-ui';

const buildPageUrl = (page: number) => \`?page=\${page}\`;

export default function ExtendedPagination() {
  const currentPage = 5;
  const totalPages = 45;

  return (
    <Pagination.Root>
      <div className="flex justify-center">
        <Pagination.Buttons
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={buildPageUrl}
          pageRange="extended"
          siblingCount={2}
        />
      </div>
    </Pagination.Root>
  );
}`,
      tags: ['extended', 'sibling-count', 'page-range'],
    },
    {
      title: 'Full Page Range',
      description: 'Pagination showing every page number without ellipsis using pageRange="full". Best for small page counts.',
      code: `import { Pagination } from 'vayu-ui';

const buildPageUrl = (page: number) => \`?page=\${page}\`;

export default function FullPagination() {
  const currentPage = 3;
  const totalPages = 8;

  return (
    <Pagination.Root>
      <div className="flex justify-center">
        <Pagination.Buttons
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={buildPageUrl}
          pageRange="full"
        />
      </div>
    </Pagination.Root>
  );
}`,
      tags: ['full', 'all-pages', 'no-ellipsis'],
    },
    {
      title: 'Compact Pagination',
      description: 'Mobile-friendly prev/next-only variant showing "Page X of Y" between navigation buttons. Renders its own nav landmark.',
      code: `import { Pagination } from 'vayu-ui';

const buildPageUrl = (page: number) => \`?page=\${page}\`;

export default function CompactPaginationExample() {
  const currentPage = 3;
  const totalPages = 45;

  return (
    <Pagination.Compact
      currentPage={currentPage}
      totalPages={totalPages}
      hrefBuilder={buildPageUrl}
    />
  );
}`,
      tags: ['compact', 'mobile', 'prev-next', 'minimal'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using Buttons without Root',
      bad: '<Pagination.Buttons currentPage={1} totalPages={10} hrefBuilder={url} />',
      good: '<Pagination.Root>\n  <Pagination.Buttons currentPage={1} totalPages={10} hrefBuilder={url} />\n</Pagination.Root>',
      reason: 'PaginationButtons does not render a <nav> landmark. Without PaginationRoot, the buttons lack the semantic navigation role and aria-label required by WCAG for page navigation.',
    },
    {
      title: 'Passing out-of-range page numbers',
      bad: '<Pagination.Buttons currentPage={0} totalPages={10} hrefBuilder={url} />',
      good: '<Pagination.Buttons currentPage={1} totalPages={10} hrefBuilder={url} />',
      reason: 'currentPage must be a 1-based integer between 1 and totalPages. Passing 0, negative numbers, or values exceeding totalPages produces incorrect info text and disables wrong navigation buttons.',
    },
    {
      title: 'Omitting hrefBuilder',
      bad: '<Pagination.Buttons currentPage={1} totalPages={10} />',
      good: '<Pagination.Buttons currentPage={1} totalPages={10} hrefBuilder={(page) => `/page/${page}`} />',
      reason: 'hrefBuilder is a required prop that generates URLs for each page link. Without it, the component cannot render navigation links and TypeScript will report a compile error.',
    },
    {
      title: 'Using Compact on desktop layouts',
      bad: '<Pagination.Compact currentPage={1} totalPages={100} hrefBuilder={url} />',
      good: '<Pagination.Root>\n  <Pagination.Info totalItems={1000} pageSize={10} currentPage={1} />\n  <Pagination.Buttons currentPage={1} totalPages={100} hrefBuilder={url} />\n</Pagination.Root>',
      reason: 'Compact hides page numbers and only shows prev/next. On desktop with sufficient space, full Pagination.Buttons gives users direct access to any page, improving usability for large datasets.',
    },
    {
      title: 'Not syncing currentPage with URL state',
      bad: 'const [page, setPage] = useState(1); // never reads from URL',
      good: 'useEffect(() => {\n  const p = searchParams.get("page");\n  if (p) setCurrentPage(parseInt(p, 10));\n}, [searchParams]);',
      reason: 'Since Pagination uses Next.js Link for server-rendered navigation, the currentPage prop must be kept in sync with the URL. Not reading page state from URL params causes the active page indicator to stay on page 1 after clicking a different page.',
    },
  ],
};
