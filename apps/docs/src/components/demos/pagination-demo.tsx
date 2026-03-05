"use client";
import { Pagination } from "vayu-ui";
import { useState } from "react";

export default function PaginationDemo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 450;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="flex flex-col w-full gap-8 p-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Pagination</h3>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                >
                    <Pagination.Controls>
                        <Pagination.Info totalItems={totalItems} pageSize={pageSize} />
                        <Pagination.PageSizeSelector
                            pageSize={pageSize}
                            onPageSizeChange={(size) => {
                                setPageSize(size);
                                setCurrentPage(1);
                            }}
                        />
                    </Pagination.Controls>

                    <div className="flex justify-center mt-4">
                        <Pagination.Buttons />
                    </div>
                </Pagination>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Compact Variant (Mobile)</h3>
                <Pagination.Compact
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Jump to Page</h3>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                >
                    <Pagination.JumpToPage />
                </Pagination>
            </div>
        </div>
    );
}
