import { ComponentRegistryEntry } from '../types.js';

export const tableEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'table',
  name: 'Table',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A responsive HTML table component with compound sub-components for headers, rows, cells, caption, and footer, supporting sortable columns, selectable rows, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The Table component uses the compound component pattern (Table.Caption, Table.Head, Table.Body, Table.Footer, Table.Row, Table.Header, Table.Cell) to compose accessible data tables. It wraps a native <table> element in a responsive scroll container with design token styling. Table.Header supports sortable columns with aria-sort indicators and keyboard focus. Table.Row supports selection states with aria-selected and focus rings. Table.Caption can be visually hidden while remaining accessible. Table.Body announces empty states via aria-live. All sub-components extend their native HTML counterparts and support forwarded refs.',
  tags: [
    'table',
    'data',
    'grid',
    'list',
    'display',
    'sortable',
    'selectable',
    'responsive',
    'tabular',
    'rows',
    'columns',
  ],
  useCases: [
    'Displaying structured tabular data like invoices, users, or product listings',
    'Sortable data tables where users can click column headers to reorder rows',
    'Selectable row tables for multi-select workflows like bulk actions',
    'Financial or summary tables with a footer row showing totals',
    'Responsive tables that scroll horizontally on narrow viewports',
    'Accessible data tables with captions and proper ARIA attributes for screen readers',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Table',
  files: [
    { name: 'Table.tsx', description: 'Root table component wrapping native <table> in a responsive scroll container with design token styling and compound component attachment' },
    { name: 'TableCaption.tsx', description: 'Caption sub-component with visually-hidden support for accessible table descriptions' },
    { name: 'TableHead.tsx', description: '<thead> section component with muted background styling' },
    { name: 'TableBody.tsx', description: '<tbody> section component with divider styling and empty-state aria-live region' },
    { name: 'TableFooter.tsx', description: '<tfoot> section component with bold styling for totals and summaries' },
    { name: 'TableRow.tsx', description: 'Row component with selected and selectable states, hover styling, and keyboard focus support' },
    { name: 'TableHeader.tsx', description: 'Header cell (<th>) with scope, sortable indicator icons, and aria-sort support' },
    { name: 'TableCell.tsx', description: 'Data cell (<td>) with accessible column and row index attributes' },
    { name: 'types.ts', description: 'TypeScript type definitions for all Table sub-component props' },
    { name: 'index.ts', description: 'Barrel export file assembling the compound component and re-exporting all types' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Table',
  subComponents: [
    {
      name: 'Caption',
      fileName: 'TableCaption.tsx',
      description: 'Renders a <caption> element for the table, providing an accessible description. Can be visually hidden while remaining available to screen readers.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Caption text content describing the table\'s purpose or data',
        },
        {
          name: 'visuallyHidden',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, applies sr-only classes to hide the caption visually while keeping it accessible to screen readers',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <caption> element',
        },
      ],
    },
    {
      name: 'Head',
      fileName: 'TableHead.tsx',
      description: 'Renders the <thead> section of the table, containing header rows with muted background styling.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Header row content, typically one or more Table.Row elements containing Table.Header cells',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <thead> element',
        },
      ],
    },
    {
      name: 'Body',
      fileName: 'TableBody.tsx',
      description: 'Renders the <tbody> section of the table with row dividers and optional empty-state announcement.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Body row content, typically Table.Row elements containing Table.Cell elements',
        },
        {
          name: 'empty',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, adds aria-live="polite" to announce the empty state to screen readers',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <tbody> element',
        },
      ],
    },
    {
      name: 'Footer',
      fileName: 'TableFooter.tsx',
      description: 'Renders the <tfoot> section of the table with bold styling, used for totals and summary rows.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Footer row content, typically a Table.Row with summary or total Table.Cell elements',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <tfoot> element',
        },
      ],
    },
    {
      name: 'Row',
      fileName: 'TableRow.tsx',
      description: 'Renders a <tr> element with optional selection state, hover styling, and keyboard focus for interactive rows.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Row content, typically Table.Header or Table.Cell elements',
        },
        {
          name: 'selected',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, applies a muted background to visually indicate the row is selected',
        },
        {
          name: 'selectable',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, makes the row interactive with cursor-pointer, focus ring, and aria-selected attribute for accessibility',
        },
        {
          name: 'aria-rowindex',
          type: 'number',
          required: false,
          description: 'Row index for accessibility, useful when rows are virtualized or filtered',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <tr> element',
        },
      ],
    },
    {
      name: 'Header',
      fileName: 'TableHeader.tsx',
      description: 'Renders a <th> header cell with scope attribute, optional sort indicators, and keyboard interaction for sortable columns.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Header cell content, typically text or a label for the column',
        },
        {
          name: 'scope',
          type: "'row' | 'col' | 'rowgroup' | 'colgroup'",
          required: false,
          defaultValue: "'col'",
          description: 'HTML scope attribute indicating whether the header applies to a row, column, or group',
          options: ['row', 'col', 'rowgroup', 'colgroup'],
        },
        {
          name: 'sortable',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, adds a sort indicator icon, cursor-pointer styling, tabIndex for keyboard focus, and focus ring',
        },
        {
          name: 'aria-sort',
          type: "'ascending' | 'descending' | 'none' | 'other'",
          required: false,
          description: 'Indicates the current sort direction of the column. Required when sortable is true for accessibility.',
          options: ['ascending', 'descending', 'none', 'other'],
        },
        {
          name: 'aria-colindex',
          type: 'number',
          required: false,
          description: 'Column index for accessibility, useful for tables with a large or dynamic number of columns',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <th> element',
        },
      ],
    },
    {
      name: 'Cell',
      fileName: 'TableCell.tsx',
      description: 'Renders a <td> data cell with accessible column and row index attributes.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Cell content — text, numbers, badges, buttons, or other inline elements',
        },
        {
          name: 'aria-colindex',
          type: 'number',
          required: false,
          description: 'Column index for accessibility in tables with a large or dynamic number of columns',
        },
        {
          name: 'aria-rowindex',
          type: 'number',
          required: false,
          description: 'Row index for accessibility in tables with virtualized or filtered rows',
        },
        {
          name: 'headers',
          type: 'string',
          required: false,
          description: 'Space-separated list of header cell IDs that this data cell belongs to, for complex table relationships',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the <td> element',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible name for the table, providing a concise label for screen reader users when a visible caption is not present',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description: 'ID reference to an element that provides additional description of the table\'s content or structure',
    },
    {
      name: 'aria-colcount',
      type: 'number',
      required: false,
      description: 'Total number of columns in the full dataset, useful when the table displays a subset of columns or is virtualized',
    },
    {
      name: 'aria-rowcount',
      type: 'number',
      required: false,
      description: 'Total number of rows in the full dataset, useful when the table displays paginated or virtualized rows',
    },
  ],
  rendersAs: 'table',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'selected',
      prop: 'selected',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied to Table.Row. When true, the row is visually highlighted with a muted background and aria-selected is set to true.',
    },
    {
      name: 'selectable',
      prop: 'selectable',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied to Table.Row. When true, the row becomes interactive with cursor-pointer, keyboard focus ring, and aria-selected attribute.',
    },
    {
      name: 'sortable',
      prop: 'sortable',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied to Table.Header. When true, the header cell shows a sort direction indicator, becomes keyboard-focusable, and supports aria-sort.',
    },
    {
      name: 'empty',
      prop: 'empty',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied to Table.Body. When true, adds aria-live="polite" to announce the empty state to screen readers.',
    },
    {
      name: 'visuallyHidden',
      prop: 'visuallyHidden',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Applied to Table.Caption. When true, hides the caption visually using sr-only classes while keeping it accessible to screen readers.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLTableElement>) => void',
      description: 'Fired when the table element is clicked, typically used with selectable rows',
    },
    {
      name: 'onKeyDown',
      signature: '(event: React.KeyboardEvent<HTMLTableElement>) => void',
      description: 'Fired on key press while the table or a sortable header has focus',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'table',
    attributes: [
      {
        name: 'aria-label',
        description: 'Applied to the root <table> element to provide an accessible name when a visible caption is not used.',
        managedByComponent: false,
      },
      {
        name: 'aria-describedby',
        description: 'Applied to the root <table> element to reference an element that describes the table\'s content.',
        managedByComponent: false,
      },
      {
        name: 'aria-colcount / aria-rowcount',
        description: 'Applied to the root <table> element for virtualized or partial datasets to indicate total column/row counts.',
        managedByComponent: false,
      },
      {
        name: 'scope',
        description: 'Applied to Table.Header (<th>) elements with a default of "col", indicating whether the header applies to a row, column, or group.',
        managedByComponent: true,
      },
      {
        name: 'aria-sort',
        description: 'Applied to sortable Table.Header elements to announce the current sort direction (ascending, descending, none, other) to screen readers.',
        managedByComponent: false,
      },
      {
        name: 'aria-selected',
        description: 'Applied to selectable Table.Row elements to communicate the current selection state to assistive technology.',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description: 'Applied to Table.Body when the empty prop is true, announcing empty state changes to screen readers without interrupting.',
        managedByComponent: true,
      },
      {
        name: 'aria-colindex / aria-rowindex',
        description: 'Applied to Table.Header and Table.Cell elements for accessibility in tables with dynamic, virtualized, or large datasets.',
        managedByComponent: false,
      },
      {
        name: 'headers',
        description: 'Applied to Table.Cell elements to associate data cells with their corresponding header cells by ID for complex table structures.',
        managedByComponent: false,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Activates sort on a focused sortable Table.Header column',
      },
      {
        key: 'Space',
        behavior: 'Activates sort on a focused sortable Table.Header column',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus to the next sortable header or interactive element',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus to the previous sortable header or interactive element',
      },
    ],
    focusManagement:
      'Sortable Table.Header cells receive tabIndex={0} when the sortable prop is true, making them keyboard-focusable. Selectable Table.Row elements receive tabIndex={0} when the selectable prop is true. Both show a focus-visible ring (ring-focus with ring-offset-canvas) on keyboard navigation.',
    wcagLevel: 'AA',
    notes:
      'The Table uses native semantic HTML elements (<table>, <thead>, <tbody>, <tfoot>, <th>, <td>, <tr>, <caption>) for inherent accessibility. Table.Header defaults scope to "col" for proper header-cell association. Sort indicator icons use aria-hidden="true" since the sort state is communicated via aria-sort. The wrapping div provides responsive horizontal scrolling without breaking table semantics.',
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
      slug: 'badge',
      reason: 'Badges are frequently used inside Table.Cell elements to display status indicators like "Paid", "Pending", or "Unpaid"',
    },
    {
      slug: 'button',
      reason: 'Action buttons (View, Edit, Delete) are commonly placed in a table\'s last column for row-level operations',
    },
    {
      slug: 'checkbox',
      reason: 'Checkboxes are used in the first column for multi-row selection alongside the selectable row feature',
    },
    {
      slug: 'skeleton',
      reason: 'Skeleton loaders replace table content while data is being fetched, providing a smooth loading experience',
    },
    {
      slug: 'typography',
      reason: 'Typography components provide consistent heading and text styling for table titles and descriptions',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Default Table',
      description: 'A basic table with caption, header rows, body rows, and a footer row showing totals.',
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
];

