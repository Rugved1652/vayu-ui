# FileUpload

## Anatomy
- fileupload.tsx — composition (provider + state + logic)
- dropzone.tsx — UI: drag-and-drop zone
- dropzone-content.tsx — UI: default drop zone content
- error-message.tsx — UI: validation error alert
- item.tsx — UI: single file row
- list.tsx — UI: file list wrapper with focus management
- actions.tsx — UI: clear + upload action buttons
- hooks.ts — context + useFileUpload hook
- types.ts — FileWithMeta, FileUploadProps, FileUploadContextValue
- utils.ts — formatFileSize, getFileIcon
- index.ts — public API

## Use Cases
- Drag-and-drop file uploads with visual feedback
- Multi-file selection with type and size validation
- Simulated upload progress with per-file status tracking
