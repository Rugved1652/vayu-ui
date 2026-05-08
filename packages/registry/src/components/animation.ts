import { ComponentRegistryEntry } from '../types.js';

export const animationEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'animation',
  name: 'Animation',
  type: 'component',
  category: 'animation',

  // ── Description ───────────────────────────────────────
  description:
    'A collection of pure CSS entrance animations with WCAG 2.2 accessibility support, including fade, slide, bounce, flip, rotate, zoom, roll, jack-in-the-box, hinge effects, and viewport-triggered animations via Animation.InView.',
  longDescription:
    'The Animation component uses the compound component pattern (Animation.Fade, Animation.Slide, Animation.Bounce, Animation.Flip, Animation.Rotate, Animation.Zoom, Animation.Roll, Animation.JackInTheBox, Animation.Hinge, Animation.InView) to provide 9 entrance animation variants plus a viewport-triggered variant. All base animations are CSS-only (no JavaScript runtime), making them fully server-side compatible. Animation.InView is a client component that uses IntersectionObserver to trigger animations when elements scroll into view. Each variant supports configurable duration, delay, iteration count, and fill mode. Accessibility is handled via Tailwind motion-reduce: variant and a global CSS @media rule for prefers-reduced-motion, ensuring content remains visible when animations are suppressed.',
  tags: [
    'animation',
    'entrance',
    'fade',
    'slide',
    'bounce',
    'flip',
    'rotate',
    'zoom',
    'roll',
    'hinge',
    'inview',
    'viewport',
    'scroll',
    'intersection-observer',
    'motion',
    'transition',
    'css-animation',
    'wcag',
    'reduced-motion',
  ],
  useCases: [
    'Adding entrance animations to modals, dialogs, and tooltips when they appear',
    'Creating staggered page-load reveal effects for hero sections or feature cards',
    'Animating content into view during route transitions in single-page applications',
    'Building loading state reveals where skeleton placeholders transition into real content',
    'Adding playful micro-interactions for onboarding flows or empty states',
    'Creating attention-drawing effects for notifications, badges, or call-to-action elements',
    'Triggering scroll-based reveal animations when sections enter the viewport using Animation.InView',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Animation',
  files: [
    { name: 'Animation.tsx', description: 'Root component with compound composition wrapping all animation variants' },
    { name: 'AnimateInView.tsx', description: 'Viewport-triggered animation variant using IntersectionObserver (client component)' },
    { name: 'FadeAnimation.tsx', description: 'Fade-in opacity transition variant' },
    { name: 'SlideAnimation.tsx', description: 'Directional slide-in variant (up, down, left, right)' },
    { name: 'BounceAnimation.tsx', description: 'Scale-based bounce entrance variant (small, medium, large)' },
    { name: 'FlipAnimation.tsx', description: 'Axis-based flip rotation variant (X-axis or Y-axis)' },
    { name: 'RotateAnimation.tsx', description: 'Custom degree rotation entrance variant' },
    { name: 'ZoomAnimation.tsx', description: 'Scale-based zoom entrance variant (small, medium, large)' },
    { name: 'RollAnimation.tsx', description: 'Directional rolling entrance variant' },
    { name: 'JackInTheBoxAnimation.tsx', description: 'Playful spring-loaded entrance variant' },
    { name: 'HingeAnimation.tsx', description: 'Element swings and falls off the page variant' },
    { name: 'types.ts', description: 'TypeScript type definitions, prop interfaces, and Tailwind class mapping objects' },
    { name: 'utils.ts', description: 'buildAnimationClasses utility for composing animation CSS classes' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and all types' },
    { name: 'README.md', description: 'Component anatomy and use-case reference', optional: true },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Animation',
  subComponents: [
    {
      name: 'Fade',
      fileName: 'FadeAnimation.tsx',
      description: 'Smooth opacity transition from invisible to visible',
      props: [],
    },
    {
      name: 'Slide',
      fileName: 'SlideAnimation.tsx',
      description: 'Translates the element in from a specified direction (up, down, left, right)',
      props: [
        {
          name: 'direction',
          type: "AnimationDirection",
          required: false,
          defaultValue: "'left'",
          description: 'Direction the element slides in from',
          options: ['up', 'down', 'left', 'right'],
        },
      ],
    },
    {
      name: 'Bounce',
      fileName: 'BounceAnimation.tsx',
      description: 'Scales in with an elastic bounce effect at small, medium, or large intensity',
      props: [
        {
          name: 'scale',
          type: "AnimationScale",
          required: false,
          defaultValue: "'medium'",
          description: 'Intensity of the bounce entrance effect',
          options: ['small', 'medium', 'large'],
        },
      ],
    },
    {
      name: 'Flip',
      fileName: 'FlipAnimation.tsx',
      description: 'Rotates the element on the X or Y axis (up/down flip on X-axis, left/right flip on Y-axis)',
      props: [
        {
          name: 'direction',
          type: "AnimationDirection",
          required: false,
          defaultValue: "'up'",
          description: 'Flip direction. up/down flip on X-axis, left/right flip on Y-axis',
          options: ['up', 'down', 'left', 'right'],
        },
      ],
    },
    {
      name: 'Rotate',
      fileName: 'RotateAnimation.tsx',
      description: 'Rotates the element in from a custom starting degree angle',
      props: [
        {
          name: 'degrees',
          type: 'number',
          required: false,
          defaultValue: '-200',
          description: 'Starting rotation angle in degrees. Negative values rotate counter-clockwise.',
        },
      ],
    },
    {
      name: 'Zoom',
      fileName: 'ZoomAnimation.tsx',
      description: 'Scales the element in from a smaller or larger size',
      props: [
        {
          name: 'scale',
          type: "AnimationScale",
          required: false,
          defaultValue: "'medium'",
          description: 'Starting scale intensity before zooming to full size',
          options: ['small', 'medium', 'large'],
        },
      ],
    },
    {
      name: 'Roll',
      fileName: 'RollAnimation.tsx',
      description: 'Rolls the element in from a specified direction',
      props: [
        {
          name: 'direction',
          type: "AnimationDirection",
          required: false,
          defaultValue: "'left'",
          description: 'Direction the element rolls in from',
          options: ['up', 'down', 'left', 'right'],
        },
      ],
    },
    {
      name: 'JackInTheBox',
      fileName: 'JackInTheBoxAnimation.tsx',
      description: 'Playful spring-loaded entrance animation that pops the element into view',
      props: [],
    },
    {
      name: 'Hinge',
      fileName: 'HingeAnimation.tsx',
      description: 'Element swings from the top and falls off the page; defaults fillMode to forwards so the element stays in final position',
      props: [],
    },
    {
      name: 'InView',
      fileName: 'AnimateInView.tsx',
      description: 'Viewport-triggered animation that plays when the element scrolls into view using IntersectionObserver. Supports all animation variants via the variant prop. Client component — children can still be server-rendered.',
      props: [
        {
          name: 'variant',
          type: "AnimationVariant",
          required: true,
          description: 'Animation type to play when the element enters the viewport',
          options: ['fade', 'slide', 'bounce', 'flip', 'rotate', 'zoom', 'roll', 'jackInTheBox', 'hinge'],
        },
        {
          name: 'direction',
          type: "AnimationDirection",
          required: false,
          defaultValue: "'left'",
          description: 'Direction for slide, flip, and roll variants',
          options: ['up', 'down', 'left', 'right'],
        },
        {
          name: 'scale',
          type: "AnimationScale",
          required: false,
          defaultValue: "'medium'",
          description: 'Scale intensity for bounce and zoom variants',
          options: ['small', 'medium', 'large'],
        },
        {
          name: 'degrees',
          type: 'number',
          required: false,
          defaultValue: '-200',
          description: 'Starting rotation angle in degrees for the rotate variant',
        },
        {
          name: 'triggerOnce',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to animate only the first time the element enters the viewport',
        },
        {
          name: 'threshold',
          type: 'number',
          required: false,
          defaultValue: '0.1',
          description: 'Intersection ratio (0–1) needed to trigger the animation',
        },
        {
          name: 'rootMargin',
          type: 'string',
          required: false,
          defaultValue: "'0px'",
          description: 'Margin around the root element for IntersectionObserver',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      description: 'Content to animate. Rendered inside the animation wrapper div.',
    },
    {
      name: 'duration',
      type: "AnimationDuration",
      required: false,
      defaultValue: "'normal'",
      description: 'Animation duration controlling how long the entrance takes to complete',
      options: ['slower', 'slow', 'normal', 'fast', 'faster'],
    },
    {
      name: 'delay',
      type: "AnimationDelay",
      required: false,
      defaultValue: "'none'",
      description: 'Delay before the animation starts. Useful for staggered entrance sequences.',
      options: ['none', 'short', 'medium', 'long'],
    },
    {
      name: 'iteration',
      type: "AnimationIteration",
      required: false,
      defaultValue: '1',
      description: 'Number of times the animation repeats. Use "infinite" for looping effects.',
      options: ['1', '2', '3', 'infinite'],
    },
    {
      name: 'fillMode',
      type: "AnimationFillMode",
      required: false,
      defaultValue: "'none'",
      description: 'How the animation applies styles before and after execution. Animation.Hinge defaults to "forwards".',
      options: ['none', 'forwards', 'backwards', 'both'],
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the animation wrapper div',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'animating',
      prop: 'CSS animation state',
      isBoolean: true,
      defaultValue: 'true',
      description: 'The animation plays on mount by default. Duration and fill mode control when it completes and whether styles persist.',
    },
    {
      name: 'delayed',
      prop: 'delay',
      isBoolean: false,
      values: ['none', 'short', 'medium', 'long'],
      defaultValue: "'none'",
      description: 'The element waits for the configured delay before starting the entrance animation.',
    },
    {
      name: 'repeating',
      prop: 'iteration',
      isBoolean: false,
      values: ['1', '2', '3', 'infinite'],
      defaultValue: '1',
      description: 'Controls how many times the animation repeats. "infinite" creates a perpetual loop.',
    },
    {
      name: 'reducedMotion',
      prop: 'prefers-reduced-motion (system)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Automatically detected from the user OS preference. When enabled, animations are suppressed via CSS and content is shown at full opacity.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'motion-reduce:opacity-100',
        description: 'Applied via Tailwind CSS class to ensure content remains visible at full opacity when the user OS prefers-reduced-motion setting is active.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [],
    wcagLevel: 'AA',
    notes:
      'Animation components are purely decorative CSS wrappers. No ARIA roles or live regions are needed because animations do not convey meaning or state. Screen readers announce content as-is regardless of animation. The global CSS rule @media (prefers-reduced-motion: reduce) { * { animation: none !important } } provides a safety net. The Tailwind motion-reduce:opacity-100 class prevents invisible content when animations are suppressed, since keyframes start at opacity: 0. Fully compliant with WCAG 2.2 Success Criterion 2.3.3 (Animation from Interactions).',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'tailwind-merge' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=19.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'Cards are commonly animated into view using Animation.Fade or Animation.Slide for staggered entrance effects',
    },
    {
      slug: 'button',
      reason: 'Buttons can be wrapped with Animation.Bounce or Animation.JackInTheBox for attention-drawing call-to-action effects',
    },
    {
      slug: 'skeleton',
      reason: 'Skeleton placeholders can transition into real content using Animation.Fade for a smooth loading reveal',
    },
    {
      slug: 'badge',
      reason: 'Badges use Animation.Bounce or Animation.Zoom for notification count updates and status change highlights',
    },
    {
      slug: 'alert',
      reason: 'Alerts and toast notifications use Animation.Slide or Animation.Fade for entrance and exit transitions',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Fade and Slide Animations',
      description: 'Simple entrance animations using Fade with a long delay and Slide from the left.',
      code: `import { Animation } from 'vayu-ui';

export default function BasicAnimationDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Animation.Fade>
        <div className="bg-indigo-500 rounded-md p-4 text-white">Fading in</div>
      </Animation.Fade>

      <Animation.Fade delay="long">
        <div className="bg-indigo-400 rounded-md p-4 text-white">Delayed fade</div>
      </Animation.Fade>

      <Animation.Slide direction="left">
        <div className="bg-blue-500 rounded-md p-4 text-white">Sliding from left</div>
      </Animation.Slide>
    </div>
  );
}`,
      tags: ['basic', 'fade', 'slide', 'delay'],
    },
    {
      title: 'Directional Animations (Slide, Flip, Roll)',
      description: 'Slide, Flip, and Roll variants with different direction options.',
      code: `import { Animation } from 'vayu-ui';

export default function DirectionalDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Animation.Slide direction="right">
        <div className="bg-blue-500 rounded-md p-4 text-white">Slide Right</div>
      </Animation.Slide>

      <Animation.Slide direction="up">
        <div className="bg-blue-600 rounded-md p-4 text-white">Slide Up</div>
      </Animation.Slide>

      <Animation.Flip direction="up">
        <div className="bg-purple-500 rounded-md p-4 text-white">Flip Up (X-Axis)</div>
      </Animation.Flip>

      <Animation.Flip direction="left">
        <div className="bg-purple-600 rounded-md p-4 text-white">Flip Left (Y-Axis)</div>
      </Animation.Flip>

      <Animation.Roll direction="right">
        <div className="bg-pink-500 rounded-md p-4 text-white">Roll Right</div>
      </Animation.Roll>

      <Animation.Slide direction="down">
        <div className="bg-blue-600 rounded-md p-4 text-white">Slide Down</div>
      </Animation.Slide>
    </div>
  );
}`,
      tags: ['directional', 'slide', 'flip', 'roll'],
    },
    {
      title: 'Scale-Based Animations (Bounce, Zoom)',
      description: 'Bounce and Zoom variants with different scale options and an infinite looping bounce.',
      code: `import { Animation } from 'vayu-ui';

export default function ScaleDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Animation.Bounce scale="small">
        <div className="bg-yellow-500 rounded-md p-4 text-black">Small Bounce</div>
      </Animation.Bounce>

      <Animation.Bounce scale="large">
        <div className="bg-yellow-500 rounded-md p-4 text-black">Large Bounce</div>
      </Animation.Bounce>

      <Animation.Zoom scale="small">
        <div className="bg-green-500 rounded-full p-4 text-white">Small Zoom</div>
      </Animation.Zoom>

      <Animation.Zoom scale="medium">
        <div className="bg-green-500 rounded-full p-4 text-white">Medium Zoom</div>
      </Animation.Zoom>

      <Animation.Zoom scale="large">
        <div className="bg-green-500 rounded-full p-4 text-white">Large Zoom</div>
      </Animation.Zoom>

      <Animation.Bounce iteration="infinite">
        <div className="bg-cyan-500 rounded-full p-4 text-white">Infinite Loop</div>
      </Animation.Bounce>
    </div>
  );
}`,
      tags: ['scale', 'bounce', 'zoom', 'infinite', 'loop'],
    },
    {
      title: 'Custom Rotation and Special Effects',
      description: 'Rotate with custom degrees, JackInTheBox spring effect, and Hinge fall-off animation.',
      code: `import { Animation } from 'vayu-ui';

export default function SpecialDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Animation.Rotate degrees={180}>
        <div className="bg-red-500 rounded-md p-4 text-white">Rotate 180°</div>
      </Animation.Rotate>

      <Animation.Rotate degrees={-200}>
        <div className="bg-red-600 rounded-md p-4 text-white">Rotate -200°</div>
      </Animation.Rotate>

      <Animation.JackInTheBox>
        <div className="bg-teal-500 rounded-md p-4 text-white">Jack In The Box</div>
      </Animation.JackInTheBox>

      <Animation.Hinge duration="slower">
        <div className="bg-orange-500 rounded-md p-4 text-white">Hinge Effect</div>
      </Animation.Hinge>
    </div>
  );
}`,
      tags: ['rotate', 'custom-degrees', 'jackinthebox', 'hinge', 'special'],
    },
    {
      title: 'Staggered Card Entrance',
      description: 'Multiple cards entering with increasing delays to create a staggered reveal effect.',
      code: `import { Animation } from 'vayu-ui';

export default function StaggeredDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Animation.Fade duration="normal" delay="none">
        <div className="rounded-lg border p-6 shadow-surface">
          <h3 className="font-semibold">Feature One</h3>
          <p className="text-muted-content mt-2">First card appears immediately.</p>
        </div>
      </Animation.Fade>

      <Animation.Fade duration="normal" delay="short">
        <div className="rounded-lg border p-6 shadow-surface">
          <h3 className="font-semibold">Feature Two</h3>
          <p className="text-muted-content mt-2">Second card follows shortly.</p>
        </div>
      </Animation.Fade>

      <Animation.Fade duration="normal" delay="medium">
        <div className="rounded-lg border p-6 shadow-surface">
          <h3 className="font-semibold">Feature Three</h3>
          <p className="text-muted-content mt-2">Third card completes the set.</p>
        </div>
      </Animation.Fade>
    </div>
  );
}`,
      tags: ['staggered', 'delay', 'cards', 'reveal', 'entrance'],
    },
    {
      title: 'Viewport-Triggered Scroll Animations',
      description: 'Animation.InView triggers animations when elements scroll into the viewport, using IntersectionObserver.',
      code: `import { Animation } from 'vayu-ui';

export default function InViewDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Animation.InView variant="fade" duration="slow">
        <div className="bg-indigo-500 rounded-md p-4 text-white">Fades in when scrolled into view</div>
      </Animation.InView>

      <Animation.InView variant="slide" direction="up">
        <div className="bg-blue-500 rounded-md p-4 text-white">Slides up when scrolled into view</div>
      </Animation.InView>

      <Animation.InView variant="bounce" scale="large" triggerOnce={false}>
        <div className="bg-yellow-500 rounded-md p-4 text-black">Re-triggers every time it enters the viewport</div>
      </Animation.InView>

      <Animation.InView variant="zoom" scale="medium" threshold={0.3}>
        <div className="bg-green-500 rounded-full p-4 text-white">Zooms in when 30% visible</div>
      </Animation.InView>
    </div>
  );
}`,
      tags: ['inview', 'viewport', 'scroll', 'intersection-observer', 'trigger'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Wrapping interactive elements that depend on initial visibility',
      bad: '<Animation.Fade><input placeholder="Enter name" /></Animation.Fade>',
      good: '<div><input placeholder="Enter name" /></div>',
      reason: 'Animation keyframes start at opacity: 0. If the animation fails to load or is suppressed, form inputs could be invisible or unclickable. Use animations on decorative wrappers, not directly on interactive elements.',
    },
    {
      title: 'Setting iteration="infinite" on content that users need to read',
      bad: '<Animation.Bounce iteration="infinite"><p>Important notice text</p></Animation.Bounce>',
      good: '<Animation.Bounce iteration={1}><p>Important notice text</p></Animation.Bounce>',
      reason: 'Infinite animations cause continuous motion that makes text hard to read and violates WCAG 2.3.3. Use iteration={1} for content that conveys meaning.',
    },
    {
      title: 'Using Animation.Hinge without fillMode="forwards"',
      bad: '<Animation.Hinge fillMode="none">...</Animation.Hinge>',
      good: '<Animation.Hinge>...</Animation.Hinge>',
      reason: 'Hinge defaults to fillMode="forwards" for a reason: the animation ends with the element fallen off-screen. Without "forwards", the element snaps back to its original position, creating a jarring visual glitch.',
    },
    {
      title: 'Nesting animation components inside each other',
      bad: '<Animation.Fade><Animation.Slide direction="left">...</Animation.Slide></Animation.Fade>',
      good: '<Animation.Slide direction="left">...</Animation.Slide>',
      reason: 'Nesting animations creates conflicting opacity and transform transitions that produce unpredictable visual results. Use a single animation variant per element.',
    },
    {
      title: 'Overriding the motion-reduce class via className',
      bad: '<Animation.Fade className="!opacity-0">...</Animation.Fade>',
      good: '<Animation.Fade className="mt-4">...</Animation.Fade>',
      reason: 'Overriding opacity or animation properties via className breaks the reduced-motion fallback. The motion-reduce:opacity-100 class ensures content stays visible for users who prefer reduced motion. Avoid overriding animation-related CSS properties.',
    },
    {
      title: 'Using Animation.InView for above-the-fold content',
      bad: '<Animation.InView variant="fade"><h1>Welcome to our site</h1></Animation.InView>',
      good: '<Animation.Fade><h1>Welcome to our site</h1></Animation.Fade>',
      reason: 'Animation.InView starts with opacity: 0 and relies on IntersectionObserver to trigger. For above-the-fold content that is already visible on page load, use the standard Animation variants instead to avoid a flash of invisible content.',
    },
    {
      title: 'Nesting Animation.InView inside another Animation component',
      bad: '<Animation.Fade><Animation.InView variant="slide" direction="up">...</Animation.InView></Animation.Fade>',
      good: '<Animation.InView variant="slide" direction="up">...</Animation.InView>',
      reason: 'Animation.InView already handles the animation — nesting it inside another Animation component creates conflicting opacity and transform transitions. Use Animation.InView alone with the desired variant prop.',
    },
  ],
};
