"use client";
import { Pagination } from "vayu-ui";
import { useState } from "react";

export default function PaginationDemo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 450;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="w-full max-w-2xl not-prose space-y-8">
            <div>
                <h2
                    id="pagination-demo-label"
                    className="text-xl font-semibold mb-4"
                >
                    Default Pagination
                </h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                >
                    <Pagination.Controls>
                        <Pagination.Info
                            totalItems={totalItems}
                            pageSize={pageSize}
                        />
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

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Outlined Variant
                </h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    variant="outlined"
                >
                    <div className="flex justify-center">
                        <Pagination.Buttons />
                    </div>
                </Pagination>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Rounded Variant</h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    variant="rounded"
                >
                    <div className="flex justify-center">
                        <Pagination.Buttons />
                    </div>
                </Pagination>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Pills Variant</h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    variant="pills"
                >
                    <div className="flex justify-center">
                        <Pagination.Buttons />
                    </div>
                </Pagination>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Compact (Mobile-friendly)
                </h2>
                <Pagination.Compact
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Jump to Page</h2>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                >
                    <Pagination.JumpToPage />
                </Pagination>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
                <Pagination
                    currentPage={1}
                    totalPages={totalPages}
                    onPageChange={() => {}}
                    disabled
                >
                    <div className="flex justify-center">
                        <Pagination.Buttons />
                    </div>
                </Pagination>
            </div>
        </div>
    );
}