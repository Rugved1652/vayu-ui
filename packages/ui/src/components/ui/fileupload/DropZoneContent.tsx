// dropzone-content.tsx
// UI: default drop zone content (icon + text)

import React from "react";

const DropZoneContent: React.FC = () => (
    <div className="flex flex-col items-center text-center pointer-events-none">
        <div className="mb-4 p-4 rounded-full bg-brand/10">
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        </div>
        <p className="text-lg font-semibold text-surface-content mb-2">Drop files here</p>
        <p id="upload-instructions" className="text-sm text-muted-content mb-4">
            or{" "}
            <span className="font-medium text-brand underline underline-offset-2">
                browse from your device
            </span>
        </p>
        <p className="font-mono text-xs px-3 py-1.5 rounded-full bg-muted text-muted-content">
            Max 10MB per file
        </p>
    </div>
);

export default DropZoneContent;
