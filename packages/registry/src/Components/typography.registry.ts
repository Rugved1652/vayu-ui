export const typographyRegistry = {
  component: "Typography",
  slug: "typography",
  category: "Typography",

  complexity: "simple",

  description: "Text styles and variants for headings, paragraphs, and other text elements with WCAG 2.2 AA compliance.",
  ai_summary: "A compound typography component providing semantic text elements (H1-H6, P, Label, Link, Code, CTA) with consistent styling, color variants, and full accessibility support for building readable, accessible interfaces.",

  intent: [
    "Display semantic text content",
    "Create visual hierarchy with headings",
    "Provide accessible text styling",
    "Support multiple text variants for different contexts"
  ],
  ai_keywords: [
    "typography",
    "text",
    "heading",
    "paragraph",
    "label",
    "link",
    "code",
    "cta",
    "accessible",
    "wcag"
  ],

  when_to_use: [
    "Displaying page headings and titles",
    "Rendering paragraph content",
    "Creating form labels",
    "Showing inline code snippets",
    "Building call-to-action text",
    "Creating accessible navigation links"
  ],
  when_not_to_use: [
    "Interactive button elements (use Button component instead)",
    "Complex code blocks with syntax highlighting (use CodeBlock component)",
    "Rich text editors (use dedicated editor components)"
  ],

  composition: {
    root: "Typography",
    slots: [
      "Typography.H1",
      "Typography.H2",
      "Typography.H3",
      "Typography.H4",
      "Typography.H5",
      "Typography.H6",
      "Typography.P",
      "Typography.Label",
      "Typography.Link",
      "Typography.Code",
      "Typography.CTA"
    ],
    structure: [
      "Typography",
      "Typography.H1",
      "Typography.H2",
      "Typography.H3",
      "Typography.H4",
      "Typography.H5",
      "Typography.H6",
      "Typography.P",
      "Typography.Label",
      "Typography.Link",
      "Typography.Code",
      "Typography.CTA"
    ],
    rules: [
      "Each typography element is standalone and can be used independently",
      "Maintain proper heading hierarchy (H1 → H2 → H3, etc.)",
      "Use Typography.Label with htmlFor to associate with form controls"
    ]
  },

  props: {
    "BaseTypographyProps": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "The content of the component"
      },
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
        required: false,
        default: "'primary'",
        description: "The visual style variant of the text"
      },
      {
        name: "ellipsis",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to truncate text with ellipsis"
      },
      {
        name: "font",
        type: "'primary' | 'secondary'",
        required: false,
        description: "The font family to use"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "id",
        type: "string",
        required: false,
        description: "HTML id attribute"
      },
      {
        name: "ariaLabel",
        type: "string",
        required: false,
        description: "ARIA label for accessibility"
      },
      {
        name: "ariaDescribedby",
        type: "string",
        required: false,
        description: "ARIA describedby reference"
      },
      {
        name: "ariaHidden",
        type: "boolean",
        required: false,
        description: "Hide element from screen readers"
      },
      {
        name: "lang",
        type: "string",
        required: false,
        description: "HTML lang attribute for content language"
      },
      {
        name: "role",
        type: "React.AriaRole",
        required: false,
        description: "ARIA role for semantic meaning"
      }
    ],
    "Typography.Label": [
      {
        name: "htmlFor",
        type: "string",
        required: false,
        description: "Associates label with form control"
      }
    ],
    "Typography.Link": [
      {
        name: "href",
        type: "string",
        required: false,
        description: "URL or path for the link"
      },
      {
        name: "target",
        type: "string",
        required: false,
        description: "Link target (e.g., '_blank')"
      }
    ],
    "Typography.Code": [
      {
        name: "codeLang",
        type: "string",
        required: false,
        description: "Programming language for code (e.g., 'typescript')"
      }
    ]
  },

  variants: [
    {
      name: "variant",
      values: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"],
      default: "primary",
      description: "Visual style variant affecting text color and appearance"
    },
    {
      name: "font",
      values: ["primary", "secondary"],
      description: "Font family variant"
    }
  ],

  states: [],

  responsive: {
    allowed: true,
    patterns: [
      "H1: text-4xl sm:text-5xl lg:text-6xl",
      "H2: text-3xl sm:text-4xl lg:text-5xl",
      "H3: text-2xl sm:text-3xl lg:text-4xl",
      "H4: text-xl sm:text-2xl lg:text-3xl",
      "H5: text-lg sm:text-xl lg:text-2xl",
      "H6: text-base sm:text-lg lg:text-xl"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "text-ground-900",
        "text-ground-50",
        "text-primary-700",
        "text-primary-600",
        "text-primary-300",
        "text-primary-400",
        "text-primary-800",
        "text-red-700",
        "text-red-400",
        "text-amber-700",
        "text-amber-400",
        "text-blue-700",
        "text-blue-300",
        "text-green-700",
        "text-green-400",
        "text-link"
      ],
      typography: [
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "text-3xl",
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
        "text-sm",
        "text-para",
        "text-paragraph",
        "text-para-size",
        "text-cta",
        "font-bold",
        "font-extrabold",
        "font-semibold",
        "font-mono",
        "tracking-tight",
        "leading-tight",
        "leading-relaxed",
        "underline-offset-4"
      ],
      spacing: [
        "px-1.5",
        "py-0.5",
        "ml-1",
        "min-h-11",
        "min-w-11"
      ],
      border: [
        "rounded",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus-visible:ring-2",
        "focus-visible:ring-offset-2"
      ]
    },
    recommended: {
      colors: [
        "text-ground-900",
        "text-ground-50"
      ],
      typography: [
        "tracking-tight",
        "leading-relaxed"
      ]
    },
    allowed: {
      colors: [
        "text-ground-900",
        "text-ground-50",
        "text-primary-700",
        "text-primary-300",
        "text-red-700",
        "text-red-400",
        "text-amber-700",
        "text-amber-400",
        "text-blue-700",
        "text-blue-300",
        "text-green-700",
        "text-green-400"
      ],
      typography: [
        "text-xs",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "font-normal",
        "font-medium",
        "font-semibold",
        "font-bold",
        "font-extrabold"
      ]
    }
  },

  examples: [
    {
      name: "Basic Headings",
      description: "Using typography components for page headings",
      code: `import Typography from "@/components/ui/typography";

<Typography.H1>Main Heading</Typography.H1>
<Typography.H2>Section Title</Typography.H2>
<Typography.H3>Subsection</Typography.H3>`
    },
    {
      name: "Paragraphs with Variants",
      description: "Primary and secondary paragraph styles",
      code: `import Typography from "@/components/ui/typography";

<Typography.P>
  This is a paragraph with optimal readability.
</Typography.P>
<Typography.P variant="secondary">
  Secondary paragraph with less emphasis.
</Typography.P>`
    },
    {
      name: "Form Label",
      description: "Label associated with form input",
      code: `import Typography from "@/components/ui/typography";

<Typography.Label htmlFor="email">Email</Typography.Label>
<input id="email" type="email" />`
    },
    {
      name: "Code Snippet",
      description: "Inline code with language specification",
      code: `import Typography from "@/components/ui/typography";

<Typography.Code codeLang="bash">npm install vayu-ui</Typography.Code>`
    },
    {
      name: "Links",
      description: "Internal and external links",
      code: `import Typography from "@/components/ui/typography";

<Typography.Link href="/components">Internal Link</Typography.Link>
<Typography.Link href="https://example.com" target="_blank">
  External Link
</Typography.Link>`
    },
    {
      name: "Color Variants",
      description: "Semantic color variants for different message types",
      code: `import Typography from "@/components/ui/typography";

<Typography.P variant="error">Error message</Typography.P>
<Typography.P variant="success">Success message</Typography.P>
<Typography.P variant="warning">Warning message</Typography.P>
<Typography.P variant="info">Info message</Typography.P>
<Typography.H3 variant="gradient">Gradient Heading</Typography.H3>`
    },
    {
      name: "Accessibility Props",
      description: "Using ARIA attributes for accessibility",
      code: `import Typography from "@/components/ui/typography";

<Typography.H1 variant="primary" ariaLabel="Main heading">
  Heading Text
</Typography.H1>

<Typography.P variant="secondary" ellipsis lang="en">
  Paragraph content
</Typography.P>

<Typography.Link href="/path" ariaDescribedby="link-desc">
  Link text
</Typography.Link>

<Typography.Code codeLang="typescript">
  const x: string = "hello";
</Typography.Code>`
    }
  ],

  accessibility: {
    pattern: "WCAG 2.2 AA compliant text elements",
    standards: [
      "WCAG 2.2 AA - 4.5:1 contrast ratio for normal text",
      "WCAG 2.2 AA - 3:1 contrast ratio for large text (18pt+ or 14pt bold)",
      "WCAG 2.4.4 - Link purpose in context",
      "WCAG 2.5.3 - Label in name",
      "WCAG 2.5.8 - 44px minimum touch targets for links"
    ],
    keyboard_support: [
      "Links are focusable via Tab navigation",
      "Focus indicators visible on all interactive elements"
    ],
    aria_attributes: [
      "aria-label - Custom accessible label",
      "aria-describedby - Reference to descriptive element",
      "aria-hidden - Hide from screen readers when decorative",
      "role - Custom ARIA role for semantic meaning",
      "External links announce '(opens in a new tab)' to screen readers"
    ]
  },

  anti_patterns: [
    "Using multiple H1 elements on a single page",
    "Skipping heading levels (e.g., H1 directly to H3)",
    "Using heading elements for visual styling only",
    "Not providing htmlFor for form labels",
    "Using external links without proper rel attributes (handled automatically by component)"
  ],

  dependencies: {
    utilities: ["cn"],
    components: ["NextLink"]
  },

  relationships: {
    used_with: ["TextInput", "Textarea", "Checkbox", "Radio", "Select", "Form"],
    often_inside: ["Card", "Dialog", "Sheet", "Container", "Section"],
    often_contains: []
  },

  related_components: ["TextInput", "Form"],

  validation_rules: [
    "Typography.Label should have htmlFor when associated with form control",
    "Typography.Link with external URL should have target='_blank' for new tab behavior",
    "Maintain proper heading hierarchy - do not skip levels",
    "Only one H1 per page for proper document outline"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add typography"
  ],

  source: {
    file: "src/components/ui/typography.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/typography",
    source_file: "packages/ui/src/components/ui/typography.tsx",
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
