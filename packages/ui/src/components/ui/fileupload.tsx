"use client"
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useEffect,
    ChangeEvent,
    DragEvent,
    KeyboardEvent
} from 'react';

// --- Types ---

export interface FileWithMeta {
    id: string;
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    errorMessage?: string;
}

interface FileUploadProps {
    children: React.ReactNode;
    maxSize?: number;
    accept?: string;
    maxFiles?: number;
    onUpload?: (files: FileWithMeta[]) => void;
}

interface FileUploadContextValue {
    files: FileWithMeta[];
    addFiles: (fileList: FileList | File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    uploadFiles: () => void;
    isDragging: boolean;
    setIsDragging: (val: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    dropZoneRef: React.RefObject<HTMLDivElement | null>; // Added for focus management
    openDialog: () => void;
    errorMsg: string | null;
    setErrorMsg: (msg: string | null) => void;
    config: {
        maxSize: number;
        accept: string;
        maxFiles: number;
    };
}

// --- Context ---

const FileUploadContext = createContext<FileUploadContextValue | null>(null);

const useFileUpload = () => {
    const ctx = useContext(FileUploadContext);
    if (!ctx) throw new Error('FileUpload components must be used within <FileUpload>');
    return ctx;
};

// --- Utility Functions ---

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const iconClass = "w-5 h-5";

    if (ext === 'pdf') {
        return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M10 12h4v4h-4z" /></svg>;
    }
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext || '')) {
        return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    }
    return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
};

// --- Main Component ---

const FileUploadComponent: React.FC<FileUploadProps> = ({
    children,
    maxSize = 10 * 1024 * 1024,
    accept = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.csv",
    maxFiles = 5,
    onUpload
}) => {
    const [files, setFiles] = useState<FileWithMeta[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null); // Ref for focus management

    const validateFile = useCallback((file: File): string | null => {
        if (file.size > maxSize) {
            return `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`;
        }
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase());
        const isAccepted = acceptedTypes.some(type => file.type.match(type.replace('.', '')) || ext === type);
        if (!isAccepted && accept !== '*') {
            return `${file.name} is not a supported file type`;
        }
        return null;
    }, [maxSize, accept]);

    const addFiles = useCallback((fileList: FileList | File[]) => {
        const arr = Array.from(fileList);

        if (files.length + arr.length > maxFiles) {
            setErrorMsg(`Maximum ${maxFiles} files allowed`);
            return;
        }

        let hasError = false;
        const newFiles: FileWithMeta[] = [];

        arr.forEach(file => {
            const validationError = validateFile(file);
            if (validationError) {
                setErrorMsg(validationError);
                hasError = true;
                return;
            }

            if (files.some(f => f.file.name === file.name && f.file.size === file.size)) return;

            newFiles.push({
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                file,
                progress: 0,
                status: 'pending'
            });
        });

        if (!hasError && newFiles.length > 0) {
            setFiles(prev => [...prev, ...newFiles]);
            setErrorMsg(null);
        }
    }, [files, maxFiles, validateFile]);

    const removeFile = useCallback((id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
        setErrorMsg(null);
    }, []);

    const uploadFiles = useCallback(() => {
        setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' as const })));

        const interval = setInterval(() => {
            setFiles(prev => {
                const allDone = prev.every(f => f.progress >= 100);
                if (allDone) {
                    clearInterval(interval);
                    const completed = prev.map(f => ({ ...f, status: 'completed' as const }));
                    if (onUpload) onUpload(completed);
                    return completed;
                }

                return prev.map(f => {
                    if (f.progress < 100) {
                        return { ...f, progress: Math.min(100, f.progress + Math.random() * 15) };
                    }
                    return f;
                });
            });
        }, 200);
    }, [onUpload]);

    const openDialog = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const value: FileUploadContextValue = {
        files,
        addFiles,
        removeFile,
        clearFiles,
        uploadFiles,
        isDragging,
        setIsDragging,
        inputRef,
        dropZoneRef, // Expose ref
        openDialog,
        errorMsg,
        setErrorMsg,
        config: { maxSize, accept, maxFiles }
    };

    return (
        <FileUploadContext.Provider value={value}>
            <div className="relative w-full max-w-xl mx-auto" role="region" aria-label="File Upload">
                {children}
            </div>
        </FileUploadContext.Provider>
    );
};

// --- Sub-components ---

