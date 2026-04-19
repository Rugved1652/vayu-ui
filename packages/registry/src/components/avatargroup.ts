import { ComponentRegistryEntry } from '../types.js';

export const avatarGroupEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'avatar-group',
  name: 'AvatarGroup',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A group of overlapping or gridded avatars with overflow handling, size control, status indicators, and interactive click events.',
  longDescription:
    'The AvatarGroup component renders a collection of user avatars in either a stacked (overlapping) or grid layout. It supports configurable display limits with an overflow indicator, four sizes (small, medium, large, xlarge), preset and custom spacing, per-avatar status indicators (online, offline, away, busy), and interactive click handlers for both individual avatars and the overflow button. Built on the Avatar component internally.',
  tags: [
    'avatar',
    'group',
    'user',
    'profile',
    'stack',
    'grid',
    'overflow',
    'status',
    'team',
    'members',
    'collaborators',
  ],
  useCases: [
    'Displaying a team or group of users in a stacked overlap layout',
    'Showing all participants in a grid layout within a container',
    'Indicating how many more users exist beyond a visible limit with an overflow counter',
    'Selecting or highlighting individual users by clicking avatars',
    'Showing online/offline/away/busy status per member in a team list',
    'Rendering participant lists in messaging apps, comments, or shared workspaces',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'AvatarGroup',
  files: [
    { name: 'AvatarGroup.tsx', description: 'Root component that maps users into AvatarItems and an optional OverflowButton' },
    { name: 'AvatarItem.tsx', description: 'Internal wrapper that renders a single Avatar with stacking z-index and hover effects' },
    { name: 'AvtarGroupOverflowButton.tsx', description: 'Internal overflow indicator button showing hidden user count with custom render support' },
    { name: 'hooks.ts', description: 'Internal hooks: useSpacing (spacing-to-pixel mapping) and useKeyboardNavigation (arrow key focus)' },
    { name: 'types.ts', description: 'TypeScript type definitions for AvatarGroup props, UserData, AvatarGroupSize, and AvatarGroupLayout' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the component and all public types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines', optional: true },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'AvatarGroup',
  subComponents: [],
  hooks: ['useSpacing', 'useKeyboardNavigation'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'users',
      type: 'UserData[]',
      required: false,
      defaultValue: '[]',
      description: 'Array of user objects to render as avatars. Each user can have id, src, username, alt, fallback, and status.',
    },
    {
      name: 'size',
      type: "AvatarGroupSize",
      required: false,
      defaultValue: "'medium'",
      description: 'Avatar dimensions: small (32px), medium (48px), large (64px), xlarge (96px)',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    {
      name: 'maxDisplay',
      type: 'number',
      required: false,
      defaultValue: '5',
      description: 'Maximum number of avatars to show before the overflow indicator appears',
    },
    {
      name: 'layout',
      type: "AvatarGroupLayout",
      required: false,
      defaultValue: "'stack'",
      description: 'Layout mode: stack overlaps avatars horizontally, grid wraps them in a flex grid',
      options: ['stack', 'grid'],
    },
    {
      name: 'spacing',
      type: "'tight' | 'normal' | 'loose' | number",
      required: false,
      defaultValue: "'normal'",
      description: 'Controls overlap in stack layout. Presets map to pixel values: tight (-12px), normal (-8px), loose (-4px). A number is used directly as margin-left.',
      options: ['tight', 'normal', 'loose'],
    },
    {
      name: 'renderOverflow',
      type: '(count: number) => React.ReactNode',
      required: false,
      description: 'Custom renderer for the overflow indicator. Receives the count of hidden users. Defaults to "+count" text.',
    },
    {
      name: 'onAvatarClick',
      type: '(user: UserData, index: number) => void',
      required: false,
      description: 'Callback when an individual avatar is clicked. Receives the user data and its index in the array.',
    },
    {
      name: 'onOverflowClick',
      type: '(hiddenUsers: UserData[]) => void',
      required: false,
      description: 'Callback when the overflow button is clicked. Receives the array of users beyond maxDisplay.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['small', 'medium', 'large', 'xlarge'],
    default: 'medium',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'overflow',
      prop: 'maxDisplay',
      isBoolean: false,
      defaultValue: '5',
      description: 'When the users array exceeds maxDisplay, hidden users are represented by an overflow button showing the count.',
    },
    {
      name: 'status',
      prop: 'users[].status',
      values: ['online', 'offline', 'away', 'busy'],
      isBoolean: false,
      description: 'Each user can have a status indicator rendered by the underlying Avatar.Status sub-component.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onAvatarClick',
      signature: '(user: UserData, index: number) => void',
      description: 'Fired when an individual avatar is clicked. Provides the user data object and the index within the visible list.',
    },
    {
      name: 'onOverflowClick',
      signature: '(hiddenUsers: UserData[]) => void',
      description: 'Fired when the overflow indicator button is clicked. Provides the full array of hidden user objects for displaying in a popover or modal.',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description: 'Internal keyboard navigation handler for ArrowLeft/ArrowRight focus movement between avatars.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'aria-label',
        description: 'Set on the root container to announce the total member count, e.g. "Avatar group with 6 members".',
        managedByComponent: true,
      },
      {
        name: 'aria-label (overflow button)',
        description: 'Set on the overflow button to announce the hidden count, e.g. "Show 3 more users".',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight',
        behavior: 'Moves focus to the next avatar or overflow button in the group',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Moves focus to the previous avatar or overflow button in the group',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus into and out of the avatar group',
      },
    ],
    focusManagement:
      'Arrow keys cycle focus through avatars and the overflow button within the group. Each clickable avatar receives tabIndex={0}. The overflow button uses focus-visible ring for keyboard focus indication.',
    wcagLevel: 'AA',
    notes:
      'The component uses role="group" on the container to associate the avatars. The overflow button has an explicit aria-label. When onAvatarClick is not provided, avatars are not focusable (no tabIndex), keeping the tab order clean for non-interactive groups.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [
    {
      slug: 'avatar',
      reason: 'AvatarGroup uses the Avatar compound component internally to render each user avatar with image, initials, and status support',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'avatar',
      reason: 'AvatarGroup is built on top of Avatar; use Avatar standalone for single-user displays',
    },
    {
      slug: 'tooltip',
      reason: 'Add tooltips to individual avatars to show full user names or profile details on hover',
    },
    {
      slug: 'popover',
      reason: 'Attach a popover to the overflow button to display the full list of hidden users',
    },
    {
      slug: 'badge',
      reason: 'Display a badge alongside the avatar group to show total member count or online count',
    },
    {
      slug: 'card',
      reason: 'Avatar groups are commonly placed in card headers to show team members or assignees',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Stack',
      description: 'Default stacked layout showing 4 of 6 users with an overflow indicator for the remaining 2.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'online' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'away' as const },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png', status: 'busy' as const },
  { id: 6, username: 'David Lee', fallback: 'DL', status: 'offline' as const },
];

export default function BasicStack() {
  return <AvatarGroup users={users} maxDisplay={4} />;
}`,
      tags: ['basic', 'stack', 'overflow'],
    },
    {
      title: 'Grid Layout',
      description: 'Grid layout that wraps avatars instead of overlapping them, useful for showing all members.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png' },
  { id: 2, username: 'Jane Smith', fallback: 'JS' },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png' },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ' },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png' },
  { id: 6, username: 'David Lee', fallback: 'DL' },
];

export default function GridLayout() {
  return (
    <div className="max-w-50">
      <AvatarGroup users={users} layout="grid" maxDisplay={10} />
    </div>
  );
}`,
      tags: ['grid', 'layout', 'all-visible'],
    },
    {
      title: 'Avatar Sizes',
      description: 'All four sizes with matching spacing: small with tight, medium (default), large with loose, and xlarge.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png' },
  { id: 2, username: 'Jane Smith', fallback: 'JS' },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png' },
];

