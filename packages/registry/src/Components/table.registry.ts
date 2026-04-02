export const tableRegistry = {
  component: 'Table',
  slug: 'table',
  category: 'data-display',

  complexity: 'compound' as const,

  description: 'A responsive table component with sorting, filtering, and pagination support.',
  ai_summary:
    'Compound table component for displaying tabular data with WCAG 2.2 AA accessibility compliance, sortable columns, selectable rows, and dark mode support.',

  intent: [
    'Display structured tabular data',
    'Present sortable data collections',
    'Show selectable row lists',
    'Render responsive data tables with horizontal scrolling',
  ],

  ai_keywords: [
    'table',
    'data',
    'grid',
    'sortable',
    'selectable',
    'tabular',
    'rows',
    'columns',
    'responsive',
  ],

  when_to_use: [
    'Displaying structured data in rows and columns',
    'Showing sortable data sets with column headers',
    'Presenting lists with selectable items',
    'Rendering financial or invoice data',
    'Displaying data that needs caption or description',
  ],

  when_not_to_use: [
    'Simple key-value pairs (use DescriptionList instead)',
    'Layout purposes (use Grid or Stack instead)',
    'Card-based content display (use Card instead)',
    'Single column lists (use List instead)',
  ],

  composition: {
    root: 'Table',
    slots: [
      'Table.Caption',
      'Table.Head',
      'Table.Body',
      'Table.Footer',
      'Table.Row',
      'Table.Header',
      'Table.Cell',
    ],
    structure: [
      'Table',
      'Table.Caption',
      'Table.Head',
      'Table.Body',
      'Table.Footer',
      'Table.Row',
      'Table.Header',
      'Table.Cell',
    ],
    rules: [
      'Table.Caption must be a direct child of Table',
      'Table.Head contains Table.Row which contains Table.Header',
      'Table.Body contains Table.Row which contains Table.Cell',
      'Table.Footer contains Table.Row which contains Table.Cell',
      'Table.Header is used within Table.Head rows',
      'Table.Cell is used within Table.Body and Table.Footer rows',
    ],
  },

  props: {
    Table: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the table',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'aria-label',
        type: 'string',
        required: false,
        description: 'Accessible description for screen readers',
      },
      {
        name: 'aria-describedby',
        type: 'string',
        required: false,
        description: 'Reference to element that describes the table',
      },
      {
        name: 'aria-colcount',
        type: 'number',
        required: false,
        description: 'Total number of columns (for large tables)',
      },
      {
        name: 'aria-rowcount',
        type: 'number',
        required: false,
        description: 'Total number of rows (for large tables)',
      },
    ],
    'Table.Caption': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the caption',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'visuallyHidden',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Visually hides the caption while keeping it accessible to screen readers',
      },
    ],
    'Table.Head': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the header section',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Table.Body': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the body section',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'empty',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether this body contains empty data',
      },
    ],
    'Table.Footer': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the footer section',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    'Table.Row': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The cells of the row',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'aria-rowindex',
        type: 'number',
        required: false,
        description: 'Row index for accessibility',
      },
      {
        name: 'selected',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether row is selected',
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether row can be selected',
      },
    ],
    'Table.Header': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the header cell',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'scope',
        type: '"row" | "col" | "rowgroup" | "colgroup"',
        default: 'col',
        required: false,
        description: 'Column scope',
      },
      {
        name: 'aria-colindex',
        type: 'number',
        required: false,
        description: 'Column index for accessibility',
      },
      {
        name: 'aria-sort',
        type: '"ascending" | "descending" | "none" | "other"',
        required: false,
        description: 'Sorting state',
      },
      {
        name: 'sortable',
        type: 'boolean',
        default: false,
        required: false,
        description: 'Whether column is sortable',
      },
    ],
    'Table.Cell': [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content of the cell',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      {
        name: 'aria-colindex',
        type: 'number',
        required: false,
        description: 'Column index for accessibility',
      },
      {
        name: 'aria-rowindex',
        type: 'number',
        required: false,
        description: 'Row index for accessibility',
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: 'ID of header cells that describe this cell',
      },
      {
        name: 'rowSpan',
        type: 'number',
        required: false,
        description: 'Number of rows this cell spans',
      },
      {
        name: 'colSpan',
        type: 'number',
        required: false,
        description: 'Number of columns this cell spans',
      },
    ],
  },

  variants: [],

  states: [
    'default',
    'hovered',
    'selected',
    'focused',
    'sorted-ascending',
    'sorted-descending',
    'unsorted',
  ],

  responsive: {
    allowed: true,
    patterns: [
      'Horizontal scrolling on mobile via overflow-x-auto wrapper',
      'Responsive container with w-full',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-300',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
        'primary-500',
        'primary-600',
      ],
      border: ['border', 'border-b-2', 'border-t-2', 'border-collapse'],
      spacing: ['px-4', 'py-3', 'ml-2'],
      typography: [
        'text-sm',
        'text-left',
        'font-primary',
        'font-secondary',
        'font-semibold',
        'whitespace-nowrap',
      ],
      radius: ['rounded'],
    },
    recommended: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
      ],
      typography: ['text-sm', 'font-primary', 'font-semibold'],
    },
    allowed: {
      colors: [
        'ground-50',
        'ground-100',
        'ground-200',
        'ground-300',
        'ground-700',
        'ground-800',
        'ground-900',
        'ground-950',
        'primary-500',
        'primary-600',
      ],
      border: ['border', 'border-b-2', 'border-t-2', 'border-collapse'],
      spacing: ['px-4', 'py-3', 'ml-2'],
      typography: [
        'text-sm',
        'text-left',
        'font-primary',
        'font-secondary',
        'font-semibold',
        'whitespace-nowrap',
      ],
      radius: ['rounded'],
    },
  },

  examples: [
    {
      name: 'Basic Table',
      description: 'A simple table displaying invoice data with header, body, and footer',
      code: `import { Table } from "vayu-ui";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

export default function TableDemo() {
  return (
    <Table aria-label="Invoice List">
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
          <Table.Cell className="text-right">$750.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}`,
    },
  ],

  accessibility: {
    pattern: 'WCAG 2.2 AA Compliant Table',
    standards: ['WCAG 2.2 AA', 'Semantic HTML table structure', 'Screen reader compatible'],
    keyboard_support: [
      'Tab to focus on sortable headers',
      'Tab to focus on selectable rows',
      'Enter/Space to activate sortable headers',
      'Arrow keys for navigation (when implemented)',
    ],
    aria_attributes: [
      'aria-label on Table for accessible name',
      'aria-describedby for table description reference',
      'aria-colcount for total column count in large tables',
      'aria-rowcount for total row count in large tables',
      'aria-rowindex on Table.Row for row position',
      'aria-selected on selectable rows',
      'aria-colindex on Table.Header and Table.Cell for column position',
      'aria-sort on Table.Header for sorting state',
      'aria-live on Table.Body when empty',
      'scope attribute on Table.Header for header cell association',
      'headers attribute on Table.Cell for complex table associations',
    ],
  },

  anti_patterns: [
    'Using Table for layout purposes',
    'Skipping Table.Caption for accessibility',
    'Not providing aria-label when caption is visually hidden',
    'Using Table.Header in Table.Body rows (use Table.Cell instead)',
    'Using Table.Cell in Table.Head rows (use Table.Header instead)',
    'Not setting scope on Table.Header cells',
    'Ignoring aria-sort when implementing sortable columns',
  ],

  dependencies: {
    icons: [],
    utilities: ['cn'],
    components: [],
  },

  relationships: {
    used_with: [],
    often_inside: ['Card', 'Dialog', 'Drawer'],
    often_contains: ['Badge', 'Button', 'Checkbox', 'Dropdown'],
  },

  related_components: [],

  validation_rules: [
    'Table.Caption must be a direct child of Table',
    'Table.Head must contain Table.Row elements',
    'Table.Body must contain Table.Row elements',
    'Table.Footer must contain Table.Row elements',
    'Table.Row in Table.Head must contain Table.Header elements',
    'Table.Row in Table.Body must contain Table.Cell elements',
    'Table.Row in Table.Footer must contain Table.Cell elements',
    'Table.Header with sortable=true should have aria-sort attribute',
    'Table.Row with selectable=true should have aria-selected attribute',
    'Table must have aria-label or Table.Caption for accessibility',
  ],

  installation: [
    "Import Table from 'vayu-ui'",
    'Use compound pattern: Table.Caption, Table.Head, Table.Body, etc.',
  ],

  source: {
    file: 'packages/ui/src/components/ui/table.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/table',
    source_file: 'packages/ui/src/components/ui/table.tsx',
    extracted: [
      'component',
      'slug',
      'description',
      'props',
      'composition',
      'accessibility',
      'design_tokens',
      'examples',
    ],
    inferred: [
      'category',
      'complexity',
      'ai_summary',
      'intent',
      'ai_keywords',
      'when_to_use',
      'when_not_to_use',
      'states',
      'responsive',
      'anti_patterns',
      'dependencies',
      'relationships',
      'validation_rules',
    ],
  },
};
