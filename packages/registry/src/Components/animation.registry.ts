import { RegistryItem } from "..";

export const animationRegistry: RegistryItem = {
  name: 'Animation',
  slug: 'animation',
  type: 'component',
  category: 'animation',
  since: '1.0.0',
  description:
    'A collection of pure CSS animation components using a compound pattern. Supports durations, delays, iterations, and respects user motion preferences.',
  targetPath: 'src/components/ui',
  fileName: 'animation.tsx',
  dependencies: ['clsx'],
  registryDependencies: [],
  tags: ['component', 'animation', 'css', 'utility'],
  composition: {
    parts: {
      Animation: 'Root namespacing component (optional usage, primarily used as static accessor).',
      'Animation.Fade': 'Fades content in from transparent to opaque.',
      'Animation.Slide': 'Slides content in from a specified direction (up, down, left, right).',
      'Animation.Zoom': 'Zooms content in from a scaled state.',
      'Animation.Bounce': 'Bounces content in with elastic scaling.',
      'Animation.Flip': 'Flips content in along the X or Y axis.',
      'Animation.Rotate': 'Rotates content in from a specified angle.',
      'Animation.Roll': 'Rolls content in with rotation and translation.',
      'Animation.JackInTheBox': 'Playful pop animation combining scale and rotation.',
      'Animation.Hinge': 'Exit animation that swings and drops the element.',
    },
    example: `<Animation.Fade duration="fast">
  <div className="p-4 bg-blue-500 text-white rounded">Fading In</div>
</Animation.Fade>

<Animation.Slide direction="up" delay="short">
  <div className="p-4 bg-green-500 text-white rounded">Sliding Up</div>
</Animation.Slide>`,
    partsRequired: true,
  },
  a11y: {
    role: 'None (presentation)',
    managedAttrs: [],
    keyboard: {},
    focusManagement: 'None.',
    notes: [
      "Automatically detects 'prefers-reduced-motion' via the usePrefersReducedMotion hook.",
      'If reduced motion is preferred, animations are skipped, and content is rendered immediately with full opacity to ensure visibility.',
    ],
  },
  props: {
    duration: {
      type: '"slower" | "slow" | "normal" | "fast" | "faster"',
      required: false,
      default: '"normal"',
      description: 'The duration of the animation cycle.',
    },
    delay: {
      type: '"none" | "short" | "medium" | "long"',
      required: false,
      default: '"none"',
      description: 'Delay before the animation starts.',
    },
    iteration: {
      type: "1 | 2 | 3 | 'infinite'",
      required: false,
      default: '1',
      description: 'Number of times the animation repeats.',
    },
    fillMode: {
      type: '"none" | "forwards" | "backwards" | "both"',
      required: false,
      default: '"none"',
      description: 'Defines how styles are applied before/after execution.',
    },
    direction: {
      type: '"up" | "down" | "left" | "right"',
      required: false,
      default: 'Varies by component',
      component: 'Animation.Slide, Animation.Flip, Animation.Roll',
      description: 'Direction of the entrance animation.',
    },
    scale: {
      type: '"small" | "medium" | "large"',
      required: false,
      default: '"medium"',
      component: 'Animation.Zoom, Animation.Bounce',
      description: 'Intensity of the scaling effect.',
    },
    degrees: {
      type: 'number',
      required: false,
      default: '-200',
      component: 'Animation.Rotate',
      description: 'Starting rotation angle in degrees.',
    },
  },
  examples: {
    entrance: {
      code: `<div className="flex gap-4">
  <Animation.Fade>
    <div className="p-4 bg-indigo-500 text-white rounded">Fade</div>
  </Animation.Fade>
  <Animation.Zoom scale="large">
    <div className="p-4 bg-green-500 text-white rounded">Zoom</div>
  </Animation.Zoom>
</div>`,
      description: 'Basic entrance animations.',
    },
    directional: {
      code: `<Animation.Slide direction="left" duration="fast">
  <div className="p-4 bg-blue-500 text-white rounded">Sliding from Left</div>
</Animation.Slide>`,
      description: 'Sliding in from a specific direction.',
    },
    looping: {
      code: `<Animation.Bounce iteration="infinite">
  <div className="p-4 bg-yellow-500 text-black rounded">Loading...</div>
</Animation.Bounce>`,
      description: 'Creating an infinite loading indicator.',
    },
    customRotate: {
      code: `<Animation.Rotate degrees={-720} duration="slower">
  <div className="p-4 bg-red-500 text-white rounded">Spinning Entry</div>
</Animation.Rotate>`,
      description: 'Custom rotation entry.',
    },
  },
  doNot: [
    {
      rule: 'Do not assume animations work without the CSS file',
      category: 'setup',
      why: 'The component relies on custom CSS keyframes (animate-fade-in, etc.) defined in animation.css or a Tailwind plugin.',
    },
    {
      rule: 'Do not use for critical security warnings',
      category: 'ux',
      why: 'Respecting reduced motion preferences might suppress the animation entirely for some users, potentially reducing visual impact needed for alerts.',
    },
  ],
};
