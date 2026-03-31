// actions.tsx
// UI: clear + upload action buttons

import React from "react";
import { useFileUpload } from "./hooks";

const Actions: React.FC = () => {
    const { files, clearFiles, uploadFiles } = useFileUpload();
    if (files.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-border flex justify-end gap-3">
            <button
                onClick={clearFiles}
                className="px-4 py-2 rounded-lg text-sm font-medium text-surface-content border border-border hover:border-muted-content hover:bg-muted/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
                Clear All
            </button>
            <button
                onClick={uploadFiles}
                className="px-6 py-2 rounded-lg text-sm font-semibold bg-brand text-brand-content hover:opacity-90 transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
                Upload Files
            </button>
        </div>
    );
};

export default Actions;
