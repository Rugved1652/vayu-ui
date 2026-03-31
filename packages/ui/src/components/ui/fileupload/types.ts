// types.ts
// Types

import React from "react";

export interface FileWithMeta {
    id: string;
    file: File;
    progress: number;
    status: "pending" | "uploading" | "completed" | "error";
    errorMessage?: string;
}

export interface FileUploadProps {
    children: React.ReactNode;
    maxSize?: number;
    accept?: string;
    maxFiles?: number;
    onUpload?: (files: FileWithMeta[]) => void;
}

export interface FileUploadContextValue {
    files: FileWithMeta[];
    addFiles: (fileList: FileList | File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    uploadFiles: () => void;
    isDragging: boolean;
    setIsDragging: (val: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    dropZoneRef: React.RefObject<HTMLDivElement | null>;
    openDialog: () => void;
    errorMsg: string | null;
    setErrorMsg: (msg: string | null) => void;
    config: {
        maxSize: number;
        accept: string;
        maxFiles: number;
    };
}
