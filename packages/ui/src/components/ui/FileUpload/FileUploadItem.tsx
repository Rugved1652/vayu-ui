// item.tsx
// UI: single file row in the list

import React from 'react';
import { useFileUpload } from './hooks';
import { getFileIcon, formatFileSize } from './utils';
import type { FileWithMeta } from './types';

const Item: React.FC<{ file: FileWithMeta; index: number }> = ({ file, index }) => {
  const { removeFile } = useFileUpload();
  const isUploading = file.status === 'uploading';

  return (
    <li
      className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border"
      style={{
        animation: `slideIn 0.3s ease-out ${index * 0.05}s forwards`,
        opacity: 0,
      }}
    >
      <div className="shrink-0 p-2 rounded-lg bg-brand/10 text-brand">
        {getFileIcon(file.file.name)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-surface-content truncate">{file.file.name}</p>
        <p className="font-mono text-xs text-muted-content">{formatFileSize(file.file.size)}</p>

        {isUploading && (
          <div
            className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(file.progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${file.file.name} upload progress`}
          >
            <div
              className="h-full bg-linear-to-r from-brand to-brand/70 transition-all duration-200"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => removeFile(file.id)}
        disabled={isUploading}
        className="p-2 rounded-lg text-muted-content hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        aria-label={`Remove ${file.file.name}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
};

export default Item;