export default function DefaultTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List">
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell className="text-right">$1,750.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}`,
      tags: ['default', 'caption', 'footer', 'totals'],
    },
    {
      title: 'Table with Selected Row',
      description: 'A table demonstrating row selection with the selected prop to highlight a specific row.',
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SelectedRowTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Selection">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice, index) => (
          <Table.Row key={invoice.invoice} selected={index === 1}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ['selected', 'highlight', 'selection'],
    },
    {
      title: 'Table with Sortable Columns',
      description: 'A table with sortable column headers using the sortable and aria-sort props to indicate sort direction.',
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SortableTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Sorting">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header sortable aria-sort="ascending">
            Status
          </Table.Header>
          <Table.Header sortable aria-sort="none">
            Method
          </Table.Header>
          <Table.Header className="text-right" sortable aria-sort="none">
            Amount
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ['sortable', 'sort', 'aria-sort', 'columns'],
    },
    {
      title: 'Table with Selectable Rows',
      description: 'A table where each row is interactive using the selectable prop, enabling click and keyboard selection with focus rings.',
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SelectableTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Selection">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice} selectable>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ['selectable', 'interactive', 'focus', 'keyboard'],
    },
    {
      title: 'Table with Actions',
      description: 'A table with action buttons in the last column for row-level operations like View and Edit.',
      code: `import { Table, Button } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function ActionsTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Actions">
      <Table.Head>
        <Table.Row>
          <Table.Header>Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
          <Table.Header>Actions</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
            <Table.Cell>
              <div className="flex gap-2">
                <Button variant="outline" size="small">View</Button>
                <Button variant="ghost" size="small">Edit</Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ['actions', 'buttons', 'operations', 'view', 'edit'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Omitting aria-label or Caption on data tables',
      bad: '<Table><Table.Body>...</Table.Body></Table>',
      good: '<Table aria-label="User accounts"><Table.Caption>List of user accounts</Table.Caption><Table.Body>...</Table.Body></Table>',
      reason: 'Every table must have an accessible name. Without aria-label or a <caption>, screen readers cannot identify the table\'s purpose. WCAG 2.2 requires an accessible name for all data tables.',
    },
    {
      title: 'Using sortable without aria-sort',
      bad: '<Table.Header sortable>Status</Table.Header>',
      good: '<Table.Header sortable aria-sort="ascending">Status</Table.Header>',
      reason: 'The sortable prop adds visual indicators and keyboard focus, but without aria-sort, screen readers cannot determine the current sort direction. Always pair sortable with an aria-sort value to communicate the sort state.',
    },
    {
      title: 'Using div or span instead of Table sub-components',
      bad: '<Table.Body><div className="row"><span className="cell">Data</span></div></Table.Body>',
      good: '<Table.Body><Table.Row><Table.Cell>Data</Table.Cell></Table.Row></Table.Body>',
      reason: 'Non-semantic elements break the table\'s accessibility tree. Screen readers rely on proper <tr> and <td> markup to navigate tables. Always use Table.Row and Table.Cell to maintain semantic structure.',
    },
    {
      title: 'Setting selectable without handling selection logic',
      bad: '<Table.Row selectable>Selectable row</Table.Row>',
      good: '<Table.Row selectable selected={isSelected} onClick={() => onSelect(row.id)}>Selectable row</Table.Row>',
      reason: 'The selectable prop adds visual interactivity (cursor, focus ring, aria-selected) but does not manage selection state. You must pair it with selected and onClick handlers to actually track and display the user\'s selection.',
    },
    {
      title: 'Nesting tables inside Table.Cell',
      bad: '<Table.Cell><Table>...</Table></Table.Cell>',
      good: 'Use a separate section or expandable row pattern to show nested data',
      reason: 'Nesting tables creates confusing accessibility trees and breaks keyboard navigation for screen reader users. Use expandable rows, detail panels, or a separate table below the parent to show hierarchical data.',
    },
  ],
};
