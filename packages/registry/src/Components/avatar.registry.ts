export const avatarRegistry = {
  component: "Avatar",
  slug: "avatar",
  category: "display",

  complexity: "compound",

  description: "An image element with a fallback for representing the user.",
  ai_summary: "A compound component for displaying user profile images with automatic fallback support. Renders initials with deterministic colors when images fail, supports status indicators, and provides full WCAG 2.2 AA accessibility compliance.",

  intent: [
    "Display user profile pictures",
    "Show user presence status",
    "Represent users in lists, cards, and headers",
    "Provide fallback when profile images are unavailable"
  ],
  ai_keywords: [
    "avatar",
    "profile picture",
    "user image",
    "initials",
    "status indicator",
    "user presence",
    "profile photo",
    "user representation"
  ],

  when_to_use: [
    "User profiles and account menus",
    "Comment sections and message threads",
    "Team member lists and directories",
    "Navigation headers with user context",
    "Chat applications with presence indicators",
    "Card components showing user attribution"
  ],
  when_not_to_use: [
    "As generic image containers (use Image component instead)",
    "For non-user entities (use Icon or Badge instead)",
    "When displaying multiple users (use AvatarGroup instead)",
    "As decorative elements without user context"
  ],

  composition: {
    root: "Avatar",
    slots: ["Avatar.Image", "Avatar.Initials", "Avatar.Fallback", "Avatar.Status"],
    structure: ["Avatar", "Avatar.Image", "Avatar.Initials", "Avatar.Fallback", "Avatar.Status"],
    rules: [
      "Avatar.Image returns null on error to allow Initials/Fallback to render",
      "Avatar.Initials and Avatar.Fallback are mutually exclusive fallback options",
      "Avatar.Status should only be used when presence information is available",
      "Only one fallback mechanism (Initials or Fallback) should be used at a time"
    ]
  },

  props: {
    Avatar: [
      {
        name: "size",
        type: "'small' | 'medium' | 'large' | 'xlarge' | number",
        required: false,
        default: "'medium'",
        description: "The size of the avatar container. Accepts predefined sizes or custom pixel value."
      },
      {
        name: "username",
        type: "string",
        required: false,
        default: "''",
        description: "Used for aria-label generation and initials color derivation."
      },
      {
        name: "alt",
        type: "string",
        required: false,
        description: "Custom alt text for the avatar. Overrides auto-generated label."
      },
      {
        name: "status",
        type: "'online' | 'offline' | 'away' | 'busy'",
        required: false,
        description: "Used for aria-label status announcement."
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        description: "Handler for interactive avatars. Makes avatar focusable and keyboard accessible."
      },
      {
        name: "tabIndex",
        type: "number",
        required: false,
        description: "Custom tab index for keyboard navigation. Only applies when onClick is provided."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Child components (Image, Initials, Fallback, Status)."
      }
    ],
    "Avatar.Image": [
      {
        name: "src",
        type: "string",
        required: false,
        description: "The source URL of the image."
      },
      {
        name: "fallbackSrc",
        type: "string",
        required: false,
        description: "A secondary image URL to use if the primary src fails."
      },
      {
        name: "alt",
        type: "string",
        required: false,
        default: "''",
        description: "Alt text for the image."
      },
      {
        name: "onError",
        type: "(e: SyntheticEvent) => void",
        required: false,
        description: "Callback when image fails to load."
      },
      {
        name: "onLoad",
        type: "(e: SyntheticEvent) => void",
        required: false,
        description: "Callback when image loads successfully."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "Avatar.Initials": [
      {
        name: "username",
        type: "string",
        required: true,
        description: "The name to generate initials and background color from."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "Avatar.Fallback": [
      {
        name: "src",
        type: "string",
        required: false,
        default: "'https://via.placeholder.com/150/999999/666666?text=User'",
        description: "Default image to show when primary image fails."
      },
      {
        name: "alt",
        type: "string",
        required: false,
        default: "'Default avatar'",
        description: "Alt text for the fallback image."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "Avatar.Status": [
      {
        name: "status",
        type: "'online' | 'offline' | 'away' | 'busy'",
        required: true,
        description: "The status to display visually."
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Accessible label for the status (overrides default)."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ]
  },

  variants: [
    {
      name: "size",
      values: ["small", "medium", "large", "xlarge"],
      default: "medium",
      description: "Predefined avatar sizes with corresponding dimensions and font sizes."
    },
    {
      name: "status",
      values: ["online", "offline", "away", "busy"],
      description: "User presence status displayed as a colored badge indicator."
    }
  ],

  states: [
    "default",
    "loading",
    "error",
    "interactive:hover",
    "interactive:focus-visible",
    "interactive:active"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Use number type for custom pixel sizes",
      "Size can be dynamically calculated based on container"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-100",
        "ground-800",
        "ground-300",
        "ground-600",
        "ground-500",
        "ground-400",
        "ground-950",
        "primary-600",
        "primary-500",
        "success-600",
        "success-500",
        "warning-600",
        "warning-500",
        "error-600",
        "error-500"
      ],
      radius: ["rounded-full"],
      border: ["border-2", "border-white"],
      typography: ["text-xs", "text-sm", "text-lg", "text-2xl"]
    },
    recommended: {
      colors: [
        "ground-100",
        "ground-800",
        "primary-600"
      ],
      radius: ["rounded-full"]
    },
    allowed: {
      colors: [
        "ground-*",
        "primary-*",
        "success-*",
        "warning-*",
        "error-*"
      ],
      radius: ["rounded-full"],
      border: ["border-2"]
    }
  },

  examples: [
    {
      name: "Basic Image Avatar",
      description: "Standard avatar with image and fallback support",
      code: `<Avatar size="medium" username="John Doe">
  <Avatar.Image src="https://example.com/avatar.jpg" alt="John Doe" />
  <Avatar.Fallback src="/default-user.png" />
</Avatar>`
    },
    {
      name: "Initials Avatar",
      description: "Avatar with auto-generated initials and deterministic color",
      code: `<Avatar size="medium" username="Rugved Patel">
  <Avatar.Initials username="Rugved Patel" />
</Avatar>`
    },
    {
      name: "Avatar with Status",
      description: "Avatar showing online presence indicator",
      code: `<Avatar size="medium" username="Online User" status="online">
  <Avatar.Initials username="Online User" />
  <Avatar.Status status="online" />
</Avatar>`
    },
    {
      name: "Interactive Avatar",
      description: "Clickable avatar with keyboard accessibility",
      code: `<Avatar
  size="large"
  username="Profile"
  onClick={() => console.log('Avatar clicked')}
  tabIndex={0}
>
  <Avatar.Initials username="Profile" />
</Avatar>`
    },
    {
      name: "Custom Size Avatar",
      description: "Avatar with custom pixel dimensions",
      code: `<Avatar size={64} username="Custom User">
  <Avatar.Initials username="Custom User" />
</Avatar>`
    },
    {
      name: "Image with Fallback Source",
      description: "Avatar with primary and fallback image URLs",
      code: `<Avatar size="medium" username="Jane Doe">
  <Avatar.Image
    src="https://example.com/avatar.jpg"
    fallbackSrc="/default-avatar.png"
    alt="Jane Doe"
  />
</Avatar>`
    }
  ],

  accessibility: {
    pattern: "Composite image element with role switching for interactivity",
    standards: [
      "WCAG 2.2 Level AA",
      "4.5:1 contrast ratio for initials colors",
      "WCAG 2.4.7 Focus Visible",
      "WCAG 2.1.1 Keyboard Activation",
      "WCAG 2.5.5 Touch Target Size (minimum 24x24px)"
    ],
    keyboard_support: [
      "Tab: Move focus to interactive avatar",
      "Enter: Activate clickable avatar",
      "Space: Activate clickable avatar"
    ],
    aria_attributes: [
      "role='img' for static avatars",
      "role='button' for interactive avatars",
      "aria-label for avatar description",
      "role='status' on Avatar.Status",
      "aria-live='polite' on loading spinner",
      "aria-busy='true' during image load",
      "aria-hidden='true' on decorative elements"
    ]
  },

  anti_patterns: [
    "Using Avatar for non-user images (use Image component)",
    "Missing username prop which disables accessibility features",
    "Using both Avatar.Initials and Avatar.Fallback simultaneously",
    "Adding onClick without ensuring keyboard accessibility",
    "Overriding aria-label on child components"
  ],

  dependencies: {
    utilities: ["cn"]
  },

  relationships: {
    used_with: ["Badge", "Card", "List", "Menu", "Tooltip"],
    often_inside: ["Card", "List", "Header", "Menu", "Dialog"],
    often_contains: []
  },

  related_components: [],

  validation_rules: [
    "Avatar must have at least one child component",
    "Avatar.Initials requires username prop",
    "Avatar.Status requires status prop",
    "Interactive Avatar (with onClick) must be keyboard accessible",
    "Avatar.Image with fallbackSrc will retry before showing error"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add avatar"
  ],

  source: {
    file: "packages/ui/src/components/ui/avatar.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/avatar",
    source_file: "packages/ui/src/components/ui/avatar.tsx",
    extracted: [
      "component",
      "slug",
      "description",
      "composition",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "design_tokens"
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
      "validation_rules"
    ]
  }
};

export default avatarRegistry;
