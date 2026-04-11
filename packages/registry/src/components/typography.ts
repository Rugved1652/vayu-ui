import { ComponentRegistryEntry } from '../types.js';

export const typographyEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'typography',
  name: 'Typography',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A compound typography component providing semantic heading, paragraph, label, code, link, and CTA elements with color variants, font switching, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The Typography component uses the compound component pattern (Typography.H1–H6, Typography.P, Typography.Label, Typography.Code, Typography.Link, Typography.CTA) to render semantic HTML text elements. All sub-components share a common set of props for color variants (primary, secondary, tertiary, error, warning, info, success, gradient), font family switching (primary, secondary), text truncation, and ARIA attributes. Link supports automatic internal/external routing with Next.js, external-link icons, and WCAG-compliant new-window announcements. Code renders inline code snippets with optional language metadata. All elements use design tokens via Tailwind classes for consistent theming.',
  tags: [
    'typography',
    'text',
    'heading',
    'paragraph',
    'link',
    'code',
    'label',
    'cta',
    'semantic',
    'content',
    'a11y',
  ],
  useCases: [
    'Semantic page headings (H1–H6) that establish visual hierarchy and document outline',
    'Body paragraphs with primary and secondary color variants for content emphasis',
    'Form labels with htmlFor binding to associate text with inputs',
    'Inline code snippets with language metadata for technical documentation',
    'Navigation links with automatic internal routing via Next.js and external-link icons',
    'Call-to-action text styled prominently for marketing or conversion sections',
    'Status-colored text using error, warning, info, or success variants for feedback messages',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Typography',
  files: [
    { name: 'Typography.tsx', description: 'Root compound object assembling all typography sub-components into a single namespace' },
    { name: 'TypographyHeadings.tsx', description: 'H1–H6 heading components with responsive sizing and variant styling' },
    { name: 'TypographyTextElements.tsx', description: 'P, Label, and CTA text components with variant and font support' },
    { name: 'TypographyCode.tsx', description: 'Inline code component with language metadata and monospace styling' },
    { name: 'TypographyLink.tsx', description: 'Link component with Next.js routing, external-link detection, and WCAG announcements' },
    { name: 'utils.ts', description: 'getVariantClasses helper mapping variant names to design-token Tailwind classes' },
    { name: 'types.ts', description: 'TypeScript interfaces for BaseTypographyProps and all sub-component prop types' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the Typography namespace and all type definitions' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Typography',
  subComponents: [
    {
      name: 'H1',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h1> element with responsive sizing (4xl/5xl/6xl), bold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'H2',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h2> element with responsive sizing (3xl/4xl/5xl), extra-bold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          defaultValue: "'primary'",
          description: 'Font family override; defaults to primary for headings',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'H3',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h3> element with responsive sizing (2xl/3xl/4xl), semibold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'H4',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h4> element with responsive sizing (xl/2xl/3xl), semibold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'H5',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h5> element with responsive sizing (lg/xl/2xl), semibold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'H6',
      fileName: 'TypographyHeadings.tsx',
      description: 'Renders an <h6> element with responsive sizing (base/lg/xl), semibold weight, and tight tracking',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Heading content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'P',
      fileName: 'TypographyTextElements.tsx',
      description: 'Renders a <p> element with paragraph sizing, relaxed leading, and secondary font by default',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Paragraph content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          defaultValue: "'secondary'",
          description: 'Font family override; defaults to secondary for body text',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'Label',
      fileName: 'TypographyTextElements.tsx',
      description: 'Renders a <label> element with base sizing and relaxed leading, supports htmlFor for form association',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label content',
        },
        {
          name: 'htmlFor',
          type: 'string',
          required: false,
          description: 'Associates the label with a form control by its id attribute',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'Code',
      fileName: 'TypographyCode.tsx',
      description: 'Renders a <code> element with monospace font, rounded background, focus ring, and optional language metadata',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Code content to display inline',
        },
        {
          name: 'codeLang',
          type: 'string',
          required: false,
          description: 'Programming language hint stored as data-code-lang and used for auto-generated aria-label',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'Link',
      fileName: 'TypographyLink.tsx',
      description: 'Renders a navigation link using Next.js Link for internal routes or a native <a> for external URLs, with WCAG-compliant external-link announcements and focus rings',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Link content',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'URL or path; http/https URLs render as external links, all others use Next.js Link',
        },
        {
          name: 'target',
          type: 'string',
          required: false,
          description: 'Link target attribute; target="_blank" triggers external-link behavior with rel="noopener noreferrer"',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
    {
      name: 'CTA',
      fileName: 'TypographyTextElements.tsx',
      description: 'Renders a <p> element with CTA-specific styling for call-to-action text in marketing sections',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Call-to-action text content',
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: 'Color variant applied via design tokens',
          options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
        },
        {
          name: 'ellipsis',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Truncates text with ellipsis when overflowing',
        },
        {
          name: 'font',
          type: "'primary' | 'secondary'",
          required: false,
          description: 'Font family override',
          options: ['primary', 'secondary'],
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
      required: false,
      defaultValue: "'primary'",
      description: 'Color variant mapped to design tokens: canvas-content, muted-content, surface-content/70, destructive, warning, info, success, or brand gradient',
      options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
    },
    {
      name: 'ellipsis',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Applies Tailwind truncate utility to clip overflowing text with an ellipsis',
    },
    {
      name: 'font',
      type: "'primary' | 'secondary'",
      required: false,
      description: 'Switches the font family between primary (Oswald) and secondary (Mulish) using Tailwind font-{value}',
      options: ['primary', 'secondary'],
    },
    {
      name: 'ariaLabel',
      type: 'string',
      required: false,
      description: 'Sets aria-label on the rendered element for assistive technology',
    },
    {
      name: 'ariaDescribedby',
      type: 'string',
      required: false,
      description: 'Sets aria-describedby to associate the element with descriptive text',
    },
    {
      name: 'ariaHidden',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Sets aria-hidden to hide the element from the accessibility tree',
    },
    {
      name: 'lang',
      type: 'string',
      required: false,
      description: 'Sets the lang attribute for language declaration on the text element',
    },
    {
      name: 'role',
      type: 'React.AriaRole',
      required: false,
      description: 'Overrides the default ARIA role of the rendered element',
    },
  ],
  rendersAs: 'mixed (h1–h6, p, label, code, a)',

  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success', 'gradient'],
    default: 'primary',
  },

  // ── States ────────────────────────────────────────────
  states: [],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLElement>) => void',
      description: 'Fired when the element is clicked; available on all sub-components via inherited HTML attributes',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLElement>) => void',
      description: 'Fired when the element receives focus; triggers the focus-visible ring on Link and Code',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLElement>) => void',
      description: 'Fired when the element loses focus',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLElement>) => void',
      description: 'Fired on key press while the element has focus',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-label',
        description: 'Set via the ariaLabel prop on all sub-components. Link auto-appends "(opens in a new tab)" or "(external link)" for external URLs. Code auto-generates from codeLang when no ariaLabel is provided.',
        managedByComponent: false,
      },
      {
        name: 'aria-describedby',
        description: 'Set via the ariaDescribedby prop on all sub-components to associate descriptive text',
        managedByComponent: false,
      },
      {
        name: 'aria-hidden',
        description: 'Set via the ariaHidden prop on all sub-components. Also applied to the external-link SVG icon in Link to hide decorative content from assistive technology.',
        managedByComponent: false,
      },
      {
        name: 'role',
        description: 'Code defaults to role="code"; all other sub-components use native semantic roles. Overridable via the role prop.',
        managedByComponent: false,
      },
      {
        name: 'rel="noopener noreferrer"',
        description: 'Automatically added by Link when target="_blank" to prevent reverse tabnapping security vulnerability.',
        managedByComponent: true,
      },
      {
        name: 'data-code-lang',
        description: 'Set by Code component from the codeLang prop to expose language metadata for tooling.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the next focusable element (Link and Code have focus rings)',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous focusable element',
      },
      {
        key: 'Enter',
        behavior: 'Activates navigation for focused Link elements',
      },
    ],
    focusManagement:
      'Link and Code components include focus-visible rings (focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2). Link has a minimum touch target of 44px (min-h-11 min-w-11) for mobile accessibility.',
    wcagLevel: 'AA',
    notes:
      'All sub-components render semantic HTML elements (h1–h6, p, label, code, a) for proper document outline and screen reader navigation. Link auto-announces external links and new-window behavior via computed aria-label per WCAG 2.4.4 and 2.5.3. Variant colors meet WCAG 2.2 AA contrast ratios: 4.5:1 for normal text, 3:1 for large text.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'next' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'Cards commonly contain Typography headings, paragraphs, and CTAs for content sections',
    },
    {
      slug: 'text-input',
      reason: 'Typography.Label pairs with TextInput for accessible form field labels via htmlFor',
    },
    {
      slug: 'alert',
      reason: 'Typography error/warning/success/info variants align with Alert status colors for consistent feedback',
    },
    {
      slug: 'modal',
      reason: 'Modals use Typography.H2–H4 for dialog titles and Typography.P for body content',
    },
    {
      slug: 'button',
      reason: 'Typography.CTA is often used alongside or above Button components in marketing and hero sections',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Headings H1–H6',
      description: 'All six heading levels rendered inside a surface container, demonstrating the visual hierarchy from H1 down to H6.',
      code: `import { Typography } from 'vayu-ui';

export default function HeadingsDemo() {
  return (
    <div className="bg-surface space-y-2 rounded-surface p-6 border border-border shadow-surface">
      <Typography.H1>Heading 1 - Main Title</Typography.H1>
      <Typography.H2>Heading 2 - Section Title</Typography.H2>
      <Typography.H3>Heading 3 - Subsection</Typography.H3>
      <Typography.H4>Heading 4 - Component</Typography.H4>
      <Typography.H5>Heading 5 - Subcomponent</Typography.H5>
      <Typography.H6>Heading 6 - Minor Heading</Typography.H6>
    </div>
  );
}`,
      tags: ['headings', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    {
      title: 'Paragraphs',
      description: 'Primary and secondary paragraph variants demonstrating standard body text and de-emphasized content.',
      code: `import { Typography } from 'vayu-ui';

export default function ParagraphsDemo() {
  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
        <Typography.P>
          This is a paragraph example. It has a relaxed line height and proper spacing for
          optimal readability. Typography is the art and technique of arranging type to make
          written language legible, readable, and appealing when displayed.
        </Typography.P>
      </div>
      <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
        <Typography.P variant="secondary">
          This is a secondary paragraph. It uses muted-content color to indicate less emphasis
          in the visual hierarchy.
        </Typography.P>
      </div>
    </div>
  );
}`,
      tags: ['paragraph', 'body-text', 'secondary'],
    },
    {
      title: 'Text Components',
      description: 'Label, Code, Link, and CTA sub-components demonstrating form labels, inline code snippets, internal and external links, and call-to-action text.',
      code: `import { Typography } from 'vayu-ui';

export default function TextComponentsDemo() {
  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-3 bg-surface rounded-control p-4 border border-border">
        <Typography.Label className="font-medium">Email Address</Typography.Label>
        <span className="text-sm text-muted-content">→</span>
        <Typography.P className="text-sm">user@example.com</Typography.P>
      </div>

      {/* Inline Code */}
      <div className="bg-surface rounded-control p-4 border border-border">
        <Typography.P>
          Inline code example: <Typography.Code>npm install vayu-ui</Typography.Code>
        </Typography.P>
        <Typography.P className="mt-2">
          With language hint:{' '}
          <Typography.Code codeLang="typescript">
            const x: string = &quot;hello&quot;
          </Typography.Code>
        </Typography.P>
      </div>

      {/* Links */}
      <div className="bg-surface rounded-control p-4 border border-border space-y-3">
        <Typography.Link href="/components">Go to Components</Typography.Link>
        <Typography.Link href="https://example.com" target="_blank">
          External link with icon
        </Typography.Link>
      </div>

      {/* CTA */}
      <div className="bg-brand/10 rounded-control p-4 border border-brand/30">
        <Typography.CTA className="text-lg font-semibold text-brand">
          This is a Call to Action text
        </Typography.CTA>
      </div>
    </div>
  );
}`,
      tags: ['label', 'code', 'link', 'cta', 'inline-code'],
    },
    {
      title: 'Color Variants',
      description: 'Status color variants (error, success, warning, info) for feedback text, plus a gradient heading effect.',
      code: `import { Typography } from 'vayu-ui';

export default function VariantsDemo() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-surface rounded-control p-4 border border-destructive/30 shadow-surface">
          <Typography.P variant="error">Error text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-success/30 shadow-surface">
          <Typography.P variant="success">Success text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-warning/30 shadow-surface">
          <Typography.P variant="warning">Warning text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-info/30 shadow-surface">
          <Typography.P variant="info">Info text variant</Typography.P>
        </div>
      </div>
      <div className="bg-surface rounded-surface p-6 border border-border shadow-surface">
        <Typography.H3 variant="gradient">Gradient Heading Effect</Typography.H3>
      </div>
    </div>
  );
}`,
      tags: ['variants', 'error', 'success', 'warning', 'info', 'gradient'],
    },
    {
      title: 'Font Variants',
      description: 'Switching between primary (Oswald) and secondary (Mulish) font families on paragraph elements.',
      code: `import { Typography } from 'vayu-ui';

export default function FontDemo() {
  return (
    <div className="space-y-3 bg-surface rounded-surface p-6 border border-border shadow-surface">
      <Typography.P font="primary">Primary font (Oswald) - for headings</Typography.P>
      <Typography.P font="secondary">Secondary font (Mulish) - for body text</Typography.P>
    </div>
  );
}`,
      tags: ['font', 'primary', 'secondary', 'font-family'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Skipping heading levels in the document outline',
      bad: '<Typography.H1>Title</Typography.H1><Typography.H4>Section</Typography.H4>',
      good: '<Typography.H1>Title</Typography.H1><Typography.H2>Section</Typography.H2>',
      reason: 'Heading levels must be sequential (H1→H2→H3) to maintain a proper document outline. Skipping levels confuses screen reader users who navigate by headings. Use the correct semantic level, not the visual size.',
    },
    {
      title: 'Using Typography.Link for non-navigation actions',
      bad: '<Typography.Link href="#" onClick={handleDelete}>Delete item</Typography.Link>',
      good: '<Button variant="destructive" onClick={handleDelete}>Delete item</Button>',
      reason: 'Links are for navigation. Actions like delete, submit, or toggle should use Button. Using a link with href="#" and an onClick handler breaks accessibility expectations and keyboard navigation patterns.',
    },
    {
      title: 'Adding multiple H1 elements on a single page',
      bad: '<Typography.H1>Home</Typography.H1> ... <Typography.H1>Welcome</Typography.H1>',
      good: '<Typography.H1>Welcome</Typography.H1> ... <Typography.H2>Section</Typography.H2>',
      reason: 'WCAG best practice recommends exactly one H1 per page to give the document a single top-level heading. Use H2–H6 for all subsequent sections.',
    },
    {
      title: 'Using Typography.Label without htmlFor for form fields',
      bad: '<Typography.Label>Email</Typography.Label><input id="email" />',
      good: '<Typography.Label htmlFor="email">Email</Typography.Label><input id="email" />',
      reason: 'Without htmlFor, the label is not programmatically associated with its input. Screen readers cannot announce the label when the input receives focus, and clicking the label will not focus the input.',
    },
    {
      title: 'Hardcoding colors instead of using the variant prop',
      bad: '<Typography.P className="text-red-500">Error message</Typography.P>',
      good: '<Typography.P variant="error">Error message</Typography.P>',
      reason: 'Hardcoded colors bypass design tokens and will not adapt to theme changes (light/dark mode). The variant prop maps to semantic tokens that ensure consistent theming and WCAG contrast compliance.',
    },
  ],
};
