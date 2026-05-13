'use client';

import { useState } from 'react';
import { FolderTree } from 'lucide-react';
import { Badge, Divider, FileUpload, Tree } from 'vayu-ui';
import { collageTreeData } from './constants';

export function DataPanel() {
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(['app', 'landing']);
  const [selectedKey, setSelectedKey] = useState<string | number | null>('Hero.tsx');

  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Data</span>
        </div>
        <Badge variant="muted" size="sm">
          Tree + Upload
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Tree
          data={collageTreeData}
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}
          selectedKey={selectedKey}
          onSelect={(key) => setSelectedKey(key)}
          showIcons
          showLines
          aria-label="Project structure"
        >
          <Tree.Container className="max-h-[180px] overflow-auto p-2">
            <Tree.Nodes nodes={collageTreeData} />
          </Tree.Container>
        </Tree>

        <Divider spacing="sm">
          <Divider.Line />
          <Divider.Label>Upload</Divider.Label>
          <Divider.Line />
        </Divider>

        <FileUpload accept="image/*,.fig,.svg" maxFiles={2} maxSize={5 * 1024 * 1024}>
          <FileUpload.DropZone className="p-3">
            <FileUpload.DropZoneContent />
          </FileUpload.DropZone>
        </FileUpload>
      </div>
    </div>
  );
}
