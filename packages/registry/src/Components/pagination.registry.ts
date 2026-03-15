export const paginationRegistry = {
  component: "Pagination",
  slug: "pagination",
  category: "Navigation",

  complexity: "compound",

  description: "A fully accessible pagination component with compound pattern for building flexible navigation interfaces. Supports server-side rendering with Next.js Link integration.",
  ai_summary: "Compound pagination component with Root container, Info display, Buttons for page navigation, and Compact variant for mobile. Uses hrefBuilder for URL generation, supports pageRange modes (compact/extended/full), and includes full accessibility support.",

  intent: [
    "Navigate through multi-page content",
    "Display current page position within total results",
    "Provide accessible page navigation controls",
    "Support server-side pagination with URL-based navigation"
  ],
  ai_keywords: [
    "pagination",
    "navigation",
    "pages",
    "pager",
    "page numbers",
    "next previous",
    "page navigation",
    "server-side pagination",
    "compact pagination",
    "page range"
  ],

  when_to_use: [
    "Displaying paginated lists or tables",
    "Search results with multiple pages",
    "Content that spans multiple pages",
    "Data tables with large datasets",
    "Blog posts or article listings",
    "Mobile-friendly navigation scenarios"
  ],
  when_not_to_use: [
    "Single-page content",
    "Infinite scroll implementations",
    "Client-side only pagination without URL changes",
    "Very small datasets (less than one page)"
  ],

  composition: {
    root: "Pagination",
    slots: [
      "Pagination.Root",
      "Pagination.Info",
      "Pagination.Buttons",
      "Pagination.Compact"
    ],
    structure: [
      "Pagination",
      "Pagination.Root",
      "Pagination.Info",
      "Pagination.Buttons",
      "Pagination.Compact"
    ],
    rules: [
      "Pagination.Root wraps all other pagination components",
      "Pagination.Info displays item range information",
      "Pagination.Buttons renders the full page navigation",
      "Pagination.Compact is standalone and doesn't require Pagination.Root",
      "Pagination.Buttons and Pagination.Compact require hrefBuilder function"
    ]
  },

  props: {
    "Pagination.Root": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Content to render inside the pagination container"
      },
      {
        name: "aria-label",
        type: "string",
        default: "Pagination",
        required: false,
        description: "Accessible label for the navigation"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Pagination.Info": [
      {
        name: "totalItems",
        type: "number",
        required: true,
        description: "The total number of items"
      },
      {
        name: "pageSize",
        type: "number",
        required: true,
        description: "The number of items per page"
      },
      {
        name: "currentPage",
        type: "number",
        required: true,
        description: "The current active page"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Pagination.Buttons": [
      {
        name: "currentPage",
        type: "number",
        required: true,
        description: "The current active page"
      },
      {
        name: "totalPages",
        type: "number",
        required: true,
        description: "The total number of pages"
      },
      {
        name: "hrefBuilder",
        type: "(page: number) => string",
        required: true,
        description: "Function to generate URLs for each page"
      },
      {
        name: "pageRange",
        type: '"compact" | "extended" | "full"',
        default: "compact",
        required: false,
        description: "How many page numbers to show"
      },
      {
        name: "siblingCount",
        type: "number",
        default: 1,
        required: false,
        description: "Number of siblings to show around the current page"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Pagination.Compact": [
      {
        name: "currentPage",
        type: "number",
        required: true,
        description: "The current active page"
      },
      {
        name: "totalPages",
        type: "number",
        required: true,
        description: "The total number of pages"
      },
      {
        name: "hrefBuilder",
        type: "(page: number) => string",
        required: true,
        description: "Function to generate URLs for each page"
      },
      {
        name: "aria-label",
        type: "string",
        default: "Pagination",
        required: false,
        description: "Accessible label for the navigation"
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
      name: "pageRange",
      values: ["compact", "extended", "full"],
      default: "compact",
      description: "Controls how many page numbers are displayed. Compact shows limited numbers with ellipsis, extended shows more siblings, full shows all pages"
    },
    {
      name: "layout",
      values: ["full", "compact"],
      default: "full",
      description: "Full layout uses Pagination.Buttons with page numbers, compact uses Pagination.Compact with only Previous/Next"
    }
  ],

  states: [
    "default",
    "hover",
    "focus",
    "active/current",
    "disabled"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Use Pagination.Compact for mobile viewports",
      "Use Pagination.Buttons for desktop viewports",
      "Flex-wrap enabled for button overflow on small screens",
      "gap-1 allows compact spacing on mobile"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-300",
        "ground-400",
        "ground-500",
        "ground-600",
        "ground-700",
        "ground-800",
        "ground-900",
        "ground-950",
        "primary-400",
        "primary-500",
        "primary-600",
        "white"
      ],
      radius: ["rounded"],
      border: [
        "border",
        "border-transparent",
        "border-ground-300",
        "border-ground-400",
        "border-ground-600",
        "border-ground-700",
        "border-primary-500",
        "border-primary-600"
      ],
      spacing: [
        "gap-1",
        "gap-1.5",
        "gap-4",
        "px-2.5",
        "px-3",
        "p-8"
      ],
      typography: [
        "text-sm",
        "font-secondary",
        "font-medium",
        "font-semibold",
        "font-bold",
        "tabular-nums"
      ]
    },
    recommended: {
      colors: [
        "primary-600",
        "primary-500",
        "ground-700",
        "ground-300"
      ],
      radius: ["rounded"],
      typography: ["text-sm", "font-medium"]
    },
    allowed: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-300",
        "ground-400",
        "ground-500",
        "ground-600",
        "ground-700",
        "ground-800",
        "ground-900",
        "ground-950",
        "primary-50",
        "primary-100",
        "primary-200",
        "primary-300",
        "primary-400",
        "primary-500",
        "primary-600",
        "primary-700",
        "primary-800",
        "primary-900",
        "primary-950"
      ],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg"],
      border: ["border", "border-0", "border-2"],
      spacing: ["gap-1", "gap-2", "gap-3", "gap-4", "px-2", "px-3", "px-4"],
      typography: ["text-xs", "text-sm", "text-base"]
    }
  },

  examples: [
    {
      name: "Basic Pagination",
      description: "Standard pagination with info and buttons",
      code: `import { Pagination } from "vayu-ui";

export default function PaginationExample() {
  const currentPage = 1;
  const pageSize = 10;
  const totalItems = 450;
  const totalPages = Math.ceil(totalItems / pageSize);

  const buildPageUrl = (page: number) => \`?page=\${page}\`;

  return (
    <Pagination.Root aria-label="Pagination">
      <Pagination.Info
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <div className="flex justify-center">
        <Pagination.Buttons
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={buildPageUrl}
        />
      </div>
    </Pagination.Root>
  );
}`
    },
    {
      name: "Compact Pagination",
      description: "Mobile-friendly pagination with Previous/Next only",
      code: `import { Pagination } from "vayu-ui";

export default function CompactPaginationExample() {
  const currentPage = 5;
  const totalPages = 20;

  return (
    <Pagination.Compact
      currentPage={currentPage}
      totalPages={totalPages}
      hrefBuilder={(page) => \`?page=\${page}\`}
    />
  );
}`
    },
    {
      name: "Extended Page Range",
      description: "Pagination with extended sibling count",
      code: `import { Pagination } from "vayu-ui";

export default function ExtendedPaginationExample() {
  const currentPage = 10;
  const totalPages = 50;

  return (
    <Pagination.Buttons
      currentPage={currentPage}
      totalPages={totalPages}
      hrefBuilder={(page) => \`?page=\${page}\`}
      pageRange="extended"
      siblingCount={2}
    />
  );
}`
    },
    {
      name: "Full Page Range",
      description: "Show all page numbers for small page counts",
      code: `import { Pagination } from "vayu-ui";

export default function FullPaginationExample() {
  const currentPage = 3;
  const totalPages = 8;

  return (
    <Pagination.Buttons
      currentPage={currentPage}
      totalPages={totalPages}
      hrefBuilder={(page) => \`?page=\${page}\`}
      pageRange="full"
    />
  );
}`
    }
  ],

  accessibility: {
    pattern: "Navigation landmark with ARIA",
    standards: [
      "WCAG 2.2 AA compliant",
      "WAI-ARIA Authoring Practices"
    ],
    keyboard_support: [
      "Tab - Move between pagination buttons",
      "Enter/Space - Activate page link",
      "Focus visible with ring indicator"
    ],
    aria_attributes: [
      'aria-label="Pagination" on nav element',
      'aria-current="page" on active page button',
      'aria-disabled="true" on disabled buttons',
      'aria-live="polite" on info/status regions',
      'role="status" on item count display',
      'role="group" on buttons container',
      'aria-hidden="true" on decorative icons'
    ]
  },

  anti_patterns: [
    "Using Pagination.Buttons without hrefBuilder function",
    "Not calculating totalPages from totalItems and pageSize",
    "Using client-side state without URL updates",
    "Hiding pagination without alternative navigation",
    "Using full pageRange with large page counts",
    "Not handling edge cases (page 1, last page)",
    "Missing aria-label on navigation"
  ],

  dependencies: {
    icons: [
      "ChevronLeft",
      "ChevronRight",
      "ChevronsLeft",
      "ChevronsRight",
      "MoreHorizontal"
    ],
    utilities: ["cn"],
    components: ["Link"]
  },

  relationships: {
    used_with: [
      "Table",
      "DataGrid",
      "List",
      "Card"
    ],
    often_inside: [
      "Card",
      "Section",
      "Container"
    ],
    often_contains: []
  },

  related_components: [
    "Table",
    "List"
  ],

  validation_rules: [
    "Pagination.Buttons requires currentPage, totalPages, and hrefBuilder",
    "Pagination.Info requires totalItems, pageSize, and currentPage",
    "Pagination.Compact requires currentPage, totalPages, and hrefBuilder",
    "currentPage must be between 1 and totalPages",
    "totalPages must be a positive integer",
    "pageSize must be a positive integer",
    "totalItems must be a non-negative integer",
    "siblingCount should be between 1 and 3 for optimal UX",
    "Use Pagination.Compact for mobile viewports"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add pagination"
  ],

  source: {
    file: "packages/ui/src/components/ui/pagination.tsx",
    language: "TypeScript",
    framework: "React"
  },

  meta: {
    doc_url: "/docs/components/pagination",
    source_file: "packages/ui/src/components/ui/pagination.tsx",
    extracted: [
      "component",
      "slug",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "dependencies",
      "design_tokens"
    ],
    inferred: [
      "ai_summary",
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "composition.rules",
      "responsive.patterns",
      "anti_patterns",
      "validation_rules",
      "relationships"
    ]
  }
};
