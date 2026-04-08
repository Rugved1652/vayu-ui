import { ComponentRegistryEntry } from '../types.js';

export const aspectratioEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'aspectratio',
  name: 'AspectRatio',
  type: 'component',
  category: 'media',

  // ── Description ───────────────────────────────────────
  description:
    'A layout primitive that constrains children to a fixed aspect ratio using CSS aspect-ratio or padding-bottom fallback.',
  longDescription:
    'The AspectRatio component provides a responsive container that maintains a consistent width-to-height ratio. It supports 11 named presets (square, video, photo, landscape, ultrawide, portrait, golden, a4, cinema, iphone, ipad) via native CSS aspect-ratio, and arbitrary numeric ratios via a padding-bottom fallback. Built-in object-fit control applies styles to direct <img> and <video> children. Accessibility is handled through three modes: decorative (hidden from assistive technology), named region (with aria-label + role="region"), and generic container (no semantic role).',
  tags: [
    'aspect-ratio',
    'ratio',
    'responsive',
    'image',
    'video',
    'media',
    'container',
    'layout',
    'placeholder',
    'crop',
    'embed',
    'thumbnail',
  ],
  useCases: [
    'Displaying images in a responsive grid with consistent aspect ratios',
    'Embedding videos that maintain 16:9 proportions across screen sizes',
    'Creating placeholder skeletons with known dimensions while content loads',
    'Building media galleries where all cards share uniform proportions',
    'Rendering device-specific mockups (iPhone, iPad) in marketing pages',
    'Constraining decorative images that should be hidden from screen readers',
    'Creating cinema or ultrawide banners with fixed proportions',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'AspectRatio',
  files: [
    { name: 'AspectRatio.tsx', description: 'Root component with ratio calculation, overflow, object-fit styling, and accessibility logic' },
    { name: 'types.ts', description: 'TypeScript type definitions, preset ratio map, and constant maps for overflow/object-fit' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the component and types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'AspectRatio',
  subComponents: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'ratio',
      type: "number | AspectRatioPreset",
      required: false,
      defaultValue: "'square'",
      description: 'Aspect ratio expressed as width/height. Use a named preset or a numeric value.',
      options: ['square', 'video', 'photo', 'landscape', 'ultrawide', 'portrait', 'golden', 'a4', 'cinema', 'iphone', 'ipad'],
    },
    {
      name: 'overflow',
      type: "'hidden' | 'visible' | 'auto' | 'scroll'",
      required: false,
      defaultValue: "'hidden'",
      description: 'Overflow behavior for the container.',
    },
    {
      name: 'objectFit',
      type: "'cover' | 'contain' | 'fill' | 'scale-down' | 'none'",
      required: false,
      defaultValue: "'cover'",
      description: 'Object-fit applied to direct <img> and <video> children.',
    },
    {
      name: 'decorative',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Marks the container as decorative, hiding it from screen readers with role="presentation" and aria-hidden="true".',
    },
    {
      name: 'rounded',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Adds rounded corners using the design system rounded-surface token.',
    },
    {
      name: 'shadow',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Adds subtle shadow using the design system shadow-surface token.',
    },
    {
      name: 'bordered',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Adds a border using the design system border token.',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label for screen readers. When provided, the container gets role="region" to become a named landmark.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container div.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content to render inside the aspect ratio container, typically an <img> or <video> element.',
    },
  ],
  rendersAs: 'div',

  // ── Variants ──────────────────────────────────────────
  // No variant prop — ratio is a multi-type prop, not a visual variant

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'decorative',
      prop: 'decorative',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, sets role="presentation" and aria-hidden="true" so the container is invisible to assistive technology.',
    },
    {
      name: 'ratio',
      prop: 'ratio',
      isBoolean: false,
      values: ['square', 'video', 'photo', 'landscape', 'ultrawide', 'portrait', 'golden', 'a4', 'cinema', 'iphone', 'ipad'],
      defaultValue: "'square'",
      description: 'Controls the aspect ratio of the container. Presets use native CSS aspect-ratio; numeric values use padding-bottom fallback.',
    },
    {
      name: 'objectFit',
      prop: 'objectFit',
      isBoolean: false,
      values: ['cover', 'contain', 'fill', 'scale-down', 'none'],
      defaultValue: "'cover'",
      description: 'Controls how direct <img> and <video> children fill the container area.',
    },
    {
      name: 'overflow',
      prop: 'overflow',
      isBoolean: false,
      values: ['hidden', 'visible', 'auto', 'scroll'],
      defaultValue: "'hidden'",
      description: 'Controls overflow behavior. Defaults to hidden to clip content that exceeds the ratio bounds.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role',
        description: 'Set to "presentation" when decorative is true. Set to "region" when aria-label is provided (creating a named landmark). No role is set otherwise.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Set to "true" when decorative is true, hiding the container and its children from the accessibility tree.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'When provided by the developer, the container becomes a named region. The component does not generate this attribute automatically.',
        managedByComponent: false,
      },
    ],
    keyboardInteractions: [],
    focusManagement:
      'AspectRatio is a non-interactive layout primitive. No focus management is provided. Focus behavior is delegated entirely to children (e.g., links, buttons, interactive media controls).',
    wcagLevel: 'AA',
    notes:
      'The component supports three accessibility modes: (1) decorative — hides the container from assistive technology, suitable for ornamental images; (2) named region — use aria-label when the container wraps meaningful content that benefits from landmark navigation; (3) generic — no semantic role, children announce based on their own semantics. Always provide alt text on <img> children.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'tailwind-merge' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'AspectRatio is commonly placed inside Card components for image-based content cards',
    },
    {
      slug: 'typography',
      reason: 'Used alongside Typography for image captions, titles, and description overlays within aspect-ratio containers',
    },
    {
      slug: 'button',
      reason: 'Often paired for overlay action buttons on hero images or featured content cards',
    },
    {
      slug: 'divider',
      reason: 'Used between rows of aspect-ratio content in gallery or grid layouts',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Preset Ratios Grid',
      description: 'Multiple preset ratios displayed in a responsive grid with rounded corners and shadows.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function PresetGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <AspectRatio ratio="square" decorative rounded shadow>
        <img src="/photo.jpg" alt="Square" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="video" decorative rounded shadow>
        <img src="/photo.jpg" alt="Video" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="photo" decorative rounded shadow>
        <img src="/photo.jpg" alt="Photo" className="w-full h-full object-cover" />
      </AspectRatio>
    </div>
  );
}`,
      tags: ['presets', 'grid', 'images'],
    },
    {
      title: 'Custom Numeric Ratio',
      description: 'Using a numeric ratio value for a custom aspect ratio not covered by presets.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function CustomRatio() {
  return (
    <div className="max-w-md">
      <AspectRatio ratio={2.5} decorative rounded shadow bordered>
        <div className="flex items-center justify-center h-full bg-muted text-muted-content">
          2.5 : 1
        </div>
      </AspectRatio>
    </div>
  );
}`,
      tags: ['custom', 'numeric', 'ratio'],
    },
    {
      title: 'Video Embed Container',
      description: 'Constraining a video embed to 16:9 ratio with accessible labeling.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function VideoEmbed() {
  return (
    <AspectRatio ratio="video" aria-label="Product demo video" rounded shadow>
      <video src="/demo.mp4" controls className="w-full h-full object-cover">
        <track kind="captions" src="/demo.vtt" srcLang="en" label="English" />
      </video>
    </AspectRatio>
  );
}`,
      tags: ['video', 'embed', 'accessible'],
    },
    {
      title: 'Decorative Image with Overlay',
      description: 'A decorative image with an overlay content layer, hidden from screen readers.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function HeroImage() {
  return (
    <AspectRatio ratio="ultrawide" decorative rounded shadow>
      <img src="/hero.jpg" alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Welcome</h2>
          <p className="text-white/80">Explore our collection</p>
        </div>
      </div>
    </AspectRatio>
  );
}`,
      tags: ['decorative', 'overlay', 'hero'],
    },
    {
      title: 'Device Mockups',
      description: 'Using iPhone and iPad presets for device-specific preview frames.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function DeviceMockups() {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1 max-w-50">
        <AspectRatio ratio="iphone" decorative rounded shadow>
          <img src="/mobile-screen.png" alt="" className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
      <div className="flex-1 max-w-96">
        <AspectRatio ratio="ipad" decorative rounded shadow>
          <img src="/tablet-screen.png" alt="" className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
    </div>
  );
}`,
      tags: ['device', 'mockup', 'iphone', 'ipad'],
    },
    {
      title: 'Object Fit Comparison',
      description: 'Comparing objectFit="cover" vs objectFit="contain" on square containers.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function ObjectFitComparison() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <AspectRatio ratio="square" decorative rounded shadow>
        <img src="/photo.jpg" alt="Cover fit" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="square" objectFit="contain" decorative rounded shadow className="bg-muted">
        <img src="/photo.jpg" alt="Contain fit" className="w-full h-full object-contain" />
      </AspectRatio>
    </div>
  );
}`,
      tags: ['object-fit', 'cover', 'contain', 'comparison'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using ratio={0} or negative ratios',
      bad: '<AspectRatio ratio={0} decorative>...</AspectRatio>',
      good: '<AspectRatio ratio="square" decorative>...</AspectRatio>',
      reason: 'A ratio of 0 or a negative value produces undefined behavior — the padding-bottom fallback divides by the ratio value. Use a named preset or a positive numeric value.',
    },
    {
      title: 'Setting both decorative and aria-label',
      bad: '<AspectRatio decorative aria-label="Product image">...</AspectRatio>',
      good: '<AspectRatio aria-label="Product image">...</AspectRatio>',
      reason: 'When decorative is true, the component sets aria-hidden="true" and removes aria-label. The two props conflict — decorative means "this has no meaning", while aria-label means "this has a meaningful name".',
    },
    {
      title: 'Hardcoding aspect-ratio in className',
      bad: '<AspectRatio ratio="video" className="aspect-3/4">...</AspectRatio>',
      good: '<AspectRatio ratio="portrait">...</AspectRatio>',
      reason: 'Overriding the aspect-ratio via className fights with the component\'s built-in Tailwind classes. Use the ratio prop with a preset or numeric value instead.',
    },
    {
      title: 'Nesting AspectRatio containers',
      bad: '<AspectRatio ratio="video"><AspectRatio ratio="square">...</AspectRatio></AspectRatio>',
      good: '<AspectRatio ratio="video"><div className="w-full h-full">...</div></AspectRatio>',
      reason: 'Nesting AspectRatio components creates conflicting absolute-positioning contexts and unpredictable sizing. Place content directly inside a single AspectRatio.',
    },
  ],
};
