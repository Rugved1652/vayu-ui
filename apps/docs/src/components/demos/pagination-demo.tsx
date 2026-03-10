"use client";
import { Pagination } from "vayu-ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Helper function to build page URLs for the demo
const buildPageUrl = (page: number) => `?page=${page}`;

export default function PaginationDemo() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalItems = 450;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Read current page from URL query params
    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            const parsedPage = parseInt(page, 10);
            if (!isNaN(parsedPage) && parsedPage > 0 && parsedPage <= totalPages) {
                setCurrentPage(parsedPage);
            }
        }
    }, [searchParams, totalPages]);

    return (
        <div className="w-full max-w-2xl not-prose space-y-10">
            {/* Default with Info */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-ground-900 dark:text-ground-100">
                    Default Pagination
                </h2>
                <Pagination.Root aria-label="Default pagination">
                    <Pagination.Info
                        totalItems={totalItems}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />
                    <div className="flex justify-center">
                        <Pagination.Buttons
                            currentPage={currentPage}
                            totalPages={totalPages}
                            hrefBuilder={buildPageUrl}
                        />
                    </div>
                </Pagination.Root>
            </div>

            {/* Extended Page Range */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-ground-900 dark:text-ground-100">
                    Extended Page Range
                </h2>
                <Pagination.Root>
                    <div className="flex justify-center">
                        <Pagination.Buttons
                            currentPage={currentPage}
                            totalPages={totalPages}
                            hrefBuilder={buildPageUrl}
                            pageRange="extended"
                            siblingCount={2}
                        />
                    </div>
                </Pagination.Root>
            </div>

            {/* Full Page Range */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-ground-900 dark:text-ground-100">
                    Full Page Range
                </h2>
                <Pagination.Root>
                    <div className="flex justify-center">
                        <Pagination.Buttons
                            currentPage={currentPage}
                            totalPages={8}
                            hrefBuilder={buildPageUrl}
                            pageRange="full"
                        />
                    </div>
                </Pagination.Root>
            </div>

            {/* Compact */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-ground-900 dark:text-ground-100">
                    Compact (Mobile-friendly)
                </h2>
                <Pagination.Compact
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hrefBuilder={buildPageUrl}
                />
            </div>
        </div>
    );
}
