import { ComponentRegistryEntry } from '../types.js';

export const selectEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'select',
  name: 'Select',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'An accessible dropdown select component with single and multi-selection, search filtering, async search, creatable options, and compound component composition.',
  longDescription:
    'The Select component provides a fully featured dropdown for choosing one or more options. It supports controlled and uncontrolled modes, searchable filtering (client-side and async), multi-selection with removable chips, creatable options for adding new values, loading and error states, and a rich compound component API (Select.Trigger, Select.Content, Select.Item, Select.Loading, Select.NotFound, Select.CreateButton, etc.). The dropdown is rendered via a React portal with automatic positioning, body scroll locking, and full keyboard navigation.',
  tags: [
    'select',
    'dropdown',
    'combobox',
    'multi-select',
    'search',
    'filter',
    'creatable',
    'async',
    'form',
    'input',
    'options',
    'listbox',
  ],
  useCases: [
    'Single-option selection from a predefined list of choices in a form',
    'Multi-select with removable chips for tags, categories, or assignees',
    'Async searchable dropdowns that fetch options from an API as the user types',
    'Creatable selects that allow users to add new options on the fly',
    'Filtered option lists for large datasets where users need to search within the dropdown',
    'Accessible form inputs that require keyboard navigation and screen reader support',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Select',
  files: [
    {
      name: 'Select.tsx',
      description:
        'Root component providing SelectContext, controlled/uncontrolled state management, option registration, search filtering, async search orchestration, and creatable option handling',
    },
    {
      name: 'SelectTrigger.tsx',
      description:
        'Trigger area with inline search input, multi-select chips, loading spinner, and chevron toggle. Supports keyboard navigation to open the dropdown and cycle through options',
    },
    {
      name: 'SelectContent.tsx',
      description:
        'Portal-rendered dropdown listbox with automatic viewport-aware positioning, scroll handling, and resize observation',
    },
    {
      name: 'Selectitem.tsx',
      description:
        'Individual selectable option with aria-selected, checkmark indicator, disabled state, and keyboard navigation support',
    },
    {
      name: 'SelectStates.tsx',
      description:
        'Feedback sub-components: Loading, NotFound, SearchHint, Error, and Footer state renderers',
    },
    {
      name: 'SelectOptionList.tsx',
      description:
        'List wrappers for static children (Select.List) and async option rendering (Select.AsyncOptions)',
    },
    {
      name: 'SelectCreateButton.tsx',
      description:
        'Creatable option action that appears when the current search does not match any existing option',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for SelectRootProps, SelectTriggerProps, SelectItemProps, SelectContextValue, OptionData, and all sub-component prop interfaces',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component object and re-exporting all types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Select',
  subComponents: [
    {
      name: 'Trigger',
      fileName: 'SelectTrigger.tsx',
      description:
        'Renders the trigger area with an inline search input, multi-select removable chips, loading spinner, and chevron toggle',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          description: 'Placeholder text shown in the search input when no value is selected',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the trigger container',
        },
        {
          name: 'showSearchIcon',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true and onSearch is active, shows a search icon instead of the chevron',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          description: 'Override the trigger size; falls back to the root size prop',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'SelectContent.tsx',
      description:
        'Portal-rendered dropdown container with listbox role, automatic positioning, and scroll handling',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Content to render inside the dropdown (typically Select.List, Select.Item, Select.Loading, etc.)',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the dropdown container',
        },
      ],
    },
    {
      name: 'Item',
      fileName: 'Selectitem.tsx',
      description:
        'Individual selectable option with checkmark, disabled state, and full keyboard navigation',
      props: [
        {
          name: 'value',
          type: 'string | number',
          required: true,
          description: 'Unique value identifier for this option',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Visible label for the option',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the option row',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, the option is non-interactive and visually muted',
        },
      ],
    },
    {
      name: 'Loading',
      fileName: 'SelectStates.tsx',
      description: 'Renders a loading spinner and text while an async search is in progress',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom loading message text; defaults to "Searching..."',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the loading container',
        },
      ],
    },
    {
      name: 'NotFound',
      fileName: 'SelectStates.tsx',
      description: 'Renders a "No results found" message when the filter or search yields no options',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom not-found message text; defaults to "No results found"',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the not-found container',
        },
      ],
    },
    {
      name: 'SearchHint',
      fileName: 'SelectStates.tsx',
      description:
        'Renders a hint message when the search input is below the minimum required length for async search',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom hint message; defaults to a dynamic message based on minSearchLength',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the hint container',
        },
      ],
    },
    {
      name: 'CreateButton',
      fileName: 'SelectCreateButton.tsx',
      description:
        'Renders a creatable action when the current search text does not match any existing option',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom label for the create button; defaults to "Create option \"{search}\""',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the create button row',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'SelectStates.tsx',
      description: 'Renders an error message for search or create operations',
      props: [
        {
          name: 'type',
          type: "'search' | 'create'",
          required: false,
          defaultValue: "'search'",
          description: 'Which error to display: search errors or create-option errors',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom error message; falls back to the contextual error from the root',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the error container',
        },
      ],
    },
    {
      name: 'Footer',
      fileName: 'SelectStates.tsx',
      description: 'Renders a footer area at the bottom of the dropdown content',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Content to render inside the footer',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the footer container',
        },
      ],
    },
    {
      name: 'AsyncOptions',
      fileName: 'SelectOptionList.tsx',
      description:
        'Automatically renders Select.Item components from the async search results returned by onSearch',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to each rendered option',
        },
      ],
    },
    {
      name: 'List',
      fileName: 'SelectOptionList.tsx',
      description:
        'Wrapper that renders static children and optionally overlays async search results',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Static Select.Item children to render when not in async search mode',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to async result options',
        },
      ],
    },
  ],
  hooks: ['useSelect'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'Compound sub-components composing the select UI (Trigger, Content, Item, Loading, etc.)',
    },
    {
      name: 'value',
      type: 'SelectValue',
      required: false,
      description:
        'Controlled value. SingleValue for single-select, MultiValue for multi-select, or undefined for uncontrolled.',
    },
    {
      name: 'defaultValue',
      type: 'SelectValue',
      required: false,
      description: 'Initial value for uncontrolled mode',
    },
    {
      name: 'onValueChange',
      type: '(value: SelectValue) => void',
      required: false,
      description: 'Callback fired when the selected value changes',
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text rendered above the trigger with htmlFor linked to the input',
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      description: 'Deprecated. Error message text. Use validationState instead.',
    },
    {
      name: 'validationState',
      type: "'default' | 'error' | 'success' | 'warning'",
      required: false,
      description: 'Visual validation state applied to the trigger border',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "'md'",
      description: 'Size of the trigger input and chips',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root container',
    },
    {
      name: 'multiple',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, allows selecting multiple options as removable chips',
    },
    {
      name: 'onSearch',
      type: '(searchValue: string) => Promise<OptionData[]>',
      required: false,
      description: 'Async search handler. When provided, the component fetches options on input change.',
    },
    {
      name: 'searchDebounce',
      type: 'number',
      required: false,
      defaultValue: '300',
      description: 'Debounce delay in milliseconds before triggering onSearch',
    },
    {
      name: 'minSearchLength',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'Minimum number of characters required before triggering async search',
    },
    {
      name: 'isLoading',
      type: 'boolean',
      required: false,
      description: 'External loading state override for async search',
    },
    {
      name: 'creatable',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, allows users to create new options from search input',
    },
    {
      name: 'onCreateOption',
      type: '(inputValue: string) => Promise<OptionData | null>',
      required: false,
      description: 'Handler called when the user chooses to create a new option',
    },
    {
      name: 'isCreating',
      type: 'boolean',
      required: false,
      description: 'External creating state override for creatable option flow',
    },
    {
      name: 'createText',
      type: 'string',
      required: false,
      defaultValue: "'Create option'",
      description: 'Prefix text shown in the create button before the search term',
    },
    {
      name: 'validateCreate',
      type: '(inputValue: string) => boolean | string',
      required: false,
      description:
        'Validation function for creatable input. Return false to block creation, or a string to show as an error message.',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Whether the dropdown is visible. Toggled by clicking the trigger, focusing the input, or keyboard navigation.',
    },
    {
      name: 'multiple',
      prop: 'multiple',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'When true, the select allows multiple selections rendered as removable chips inside the trigger.',
    },
    {
      name: 'searchLoading',
      prop: 'isLoading',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Loading state during async search. Shows a spinner in the trigger and renders Select.Loading in the dropdown.',
    },
    {
      name: 'creating',
      prop: 'isCreating',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Loading state while a new option is being created via onCreateOption.',
    },
    {
      name: 'validationState',
      prop: 'validationState',
      isBoolean: false,
      values: ['default', 'error', 'success', 'warning'],
      defaultValue: "'default'",
      description: 'Visual validation state controlling the trigger border color.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onValueChange',
      signature: '(value: SelectValue) => void',
      description:
        'Fired when the user selects or deselects an option. In multi-select, returns the updated array.',
    },
    {
      name: 'onSearch',
      signature: '(searchValue: string) => Promise<OptionData[]>',
      description:
        'Fired after the user types in the search input (debounced). Should return matching options.',
    },
    {
      name: 'onCreateOption',
      signature: '(inputValue: string) => Promise<OptionData | null>',
      description: 'Fired when the user activates the creatable option button.',
    },
    {
      name: 'onClick (Trigger)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Clicking the trigger focuses the search input and toggles the dropdown open state.',
    },
    {
      name: 'onChange (search input)',
      signature: '(event: React.ChangeEvent<HTMLInputElement>) => void',
      description:
        'Typing in the search input filters client-side options or triggers the debounced async search.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'combobox',
    attributes: [
      {
        name: 'role="listbox"',
        description: 'Applied to the dropdown content container for screen reader list semantics.',
        managedByComponent: true,
      },
      {
        name: 'role="option"',
        description: 'Applied to each Select.Item and Select.CreateButton for listbox option semantics.',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Set on each option to indicate whether it is currently selected.',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Set on the trigger input to indicate whether the dropdown is open.',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid',
        description: 'Set on the trigger when validationState is error.',
        managedByComponent: true,
      },
      {
        name: 'aria-busy',
        description: 'Set on the trigger during async search or create loading states.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description: 'Set on options and the create button when they are disabled.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Provided on the root label element linking it to the search input via htmlFor.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        behavior:
          'From the trigger: opens the dropdown and focuses the first option. From an option: moves focus to the next option.',
      },
      {
        key: 'ArrowUp',
        behavior:
          'From the trigger: opens the dropdown and focuses the last option. From an option: moves focus to the previous option.',
      },
      {
        key: 'Enter',
        behavior: 'From the trigger: opens the dropdown. From an option: selects/deselects the option.',
      },
      {
        key: 'Space',
        behavior: 'From an option: selects/deselects the option.',
      },
      {
        key: 'Escape',
        behavior: 'Closes the dropdown and returns focus to the trigger input.',
      },
      {
        key: 'Tab',
        behavior:
          'Cycles focus through enabled options; wraps from last option back to the trigger input.',
      },
      {
        key: 'Backspace',
        behavior: 'In multi-select with an empty search field, removes the last selected chip.',
      },
    ],
    focusManagement:
      'Focus is managed between the trigger search input and dropdown options. Opening the dropdown does not steal focus from the input; ArrowDown/ArrowUp move focus into the option list. Escape returns focus to the input. Tab cycles within options and back to the input.',
    wcagLevel: 'AA',
    notes:
      'The Select follows the WAI-ARIA combobox and listbox patterns. The hidden container technique keeps static options mounted in the DOM so they register in the optionsMap even when the dropdown is closed, ensuring correct label resolution. Multi-select chips include small remove buttons with stopPropagation to prevent triggering the dropdown toggle.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'lucide-react' }],
  registryDependencies: [
    {
      slug: 'use-lock-body-scroll',
      reason:
        'Select uses useLockBodyScroll to prevent body scrolling when the dropdown is open',
    },
    {
      slug: 'use-on-click-outside',
      reason:
        'Select uses useOnClickOutside to close the dropdown when clicking outside',
    },
    {
      slug: 'use-key-press',
      reason:
        'Select uses useKeyPress for keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason: 'Commonly paired in forms alongside Select for a complete set of input fields',
    },
    {
      slug: 'button',
      reason: 'Used for form submission or action triggers near select inputs',
    },
    {
      slug: 'modal',
      reason: 'Selects are frequently placed inside modals for configuration or filter dialogs',
    },
    {
      slug: 'card',
      reason: 'Cards often contain select inputs in their body for settings or filters',
    },
    {
      slug: 'form',
      reason: 'Select is a core form input component integrated into form validation flows',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Single Select',
      description: 'A simple single-select dropdown with static options.',
      code: `import { Select } from 'vayu-ui';

export default function BasicSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Choose a fruit" />
      <Select.Content>
        <Select.List>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="cherry">Cherry</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}`,
      tags: ['basic', 'single', 'static'],
    },
    {
      title: 'Controlled Multi-Select',
      description: 'Multi-select with chips and controlled state.',
      code: `import { Select } from 'vayu-ui';
import { useState } from 'react';

export default function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(['react']);

  return (
    <Select.Root value={value} onValueChange={setValue} multiple>
      <Select.Trigger placeholder="Pick skills" />
      <Select.Content>
        <Select.List>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="angular">Angular</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}`,
      tags: ['multi-select', 'controlled', 'chips'],
    },
    {
      title: 'Async Search Select',
      description: 'Async searchable dropdown that fetches options from an API.',
      code: `import { Select } from 'vayu-ui';
import { useState } from 'react';

async function searchUsers(query: string) {
  const res = await fetch(\`/api/users?q=\${query}\`);
  const data = await res.json();
  return data.map((u: any) => ({ value: u.id, label: u.name }));
}

export default function AsyncSelectDemo() {
  return (
    <Select.Root onSearch={searchUsers} minSearchLength={2}>
      <Select.Trigger placeholder="Search users..." showSearchIcon />
      <Select.Content>
        <Select.SearchHint />
        <Select.Loading>Loading users...</Select.Loading>
        <Select.AsyncOptions />
        <Select.NotFound>No users found</Select.NotFound>
      </Select.Content>
    </Select.Root>
  );
}`,
      tags: ['async', 'search', 'fetch'],
    },
    {
      title: 'Creatable Select',
      description: 'Allows users to create new options if no existing match is found.',
      code: `import { Select } from 'vayu-ui';
import { useState } from 'react';

export default function CreatableSelectDemo() {
  const [options, setOptions] = useState([
    { value: 'design', label: 'Design' },
    { value: 'dev', label: 'Development' },
  ]);

  const handleCreate = async (input: string) => {
    const newOption = { value: input.toLowerCase(), label: input };
    setOptions((prev) => [...prev, newOption]);
    return newOption;
  };

  return (
    <Select.Root creatable onCreateOption={handleCreate}>
      <Select.Trigger placeholder="Add a tag..." />
      <Select.Content>
        <Select.List>
          {options.map((opt) => (
            <Select.Item key={opt.value} value={opt.value}>{opt.label}</Select.Item>
          ))}
        </Select.List>
        <Select.CreateButton />
      </Select.Content>
    </Select.Root>
  );
}`,
      tags: ['creatable', 'tags', 'custom'],
    },
    {
      title: 'Select with Error State',
      description: 'A select input showing a validation error message.',
      code: `import { Select } from 'vayu-ui';

export default function ErrorSelectDemo() {
  return (
    <Select.Root validationState="error" error="Please select a country">
      <Select.Trigger placeholder="Select country" />
      <Select.Content>
        <Select.List>
          <Select.Item value="us">United States</Select.Item>
          <Select.Item value="ca">Canada</Select.Item>
          <Select.Item value="mx">Mexico</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}`,
      tags: ['error', 'validation', 'form'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside Select.Root',
      bad: '<Select.Trigger /><Select.Content />',
      good: '<Select.Root><Select.Trigger /><Select.Content /></Select.Root>',
      reason:
        'All Select sub-components depend on SelectContext provided by Select.Root. Rendering them outside Root throws a "must be used within Select.Root" error.',
    },
    {
      title: 'Mixing controlled and uncontrolled value props',
      bad: '<Select.Root value={selected} defaultValue="apple">',
      good: '<Select.Root value={selected} onValueChange={setSelected}>',
      reason:
        'Passing both value and defaultValue creates conflicting state management. Use value + onValueChange for controlled mode, or defaultValue alone for uncontrolled mode.',
    },
    {
      title: 'Using Select.Item outside Select.List or Select.Content',
      bad: '<Select.Item value="a">A</Select.Item>',
      good: '<Select.Content><Select.List><Select.Item value="a">A</Select.Item></Select.List></Select.Content>',
      reason:
        'Select.Item registers itself in the optionsMap context during mount. While it works outside List, it may not participate correctly in filtering or async rendering. Always place items inside Select.Content.',
    },
    {
      title: 'Passing non-primitive values to Select.Item',
      bad: '<Select.Item value={{ id: 1 }}>Option</Select.Item>',
      good: '<Select.Item value="1">Option</Select.Item>',
      reason:
        'Select.Item value must be a string or number. Object values are not supported by the internal optionsMap and will cause comparison issues.',
    },
    {
      title: 'Forgetting to include Select.Loading in async mode',
      bad: '<Select.Content><Select.AsyncOptions /></Select.Content>',
      good: '<Select.Content><Select.Loading /><Select.AsyncOptions /><Select.NotFound /></Select.Content>',
      reason:
        'Without Select.Loading, users see an empty dropdown while fetching results. Always include feedback states for a complete async UX.',
    },
  ],
};