const DropZone: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const { addFiles, isDragging, setIsDragging, openDialog, inputRef, dropZoneRef, config, errorMsg } = useFileUpload();

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDialog();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) addFiles(e.target.files);
        e.target.value = '';
    };

    return (
        <div
            ref={dropZoneRef} // Attach ref here
            className={`
        relative rounded-xl p-8 sm:p-12 cursor-pointer
        transition-all duration-300 ease-out
        border-2 border-dashed
        ${errorMsg ? 'border-red-500/50 bg-red-500/5' : isDragging ? 'border-cyan-400 bg-cyan-400/10 scale-[1.01] shadow-[0_0_30px_rgba(0,212,170,0.2)]' : 'border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/5'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
        ${className}
      `}
            role="button"
            tabIndex={0}
            aria-label="Upload files by dropping them here or clicking to browse"
            aria-describedby="upload-instructions"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openDialog}
            onKeyDown={handleKeyDown}
        >
            <input
                ref={inputRef}
                type="file"
                className="sr-only"
                multiple
                accept={config.accept}
                onChange={handleChange}
                aria-label="Select files to upload"
            />

            <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400/10 via-transparent to-cyan-400/10 animate-pulse" />
            </div>

            <div className={`relative z-10 transition-transform duration-300 ${isDragging ? 'scale-105' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const DropZoneContent: React.FC = () => (
    <div className="flex flex-col items-center text-center pointer-events-none">
        <div className="mb-4 p-4 rounded-full bg-cyan-400/10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        </div>
        <p className="text-lg font-semibold text-gray-100 mb-2">Drop files here</p>
        <p id="upload-instructions" className="text-sm text-gray-400 mb-4">
            or <span className="font-medium text-cyan-400 underline underline-offset-2">browse from your device</span>
        </p>
        <p className="font-mono text-xs px-3 py-1.5 rounded-full bg-gray-900 text-gray-500">
            Max 10MB per file
        </p>
    </div>
);

const ErrorMessage: React.FC = () => {
    const { errorMsg } = useFileUpload();
    if (!errorMsg) return null;

    return (
        <div className="flex items-center gap-2 mt-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-sm border border-red-500/20" role="alert" aria-live="polite">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
        </div>
    );
};

const Item: React.FC<{ file: FileWithMeta; index: number }> = ({ file, index }) => {
    const { removeFile } = useFileUpload();
    const isUploading = file.status === 'uploading';

    return (
        <li
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
            style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
        >
            <div className="shrink-0 p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                {getFileIcon(file.file.name)}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-100 truncate">{file.file.name}</p>
                <p className="font-mono text-xs text-gray-500">{formatFileSize(file.file.size)}</p>

                {isUploading && (
                    <div
                        className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={Math.round(file.progress)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${file.file.name} upload progress`}
                    >
                        <div
                            className="h-full bg-linear-to-r from-cyan-500 to-teal-300 transition-all duration-200"
                            style={{ width: `${file.progress}%` }}
                        />
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => removeFile(file.id)}
                disabled={isUploading}
                className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={`Remove ${file.file.name}`}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </li>
    );
};

const List: React.FC = () => {
    const { files, dropZoneRef } = useFileUpload();
    const prevFilesLength = useRef(files.length);

    // WCAG Focus Management: Move focus back to DropZone if list becomes empty
    useEffect(() => {
        if (prevFilesLength.current > 0 && files.length === 0) {
            dropZoneRef.current?.focus();
        }
        prevFilesLength.current = files.length;
    }, [files.length, dropZoneRef]);

    if (files.length === 0) return null;

    return (
        <ul className="mt-4 space-y-2" role="list" aria-label="Selected files">
            {files.map((file, idx) => <Item key={file.id} file={file} index={idx} />)}
        </ul>
    );
};

const Actions: React.FC = () => {
    const { files, clearFiles, uploadFiles } = useFileUpload();
    if (files.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-end gap-3">
            <button
                onClick={clearFiles}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 border border-gray-600 hover:border-gray-400 hover:bg-gray-700/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
                Clear All
            </button>
            <button
                onClick={uploadFiles}
                className="px-6 py-2 rounded-lg text-sm font-semibold bg-cyan-400 text-gray-900 hover:bg-cyan-300 transition-all hover:shadow-[0_4px_20px_rgba(0,212,170,0.3)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
                Upload Files
            </button>
        </div>
    );
};

// --- Export Assignment ---

const FileUpload = Object.assign(FileUploadComponent, {
    DropZone,
    DropZoneContent,
    ErrorMessage,
    List,
    Actions
});

export { FileUpload };