export default function SizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarGroup users={users} size="small" spacing="tight" />
      <AvatarGroup users={users} size="medium" />
      <AvatarGroup users={users} size="large" spacing="loose" />
      <AvatarGroup users={users} size="xlarge" />
    </div>
  );
}`,
      tags: ['sizes', 'small', 'medium', 'large', 'xlarge', 'spacing'],
    },
    {
      title: 'Interactive with Click Handlers',
      description: 'Click avatars to select a user and click the overflow button to reveal hidden members.',
      code: `import React, { useState } from 'react';
import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'online' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'away' as const },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png', status: 'busy' as const },
];

export default function InteractiveDemo() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div>
      <AvatarGroup
        users={users}
        maxDisplay={4}
        onAvatarClick={(user) => setSelectedUser(user.username || null)}
        onOverflowClick={(hiddenUsers) => console.log('Hidden:', hiddenUsers)}
      />
      {selectedUser && <p>Selected: {selectedUser}</p>}
    </div>
  );
}`,
      tags: ['interactive', 'click', 'selection', 'overflow'],
    },
    {
      title: 'Custom Overflow Renderer',
      description: 'Use renderOverflow to customize the overflow indicator instead of the default "+N" text.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: \`User \${i + 1}\`,
  fallback: \`U\${i + 1}\`,
}));

export default function CustomOverflow() {
  return (
    <AvatarGroup
      users={users}
      maxDisplay={3}
      renderOverflow={(count) => <span className="text-xs font-semibold text-info">+{count} more</span>}
    />
  );
}`,
      tags: ['overflow', 'custom-render', 'renderOverflow'],
    },
    {
      title: 'Status Indicators',
      description: 'Avatars with online/offline/away/busy status indicators rendered by the underlying Avatar component.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'away' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'busy' as const },
];

