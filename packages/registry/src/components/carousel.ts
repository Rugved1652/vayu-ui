import { ComponentRegistryEntry } from '../types.js';

export const carouselEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'carousel',
  name: 'Carousel',
  type: 'component',
  category: 'media',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible image/content carousel with auto-play, speed control, thumbnails, and responsive multi-item-per-slide support.',
  longDescription:
    'The Carousel component uses the compound component pattern (Carousel.Viewport, Carousel.Slide, Carousel.Next, Carousel.Previous, Carousel.Bullets, Carousel.PlayPause, Carousel.SpeedControl, Carousel.Gallery) to create fully accessible slideshows. It supports single-item crossfade transitions, multi-item horizontal sliding with responsive breakpoints, auto-play with configurable speed, touch swipe gestures, and full keyboard navigation. Respects prefers-reduced-motion.',
  tags: [
    'carousel',
    'slideshow',
    'gallery',
    'slider',
    'image',
    'autoplay',
    'swipe',
    'testimonial',
    'product-showcase',
    'media',
  ],
  useCases: [
    'Displaying hero image galleries with crossfade transitions and auto-play',
    'Showcasing product cards in a multi-item per slide layout on e-commerce pages',
    'Building testimonial carousels with autoplay and manual navigation controls',
    'Creating responsive image portfolios that adapt the number of visible items per breakpoint',
    'Presenting featured content with thumbnail navigation and speed control',
    'Building landing page hero sections with looping image slideshows',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Carousel',
  files: [
    { name: 'Carousel.tsx', description: 'Root component with state management, navigation logic, and context provider' },
    { name: 'CarouselViewport.tsx', description: 'Overflow container with touch swipe, keyboard navigation, and sliding track wrapper' },
    { name: 'CarouselSlide.tsx', description: 'Individual slide wrapper supporting crossfade (single) and flex (multi-item) layouts' },
    { name: 'CarouselPrevious.tsx', description: 'Previous navigation button with ChevronLeft icon and boundary disable logic' },
    { name: 'CarouselNext.tsx', description: 'Next navigation button with ChevronRight icon and boundary disable logic' },
    { name: 'CarouselBullets.tsx', description: 'Dot pagination indicators with page-aware active state for multi-item mode' },
    { name: 'CarouselPlayPause.tsx', description: 'Toggle button to play/pause auto-play with Play and Pause icons' },
    { name: 'CarouselSpeedControl.tsx', description: 'Speed selector dropdown with options 0.5x, 1x, 1.5x, 2x' },
    { name: 'CarouselGallery.tsx', description: 'Thumbnail strip for direct slide navigation with visual active indicator' },
    { name: 'hooks.ts', description: 'Context hook, usePrefersReducedMotion, and useResolvedItemsPerSlide for responsive breakpoints' },
    { name: 'types.ts', description: 'TypeScript type definitions for all props, context, and responsive breakpoint types' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Carousel',
  subComponents: [
    {
      name: 'Viewport',
      fileName: 'CarouselViewport.tsx',
      description: 'Overflow-hidden container that wraps slides, handles touch swipe gestures and keyboard navigation, and renders the sliding track in multi-item mode',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Carousel.Slide components to render inside the viewport',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the viewport container div',
        },
      ],
    },
    {
      name: 'Slide',
      fileName: 'CarouselSlide.tsx',
      description: 'Individual slide wrapper that adapts between crossfade (single-item) and flex (multi-item) rendering modes',
      props: [
        {
          name: 'index',
          type: 'number',
          required: true,
          description: 'Zero-based position of this slide in the total sequence, used for active state and ARIA labels',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content rendered inside the slide (typically images, cards, or media)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the slide wrapper div',
        },
      ],
    },
    {
      name: 'Previous',
      fileName: 'CarouselPrevious.tsx',
      description: 'Absolutely positioned previous navigation button with ChevronLeft icon, auto-disabled at the first slide or page when loop is off',
      props: [
        {
          name: 'showLabel',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, shows a "Previous" text label alongside the chevron icon',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the button element',
        },
      ],
    },
    {
      name: 'Next',
      fileName: 'CarouselNext.tsx',
      description: 'Absolutely positioned next navigation button with ChevronRight icon, auto-disabled at the last slide or page when loop is off',
      props: [
        {
          name: 'showLabel',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, shows a "Next" text label alongside the chevron icon',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the button element',
        },
      ],
    },
    {
      name: 'Bullets',
      fileName: 'CarouselBullets.tsx',
      description: 'Dot pagination indicators that adapt between per-slide (single-item) and per-page (multi-item) mode with direct navigation on click',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the bullet container div',
        },
      ],
    },
    {
      name: 'PlayPause',
      fileName: 'CarouselPlayPause.tsx',
      description: 'Toggle button that plays or pauses the auto-play slideshow with Play and Pause icons and aria-pressed state',
      props: [
        {
          name: 'showLabel',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, shows "Play" or "Pause" text label alongside the icon',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the button element',
        },
      ],
    },
    {
      name: 'SpeedControl',
      fileName: 'CarouselSpeedControl.tsx',
      description: 'Playback speed selector dropdown with options 0.5x, 1x, 1.5x, 2x that adjusts the auto-play interval',
      props: [
        {
          name: 'showLabel',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'When true, shows a "Speed:" label before the select dropdown',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the wrapper div',
        },
      ],
    },
    {
      name: 'Gallery',
      fileName: 'CarouselGallery.tsx',
      description: 'Horizontally scrollable thumbnail strip for direct slide navigation with visual active indicator border',
      props: [
        {
          name: 'items',
          type: 'GalleryItem[]',
          required: true,
          description: 'Array of { src, alt } objects for thumbnail images, must match totalItems count',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the gallery container div',
        },
      ],
    },
  ],

  // ── Internal Hooks ────────────────────────────────────
  hooks: ['useCarouselContext', 'usePrefersReducedMotion', 'useResolvedItemsPerSlide'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'totalItems',
      type: 'number',
      required: true,
      description: 'Total number of slides in the carousel. Must match the number of Carousel.Slide children rendered.',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Enables automatic slide advancement at the configured interval',
    },
    {
      name: 'interval',
      type: 'number',
      required: false,
      defaultValue: '3000',
      description: 'Time in milliseconds between auto-play slide transitions. Actual interval is divided by the current speed multiplier.',
    },
    {
      name: 'loop',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, wraps from last slide back to first. When false, stops at boundaries and disables navigation buttons.',
    },
    {
      name: 'defaultSpeed',
      type: 'SpeedMultiplier',
      required: false,
      defaultValue: '1',
      description: 'Initial playback speed multiplier for auto-play',
      options: ['0.5', '1', '1.5', '2'],
    },
    {
      name: 'defaultIndex',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Zero-based index of the slide to show initially on mount',
    },
    {
      name: 'itemsPerSlide',
      type: 'ItemsPerSlide',
      required: false,
      defaultValue: '1',
      description: 'Number of items visible per slide. Accepts a static number or a responsive object { base, sm?, md?, lg?, xl?, 2xl? } matching Tailwind breakpoints. Values > 1 switch from crossfade to horizontal sliding track.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Carousel sub-components (Viewport, Slide, Previous, Next, Bullets, PlayPause, SpeedControl, Gallery)',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container div',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'playing',
      prop: 'autoPlay / internal isPlaying',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls whether the carousel auto-advances slides. Toggled by PlayPause button, paused on hover, and stops at the end when loop is false.',
    },
    {
      name: 'pausedByHover',
      prop: 'internal isPausedByHover',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Temporarily pauses auto-play while the mouse hovers over the carousel region. Resumes on mouse leave.',
    },
    {
      name: 'speed',
      prop: 'defaultSpeed / setSpeed',
      isBoolean: false,
      values: ['0.5', '1', '1.5', '2'],
      defaultValue: '1',
      description: 'Playback speed multiplier. Effective interval = interval / speed. Higher values advance slides faster.',
    },
    {
      name: 'currentIndex',
      prop: 'defaultIndex / internal state',
      isBoolean: false,
      defaultValue: '0',
      description: 'The zero-based index of the currently visible slide (or page start in multi-item mode). Advanced by navigation and auto-play.',
    },
    {
      name: 'looping',
      prop: 'loop',
      isBoolean: true,
      defaultValue: 'true',
      description: 'When true, navigation wraps around from last to first. When false, navigation buttons are disabled at boundaries.',
    },
    {
      name: 'reducedMotion',
      prop: 'prefers-reduced-motion (system)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Automatically detected from the user OS preference. When true, auto-play is suppressed to prevent motion.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onMouseEnter',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires when the mouse enters the carousel region. Pauses auto-play by setting isPausedByHover to true.',
    },
    {
      name: 'onMouseLeave',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires when the mouse leaves the carousel region. Resumes auto-play by setting isPausedByHover to false.',
    },
    {
      name: 'onTouchStart (Viewport)',
      signature: '(event: React.TouchEvent<HTMLDivElement>) => void',
      description: 'Records the starting X position of a touch gesture for swipe detection.',
    },
    {
      name: 'onTouchEnd (Viewport)',
      signature: '(event: React.TouchEvent<HTMLDivElement>) => void',
      description: 'Completes swipe detection; if the gesture exceeds 50px horizontal, triggers goNext or goPrevious.',
    },
    {
      name: 'onKeyDown (Viewport)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Handles ArrowLeft (goPrevious), ArrowRight (goNext), Home (goTo first), End (goTo last) keyboard navigation.',
    },
    {
      name: 'onClick (Next/Previous)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Triggers goNext or goPrevious navigation. Disabled at boundaries when loop is false.',
    },
    {
      name: 'onClick (Bullets)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Navigates directly to the clicked bullet page or slide index.',
    },
    {
      name: 'onClick (PlayPause)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Toggles the auto-play state between playing and paused.',
    },
    {
      name: 'onChange (SpeedControl)',
      signature: '(event: React.ChangeEvent<HTMLSelectElement>) => void',
      description: 'Sets the playback speed multiplier from the selected option value.',
    },
    {
      name: 'onClick (Gallery)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Navigates directly to the clicked thumbnail slide index.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'region',
    attributes: [
      {
        name: 'aria-roledescription="carousel"',
        description: 'Applied to the root div to communicate the carousel pattern to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Image carousel"',
        description: 'Applied to the root div as a persistent label for the carousel region.',
        managedByComponent: true,
      },
      {
        name: 'aria-roledescription="slide"',
        description: 'Applied to each Carousel.Slide div to identify it as a slide within the carousel.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Slide)',
        description: 'Applied to each Slide with value "Slide N" (e.g. "Slide 1", "Slide 2") for identification.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Slide)',
        description: 'Applied to inactive slides to hide them from screen readers. Only the visible slide(s) are accessible.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description: 'Applied to a visually hidden div inside the Viewport to announce slide/page changes to screen readers without interrupting.',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic="true"',
        description: 'Applied alongside aria-live to ensure the entire live region content is announced atomically.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Viewport)',
        description: 'Dynamic label reading "Slide N of M" (single-item) or "Page N of M" (multi-item) to convey current position.',
        managedByComponent: true,
      },
      {
        name: 'aria-pressed (PlayPause)',
        description: 'Applied to the play/pause button; true when playing, false when paused.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (PlayPause)',
        description: 'Dynamic label reading "Pause slideshow" or "Play slideshow" based on current state.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (SpeedControl)',
        description: 'Applied to the speed select element with value "Playback speed".',
        managedByComponent: true,
      },
      {
        name: 'role="tablist" (Bullets)',
        description: 'Applied to the bullet container to indicate a tab-like selection interface.',
        managedByComponent: true,
      },
      {
        name: 'role="tab" / aria-selected (Bullets)',
        description: 'Applied to each bullet button; aria-selected is true on the active bullet.',
        managedByComponent: true,
      },
      {
        name: 'aria-current (Bullets)',
        description: 'Applied to the active bullet with value "true" for additional current-item semantics.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Gallery)',
        description: 'Applied to each thumbnail button with value "Go to slide N: {alt}" for descriptive navigation.',
        managedByComponent: true,
      },
      {
        name: 'aria-current (Gallery)',
        description: 'Applied to the active thumbnail with value "true".',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Icons)',
        description: 'Applied to all decorative icons (ChevronLeft, ChevronRight, Play, Pause) since they are supplementary to the text labels.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight',
        behavior: 'Advances to the next slide (single-item) or next page (multi-item). Wraps if loop is enabled.',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Goes to the previous slide (single-item) or previous page (multi-item). Wraps if loop is enabled.',
      },
      {
        key: 'Home',
        behavior: 'Jumps directly to the first slide or page.',
      },
      {
        key: 'End',
        behavior: 'Jumps directly to the last slide (single-item) or last page start (multi-item).',
      },
    ],
    focusManagement:
      'The viewport has tabIndex={0} for keyboard focus. Navigation buttons receive standard button focus. Bullets and gallery thumbnails are focusable buttons with focus-visible ring styles.',
    wcagLevel: 'AA',
    notes:
      'The carousel respects prefers-reduced-motion by suppressing auto-play. All slides have aria-roledescription="slide" and dynamic aria-hidden. The live region announces position changes politely. Touch swipe threshold is 50px to prevent accidental navigation.',
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
      slug: 'card',
      reason: 'Often used inside Carousel.Slide to display product cards, testimonials, or content blocks',
    },
    {
      slug: 'badge',
      reason: 'Used to overlay status indicators (e.g. "New", "Sale") on carousel product slides',
    },
    {
      slug: 'avatar',
      reason: 'Commonly featured in testimonial carousels alongside quote text',
    },
    {
      slug: 'button',
      reason: 'Used for carousel section CTAs or custom navigation controls outside the built-in Next/Previous',
    },
    {
      slug: 'skeleton',
      reason: 'Used as placeholder content inside Carousel.Slide while images are loading',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Auto-Play Carousel',
      description: 'Single-item crossfade carousel with auto-play, play/pause, speed control, navigation buttons, bullet indicators, and thumbnail gallery.',
      code: `import { Carousel, type GalleryItem } from 'vayu-ui';

const galleryItems: GalleryItem[] = [
  { src: 'https://picsum.photos/seed/slide1/800/400', alt: 'Abstract Landscape 1' },
  { src: 'https://picsum.photos/seed/slide2/800/400', alt: 'Abstract Landscape 2' },
  { src: 'https://picsum.photos/seed/slide3/800/400', alt: 'Abstract Landscape 3' },
  { src: 'https://picsum.photos/seed/slide4/800/400', alt: 'Abstract Landscape 4' },
  { src: 'https://picsum.photos/seed/slide5/800/400', alt: 'Abstract Landscape 5' },
];

export default function BasicCarouselDemo() {
  return (
    <Carousel totalItems={galleryItems.length} autoPlay={true} interval={3000}>
      <div className="flex justify-between items-center bg-sidebar p-3 rounded-lg border border-border">
        <Carousel.PlayPause />
        <Carousel.SpeedControl />
      </div>

      <div className="relative group mt-4">
        <Carousel.Viewport>
          {galleryItems.map((item, index) => (
            <Carousel.Slide key={index} index={index}>
              <div className="aspect-video w-full bg-elevated flex items-center justify-center">
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            </Carousel.Slide>
          ))}
        </Carousel.Viewport>

        <Carousel.Previous />
        <Carousel.Next />
      </div>

      <Carousel.Bullets />

      <div className="mt-6 pt-4 border-t border-border">
        <Carousel.Gallery items={galleryItems} />
      </div>
    </Carousel>
  );
}`,
      tags: ['basic', 'autoplay', 'single-item', 'crossfade', 'gallery'],
    },
    {
      title: 'Responsive Multi-Item Carousel',
      description: 'Product showcase carousel using itemsPerSlide with responsive breakpoints — 1 item on mobile, 2 on sm, 3 on lg. Uses horizontal sliding track transitions.',
      code: `import { Carousel, type GalleryItem } from 'vayu-ui';

const productItems: GalleryItem[] = [
  { src: 'https://picsum.photos/seed/prod1/400/400', alt: 'Product 1' },
  { src: 'https://picsum.photos/seed/prod2/400/400', alt: 'Product 2' },
  { src: 'https://picsum.photos/seed/prod3/400/400', alt: 'Product 3' },
  { src: 'https://picsum.photos/seed/prod4/400/400', alt: 'Product 4' },
  { src: 'https://picsum.photos/seed/prod5/400/400', alt: 'Product 5' },
  { src: 'https://picsum.photos/seed/prod6/400/400', alt: 'Product 6' },
  { src: 'https://picsum.photos/seed/prod7/400/400', alt: 'Product 7' },
  { src: 'https://picsum.photos/seed/prod8/400/400', alt: 'Product 8' },
];

export default function MultiItemCarouselDemo() {
  return (
    <Carousel
      totalItems={productItems.length}
      itemsPerSlide={{ base: 1, sm: 2, lg: 3 }}
      loop={true}
      autoPlay={true}
      interval={4000}
    >
      <div className="relative group mt-4">
        <Carousel.Viewport>
          {productItems.map((item, index) => (
            <Carousel.Slide key={index} index={index}>
              <div className="aspect-square bg-elevated rounded-surface border border-border overflow-hidden p-2">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-surface"
                />
              </div>
            </Carousel.Slide>
          ))}
        </Carousel.Viewport>

        <Carousel.Previous />
        <Carousel.Next />
      </div>

      <Carousel.Bullets />
    </Carousel>
  );
}`,
      tags: ['multi-item', 'responsive', 'product-showcase', 'sliding'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mismatching totalItems and rendered slides',
      bad: '<Carousel totalItems={5}>{items.slice(0, 3).map(...)}</Carousel>',
      good: '<Carousel totalItems={items.length}>{items.map(...)}</Carousel>',
      reason: 'totalItems must exactly match the number of Carousel.Slide children. A mismatch breaks bullet count, navigation boundaries, ARIA labels, and auto-play end detection.',
    },
    {
      title: 'Using sub-components outside Carousel',
      bad: '<div><Carousel.Slide index={0}>...</Carousel.Slide></div>',
      good: '<Carousel totalItems={1}><Carousel.Viewport><Carousel.Slide index={0}>...</Carousel.Slide></Carousel.Viewport></Carousel>',
      reason: 'All sub-components depend on CarouselContext. Using them outside the root Carousel throws a runtime error.',
    },
    {
      title: 'Skipping the Viewport wrapper',
      bad: '<Carousel totalItems={3}><Carousel.Slide index={0}>...</Carousel.Slide></Carousel>',
      good: '<Carousel totalItems={3}><Carousel.Viewport><Carousel.Slide index={0}>...</Carousel.Slide></Carousel.Viewport></Carousel>',
      reason: 'Slides must be inside Carousel.Viewport which provides overflow-hidden, touch handling, keyboard navigation, and the sliding track in multi-item mode.',
    },
    {
      title: 'Using itemsPerSlide with non-integer values',
      bad: '<Carousel totalItems={6} itemsPerSlide={2.5}>',
      good: '<Carousel totalItems={6} itemsPerSlide={{ base: 1, md: 2, lg: 3 }}>',
      reason: 'itemsPerSlide must be a positive integer. Non-integer values produce broken flex calculations and undefined slide widths. Use responsive breakpoints instead of fractional values.',
    },
    {
      title: 'Placing Next/Previous outside a relative container',
      bad: '<Carousel.Viewport>...<Carousel.Next /></Carousel.Viewport>',
      good: '<div className="relative"><Carousel.Viewport>...</Carousel.Viewport><Carousel.Previous /><Carousel.Next /></div>',
      reason: 'Next and Previous are absolutely positioned (absolute right-2 / left-2). They need a relative-positioned parent to anchor correctly over the viewport.',
    },
  ],
};
