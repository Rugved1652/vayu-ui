"use client";

import { clsx } from "clsx";
import {
    AlertCircle,
    Archive,
    CheckCircle,
    File,
    FileCode,
    FileText,
    Image as ImageIcon,
    Music,
    Upload,
    Video,
    X,
} from "lucide-react";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

type FileUploadVariant = "default" | "bordered" | "minimal";
type FileUploadSize = "sm" | "md" | "lg";

interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    progress: number;
    status: "uploading" | "success" | "error";
    error?: string;
}

interface FileUploadProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    minFiles?: number;
    multiple?: boolean;
    disabled?: boolean;
    autoUpload?: boolean;
    onFilesChange?: (files: File[]) => void;
    onUpload?: (files: File[]) => Promise<void>;
    onError?: (error: string) => void;
    onRemove?: (fileId: string) => void;
    variant?: FileUploadVariant;
    size?: FileUploadSize;
    label?: string;
    description?: string;
    uploadText?: string;
    dropText?: string;
    errorText?: string;
    showPreview?: boolean;
    showProgress?: boolean;
    allowRemove?: boolean;
}

// ============================================================================
// Config (hoisted — never recreated)
// ============================================================================

const sizeConfig = {
    sm: {
        container: "p-4",
        text: "text-sm",
        icon: "w-8 h-8",
        preview: "w-16 h-16",
    },
    md: {
        container: "p-6",
        text: "text-base",
        icon: "w-12 h-12",
        preview: "w-20 h-20",
    },
    lg: {
        container: "p-8",
        text: "text-lg",
        icon: "w-16 h-16",
        preview: "w-24 h-24",
    },
} as const;

const variantConfig: Record<FileUploadVariant, string> = {
    default:
        "border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50/50 dark:hover:bg-primary-900/10",
    bordered:
        "border-2 border-dashed border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-900 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20",
    minimal:
        "border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-transparent hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
};

