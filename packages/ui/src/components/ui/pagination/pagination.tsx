// pagination.tsx
// Composition: compound export

import { PaginationRoot } from "./pagination-root";
import { PaginationInfo } from "./pagination-info";
import { PaginationButtons } from "./pagination-buttons";
import { CompactPagination } from "./compact-pagination";

const Pagination = {
    Root: PaginationRoot,
    Info: PaginationInfo,
    Buttons: PaginationButtons,
    Compact: CompactPagination,
};

export default Pagination;
