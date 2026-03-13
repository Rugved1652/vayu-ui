export const buttongroupRegistry = {
  component: "ButtonGroup",
  slug: "buttongroup",
  category: "actions",

  complexity: "simple" as const,

  description: "Groups multiple buttons together with connected borders and rounded edges for cohesive action layouts.",
  ai_summary: "A container component that arranges Button components in a horizontal or vertical group with unified styling, shared borders, and coordinated focus management.",

  intent: [
    "Group related action buttons together",
    "Create segmented controls or toggle groups",
    "Display action toolbars with connected buttons",
    "Organize form submission actions"
  ],

  ai_keywords: [
    "button group",
    "action group",
    "button container",
    "segmented control",
    "toolbar",
    "actions",
    "navigation buttons",
    "connected buttons"
  ],

  when_to_use: [
    "When you need to display multiple related actions together",
    "Creating segmented controls or toggle button groups",
    "Building action toolbars with icon buttons",
    "Displaying form actions (Cancel, Submit) side by side",
    "When buttons should share connected borders without gaps"
  ],

  when_not_to_use: [
    "For a single standalone button",
    "When buttons need independent spacing or positioning",
    "For dropdown menus or navigation lists",
    "When buttons are unrelated or serve different contexts"
  ],

  composition: {
    root: "ButtonGroup",
    slots: [],
    structure: ["ButtonGroup", "Button"],
    rules: [
      "ButtonGroup must contain Button components as direct children",
      "All child buttons receive unified sizing through CSS selectors",
      "First and last buttons receive rounded outer edges",
      "Adjacent buttons share borders without double-borders"
    ]
  },

  props: {
    ButtonGroup: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        default: "horizontal",
        description: "Stack direction of buttons in the group"
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        required: false,
        default: "medium",
        description: "Size applied to all child buttons via CSS selectors"
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        default: false,
        description: "Stretch the group to fill the container width with buttons sharing equal space"
      },
      {
        name: "aria-label",
        type: "string",
        required: true,
        description: "Accessible label for the button group (required for screen readers)"
      },
      {
        name: "aria-labelledby",
        type: "string",
        required: false,
        description: "ID of an element that labels this button group"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the group container"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button elements to group together"
      }
    ]
  },

  variants: [
    {
      name: "orientation",
      values: ["horizontal", "vertical"],
      default: "horizontal",
      description: "Direction buttons are stacked in the group"
    },
    {
      name: "size",
      values: ["small", "medium", "large"],
      default: "medium",
      description: "Uniform size applied to all child buttons via CSS override"
    }
  ],

  states: ["hover", "focus-visible"],

  responsive: {
    allowed: true,
    patterns: [
      "Use responsive className utilities to adjust orientation on different breakpoints",
      "fullWidth can be combined with responsive classes for mobile-first layouts"
    ]
  },

  design_tokens: {
    used: {
      spacing: ["px-3", "px-4", "px-6", "py-2", "py-2.5", "py-3", "min-h-[36px]", "min-h-[40px]", "min-h-[44px]"],
      typography: ["text-sm", "text-base", "text-lg"]
    },
    recommended: {
      spacing: ["px-4", "py-2.5"],
      typography: ["text-base"]
    },
    allowed: {
      spacing: ["px-3", "px-4", "px-6", "py-2", "py-2.5", "py-3"],
      typography: ["text-sm", "text-base", "text-lg"]
    }
  },

  examples: [
    {
      name: "Horizontal Button Group",
      description: "Default horizontal layout with outline buttons",
      code: `<ButtonGroup aria-label="Group label">
  <Button variant="outline">
    <Button.Text>Button 1</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Button 2</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Button 3</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Vertical Button Group",
      description: "Vertical stack of action buttons",
      code: `<ButtonGroup orientation="vertical" aria-label="Actions">
  <Button variant="outline">
    <Button.Text>Edit</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Copy</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Delete</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Full Width Button Group",
      description: "Buttons stretch to fill container width",
      code: `<ButtonGroup fullWidth aria-label="Form actions">
  <Button variant="secondary">
    <Button.Text>Cancel</Button.Text>
  </Button>
  <Button variant="primary">
    <Button.Text>Submit</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Mixed Variant Button Group",
      description: "Different button variants in one group for visual hierarchy",
      code: `<ButtonGroup aria-label="Navigation">
  <Button variant="outline">
    <Button.Text>Back</Button.Text>
  </Button>
  <Button variant="secondary">
    <Button.Text>Save Draft</Button.Text>
  </Button>
  <Button variant="primary">
    <Button.Text>Continue</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Icon Button Toolbar",
      description: "Toolbar with icon-only buttons for formatting options",
      code: `<ButtonGroup aria-label="Formatting options">
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </svg>
    </Button.Icon>
  </Button>
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" x2="10" y1="4" y2="4"/>
        <line x1="14" x2="15" y1="20" y2="4"/>
        <line x1="5" x2="19" y1="20" y2="20"/>
      </svg>
    </Button.Icon>
  </Button>
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8"/>
        <path d="M14 12H6"/>
        <path d="M10 8l-4 4 4 4"/>
      </svg>
    </Button.Icon>
  </Button>
</ButtonGroup>`
    }
  ],

  accessibility: {
    pattern: "group",
    standards: [
      "WCAG 2.2 AA compliant",
      "Uses role='group' to indicate a related set of buttons",
      "Focus management via z-index ensures focus ring visibility (WCAG 2.4.11)"
    ],
    keyboard_support: [
      "Tab: Move focus to the next focusable button",
      "Shift + Tab: Move focus to the previous focusable button",
      "Enter / Space: Activate the focused button"
    ],
    aria_attributes: [
      "role='group': Indicates a group of related buttons",
      "aria-label: Required accessible label for screen reader context",
      "aria-labelledby: Alternative to aria-label, references a labeling element"
    ]
  },

  anti_patterns: [
    "Missing aria-label or aria-labelledby makes the group inaccessible to screen readers",
    "Using ButtonGroup for non-button elements will not apply proper styling",
    "Nesting ButtonGroup components can cause unexpected border and focus behavior",
    "Using without Button children will result in an empty group"
  ],

  dependencies: {
    utilities: ["clsx"]
  },

  relationships: {
    used_with: ["Button"],
    often_inside: ["Card", "Dialog", "Form", "Toolbar", "Navbar"],
    often_contains: ["Button"]
  },

  related_components: ["Button"],

  validation_rules: [
    "ButtonGroup must have aria-label or aria-labelledby for accessibility",
    "ButtonGroup should only contain Button components as direct children",
    "size prop only affects direct button children via CSS selectors",
    "fullWidth requires the parent container to have defined width"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add buttongroup"
  ],

  source: {
    file: "packages/ui/src/components/ui/buttongroup.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/buttongroup",
    source_file: "packages/ui/src/components/ui/buttongroup.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "source"
    ],
    inferred: [
      "ai_summary",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "relationships",
      "validation_rules",
      "anti_patterns",
      "design_tokens"
    ]
  }
};

export default buttongroupRegistry;
