/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/datatable/pagination";
import { DataTableViewOptions } from "@/components/datatable/toogle";

interface DataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    fetchData: (params: {
      page: number;
      length: number;
      search: string;
    }) => Promise<{ data: TData[]; total: number }>;
    lengthOption?: any;
  }

  export function DataTable<TData>({ columns, fetchData, lengthOption }: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [data, setData] = React.useState<TData[]>([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [length, setLength] = React.useState(lengthOption || 10);
    const [search, setSearch] = React.useState("");

    const fetchDataCallback = React.useCallback(async () => {
        const response = await fetchData({ page, length, search });
        setData(response.data);
        setTotal(response.total);
    }, [fetchData, page, length, search]);
    
    React.useEffect(() => {
        fetchDataCallback();
    }, [fetchDataCallback]);

    const table = useReactTable({
        columns,
        data,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
          sorting,
          columnVisibility,
        },
    });

    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter any column..."
                    onChange={(event) => setSearch(event.target.value)}
                    className="max-w-sm"
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext(),)}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={ row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination 
                currentPage={page}
                totalPages={Math.ceil(total / length)}
                pageSize={length}
                totalItems={total} 
                onPageChange={(newPage: any) => {setPage(newPage)}}
                onPageSizeChange={(newSize: any) => {
                    setLength(newSize);
                    setPage(1);
                }} 
            />
        </>
    );
}
