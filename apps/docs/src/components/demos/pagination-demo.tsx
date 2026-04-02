'use client';
import { Pagination, Typography, Divider } from 'vayu-ui';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
    const page = searchParams.get('page');
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
        <Typography.H5 variant="primary" className="mb-4">
          Default Pagination
        </Typography.H5>
        <Pagination.Root aria-label="Default pagination">
          <Pagination.Info totalItems={totalItems} pageSize={pageSize} currentPage={currentPage} />
          <div className="flex justify-center">
            <Pagination.Buttons
              currentPage={currentPage}
              totalPages={totalPages}
              hrefBuilder={buildPageUrl}
            />
          </div>
        </Pagination.Root>
      </div>

      <Divider spacing="lg" />

      {/* Extended Page Range */}
      <div>
        <Typography.H5 variant="primary" className="mb-4">
          Extended Page Range
        </Typography.H5>
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

      <Divider spacing="lg" />

      {/* Full Page Range */}
      <div>
        <Typography.H5 variant="primary" className="mb-4">
          Full Page Range
        </Typography.H5>
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

      <Divider spacing="lg" />

      {/* Compact */}
      <div>
        <Typography.H5 variant="primary" className="mb-4">
          Compact (Mobile-friendly)
        </Typography.H5>
        <Pagination.Compact
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={buildPageUrl}
        />
      </div>
    </div>
  );
}
