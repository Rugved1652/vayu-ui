import { ComponentRegistryEntry } from '../types.js';

export const avatarEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'avatar',
  name: 'Avatar',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A user profile display component that renders images, initials, or fallback placeholders with optional status indicators and interactive behavior.',
  longDescription:
    'The Avatar component uses the compound component pattern with four sub-components: Image (profile photo with loading spinner and fallback source), Initials (auto-generated from username with deterministic WCAG-compliant colors), Fallback (default silhouette image), and Status (online/offline/away/busy indicator dot). It supports four sizes (small: 32px, medium: 48px, large: 64px, xlarge: 96px) or custom numeric sizing. When an onClick handler is provided, the avatar becomes interactive with button semantics, keyboard support (Enter/Space), and focus ring styling.',
  tags: [
    'avatar',
    'profile',
    'user',
    'image',
    'initials',
    'status',
    'presence',
    'identity',
    'thumbnail',
    'picture',
    'span',
  ],
  useCases: [
    'Displaying user profile pictures in navigation bars, headers, or user menus',
    'Showing user initials with deterministic colors when photos are unavailable',
    'Indicating online presence or availability status alongside user avatars',
    'Creating clickable profile avatars that navigate to user settings or profiles',
    'Rendering fallback silhouettes when image URLs fail to load',
    'Building user lists, comment threads, or team member grids with avatar displays',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Avatar',
  files: [
    { name: 'Avatar.tsx', description: 'Root component with size styling, interactive behavior, ARIA attributes, and compound component assembly' },
    { name: 'AvatarImage.tsx', description: 'Image sub-component with loading spinner, error handling, and fallback source support' },
    { name: 'AvatarInitials.tsx', description: 'Initials sub-component that generates letters from username with deterministic WCAG-compliant background colors' },
    { name: 'AvatarFallback.tsx', description: 'Fallback sub-component rendering a default silhouette image when profile photos are unavailable' },
    { name: 'AvatarStatus.tsx', description: 'Status indicator sub-component showing online, offline, away, or busy presence dots' },
    { name: 'types.ts', description: 'TypeScript type definitions for AvatarSize, AvatarStatus, and all component prop interfaces' },
    { name: 'hooks.ts', description: 'Utility functions: generateInitials and getInitialsColor for deterministic avatar rendering' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the Avatar component and all type definitions' },
    { name: 'README.md', description: 'Component documentation, anatomy, and usage guidelines' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Avatar',
  subComponents: [
    {
      name: 'Image',
      fileName: 'AvatarImage.tsx',
      description: 'Renders the user profile image with a loading spinner while loading, error state handling, and optional fallback image source.',
      props: [
        {
          name: 'fallbackSrc',
          type: 'string',
          required: false,
          description: 'Alternate image URL to attempt if the primary src fails to load. Only tried once before showing error state.',
        },
        {
          name: 'src',
          type: 'string',
          required: false,
          description: 'Primary image URL for the profile photo. Inherited from ImgHTMLAttributes.',
        },
        {
          name: 'alt',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Alternative text for the image. Inherited from ImgHTMLAttributes.',
        },
        {
          name: 'onError',
          type: 'React.SyntheticEvent<HTMLImageElement>',
          required: false,
          description: 'Called when the image fails to load (after fallback attempt if fallbackSrc is provided). Inherited from ImgHTMLAttributes.',
        },
        {
          name: 'onLoad',
          type: 'React.SyntheticEvent<HTMLImageElement>',
          required: false,
          description: 'Called when the image successfully loads. Inherited from ImgHTMLAttributes.',
        },
      ],
    },
    {
      name: 'Initials',
      fileName: 'AvatarInitials.tsx',
      description: 'Generates and displays the user initials from their username with a deterministic, WCAG-compliant background color.',
      props: [
        {
          name: 'username',
          type: 'string',
          required: true,
          description: 'Full name used to generate initials. Single word returns first letter; multiple words return first and last initials.',
        },
      ],
    },
    {
      name: 'Fallback',
      fileName: 'AvatarFallback.tsx',
      description: 'Displays a default silhouette image when no profile photo or initials are available.',
      props: [
        {
          name: 'src',
          type: 'string',
          required: false,
          defaultValue: "'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'",
          description: 'URL for the fallback silhouette image. Defaults to a generic user photo.',
        },
        {
          name: 'alt',
          type: 'string',
          required: false,
          defaultValue: "'Default avatar'",
          description: 'Alternative text for the fallback image.',
        },
      ],
    },
    {
      name: 'Status',
      fileName: 'AvatarStatus.tsx',
      description: 'Renders a small colored dot indicating the user online presence or availability status.',
      props: [
        {
          name: 'status',
          type: "AvatarStatus",
          required: true,
          description: 'The presence status to display. Controls the dot color: green for online, gray for offline, yellow for away, red for busy.',
          options: ['online', 'offline', 'away', 'busy'],
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Custom accessible label for the status indicator, overriding the default (e.g. "In a meeting" instead of "Busy").',
        },
      ],
    },
  ],
  hooks: ['generateInitials', 'getInitialsColor'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'size',
      type: "AvatarSize | number",
      required: false,
      defaultValue: "'medium'",
      description: 'Controls the avatar dimensions. Named sizes map to fixed pixel values (small: 32px, medium: 48px, large: 64px, xlarge: 96px). A number sets custom pixel dimensions with auto-scaled font size.',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    {
      name: 'username',
      type: 'string',
      required: false,
      defaultValue: "''",
      description: 'User name used to generate the aria-label and passed to Initials sub-component for letter generation.',
    },
    {
      name: 'alt',
      type: 'string',
      required: false,
      description: 'Alternative text for the avatar, used in the aria-label. Takes precedence over username when both are provided.',
    },
    {
      name: 'status',
      type: "AvatarStatus",
      required: false,
      description: 'Presence status appended to the aria-label (e.g. "User avatar (online)"). Does not render the status dot by itself — use Avatar.Status for the visual indicator.',
      options: ['online', 'offline', 'away', 'busy'],
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Makes the avatar interactive. When provided, the root element renders with role="button", tabIndex={0}, cursor-pointer, and keyboard activation via Enter/Space.',
    },
    {
      name: 'tabIndex',
      type: 'number',
      required: false,
      description: 'Overrides the default tab index. Automatically set to 0 when onClick is provided; can be set to -1 to remove from tab order.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content rendered inside the avatar — typically one of Image, Initials, or Fallback, optionally alongside Status.',
    },
  ],
  rendersAs: 'span',

  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['small', 'medium', 'large', 'xlarge'],
    default: 'medium',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'imageLoading',
      prop: 'src (Avatar.Image)',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Managed internally by AvatarImage. Shows a spinning loader while the image loads, then fades in the image via opacity transition.',
    },
    {
      name: 'imageError',
      prop: 'src (Avatar.Image)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Managed internally by AvatarImage. Set to true when the primary image fails and no fallbackSrc is available (or fallback also fails). Triggers the parent Fallback component if present.',
    },
    {
      name: 'interactive',
      prop: 'onClick',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When onClick is provided, the avatar becomes interactive with role="button", keyboard activation, focus ring, hover shadow, and active scale-down effect.',
    },
    {
      name: 'status',
      prop: 'status',
      isBoolean: false,
      values: ['online', 'offline', 'away', 'busy'],
      description: 'Presence status displayed via Avatar.Status sub-component. Each value maps to a semantic color: success (green), muted-content (gray), warning (yellow), destructive (red).',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '() => void',
      description: 'Fired when the interactive avatar is clicked or activated via keyboard. Makes the avatar focusable and adds button semantics.',
    },
    {
      name: 'onError',
      signature: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
      description: 'Fired by Avatar.Image when the image fails to load. Called after the fallback source has been attempted (if provided).',
    },
    {
      name: 'onLoad',
      signature: '(event: React.SyntheticEvent<HTMLImageElement>) => void',
      description: 'Fired by Avatar.Image when the image successfully loads, after internal loading state is cleared.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'button (interactive) / img (static)',
    attributes: [
      {
        name: 'aria-label',
        description: 'Automatically generated as "{alt or username}\'s avatar" and appended with "({status})" when status is provided. Example: "John Doe\'s avatar (online)".',
        managedByComponent: true,
      },
      {
        name: 'role="button"',
        description: 'Applied to the root span when onClick is provided, making the avatar behave as an interactive button for assistive technologies.',
        managedByComponent: true,
      },
      {
        name: 'role="img"',
        description: 'Applied to the root span when no onClick is provided, indicating a non-interactive image representation.',
        managedByComponent: true,
      },
      {
        name: 'role="status"',
        description: 'Applied to the AvatarStatus dot and the loading spinner, announcing state changes to screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden="true"',
        description: 'Applied to AvatarInitials, AvatarFallback, and the loading spinner inner element since they are decorative — the meaningful label is on the root element.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description: 'Applied to the AvatarImage loading spinner container so screen readers announce loading state changes without interrupting.',
        managedByComponent: true,
      },
      {
        name: 'aria-busy="true"',
        description: 'Applied to the AvatarImage loading spinner container while the image is being fetched.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Activates the interactive avatar (triggers onClick) when the avatar has focus. Only available when onClick is provided.',
      },
      {
        key: 'Space',
        behavior: 'Activates the interactive avatar (triggers onClick) when the avatar has focus. Only available when onClick is provided.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the interactive avatar when onClick is provided. Static avatars are not focusable.',
      },
    ],
    focusManagement:
      'Interactive avatars (with onClick) receive a visible focus ring via focus-visible:ring-2 focus-visible:ring-focus with ring-offset-2 for contrast in both light and dark modes. Static avatars are not focusable.',
    wcagLevel: 'AA',
    notes:
      'Initials colors are selected from a curated set of 12 WCAG AA-compliant colors with contrast ratios >= 4.5:1 against white text. The color is deterministically assigned per username so the same user always gets the same color.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Avatars are frequently embedded inside buttons for profile menus, user selectors, or account actions',
    },
    {
      slug: 'card',
      reason: 'Avatars appear in card headers for user attributions, author info, or team member cards',
    },
    {
      slug: 'typography',
      reason: 'Used alongside avatars to display usernames, roles, or status text in user info layouts',
    },
    {
      slug: 'badge',
      reason: 'Combined with avatars to show notification counts or verification badges overlaid on profile pictures',
    },
    {
      slug: 'divider',
      reason: 'Used between avatar groups or to separate user list sections in layouts like team directories',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Avatar Sizes',
      description: 'All four named sizes from small (32px) to extra-large (96px) using initials.',
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-6 flex-wrap">
      <Avatar size="small" username="Small User">
        <Avatar.Initials username="Small User" />
      </Avatar>
      <Avatar size="medium" username="Medium User">
        <Avatar.Initials username="Medium User" />
      </Avatar>
      <Avatar size="large" username="Large User">
        <Avatar.Initials username="Large User" />
      </Avatar>
      <Avatar size="xlarge" username="XL User">
        <Avatar.Initials username="XL User" />
      </Avatar>
    </div>
  );
}`,
      tags: ['basic', 'sizes'],
    },
    {
      title: 'Image, Initials, and Fallback',
      description: 'Three rendering modes: profile photo, generated initials, and automatic fallback when the image fails.',
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarVariants() {
  return (
    <div className="flex flex-wrap gap-8">
      {/* Profile photo */}
      <Avatar size="large" username="John Doe">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
          alt=""
        />
      </Avatar>

      {/* Generated initials */}
      <Avatar size="large" username="Jane Smith">
        <Avatar.Initials username="Jane Smith" />
      </Avatar>

      {/* Fallback on broken image */}
      <Avatar size="large" username="Fallback User">
        <Avatar.Image src="https://broken-image-link.com/image.jpg" alt="" />
        <Avatar.Fallback />
      </Avatar>
    </div>
  );
}`,
      tags: ['basic', 'variants', 'image', 'initials', 'fallback'],
    },
    {
      title: 'Status Indicators',
      description: 'Online presence dots in all four status states: online, away, busy, and offline.',
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarStatuses() {
  return (
    <div className="flex flex-wrap gap-8">
      <Avatar size="large" username="Online" status="online">
        <Avatar.Initials username="Online" />
        <Avatar.Status status="online" />
      </Avatar>
      <Avatar size="large" username="Away" status="away">
        <Avatar.Initials username="Away" />
        <Avatar.Status status="away" />
      </Avatar>
      <Avatar size="large" username="Busy" status="busy">
        <Avatar.Initials username="Busy" />
        <Avatar.Status status="busy" />
      </Avatar>
      <Avatar size="large" username="Offline" status="offline">
        <Avatar.Initials username="Offline" />
        <Avatar.Status status="offline" />
      </Avatar>
    </div>
  );
}`,
      tags: ['basic', 'status', 'presence'],
    },
    {
      title: 'Interactive Avatars',
      description: 'Clickable avatars that respond to click and keyboard activation with button semantics.',
      code: `import { Avatar } from 'vayu-ui';

export default function InteractiveAvatars() {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <Avatar
        size="large"
        username="Click Me"
        onClick={() => alert('Avatar clicked!')}
      >
        <Avatar.Initials username="Click Me" />
      </Avatar>

      <Avatar
        size="large"
        username="Profile"
        onClick={() => alert('Opening profile...')}
        status="online"
      >
        <Avatar.Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60"
          alt=""
        />
        <Avatar.Status status="online" />
      </Avatar>
    </div>
  );
}`,
      tags: ['interactive', 'clickable'],
    },
    {
      title: 'Avatar Inside Button',
      description: 'Composing avatars within Button components for profile actions and navigation.',
      code: `import { Avatar } from 'vayu-ui';
import { Button } from 'vayu-ui';

export default function AvatarInButton() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="secondary" size="medium">
        <Avatar size="small" username="John Doe">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
            alt=""
          />
        </Avatar>
        <Button.Text>John Doe</Button.Text>
      </Button>

      <Button variant="outline" size="medium">
        <Avatar size="small" username="Team">
          <Avatar.Initials username="Team" />
        </Avatar>
        <Button.Text>Team Chat</Button.Text>
      </Button>

      <Button variant="ghost" size="medium">
        <Avatar size="small" username="Account">
          <Avatar.Initials username="Account" />
        </Avatar>
        <Button.Text>Account</Button.Text>
      </Button>
    </div>
  );
}`,
      tags: ['composition', 'button', 'navigation'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using status prop without Avatar.Status sub-component',
      bad: '<Avatar status="online"><Avatar.Initials username="User" /></Avatar>',
      good: '<Avatar status="online"><Avatar.Initials username="User" /><Avatar.Status status="online" /></Avatar>',
      reason: 'The status prop on the root only sets the aria-label suffix for accessibility. It does not render a visual indicator — you must explicitly include Avatar.Status to show the colored dot.',
    },
    {
      title: 'Nesting an interactive Avatar inside a button or link',
      bad: '<button><Avatar onClick={handleClick}><Avatar.Initials username="User" /></Avatar></button>',
      good: '<Avatar onClick={handleClick}><Avatar.Initials username="User" /></Avatar>',
      reason: 'When onClick is provided, the avatar already renders with role="button" and is keyboard-interactive. Nesting it inside another button or link creates invalid HTML and breaks accessibility.',
    },
    {
      title: 'Omitting username when using Initials',
      bad: '<Avatar><Avatar.Initials /></Avatar>',
      good: '<Avatar username="Jane Doe"><Avatar.Initials username="Jane Doe" /></Avatar>',
      reason: 'The username prop is required on AvatarInitials to generate the initials text. Without it, the component returns null. The root username prop should also be set for the aria-label.',
    },
    {
      title: 'Hardcoding avatar colors or sizes with custom CSS',
      bad: '<Avatar className="w-16 h-16 bg-blue-500"><Avatar.Initials username="User" /></Avatar>',
      good: '<Avatar size="large"><Avatar.Initials username="User" /></Avatar>',
      reason: 'Hardcoding Tailwind classes bypasses the design token system and may conflict with the component internal sizing logic. Use the size prop for consistent, token-based dimensions.',
    },
  ],
};
