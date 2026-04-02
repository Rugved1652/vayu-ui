export const cardRegistry = {
  component: 'Card',
  slug: 'card',
  category: 'containers',

  complexity: 'compound' as const,

  description:
    'A compound card component with header, media, content, and footer sub-components. Supports interactive and linked cards.',
  ai_summary:
    'A compound container component that groups related content into an elevated surface with optional media, header, body content, and footer actions. Supports interactive (keyboard-accessible) and linked (anchor-based) variants for clickable cards.',

  intent: [
    'Display grouped content in an elevated container',
    'Create clickable cards with keyboard accessibility',
    'Render linked cards as navigation elements',
    'Show media-rich content with overlays',
    'Present user profiles with avatar and actions',
  ],
  ai_keywords: [
    'card',
    'container',
    'panel',
    'section',
    'interactive',
    'clickable',
    'linked',
    'elevated',
    'media',
    'header',
    'footer',
    'wcag',
  ],

  when_to_use: [
    'Displaying grouped content that benefits from visual separation',
    'Creating clickable or tappable content areas',
    'Showing navigation items as linked cards',
    'Presenting media content with titles and descriptions',
    'Building user profile cards with avatar and actions',
    'Creating product cards with images and details',
  ],
  when_not_to_use: [
    'Simple inline content (use Typography instead)',
    'Form inputs (use Input components instead)',
    'Navigation menus (use Navbar or Menu components)',
    'Modal dialogs (use Dialog component instead)',
    "When content doesn't need visual grouping",
  ],

  composition: {
    root: 'Card',
    slots: ['Card.Header', 'Card.Media', 'Card.Content', 'Card.Footer'],
    structure: ['Card', 'Card.Header', 'Card.Media', 'Card.Content', 'Card.Footer'],
    rules: [
      'Card sub-components can be used in any order',
      'Card.Media extends to card edges with negative margin styling',
      'Card.Footer is designed for action elements like buttons',
      'Card.Header supports avatar, title, subtitle, and action props',
      'All sub-components are optional - use only what you need',
    ],
  },

  props: {
    Card: [
      {
        name: 'interactive',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Make the entire card clickable with keyboard support (Enter/Space)',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        description: 'Render the card as an anchor element with this URL',
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: "Link target attribute (e.g., '_blank' for new tab)",
      },
      {
        name: 'rel',
        type: 'string',
        required: false,
        description: "Anchor rel attribute; defaults to 'noopener noreferrer' for target='_blank'",
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable all interactions and reduce opacity',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Card sub-components (Header, Media, Content, Footer)',
      },
      {
        name: 'onClick',
        type: '() => void',
        required: false,
        description: 'Click handler - automatically makes card interactive',
      },
    ],
    'Card.Header': [
      {
        name: 'title',
        type: 'ReactNode',
        required: false,
        description: 'Main heading text rendered as h3',
      },
      {
        name: 'subtitle',
        type: 'ReactNode',
        required: false,
        description: 'Secondary text displayed below the title',
      },
      {
        name: 'action',
        type: 'ReactNode',
        required: false,
        description: 'Trailing element on the right side (e.g., button, badge)',
      },
      {
        name: 'avatar',
        type: 'ReactNode',
        required: false,
        description: 'Leading icon or avatar on the left side',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Card.Media': [
      {
        name: 'src',
        type: 'string',
        required: true,
        description: 'Image source URL',
      },
      {
        name: 'alt',
        type: 'string',
        required: true,
        description: 'Alt text for accessibility',
      },
      {
        name: 'aspectRatio',
        type: 'string',
        required: false,
        default: '16/9',
        description: 'CSS aspect-ratio value',
      },
      {
        name: 'fit',
        type: "'cover' | 'contain' | 'fill'",
        required: false,
        default: 'cover',
        description: 'Object-fit behavior for the image',
      },
      {
        name: 'overlay',
        type: 'ReactNode',
        required: false,
        description: 'Content rendered on top of the image with gradient overlay',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Card.Content': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Body content text or elements',
      },
    ],
    'Card.Footer': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Action elements (buttons, links)',
      },
    ],
  },

  variants: [
    {
      name: 'fit',
      values: ['cover', 'contain', 'fill'],
      default: 'cover',
      description: 'Object-fit behavior for Card.Media images',
    },
    {
      name: 'interactive',
      values: ['true', 'false'],
      default: 'false',
      description: 'Makes card clickable with keyboard support',
    },
    {
      name: 'disabled',
      values: ['true', 'false'],
      default: 'false',
      description: 'Disables all card interactions',
    },
  ],

  states: ['hover', 'focus-visible', 'disabled'],

  responsive: {
    allowed: true,
    patterns: [
      'Card fills available width by default',
      'Use max-w-* utilities to constrain card width',
      'Aspect ratio can be responsive with inline styles',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'bg-white',
        'dark:bg-ground-900',
        'border-ground-200',
        'dark:border-ground-800',
        'text-ground-900',
        'dark:text-ground-50',
        'text-ground-500',
        'dark:text-ground-400',
        'text-ground-700',
        'dark:text-ground-300',
        'text-primary-500',
        'bg-primary-500',
        'text-primary-600',
        'dark:text-primary-400',
      ],
      radius: ['rounded-lg', 'rounded-t-[inherit]', 'rounded-b-[inherit]', 'rounded-full'],
      border: ['border', 'border-t'],
      spacing: ['p-5', 'p-4', 'gap-3', 'gap-2', 'pt-2', 'mt-0.5'],
      typography: [
        'text-lg',
        'text-sm',
        'font-semibold',
        'font-primary',
        'font-secondary',
        'leading-tight',
        'leading-snug',
        'leading-relaxed',
        'truncate',
      ],
      shadow: ['shadow-outer', 'hover:shadow-lg'],
    },
    recommended: {
      colors: ['bg-white', 'dark:bg-ground-900', 'text-ground-900', 'dark:text-ground-50'],
      radius: ['rounded-lg'],
      spacing: ['p-5', 'gap-3'],
    },
    allowed: {
      colors: [
        'bg-white',
        'dark:bg-ground-900',
        'border-ground-200',
        'dark:border-ground-800',
        'text-ground-900',
        'dark:text-ground-50',
        'text-ground-500',
        'dark:text-ground-400',
        'text-ground-700',
        'dark:text-ground-300',
      ],
      radius: ['rounded-lg', 'rounded-xl', 'rounded-2xl'],
      border: ['border', 'border-t'],
      spacing: ['p-3', 'p-4', 'p-5', 'p-6', 'gap-2', 'gap-3', 'gap-4'],
      typography: ['text-sm', 'text-base', 'text-lg'],
    },
  },

  examples: [
    {
      name: 'Basic Card',
      description: 'Complete card with all sub-components',
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Media src="/photo.jpg" alt="Photo" />
  <Card.Header title="Title" subtitle="Subtitle" />
  <Card.Content>Body text.</Card.Content>
  <Card.Footer>
    <button>Action</button>
  </Card.Footer>
</Card>`,
    },
    {
      name: 'Interactive Card',
      description: 'Clickable card with keyboard support',
      code: `import { Card } from "vayu-ui";

<Card interactive onClick={() => console.log("clicked")}>
  <Card.Header title="Clickable Card" />
  <Card.Content>
    This card is focusable and responds to Enter/Space keys.
  </Card.Content>
</Card>`,
    },
    {
      name: 'Linked Card',
      description: 'Card rendered as anchor element',
      code: `import { Card } from "vayu-ui";

<Card href="/details" target="_blank">
  <Card.Header title="Link Card" />
</Card>`,
    },
    {
      name: 'Disabled Card',
      description: 'Non-interactive card with reduced opacity',
      code: `import { Card } from "vayu-ui";

<Card disabled interactive>
  <Card.Header
    title="Disabled Card"
    subtitle="Pointer events are blocked"
  />
</Card>`,
    },
    {
      name: 'Card with Avatar and Action',
      description: 'User profile card with avatar and action button',
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Header
    avatar={
      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
        JD
      </div>
    }
    title="John Doe"
    subtitle="Software Engineer"
    action={
      <button className="text-sm text-primary-600">Follow</button>
    }
  />
  <Card.Content>
    Building beautiful user interfaces.
  </Card.Content>
</Card>`,
    },
    {
      name: 'Card with Media Overlay',
      description: 'Image with gradient overlay content',
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Media
    src="/hero.jpg"
    alt="Hero image"
    overlay={
      <span className="text-white font-semibold">Featured</span>
    }
  />
  <Card.Header title="Featured Content" />
</Card>`,
    },
  ],

  accessibility: {
    pattern: 'WCAG 2.2 AA compliant interactive container',
    standards: [
      'WCAG 2.2 AA - Focus visible styling with outline',
      'WCAG 2.1.1 - Keyboard accessible interactive cards',
      'WCAG 2.4.11 - Focus appearance with visible outline',
      'Semantic HTML with h3 for card titles',
      "Automatic rel='noopener noreferrer' for external links",
    ],
    keyboard_support: [
      'Tab: Move focus to/from the card',
      'Enter: Activate interactive card (when interactive=true)',
      'Space: Activate interactive card (when interactive=true)',
    ],
    aria_attributes: [
      "role='button': Applied to interactive cards without href",
      "tabIndex='0': Makes interactive cards focusable",
      'aria-disabled: Indicates disabled state',
      "aria-hidden='true': Applied to decorative avatar elements",
    ],
  },

  anti_patterns: [
    'Using interactive cards without an onClick handler',
    'Missing alt text on Card.Media images',
    'Nesting interactive cards inside other interactive elements',
    'Using Card.Header title without providing meaningful heading text',
    'Relying solely on color to convey card state',
    'Using disabled cards when the content should be hidden instead',
  ],

  dependencies: {
    utilities: ['clsx'],
  },

  relationships: {
    used_with: ['Button', 'Typography', 'Avatar', 'Badge', 'Skeleton'],
    often_inside: ['Container', 'Grid', 'Stack', 'Section', 'Dialog'],
    often_contains: ['Typography', 'Button', 'Badge', 'Avatar'],
  },

  related_components: ['Button', 'Typography', 'Avatar', 'Badge'],

  validation_rules: [
    'Card.Media requires both src and alt props',
    'Interactive cards should have an onClick handler defined',
    "External links (target='_blank') automatically receive rel='noopener noreferrer'",
    'Disabled cards ignore all interactive props',
    'Card.Header title should be meaningful for accessibility',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add card'],

  source: {
    file: 'packages/ui/src/components/ui/card.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/card',
    source_file: 'packages/ui/src/components/ui/card.tsx',
    extracted: [
      'component',
      'description',
      'props',
      'variants',
      'examples',
      'accessibility',
      'installation',
      'source',
    ],
    inferred: [
      'ai_summary',
      'intent',
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'composition',
      'responsive',
      'anti_patterns',
      'dependencies',
      'relationships',
      'validation_rules',
      'design_tokens',
    ],
  },
};

export default cardRegistry;
