import { ComponentRegistryEntry } from '../types.js';

export const skeletonEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'skeleton',
  name: 'Skeleton',
  type: 'component',
  category: 'feedback',

  // ── Description ───────────────────────────────────────
  description:
    'A loading placeholder system with compound sub-components for text, avatars, cards, lists, tables, and grids, supporting pulse, wave, and static animations.',
  longDescription:
    'The Skeleton component provides a comprehensive loading placeholder system using the compound component pattern. It includes 11 sub-components: Root (accessible wrapper with ARIA live region), Item (core primitive with variant/animation/count), Text (multi-line text placeholder), Circle (circular avatar/icon placeholder), Rectangle (configurable rectangular placeholder), Card (image + title + lines), Avatar (circle + text lines), List (repeated avatar + text rows), Table (header + grid of rows/columns), Grid (grid of rectangular items), and Group (spacing wrapper). All animations respect prefers-reduced-motion via motion-reduce:animate-none.',
  tags: [
    'skeleton',
    'loading',
    'placeholder',
    'shimmer',
    'pulse',
    'wave',
    'spinner',
    'avatar',
    'card',
    'table',
    'list',
    'grid',
    'feedback',
    'progress',
    'div',
  ],
  useCases: [
    'Showing content loading placeholders while async data is being fetched',
    'Displaying text content loading states with configurable line counts and widths',
    'Rendering avatar and profile information loading placeholders in various sizes',
    'Building card layout loading states with optional image areas',
    'Creating table and data grid loading placeholders with configurable dimensions',
    'Providing accessible loading feedback with ARIA live regions for screen readers',
    'Composing custom loading layouts using Item, Circle, Rectangle, and Group primitives',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Skeleton',
  files: [
    { name: 'index.ts', description: 'Barrel export with compound component Object.assign pattern' },
    { name: 'types.ts', description: 'TypeScript type definitions for all Skeleton props interfaces and unions' },
    { name: 'config.ts', description: 'Size/animation class mappings and helper functions for variant styling' },
    { name: 'SkeletonRoot.tsx', description: 'Root wrapper component with ARIA live region, aria-busy, and configurable aria-label' },
    { name: 'SkeletonItem.tsx', description: 'Core rendering primitive supporting variant, animation, count, and custom dimensions' },
    { name: 'SkeletonPrimitives.tsx', description: 'Text, Circle, and Rectangle wrapper components built on SkeletonItem' },
    { name: 'SkeletonComposites.tsx', description: 'Pre-built composite components: Card, Avatar, List, Table, Grid, and Group' },
    { name: 'README.md', description: 'Component documentation and usage guidelines' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Skeleton',
  subComponents: [
    {
      name: 'Root',
      fileName: 'SkeletonRoot.tsx',
      description: 'Accessible wrapper with ARIA live region, aria-busy="true", and configurable aria-label. Use to wrap skeleton content for screen reader announcements.',
      props: [
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style applied to all child skeleton elements.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Default size propagated to child skeleton elements.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Loading'",
          description: 'Accessible label announced by screen readers to describe the loading state.',
        },
        {
          name: 'aria-live',
          type: "'polite' | 'assertive' | 'off'",
          required: false,
          defaultValue: "'polite'",
          description: 'ARIA live region politeness setting. Use "polite" for non-urgent updates, "assertive" for critical content.',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'SkeletonItem.tsx',
      description: 'Core rendering primitive with variant, animation, count, and custom dimensions. Use for custom placeholder shapes.',
      props: [
        {
          name: 'variant',
          type: "SkeletonVariant",
          required: false,
          defaultValue: "'text'",
          description: 'Shape variant controlling the rendered placeholder style.',
          options: ['text', 'circular', 'rectangular', 'rounded'],
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for the placeholder element.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'width',
          type: 'string | number',
          required: false,
          description: 'Explicit width override. Accepts CSS values (e.g. "100%", "200px") or numbers (treated as px).',
        },
        {
          name: 'height',
          type: 'string | number',
          required: false,
          description: 'Explicit height override. Accepts CSS values (e.g. "48px") or numbers (treated as px).',
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Predefined size controlling dimensions when width/height are not set.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
        {
          name: 'count',
          type: 'number',
          required: false,
          defaultValue: '1',
          description: 'Number of identical skeleton items to render. Useful for repeating placeholder elements.',
        },
      ],
    },
    {
      name: 'Text',
      fileName: 'SkeletonPrimitives.tsx',
      description: 'Multi-line text placeholder with configurable line count, widths, and trailing line width.',
      props: [
        {
          name: 'lines',
          type: 'number',
          required: false,
          defaultValue: '1',
          description: 'Number of text lines to render. The last line can have a different width via lastLineWidth.',
        },
        {
          name: 'width',
          type: 'string | number',
          required: false,
          description: 'Width for all text lines. Overrides the default 100% width.',
        },
        {
          name: 'lastLineWidth',
          type: 'string | number',
          required: false,
          description: 'Width of the last line to create a more natural text appearance. Defaults to a partial width.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for each text line.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Controls text line height: sm (h-3), md (h-4), lg (h-5), xl (h-6).',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Circle',
      fileName: 'SkeletonPrimitives.tsx',
      description: 'Circular placeholder for avatars and icons. Renders as a perfect circle with size-based dimensions.',
      props: [
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Circle diameter: sm (w-8 h-8), md (w-12 h-12), lg (w-16 h-16), xl (w-24 h-24).',
          options: ['sm', 'md', 'lg', 'xl'],
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for the circle.',
          options: ['pulse', 'wave', 'none'],
        },
      ],
    },
    {
      name: 'Rectangle',
      fileName: 'SkeletonPrimitives.tsx',
      description: 'Rectangular placeholder with optional rounded corners and custom dimensions.',
      props: [
        {
          name: 'width',
          type: 'string | number',
          required: false,
          description: 'Explicit width. Defaults to 100% when not provided.',
        },
        {
          name: 'height',
          type: 'string | number',
          required: false,
          description: 'Explicit height. Falls back to size-based height when not provided.',
        },
        {
          name: 'rounded',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Applies rounded-surface border radius to the rectangle.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for the rectangle.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Predefined height when height prop is not set: sm (h-20), md (h-32), lg (h-48), xl (h-64).',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Card',
      fileName: 'SkeletonComposites.tsx',
      description: 'Pre-built card loading placeholder with optional image area, title line, and body text lines.',
      props: [
        {
          name: 'showImage',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to render the image placeholder area at the top of the card.',
        },
        {
          name: 'imageHeight',
          type: 'number',
          required: false,
          defaultValue: '200',
          description: 'Height of the image placeholder area in pixels.',
        },
        {
          name: 'lines',
          type: 'number',
          required: false,
          defaultValue: '3',
          description: 'Number of text lines in the card body.',
        },
        {
          name: 'titleWidth',
          type: 'string | number',
          required: false,
          defaultValue: "'60%'",
          description: 'Width of the title line to simulate a realistic heading.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for all card skeleton elements.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Size applied to text and image elements within the card.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Avatar',
      fileName: 'SkeletonComposites.tsx',
      description: 'Avatar loading placeholder with a circle and adjacent text lines for name and subtitle.',
      props: [
        {
          name: 'showText',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to render text lines next to the avatar circle.',
        },
        {
          name: 'textLines',
          type: 'number',
          required: false,
          defaultValue: '2',
          description: 'Number of text lines displayed beside the avatar.',
        },
        {
          name: 'titleWidth',
          type: 'string | number',
          required: false,
          defaultValue: "'40%'",
          description: 'Width of the first text line (simulating a name).',
        },
        {
          name: 'subtitleWidth',
          type: 'string | number',
          required: false,
          defaultValue: "'60%'",
          description: 'Width of the second text line (simulating a subtitle or role).',
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Avatar circle size: sm (w-8), md (w-12), lg (w-16), xl (w-24).',
          options: ['sm', 'md', 'lg', 'xl'],
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for the avatar and text elements.',
          options: ['pulse', 'wave', 'none'],
        },
      ],
    },
    {
      name: 'List',
      fileName: 'SkeletonComposites.tsx',
      description: 'List loading placeholder with repeated rows, each containing an optional avatar and text lines.',
      props: [
        {
          name: 'items',
          type: 'number',
          required: false,
          defaultValue: '5',
          description: 'Number of list item rows to render.',
        },
        {
          name: 'showAvatar',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether each row includes a circular avatar placeholder.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for all list skeleton elements.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Size applied to avatar circles and text lines within each row.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Table',
      fileName: 'SkeletonComposites.tsx',
      description: 'Table loading placeholder with optional header row and configurable rows/columns grid.',
      props: [
        {
          name: 'rows',
          type: 'number',
          required: false,
          defaultValue: '5',
          description: 'Number of data rows in the table body.',
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          defaultValue: '4',
          description: 'Number of columns in each row.',
        },
        {
          name: 'showHeader',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to render a header row at the top of the table.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for all table skeleton elements.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Size applied to each cell within the table.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Grid',
      fileName: 'SkeletonComposites.tsx',
      description: 'Grid loading placeholder with configurable item count, columns, and item height.',
      props: [
        {
          name: 'items',
          type: 'number',
          required: false,
          defaultValue: '6',
          description: 'Total number of grid items to render.',
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          defaultValue: '3',
          description: 'Number of columns in the CSS grid layout.',
        },
        {
          name: 'itemHeight',
          type: 'number',
          required: false,
          defaultValue: '200',
          description: 'Height of each grid item in pixels.',
        },
        {
          name: 'animation',
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: 'Animation style for all grid items.',
          options: ['pulse', 'wave', 'none'],
        },
        {
          name: 'size',
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: 'Size applied to each grid item.',
          options: ['sm', 'md', 'lg', 'xl'],
        },
      ],
    },
    {
      name: 'Group',
      fileName: 'SkeletonComposites.tsx',
      description: 'Spacing wrapper for grouping multiple skeleton elements with consistent gap spacing.',
      props: [
        {
          name: 'spacing',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          defaultValue: "'md'",
          description: 'Gap spacing between grouped skeleton elements.',
          options: ['sm', 'md', 'lg'],
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'animation',
      type: "SkeletonAnimation",
      required: false,
      defaultValue: "'pulse'",
      description: 'Default animation style propagated to child skeleton elements.',
      options: ['pulse', 'wave', 'none'],
    },
    {
      name: 'size',
      type: "SkeletonSize",
      required: false,
      defaultValue: "'md'",
      description: 'Default size propagated to child skeleton elements.',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      defaultValue: "'Loading'",
      description: 'Accessible label for the loading region, announced by screen readers.',
    },
    {
      name: 'aria-live',
      type: "'polite' | 'assertive' | 'off'",
      required: false,
      defaultValue: "'polite'",
      description: 'ARIA live region politeness setting for the skeleton container.',
    },
  ],
  rendersAs: 'div',

  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['text', 'circular', 'rectangular', 'rounded'],
    default: 'text',
  },

  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg', 'xl'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'animation',
      prop: 'animation',
      isBoolean: false,
      values: ['pulse', 'wave', 'none'],
      defaultValue: "'pulse'",
      description: 'Controls the loading animation style. Pulse fades opacity in and out, wave applies a shimmer sweep effect, and none renders a static placeholder. All animations respect prefers-reduced-motion.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'status',
    attributes: [
      {
        name: 'role="status"',
        description: 'Applied to Skeleton.Root to create an ARIA live region that announces loading state changes to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Applied to Skeleton.Root. Defaults to "polite" so loading announcements do not interrupt the user. Configurable via the aria-live prop.',
        managedByComponent: true,
      },
      {
        name: 'aria-busy="true"',
        description: 'Applied to Skeleton.Root to indicate the region is currently being updated and content is not yet available.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied to Skeleton.Root. Defaults to "Loading" and should be overridden to describe what is loading (e.g. "Loading user profile").',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden="true"',
        description: 'Applied to all skeleton items (Item, Text, Circle, Rectangle, Card, Avatar, List, Table, Grid) since they are visual-only and not meaningful to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'tabIndex={-1}',
        description: 'Applied to Skeleton.Item to remove it from the keyboard tab order, since skeleton elements are non-interactive.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [],
    focusManagement:
      'Skeleton elements are removed from the tab order via tabIndex={-1} and marked aria-hidden="true". The Root wrapper uses role="status" with aria-live for screen reader announcements without requiring focus.',
    wcagLevel: 'AA',
    notes:
      'All animations respect prefers-reduced-motion via Tailwind\'s motion-reduce:animate-none class. The Root component includes a screen-reader-only text node with the aria-label value. For best accessibility, always wrap skeleton content in Skeleton.Root rather than using standalone items.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'Skeleton.Card is used to show loading states before the actual Card component renders with data',
    },
    {
      slug: 'button',
      reason: 'Commonly paired with skeleton loading to provide refresh or retry actions alongside loading placeholders',
    },
    {
      slug: 'typography',
      reason: 'Skeleton.Text mirrors the layout of Typography components, making them natural companions for loading text content',
    },
    {
      slug: 'badge',
      reason: 'Skeleton items can be used to show loading states for badge-based status indicators before data loads',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Text Skeleton',
      description: 'Multi-line text loading placeholder with configurable line count.',
      code: `import { Skeleton } from 'vayu-ui';

export default function TextSkeleton() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Skeleton.Text lines={3} animation="pulse" />
    </div>
  );
}`,
      tags: ['basic', 'text', 'loading'],
    },
    {
      title: 'Avatar Skeleton Sizes',
      description: 'Avatar loading placeholders in all four sizes.',
      code: `import { Skeleton } from 'vayu-ui';

export default function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-6">
      <Skeleton.Avatar size="sm" animation="pulse" />
      <Skeleton.Avatar size="md" animation="pulse" />
      <Skeleton.Avatar size="lg" animation="pulse" />
      <Skeleton.Avatar size="xl" animation="pulse" />
    </div>
  );
}`,
      tags: ['basic', 'avatar', 'sizes'],
    },
    {
      title: 'Card Skeleton',
      description: 'Card loading placeholders with and without image areas.',
      code: `import { Skeleton } from 'vayu-ui';

export default function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton.Card animation="pulse" />
      <Skeleton.Card showImage={false} animation="pulse" />
    </div>
  );
}`,
      tags: ['card', 'loading', 'grid'],
    },
    {
      title: 'Table Skeleton',
      description: 'Table loading placeholder with configurable rows and columns.',
      code: `import { Skeleton } from 'vayu-ui';

export default function TableSkeleton() {
  return (
    <Skeleton.Table rows={4} columns={3} animation="pulse" />
  );
}`,
      tags: ['table', 'data', 'loading'],
    },
    {
      title: 'Accessible Root Wrapper',
      description: 'Using Skeleton.Root as an accessible wrapper with ARIA live region for screen readers.',
      code: `import { Skeleton } from 'vayu-ui';

export default function AccessibleSkeleton() {
  return (
    <Skeleton.Root animation="pulse" aria-label="Loading user profile">
      <Skeleton.Text lines={2} animation="pulse" />
    </Skeleton.Root>
  );
}`,
      tags: ['accessible', 'root', 'aria'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using skeleton items without Skeleton.Root',
      bad: '<Skeleton.Text lines={3} />',
      good: '<Skeleton.Root aria-label="Loading content"><Skeleton.Text lines={3} /></Skeleton.Root>',
      reason: 'Without Skeleton.Root, the loading state has no ARIA live region or aria-busy indicator. Screen readers cannot detect or announce that content is loading, violating WCAG accessibility requirements.',
    },
    {
      title: 'Hardcoding pixel dimensions instead of using size prop',
      bad: '<Skeleton.Item variant="circular" width={48} height={48} />',
      good: '<Skeleton.Circle size="md" />',
      reason: 'Hardcoding dimensions bypasses the size system and creates inconsistency across the UI. The size prop ensures all skeleton elements scale together and match the design tokens.',
    },
    {
      title: 'Showing skeleton and content simultaneously',
      bad: '<div><Skeleton.Text lines={2} /><p>Actual content</p></div>',
      good: '{isLoading ? <Skeleton.Text lines={2} /> : <p>Actual content</p>}',
      reason: 'Skeletons are decorative placeholders with aria-hidden="true". Rendering them alongside real content doubles visual noise and confuses assistive technology about which content is meaningful.',
    },
    {
      title: 'Leaving skeletons visible permanently',
      bad: '<div>{data ? <Content /> : <Skeleton.Card />}</div>',
      good: '<div>{isLoading ? <Skeleton.Card /> : data ? <Content /> : <EmptyState />}</div>',
      reason: 'Skeletons are transient loading indicators, not fallback content. If data fails to load, show an error or empty state instead. Permanently visible skeletons suggest the page is broken.',
    },
    {
      title: 'Overriding animation with custom CSS',
      bad: '<Skeleton.Text className="animate-bounce" />',
      good: '<Skeleton.Text animation="wave" />',
      reason: 'The animation prop provides three designed animation options that respect prefers-reduced-motion. Custom CSS animations may not honor reduced-motion preferences and can cause accessibility violations.',
    },
  ],
};
