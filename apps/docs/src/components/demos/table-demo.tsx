"use client"

import { Table } from "vayu-ui";

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
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
];

export default function TableDemo() {
    return (
        <div className="w-full max-w-3xl not-prose">
            <h2 id="table-demo-label" className="text-xl font-semibold mb-4">
                Table Example
            </h2>

            {/* Default table */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400 mb-2">Default Table</h3>
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

            {/* Table with selected row */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400 mb-2">Table with Selected Row</h3>
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

            {/* Table with sortable columns */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400 mb-2">Table with Sortable Columns</h3>
                <Table className="max-w-[800px] w-full mx-auto" aria-label="Invoice List with Sorting">
                    <Table.Head>
                        <Table.Row>
                            <Table.Header className="w-[100px]">Invoice</Table.Header>
                            <Table.Header sortable aria-sort="ascending">Status</Table.Header>
                            <Table.Header sortable aria-sort="none">Method</Table.Header>
                            <Table.Header className="text-right" sortable aria-sort="none">Amount</Table.Header>
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

            {/* Table with selectable rows */}
            <div>
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400 mb-2">Table with Selectable Rows</h3>
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
        </div>
    );
}
