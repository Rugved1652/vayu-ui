import { RegistryItem } from '..';

export const aspectRatioRegistry: RegistryItem = {
  component: 'AspectRatio',
  slug: 'aspectratio',
  category: 'layout',
  complexity: 'simple',

  description:
    'A layout primitive that constrains children to a specific aspect ratio. Uses native Tailwind classes for presets and a padding-bottom fallback for custom numeric ratios.',
  ai_summary:
    'AspectRatio is a simple layout component that maintains a fixed width-to-height ratio. It wraps content in a container that scales proportionally, ideal for images, videos, and responsive layouts. Supports 11 presets (square, video, photo, etc.) and custom numeric ratios.',

  intent: [
    'Maintain consistent aspect ratios for images and videos',
    'Create responsive containers that scale proportionally',
    'Build media grids with uniform dimensions',
    'Implement device-specific mockups (iPhone, iPad)',
  ],
  ai_keywords: [
    'aspect-ratio',
    'layout',
    'responsive',
    'images',
    'video',
    'container',
    'proportional',
    'media',
    'ratio',
  ],

  when_to_use: [
    'Displaying images or videos with consistent dimensions',
    'Creating responsive media containers',
    'Building product card image areas',
    'Implementing video player containers',
    'Creating device screen mockups',
  ],
  when_not_to_use: [
    'Content with variable or unknown aspect ratios',
    'Fluid layouts that need to adapt to content height',
    'Simple spacing or margin use cases',
  ],

  composition: {
    root: 'AspectRatio',
    slots: [],
    structure: ['AspectRatio'],
    rules: [
      'Children are positioned absolutely within the container',
      'The inner wrapper fills the entire container space',
      'objectFit styles apply only to direct img/video children',
    ],
  },

  props: {
    AspectRatio: [
      {
        name: 'ratio',
        type: 'number | "square" | "video" | "photo" | "landscape" | "ultrawide" | "portrait" | "golden" | "a4" | "cinema" | "iphone" | "ipad"',
        required: false,
        default: 'square',
        description:
          'The desired aspect ratio (width / height). Use a preset name or numeric value.',
      },
      {
        name: 'overflow',
        type: '"hidden" | "visible" | "auto" | "scroll"',
        required: false,
        default: 'hidden',
        description: 'Controls overflow behavior of the container.',
      },
      {
        name: 'objectFit',
        type: '"cover" | "contain" | "fill" | "scale-down" | "none"',
        required: false,
        default: 'cover',
        description: 'Object-fit applied to direct <img> or <video> children.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        required: false,
        default: false,
        description:
          "If true, sets role='presentation' and aria-hidden='true' to hide from screen readers.",
      },
      {
        name: 'aria-label',
        type: 'string',
        required: false,
        description: 'Accessible label for screen readers when content is meaningful.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply to the container.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Content to render inside the aspect ratio container.',
      },
    ],
  },

  variants: [
    {
      name: 'ratio',
      values: [
        'square',
        'video',
        'photo',
        'landscape',
        'ultrawide',
        'portrait',
        'golden',
        'a4',
        'cinema',
        'iphone',
        'ipad',
      ],
      default: 'square',
      description:
        'Preset aspect ratios: square (1:1), video (16:9), photo (4:3), landscape (3:2), ultrawide (21:9), portrait (9:16), golden (1.618:1), a4 (1.414:1), cinema (2.39:1), iphone (19.5:9), ipad (4:3)',
    },
    {
      name: 'overflow',
      values: ['hidden', 'visible', 'auto', 'scroll'],
      default: 'hidden',
      description: 'Overflow behavior for the container.',
    },
    {
      name: 'objectFit',
      values: ['cover', 'contain', 'fill', 'scale-down', 'none'],
      default: 'cover',
      description: 'Object-fit behavior for direct img/video children.',
    },
  ],

  states: [],

  responsive: {
    allowed: true,
    patterns: [
      'Width adapts to parent container',
      'Height calculated automatically from ratio',
      'Works with Tailwind responsive prefixes on className',
    ],
  },

  design_tokens: {
    used: {},
    recommended: {
      radius: ['rounded', 'rounded-lg', 'rounded-xl'],
      border: ['border', 'border-ground-200'],
      spacing: ['p-4', 'm-2'],
    },
    allowed: {
      radius: [
        'rounded',
        'rounded-sm',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-full',
      ],
      border: ['border', 'border-0', 'border-2', 'border-ground-*'],
      spacing: ['p-*', 'm-*', 'gap-*'],
    },
  },

  examples: [
    {
      name: 'preset',
      description: 'Using a named preset for standard video dimensions.',
      code: `<AspectRatio ratio="video" className="bg-gray-100">
  <div className="flex items-center justify-center h-full">
    16:9 Container
  </div>
</AspectRatio>`,
    },
    {
      name: 'custom',
      description: 'Using a custom numeric ratio for specific layouts.',
      code: `<AspectRatio ratio={2.5} className="bg-gray-100">
  <img src="/banner.jpg" alt="Wide banner" className="w-full h-full" />
</AspectRatio>`,
    },
    {
      name: 'decorative',
      description: 'A decorative container for an icon, hidden from screen readers.',
      code: `<AspectRatio ratio="square" decorative className="w-24 h-24 bg-gray-200 rounded-full">
  <UserIcon className="w-full h-full p-4" />
</AspectRatio>`,
    },
    {
      name: 'image-with-cover',
      description: 'Image with cover fit and accessible label.',
      code: `<AspectRatio
  ratio="video"
  aria-label="Mountain landscape image"
  className="rounded overflow-hidden"
>
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    alt="Mountain landscape"
    className="w-full h-full object-cover"
  />
</AspectRatio>`,
    },
    {
      name: 'multiple-ratios',
      description: 'Displaying multiple aspect ratio presets side by side.',
      code: `<div className="grid grid-cols-3 gap-4">
  <AspectRatio ratio="square" decorative className="bg-gray-100 rounded">
    <div className="flex items-center justify-center h-full text-sm">Square</div>
  </AspectRatio>
  <AspectRatio ratio="video" decorative className="bg-gray-100 rounded">
    <div className="flex items-center justify-center h-full text-sm">Video</div>
  </AspectRatio>
  <AspectRatio ratio="portrait" decorative className="bg-gray-100 rounded">
    <div className="flex items-center justify-center h-full text-sm">Portrait</div>
  </AspectRatio>
</div>`,
    },
  ],

  accessibility: {
    pattern:
      "Uses role='region' when aria-label is provided for meaningful content. Uses role='presentation' with aria-hidden='true' when decorative prop is set.",
    standards: [
      'WCAG 2.1 landmarks',
      'Screen reader compatibility',
      'Reduced motion respected (no animations)',
    ],
    keyboard_support: [],
    aria_attributes: [
      'aria-label: Provides accessible name when content has meaning',
      'aria-hidden: Set to true when decorative prop is used',
      "role: Set to 'region' with label, 'presentation' when decorative",
    ],
  },

  anti_patterns: [
    'Do not apply margins to the AspectRatio container itself - wrap in a div instead',
    'Do not rely on objectFit prop for deeply nested images - apply object-fit manually',
    'Do not forget aria-label for meaningful content like charts or graphs',
  ],

  dependencies: {
    icons: [],
    utilities: ['cn'],
    components: [],
  },

  relationships: {
    used_with: ['Image', 'Video', 'Card', 'Avatar'],
    often_inside: ['Card', 'Dialog', 'Modal', 'Grid'],
    often_contains: ['img', 'video', 'div', 'Icon components'],
  },

  related_components: ['Container', 'Grid', 'Stack'],

  validation_rules: [
    'AspectRatio container should not have margin applied directly',
    'objectFit prop only affects direct img/video children via CSS selector',
    'Provide aria-label when container holds meaningful content',
    'Use decorative prop for purely visual containers',
  ],

  installation: ['npx vayu-ui init    # Add Theme CSS if not added', 'npx vayu-ui add aspectratio'],

  source: {
    file: 'packages/ui/src/components/ui/aspectratio.tsx',
    language: 'TypeScript',
    framework: 'React',
  },

  meta: {
    doc_url: '/docs/components/aspectratio',
    source_file: 'packages/ui/src/components/ui/aspectratio.tsx',
    extracted: [
      'component',
      'slug',
      'category',
      'description',
      'props',
      'variants',
      'examples',
      'accessibility',
      'anti_patterns',
      'installation',
    ],
    inferred: [
      'complexity',
      'ai_summary',
      'intent',
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'composition',
      'responsive',
      'design_tokens',
      'dependencies',
      'relationships',
      'related_components',
      'validation_rules',
    ],
  },
};