// ============================================================================
// Helpers (pure — hoisted)
// ============================================================================

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${units[i]}`;
}

function getFileIcon(file: File) {
    const t = file.type;
    const cls = "w-full h-full";

    if (t.startsWith("image/")) return <ImageIcon className={cls} aria-hidden="true" />;
    if (t.startsWith("video/")) return <Video className={cls} aria-hidden="true" />;
    if (t.startsWith("audio/")) return <Music className={cls} aria-hidden="true" />;
    if (t.includes("pdf") || t.includes("document"))
        return <FileText className={cls} aria-hidden="true" />;
    if (t.includes("zip") || t.includes("rar") || t.includes("7z"))
        return <Archive className={cls} aria-hidden="true" />;
    if (t.includes("javascript") || t.includes("typescript") || t.includes("json"))
        return <FileCode className={cls} aria-hidden="true" />;
    return <File className={cls} aria-hidden="true" />;
}

function createPreview(file: File): Promise<string | undefined> {
    return new Promise((resolve) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            resolve(undefined);
        }
    });
}

// ============================================================================
// FileUpload
// ============================================================================

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
    (
        {
            accept,
            maxSize = 5 * 1024 * 1024,
            maxFiles = 10,
            minFiles = 0,
            multiple = true,
            disabled = false,
            autoUpload = false,
            onFilesChange,
            onUpload,
            onError,
            onRemove,
            variant = "default",
            size = "md",
            className,
            label,
            description,
            uploadText = "Click to upload or drag and drop",
            dropText = "Drop files here",
            errorText,
            showPreview = true,
            showProgress = true,
            allowRemove = true,
            ...props
        },
        ref
    ) => {
        const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
        const [isDragging, setIsDragging] = useState(false);
        const [error, setError] = useState("");
        const fileInputRef = useRef<HTMLInputElement>(null);
        const dragCounterRef = useRef(0);

        const inputId = useId();
        const labelId = useId();
        const errorId = useId();

        const sc = sizeConfig[size];

        // ------------------------------------------------------------------
        // Validate
        // ------------------------------------------------------------------
        const validateFile = useCallback(
            (file: File, currentCount: number): string | null => {
                if (file.size > maxSize)
                    return `File size exceeds ${formatFileSize(maxSize)}`;

                if (accept) {
                    const accepted = accept.split(",").map((t) => t.trim());
                    const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
                    const ok = accepted.some((a) => {
                        if (a.startsWith(".")) return ext === a.toLowerCase();
                        if (a.endsWith("/*"))
                            return file.type.startsWith(a.replace("/*", ""));
                        return file.type === a;
                    });
                    if (!ok)
                        return `File type not accepted. Accepted: ${accept}`;
                }

                if (currentCount >= maxFiles)
                    return `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`;

                return null;
            },
            [maxSize, accept, maxFiles]
        );

        // ------------------------------------------------------------------
        // Simulate progress
        // ------------------------------------------------------------------
        const simulateUpload = useCallback(
            (fileId: string): Promise<void> =>
                new Promise((resolve) => {
                    let progress = 0;
                    const iv = setInterval(() => {
                        progress += 10;
                        setUploadedFiles((prev) =>
                            prev.map((f) =>
                                f.id === fileId
                                    ? { ...f, progress: Math.min(progress, 100) }
                                    : f
                            )
                        );
                        if (progress >= 100) {
                            clearInterval(iv);
                            setUploadedFiles((prev) =>
                                prev.map((f) =>
                                    f.id === fileId
                                        ? { ...f, status: "success" as const }
                                        : f
                                )
                            );
                            resolve();
                        }
                    }, 200);
                }),
            []
        );

        // ------------------------------------------------------------------
        // Handle incoming files
        // ------------------------------------------------------------------
        const handleFiles = useCallback(
            async (files: FileList | null) => {
                if (!files?.length) return;
                setError("");

                const arr = Array.from(files);

                // Validate
                for (const file of arr) {
                    const msg = validateFile(file, uploadedFiles.length);
                    if (msg) {
                        setError(msg);
                        onError?.(msg);
                        return;
                    }
                }

                if (arr.length < minFiles) {
                    const msg = `Minimum ${minFiles} file${minFiles > 1 ? "s" : ""} required`;
                    setError(msg);
                    onError?.(msg);
                    return;
                }

                const newFiles: UploadedFile[] = await Promise.all(
                    arr.map(async (file) => ({
                        id: Math.random().toString(36).substring(2, 11),
                        file,
                        preview: await createPreview(file),
                        progress: 0,
                        status: "uploading" as const,
                    }))
                );

                setUploadedFiles((prev) => [...prev, ...newFiles]);
                onFilesChange?.(arr);

                if (autoUpload && onUpload) {
                    try {
                        await Promise.all(
                            newFiles.map((f) => simulateUpload(f.id))
                        );
                        await onUpload(arr);
                    } catch (err) {
                        const msg =
                            err instanceof Error
                                ? err.message
                                : "Upload failed";
                        setError(msg);
                        onError?.(msg);
                        setUploadedFiles((prev) =>
                            prev.map((f) =>
                                newFiles.find((nf) => nf.id === f.id)
                                    ? {
                                        ...f,
                                        status: "error" as const,
                                        error: msg,
                                    }
                                    : f
                            )
                        );
                    }
                }
            },
            [
                validateFile,
                uploadedFiles.length,
                minFiles,
                autoUpload,
                onUpload,
                onFilesChange,
                onError,
                simulateUpload,
            ]
        );

        // ------------------------------------------------------------------
        // Event handlers
        // ------------------------------------------------------------------
        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                handleFiles(e.target.files);
                e.target.value = "";
            },
            [handleFiles]
        );

        const handleClick = useCallback(() => {
            if (!disabled) fileInputRef.current?.click();
        }, [disabled]);

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            },
            [handleClick]
        );

        const handleDragEnter = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();
                dragCounterRef.current++;
                if (e.dataTransfer.items?.length) setIsDragging(true);
            },
            []
        );

        const handleDragLeave = useCallback((e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounterRef.current--;
            if (dragCounterRef.current === 0) setIsDragging(false);
        }, []);

        const handleDragOver = useCallback((e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        }, []);

        const handleDrop = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                dragCounterRef.current = 0;
                if (!disabled) handleFiles(e.dataTransfer.files);
            },
            [disabled, handleFiles]
        );

        const handleRemove = useCallback(
            (fileId: string) => {
                setUploadedFiles((prev) =>
                    prev.filter((f) => f.id !== fileId)
                );
                onRemove?.(fileId);
            },
            [onRemove]
        );

        // ------------------------------------------------------------------
        // Derived
        // ------------------------------------------------------------------
        const hasError = Boolean(error || errorText);

        const constraintText = useMemo(() => {
            const parts: string[] = [];
            if (accept) parts.push(`Accepted: ${accept}`);
            if (maxSize) parts.push(`Max size: ${formatFileSize(maxSize)}`);
            if (maxFiles) parts.push(`Max files: ${maxFiles}`);
            return parts.join(" • ");
        }, [accept, maxSize, maxFiles]);

        return (
            <div ref={ref} className={clsx("w-full", className)} {...props}>
                {/* Label & description */}
                {(label || description) && (
                    <div className="mb-3">
                        {label && (
                            <label
                                id={labelId}
                                htmlFor={inputId}
                                className="block font-primary text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1"
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Drop zone */}
                <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    aria-label={label ? undefined : uploadText}
                    aria-labelledby={label ? labelId : undefined}
                    aria-describedby={hasError ? errorId : undefined}
                    aria-disabled={disabled || undefined}
                    className={clsx(
                        sc.container,
                        variantConfig[variant],
                        "rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500",
                        disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer",
                        isDragging &&
                        "border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/30 scale-[1.02]"
                    )}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <div
                            className={clsx(
                                sc.icon,
                                "text-neutral-400 dark:text-neutral-500 mb-3"
                            )}
                        >
                            <Upload
                                className="w-full h-full"
                                aria-hidden="true"
                            />
                        </div>

                        <p
                            className={clsx(
                                sc.text,
                                "font-secondary font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                            )}
                        >
                            {isDragging ? dropText : uploadText}
                        </p>

                        {constraintText && (
                            <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                                {constraintText}
                            </p>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        id={inputId}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        disabled={disabled}
                        onChange={handleInputChange}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                    />
                </div>

                {/* Error */}
                {hasError && (
                    <div
                        id={errorId}
                        role="alert"
                        className="mt-2 flex items-center gap-2 text-xs font-secondary text-error-500 dark:text-error-400"
                    >
                        <AlertCircle
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                        />
                        <span>{error || errorText}</span>
                    </div>
                )}

                {/* File list */}
                {uploadedFiles.length > 0 && (
                    <ul
                        className="mt-4 space-y-2"
                        aria-label="Uploaded files"
                    >
                        {uploadedFiles.map((uf) => (
                            <li
                                key={uf.id}
                                className={clsx(
                                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200",
                                    uf.status === "error"
                                        ? "border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/20"
                                        : uf.status === "success"
                                            ? "border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20"
                                            : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                                )}
                            >
                                {/* Preview / icon */}
                                {showPreview && (
                                    <div
                                        className={clsx(
                                            sc.preview,
                                            "shrink-0 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
                                        )}
                                    >
                                        {uf.preview ? (
                                            <img
                                                src={uf.preview}
                                                alt={uf.file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-neutral-400 dark:text-neutral-500 p-3">
                                                {getFileIcon(uf.file)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-secondary font-medium text-neutral-900 dark:text-white truncate">
                                        {uf.file.name}
                                    </p>
                                    <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                                        {formatFileSize(uf.file.size)}
                                    </p>

                                    {/* Progress */}
                                    {showProgress &&
                                        uf.status === "uploading" && (
                                            <div
                                                className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden"
                                                role="progressbar"
                                                aria-valuenow={uf.progress}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`Uploading ${uf.file.name}`}
                                            >
                                                <div
                                                    className="bg-primary-600 h-full transition-all duration-300 ease-out"
                                                    style={{
                                                        width: `${uf.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        )}

                                    {/* Per-file error */}
                                    {uf.status === "error" && uf.error && (
                                        <p className="text-xs font-secondary text-error-600 dark:text-error-400 mt-1">
                                            {uf.error}
                                        </p>
                                    )}
                                </div>

                                {/* Status icon */}
                                <div className="shrink-0">
                                    {uf.status === "success" && (
                                        <CheckCircle
                                            className="w-5 h-5 text-success-600 dark:text-success-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {uf.status === "error" && (
                                        <AlertCircle
                                            className="w-5 h-5 text-error-600 dark:text-error-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {uf.status === "uploading" && (
                                        <div
                                            className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"
                                            role="status"
                                            aria-label={`Uploading ${uf.file.name}`}
                                        />
                                    )}
                                </div>

                                {/* Remove */}
                                {allowRemove && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemove(uf.id)
                                        }
                                        className="shrink-0 p-1 text-neutral-400 hover:text-error-600 dark:hover:text-error-400 rounded transition-colors"
                                        aria-label={`Remove ${uf.file.name}`}
                                    >
                                        <X
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Count */}
                {uploadedFiles.length > 0 && (
                    <p
                        className="mt-2 text-xs font-secondary text-neutral-500 dark:text-neutral-400"
                        aria-live="polite"
                    >
                        {uploadedFiles.length} of {maxFiles} file
                        {maxFiles !== 1 ? "s" : ""}
                    </p>
                )}
            </div>
        );
    }
);

FileUpload.displayName = "FileUpload";

// ============================================================================
// Exports
// ============================================================================

export { FileUpload };
export type {
    FileUploadProps,
    FileUploadSize,
    FileUploadVariant,
    UploadedFile,
};
