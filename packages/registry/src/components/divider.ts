import { ComponentRegistryEntry } from '../types.js';

export const dividerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'divider',
  name: 'Divider',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'A compound divider component providing horizontal or vertical visual separation with labeled variants, customizable line styles, colors, thicknesses, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The Divider component uses the compound component pattern (Divider, Divider.Line, Divider.Label) to render visual separators between content sections. The root Divider controls orientation (horizontal/vertical) and spacing via design tokens. Divider.Line offers variant (solid/dashed/dotted), color (default/brand/success/warning/destructive/info), size (thin/normal/thick/bold), custom thickness, and opacity controls. Divider.Label renders text between line segments for labeled separators. The component automatically applies ARIA separator semantics when unlabeled, hides decorative dividers from assistive technology, and maps all colors to semantic design tokens via Tailwind classes.',
  tags: [
    'divider',
    'separator',
    'horizontal',
    'vertical',
    'line',
    'label',
    'layout',
    'visual-separation',
    'hr',
    'a11y',
  ],
  useCases: [
    'Separating distinct content sections within cards, panels, or page layouts',
    'Creating labeled dividers with text like "OR" or "Continue with" between form sections',
    'Vertical dividers between inline navigation items, breadcrumbs, or button groups',
    'Decorative dividers with dashed, dotted, or colored lines for visual hierarchy',
    'Themed status dividers using brand, success, warning, destructive, or info colors',
    'Adjusting spacing between content blocks with consistent design token margins',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Divider',
  files: [
    { name: 'Divider.tsx', description: 'Root compound object assembling DividerRoot, DividerLine, and DividerLabel into a single namespace' },
    { name: 'DividerLine.tsx', description: 'Line sub-component with variant, color, size, thickness, opacity, and orientation controls' },
    { name: 'DividerLabel.tsx', description: 'Label sub-component rendering text between divider lines with color variants' },
    { name: 'types.ts', description: 'TypeScript interfaces for all props plus design token maps for spacing, variants, colors, and sizes' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the Divider namespace and all type definitions' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Divider',
  subComponents: [
    {
      name: 'Line',
      fileName: 'DividerLine.tsx',
      description: 'Renders a horizontal or vertical border line with variant, color, size, thickness, and opacity controls; always marked aria-hidden="true"',
      props: [
        {
          name: 'variant',
          type: "'solid' | 'dashed' | 'dotted'",
          required: false,
          defaultValue: "'solid'",
          description: 'Line style variant mapped to CSS border-style',
          options: ['solid', 'dashed', 'dotted'],
        },
        {
          name: 'color',
          type: "'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'info'",
          required: false,
          defaultValue: "'default'",
          description: 'Semantic color mapped to design tokens (border-border, border-brand, etc.)',
          options: ['default', 'brand', 'success', 'warning', 'destructive', 'info'],
        },
        {
          name: 'size',
          type: "'thin' | 'normal' | 'thick' | 'bold'",
          required: false,
          defaultValue: "'normal'",
          description: 'Preset thickness mapped to pixel values (1/2/3/4px)',
          options: ['thin', 'normal', 'thick', 'bold'],
        },
        {
          name: 'thickness',
          type: 'number',
          required: false,
          description: 'Custom thickness in pixels; overrides the size preset when provided',
        },
        {
          name: 'opacity',
          type: 'number',
          required: false,
          defaultValue: '1',
          description: 'Opacity value applied to the line (0–1)',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          required: false,
          defaultValue: "'horizontal'",
          description: 'Direction of the line; horizontal uses border-top, vertical uses border-left',
          options: ['horizontal', 'vertical'],
        },
      ],
    },
    {
      name: 'Label',
      fileName: 'DividerLabel.tsx',
      description: 'Renders a <span> with text between divider lines, styled with color variants and whitespace-nowrap',
      props: [
        {
          name: 'color',
          type: "'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'info'",
          required: false,
          defaultValue: "'default'",
          description: 'Semantic text color mapped to design tokens (text-muted-content, text-brand, etc.)',
          options: ['default', 'brand', 'success', 'warning', 'destructive', 'info'],
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      defaultValue: "'horizontal'",
      description: 'Direction of the divider layout; horizontal uses flex-row, vertical uses flex-col',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'spacing',
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      required: false,
      defaultValue: "'md'",
      description: 'Margin around the divider mapped to design tokens (my-0 through my-12 / mx-0 through mx-12)',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      name: 'decorative',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, marks the divider as decorative with aria-hidden="true" to exclude it from the accessibility tree',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['solid', 'dashed', 'dotted'],
    default: 'solid',
  },
  sizes: {
    propName: 'size',
    options: ['thin', 'normal', 'thick', 'bold'],
    default: 'normal',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'decorative',
      prop: 'decorative',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Hides the divider from assistive technology by applying aria-hidden="true" and removing the separator role',
    },
    {
      name: 'orientation',
      prop: 'orientation',
      values: ['horizontal', 'vertical'],
      isBoolean: false,
      defaultValue: "'horizontal'",
      description: 'Controls the layout direction and which border axis the line renders on',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the root divider element is clicked; inherited from HTMLDivElement attributes',
    },
    {
      name: 'onMouseEnter',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the mouse enters the root divider element',
    },
    {
      name: 'onMouseLeave',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the mouse leaves the root divider element',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'separator',
    attributes: [
      {
        name: 'role',
        description: 'Applied as "separator" on unlabeled, non-decorative dividers to convey structural separation to assistive technology',
        managedByComponent: true,
      },
      {
        name: 'aria-orientation',
        description: 'Set to match the orientation prop ("horizontal" or "vertical") on unlabeled, non-decorative dividers',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" on decorative dividers and on all Divider.Line elements to hide them from the accessibility tree',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [],
    focusManagement: 'Dividers are not focusable and do not participate in keyboard navigation.',
    wcagLevel: 'AA',
    notes:
      'Unlabeled dividers receive role="separator" and aria-orientation per WAI-ARIA separator pattern. Decorative dividers use aria-hidden="true". Labeled dividers (those with children/Label) omit the separator role since their text content is readable by assistive technology. Divider.Line elements are always aria-hidden="true" as decorative borders.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'Cards frequently use dividers to separate header, body, and footer sections',
    },
    {
      slug: 'button',
      reason: 'Vertical dividers commonly separate button groups in toolbars and action bars',
    },
    {
      slug: 'typography',
      reason: 'Divider.Label pairs with Typography elements for labeled section breaks',
    },
    {
      slug: 'modal',
      reason: 'Modals use dividers to separate header, content, and footer areas',
    },
    {
      slug: 'popover',
      reason: 'Popovers use dividers to separate menu groups and action sections',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Divider',
      description: 'A simple horizontal divider with default solid style, normal size, and medium spacing.',
      code: `import { Divider } from 'vayu-ui';

export default function DefaultDivider() {
  return <Divider />;
}`,
      tags: ['basic', 'default', 'horizontal'],
    },
    {
      title: 'Vertical Divider',
      description: 'A vertical divider separating inline text items like navigation breadcrumbs.',
      code: `import { Divider, Typography } from 'vayu-ui';

export default function VerticalDivider() {
  return (
    <div className="flex items-center h-5 gap-2">
      <Typography.P variant="secondary" className="text-sm">Blog</Typography.P>
      <Divider orientation="vertical" />
      <Typography.P variant="secondary" className="text-sm">Docs</Typography.P>
      <Divider orientation="vertical" />
      <Typography.P variant="secondary" className="text-sm">Source</Typography.P>
    </div>
  );
}`,
      tags: ['vertical', 'navigation', 'inline'],
    },
    {
      title: 'Labeled Divider',
      description: 'A divider with a text label between two line segments using the compound pattern.',
      code: `import { Divider } from 'vayu-ui';

export default function LabeledDivider() {
  return (
    <Divider>
      <Divider.Line />
      <Divider.Label>OR</Divider.Label>
      <Divider.Line />
    </Divider>
  );
}`,
      tags: ['label', 'compound', 'text'],
    },
    {
      title: 'Variants and Colors',
      description: 'Dividers with dashed, dotted, and solid variants in brand, success, warning, destructive, and info colors.',
      code: `import { Divider } from 'vayu-ui';

export default function VariantColorDivider() {
  return (
    <div className="space-y-4">
      <Divider>
        <Divider.Line variant="dashed" />
        <Divider.Label>Dashed</Divider.Label>
      </Divider>

      <Divider>
        <Divider.Label>Dotted</Divider.Label>
        <Divider.Line variant="dotted" />
      </Divider>

      <Divider>
        <Divider.Line variant="solid" color="brand" />
        <Divider.Label color="brand">Solid Brand</Divider.Label>
        <Divider.Line variant="solid" color="brand" />
      </Divider>

      <Divider>
        <Divider.Line variant="solid" color="success" />
        <Divider.Label color="success">Success</Divider.Label>
        <Divider.Line variant="solid" color="success" />
      </Divider>
    </div>
  );
}`,
      tags: ['variants', 'dashed', 'dotted', 'colors', 'brand', 'success'],
    },
    {
      title: 'Sizes',
      description: 'Dividers with thin, normal, thick, and bold line sizes using the size prop.',
      code: `import { Divider } from 'vayu-ui';

export default function SizeDivider() {
  return (
    <div className="space-y-4">
      <Divider spacing="sm">
        <Divider.Line size="thin" />
        <Divider.Label>Thin</Divider.Label>
        <Divider.Line size="thin" />
      </Divider>
      <Divider spacing="sm">
        <Divider.Line size="normal" />
        <Divider.Label>Normal</Divider.Label>
        <Divider.Line size="normal" />
      </Divider>
      <Divider spacing="sm">
        <Divider.Line size="thick" />
        <Divider.Label>Thick</Divider.Label>
        <Divider.Line size="thick" />
      </Divider>
      <Divider spacing="sm">
        <Divider.Line size="bold" />
        <Divider.Label>Bold</Divider.Label>
        <Divider.Line size="bold" />
      </Divider>
    </div>
  );
}`,
      tags: ['sizes', 'thin', 'normal', 'thick', 'bold'],
    },
    {
      title: 'Spacing',
      description: 'Dividers with all spacing options from none to 2xl, demonstrating consistent design token margins.',
      code: `import { Divider } from 'vayu-ui';

export default function SpacingDivider() {
  return (
    <div className="space-y-4">
      <Divider spacing="none" />
      <Divider spacing="sm" />
      <Divider spacing="md" />
      <Divider spacing="lg" />
      <Divider spacing="xl" />
      <Divider spacing="2xl" />
    </div>
  );
}`,
      tags: ['spacing', 'margins', 'none', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'With Buttons',
      description: 'A vertical divider separating two buttons in an inline button group.',
      code: `import { Divider, Button } from 'vayu-ui';

export default function ButtonDivider() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="small">Sign In</Button>
      <Divider orientation="vertical" spacing="none" />
      <Button variant="outline" size="small">Register</Button>
    </div>
  );
}`,
      tags: ['buttons', 'vertical', 'group', 'action'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using a labeled divider without Divider.Line children',
      bad: '<Divider><Divider.Label>OR</Divider.Label></Divider>',
      good: '<Divider><Divider.Line /><Divider.Label>OR</Divider.Label><Divider.Line /></Divider>',
      reason: 'Without Divider.Line children, the label has no visual line segments flanking it. Always pair Label with at least one Line for a proper visual divider.',
    },
    {
      title: 'Setting decorative="true" on a labeled divider',
      bad: '<Divider decorative><Divider.Label>Section</Divider.Label></Divider>',
      good: '<Divider decorative /><Divider.Label>Section</Divider.Label>',
      reason: 'Decorative hides the divider from assistive technology with aria-hidden="true", but a labeled divider has readable content. Use decorative only on visual-only dividers, and keep label text accessible.',
    },
    {
      title: 'Hardcoding colors instead of using the color prop',
      bad: '<Divider.Line className="border-red-500" />',
      good: '<Divider.Line color="destructive" />',
      reason: 'Hardcoded Tailwind colors bypass design tokens and will not adapt to theme changes (light/dark mode). The color prop maps to semantic tokens that ensure consistent theming.',
    },
    {
      title: 'Using a horizontal divider inside a vertical flex container without orientation="vertical"',
      bad: '<div className="flex flex-col"><Divider /></div>',
      good: '<div className="flex flex-col"><Divider orientation="vertical" /></div>',
      reason: 'A horizontal divider inside a vertical flex container will not render correctly. Match the divider orientation to the flex direction of its parent for proper visual alignment.',
    },
    {
      title: 'Overriding spacing with arbitrary margins instead of the spacing prop',
      bad: '<Divider className="my-8" />',
      good: '<Divider spacing="xl" />',
      reason: 'Using arbitrary margins breaks the design token system. The spacing prop uses consistent token values (none/sm/md/lg/xl/2xl) that adapt to both horizontal and vertical orientations automatically.',
    },
  ],
};
