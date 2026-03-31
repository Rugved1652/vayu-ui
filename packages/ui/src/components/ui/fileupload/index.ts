// index.ts
// Public API

import FileUploadComponent from "./fileupload";
import DropZone from "./dropzone";
import DropZoneContent from "./dropzone-content";
import ErrorMessage from "./error-message";
import List from "./list";
import Actions from "./actions";

export type { FileWithMeta } from "./types";

const FileUpload = Object.assign(FileUploadComponent, {
    DropZone,
    DropZoneContent,
    ErrorMessage,
    List,
    Actions,
});

export { FileUpload };
export default FileUpload;