export default function StatusDemo() {
  return <AvatarGroup users={users} maxDisplay={4} />;
}`,
      tags: ['status', 'online', 'offline', 'away', 'busy'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Providing users without unique ids',
      bad: '<AvatarGroup users={[{ username: "John" }, { username: "John" }]} />',
      good: '<AvatarGroup users={[{ id: 1, username: "John" }, { id: 2, username: "John" }]} />',
      reason: 'Without unique id values, React uses array index as key, which causes incorrect rendering and state issues when users are added, removed, or reordered.',
    },
    {
      title: 'Using grid layout for large user counts without a container width',
      bad: '<AvatarGroup users={manyUsers} layout="grid" maxDisplay={100} />',
      good: '<div className="max-w-md"><AvatarGroup users={manyUsers} layout="grid" maxDisplay={100} /></div>',
      reason: 'Grid layout uses flex-wrap without a constrained parent width, so it may expand indefinitely and break the page layout.',
    },
    {
      title: 'Passing onClick to AvatarGroup instead of onAvatarClick',
      bad: '<AvatarGroup onClick={handleClick} users={users} />',
      good: '<AvatarGroup onAvatarClick={handleClick} users={users} />',
      reason: 'onClick goes to the root container div and fires for any click in the group area (including gaps). onAvatarClick targets individual avatars with the specific user data and index.',
    },
    {
      title: 'Setting spacing to a positive number in stack layout',
      bad: '<AvatarGroup users={users} layout="stack" spacing={8} />',
      good: '<AvatarGroup users={users} layout="stack" spacing="tight" />',
      reason: 'Stack layout relies on negative margins for the overlapping effect. Positive spacing separates avatars instead of stacking them, defeating the visual purpose of the stack layout.',
    },
    {
      title: 'Using maxDisplay of 0 or negative values',
      bad: '<AvatarGroup users={users} maxDisplay={0} />',
      good: '<AvatarGroup users={users} maxDisplay={3} />',
      reason: 'A maxDisplay of 0 or less shows no avatars, only the overflow button with all users hidden. Use a reasonable threshold that shows some avatars visually.',
    },
  ],
};
