export const accordionRegistry = {
  component: "Accordion",
  slug: "accordion",
  category: "disclosure",

  complexity: "compound" as const,

  description: "A vertically stacked set of interactive headings that each reveal a section of content.",
  ai_summary: "Accordion is a compound component for organizing content into collapsible sections. Composed of Accordion.Item, Accordion.Header, and Accordion.Body. Supports single or multiple open panels with animated transitions and full keyboard navigation.",

  intent: [
    "Organize related content into collapsible sections",
    "Reduce visual clutter by hiding content behind headings",
    "Present FAQ or Q&A content",
    "Create space-efficient navigation for settings panels"
  ],
  ai_keywords: [
    "accordion",
    "collapsible",
    "expandable",
    "disclosure",
    "FAQ",
    "toggle",
    "collapse",
    "expand",
    "panel",
    "section"
  ],

  when_to_use: [
    "When you need to organize related but independent sections of content",
    "For FAQ or Q&A layouts",
    "When vertical space is limited and content can be grouped",
    "For settings panels with multiple categories",
    "When users only need to see specific sections at a time"
  ],
  when_not_to_use: [
    "When all content needs to be visible simultaneously",
    "For critical information that should always be in view",
    "When the content inside is interdependent",
    "For very short content that doesn't benefit from collapsing"
  ],

  composition: {
    root: "Accordion",
    slots: [
      "Accordion.Item",
      "Accordion.Header",
      "Accordion.Body"
    ],
    structure: [
      "Accordion",
      "Accordion.Item",
      "Accordion.Header",
      "Accordion.Body"
    ],
    rules: [
      "Accordion.Item must be a direct child of Accordion",
      "Accordion.Header must be inside Accordion.Item",
      "Accordion.Body must be inside Accordion.Item",
      "Accordion.Header itemId must match parent Accordion.Item itemId",
      "Accordion.Body itemId must match parent Accordion.Item itemId"
    ]
  },

  props: {
    Accordion: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Accordion.Item components to render inside the accordion"
      },
      {
        name: "allowMultiple",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether multiple items can be open at the same time"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the accordion container"
      }
    ],
    "Accordion.Item": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Accordion.Header and Accordion.Body components"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Unique identifier for the item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the item container"
      }
    ],
    "Accordion.Header": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Content to display in the header button"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Must match the itemId of the parent Accordion.Item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the header button"
      }
    ],
    "Accordion.Body": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Content to display when the accordion item is expanded"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Must match the itemId of the parent Accordion.Item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the body content"
      }
    ]
  },

  variants: [],

  states: [
    "expanded",
    "collapsed",
    "hovered",
    "focused"
  ],

  responsive: {
    allowed: false,
    patterns: []
  },

  design_tokens: {
    used: {
      colors: [
        "ground-200",
        "ground-800",
        "ground-950",
        "ground-900",
        "ground-50",
        "ground-100",
        "ground-400",
        "ground-500",
        "ground-600",
        "primary-500",
        "primary-600",
        "primary-400"
      ],
      radius: ["xl"],
      border: ["border", "border-b"],
      spacing: ["px-5", "py-4", "pb-5", "pt-1", "my-2", "ml-3"],
      typography: ["font-secondary", "font-medium", "text-base", "text-left", "leading-relaxed"]
    },
    recommended: {
      colors: [
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-100",
        "primary-500"
      ],
      radius: ["xl"],
      typography: ["font-secondary", "font-medium"]
    },
    allowed: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-400",
        "ground-500",
        "ground-600",
        "ground-800",
        "ground-900",
        "ground-950",
        "primary-400",
        "primary-500",
        "primary-600"
      ],
      radius: ["xl"],
      border: ["border", "border-b"],
      spacing: ["px-5", "py-4", "pb-5", "pt-1", "my-2", "ml-3"],
      typography: ["font-secondary", "font-medium", "text-base", "text-left", "leading-relaxed"]
    }
  },

  examples: [
    {
      name: "Basic Accordion",
      description: "A simple single-select accordion where only one item can be open at a time",
      code: `<Accordion>
  <Accordion.Item itemId="item-1">
    <Accordion.Header itemId="item-1">
      Is it accessible?
    </Accordion.Header>
    <Accordion.Body itemId="item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="item-2">
    <Accordion.Header itemId="item-2">
      Is it styled?
    </Accordion.Header>
    <Accordion.Body itemId="item-2">
      <p>Yes. It comes with default styles that matches the other components' aesthetic.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="item-3">
    <Accordion.Header itemId="item-3">
      Is it animated?
    </Accordion.Header>
    <Accordion.Body itemId="item-3">
      <p>Yes. It's animated by default, but you can disable it if you prefer. Animations respect prefers-reduced-motion preferences.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`
    },
    {
      name: "Multiple Open Items",
      description: "An accordion that allows multiple items to be expanded simultaneously",
      code: `<Accordion allowMultiple>
  <Accordion.Item itemId="multi-item-1">
    <Accordion.Header itemId="multi-item-1">
      Is it accessible?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="multi-item-2">
    <Accordion.Header itemId="multi-item-2">
      Is it styled?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-2">
      <p>Yes. It comes with default styles that matches the other components' aesthetic.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="multi-item-3">
    <Accordion.Header itemId="multi-item-3">
      Is it animated?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-3">
      <p>Yes. It's animated by default, but you can disable it if you prefer.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`
    }
  ],

  accessibility: {
    pattern: "WAI-ARIA Accordion Pattern",
    standards: [
      "WAI-ARIA accordion pattern compliance",
      "WCAG 2.2 AA standards"
    ],
    keyboard_support: [
      "ArrowDown - Move focus to the next accordion header",
      "ArrowUp - Move focus to the previous accordion header",
      "Home - Move focus to the first accordion header",
      "End - Move focus to the last accordion header",
      "Escape - Close the currently open panel when focused",
      "Enter/Space - Toggle the accordion panel"
    ],
    aria_attributes: [
      "aria-expanded - Indicates whether the accordion panel is expanded",
      "aria-controls - References the controlled panel by ID",
      "aria-labelledby - Labels the panel region by its header",
      "aria-hidden - Hides closed panels from screen readers",
      "role='region' - Identifies the panel as a landmark region"
    ]
  },

  anti_patterns: [
    "Nesting accordions inside accordion bodies",
    "Using non-unique itemId values across items",
    "Mismatching itemId between Item, Header, and Body",
    "Placing critical content that must always be visible inside an accordion",
    "Using accordion for navigation menus with many items"
  ],

  dependencies: {
    icons: ["ChevronDownIcon"],
    utilities: ["cn"],
    components: []
  },

  relationships: {
    used_with: [],
    often_inside: ["Card", "Modal", "Drawer"],
    often_contains: []
  },

  related_components: [],

  validation_rules: [
    "Accordion.Item must be a direct child of Accordion",
    "Accordion.Header must be inside Accordion.Item",
    "Accordion.Body must be inside Accordion.Item",
    "Accordion.Header itemId must match parent Accordion.Item itemId",
    "Accordion.Body itemId must match parent Accordion.Item itemId",
    "Each itemId must be unique within an Accordion"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add accordion"
  ],

  source: {
    file: "packages/ui/src/components/ui/accordion.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/accordion",
    source_file: "packages/ui/src/components/ui/accordion.tsx",
    extracted: [
      "component",
      "slug",
      "description",
      "composition",
      "props",
      "accessibility",
      "dependencies",
      "installation",
      "examples"
    ],
    inferred: [
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "states",
      "responsive",
      "anti_patterns",
      "relationships",
      "validation_rules",
      "design_tokens"
    ]
  }
};

export default accordionRegistry;
