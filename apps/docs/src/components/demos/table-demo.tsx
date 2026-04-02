'use client';

import { Table, Typography, Divider, Button } from 'vayu-ui';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

export default function TableDemo() {
  return (
    <div className="w-full max-w-3xl not-prose">
      <Typography.H3 id="table-demo-label" className="mb-4">
        Table Example
      </Typography.H3>

      {/* Default table */}
      <div className="mb-8">
        <Typography.H5 variant="secondary" className="mb-2">
          Default Table
        </Typography.H5>
        <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List">
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
      </div>

      <Divider spacing="lg" />

      {/* Table with selected row */}
      <div className="mb-8">
        <Typography.H5 variant="secondary" className="mb-2">
          Table with Selected Row
        </Typography.H5>
        <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List with Selection">
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
      </div>

      <Divider spacing="lg" />

      {/* Table with sortable columns */}
      <div className="mb-8">
        <Typography.H5 variant="secondary" className="mb-2">
          Table with Sortable Columns
        </Typography.H5>
        <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List with Sorting">
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
      </div>

      <Divider spacing="lg" />

      {/* Table with selectable rows */}
      <div className="mb-8">
        <Typography.H5 variant="secondary" className="mb-2">
          Table with Selectable Rows
        </Typography.H5>
        <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List with Selection">
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
      </div>

      <Divider spacing="lg" />

      {/* Table with actions */}
      <div>
        <Typography.H5 variant="secondary" className="mb-2">
          Table with Actions
        </Typography.H5>
        <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List with Actions">
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
                    <Button variant="outline" size="small">
                      View
                    </Button>
                    <Button variant="ghost" size="small">
                      Edit
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
