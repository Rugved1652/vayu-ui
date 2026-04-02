export const footerRegistry = {
  component: 'Footer',
  slug: 'footer',
  category: 'Layout',

  complexity: 'compound',

  description:
    'A responsive footer component with multiple layout variants for building site-wide navigation and information sections.',
  ai_summary:
    'Multi-slot footer component with three layout variants (default, centered, minimal). Supports sections, links, social icons, logo, and copyright. Fully accessible with WCAG 2.2 AA compliance. Server Component compatible.',

  intent: [
    'Build site-wide footer navigation',
    'Display multi-column link sections',
    'Show social media links',
    'Present copyright and legal information',
    'Create responsive footer layouts',
  ],
  ai_keywords: [
    'footer',
    'navigation',
    'site-footer',
    'layout',
    'responsive',
    'accessibility',
    'compound',
    'server-component',
    'multi-column',
    'social-links',
  ],

  when_to_use: [
    'Site-wide footer navigation with multiple sections',
    'Multi-column link layouts',
    'Social media link display',
    'Copyright and legal information display',
    'Responsive footer that adapts to screen sizes',
  ],
  when_not_to_use: [
    'Simple single-link footers',
    'In-page navigation components',
    'Modal or dialog footers',
    'Card footers',
    'Header navigation',
  ],

  composition: {
    root: 'Footer',
    slots: [
      'Footer.Container',
      'Footer.Grid',
      'Footer.Section',
      'Footer.Link',
      'Footer.Logo',
      'Footer.Social',
      'Footer.SocialLink',
      'Footer.Copyright',
      'Footer.Divider',
      'Footer.Bottom',
    ],
    structure: [
      'Footer',
      'Footer.Container',
      'Footer.Grid',
      'Footer.Section',
      'Footer.Link',
      'Footer.Logo',
      'Footer.Social',
      'Footer.SocialLink',
      'Footer.Copyright',
      'Footer.Divider',
      'Footer.Bottom',
    ],
    rules: [
      'Footer.Container should wrap all footer content',
      'Footer.Grid organizes sections in responsive columns',
      'Footer.SocialLink must be inside Footer.Social',
      'Footer.SocialLink requires aria-label prop',
      'Footer.Section can contain Footer.Link, Footer.Logo, Footer.Social elements',
      'Footer.Bottom typically contains Footer.Copyright',
      'Footer.Divider separates grid content from bottom section',
    ],
  },

  props: {
    Footer: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the footer.',
      },
      {
        name: 'variant',
        type: '"default" | "minimal" | "centered"',
        required: false,
        default: 'default',
        description: 'The layout variant. Applied via data attributes.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Container': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Content to render.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Grid': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Content to render.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Section': [
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Optional title for the section.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the section.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Link': [
      {
        name: 'href',
        type: 'string',
        required: true,
        description: 'The URL to navigate to.',
      },
      {
        name: 'external',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether to open the link in a new tab.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The link text or content.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Logo': [
      {
        name: 'href',
        type: 'string',
        required: false,
        default: '/',
        description: 'URL for the logo link.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Logo content.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Social': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Social link elements.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.SocialLink': [
      {
        name: 'href',
        type: 'string',
        required: true,
        description: 'The URL to navigate to.',
      },
      {
        name: 'aria-label',
        type: 'string',
        required: true,
        description: 'Accessible label for screen readers (required).',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Icon or content.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Copyright': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Copyright text.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Divider': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
    'Footer.Bottom': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Bottom section content.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes.',
      },
    ],
  },

  variants: [
    {
      name: 'variant',
      values: ['default', 'centered', 'minimal'],
      default: 'default',
      description:
        'Layout variant controlling grid structure and alignment. Default: 4-column grid. Centered: single column with centered content. Minimal: 2-column layout.',
    },
  ],

  states: [],

  responsive: {
    allowed: true,
    patterns: [
      'Default variant: 1 column (mobile) → 2 columns (md) → 4 columns (lg)',
      'Minimal variant: 1 column (mobile) → 2 columns (md)',
      'Centered variant: single column with centered alignment',
      'Footer.Bottom: flex-col (mobile) → flex-row (md)',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-400',
        'ground-600',
        'ground-700',
        'ground-900',
        'ground-950',
        'primary-400',
        'primary-500',
        'primary-600',
      ],
      radius: ['rounded-sm', 'rounded-full'],
      spacing: [
        'px-4',
        'px-6',
        'px-8',
        'py-12',
        'py-2.5',
        'gap-1.5',
        'gap-2',
        'gap-3',
        'gap-4',
        'gap-8',
        'min-w-11',
        'min-h-11',
        'w-3.5',
        'h-3.5',
        'p-2.5',
      ],
      typography: ['font-primary', 'font-secondary', 'text-sm', 'text-lg'],
    },
    recommended: {
      colors: ['ground-50', 'ground-950', 'ground-600', 'ground-400', 'primary-600', 'primary-400'],
      typography: ['font-secondary', 'font-primary'],
    },
    allowed: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-300',
        'ground-400',
        'ground-500',
        'ground-600',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
        'primary-50',
        'primary-100',
        'primary-200',
        'primary-300',
        'primary-400',
        'primary-500',
        'primary-600',
        'primary-700',
        'primary-800',
        'primary-900',
        'primary-950',
      ],
      radius: ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full'],
      typography: ['font-primary', 'font-secondary'],
    },
  },

  examples: [
    {
      name: 'Basic Footer',
      description: 'Default footer with multiple sections and links',
      code: `import { Footer } from "vayu-ui";
import { Twitter, Github } from "lucide-react";

export default function BasicFooter() {
  return (
    <Footer>
      <Footer.Container>
        <Footer.Grid>
          <Footer.Section>
            <Footer.Logo>Logo</Footer.Logo>
            <p>Description</p>
            <Footer.Social>
              <Footer.SocialLink href="#" aria-label="Twitter">
                <Twitter size={18} />
              </Footer.SocialLink>
            </Footer.Social>
          </Footer.Section>
          <Footer.Section title="Links">
            <Footer.Link href="#">Link 1</Footer.Link>
            <Footer.Link href="#">Link 2</Footer.Link>
          </Footer.Section>
        </Footer.Grid>
        <Footer.Divider />
        <Footer.Bottom>
          <Footer.Copyright>© 2024</Footer.Copyright>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
    },
    {
      name: 'Centered Footer',
      description: 'Centered footer variant for minimal sites',
      code: `import { Footer } from "vayu-ui";

export default function CenteredFooter() {
  return (
    <Footer variant="centered">
      <Footer.Container>
        <Footer.Grid>
          <Footer.Section>
            <Footer.Logo>Brand</Footer.Logo>
            <p>Centered content description</p>
          </Footer.Section>
        </Footer.Grid>
        <Footer.Divider />
        <Footer.Bottom>
          <Footer.Copyright>© 2024 Company</Footer.Copyright>
        </Footer.Bottom>
      </Footer.Container>
    </Footer>
  );
}`,
    },
    {
      name: 'External Links',
      description: 'Footer with external links that open in new tabs',
      code: `import { Footer } from "vayu-ui";

export default function ExternalLinksFooter() {
  return (
    <Footer>
      <Footer.Container>
        <Footer.Grid>
          <Footer.Section title="Resources">
            <Footer.Link href="https://docs.example.com" external>
              Documentation
            </Footer.Link>
            <Footer.Link href="https://github.com/example" external>
              GitHub
            </Footer.Link>
          </Footer.Section>
        </Footer.Grid>
      </Footer.Container>
    </Footer>
  );
}`,
    },
  ],

  accessibility: {
    pattern: 'contentinfo landmark',
    standards: ['WCAG 2.2 AA', 'WCAG 1.4.11 Non-text Contrast'],
    keyboard_support: [
      'All interactive elements are keyboard accessible via Tab navigation',
      'Focus rings visible on all interactive elements',
      'External links accessible via Enter key',
    ],
    aria_attributes: [
      'role="contentinfo" on footer element',
      'aria-label on navigation sections (e.g., "Section links")',
      'aria-label on social links container ("Social media links")',
      'role="list" on Footer.Social container',
      'role="separator" on Footer.Divider',
      'aria-orientation="horizontal" on Footer.Divider',
      'External links announce "(opens in new tab)" when child is string',
      'External links have target="_blank" and rel="noopener noreferrer"',
    ],
  },

  anti_patterns: [
    'Do not nest Footer.Social inside Footer.Section with nav element (causes nested navigation landmarks)',
    'Do not omit aria-label on Footer.SocialLink (required for accessibility)',
    'Do not use Footer for in-page navigation',
    'Do not forget to include Footer.Copyright in Footer.Bottom for legal compliance',
    'Do not use minimal variant for complex multi-section footers',
  ],

  dependencies: {
    icons: [],
    utilities: ['clsx'],
    components: [],
  },

  relationships: {
    used_with: [],
    often_inside: ['Layout', 'Page'],
    often_contains: ['Footer.Logo', 'Footer.Social', 'Footer.Link'],
  },

  related_components: [],

  validation_rules: [
    'Footer.SocialLink must have aria-label prop',
    'Footer.Social uses role="list" to prevent nested navigation landmarks',
    'External links should use external prop which adds target="_blank" and rel="noopener noreferrer"',
    'Footer.SocialLink has minimum touch target of 44px (min-w-11 min-h-11)',
    'Footer.Divider uses ground-300 for WCAG 1.4.11 non-text contrast compliance',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add footer'],

  source: {
    file: 'src/components/ui/footer.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/components/footer',
    source_file: 'packages/ui/src/components/ui/footer.tsx',
    extracted: [
      'component',
      'description',
      'props',
      'variants',
      'composition',
      'accessibility',
      'examples',
      'installation',
      'design_tokens',
    ],
    inferred: [
      'ai_keywords',
      'intent',
      'when_to_use',
      'when_not_to_use',
      'responsive_patterns',
      'relationships',
      'validation_rules',
    ],
  },
};
