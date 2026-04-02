// index.ts
// Public API

import FileUploadComponent from './FileUpload';
import DropZone from './DropZone';
import DropZoneContent from './DropZoneContent';
import ErrorMessage from './FileUploadErrorMessage';
import List from './FileUploadList';
import Actions from './FileUploadActions';

export type { FileWithMeta } from './types';

const FileUpload = Object.assign(FileUploadComponent, {
  DropZone,
  DropZoneContent,
  ErrorMessage,
  List,
  Actions,
});

export { FileUpload };
export default FileUpload;
