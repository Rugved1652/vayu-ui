export const navbarRegistry = {
  component: "Navbar",
  slug: "navbar",
  category: "Navigation",

  complexity: "compound" as const,

  description: "A responsive, accessible navigation bar with compound components for building flexible navigation layouts. Supports desktop and mobile views with a slide-in mobile menu panel.",
  ai_summary: "Compound navigation component with responsive mobile menu, focus trap, keyboard navigation, and WCAG 2.4.3 compliant focus management. Use for site-wide navigation with desktop links and mobile hamburger menu.",

  intent: [
    "Provide primary site navigation",
    "Create responsive navigation that adapts to mobile",
    "Organize navigation links and actions in a header",
    "Support brand/logo display with navigation"
  ],
  ai_keywords: [
    "navigation",
    "navbar",
    "header",
    "menu",
    "responsive",
    "mobile menu",
    "hamburger menu",
    "nav links",
    "site navigation",
    "compound component"
  ],

  when_to_use: [
    "Building a website header with navigation links",
    "Creating responsive navigation that works on mobile and desktop",
    "Organizing primary navigation items and action buttons",
    "Implementing a sticky header navigation"
  ],
  when_not_to_use: [
    "Simple single-page anchor links (use simple nav instead)",
    "Sidebar navigation (use Sidebar component)",
    "Footer navigation (use Footer component)",
    "Tab-based content switching (use Tabs component)"
  ],

  composition: {
    root: "Navbar",
    slots: [
      "Navbar.Container",
      "Navbar.Brand",
      "Navbar.Items",
      "Navbar.Item",
      "Navbar.Actions",
      "Navbar.Toggle",
      "Navbar.MobileMenu",
      "Navbar.MobileItem",
      "Navbar.Separator"
    ],
    structure: [
      "Navbar",
      "Navbar.Container",
      "Navbar.Brand",
      "Navbar.Items",
      "Navbar.Item",
      "Navbar.Actions",
      "Navbar.Toggle",
      "Navbar.MobileMenu",
      "Navbar.MobileItem",
      "Navbar.Separator"
    ],
    rules: [
      "Navbar.Container must be a direct child of Navbar",
      "Navbar.Brand, Navbar.Items, Navbar.Actions, and Navbar.Toggle should be inside Navbar.Container",
      "Navbar.Item must be inside Navbar.Items",
      "Navbar.MobileItem must be inside Navbar.MobileMenu",
      "Navbar.MobileMenu must be a direct child of Navbar (outside Container)",
      "Always include Navbar.Toggle when using Navbar.MobileMenu"
    ]
  },

  props: {
    Navbar: [
      {
        name: "sticky",
        type: "boolean",
        required: false,
        default: false,
        description: "Stick to top of viewport"
      },
      {
        name: "mainContentSelector",
        type: "string",
        required: false,
        default: "main",
        description: "CSS selector for main content element (gets inert attribute when mobile menu is open)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Child components"
      }
    ],
    "Navbar.Container": [
      {
        name: "maxWidth",
        type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
        required: false,
        default: "xl",
        description: "Maximum container width"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Child components"
      }
    ],
    "Navbar.Brand": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Brand content (logo, text, etc.)"
      }
    ],
    "Navbar.Items": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Navbar.Item components"
      }
    ],
    "Navbar.Item": [
      {
        name: "active",
        type: "boolean",
        required: false,
        default: false,
        description: "Highlights the item as the current page"
      },
      {
        name: "href",
        type: "string",
        required: false,
        default: "#",
        description: "The URL to navigate to"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Link content"
      }
    ],
    "Navbar.Actions": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Action buttons or elements"
      }
    ],
    "Navbar.Toggle": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Navbar.MobileMenu": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Mobile menu content"
      }
    ],
    "Navbar.MobileItem": [
      {
        name: "active",
        type: "boolean",
        required: false,
        default: false,
        description: "Highlights the item as the current page"
      },
      {
        name: "href",
        type: "string",
        required: false,
        default: "#",
        description: "The URL to navigate to"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Link content"
      }
    ],
    "Navbar.Separator": [
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
      name: "maxWidth",
      values: ["sm", "md", "lg", "xl", "2xl", "full"],
      default: "xl",
      description: "Container maximum width on Navbar.Container"
    },
    {
      name: "sticky",
      values: ["true", "false"],
      default: "false",
      description: "Makes navbar stick to top of viewport on Navbar"
    }
  ],

  states: [
    "default",
    "mobileOpen",
    "active",
    "hover",
    "focus"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Desktop: Navbar.Items and Navbar.Actions visible, Navbar.Toggle hidden",
      "Mobile: Navbar.Items and Navbar.Actions hidden, Navbar.Toggle visible",
      "Mobile menu slides in from right with backdrop",
      "Breakpoint at md (768px)"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "bg-white",
        "bg-ground-950",
        "bg-ground-100",
        "bg-ground-800",
        "bg-primary-50",
        "bg-primary-900/20",
        "text-ground-700",
        "text-ground-300",
        "text-ground-900",
        "text-ground-500",
        "text-primary-600",
        "text-primary-400",
        "border-ground-200",
        "border-ground-800",
        "ring-primary-500",
        "bg-ground-950/50"
      ],
      radius: ["rounded"],
      border: ["border-b", "border-l"],
      spacing: ["px-3", "py-2", "px-4", "py-3", "p-4", "gap-1", "gap-2"],
      typography: ["text-sm", "text-lg", "font-medium", "font-bold", "font-secondary", "font-primary"]
    },
    recommended: {
      colors: [
        "bg-white",
        "bg-ground-950",
        "text-primary-600",
        "text-primary-400"
      ],
      radius: ["rounded"],
      typography: ["text-sm", "font-medium", "font-secondary"]
    },
    allowed: {
      colors: [
        "bg-white",
        "bg-ground-950",
        "bg-ground-100",
        "bg-ground-800",
        "bg-primary-50",
        "bg-primary-900/20",
        "text-ground-700",
        "text-ground-300",
        "text-ground-900",
        "text-ground-500",
        "text-primary-600",
        "text-primary-400",
        "border-ground-200",
        "border-ground-800",
        "ring-primary-500"
      ],
      radius: ["rounded", "rounded-lg"],
      border: ["border-b", "border-l"],
      spacing: ["px-3", "py-2", "px-4", "py-3", "p-4", "gap-1", "gap-2", "gap-4"],
      typography: ["text-sm", "text-base", "text-lg", "font-medium", "font-bold", "font-secondary", "font-primary"]
    }
  },

  examples: [
    {
      name: "Basic Navbar",
      description: "Standard responsive navbar with brand, navigation links, and mobile menu",
      code: `<Navbar>
  <Navbar.Container>
    <Navbar.Brand>
      <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
        Acme
      </span>
    </Navbar.Brand>

    <Navbar.Items>
      <Navbar.Item active>Home</Navbar.Item>
      <Navbar.Item>Products</Navbar.Item>
      <Navbar.Item>About</Navbar.Item>
      <Navbar.Item>Contact</Navbar.Item>
    </Navbar.Items>

    <Navbar.Actions>
      <Button variant="ghost" size="small">
        <Button.Text>Sign in</Button.Text>
      </Button>
      <Button variant="primary" size="small">
        <Button.Text>Get started</Button.Text>
      </Button>
    </Navbar.Actions>

    <Navbar.Toggle />
  </Navbar.Container>

  <Navbar.MobileMenu>
    <Navbar.MobileItem active>Home</Navbar.MobileItem>
    <Navbar.MobileItem>Products</Navbar.MobileItem>
    <Navbar.MobileItem>About</Navbar.MobileItem>
    <Navbar.MobileItem>Contact</Navbar.MobileItem>
    <Navbar.Separator />
    <div className="flex flex-col gap-2 px-4">
      <Button variant="ghost" size="small" fullWidth>
        <Button.Text>Sign in</Button.Text>
      </Button>
      <Button variant="primary" size="small" fullWidth>
        <Button.Text>Get started</Button.Text>
      </Button>
    </div>
  </Navbar.MobileMenu>
</Navbar>`
    },
    {
      name: "Sticky Navbar",
      description: "Navbar that sticks to the top of the viewport on scroll",
      code: `<Navbar sticky>
  <Navbar.Container maxWidth="2xl">
    <Navbar.Brand>
      <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
        Logo
      </span>
    </Navbar.Brand>
    <Navbar.Items>
      <Navbar.Item active>Dashboard</Navbar.Item>
      <Navbar.Item>Projects</Navbar.Item>
      <Navbar.Item>Settings</Navbar.Item>
    </Navbar.Items>
    <Navbar.Actions>
      <Avatar src="/user.png" alt="User" size="sm" />
    </Navbar.Actions>
    <Navbar.Toggle />
  </Navbar.Container>
  <Navbar.MobileMenu>
    <Navbar.MobileItem active>Dashboard</Navbar.MobileItem>
    <Navbar.MobileItem>Projects</Navbar.MobileItem>
    <Navbar.MobileItem>Settings</Navbar.MobileItem>
  </Navbar.MobileMenu>
</Navbar>`
    },
    {
      name: "Minimal Navbar",
      description: "Simple navbar with only brand and single action",
      code: `<Navbar>
  <Navbar.Container>
    <Navbar.Brand>
      <span className="text-lg font-bold font-primary">Brand</span>
    </Navbar.Brand>
    <Navbar.Actions>
      <Button variant="primary" size="small">
        <Button.Text>Contact</Button.Text>
      </Button>
    </Navbar.Actions>
    <Navbar.Toggle />
  </Navbar.Container>
  <Navbar.MobileMenu>
    <Navbar.MobileItem href="/contact">Contact</Navbar.MobileItem>
  </Navbar.MobileMenu>
</Navbar>`
    }
  ],

  accessibility: {
    pattern: "Navigation Landmark with Dialog Pattern for Mobile Menu",
    standards: [
      "WCAG 2.4.3 Focus Order",
      "WCAG 2.1.1 Keyboard",
      "WCAG 4.1.2 Name, Role, Value"
    ],
    keyboard_support: [
      "Tab - Navigate between focusable elements",
      "Shift+Tab - Navigate backwards through focusable elements",
      "Escape - Close mobile menu and return focus to toggle",
      "Enter/Space - Activate links and buttons"
    ],
    aria_attributes: [
      'aria-label="Main navigation" on nav element',
      "aria-expanded on toggle button (true/false)",
      "aria-controls on toggle button (references menu id)",
      'aria-current="page" on active navigation items',
      'role="dialog" on mobile menu panel',
      'aria-modal="true" on mobile menu panel',
      'aria-label="Navigation menu" on mobile menu dialog',
      "aria-hidden on backdrop element"
    ]
  },

  anti_patterns: [
    "Placing Navbar.MobileMenu inside Navbar.Container",
    "Forgetting Navbar.Toggle when using Navbar.MobileMenu",
    "Using Navbar.Item outside of Navbar.Items",
    "Not providing aria-label for brand logo images",
    "Overriding z-index that breaks mobile menu layering",
    "Adding interactive elements to mobile menu without handling focus trap"
  ],

  dependencies: {
    icons: [],
    utilities: ["clsx"],
    components: []
  },

  relationships: {
    used_with: ["Button", "Avatar", "Dropdown"],
    often_inside: ["Page Layout", "Header"],
    often_contains: ["Button", "Avatar", "Image"]
  },

  related_components: ["Button", "Avatar"],

  validation_rules: [
    "Navbar.Container must be a direct child of Navbar",
    "Navbar.MobileMenu must be outside Navbar.Container",
    "Navbar.Toggle is required when Navbar.MobileMenu is present",
    "Navbar.Item must be inside Navbar.Items",
    "Navbar.MobileItem must be inside Navbar.MobileMenu",
    "At least one Navbar.Item or Navbar.MobileItem should have active prop on current page"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add navbar"
  ],

  source: {
    file: "src/components/ui/navbar.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/navbar",
    source_file: "packages/ui/src/components/ui/navbar.tsx",
    extracted: [
      "component",
      "slug",
      "category",
      "complexity",
      "description",
      "composition",
      "props",
      "variants",
      "states",
      "responsive",
      "design_tokens",
      "accessibility",
      "dependencies",
      "installation"
    ],
    inferred: [
      "ai_summary",
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "examples",
      "anti_patterns",
      "relationships",
      "related_components",
      "validation_rules"
    ]
  }
};
