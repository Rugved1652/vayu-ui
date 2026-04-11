import { ComponentRegistryEntry } from '../types.js';

export const marqueeEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'marquee',
  name: 'Marquee',
  type: 'component',
  category: 'animation',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible scrolling content marquee with pause/play controls, speed settings, directional control, multiple loop modes, and edge gradient fade.',
  longDescription:
    'The Marquee component renders horizontally scrolling content with configurable speed, direction, and loop behavior. It supports infinite seamless looping, finite iteration counts, single-pass, and ping-pong (alternating direction) modes. A built-in pause/play button provides WCAG 2.2.2 compliance for moving content, and the component automatically respects the prefers-reduced-motion system preference. Content is duplicated internally for seamless infinite scrolling, with the duplicate hidden from assistive technology via aria-hidden. An optional CSS gradient mask fades content at the edges.',
  tags: [
    'marquee',
    'scrolling',
    'ticker',
    'carousel',
    'animation',
    'logo-wall',
    'partner-logos',
    'news-ticker',
    'infinite-scroll',
  ],
  useCases: [
    'Displaying a scrolling row of partner or client logos on a landing page',
    'Creating news tickers or announcement banners with continuous horizontal scrolling',
    'Showcasing feature highlights or technology badges in a seamless loop',
    'Building testimonial strips with pause-on-hover for readability',
    'Presenting promotional content in a ping-pong (back-and-forth) animation pattern',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Marquee',
  files: [
    { name: 'Marquee.tsx', description: 'Root component with pause state, animation logic, gradient mask, and accessibility controls' },
    { name: 'MarqueeItem.tsx', description: 'Presentational wrapper for individual items within the scrolling track' },
    { name: 'types.ts', description: 'TypeScript type definitions for MarqueeProps, MarqueeItemProps, and enum types' },
    { name: 'index.ts', description: 'Barrel export file re-exporting Marquee, MarqueeItem, and all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Marquee',
  subComponents: [
    {
      name: 'Item',
      fileName: 'MarqueeItem.tsx',
      description: 'Individual item wrapper within the scrolling track, providing flex shrink-0 alignment and centering',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content to render inside the marquee item',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the item wrapper div',
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
      description: 'MarqueeItem elements to render and scroll within the marquee track',
    },
    {
      name: 'speed',
      type: "MarqueeSpeed",
      required: false,
      defaultValue: "'normal'",
      description: 'Animation speed. Slow = 40s, Normal = 20s, Fast = 10s duration per cycle',
      options: ['slow', 'normal', 'fast'],
    },
    {
      name: 'direction',
      type: "MarqueeDirection",
      required: false,
      defaultValue: "'left'",
      description: 'Scroll direction. "left" scrolls content leftward, "right" scrolls content rightward',
      options: ['left', 'right'],
    },
    {
      name: 'pauseOnHover',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, pauses the animation while the mouse hovers over the marquee track',
    },
    {
      name: 'gradient',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, applies a CSS mask gradient to fade content at the left and right edges',
    },
    {
      name: 'showControls',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, renders a pause/play toggle button (required for WCAG 2.2.2 Level A compliance)',
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      defaultValue: "'Scrolling content'",
      description: 'Accessible label for the marquee region, announced by screen readers via aria-label',
    },
    {
      name: 'loopMode',
      type: "MarqueeLoopMode",
      required: false,
      defaultValue: "'infinite'",
      description: 'Animation loop behavior. "infinite" loops seamlessly, "finite" stops after loopCount iterations, "single" plays once, "ping-pong" alternates direction',
      options: ['infinite', 'finite', 'single', 'ping-pong'],
    },
    {
      name: 'loopCount',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'Number of loops when loopMode is "finite". Ignored for other loop modes.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container div',
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      required: false,
      description: 'Additional inline styles applied to the root container. Merged with CSS custom property styles (--duration, --direction, --loop-count).',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'paused',
      prop: 'internal isPaused',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Toggled by the pause/play control button or keyboard shortcut. When true, sets animation-play-state: paused on the scrolling track.',
    },
    {
      name: 'speed',
      prop: 'speed',
      isBoolean: false,
      values: ['slow', 'normal', 'fast'],
      defaultValue: 'normal',
      description: 'Controls the CSS animation duration via a custom property. Slow = 40s, Normal = 20s, Fast = 10s.',
    },
    {
      name: 'direction',
      prop: 'direction',
      isBoolean: false,
      values: ['left', 'right'],
      defaultValue: 'left',
      description: 'Sets the CSS animation-direction. "left" maps to "normal", "right" maps to "reverse".',
    },
    {
      name: 'loopMode',
      prop: 'loopMode',
      isBoolean: false,
      values: ['infinite', 'finite', 'single', 'ping-pong'],
      defaultValue: 'infinite',
      description: 'Determines the animation class and iteration count. Infinite loops seamlessly, finite uses loopCount, single plays once with forwards fill, ping-pong uses alternating direction.',
    },
    {
      name: 'pausedByHover',
      prop: 'pauseOnHover',
      isBoolean: true,
      defaultValue: 'true',
      description: 'When enabled, the CSS hover selector pauses the animation. This is a CSS-only behavior, not React state.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick (pause/play button)',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fires when the pause/play control button is clicked. Toggles the isPaused state, which sets animation-play-state on the track.',
    },
    {
      name: 'onKeyDown (pause/play button)',
      signature: '(event: React.KeyboardEvent<HTMLButtonElement>) => void',
      description: 'Fires on Enter or Space key press on the pause/play button. Prevents default and toggles pause state.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'region',
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the root div using the "label" prop value. Identifies the marquee region for screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="off"',
        description: 'Applied to the root div to prevent screen readers from announcing every content change during scrolling.',
        managedByComponent: true,
      },
      {
        name: 'role="region"',
        description: 'Applied to the root div to designate it as a landmark region for the scrolling content.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (pause/play button)',
        description: 'Dynamic label on the control button: "Pause scrolling animation" when playing, "Play scrolling animation" when paused.',
        managedByComponent: true,
      },
      {
        name: 'aria-pressed (pause/play button)',
        description: 'Applied to the control button to communicate toggle state. True when paused, false when playing.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (duplicate content)',
        description: 'Applied to the duplicated content div used for seamless looping. Prevents screen readers from announcing duplicated content.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (icons)',
        description: 'Applied to the SVG play/pause icons inside the control button since they are decorative alongside the aria-label.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Activates the pause/play control button to toggle the scrolling animation state.',
      },
      {
        key: 'Space',
        behavior: 'Activates the pause/play control button to toggle the scrolling animation state.',
      },
    ],
    focusManagement:
      'The pause/play control button receives standard button focus with a visible focus ring (focus-visible:ring-2 focus-visible:ring-focus). The marquee track itself is not focusable.',
    wcagLevel: 'AA',
    notes:
      'WCAG 2.2.2 (Level A): Pause control is shown by default (showControls=true). WCAG 2.3.3: The component applies motion-reduce:animate-none to respect prefers-reduced-motion. WCAG 2.4.7 (Level AA): Focus indicator is visible on the control button. Setting showControls=false removes the pause control and fails WCAG 2.2.2.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'badge',
      reason: 'Used inside MarqueeItem to display technology tags, status labels, or category badges in a scrolling row',
    },
    {
      slug: 'card',
      reason: 'Used inside MarqueeItem for scrolling testimonial cards, product cards, or feature highlight cards',
    },
    {
      slug: 'avatar',
      reason: 'Commonly paired inside MarqueeItem for scrolling partner logos or team member profiles',
    },
    {
      slug: 'typography',
      reason: 'Used alongside Marquee for section headings and descriptive text above the scrolling content',
    },
    {
      slug: 'divider',
      reason: 'Used to separate the marquee section from surrounding content on landing pages',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Marquee',
      description: 'Default marquee with pause control (WCAG 2.2.2), pause-on-hover, and edge gradient fade.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function BasicMarquee() {
  return (
    <Marquee pauseOnHover label="Featured technologies">
      <MarqueeItem>
        <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
          <span className="text-surface-content font-medium">React</span>
        </div>
      </MarqueeItem>
      <MarqueeItem>
        <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
          <span className="text-surface-content font-medium">TypeScript</span>
        </div>
      </MarqueeItem>
      <MarqueeItem>
        <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
          <span className="text-surface-content font-medium">Tailwind CSS v4</span>
        </div>
      </MarqueeItem>
      <MarqueeItem>
        <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
          <span className="text-surface-content font-medium">Next.js</span>
        </div>
      </MarqueeItem>
      <MarqueeItem>
        <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
          <span className="text-surface-content font-medium">Vite</span>
        </div>
      </MarqueeItem>
    </Marquee>
  );
}`,
      tags: ['basic', 'default', 'pause-on-hover'],
    },
    {
      title: 'Speed Variants',
      description: 'Slow (40s) and fast (10s) speed variants compared to the default normal (20s) speed.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function SpeedMarquee() {
  return (
    <div className="space-y-4">
      <Marquee speed="slow" label="Slow scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-info/10 border border-info/30">
              <span className="text-info font-medium">Slow {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee speed="fast" label="Fast scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-destructive/10 border border-destructive/30">
              <span className="text-destructive font-medium">Fast {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}`,
      tags: ['speed', 'slow', 'fast'],
    },
    {
      title: 'Direction Control',
      description: 'Left and right scrolling directions.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function DirectionMarquee() {
  return (
    <div className="space-y-4">
      <Marquee direction="left" label="Left scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-success/10 border border-success/30">
              <span className="text-success font-medium">Left {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee direction="right" label="Right scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-brand/10 border border-brand/30">
              <span className="text-brand font-medium">Right {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}`,
      tags: ['direction', 'left', 'right'],
    },
    {
      title: 'Loop Modes',
      description: 'Ping-pong (alternating direction) and finite (3 loops then stops) loop modes.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function LoopModeMarquee() {
  return (
    <div className="space-y-4">
      <Marquee loopMode="ping-pong" label="Ping-pong scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-warning/10 border border-warning/30">
              <span className="text-warning font-medium">Ping-pong {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee loopMode="finite" loopCount={3} label="Finite scrolling content">
        {[...Array(6)].map((_, i) => (
          <MarqueeItem key={i}>
            <div className="px-6 py-3 rounded-surface bg-info/10 border border-info/30">
              <span className="text-info font-medium">Finite {i + 1}</span>
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}`,
      tags: ['loop-mode', 'ping-pong', 'finite'],
    },
    {
      title: 'Without Pause Controls',
      description: 'Marquee with no pause/play button. Note: this fails WCAG 2.2.2 Level A and should only be used when pause-on-hover is sufficient.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function NoControlsMarquee() {
  return (
    <Marquee showControls={false} label="Uncontrollable scrolling content">
      {[...Array(6)].map((_, i) => (
        <MarqueeItem key={i}>
          <div className="px-6 py-3 rounded-surface bg-muted border border-border">
            <span className="text-surface-content font-medium">No Control {i + 1}</span>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}`,
      tags: ['no-controls', 'accessibility-warning'],
    },
    {
      title: 'No Edge Gradient',
      description: 'Marquee with the edge gradient fade disabled for a hard-cut look at the edges.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function NoGradientMarquee() {
  return (
    <Marquee gradient={false} label="Content without gradient">
      {[...Array(6)].map((_, i) => (
        <MarqueeItem key={i}>
          <div className="px-6 py-3 rounded-surface bg-brand/10 border border-brand/30">
            <span className="text-brand font-medium">Item {i + 1}</span>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}`,
      tags: ['no-gradient', 'custom-styling'],
    },
    {
      title: 'Logo Showcase',
      description: 'Typical partner logo showcase with slow speed, pause-on-hover, and styled card items.',
      code: `import { Marquee, MarqueeItem } from 'vayu-ui';

export default function LogoShowcaseMarquee() {
  const companies = [
    'Acme Corp',
    'TechVision',
    'DataFlow Inc',
    'CloudNine',
    'DevTools Pro',
    'AppMakers',
  ];

  return (
    <Marquee speed="slow" pauseOnHover={true} label="Partner companies">
      {companies.map((company, i) => (
        <MarqueeItem key={i}>
          <div className="px-8 py-4 rounded-overlay bg-surface border border-border shadow-surface">
            <span className="text-lg font-semibold text-surface-content">{company}</span>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}`,
      tags: ['logo-wall', 'partner-logos', 'slow', 'showcase'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Disabling pause controls for production',
      bad: '<Marquee showControls={false}>...</Marquee>',
      good: '<Marquee showControls={true} pauseOnHover>...</Marquee>',
      reason: 'Setting showControls={false} removes the pause/play button, which fails WCAG 2.2.2 (Level A). All moving content must have a pause mechanism. Only disable controls when an alternative pause method exists.',
    },
    {
      title: 'Using loopCount without finite loopMode',
      bad: '<Marquee loopMode="infinite" loopCount={3}>...</Marquee>',
      good: '<Marquee loopMode="finite" loopCount={3}>...</Marquee>',
      reason: 'The loopCount prop is only read when loopMode is "finite". Setting loopCount on "infinite" or "single" modes has no effect and is misleading.',
    },
    {
      title: 'Placing non-MarqueeItem children directly in Marquee',
      bad: '<Marquee><div>Item</div><div>Item</div></Marquee>',
      good: '<Marquee><MarqueeItem><div>Item</div></MarqueeItem><MarqueeItem><div>Item</div></MarqueeItem></Marquee>',
      reason: 'Raw divs lack the shrink-0 and alignment classes provided by MarqueeItem. Without the wrapper, items may compress and break the seamless scrolling layout.',
    },
    {
      title: 'Overriding animation CSS custom properties via style prop',
      bad: '<Marquee style={{ animationDuration: "5s" }}>...</Marquee>',
      good: '<Marquee speed="fast">...</Marquee>',
      reason: 'The component manages --duration, --direction, and --loop-count CSS custom properties internally. Directly overriding animation properties via the style prop can conflict with the component\'s CSS variable system. Use the dedicated speed, direction, and loopMode props instead.',
    },
  ],
};
