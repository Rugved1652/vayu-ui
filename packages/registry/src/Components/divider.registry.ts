import { VayuComponentDoc } from "../types";

export const dividerRegistry: VayuComponentDoc = {
  component: "Divider",
  slug: "divider",
  category: "Layout",

  complexity: "compound",

  description: "Visually or semantically separates content sections with horizontal or vertical lines, supporting labels and multiple visual variants.",
  ai_summary: "A compound component for creating visual or semantic separators. Supports horizontal and vertical orientations, labeled dividers, multiple line styles (solid, dashed, dotted), and WCAG-compliant color tokens. True server component with no client-side JavaScript required.",

  intent: [
    "Separate distinct content sections",
    "Create visual breaks between UI elements",
    "Divide navigation items vertically",
    "Add labeled separators (e.g., 'OR' in forms)",
    "Provide semantic structure for screen readers"
  ],

  ai_keywords: [
    "separator",
    "divider",
    "horizontal line",
    "vertical line",
    "content break",
    "section divider",
    "labeled separator",
    "visual separator",
    "semantic separator"
  ],

  when_to_use: [
    "Separating distinct sections of content",
    "Creating visual breaks between related elements",
    "Dividing navigation items in horizontal menus",
    "Adding 'OR' labels between authentication options",
    "Providing semantic structure for accessibility"
  ],

  when_not_to_use: [
    "As a decorative border around components (use Box with border instead)",
    "For creating grid layouts (use Grid component)",
    "As a loading indicator (use Spinner or Skeleton)",
    "For interactive content separation (use Tabs)"
  ],

  composition: {
    root: "Divider",
    slots: ["Divider.Line", "Divider.Label"],
    structure: ["Divider", "Divider.Line", "Divider.Label"],
    rules: [
      "Divider.Line and Divider.Label must be children of Divider (root)",
      "Divider.Label requires Divider.Line on both sides for labeled dividers",
      "Divider renders a default Divider.Line when no children are provided",
      "All parts are server components and require no 'use client' directive"
    ]
  },

  props: {
    Divider: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        required: false,
        default: "'horizontal'",
        description: "Orientation of the divider"
      },
      {
        name: "spacing",
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        required: false,
        default: "'md'",
        description: "Spacing margin around the divider"
      },
      {
        name: "decorative",
        type: "boolean",
        required: false,
        default: false,
        description: "If true, the divider is purely decorative (aria-hidden). If false, renders as semantic separator with ARIA role"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "If provided, used as content (flex container). If not, renders a default line"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Divider.Line": [
      {
        name: "variant",
        type: "'solid' | 'dashed' | 'dotted'",
        required: false,
        default: "'solid'",
        description: "Visual style of the line"
      },
      {
        name: "color",
        type: "'ground' | 'primary' | 'success' | 'warning' | 'error' | 'info'",
        required: false,
        default: "'ground'",
        description: "Theme color of the line using design tokens"
      },
      {
        name: "size",
        type: "'thin' | 'normal' | 'thick' | 'bold'",
        required: false,
        default: "'normal'",
        description: "Thickness preset (maps to pixel values: 1, 2, 3, 4)"
      },
      {
        name: "thickness",
        type: "number",
        required: false,
        description: "Custom pixel thickness (overrides size)"
      },
      {
        name: "opacity",
        type: "number",
        required: false,
        default: 1,
        description: "Opacity of the line (0-1)"
      },
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        required: false,
        description: "Orientation of the line (inherits from parent Divider)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Divider.Label": [
      {
        name: "color",
        type: "'ground' | 'primary' | 'success' | 'warning' | 'error' | 'info'",
        required: false,
        default: "'ground'",
        description: "Text color of the label using design tokens"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Label text or content"
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
      name: "orientation",
      values: ["horizontal", "vertical"],
      default: "horizontal",
      description: "Direction of the divider"
    },
    {
      name: "variant",
      values: ["solid", "dashed", "dotted"],
      default: "solid",
      description: "Line style of the divider"
    },
    {
      name: "spacing",
      values: ["none", "sm", "md", "lg", "xl", "2xl"],
      default: "md",
      description: "Margin spacing around the divider"
    },
    {
      name: "color",
      values: ["ground", "primary", "success", "warning", "error", "info"],
      default: "ground",
      description: "Theme color for the divider line and label"
    },
    {
      name: "size",
      values: ["thin", "normal", "thick", "bold"],
      default: "normal",
      description: "Thickness of the divider line"
    }
  ],

  states: [],

  responsive: {
    allowed: true,
    patterns: [
      "Use responsive className utilities for spacing adjustments",
      "Orientation can be conditionally rendered based on viewport",
      "Consider hiding vertical dividers on mobile viewports"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-400",
        "ground-600",
        "ground-300",
        "primary-300",
        "primary-600",
        "primary-700",
        "success-400",
        "success-600",
        "success-700",
        "warning-500",
        "warning-600",
        "warning-800",
        "warning-200",
        "error-400",
        "error-600",
        "error-700",
        "info-400",
        "info-600",
        "info-700"
      ],
      spacing: ["my-0", "my-2", "my-4", "my-6", "my-8", "my-12", "mx-0", "mx-2", "mx-4", "mx-6", "mx-8", "mx-12", "px-3", "py-1"]
    },
    recommended: {
      colors: ["ground-400", "ground-600"],
      spacing: ["my-4", "mx-4"]
    },
    allowed: {
      colors: ["ground", "primary", "success", "warning", "error", "info"],
      spacing: ["none", "sm", "md", "lg", "xl", "2xl"]
    }
  },

  examples: [
    {
      name: "Simple Divider",
      description: "Basic horizontal divider with default styling",
      code: `<Divider />`
    },
    {
      name: "Vertical Divider",
      description: "Vertical dividers for separating navigation items",
      code: `<div className="flex items-center h-5 space-x-2 text-sm">
  <div>Blog</div>
  <Divider orientation="vertical" />
  <div>Docs</div>
  <Divider orientation="vertical" />
  <div>Source</div>
</div>`
    },
    {
      name: "Labeled Divider",
      description: "Divider with centered label using compound pattern",
      code: `<Divider>
  <Divider.Line />
  <Divider.Label>OR</Divider.Label>
  <Divider.Line />
</Divider>`
    },
    {
      name: "Dashed Primary Divider",
      description: "Custom styled divider with dashed line and primary color",
      code: `<Divider>
  <Divider.Line variant="dashed" color="primary" />
  <Divider.Label color="primary">Dashed Primary</Divider.Label>
  <Divider.Line variant="dashed" color="primary" />
</Divider>`
    },
    {
      name: "Decorative Divider",
      description: "Divider marked as decorative for purely visual use",
      code: `<Divider decorative />`
    },
    {
      name: "Thick Error Divider",
      description: "Thick divider with error color for attention",
      code: `<Divider>
  <Divider.Line color="error" size="thick" />
  <Divider.Label color="error">Warning</Divider.Label>
  <Divider.Line color="error" size="thick" />
</Divider>`
    }
  ],

  accessibility: {
    pattern: "ARIA Separator",
    standards: [
      "WCAG 1.4.11 - 3:1 contrast ratio for borders using ground-400",
      "WCAG - 4.5:1 contrast ratio minimum for text labels",
      "WAI-ARIA separator role specification"
    ],
    keyboard_support: [],
    aria_attributes: [
      "role='separator' - Applied when divider has no children and is not decorative",
      "aria-orientation - Set to 'horizontal' or 'vertical' based on orientation prop",
      "aria-hidden='true' - Applied when decorative prop is true"
    ]
  },

  anti_patterns: [
    "Using divider as a border container - use Box component with border instead",
    "Nesting dividers inside each other",
    "Using multiple dividers consecutively without content between them",
    "Setting decorative=false on dividers with labels (labels are already readable content)",
    "Ignoring color contrast requirements when customizing colors"
  ],

  dependencies: {
    utilities: ["clsx"]
  },

  relationships: {
    used_with: ["Card", "Container", "Stack", "Form", "Navigation"],
    often_inside: ["Card", "Container", "Modal", "Sidebar"],
    often_contains: []
  },

  related_components: [],

  validation_rules: [
    "Divider.Line must be a direct child of Divider",
    "Divider.Label must be a direct child of Divider",
    "thickness prop should be a positive number if provided",
    "opacity prop should be between 0 and 1",
    "When using vertical orientation, parent should have defined height"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add divider"
  ],

  source: {
    file: "packages/ui/src/components/ui/divider.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/divider",
    source_file: "packages/ui/src/components/ui/divider.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "design_tokens",
      "composition",
      "installation"
    ],
    inferred: [
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "relationships",
      "anti_patterns",
      "validation_rules"
    ]
  }
};
