import { ComponentRegistryEntry } from '../types.js';

export const fileUploadEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'file-upload',
  name: 'FileUpload',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A compound file upload component providing drag-and-drop zone, file list with progress, validation errors, and action buttons with WCAG 2.2 AA accessibility.',
  longDescription:
    'The FileUpload component uses the compound component pattern (FileUpload, FileUpload.DropZone, FileUpload.DropZoneContent, FileUpload.ErrorMessage, FileUpload.List, FileUpload.Actions) to provide a complete file upload experience. The root FileUpload manages state via React Context — tracking files with metadata (id, progress, status), validation errors, and drag state. DropZone handles drag-and-drop events, keyboard activation, and hidden file input. DropZoneContent renders default upload instructions with icon. List renders selected files with per-item progress bars, file type icons, and remove buttons. ErrorMessage displays validation alerts with aria-live="polite". Actions provides Clear All and Upload Files buttons. The component validates file size, type, and count, supports keyboard navigation (Enter/Space to open dialog), manages focus back to DropZone when the file list empties, and uses ARIA roles throughout (region, button, alert, progressbar, list).',
  tags: [
    'file-upload',
    'upload',
    'drag-and-drop',
    'dropzone',
    'file-input',
    'progress',
    'validation',
    'input',
    'form',
    'a11y',
  ],
  useCases: [
    'Uploading documents (PDF, DOC, TXT) with size and type validation',
    'Uploading images with format restrictions and file count limits',
    'Drag-and-drop file selection with visual feedback during hover',
    'Multi-file upload with per-file progress bars and status tracking',
    'File upload forms with validation error messages for oversized or unsupported files',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'FileUpload',
  files: [
    { name: 'FileUpload.tsx', description: 'Root provider component managing file state, validation, upload simulation, and context distribution' },
    { name: 'DropZone.tsx', description: 'Drag-and-drop zone with keyboard activation, hidden file input, and visual drag feedback' },
    { name: 'DropZoneContent.tsx', description: 'Default drop zone content with upload icon, instructions, and file size hint' },
    { name: 'FileUploadList.tsx', description: 'File list wrapper with focus management back to DropZone when list empties' },
    { name: 'FileUploadItem.tsx', description: 'Individual file row with icon, name, size, progress bar, and remove button' },
    { name: 'FileUploadActions.tsx', description: 'Clear All and Upload Files action buttons shown when files are present' },
    { name: 'FileUploadErrorMessage.tsx', description: 'Validation error alert with icon and aria-live="polite" announcement' },
    { name: 'hooks.ts', description: 'React Context and useFileUpload hook for accessing upload state from sub-components' },
    { name: 'utils.tsx', description: 'formatFileSize helper and getFileIcon utility returning SVG icons by file extension' },
    { name: 'types.ts', description: 'TypeScript interfaces for FileWithMeta, FileUploadProps, and FileUploadContextValue' },
    { name: 'index.ts', description: 'Barrel export assembling the compound FileUpload namespace and re-exporting FileWithMeta type' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'FileUpload',
  subComponents: [
    {
      name: 'DropZone',
      fileName: 'DropZone.tsx',
      description: 'Drag-and-drop zone with role="button", keyboard activation (Enter/Space), hidden file input, and visual drag-over feedback',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Content rendered inside the drop zone, typically DropZoneContent',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          defaultValue: "''",
          description: 'Additional CSS classes applied to the drop zone container',
        },
      ],
    },
    {
      name: 'DropZoneContent',
      fileName: 'DropZoneContent.tsx',
      description: 'Default drop zone content with upload SVG icon, "Drop files here" heading, browse instructions, and max size hint',
      props: [],
    },
    {
      name: 'ErrorMessage',
      fileName: 'FileUploadErrorMessage.tsx',
      description: 'Validation error alert rendered as role="alert" with aria-live="polite", displays file size, type, and count errors',
      props: [],
    },
    {
      name: 'List',
      fileName: 'FileUploadList.tsx',
      description: 'File list rendered as <ul role="list"> with per-item progress bars; auto-focuses DropZone when list empties',
      props: [],
    },
    {
      name: 'Actions',
      fileName: 'FileUploadActions.tsx',
      description: 'Clear All and Upload Files action buttons shown only when files are present',
      props: [],
    },
  ],
  hooks: ['useFileUpload'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Compound sub-components composing the upload UI (DropZone, ErrorMessage, List, Actions)',
    },
    {
      name: 'maxSize',
      type: 'number',
      required: false,
      defaultValue: '10485760',
      description: 'Maximum file size in bytes (default 10MB); files exceeding this are rejected with an error message',
    },
    {
      name: 'accept',
      type: 'string',
      required: false,
      defaultValue: "'.pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.csv'",
      description: 'Comma-separated list of accepted file extensions passed to the hidden file input and used for validation',
    },
    {
      name: 'maxFiles',
      type: 'number',
      required: false,
      defaultValue: '5',
      description: 'Maximum number of files allowed; attempts to exceed this trigger a validation error',
    },
    {
      name: 'onUpload',
      type: '(files: FileWithMeta[]) => void',
      required: false,
      description: 'Callback fired when the simulated upload completes for all files, receiving the full file list with completed status',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'dragging',
      prop: 'isDragging',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Indicates a file is being dragged over the drop zone; triggers visual feedback (brand border, scale, pulse animation)',
    },
    {
      name: 'uploading',
      prop: 'file.status',
      values: ['pending', 'uploading', 'completed', 'error'],
      isBoolean: false,
      defaultValue: "'pending'",
      description: 'Per-file upload status tracked in FileWithMeta; uploading shows a progress bar, completed stops animation',
    },
    {
      name: 'error',
      prop: 'errorMsg',
      isBoolean: false,
      defaultValue: 'null',
      description: 'Current validation error message; displayed by ErrorMessage component with role="alert" when non-null',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onUpload',
      signature: '(files: FileWithMeta[]) => void',
      description: 'Fired when all file uploads complete; receives the full array of files with status "completed"',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'region',
    attributes: [
      {
        name: 'aria-label',
        description: 'Root container has aria-label="File Upload"; DropZone has aria-label="Upload files by dropping them here or clicking to browse"; hidden input has aria-label="Select files to upload"; progress bars have aria-label="${filename} upload progress"; remove buttons have aria-label="Remove ${filename}"',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'DropZone links to id="upload-instructions" in DropZoneContent for screen reader instructions',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite"',
        description: 'ErrorMessage component uses aria-live="polite" to announce validation errors to screen readers without interrupting',
        managedByComponent: true,
      },
      {
        name: 'aria-valuenow',
        description: 'Progress bar on each uploading file uses aria-valuenow, aria-valuemin="0", and aria-valuemax="100" for progress announcements',
        managedByComponent: true,
      },
      {
        name: 'role="button"',
        description: 'DropZone has role="button" and tabIndex={0} for keyboard-accessible file selection',
        managedByComponent: true,
      },
      {
        name: 'role="alert"',
        description: 'ErrorMessage container uses role="alert" to ensure validation errors are announced by screen readers',
        managedByComponent: true,
      },
      {
        name: 'role="progressbar"',
        description: 'Each uploading file\'s progress bar uses role="progressbar" with aria-valuenow/min/max for assistive technology',
        managedByComponent: true,
      },
      {
        name: 'role="list"',
        description: 'File list uses role="list" with aria-label="Selected files" for structured file enumeration',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'Opens the native file picker dialog when DropZone is focused',
      },
      {
        key: 'Space',
        behavior: 'Opens the native file picker dialog when DropZone is focused',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus between DropZone, file list items, remove buttons, and action buttons',
      },
    ],
    focusManagement:
      'When the file list becomes empty (all files removed or cleared), focus automatically returns to the DropZone element via dropZoneRef.current?.focus(). Remove buttons are disabled during upload to prevent accidental removal.',
    wcagLevel: 'AA',
    notes:
      'The root container uses role="region" with aria-label="File Upload" to create a landmark. DropZone is keyboard-accessible via role="button" + tabIndex={0} + Enter/Space handlers. Validation errors use aria-live="polite" and role="alert" for non-intrusive announcements. Progress bars include full ARIA progressbar attributes. Focus is programmatically returned to DropZone when the file list empties per WCAG focus management guidelines.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'FileUpload.Actions renders Clear All and Upload Files buttons alongside the upload component',
    },
    {
      slug: 'typography',
      reason: 'Typography headings and labels commonly label upload sections and describe accepted formats',
    },
    {
      slug: 'card',
      reason: 'File upload is often placed inside a Card container for structured form layouts',
    },
    {
      slug: 'divider',
      reason: 'Dividers separate multiple upload sections (e.g., image upload vs document upload) on the same page',
    },
    {
      slug: 'alert',
      reason: 'Upload error states align with Alert status patterns for consistent error feedback across the app',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic File Upload',
      description: 'A basic file upload with default settings accepting common document and image formats, up to 5 files at 10MB each.',
      code: `import { FileUpload } from 'vayu-ui';

export default function BasicUpload() {
  return (
    <FileUpload>
      <FileUpload.DropZone>
        <FileUpload.DropZoneContent />
      </FileUpload.DropZone>
      <FileUpload.ErrorMessage />
      <FileUpload.List />
      <FileUpload.Actions />
    </FileUpload>
  );
}`,
      tags: ['basic', 'default', 'upload'],
    },
    {
      title: 'Image Upload',
      description: 'An image-only upload restricted to image/* types with a 5MB size limit and maximum of 3 files.',
      code: `import { FileUpload } from 'vayu-ui';

export default function ImageUpload() {
  return (
    <FileUpload
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      maxFiles={3}
      onUpload={(files) => console.log('Uploading:', files)}
    >
      <FileUpload.DropZone>
        <FileUpload.DropZoneContent />
      </FileUpload.DropZone>
      <FileUpload.ErrorMessage />
      <FileUpload.List />
      <FileUpload.Actions />
    </FileUpload>
  );
}`,
      tags: ['image', 'restrict', 'accept', 'validation'],
    },
    {
      title: 'Document Upload',
      description: 'A document upload restricted to PDF, DOC, DOCX, and TXT files with a 10MB size limit and 5 files maximum.',
      code: `import { FileUpload } from 'vayu-ui';

export default function DocumentUpload() {
  return (
    <FileUpload accept=".pdf,.doc,.docx,.txt" maxSize={10 * 1024 * 1024} maxFiles={5}>
      <FileUpload.DropZone>
        <FileUpload.DropZoneContent />
      </FileUpload.DropZone>
      <FileUpload.ErrorMessage />
      <FileUpload.List />
      <FileUpload.Actions />
    </FileUpload>
  );
}`,
      tags: ['document', 'pdf', 'doc', 'restrict'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside the FileUpload provider',
      bad: '<FileUpload.DropZone>...</FileUpload.DropZone>',
      good: '<FileUpload><FileUpload.DropZone>...</FileUpload.DropZone></FileUpload>',
      reason: 'Sub-components use the useFileUpload hook which requires FileUploadContext. Using them outside the provider throws "FileUpload components must be used within <FileUpload>".',
    },
    {
      title: 'Omitting DropZone from the composition',
      bad: '<FileUpload><FileUpload.List /></FileUpload>',
      good: '<FileUpload><FileUpload.DropZone><FileUpload.DropZoneContent /></FileUpload.DropZone><FileUpload.List /></FileUpload>',
      reason: 'Without DropZone, users have no way to select or drag files. DropZone renders the hidden file input and drag-and-drop handlers that make file selection possible.',
    },
    {
      title: 'Hardcoding maxSize instead of using the prop',
      bad: '<FileUpload><FileUpload.DropZone className="max-w-md" /></FileUpload>',
      good: '<FileUpload maxSize={20 * 1024 * 1024}>',
      reason: 'The maxSize prop drives both server-side validation and the default "Max 10MB per file" hint in DropZoneContent. Hardcoding styles or custom text breaks the validation-UI consistency.',
    },
    {
      title: 'Overriding DropZone drag event handlers',
      bad: '<FileUpload.DropZone onDragOver={(e) => e.preventDefault()}>',
      good: '<FileUpload.DropZone>',
      reason: 'DropZone internally manages onDragOver, onDragLeave, onDrop, and onkeydown for state management. Overriding these handlers breaks drag-and-drop functionality and keyboard activation.',
    },
    {
      title: 'Removing files during upload without checking status',
      bad: 'files.forEach(f => removeFile(f.id))',
      good: 'files.filter(f => f.status !== "uploading").forEach(f => removeFile(f.id))',
      reason: 'The remove button is disabled during upload for a reason. Programmatically removing uploading files can leave the upload simulation in an inconsistent state. Always check file.status before removing.',
    },
  ],
};
