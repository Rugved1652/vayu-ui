import type { VayuComponentDoc } from "../index";

export const skeletonRegistry: VayuComponentDoc = {
  component: "Skeleton",
  slug: "skeleton",
  category: "Feedback",

  complexity: "compound",

  description: "A placeholder loading component that displays animated shapes while content is being fetched or loaded.",
  ai_summary: "Skeleton is a compound component for loading states with 11 subcomponents. Supports multiple animation types (pulse, wave, none), four variants (text, circular, rectangular, rounded), and four size presets. Includes pre-built patterns for Card, Avatar, List, Table, and Grid layouts. WCAG 2.2 AA compliant with screen reader announcements and motion preference support.",

  intent: [
    "Display loading placeholders while content is being fetched",
    "Provide visual feedback during asynchronous operations",
    "Maintain layout stability during content loading",
    "Improve perceived performance with animated placeholders"
  ],
  ai_keywords: [
    "skeleton",
    "loading",
    "placeholder",
    "shimmer",
    "pulse",
    "wave",
    "loader",
    "spinner",
    "skeleton-loader",
    "content-placeholder",
    "loading-state",
    "skeleton-screen"
  ],

  when_to_use: [
    "When fetching data from APIs or databases",
    "During initial page load while content is being loaded",
    "For image galleries or card grids during lazy loading",
    "In list views while items are being fetched",
    "For table data that takes time to load",
    "In avatar or profile sections while user data loads"
  ],
  when_not_to_use: [
    "When content loads instantly (adds unnecessary visual noise)",
    "For static content that never changes",
    "As a permanent UI element",
    "When a simple text 'Loading...' would suffice",
    "For non-critical decorative content",
    "In error states (use Error component instead)"
  ],

  composition: {
    root: "Skeleton",
    slots: [
      "Skeleton.Root",
      "Skeleton.Item",
      "Skeleton.Text",
      "Skeleton.Circle",
      "Skeleton.Rectangle",
      "Skeleton.Card",
      "Skeleton.Avatar",
      "Skeleton.List",
      "Skeleton.Table",
      "Skeleton.Grid",
      "Skeleton.Group"
    ],
    structure: [
      "Skeleton",
      "Skeleton.Root",
      "Skeleton.Item",
      "Skeleton.Text",
      "Skeleton.Circle",
      "Skeleton.Rectangle",
      "Skeleton.Card",
      "Skeleton.Avatar",
      "Skeleton.List",
      "Skeleton.Table",
      "Skeleton.Grid",
      "Skeleton.Group"
    ],
    rules: [
      "Skeleton.Root provides the ARIA live region wrapper for accessibility",
      "Skeleton.Item is the base building block for custom skeletons",
      "Skeleton.Text is optimized for multi-line text placeholders",
      "Skeleton.Circle is ideal for avatar placeholders",
      "Skeleton.Rectangle is for image or card content placeholders",
      "Skeleton.Card, Avatar, List, Table, Grid are pre-built composite patterns",
      "Skeleton.Group is a container for organizing multiple skeleton elements"
    ]
  },

  props: {
    "Skeleton.Root": [
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style for visual feedback"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Default size for child elements (informational)"
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        default: '"Loading"',
        description: "Accessible label for loading state"
      },
      {
        name: "aria-live",
        type: '"polite" | "assertive" | "off"',
        required: false,
        default: '"polite"',
        description: "Whether to announce loading state to screen readers"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Item": [
      {
        name: "variant",
        type: '"text" | "circular" | "rectangular" | "rounded"',
        required: false,
        default: '"text"',
        description: "The shape of the skeleton item"
      },
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Custom width"
      },
      {
        name: "height",
        type: "string | number",
        required: false,
        description: "Custom height"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for the item"
      },
      {
        name: "count",
        type: "number",
        required: false,
        default: 1,
        description: "Number of items to render"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Text": [
      {
        name: "lines",
        type: "number",
        required: false,
        default: 1,
        description: "Number of text lines"
      },
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Width of lines (except last one)"
      },
      {
        name: "lastLineWidth",
        type: "string | number",
        required: false,
        description: "Width of the last line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for text lines"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Circle": [
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size of the circle"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Rectangle": [
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Custom width"
      },
      {
        name: "height",
        type: "string | number",
        required: false,
        description: "Custom height"
      },
      {
        name: "rounded",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to use rounded corners"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Avatar": [
      {
        name: "showText",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show text lines next to the circle"
      },
      {
        name: "textLines",
        type: "number",
        required: false,
        default: 2,
        description: "Number of text lines"
      },
      {
        name: "titleWidth",
        type: "string | number",
        required: false,
        default: '"40%"',
        description: "Width of the title line"
      },
      {
        name: "subtitleWidth",
        type: "string | number",
        required: false,
        default: '"60%"',
        description: "Width of the subtitle line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size of the avatar circle"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Card": [
      {
        name: "showImage",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the image placeholder"
      },
      {
        name: "imageHeight",
        type: "number",
        required: false,
        default: 200,
        description: "Height of the image placeholder"
      },
      {
        name: "lines",
        type: "number",
        required: false,
        default: 3,
        description: "Number of text lines below the image"
      },
      {
        name: "titleWidth",
        type: "string | number",
        required: false,
        default: '"60%"',
        description: "Width of the title line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.List": [
      {
        name: "items",
        type: "number",
        required: false,
        default: 5,
        description: "Number of list items"
      },
      {
        name: "showAvatar",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to include an avatar placeholder in each item"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Table": [
      {
        name: "rows",
        type: "number",
        required: false,
        default: 5,
        description: "Number of rows"
      },
      {
        name: "columns",
        type: "number",
        required: false,
        default: 4,
        description: "Number of columns"
      },
      {
        name: "showHeader",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show a header row"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Grid": [
      {
        name: "items",
        type: "number",
        required: false,
        default: 6,
        description: "Number of grid items"
      },
      {
        name: "columns",
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns"
      },
      {
        name: "itemHeight",
        type: "number",
        required: false,
        default: 200,
        description: "Height of each card's image"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Group": [
      {
        name: "spacing",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Vertical spacing between children"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ]
  },

  variants: [
    {
      name: "animation",
      values: ["pulse", "wave", "none"],
      default: "pulse",
      description: "Animation style: pulse (opacity fade), wave (shimmer effect), or none (static)"
    },
    {
      name: "variant",
      values: ["text", "circular", "rectangular", "rounded"],
      default: "text",
      description: "Shape variant for Skeleton.Item: text (full-width lines), circular (round), rectangular (sharp corners), rounded (rounded corners)"
    },
    {
      name: "size",
      values: ["sm", "md", "lg", "xl"],
      default: "md",
      description: "Size preset affecting dimensions of skeleton elements"
    }
  ],

  states: ["loading", "loaded"],

  responsive: {
    allowed: true,
    patterns: [
      "Skeleton.Grid columns can be adjusted per breakpoint",
      "Skeleton.Table columns adapt to container width",
      "Width and height props accept responsive values",
      "Pre-built patterns use responsive-friendly defaults"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-950"
      ],
      radius: ["rounded", "rounded-lg", "rounded-full"],
      border: ["border", "border-b", "border-transparent"],
      spacing: [
        "p-3",
        "p-4",
        "gap-3",
        "gap-4",
        "mb-2",
        "mb-3",
        "mb-4",
        "space-y-2",
        "space-y-4",
        "space-y-6"
      ],
      typography: []
    },
    recommended: {
      colors: ["ground-200", "ground-800", "ground-50", "ground-950"],
      radius: ["rounded", "rounded-lg", "rounded-full"]
    },
    allowed: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-950"
      ],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"],
      border: ["border", "border-b", "border-transparent"],
      spacing: ["p-*", "gap-*", "m-*", "space-y-*", "mb-*"],
      typography: []
    }
  },

  examples: [
    {
      name: "Basic Skeleton Text",
      description: "Simple text skeleton with 3 lines",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Text lines={3} />`
    },
    {
      name: "Avatar Skeleton",
      description: "Avatar placeholder with text lines",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Avatar showText textLines={2} />`
    },
    {
      name: "Card Skeleton",
      description: "Card layout skeleton with image and text",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Card showImage imageHeight={200} lines={3} />`
    },
    {
      name: "Custom Item Skeleton",
      description: "Custom rectangular skeleton with specific dimensions",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Item variant="rectangular" height={200} />`
    },
    {
      name: "With Root Wrapper",
      description: "Skeleton with accessibility wrapper for screen readers",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Root animation="wave" aria-label="Loading content">
  <Skeleton.Text lines={2} animation="wave" />
</Skeleton.Root>`
    },
    {
      name: "List Skeleton",
      description: "List items skeleton with avatars",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.List items={5} showAvatar />`
    },
    {
      name: "Table Skeleton",
      description: "Table skeleton with header",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Table rows={5} columns={4} showHeader />`
    },
    {
      name: "Grid Skeleton",
      description: "Grid of card skeletons",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Grid items={6} columns={3} itemHeight={200} />`
    },
    {
      name: "Complete Anatomy",
      description: "Full anatomy showing all subcomponents",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Root aria-label="Loading content">
  <Skeleton.Item variant="text" />
  <Skeleton.Text lines={3} />
  <Skeleton.Circle size="md" />
  <Skeleton.Rectangle height={200} />
  <Skeleton.Avatar />
  <Skeleton.Card />
  <Skeleton.List items={5} />
  <Skeleton.Table rows={5} columns={4} />
  <Skeleton.Grid items={6} columns={3} />
  <Skeleton.Group spacing="md">
    {/* Multiple skeleton items */}
  </Skeleton.Group>
</Skeleton.Root>`
    }
  ],

  accessibility: {
    pattern: "WCAG 2.2 AA ARIA Live Region",
    standards: [
      "WAI-ARIA status role for loading announcements",
      "WCAG 2.2 AA compliant color contrast",
      "Respects prefers-reduced-motion media query",
      "Server-side rendering compatible"
    ],
    keyboard_support: [],
    aria_attributes: [
      "role=\"status\" - On Skeleton.Root to announce loading state",
      "aria-live=\"polite\" - For deferred loading announcements",
      "aria-live=\"assertive\" - For immediate loading announcements",
      "aria-busy=\"true\" - Indicates content is loading",
      "aria-label - Describes what is loading",
      "aria-hidden=\"true\" - On decorative skeleton items",
      "sr-only span - Provides screen reader text"
    ]
  },

  anti_patterns: [
    "Using skeleton when content loads instantly (adds unnecessary visual noise)",
    "Not wrapping skeletons in Skeleton.Root for accessibility",
    "Using Skeleton.Card or Skeleton.Grid inside Skeleton.List (over-nesting)",
    "Setting animation to 'wave' without the required CSS keyframes",
    "Using skeleton placeholders for error states",
    "Not considering prefers-reduced-motion for users with motion sensitivity"
  ],

  dependencies: {
    icons: [],
    utilities: [],
    components: []
  },

  relationships: {
    used_with: ["Card", "Avatar", "List", "Table", "Grid", "DataGrid"],
    often_inside: ["Page", "Section", "Card", "Container", "Dialog"],
    often_contains: []
  },

  related_components: ["Spinner", "Progress"],

  validation_rules: [
    "Skeleton.Root should wrap skeleton elements for accessibility",
    "Skeleton.Item variant must be one of: text, circular, rectangular, rounded",
    "Skeleton.Item count should be a positive integer",
    "Skeleton.Text lines should be a positive integer",
    "Skeleton.List items should be a positive integer",
    "Skeleton.Table rows and columns should be positive integers",
    "Skeleton.Grid items and columns should be positive integers",
    "animation prop must be one of: pulse, wave, none"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add skeleton"
  ],

  source: {
    file: "packages/ui/src/components/ui/skeleton/",
    language: "TypeScript",
    framework: "React"
  },

  meta: {
    doc_url: "/docs/components/skeleton",
    source_file: "packages/ui/src/components/ui/skeleton/",
    extracted: [
      "component",
      "slug",
      "complexity",
      "composition",
      "props",
      "variants",
      "design_tokens",
      "accessibility",
      "installation",
      "examples"
    ],
    inferred: [
      "category",
      "ai_summary",
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "states",
      "responsive",
      "anti_patterns",
      "relationships",
      "related_components",
      "validation_rules",
      "dependencies"
    ]
  }
};

export default skeletonRegistry;
