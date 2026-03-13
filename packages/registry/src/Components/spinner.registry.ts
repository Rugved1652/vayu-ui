export const spinnerRegistry = {
  component: "Spinner",
  slug: "spinner",
  category: "Feedback",

  complexity: "simple",

  description: "A loading spinner component to indicate active states and loading processes.",
  ai_summary: "A WCAG 2.2 AA compliant loading indicator with three sizes (sm, md, lg), smooth CSS animation, dark mode support, and full accessibility including reduced motion preferences.",

  intent: [
    "Indicate loading or processing states",
    "Provide visual feedback during async operations",
    "Show active background processes",
    "Display loading states in buttons and forms"
  ],
  ai_keywords: [
    "spinner",
    "loading",
    "loader",
    "indicator",
    "progress",
    "animation",
    "async",
    "feedback",
    "wcag",
    "accessible"
  ],

  when_to_use: [
    "Displaying loading states for async operations",
    "Indicating background processing in buttons",
    "Showing content loading in containers",
    "Full-page loading overlays",
    "Inline loading indicators next to text"
  ],
  when_not_to_use: [
    "Progress tracking with known percentages (use Progress component instead)",
    "Skeleton loading states for content placeholders (use Skeleton component)",
    "Indefinite loading without any context or label"
  ],

  composition: {
    root: "Spinner",
    slots: [],
    structure: ["Spinner"],
    rules: [
      "Spinner is a standalone component with no subcomponents",
      "Always provide an aria-label for screen reader context"
    ]
  },

  props: {
    Spinner: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Size of the spinner (sm: 16px, md: 24px, lg: 32px)"
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        default: '"Loading"',
        description: "Accessible label for screen readers"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes for customization"
      }
    ]
  },

  variants: [
    {
      name: "size",
      values: ["sm", "md", "lg"],
      default: "md",
      description: "Size variant affecting spinner dimensions"
    }
  ],

  states: [],

  responsive: {
    allowed: true,
    patterns: [
      "Use sm size for inline text and buttons",
      "Use md size for general loading states",
      "Use lg size for full-page loaders and prominent areas"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "border-primary-500",
        "border-primary-400",
        "border-t-transparent"
      ],
      border: [
        "rounded-full",
        "border-2"
      ],
      spacing: [
        "w-4",
        "h-4",
        "w-6",
        "h-6",
        "w-8",
        "h-8"
      ],
      typography: [
        "sr-only"
      ]
    },
    recommended: {
      colors: [
        "border-primary-500",
        "border-primary-400"
      ],
      border: [
        "rounded-full",
        "border-2"
      ]
    },
    allowed: {
      colors: [
        "border-primary-500",
        "border-primary-400",
        "border-info-500",
        "border-info-400",
        "border-success-500",
        "border-success-400",
        "border-warning-500",
        "border-warning-400",
        "border-error-500",
        "border-error-400",
        "border-t-transparent"
      ],
      border: [
        "rounded-full",
        "border-2"
      ],
      spacing: [
        "w-4",
        "h-4",
        "w-6",
        "h-6",
        "w-8",
        "h-8"
      ]
    }
  },

  examples: [
    {
      name: "Basic Usage",
      description: "Default spinner with medium size",
      code: `import { Spinner } from "vayu-ui";

<Spinner size="md" />`
    },
    {
      name: "All Sizes",
      description: "Spinner in small, medium, and large sizes",
      code: `import { Spinner } from "vayu-ui";

<div className="flex items-center gap-6">
  <Spinner size="sm" aria-label="Loading (small)" />
  <Spinner size="md" aria-label="Loading (medium)" />
  <Spinner size="lg" aria-label="Loading (large)" />
</div>`
    },
    {
      name: "With Loading Text",
      description: "Spinner paired with descriptive text",
      code: `import { Spinner } from "vayu-ui";

<div className="flex items-center gap-3">
  <Spinner size="md" aria-label="Fetching user data" />
  <span className="text-sm text-ground-600">Fetching user data...</span>
</div>`
    },
    {
      name: "Button Integration",
      description: "Spinner inside a disabled button",
      code: `import { Spinner } from "vayu-ui";

<button
  disabled
  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-ground-900 rounded"
>
  <Spinner size="sm" className="border-ground-900 border-t-transparent" />
  Processing...
</button>`
    },
    {
      name: "Custom Colors",
      description: "Spinner with semantic color variants",
      code: `import { Spinner } from "vayu-ui";

<div className="flex items-center gap-6">
  <Spinner className="border-info-500 border-t-transparent" />
  <Spinner className="border-success-500 border-t-transparent" />
  <Spinner className="border-warning-500 border-t-transparent" />
  <Spinner className="border-error-500 border-t-transparent" />
</div>`
    },
    {
      name: "Full Page Loader",
      description: "Centered full-page loading overlay",
      code: `import { Spinner } from "vayu-ui";

<div className="fixed inset-0 flex items-center justify-center bg-ground-50/80 dark:bg-ground-950/80">
  <Spinner size="lg" aria-label="Loading page content" />
</div>`
    }
  ],

  accessibility: {
    pattern: "WCAG 2.2 AA compliant loading indicator",
    standards: [
      "WCAG 2.2 AA - Live region announcements",
      "WCAG 2.2 AA - Reduced motion support",
      "WCAG 4.1.2 - Name, Role, Value"
    ],
    keyboard_support: [
      "No keyboard interaction required (non-interactive element)"
    ],
    aria_attributes: [
      "role='status' - Identifies the element as a live region",
      "aria-live='polite' - Announces changes non-intrusively",
      "aria-busy='true' - Indicates the element is in a loading state",
      "aria-label - Provides contextual description for screen readers",
      "sr-only text - Fallback content for screen readers"
    ]
  },

  anti_patterns: [
    "Using spinner without an aria-label for context",
    "Multiple spinners on the same page without distinct labels",
    "Using spinner for determinate progress (use Progress component instead)",
    "Not handling prefers-reduced-motion for users with motion sensitivity"
  ],

  dependencies: {
    utilities: ["cn"]
  },

  relationships: {
    used_with: ["Button", "Card", "Dialog", "Form"],
    often_inside: ["Button", "Card", "Dialog", "Sheet"],
    often_contains: []
  },

  related_components: ["Skeleton", "Progress"],

  validation_rules: [
    "Spinner should have an aria-label describing what is loading",
    "Use sr-only text or visible label to provide loading context",
    "When used in buttons, ensure button has aria-busy='true' and is disabled"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add spinner"
  ],

  source: {
    file: "src/components/ui/spinner.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/spinner",
    source_file: "packages/ui/src/components/ui/spinner.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "design_tokens"
    ],
    inferred: [
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "composition",
      "responsive",
      "anti_patterns",
      "dependencies",
      "relationships",
      "validation_rules"
    ]
  }
};
