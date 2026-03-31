// pagination.tsx
// Composition: compound export

import { PaginationRoot } from "./PaginationRoot";
import { PaginationInfo } from "./PaginationInfo";
import { PaginationButtons } from "./PaginationButtons";
import { CompactPagination } from "./CompactPagination";

const Pagination = {
    Root: PaginationRoot,
    Info: PaginationInfo,
    Buttons: PaginationButtons,
    Compact: CompactPagination,
};

export default Pagination;
