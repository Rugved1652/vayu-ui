import { ComponentRegistryEntry } from '../types.js';

export const showEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'show',
  name: 'Show',
  type: 'component',
  category: 'utility',

  // ── Description ───────────────────────────────────────
  description:
    'A conditional rendering utility inspired by SolidJS that renders children only when a condition is truthy, with optional fallback and function-as-children support.',
  longDescription:
    'The Show component provides declarative conditional rendering for React. When the `when` prop is truthy, it renders `children`. When falsy, it renders `fallback` (default null). It also supports function-as-children to access the resolved truthy value. The module additionally exports Match, Case, and Default components for switch-style first-match rendering, replacing verbose ternary or switch statements with a readable JSX structure.',
  tags: [
    'conditional',
    'rendering',
    'utility',
    'show',
    'match',
    'case',
    'fallback',
    'solidjs',
    'control-flow',
  ],
  useCases: [
    'Conditionally render UI blocks based on boolean, string, or object truthiness',
    'Provide a fallback UI when data is loading, missing, or null',
    'Render children as a function with typed access to the resolved truthy value',
    'Replace nested ternary operators with declarative Match/Case/Default branches',
    'Switch rendering between multiple states based on enumerated conditions',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Show',
  files: [
    {
      name: 'Show.tsx',
      description: 'Core conditional rendering component with when/fallback/children logic',
    },
    {
      name: 'Match.tsx',
      description: 'First-match switch component with Case and Default branch components',
    },
    {
      name: 'types.ts',
      description: 'TypeScript interfaces for ShowProps, MatchProps, CaseProps, and DefaultProps',
    },
    {
      name: 'index.ts',
      description: 'Barrel export for Show, Match, Case, Default, and all type definitions',
    },
    {
      name: 'README.md',
      description: 'Component documentation, anatomy, and use cases',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Show',
  subComponents: [],
  hooks: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'when',
      type: 'T | undefined | null | false',
      required: true,
      description:
        'The condition to evaluate. When truthy, children are rendered. When falsy, fallback is rendered.',
    },
    {
      name: 'fallback',
      type: 'ReactNode',
      required: false,
      defaultValue: 'null',
      description: 'Content to render when `when` is falsy. Defaults to null (renders nothing).',
    },
    {
      name: 'children',
      type: 'ReactNode | ((value: T) => ReactNode)',
      required: true,
      description:
        'Content to render when `when` is truthy. Can be a React node or a function that receives the resolved value.',
    },
  ],
  rendersAs: 'React.Fragment',

  // ── Variants & Sizes ──────────────────────────────────
  // No visual variants — Show is a pure control-flow utility

  // ── States ────────────────────────────────────────────
  states: [],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [],
    keyboardInteractions: [],
    focusManagement:
      'Show does not render any DOM element itself; it only controls conditional rendering of its children. Focus management is delegated to the rendered children.',
    wcagLevel: 'AA',
    notes:
      'Because Show renders a fragment or null, it does not introduce any accessibility concerns. Ensure that fallback content and conditional children are independently accessible.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'spinner',
      reason: 'Spinner is commonly used as fallback content while async data is loading',
    },
    {
      slug: 'skeleton',
      reason: 'Skeleton provides a placeholder fallback for data that is not yet available',
    },
    {
      slug: 'alert',
      reason: 'Alert can be used as fallback to display error or empty-state messages',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Conditional Rendering',
      description: 'Render a user greeting only when user data exists.',
      code: `import { Show } from 'vayu-ui';

export default function UserGreeting({ user }: {user?: {name: string} | null}) {
  return (
    <Show when={user} fallback={<p>Please sign in.</p>}>
      <h1>Welcome back, {user?.name}!</h1>
    </Show>
  );
}`,
      tags: ['basic', 'conditional', 'fallback'],
    },
    {
      title: 'Function as Children',
      description: 'Access the resolved truthy value directly in a render function.',
      code: `import { Show } from 'vayu-ui';

export default function UserDetails({ user }) {
  return (
    <Show when={user}>
      {(u) => (
        <div>
          <p>Email: {u.email}</p>
          <p>Role: {u.role}</p>
        </div>
      )}
    </Show>
  );
}`,
      tags: ['function', 'typed', 'children'],
    },
    {
      title: 'Match with Case and Default',
      description: 'Switch-style rendering with first-match evaluation and a fallback branch.',
      code: `import { Match, Case, Default } from 'vayu-ui';

export default function StatusMessage({ status }) {
  return (
    <Match>
      <Case condition={status === 'success'}>
        <p className="text-success">Operation completed!</p>
      </Case>
      <Case condition={status === 'error'}>
        <p className="text-destructive">Something went wrong.</p>
      </Case>
      <Default>
        <p className="text-muted-content">Processing...</p>
      </Default>
    </Match>
  );
}`,
      tags: ['match', 'case', 'switch', 'branching'],
    },
    {
      title: 'Loading State with Fallback',
      description: 'Use Show to toggle between a loading spinner and loaded content.',
      code: `import { Show, Spinner } from 'vayu-ui';

export default function Dashboard({ data }) {
  return (
    <Show
      when={data}
      fallback={<Spinner size="md" aria-label="Loading dashboard" />}
    >
      <DashboardCharts data={data} />
    </Show>
  );
}`,
      tags: ['loading', 'spinner', 'async', 'fallback'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using Show for purely boolean logic outside JSX',
      bad: 'const name = Show({ when: user, children: user.name });',
      good: 'const name = user ? user.name : null;',
      reason:
        'Show is a JSX component, not a utility function. Using it outside JSX breaks React rules and creates unnecessary component overhead.',
    },
    {
      title: 'Nesting Match inside Show redundantly',
      bad: '<Show when={status}><Match><Case condition={status === "a"}>...</Case></Match></Show>',
      good: '<Match><Case condition={status === "a"}>...</Case><Default>...</Default></Match>',
      reason:
        'Wrapping Match in Show is redundant because Match already handles all branches internally. Use Match directly for switch-style logic.',
    },
    {
      title: 'Forgetting to provide a fallback for nullable data',
      bad: '<Show when={user}><ProfileCard user={user} /></Show>',
      good: '<Show when={user} fallback={<p>User not found</p>}><ProfileCard user={user} /></Show>',
      reason:
        'Without a fallback, Show renders null when the condition is falsy, which can cause layout shifts or confusing blank areas.',
    },
    {
      title: 'Using complex side effects inside Show children',
      bad: '<Show when={isOpen}>{console.log("opened"); <Modal />}</Show>',
      good: 'useEffect(() => { if (isOpen) console.log("opened"); }, [isOpen]);\nreturn <Show when={isOpen}><Modal /></Show>;',
      reason:
        'Show children should be pure render output. Side effects belong in useEffect or event handlers to avoid unexpected re-execution during React renders.',
    },
  ],
};
