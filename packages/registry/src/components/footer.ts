import { ComponentRegistryEntry } from '../types.js';

export const footerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'footer',
  name: 'Footer',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'A compound component for building responsive site footers with navigation sections, social links, copyright, and multiple layout variants.',
  longDescription:
    'The Footer component uses the compound component pattern to compose flexible page footers. It provides Container, Grid, Section, Link, Logo, Social, SocialLink, Copyright, Divider, and Bottom sub-components for building multi-column layouts. Three variants (default, centered, minimal) control responsive grid behavior and alignment via Tailwind group-data attributes. External links automatically receive target="_blank", rel="noopener noreferrer", and an external link icon. All links and social links include proper ARIA attributes, keyboard navigation, and focus-visible styles. The root element uses role="contentinfo" for landmark navigation.',
  tags: [
    'footer',
    'navigation',
    'links',
    'social',
    'copyright',
    'layout',
    'site-footer',
    'page-footer',
    'responsive',
    'landmark',
  ],
  useCases: [
    'Multi-section site footer with grouped navigation links, social icons, and copyright notice',
    'Centered footer layout for single-column branding-focused pages such as portfolios or landing pages',
    'Minimal footer bar with just logo, copyright text, and social icon links',
    'Footer with a call-to-action section above navigation links for conversion-focused pages',
    'Blog or documentation footer with categorized link sections organized into columns',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Footer',
  files: [
    { name: 'Footer.tsx', description: 'Composition file assembling the compound component with all sub-components' },
    { name: 'FooterRoot.tsx', description: 'Root footer element with variant prop, role="contentinfo", and canvas-level theming' },
    { name: 'FooterLayout.tsx', description: 'Layout primitives: Container (max-width wrapper), Grid (variant-responsive columns), Bottom (flex row)' },
    { name: 'FooterContent.tsx', description: 'Content elements: Section (nav grouping with title), Link (with external indicator), Logo (with optional href)' },
    { name: 'FooterSocial.tsx', description: 'Social elements: Social container (role="list") and SocialLink (always opens in new tab)' },
    { name: 'FooterUtilities.tsx', description: 'Utility elements: Copyright text wrapper and Divider separator with ARIA attributes' },
    { name: 'types.ts', description: 'TypeScript type definitions for FooterVariant and all sub-component prop interfaces' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and all types' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Footer',
  subComponents: [
    {
      name: 'Container',
      fileName: 'FooterLayout.tsx',
      description: 'Max-width centered wrapper with responsive horizontal padding and vertical spacing',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Footer content to wrap in the container',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the container',
        },
      ],
    },
    {
      name: 'Grid',
      fileName: 'FooterLayout.tsx',
      description: 'Responsive grid layout that adapts columns based on the parent Footer variant',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Grid items (typically Footer.Section elements)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the grid',
        },
      ],
    },
    {
      name: 'Section',
      fileName: 'FooterContent.tsx',
      description: 'Grouping element with an optional title heading and an accessible nav landmark for links',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Link elements or other content within the section',
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Section heading displayed as an uppercase h3; also used to generate the nav aria-label',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the section',
        },
      ],
    },
    {
      name: 'Link',
      fileName: 'FooterContent.tsx',
      description: 'Footer navigation link with hover styles, focus ring, and optional external link indicator with automatic ARIA label',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Link text or content',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'URL the link points to',
        },
        {
          name: 'external',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, opens link in new tab with external indicator icon and computed aria-label',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the link',
        },
      ],
    },
    {
      name: 'Logo',
      fileName: 'FooterContent.tsx',
      description: 'Logo wrapper with optional clickable link, used to display brand identity in the footer',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Logo content (image, text, or typography component)',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          defaultValue: "'/'",
          description: 'URL for the logo link; renders a plain wrapper when omitted or empty string',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the logo container',
        },
      ],
    },
    {
      name: 'Social',
      fileName: 'FooterSocial.tsx',
      description: 'Horizontal container for social media links with role="list" and accessible label',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Footer.SocialLink elements',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the social container',
        },
      ],
    },
    {
      name: 'SocialLink',
      fileName: 'FooterSocial.tsx',
      description: 'Individual social media link rendered as a circular icon button that always opens in a new tab',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Icon element (e.g. a Lucide icon component)',
        },
        {
          name: 'href',
          type: 'string',
          required: false,
          description: 'URL of the social media profile',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          description: 'Accessible label describing the social platform (e.g. "Twitter", "GitHub")',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the social link',
        },
      ],
    },
    {
      name: 'Copyright',
      fileName: 'FooterUtilities.tsx',
      description: 'Muted text wrapper for copyright notices and legal disclaimers',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Copyright text content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the copyright element',
        },
      ],
    },
    {
      name: 'Divider',
      fileName: 'FooterUtilities.tsx',
      description: 'Horizontal separator line between footer sections with role="separator"',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the divider',
        },
      ],
    },
    {
      name: 'Bottom',
      fileName: 'FooterLayout.tsx',
      description: 'Flex row for the bottom bar (copyright, legal links), alignment adapts to the Footer variant',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Bottom bar content (typically Copyright and legal links)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes for the bottom bar',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'variant',
      type: "FooterVariant",
      required: false,
      defaultValue: "'default'",
      description: 'Controls the responsive grid layout and alignment of footer content',
      options: ['default', 'minimal', 'centered'],
    },
  ],
  rendersAs: 'footer',

  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['default', 'minimal', 'centered'],
    default: 'default',
  },

  // ── States ────────────────────────────────────────────
  states: [],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick (Link)',
      signature: '(event: React.MouseEvent<HTMLAnchorElement>) => void',
      description: 'Fired when a Footer.Link is clicked; useful for tracking outbound navigation',
    },
    {
      name: 'onClick (SocialLink)',
      signature: '(event: React.MouseEvent<HTMLAnchorElement>) => void',
      description: 'Fired when a Footer.SocialLink is clicked; useful for social referral tracking',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'contentinfo',
    attributes: [
      {
        name: 'role="contentinfo"',
        description: 'Applied to the root <footer> element to identify it as a landmark region for page-level footer content',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Section nav)',
        description:
          'Applied to the <nav> inside Footer.Section. Uses the title prop to generate a label like "Product links", or falls back to "Footer navigation" when no title is provided.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Link external)',
        description:
          'When Footer.Link has external=true and a string child, the component automatically appends "(opens in new tab)" to the aria-label.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden="true" (external icon)',
        description:
          'Applied to the SVG external-link icon inside Footer.Link so screen readers do not announce the decorative icon.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Social)',
        description: 'The Footer.Social container has aria-label="Social media links" to identify the group.',
        managedByComponent: true,
      },
      {
        name: 'role="list" (Social)',
        description:
          'Footer.Social uses role="list" to avoid creating a nested nav landmark inside Footer.Section.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (SocialLink)',
        description:
          'Each Footer.SocialLink requires an aria-label describing the social platform. Must be provided by the developer.',
        managedByComponent: false,
      },
      {
        name: 'role="separator" (Divider)',
        description: 'Footer.Divider renders an <hr> with role="separator" and aria-orientation="horizontal".',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus through Footer.Link and Footer.SocialLink elements in document order',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus backward through links',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused link (native anchor behavior)',
      },
    ],
    focusManagement:
      'All interactive elements (Footer.Link, Footer.SocialLink, Footer.Logo anchor) display a focus-visible ring (ring-2 ring-focus with offset) on keyboard focus only. Pointer clicks do not trigger the ring.',
    wcagLevel: 'AA',
    notes:
      'The root <footer> element with role="contentinfo" serves as a navigable landmark. Footer.Section wraps links in a <nav> element with a descriptive aria-label derived from the title prop. External links automatically receive target="_blank", rel="noopener noreferrer", and an appended "(opens in new tab)" aria-label to meet WCAG 2.4.4 Link Purpose. Footer.Social uses role="list" instead of a nested <nav> to avoid landmark duplication. The minimum touch target for social links is 44x44px (min-w-11 min-h-11).',
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
      slug: 'typography',
      reason: 'Footer commonly uses Typography.H5 for logo text and Typography.P for descriptions',
    },
    {
      slug: 'button',
      reason: 'CTA buttons in footer sections for conversion-focused layouts',
    },
    {
      slug: 'divider',
      reason: 'Used in demos to separate footer sections, though Footer.Divider is built-in',
    },
    {
      slug: 'card',
      reason: 'Card components and Footer often appear together as page-level layout elements',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Footer',
      description: 'Multi-column footer with logo, social links, navigation sections, divider, and bottom bar with copyright.',
      code: `import { Footer, Typography, Divider } from 'vayu-ui';
import { Twitter, Github, Instagram } from 'lucide-react';

export default function DefaultFooter() {
  return (
    <Footer>
      <Footer.Container>
        <Footer.Grid>
          <Footer.Section>
            <Footer.Logo href="#">
              <Typography.H5 variant="gradient" className="font-bold">
                Vayu UI
              </Typography.H5>
            </Footer.Logo>
            <Typography.P variant="secondary" className="mt-2">
              Building beautiful user interfaces with modern web technologies.
            </Typography.P>
            <Footer.Social className="mt-4">
              <Footer.SocialLink href="#" aria-label="Twitter">
                <Twitter size={18} />
              </Footer.SocialLink>
              <Footer.SocialLink href="#" aria-label="GitHub">
                <Github size={18} />
              </Footer.SocialLink>
              <Footer.SocialLink href="#" aria-label="Instagram">
                <Instagram size={18} />
              </Footer.SocialLink>
            </Footer.Social>
          </Footer.Section>

          <Footer.Section title="Product">
            <Footer.Link href="#">Features</Footer.Link>
            <Footer.Link href="#">Integrations</Footer.Link>
            <Footer.Link href="#">Pricing</Footer.Link>
            <Footer.Link href="#">Changelog</Footer.Link>
          </Footer.Section>

          <Footer.Section title="Resources">
            <Footer.Link href="#">Documentation</Footer.Link>
            <Footer.Link href="#">API Reference</Footer.Link>
            <Footer.Link href="#">Community</Footer.Link>
            <Footer.Link href="#">Blog</Footer.Link>
          </Footer.Section>

          <Footer.Section title="Company">
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Careers</Footer.Link>
            <Footer.Link href="#">Legal</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.Section>
        </Footer.Grid>

        <Divider />

        <Footer.Bottom>
          <Footer.Copyright>
            © {new Date().getFullYear()} Vayu UI. All rights reserved.
          </Footer.Copyright>
          <div className="flex gap-4">
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Terms of Service</Footer.Link>
          </div>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
      tags: ['default', 'multi-column', 'sections', 'social', 'copyright'],
    },
    {
      title: 'Centered Footer',
      description: 'Centered footer variant with logo, inline navigation links, social icons, and copyright.',
      code: `import { Footer, Typography, Divider } from 'vayu-ui';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function CenteredFooter() {
  return (
    <Footer variant="centered">
      <Footer.Container>
        <Footer.Grid>
          <Footer.Section>
            <div className="flex flex-col items-center gap-4">
              <Footer.Logo href="#">
                <Typography.H5 variant="gradient" className="font-bold">
                  Vayu UI
                </Typography.H5>
              </Footer.Logo>
              <nav className="flex flex-wrap justify-center gap-6 mt-4">
                <Footer.Link href="#">Home</Footer.Link>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">Services</Footer.Link>
                <Footer.Link href="#">Contact</Footer.Link>
              </nav>
              <Footer.Social className="mt-4">
                <Footer.SocialLink href="#" aria-label="Twitter">
                  <Twitter size={18} />
                </Footer.SocialLink>
                <Footer.SocialLink href="#" aria-label="GitHub">
                  <Github size={18} />
                </Footer.SocialLink>
                <Footer.SocialLink href="#" aria-label="Linkedin">
                  <Linkedin size={18} />
                </Footer.SocialLink>
              </Footer.Social>
            </div>
          </Footer.Section>
        </Footer.Grid>
        <Divider />
        <Footer.Bottom>
          <Footer.Copyright>
            © {new Date().getFullYear()} Vayu UI. All rights reserved.
          </Footer.Copyright>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
      tags: ['centered', 'variant', 'single-column'],
    },
    {
      title: 'Minimal Footer',
      description: 'Minimal footer variant with logo, copyright, and social links in a compact bottom bar.',
      code: `import { Footer, Typography } from 'vayu-ui';
import { Github, Twitter } from 'lucide-react';

export default function MinimalFooter() {
  return (
    <Footer variant="minimal">
      <Footer.Container>
        <Footer.Bottom>
          <Footer.Logo href="#">
            <Typography.Label className="font-bold">Vayu UI</Typography.Label>
          </Footer.Logo>
          <Footer.Copyright>© {new Date().getFullYear()} Vayu UI. Inc.</Footer.Copyright>
          <Footer.Social>
            <Footer.SocialLink href="#" aria-label="GitHub">
              <Github size={16} />
            </Footer.SocialLink>
            <Footer.SocialLink href="#" aria-label="Twitter">
              <Twitter size={16} />
            </Footer.SocialLink>
          </Footer.Social>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
      tags: ['minimal', 'variant', 'compact'],
    },
    {
      title: 'Footer with CTA Button',
      description: 'Default footer with a call-to-action section featuring heading, description, and action buttons above the standard bottom bar.',
      code: `import { Footer, Typography, Divider, Button } from 'vayu-ui';

export default function CTAFooter() {
  return (
    <Footer>
      <Footer.Container>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col gap-2">
            <Typography.H5 variant="gradient" className="font-bold">
              Ready to get started?
            </Typography.H5>
            <Typography.P variant="secondary">
              Join thousands of developers building with Vayu UI.
            </Typography.P>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="medium">
              <Button.Text>Get Started</Button.Text>
            </Button>
            <Button variant="outline" size="medium">
              <Button.Text>Documentation</Button.Text>
            </Button>
          </div>
        </div>
        <Divider />
        <Footer.Bottom>
          <Footer.Copyright>
            © {new Date().getFullYear()} Vayu UI. All rights reserved.
          </Footer.Copyright>
          <div className="flex gap-4">
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Terms of Service</Footer.Link>
          </div>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
      tags: ['cta', 'button', 'call-to-action', 'conversion'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'SocialLink without aria-label',
      bad: '<Footer.SocialLink href="https://twitter.com"><Twitter /></Footer.SocialLink>',
      good: '<Footer.SocialLink href="https://twitter.com" aria-label="Twitter"><Twitter /></Footer.SocialLink>',
      reason:
        'Without an aria-label, screen readers announce an unlabeled link. Icon-only links must have a descriptive label identifying the social platform.',
    },
    {
      title: 'Using Footer.Link for in-app navigation',
      bad: '<Footer.Link href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>About</Footer.Link>',
      good: 'Use a router Link component or handle navigation via onClick without overriding native anchor behavior',
      reason:
        'Footer.Link renders a native <a> element. Intercepting clicks with preventDefault and manual navigation breaks middle-click, Ctrl+click, and accessibility expectations. Use your framework\'s Link component for client-side routing instead.',
    },
    {
      title: 'Omitting Footer.Container',
      bad: '<Footer><Footer.Grid>...</Footer.Grid></Footer>',
      good: '<Footer><Footer.Container><Footer.Grid>...</Footer.Grid></Footer.Container></Footer>',
      reason:
        'Footer.Container provides the max-width constraint and responsive horizontal padding. Without it, content stretches edge-to-edge and loses its centered layout.',
    },
    {
      title: 'Nesting Footer.Section inside another nav landmark',
      bad: '<nav><Footer.Section title="Links">...</Footer.Section></nav>',
      good: '<Footer.Section title="Links">...</Footer.Section>',
      reason:
        'Footer.Section already renders an internal <nav> element with aria-label. Nesting it inside another <nav> creates a landmark nesting violation and confuses screen reader landmark navigation.',
    },
    {
      title: 'Using external prop without string children',
      bad: '<Footer.Link href="#" external><strong>Visit</strong></Footer.Link>',
      good: '<Footer.Link href="#" external>Visit our partner site</Footer.Link>',
      reason:
        'The external prop auto-generates an aria-label by appending "(opens in new tab)" to the string children. With non-string children (elements, components), the automatic aria-label cannot be computed and you must provide aria-label manually.',
    },
  ],
};
