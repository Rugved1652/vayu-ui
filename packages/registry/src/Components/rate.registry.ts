export const rateRegistry = {
  component: 'Rate',
  slug: 'rate',
  category: 'Form',

  complexity: 'compound',

  description:
    'A fully accessible rating component with star icons, half-star support, and interactive feedback.',
  ai_summary:
    'Compound rating component with keyboard navigation, half-star precision, custom icons, labels, and full accessibility support. Supports controlled/uncontrolled modes with visual feedback states.',

  intent: [
    'collect user ratings',
    'display rating values',
    'enable interactive star-based feedback',
    'show product or content ratings',
  ],
  ai_keywords: [
    'rating',
    'stars',
    'feedback',
    'review',
    'score',
    'evaluation',
    'half-star',
    'interactive',
    'accessible',
  ],

  when_to_use: [
    'Collecting user feedback on products or content',
    'Displaying aggregate ratings from reviews',
    'Allowing users to rate their experience',
    'Showing quality indicators with precision (half-stars)',
  ],
  when_not_to_use: [
    'When you need a simple like/dislike toggle',
    'For binary yes/no feedback',
    'When numeric input is more appropriate',
    'For non-visual rating collection',
  ],

  composition: {
    root: 'Rate',
    slots: [
      'Rate.Label',
      'Rate.Description',
      'Rate.Stars',
      'Rate.Star',
      'Rate.Value',
      'Rate.TextLabel',
      'Rate.Container',
      'Rate.ErrorText',
    ],
    structure: [
      'Rate',
      'Rate.Label',
      'Rate.Description',
      'Rate.Stars',
      'Rate.Star',
      'Rate.Value',
      'Rate.TextLabel',
      'Rate.Container',
      'Rate.ErrorText',
    ],
    rules: [
      'Rate compound components must be used within Rate root',
      'Rate.Label should be placed before Rate.Stars',
      'Rate.TextLabel requires labels prop on root Rate',
      'Rate.ErrorText only renders when error prop is true',
      'Rate.Star is used internally by Rate.Stars',
    ],
  },

  props: {
    Rate: [
      {
        name: 'count',
        type: 'number',
        required: false,
        default: 5,
        description: 'Total number of stars',
      },
      {
        name: 'value',
        type: 'number',
        required: false,
        description: 'The current value (controlled)',
      },
      {
        name: 'defaultValue',
        type: 'number',
        required: false,
        default: 0,
        description: 'The default value (uncontrolled)',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        required: false,
        description: 'Callback when value changes',
      },
      {
        name: 'readOnly',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether the rating is read-only',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether the rating is disabled',
      },
      {
        name: 'allowHalf',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Whether to allow half stars',
      },
      {
        name: 'allowClear',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Whether to allow clearing the value by clicking again',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        default: 'md',
        description: 'Size of the rating stars',
      },
      {
        name: 'icon',
        type: 'ReactElement',
        required: false,
        default: '<DefaultStar />',
        description: 'Icon for empty/outline state',
      },
      {
        name: 'filledIcon',
        type: 'ReactElement',
        required: false,
        description: 'Icon for filled state (defaults to icon)',
      },
      {
        name: 'halfIcon',
        type: 'ReactElement',
        required: false,
        description: 'Icon for half-filled state (defaults to filledIcon)',
      },
      {
        name: 'error',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Whether to show error state',
      },
      {
        name: 'labels',
        type: 'string[]',
        required: false,
        description: 'Labels corresponding to each star value',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: 'ID for the component',
      },
      {
        name: 'aria-label',
        type: 'string',
        required: false,
        description: 'Accessible label for the rating',
      },
      {
        name: 'aria-labelledby',
        type: 'string',
        required: false,
        description: 'ID of element that labels the rating',
      },
    ],
    'Rate.Label': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Label content',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Rate.Description': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Description content',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: 'ID for the description element',
      },
    ],
    'Rate.Stars': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'aria-label',
        type: 'string',
        required: false,
        description: 'Accessible label for the rating slider',
      },
    ],
    'Rate.Value': [
      {
        name: 'showTotal',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Whether to show total count (e.g., "3.5 / 5")',
      },
      {
        name: 'decimals',
        type: 'number',
        required: false,
        description: 'Number of decimal places to show',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Rate.TextLabel': [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Rate.Container': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Container content',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Rate.ErrorText': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Error message content',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: 'ID for the error element',
      },
    ],
  },

  variants: [
    {
      name: 'size',
      values: ['sm', 'md', 'lg', 'xl'],
      default: 'md',
      description: 'Controls the icon size and spacing',
    },
    {
      name: 'state',
      values: ['default', 'readOnly', 'disabled', 'error'],
      default: 'default',
      description: 'Interaction and visual state',
    },
  ],

  states: [
    'default',
    'hover',
    'focused',
    'readOnly',
    'disabled',
    'error',
    'filled',
    'half-filled',
    'empty',
  ],

  responsive: {
    allowed: false,
    patterns: [],
  },

  design_tokens: {
    used: {
      colors: [
        'ground-300',
        'ground-500',
        'ground-600',
        'ground-700',
        'ground-400',
        'warning-500',
        'warning-400',
        'error-500',
        'error-400',
        'primary-500',
      ],
      spacing: ['gap-0.5', 'gap-1', 'gap-1.5', 'gap-2', 'gap-3', 'mb-1', 'mb-2', 'mt-1'],
      typography: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
      radius: ['rounded'],
      border: ['ring-2', 'ring-offset-2'],
    },
    recommended: {
      colors: ['warning-500', 'warning-400'],
      typography: ['text-sm', 'text-base'],
    },
    allowed: {
      colors: [
        'ground-300',
        'ground-400',
        'ground-500',
        'ground-600',
        'ground-700',
        'warning-400',
        'warning-500',
        'error-400',
        'error-500',
        'primary-500',
      ],
      typography: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
      spacing: ['gap-0.5', 'gap-1', 'gap-1.5', 'gap-2', 'gap-3'],
    },
  },

  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple uncontrolled rating with default value',
      code: 'import { Rate } from "vayu-ui";\n\n<Rate defaultValue={3} />',
    },
    {
      name: 'Controlled Rating',
      description: 'Rating with controlled state',
      code: 'import { Rate } from "vayu-ui";\n\nconst [rating, setRating] = useState(0);\n<Rate value={rating} onChange={setRating} />',
    },
    {
      name: 'With Labels',
      description: 'Rating with descriptive text labels for each value',
      code: "import { Rate } from \"vayu-ui\";\n\n<Rate\n  defaultValue={3}\n  labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}\n>\n  <Rate.Container>\n    <Rate.Label>Product Rating</Rate.Label>\n    <Rate.Stars />\n    <Rate.TextLabel />\n  </Rate.Container>\n</Rate>",
    },
    {
      name: 'Custom Icon',
      description: 'Rating with custom heart icons',
      code: 'import { Rate } from "vayu-ui";\nimport { Heart } from "lucide-react";\n\n<Rate defaultValue={3} icon={<Heart />} />',
    },
    {
      name: 'Custom Filled & Half Icons',
      description: 'Rating with separate icons for filled and half states',
      code: 'import { Rate } from "vayu-ui";\nimport { Star, StarHalf } from "lucide-react";\n\n<Rate\n  defaultValue={3.5}\n  allowHalf\n  icon={<Star className="text-ground-400" />}\n  filledIcon={<Star className="fill-warning-500 text-warning-500" strokeWidth={0} />}\n  halfIcon={<StarHalf className="fill-warning-500 text-warning-500" strokeWidth={0} />}\n/>',
    },
    {
      name: 'Full Composition',
      description: 'Complete rating with all compound components',
      code: "import { Rate } from \"vayu-ui\";\n\n<Rate\n  defaultValue={3}\n  labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}\n>\n  <Rate.Label>Rate this product</Rate.Label>\n  <Rate.Description>Share your experience with others.</Rate.Description>\n  <Rate.Container>\n    <Rate.Stars />\n    <Rate.Value />\n    <Rate.TextLabel />\n  </Rate.Container>\n  <Rate.ErrorText>Please provide a rating</Rate.ErrorText>\n</Rate>",
    },
  ],

  accessibility: {
    pattern: 'slider',
    standards: ['WCAG 2.1 AA', 'ARIA 1.2', 'Screen reader compatible'],
    keyboard_support: [
      'ArrowRight / ArrowUp: Increase rating by step (0.5 or 1)',
      'ArrowLeft / ArrowDown: Decrease rating by step (0.5 or 1)',
      'Home: Set rating to minimum (0)',
      'End: Set rating to maximum (count)',
      'Tab: Focus the rating component',
      'Click: Set rating value',
    ],
    aria_attributes: [
      'role="slider"',
      'aria-valuemin="0"',
      'aria-valuemax="{count}"',
      'aria-valuenow="{currentValue}"',
      'aria-readonly="{readOnly}"',
      'aria-disabled="{isDisabled}"',
      'aria-live="polite" (for Rate.TextLabel and Rate.ErrorText)',
      'role="status" (for Rate.TextLabel)',
      'role="alert" (for Rate.ErrorText)',
    ],
  },

  anti_patterns: [
    'Using Rate.Star directly outside of Rate.Stars context',
    'Not providing labels when using Rate.TextLabel',
    'Setting both value and defaultValue (use one or the other)',
    'Not handling onChange in controlled mode',
    'Using Rate.ErrorText without error prop set to true',
  ],

  dependencies: {
    icons: [],
    utilities: [],
    components: [],
  },

  relationships: {
    used_with: ['Form', 'Card', 'Modal', 'Review components'],
    often_inside: ['Form', 'Card', 'ProductCard', 'ReviewSection'],
    often_contains: [],
  },

  related_components: [],

  validation_rules: [
    'Rate compound components must be used within Rate root',
    'Rate.TextLabel requires labels prop to be defined on root Rate',
    'Rate.ErrorText only renders when error prop is true and children are provided',
    'In controlled mode, value prop must be provided and onChange handler should update the value',
    'allowHalf prop affects keyboard step size (0.5 vs 1)',
    'icon, filledIcon, halfIcon fallback chain: halfIcon -> filledIcon -> icon',
  ],

  installation: ['npx vayu-ui init', 'npx vayu-ui add rate'],

  source: {
    file: 'packages/ui/src/components/ui/rate.tsx',
    language: 'TypeScript',
    framework: 'React',
  },

  meta: {
    doc_url: '/docs/components/rate',
    source_file: 'packages/ui/src/components/ui/rate.tsx',
    extracted: [
      'component',
      'slug',
      'description',
      'props',
      'variants',
      'accessibility',
      'examples',
      'installation',
    ],
    inferred: [
      'ai_summary',
      'ai_keywords',
      'intent',
      'when_to_use',
      'when_not_to_use',
      'relationships',
      'anti_patterns',
      'validation_rules',
      'design_tokens',
    ],
  },
};
