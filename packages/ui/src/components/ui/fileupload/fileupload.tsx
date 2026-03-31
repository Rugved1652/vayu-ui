// fileupload.tsx
// Composition: provider + state + logic

"use client";

import React, { useState, useRef, useCallback } from "react";
import { FileUploadContext } from "./hooks";
import { formatFileSize } from "./utils";
import type { FileUploadProps, FileWithMeta } from "./types";

const FileUploadComponent: React.FC<FileUploadProps> = ({
    children,
    maxSize = 10 * 1024 * 1024,
    accept = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.csv",
    maxFiles = 5,
    onUpload,
}) => {
    const [files, setFiles] = useState<FileWithMeta[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const validateFile = useCallback(
        (file: File): string | null => {
            if (file.size > maxSize) {
                return `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`;
            }
            const ext = "." + file.name.split(".").pop()?.toLowerCase();
            const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
            const isAccepted = acceptedTypes.some(
                (type) => file.type.match(type.replace(".", "")) || ext === type
            );
            if (!isAccepted && accept !== "*") {
                return `${file.name} is not a supported file type`;
            }
            return null;
        },
        [maxSize, accept]
    );

    const addFiles = useCallback(
        (fileList: FileList | File[]) => {
            const arr = Array.from(fileList);

            if (files.length + arr.length > maxFiles) {
                setErrorMsg(`Maximum ${maxFiles} files allowed`);
                return;
            }

            let hasError = false;
            const newFiles: FileWithMeta[] = [];

            arr.forEach((file) => {
                const validationError = validateFile(file);
                if (validationError) {
                    setErrorMsg(validationError);
                    hasError = true;
                    return;
                }

                if (files.some((f) => f.file.name === file.name && f.file.size === file.size))
                    return;

                newFiles.push({
                    id: `${file.name}-${Date.now()}-${Math.random()}`,
                    file,
                    progress: 0,
                    status: "pending",
                });
            });

            if (!hasError && newFiles.length > 0) {
                setFiles((prev) => [...prev, ...newFiles]);
                setErrorMsg(null);
            }
        },
        [files, maxFiles, validateFile]
    );

    const removeFile = useCallback((id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
        setErrorMsg(null);
    }, []);

    const uploadFiles = useCallback(() => {
        setFiles((prev) =>
            prev.map((f) => ({ ...f, status: "uploading" as const }))
        );

        const interval = setInterval(() => {
            setFiles((prev) => {
                const allDone = prev.every((f) => f.progress >= 100);
                if (allDone) {
                    clearInterval(interval);
                    const completed = prev.map((f) => ({
                        ...f,
                        status: "completed" as const,
                    }));
                    if (onUpload) onUpload(completed);
                    return completed;
                }

                return prev.map((f) => {
                    if (f.progress < 100) {
                        return {
                            ...f,
                            progress: Math.min(100, f.progress + Math.random() * 15),
                        };
                    }
                    return f;
                });
            });
        }, 200);
    }, [onUpload]);

    const openDialog = useCallback(() => {
        inputRef.current?.click();
    }, []);

    return (
        <FileUploadContext.Provider
            value={{
                files,
                addFiles,
                removeFile,
                clearFiles,
                uploadFiles,
                isDragging,
                setIsDragging,
                inputRef,
                dropZoneRef,
                openDialog,
                errorMsg,
                setErrorMsg,
                config: { maxSize, accept, maxFiles },
            }}
        >
            <div
                className="relative w-full max-w-xl mx-auto"
                role="region"
                aria-label="File Upload"
            >
                {children}
            </div>
        </FileUploadContext.Provider>
    );
};

export default FileUploadComponent;
