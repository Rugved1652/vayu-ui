'use client';

import { Database } from 'lucide-react';
import { Badge, Table } from 'vayu-ui';

export function TablePanel() {
  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Data Table</span>
        </div>
        <Badge variant="brand" size="sm">
          Grid
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="border border-border rounded-surface overflow-hidden bg-canvas">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Header>Status</Table.Header>
                <Table.Header>Project</Table.Header>
                <Table.Header className="text-right">Users</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="success" size="sm">
                    Active
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">Vayu UI</Table.Cell>
                <Table.Cell className="text-right text-muted-content">1.2k</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="warning" size="sm">
                    Beta
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">Docs</Table.Cell>
                <Table.Cell className="text-right text-muted-content">340</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="muted" size="sm">
                    Archived
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">V1</Table.Cell>
                <Table.Cell className="text-right text-muted-content">89</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="success" size="sm">
                    Active
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">Studio</Table.Cell>
                <Table.Cell className="text-right text-muted-content">4.5k</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="destructive" size="sm">
                    Error
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">API Gateway</Table.Cell>
                <Table.Cell className="text-right text-muted-content">12</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Badge variant="success" size="sm">
                    Active
                  </Badge>
                </Table.Cell>
                <Table.Cell className="font-medium text-surface-content">Analytics</Table.Cell>
                <Table.Cell className="text-right text-muted-content">850</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
