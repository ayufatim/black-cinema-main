"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { DataTableUserViewOptions } from "./ColumnToggle";
import { Button } from "../../ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search,
} from "lucide-react";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DataTableUserProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchQuery: string;
  setSearchQuery: any;
}

const emptyData: User[] = [];

export function DataTableUsers({
  columns,
  data,
  searchQuery,
  setSearchQuery
}: DataTableUserProps<User, unknown>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  
  useEffect(() => {
    const newData = data.filter((user) =>
        (user.email || '').includes(searchQuery)
    );
    setFilteredData(newData);
}, [data, searchQuery]);
  

  const table = useReactTable({
    data: searchQuery === '' ? data || emptyData : filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageSize: 4,
        },
    },
  });

  const renderPaginationButtons = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "secondary" : "outline"}
          size={"icon"}
          onClick={() => table.setPageIndex(index)}
        >
          {index + 1}
        </Button>
      ));
    } else {
      let start = currentPage - 2;
      let end = currentPage + 2;

      if (start < 1) {
        start = 1;
        end = 5;
      } else if (end > totalPages) {
        start = totalPages - 4;
        end = totalPages;
      }

      const visiblePages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

      return visiblePages.map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "secondary" : "outline"}
          size={"icon"}
          onClick={() => table.setPageIndex(page - 1)}
        >
          {page}
        </Button>
      ));
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <div className='flex flex-row w-[200px] relative'>
            <Input
              type={'text'}
              className='w-full'
              placeholder='Search by title'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant={'secondary'}
              className='absolute inset-y-0 right-0'
            >
              <Search />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <DataTableUserViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Data tidak tersedia silahkan untuk menambahkan data transaksi
                  terlebih dahulu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <div className='flex flex-row items-center justify-center space-x-2 py-4'>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          {renderPaginationButtons()}
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <Label>
          Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
        </Label>
      </div>
    </>
  );
}
