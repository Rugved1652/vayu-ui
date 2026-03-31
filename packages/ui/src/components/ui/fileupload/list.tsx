// list.tsx
// UI: file list wrapper with focus management

"use client";

import React, { useRef, useEffect } from "react";
import { useFileUpload } from "./hooks";
import Item from "./item";

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
            {files.map((file, idx) => (
                <Item key={file.id} file={file} index={idx} />
            ))}
        </ul>
    );
};

export default List;
