export const breadcrumbRegistry = {
  component: "Breadcrumb",
  slug: "breadcrumb",
  category: "Navigation",

  complexity: "compound",

  description: "Displays the path to the current resource using a hierarchy of links, helping users understand their location within the application's navigation structure.",
  ai_summary: "A compound navigation component that renders a hierarchical path of links showing the user's current location. Composed of Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, and BreadcrumbEllipsis subcomponents.",

  intent: [
    "Show hierarchical navigation path",
    "Indicate current page location",
    "Enable quick navigation to parent pages",
    "Improve wayfinding in deep navigation structures"
  ],
  ai_keywords: ["navigation", "path", "hierarchy", "wayfinding", "location", "links", "trail"],

  when_to_use: [
    "Deep navigation hierarchies with multiple levels",
    "Applications with complex information architecture",
    "When users need to understand their current location",
    "E-commerce category navigation",
    "Documentation or content management systems"
  ],
  when_not_to_use: [
    "Flat navigation structures with no hierarchy",
    "Single-level applications",
    "When a simple back button suffices",
    "Mobile-first designs with limited horizontal space (use collapsed version)"
  ],

  composition: {
    root: "Breadcrumb",
    slots: ["BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
    structure: [
      "Breadcrumb",
      "Breadcrumb > BreadcrumbList",
      "Breadcrumb > BreadcrumbList > BreadcrumbItem",
      "Breadcrumb > BreadcrumbList > BreadcrumbItem > BreadcrumbLink",
      "Breadcrumb > BreadcrumbList > BreadcrumbItem > BreadcrumbPage",
      "Breadcrumb > BreadcrumbList > BreadcrumbSeparator",
      "Breadcrumb > BreadcrumbList > BreadcrumbEllipsis"
    ],
    rules: [
      "BreadcrumbList must be a direct child of Breadcrumb",
      "BreadcrumbItem must be inside BreadcrumbList",
      "BreadcrumbLink or BreadcrumbPage must be inside BreadcrumbItem",
      "BreadcrumbPage should only appear once for the current page",
      "BreadcrumbSeparator should be placed between BreadcrumbItem elements",
      "BreadcrumbEllipsis can be used to collapse middle items in long paths"
    ]
  },

  props: {
    Breadcrumb: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the nav element"
      }
    ],
    BreadcrumbList: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the ordered list"
      }
    ],
    BreadcrumbItem: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the list item"
      }
    ],
    BreadcrumbLink: [
      {
        name: "href",
        type: "string",
        required: true,
        description: "Link destination URL"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the link"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Link content/text"
      }
    ],
    BreadcrumbPage: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the current page span"
      }
    ],
    BreadcrumbSeparator: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        default: "<ChevronRight />",
        description: "Custom separator icon or text"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the separator"
      }
    ],
    BreadcrumbEllipsis: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the ellipsis"
      }
    ]
  },

  variants: [],

  states: ["default", "hover", "focus", "current"],

  responsive: {
    allowed: true,
    patterns: [
      "Uses sm:gap-2.5 for larger spacing on small screens and up",
      "flex-wrap allows items to wrap on narrow viewports"
    ]
  },

  design_tokens: {
    used: {
      colors: ["ground-600", "ground-400", "ground-950", "ground-100"],
      radius: ["rounded"],
      spacing: ["gap-1.5", "gap-2.5", "px-3", "py-2", "-mx-1"],
      typography: ["text-sm", "font-normal"]
    },
    recommended: {
      colors: ["ground-600", "ground-950"],
      radius: ["rounded"],
      typography: ["text-sm"]
    },
    allowed: {
      colors: ["ground-50", "ground-100", "ground-200", "ground-300", "ground-400", "ground-500", "ground-600", "ground-700", "ground-800", "ground-900", "ground-950"],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg"],
      spacing: ["gap-1", "gap-1.5", "gap-2", "gap-2.5", "gap-3"],
      typography: ["text-xs", "text-sm", "text-base"]
    }
  },

  examples: [
    {
      name: "Basic Breadcrumb",
      description: "Standard breadcrumb navigation showing page hierarchy",
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
    },
    {
      name: "Breadcrumb with Custom Separator",
      description: "Breadcrumb using a custom separator icon",
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
    },
    {
      name: "Breadcrumb with Ellipsis",
      description: "Collapsed breadcrumb showing ellipsis for middle items",
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
    }
  ],

  accessibility: {
    pattern: "Navigation landmark with ordered list structure",
    standards: [
      "WCAG 2.2 AA compliant minimum target size (24x24px)",
      "Semantic HTML with nav, ol, and li elements",
      "Screen reader compatible with proper labeling"
    ],
    keyboard_support: [
      "Tab: Navigate between breadcrumb links",
      "Enter/Space: Activate link and navigate to href",
      "Focus visible indicators with ring styling"
    ],
    aria_attributes: [
      "aria-label=\"breadcrumb\" on nav element",
      "aria-current=\"page\" on BreadcrumbPage",
      "role=\"presentation\" on BreadcrumbSeparator",
      "aria-hidden=\"true\" on decorative elements",
      "sr-only text for BreadcrumbEllipsis"
    ]
  },

  anti_patterns: [
    "Using BreadcrumbPage for non-current pages",
    "Nesting Breadcrumb components within each other",
    "Placing BreadcrumbLink outside of BreadcrumbItem",
    "Omitting BreadcrumbSeparator between items",
    "Using for primary navigation instead of secondary wayfinding"
  ],

  dependencies: {
    icons: ["ChevronRight", "MoreHorizontal"],
    utilities: ["clsx"],
    components: ["Link"]
  },

  relationships: {
    used_with: ["Sidebar", "Header", "PageHeader"],
    often_inside: ["Header", "PageHeader", "main"],
    often_contains: []
  },

  related_components: [],

  validation_rules: [
    "BreadcrumbList must be a direct child of Breadcrumb",
    "BreadcrumbItem must be inside BreadcrumbList",
    "BreadcrumbLink requires an href prop",
    "BreadcrumbPage should only appear once per breadcrumb trail",
    "All interactive links must have accessible names"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add breadcrumb"
  ],

  source: {
    file: "packages/ui/src/components/ui/breadcrumb.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/breadcrumb",
    source_file: "packages/ui/src/components/ui/breadcrumb.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "composition",
      "accessibility",
      "installation",
      "anatomy",
      "examples"
    ],
    inferred: [
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "intent",
      "validation_rules",
      "anti_patterns",
      "relationships",
      "states"
    ]
  }
};
