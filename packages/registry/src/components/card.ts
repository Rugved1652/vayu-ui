import { ComponentRegistryEntry } from '../types.js';

export const cardEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'card',
  name: 'Card',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'A composable card container with header, media, content, and footer sub-components supporting interactive, linked, and disabled states.',
  longDescription:
    'The Card component uses the compound component pattern (Card.Header, Card.Media, Card.Content, Card.Footer) to compose rich card layouts. It supports three rendering modes: static (default div), interactive (button-like with keyboard activation), and linked (renders as an anchor tag). Interactive cards get role="button", tabIndex=0, and Enter/Space key support for WCAG 2.1.1 compliance. Linked cards with target="_blank" automatically receive rel="noopener noreferrer" for security. The disabled state reduces opacity and blocks pointer events. Card.Media supports lazy-loaded images with configurable aspect ratio, object-fit, and an overlay layer for gradient text overlays.',
  tags: [
    'card',
    'container',
    'layout',
    'surface',
    'media',
    'interactive',
    'link',
    'content',
    'article',
    'tile',
  ],
  useCases: [
    'Display grouped content with optional media, headers, and footers in a visually contained surface',
    'Create clickable cards for navigation or actions that respond to click, Enter, and Space',
    'Build linked cards that render as anchor tags with automatic security attributes for external links',
    'Show media-rich content with image overlays, aspect ratios, and gradient text layers',
    'Compose profile cards or user listings with avatar, title, subtitle, and action buttons',
    'Present disabled or non-interactive content cards with reduced opacity and blocked pointer events',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Card',
  files: [
    { name: 'Card.tsx', description: 'Root card component with interactive/link rendering, disabled state, and design token styling' },
    { name: 'CardHeader.tsx', description: 'Header sub-component with title, subtitle, avatar, and trailing action slot' },
    { name: 'CardMedia.tsx', description: 'Media sub-component with lazy-loaded image, aspect ratio, object-fit, and gradient overlay support' },
    { name: 'CardContent.tsx', description: 'Content wrapper sub-component with relaxed text styling' },
    { name: 'CardFooter.tsx', description: 'Footer sub-component with top border and right-aligned action layout' },
    { name: 'types.ts', description: 'TypeScript interfaces for Card, CardHeader, CardMedia, CardContent, and CardFooter props' },
    { name: 'hooks.ts', description: 'useCardKeyboardInteraction hook providing Enter and Space key activation for interactive cards' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting all types' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Card',
  subComponents: [
    {
      name: 'Header',
      fileName: 'CardHeader.tsx',
      description: 'Renders a card header row with an optional leading avatar, a title/subtitle block, and a trailing action slot',
      props: [
        {
          name: 'title',
          type: 'ReactNode',
          required: false,
          description: 'Main heading text rendered as an h3 element',
        },
        {
          name: 'subtitle',
          type: 'ReactNode',
          required: false,
          description: 'Secondary text rendered below the title in muted styling',
        },
        {
          name: 'action',
          type: 'ReactNode',
          required: false,
          description: 'Trailing element, typically an icon button or menu trigger, positioned with ml-auto',
        },
        {
          name: 'avatar',
          type: 'ReactNode',
          required: false,
          description: 'Leading element, typically an avatar or icon, rendered in a shrink-0 container with aria-hidden',
        },
      ],
    },
    {
      name: 'Media',
      fileName: 'CardMedia.tsx',
      description: 'Renders a responsive image with configurable aspect ratio, object-fit, and an optional gradient overlay layer',
      props: [
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'Image source URL',
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
          description: 'Alt text for the image, required for accessibility',
        },
        {
          name: 'aspectRatio',
          type: 'string',
          required: false,
          defaultValue: "'16/9'",
          description: 'CSS aspect-ratio value controlling the media container dimensions',
        },
        {
          name: 'fit',
          type: "'cover' | 'contain' | 'fill'",
          required: false,
          defaultValue: "'cover'",
          description: 'Object-fit behavior for the image element',
          options: ['cover', 'contain', 'fill'],
        },
        {
          name: 'overlay',
          type: 'ReactNode',
          required: false,
          description: 'Content rendered on top of the image inside a bottom-aligned gradient overlay',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'CardContent.tsx',
      description: 'General-purpose content wrapper with relaxed text styling for card body text',
      props: [],
    },
    {
      name: 'Footer',
      fileName: 'CardFooter.tsx',
      description: 'Action footer with a top border and right-aligned flex layout for buttons or links',
      props: [],
    },
  ],
  hooks: ['useCardKeyboardInteraction'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'interactive',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Makes the entire card a clickable surface with role="button", tabIndex=0, and keyboard activation',
    },
    {
      name: 'href',
      type: 'string',
      required: false,
      description: 'When provided, the card renders as an <a> element instead of a div',
    },
    {
      name: 'target',
      type: "AnchorHTMLAttributes<HTMLAnchorElement>['target']",
      required: false,
      description: 'Anchor target attribute, forwarded when href is set',
    },
    {
      name: 'rel',
      type: "AnchorHTMLAttributes<HTMLAnchorElement>['rel']",
      required: false,
      description: 'Anchor rel attribute. Automatically set to "noopener noreferrer" when target is "_blank"',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables all interactions: reduces opacity, blocks pointer events, and sets aria-disabled',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'interactive',
      prop: 'interactive',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, the card becomes focusable and clickable with role="button" and keyboard support via Enter/Space',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Reduces opacity to 50%, applies cursor-not-allowed, and disables pointer events. Also prevents link navigation when href is set.',
    },
    {
      name: 'linked',
      prop: 'href',
      isBoolean: false,
      description: 'When href is provided, the card renders as an <a> tag instead of a div, enabling link navigation',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when the card is clicked. Also triggers the interactive mode (role="button") when no href is set.',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Fired on key press while the interactive card has focus. Enter and Space trigger the onClick handler via useCardKeyboardInteraction.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'button',
    attributes: [
      {
        name: 'role="button"',
        description: 'Applied to interactive cards (when interactive=true or onClick is provided) to signal a clickable surface to assistive technology',
        managedByComponent: true,
      },
      {
        name: 'tabIndex="0"',
        description: 'Applied alongside role="button" to make interactive cards keyboard-focusable',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set to true when the disabled prop is active, signaling the non-interactive state to screen readers',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (avatar)',
        description: 'Applied to the avatar wrapper div in Card.Header to hide decorative avatars from assistive technology',
        managedByComponent: true,
      },
      {
        name: 'rel="noopener noreferrer"',
        description: 'Automatically applied when target="_blank" is set to prevent reverse tabnapping security vulnerability',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Activates the interactive card by triggering the onClick handler (WCAG 2.1.1)',
      },
      {
        key: 'Space',
        behavior: 'Activates the interactive card by triggering the onClick handler (WCAG 2.1.1)',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the next focusable element',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous focusable element',
      },
    ],
    focusManagement:
      'Interactive cards receive focus-visible styling (outline ring) only on keyboard navigation via focus-visible:outline-2 with outline-focus token. Pointer clicks do not trigger the focus ring.',
    wcagLevel: 'AA',
    notes:
      'The card switches rendering between <div>, <div role="button">, and <a> depending on interactive/href props. Linked cards use native <a> semantics for built-in keyboard and screen reader support. Interactive cards use the useCardKeyboardInteraction hook to provide Enter/Space activation matching native button behavior. All images use lazy loading and require alt text via the Media sub-component.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Buttons are commonly placed in Card.Header actions or Card.Footer for CTAs like "Read more" or "Follow"',
    },
    {
      slug: 'typography',
      reason: 'Typography components provide semantic heading and paragraph text inside Card.Content and Card.Header',
    },
    {
      slug: 'badge',
      reason: 'Badges can appear in Card.Header to indicate status, category, or notification counts alongside the title',
    },
    {
      slug: 'divider',
      reason: 'Dividers separate multiple cards or card sections in a list or grid layout',
    },
    {
      slug: 'avatar',
      reason: 'Avatars are frequently used as the Card.Header avatar prop for profile and user cards',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Card with Media',
      description: 'A complete card with media image, header, content paragraph, and footer action button.',
      code: `import { Card, Typography, Button } from 'vayu-ui';

export default function DefaultCard() {
  return (
    <Card>
      <Card.Media
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
        alt="Abstract gradient art"
      />
      <Card.Header
        title="Design Tokens"
        subtitle="A unified color palette for every surface."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Ground, primary, secondary, and semantic colors work seamlessly
          across light and dark mode.
        </Typography.P>
      </Card.Content>
      <Card.Footer>
        <Button variant="ghost" size="small">
          Read more →
        </Button>
      </Card.Footer>
    </Card>
  );
}`,
      tags: ['default', 'media', 'header', 'content', 'footer'],
    },
    {
      title: 'Interactive Card',
      description: 'A clickable card that responds to click, Enter, and Space with role="button" and keyboard focus.',
      code: `import { Card, Typography } from 'vayu-ui';

export default function InteractiveCard() {
  return (
    <Card interactive onClick={() => alert('Clicked!')}>
      <Card.Header
        title="Click Me"
        subtitle="This card is focusable and keyboard-accessible."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Interactive cards get role="button", tabIndex=0, and Enter / Space
          key support.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ['interactive', 'click', 'keyboard', 'button-role'],
    },
    {
      title: 'Linked Card',
      description: 'A card that renders as an anchor tag, navigating to a URL on click with automatic security attributes.',
      code: `import { Card, Typography } from 'vayu-ui';

export default function LinkedCard() {
  return (
    <Card href="https://github.com" target="_blank">
      <Card.Header
        title="GitHub"
        subtitle='Opens in a new tab with rel="noopener noreferrer".'
      />
    </Card>
  );
}`,
      tags: ['link', 'anchor', 'navigation', 'external'],
    },
    {
      title: 'Disabled Card',
      description: 'A non-interactive card with reduced opacity and blocked pointer events.',
      code: `import { Card, Typography } from 'vayu-ui';

export default function DisabledCard() {
  return (
    <Card disabled interactive>
      <Card.Header
        title="Disabled Card"
        subtitle="Pointer events are blocked and opacity is reduced."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          This card cannot be interacted with.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ['disabled', 'state', 'non-interactive'],
    },
    {
      title: 'Card with Avatar and Action',
      description: 'A profile card using the Header avatar and action slots for a user avatar and follow button.',
      code: `import { Card, Button, Typography } from 'vayu-ui';

export default function AvatarCard() {
  return (
    <Card>
      <Card.Header
        avatar={
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-brand-content font-semibold">
            JD
          </div>
        }
        title="John Doe"
        subtitle="Software Engineer"
        action={
          <Button variant="ghost" size="small">
            Follow
          </Button>
        }
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Building beautiful user interfaces with modern web technologies.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ['avatar', 'action', 'profile', 'user'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Nesting interactive elements inside an interactive card',
      bad: '<Card interactive onClick={handleClick}><a href="/link">Link</a></Card>',
      good: '<Card interactive onClick={() => router.push("/link")}><Card.Content>Link text</Card.Content></Card>',
      reason: 'Nesting an <a> or <button> inside an element with role="button" violates HTML spec and creates confusing focus/activation behavior for screen readers.',
    },
    {
      title: 'Using onClick without interactive or href',
      bad: '<Card onClick={handleClick}><Card.Content>Click me</Card.Content></Card>',
      good: '<Card interactive onClick={handleClick}><Card.Content>Click me</Card.Content></Card>',
      reason: 'While onClick alone triggers the interactive mode internally, explicitly setting interactive makes the intent clear and ensures the card has the correct ARIA role and focus styling from the start.',
    },
    {
      title: 'Omitting alt on Card.Media',
      bad: '<Card.Media src="/photo.jpg" alt="" />',
      good: '<Card.Media src="/photo.jpg" alt="Team collaborating around a whiteboard" />',
      reason: 'The alt prop is required on Card.Media for a reason. Empty or decorative alt text should only be used when the image is purely decorative and adds no informational value. Meaningful alt text is essential for screen reader users.',
    },
    {
      title: 'Setting both href and onClick',
      bad: '<Card href="/page" onClick={handleClick}>...</Card>',
      good: '<Card href="/page">...</Card>  // use onClick on a Button inside Card.Footer instead',
      reason: 'When href is set the card renders as an <a> tag, so onClick conflicts with native link navigation. If you need both, use a linked card for navigation and place action buttons in Card.Footer.',
    },
    {
      title: 'Using Card without sub-components',
      bad: '<Card><p>Some text</p><button>Action</button></Card>',
      good: '<Card><Card.Content><p>Some text</p></Card.Content><Card.Footer><button>Action</button></Card.Footer></Card>',
      reason: 'Bypassing sub-components loses consistent spacing, typography, and layout. Card.Content provides proper text styling and Card.Footer provides the correct border and alignment.',
    },
  ],
};
