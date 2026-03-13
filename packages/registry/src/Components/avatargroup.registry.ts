export const avatarGroupRegistry = {
  component: "AvatarGroup",
  slug: "avatargroup",
  category: "Display",

  complexity: "simple" as const,

  description: "Displays a stack or grid of avatars with overflow handling, showing a count indicator when the number of users exceeds the maximum display limit.",
  ai_summary: "AvatarGroup is a display component that renders multiple avatars in either an overlapping stack layout or a grid layout. It automatically handles overflow by showing a +N indicator when users exceed maxDisplay. Integrates with the Avatar component for consistent styling and supports status indicators, interactive click handlers, and full keyboard navigation for accessibility.",

  intent: [
    "Display multiple user avatars in a compact space",
    "Show team members or collaborators",
    "Indicate presence of multiple participants",
    "Display user lists with overflow handling",
    "Show activity indicators for grouped users"
  ],

  ai_keywords: [
    "avatar group",
    "user avatars",
    "stacked avatars",
    "avatar stack",
    "user list",
    "team display",
    "participant list",
    "overflow avatars",
    "group members",
    "collaborators"
  ],

  when_to_use: [
    "Displaying team members in headers or cards",
    "Showing participants in a chat or conversation",
    "Indicating multiple assignees on a task",
    "Displaying user presence in collaborative features",
    "Showing recent activity by multiple users",
    "Compact display of user lists with overflow"
  ],

  when_not_to_use: [
    "Displaying a single user (use Avatar instead)",
    "When you need detailed user information (use a list component)",
    "When avatars need individual positioning control",
    "For hierarchical user relationships"
  ],

  composition: {
    root: "AvatarGroup",
    slots: [],
    structure: ["AvatarGroup"],
    rules: [
      "AvatarGroup internally uses Avatar component for each user",
      "Overflow indicator is automatically rendered when users exceed maxDisplay",
      "Status indicators are passed through to individual Avatars"
    ]
  },

  props: {
    AvatarGroup: [
      {
        name: "users",
        type: "UserData[]",
        required: false,
        default: [],
        description: "Array of user objects to display as avatars. Each user can have id, src, username, alt, fallback, and status properties."
      },
      {
        name: "size",
        type: '"small" | "medium" | "large" | "xlarge"',
        required: false,
        default: "medium",
        description: "Size of all avatars in the group. Maps to Avatar component sizes."
      },
      {
        name: "maxDisplay",
        type: "number",
        required: false,
        default: 5,
        description: "Maximum number of avatars to display before showing overflow indicator."
      },
      {
        name: "layout",
        type: '"stack" | "grid"',
        required: false,
        default: "stack",
        description: "Layout mode: stack creates overlapping avatars, grid displays them in a wrapped row."
      },
      {
        name: "spacing",
        type: '"tight" | "normal" | "loose" | number',
        required: false,
        default: "normal",
        description: "Spacing between avatars in stack layout. Negative margin creates overlap. Can be a custom number value."
      },
      {
        name: "renderOverflow",
        type: "(count: number) => React.ReactNode",
        required: false,
        description: "Custom renderer for overflow indicator. Receives the count of hidden users."
      },
      {
        name: "onAvatarClick",
        type: "(user: UserData, index: number) => void",
        required: false,
        description: "Click handler for individual avatars. When provided, avatars become interactive with keyboard support."
      },
      {
        name: "onOverflowClick",
        type: "(hiddenUsers: UserData[]) => void",
        required: false,
        description: "Click handler for overflow indicator. Receives array of hidden users."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the root container."
      }
    ],
    UserData: [
      {
        name: "id",
        type: "string | number | null",
        required: false,
        description: "Unique identifier for the user. Used as React key."
      },
      {
        name: "src",
        type: "string",
        required: false,
        description: "URL for the avatar image. If not provided, initials fallback is shown."
      },
      {
        name: "username",
        type: "string",
        required: false,
        description: "Username for generating initials and alt text."
      },
      {
        name: "alt",
        type: "string",
        required: false,
        description: "Alternative text for the avatar image."
      },
      {
        name: "fallback",
        type: "string",
        required: false,
        description: "Fallback text to display when no image is available. Used if username is not provided."
      },
      {
        name: "status",
        type: '"online" | "offline" | "away" | "busy"',
        required: false,
        description: "User status indicator displayed on the avatar."
      }
    ]
  },

  variants: [
    {
      name: "size",
      values: ["small", "medium", "large", "xlarge"],
      default: "medium",
      description: "Avatar size: small (32px), medium (48px), large (64px), xlarge (96px)"
    },
    {
      name: "layout",
      values: ["stack", "grid"],
      default: "stack",
      description: "Layout mode: stack creates overlapping avatars with negative margins, grid displays in wrapped row with gap"
    },
    {
      name: "spacing",
      values: ["tight", "normal", "loose"],
      default: "normal",
      description: "Stack overlap amount: tight (-12px), normal (-8px), loose (-4px)"
    }
  ],

  states: [
    "default",
    "hover",
    "interactive:hover",
    "interactive:focus",
    "overflow:hover",
    "overflow:focus"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Size can be adjusted responsively for different viewport sizes",
      "maxDisplay can be reduced on smaller screens",
      "Layout can switch from stack to grid on mobile"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ring-white",
        "ring-neutral-900",
        "bg-neutral-200",
        "bg-neutral-700",
        "text-neutral-700",
        "text-neutral-200",
        "hover:bg-neutral-300",
        "hover:bg-neutral-600",
        "ring-primary-500",
        "ring-primary-400",
        "border-transparent"
      ],
      radius: ["rounded-full"],
      border: ["ring-2", "border-transparent"],
      spacing: ["gap-2", "pl-2", "ml-2", "mr-2", "ml-0"],
      typography: ["text-xs", "text-sm", "text-lg", "text-2xl", "font-medium"]
    },
    recommended: {
      colors: ["ring-white", "ring-neutral-900", "bg-neutral-200", "bg-neutral-700"],
      radius: ["rounded-full"],
      spacing: ["gap-2"]
    },
    allowed: {
      colors: ["primary-500", "primary-400", "neutral-200", "neutral-700", "neutral-900"],
      radius: ["rounded-full", "rounded-lg"],
      border: ["ring-2", "ring-4"],
      spacing: ["gap-1", "gap-2", "gap-4"],
      typography: ["text-xs", "text-sm", "text-base", "text-lg", "text-2xl"]
    }
  },

  examples: [
    {
      name: "Basic Stack with Overflow",
      description: "Default stack layout showing 4 visible avatars with overflow indicator",
      code: `import { AvatarGroup } from "vayu-ui";

const users = [
  { id: 1, username: "John Doe", src: "https://github.com/shadcn.png", status: "online" },
  { id: 2, username: "Jane Smith", fallback: "JS", status: "offline" },
  { id: 3, username: "Bob Wilson", src: "https://github.com/vercel.png", status: "online" },
  { id: 4, username: "Alice Johnson", fallback: "AJ", status: "away" },
  { id: 5, username: "Charlie Brown", src: "https://github.com/octocat.png", status: "busy" },
  { id: 6, username: "David Lee", fallback: "DL", status: "offline" },
];

<AvatarGroup users={users} maxDisplay={4} />`
    },
    {
      name: "Different Sizes",
      description: "AvatarGroup in all available sizes",
      code: `import { AvatarGroup } from "vayu-ui";

const users = [
  { id: 1, username: "John Doe", src: "https://github.com/shadcn.png" },
  { id: 2, username: "Jane Smith", fallback: "JS" },
  { id: 3, username: "Bob Wilson", src: "https://github.com/vercel.png" },
  { id: 4, username: "Alice Johnson", fallback: "AJ" },
];

<AvatarGroup users={users} size="small" maxDisplay={3} />
<AvatarGroup users={users} size="medium" maxDisplay={3} />
<AvatarGroup users={users} size="large" maxDisplay={3} />
<AvatarGroup users={users} size="xlarge" maxDisplay={3} />`
    },
    {
      name: "Interactive with Click Handlers",
      description: "Clickable avatars and overflow button with custom handlers",
      code: `import { AvatarGroup } from "vayu-ui";

const users = [
  { id: 1, username: "John Doe", src: "https://github.com/shadcn.png" },
  { id: 2, username: "Jane Smith", fallback: "JS" },
  { id: 3, username: "Bob Wilson", src: "https://github.com/vercel.png" },
  { id: 4, username: "Alice Johnson", fallback: "AJ" },
  { id: 5, username: "Charlie Brown", src: "https://github.com/octocat.png" },
];

<AvatarGroup
  users={users}
  maxDisplay={4}
  onAvatarClick={(user, index) => console.log(\`Clicked \${user.username}\`)}
  onOverflowClick={(hidden) => console.log(\`\${hidden.length} more users\`)}
/>`
    },
    {
      name: "Grid Layout",
      description: "Grid layout with all avatars visible in a wrapped row",
      code: `import { AvatarGroup } from "vayu-ui";

const users = [
  { id: 1, username: "John Doe", src: "https://github.com/shadcn.png" },
  { id: 2, username: "Jane Smith", fallback: "JS" },
  { id: 3, username: "Bob Wilson", src: "https://github.com/vercel.png" },
  { id: 4, username: "Alice Johnson", fallback: "AJ" },
  { id: 5, username: "Charlie Brown", src: "https://github.com/octocat.png" },
  { id: 6, username: "David Lee", fallback: "DL" },
];

<AvatarGroup users={users} layout="grid" maxDisplay={6} />`
    },
    {
      name: "With Status Indicators",
      description: "AvatarGroup showing different user status states",
      code: `import { AvatarGroup } from "vayu-ui";

const users = [
  { username: "Online User", status: "online" },
  { username: "Busy User", status: "busy" },
  { username: "Away User", status: "away" },
  { username: "Offline User", status: "offline" },
];

<AvatarGroup users={users} />`
    }
  ],

  accessibility: {
    pattern: "Group with keyboard navigation",
    standards: [
      "WCAG 2.2 Level AA",
      "WCAG 2.5.5 Touch Targets (minimum 24x24px)",
      "prefers-reduced-motion support"
    ],
    keyboard_support: [
      "ArrowRight - Navigate to next avatar in group",
      "ArrowLeft - Navigate to previous avatar in group",
      "Tab - Move focus into and out of the avatar group",
      "Enter - Activate clickable avatar when onAvatarClick is provided",
      "Space - Activate clickable avatar when onAvatarClick is provided"
    ],
    aria_attributes: [
      'role="group" - Container role for the avatar collection',
      'aria-label="Avatar group with {count} members" - Describes the group size',
      'aria-label="Show {count} more users" - Overflow button description',
      'role="button" - Overflow indicator when clickable',
      'tabIndex={0} - Applied to avatars when interactive'
    ]
  },

  anti_patterns: [
    "Do not use for single user display - use Avatar component instead",
    "Do not set maxDisplay to 1 or less - defeats the purpose of grouping",
    "Avoid using without username or fallback - results in generic initials",
    "Do not forget to handle onOverflowClick for better UX when users exceed maxDisplay",
    "Avoid excessive maxDisplay values (10+) - can cause layout issues in stack mode"
  ],

  dependencies: {
    icons: [],
    utilities: ["clsx"],
    components: ["Avatar"]
  },

  relationships: {
    used_with: ["Card", "Tooltip", "Popover", "Badge"],
    often_inside: ["Card", "Header", "Sidebar", "Toolbar", "Comment"],
    often_contains: []
  },

  related_components: ["Avatar"],

  validation_rules: [
    "users array items should have either src or username/fallback for proper display",
    "maxDisplay should be a positive integer greater than 0",
    "spacing custom number should be negative for stack layout overlap effect",
    "onAvatarClick should be provided for interactive avatar behavior",
    "Status values must be one of: online, offline, away, busy"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add avatargroup"
  ],

  source: {
    file: "packages/ui/src/components/ui/avatargroup.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/avatargroup",
    source_file: "packages/ui/src/components/ui/avatargroup.tsx",
    extracted: [
      "component",
      "slug",
      "props",
      "variants",
      "design_tokens",
      "dependencies",
      "accessibility",
      "examples"
    ],
    inferred: [
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "anti_patterns",
      "validation_rules",
      "relationships"
    ]
  }
};

export default avatarGroupRegistry;
