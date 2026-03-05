"use client";

import { FileUpload } from "vayu-ui";

export default function FileUploadDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
            {/* Default — images only */}
            <FileUpload
                label="Upload images"
                description="PNG, JPG, or GIF • max 2 MB per file"
                accept="image/*"
                maxSize={2 * 1024 * 1024}
                maxFiles={5}
                autoUpload
                onUpload={async () => {
                    await new Promise((r) => setTimeout(r, 500));
                }}
            />

            {/* Bordered — documents */}
            <FileUpload
                label="Attach documents"
                description="PDF, DOCX, or TXT"
                accept=".pdf,.docx,.txt"
                variant="bordered"
                maxFiles={3}
                showPreview
            />

            {/* Minimal — single file */}
            <FileUpload
                label="Resume"
                description="Single PDF, max 5 MB"
                accept=".pdf"
                variant="minimal"
                size="sm"
                multiple={false}
                maxFiles={1}
            />
        </div>
    );
}
