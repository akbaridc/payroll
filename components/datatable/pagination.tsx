import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationProps {
  currentPage: number; // Halaman saat ini
  totalPages: number; // Total halaman
  pageSize: number; // Jumlah item per halaman
  totalItems: number; // Total item
  pageSizes?: number[]; // Daftar opsi pageSize
  onPageChange: (page: number) => void; // Callback saat halaman berubah
  onPageSizeChange: (size: number) => void; // Callback saat pageSize berubah
}

export const DataTablePagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  pageSizes = [5, 10, 20, 30, 40, 50, 100, -1],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = pageSize === -1 ? totalItems : Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-2 mt-6">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {startRow} to {endRow} of {totalItems}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Show</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizes.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size === -1 ? "All" : size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {pageSize === -1 ? 1 : totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === (pageSize === -1 ? 1 : totalPages)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
