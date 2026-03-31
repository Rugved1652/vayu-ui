// hooks.ts
// Context + hook

import React, { createContext, useContext } from "react";
import type { FileUploadContextValue } from "./types";

export const FileUploadContext = createContext<FileUploadContextValue | null>(null);

export const useFileUpload = () => {
    const ctx = useContext(FileUploadContext);
    if (!ctx) throw new Error("FileUpload components must be used within <FileUpload>");
    return ctx;
};
