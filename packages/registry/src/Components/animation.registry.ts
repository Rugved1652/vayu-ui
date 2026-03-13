export const animationRegistry = {
  component: "Animation",
  slug: "animation",
  category: "animation",
  complexity: "compound",
  description: "A collection of pure CSS animation components using a compound pattern. Supports durations, delays, iterations, and respects user motion preferences.",
  ai_summary: "Compound animation component providing 9 entrance animation variants (Fade, Slide, Zoom, Bounce, Flip, Rotate, Roll, JackInTheBox, Hinge) with configurable duration, delay, iteration, and fillMode. Automatically respects prefers-reduced-motion for accessibility.",
  intent: [
    "Add entrance animations to elements",
    "Create attention-grabbing visual effects",
    "Build loading indicators with infinite loops",
    "Provide smooth transitions for content appearance"
  ],
  ai_keywords: [
    "animation",
    "entrance",
    "fade",
    "slide",
    "zoom",
    "bounce",
    "flip",
    "rotate",
    "roll",
    "transition",
    "motion",
    "css",
    "compound"
  ],
  when_to_use: [
    "Animating elements as they enter the viewport",
    "Creating visual interest on page load",
    "Building loading or processing indicators",
    "Drawing attention to new content",
    "Enhancing user experience with subtle motion"
  ],
  when_not_to_use: [
    "Critical security warnings where motion suppression could reduce impact",
    "Without including the required animation.css file",
    "For elements that need to be immediately visible without any delay"
  ],
  composition: {
    root: "Animation",
    slots: [
      "Animation.Fade",
      "Animation.Slide",
      "Animation.Zoom",
      "Animation.Bounce",
      "Animation.Flip",
      "Animation.Rotate",
      "Animation.Roll",
      "Animation.JackInTheBox",
      "Animation.Hinge"
    ],
    structure: [
      "Animation",
      "Animation.Fade",
      "Animation.Slide",
      "Animation.Zoom",
      "Animation.Bounce",
      "Animation.Flip",
      "Animation.Rotate",
      "Animation.Roll",
      "Animation.JackInTheBox",
      "Animation.Hinge"
    ],
    rules: [
      "Animation sub-components can be used independently without the root Animation component",
      "Each animation variant wraps a single child element",
      "Animation.Hinge defaults to fillMode='forwards' as it is an exit animation"
    ]
  },
  props: {
    "Animation.Fade": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Slide": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "direction", type: '"up" | "down" | "left" | "right"', required: false, default: "left", description: "Direction of slide animation" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Zoom": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "scale", type: '"small" | "medium" | "large"', required: false, default: "medium", description: "Scale intensity of zoom" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Bounce": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "scale", type: '"small" | "medium" | "large"', required: false, default: "medium", description: "Scale intensity of bounce" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Flip": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "direction", type: '"up" | "down" | "left" | "right"', required: false, default: "up", description: "Direction of flip animation" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Rotate": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "degrees", type: "number", required: false, default: -200, description: "Starting rotation angle in degrees" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Roll": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "direction", type: '"up" | "down" | "left" | "right"', required: false, default: "left", description: "Direction of roll animation" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.JackInTheBox": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "none", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ],
    "Animation.Hinge": [
      { name: "children", type: "ReactNode", required: true, description: "Content to animate" },
      { name: "duration", type: '"slower" | "slow" | "normal" | "fast" | "faster"', required: false, default: "normal", description: "Animation duration" },
      { name: "delay", type: '"none" | "short" | "medium" | "long"', required: false, default: "none", description: "Delay before animation starts" },
      { name: "iteration", type: "1 | 2 | 3 | \"infinite\"", required: false, default: 1, description: "Number of times to repeat" },
      { name: "fillMode", type: '"none" | "forwards" | "backwards" | "both"', required: false, default: "forwards", description: "Animation fill mode" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "onAnimationEnd", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation completes" },
      { name: "onAnimationStart", type: "AnimationEventHandler<HTMLDivElement>", required: false, description: "Callback when animation starts" }
    ]
  },
  variants: [
    { name: "duration", values: ["slower", "slow", "normal", "fast", "faster"], default: "normal", description: "Animation duration (slower: 2000ms, slow: 1500ms, normal: 1000ms, fast: 700ms, faster: 500ms)" },
    { name: "delay", values: ["none", "short", "medium", "long"], default: "none", description: "Delay before animation starts (none: 0ms, short: 150ms, medium: 300ms, long: 500ms)" },
    { name: "iteration", values: ["1", "2", "3", "infinite"], default: "1", description: "Number of times animation repeats" },
    { name: "fillMode", values: ["none", "forwards", "backwards", "both"], default: "none", description: "How styles apply before/after animation" },
    { name: "direction", values: ["up", "down", "left", "right"], default: "varies", description: "Direction for Slide, Flip, and Roll animations" },
    { name: "scale", values: ["small", "medium", "large"], default: "medium", description: "Scale intensity for Zoom and Bounce animations" }
  ],
  states: [],
  responsive: {
    allowed: false,
    patterns: []
  },
  design_tokens: {
    used: {},
    recommended: {},
    allowed: {
      colors: ["bg-*", "text-*"],
      radius: ["rounded", "rounded-md", "rounded-lg", "rounded-full"],
      spacing: ["p-*", "gap-*"],
      typography: ["text-*", "font-*"]
    }
  },
  examples: [
    {
      name: "Basic Fade",
      description: "Simple fade-in animation with default settings",
      code: `<Animation.Fade>
  <div className="p-4 bg-indigo-500 text-white rounded">Fading In</div>
</Animation.Fade>`
    },
    {
      name: "Slide Direction",
      description: "Slide animation from a specific direction with fast duration",
      code: `<Animation.Slide direction="left" duration="fast">
  <div className="p-4 bg-blue-500 text-white rounded">Sliding from Left</div>
</Animation.Slide>`
    },
    {
      name: "Infinite Bounce",
      description: "Creating an infinite loading indicator",
      code: `<Animation.Bounce iteration="infinite">
  <div className="p-4 bg-yellow-500 text-black rounded">Loading...</div>
</Animation.Bounce>`
    },
    {
      name: "Custom Rotation",
      description: "Custom rotation entry with slower duration",
      code: `<Animation.Rotate degrees={-720} duration="slower">
  <div className="p-4 bg-red-500 text-white rounded">Spinning Entry</div>
</Animation.Rotate>`
    },
    {
      name: "Entrance Animations",
      description: "Multiple entrance animations combined",
      code: `<div className="flex gap-4">
  <Animation.Fade>
    <div className="p-4 bg-indigo-500 text-white rounded">Fade</div>
  </Animation.Fade>
  <Animation.Zoom scale="large">
    <div className="p-4 bg-green-500 text-white rounded">Zoom</div>
  </Animation.Zoom>
</div>`
    },
    {
      name: "Delayed Animation",
      description: "Animation with a long delay",
      code: `<Animation.Fade delay="long">
  <div className="p-4 bg-indigo-400 text-white rounded">Delayed Fade</div>
</Animation.Fade>`
    },
    {
      name: "Zoom Scales",
      description: "Zoom animation with different scale options",
      code: `<Animation.Zoom scale="small">
  <div className="p-4 bg-green-500 rounded-full text-white">Small</div>
</Animation.Zoom>

<Animation.Zoom scale="large">
  <div className="p-4 bg-green-500 rounded-full text-white">Large</div>
</Animation.Zoom>`
    },
    {
      name: "Flip Directions",
      description: "Flip animation along different axes",
      code: `<Animation.Flip direction="up">
  <div className="p-4 bg-purple-500 text-white rounded">Flip Up</div>
</Animation.Flip>

<Animation.Flip direction="left">
  <div className="p-4 bg-purple-600 text-white rounded">Flip Left</div>
</Animation.Flip>`
    },
    {
      name: "Hinge Exit",
      description: "Hinge exit animation with slower duration",
      code: `<Animation.Hinge duration="slower">
  <div className="p-4 bg-orange-500 text-white rounded">Hinge</div>
</Animation.Hinge>`
    },
    {
      name: "Jack In The Box",
      description: "Playful pop animation",
      code: `<Animation.JackInTheBox>
  <div className="p-4 bg-teal-500 text-white rounded">Jack In</div>
</Animation.JackInTheBox>`
    }
  ],
  accessibility: {
    pattern: "presentation",
    standards: ["WCAG 2.2", "prefers-reduced-motion"],
    keyboard_support: [],
    aria_attributes: []
  },
  anti_patterns: [
    "Do not use for critical security warnings where reduced motion preferences might suppress the animation",
    "Do not assume animations work without the animation.css file containing required keyframes",
    "Do not nest animation components inside each other"
  ],
  dependencies: {
    icons: [],
    utilities: ["cn"],
    components: []
  },
  relationships: {
    used_with: [],
    often_inside: [],
    often_contains: []
  },
  related_components: [],
  validation_rules: [
    "Animation sub-components must wrap a single child element",
    "Animation.Hinge defaults to fillMode='forwards' as it is an exit animation",
    "Animation.Rotate uses CSS custom property --rotation-start for the starting angle",
    "The animation.css file must be imported for animations to work",
    "All animations respect prefers-reduced-motion media query"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add animation"
  ],
  source: {
    file: "packages/ui/src/components/ui/animation.tsx",
    language: "typescript",
    framework: "react"
  },
  meta: {
    doc_url: "/docs/components/animation",
    source_file: "packages/ui/src/components/ui/animation.tsx",
    extracted: [
      "component",
      "slug",
      "category",
      "description",
      "composition",
      "props",
      "variants",
      "examples",
      "accessibility",
      "anti_patterns",
      "installation",
      "source"
    ],
    inferred: [
      "complexity",
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "validation_rules",
      "design_tokens"
    ]
  }
};
