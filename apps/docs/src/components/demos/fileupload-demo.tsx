"use client";

import { FileUpload, Divider, Typography } from "vayu-ui";

export default function FileUploadDemo() {
    return (
        <div className="not-prose w-full max-w-xl flex flex-col gap-8">
            {/* Basic Upload */}
            <div className="flex flex-col gap-4">
                <Typography.H6 variant="primary">Basic File Upload</Typography.H6>
                <FileUpload>
                    <FileUpload.DropZone>
                        <FileUpload.DropZoneContent />
                    </FileUpload.DropZone>
                    <FileUpload.ErrorMessage />
                    <FileUpload.List />
                    <FileUpload.Actions />
                </FileUpload>
            </div>

            <Divider spacing="lg" />

            {/* Image Upload */}
            <div className="flex flex-col gap-4">
                <Typography.H6 variant="primary">Image Upload</Typography.H6>
                <FileUpload
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    maxFiles={3}
                    onUpload={(files) => console.log("Uploading:", files)}
                >
                    <FileUpload.DropZone>
                        <FileUpload.DropZoneContent />
                    </FileUpload.DropZone>
                    <FileUpload.ErrorMessage />
                    <FileUpload.List />
                    <FileUpload.Actions />
                </FileUpload>
            </div>

            <Divider spacing="lg" />

            {/* Document Upload */}
            <div className="flex flex-col gap-4">
                <Typography.H6 variant="primary">Document Upload</Typography.H6>
                <FileUpload
                    accept=".pdf,.doc,.docx,.txt"
                    maxSize={10 * 1024 * 1024}
                    maxFiles={5}
                >
                    <FileUpload.DropZone>
                        <FileUpload.DropZoneContent />
                    </FileUpload.DropZone>
                    <FileUpload.ErrorMessage />
                    <FileUpload.List />
                    <FileUpload.Actions />
                </FileUpload>
            </div>
        </div>
    );
}
