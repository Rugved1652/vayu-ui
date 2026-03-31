// error-message.tsx
// UI: validation error alert

import React from "react";
import { useFileUpload } from "./hooks";

const ErrorMessage: React.FC = () => {
    const { errorMsg } = useFileUpload();
    if (!errorMsg) return null;

    return (
        <div
            className="flex items-center gap-2 mt-4 px-4 py-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20"
            role="alert"
            aria-live="polite"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
        </div>
    );
};

export default ErrorMessage;
