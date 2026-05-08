import type { TreeNode } from 'vayu-ui';

export const installCommand = 'npx vayu-ui-cli init';

export const highlights = [
  { label: 'Components', value: '50+', tone: 'bg-brand' },
  { label: 'Hooks', value: '35+', tone: 'bg-info' },
  { label: 'WCAG 2.2 AA', value: 'A11y', tone: 'bg-success' },
  { label: 'Tailwind v4', value: 'Tokens', tone: 'bg-warning' },
];

export const collageTreeData: TreeNode[] = [
  {
    id: 'app',
    label: 'app',
    children: [
      {
        id: 'landing',
        label: 'landing',
        children: [
          { id: 'Hero.tsx', label: 'Hero.tsx' },
          { id: 'blocks.tsx', label: 'blocks.tsx' },
        ],
      },
      { id: 'global.css', label: 'global.css' },
    ],
  },
  {
    id: 'components',
    label: 'components',
    children: [
      { id: 'button.tsx', label: 'button.tsx' },
      { id: 'card.tsx', label: 'card.tsx' },
      { id: 'slider.tsx', label: 'slider.tsx' },
    ],
  },
];

export const teamUsers = [
  {
    id: 1,
    username: 'Rugved Patel',
    fallback: 'RP',
    status: 'online' as const,
  },
  {
    id: 2,
    username: 'Ava Chen',
    src: 'https://github.com/shadcn.png',
    alt: 'Ava Chen',
    status: 'away' as const,
  },
  {
    id: 3,
    username: 'Noah Kim',
    src: 'https://github.com/vercel.png',
    alt: 'Noah Kim',
    status: 'online' as const,
  },
  {
    id: 4,
    username: 'Mia Lopez',
    fallback: 'ML',
    status: 'busy' as const,
  },
  {
    id: 5,
    username: 'Dev Agent',
    fallback: 'AI',
    status: 'online' as const,
  },
];

export const taskSeed = [
  { id: 'inputs', title: 'Input components', detail: 'Text, Select, Checkbox' },
  { id: 'layout', title: 'Layout panels', detail: 'Resizable & Draggable' },
  { id: 'display', title: 'Display widgets', detail: 'Card, Badge, Avatar' },
  { id: 'pickers', title: 'Date & Time pickers', detail: 'Calendar integration' },
];
