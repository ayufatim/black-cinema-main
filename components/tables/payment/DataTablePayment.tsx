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
import { DataTablePaymentViewOptions } from "./ColumnToggle";
import { Button } from "../../ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadCloudIcon,
  Search,
} from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { format } from "date-fns";
import { Payment } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DataTablePaymentProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchQuery: string;
  setSearchQuery: any;
}

const emptyData: Payment[] = [];

const csvConfig = mkConfig({
  useKeysAsHeaders: true,
  fieldSeparator: ",",
  decimalSeparator: ".",
});

export function DataTablePayment({
  columns,
  data,
  searchQuery,
  setSearchQuery
}: DataTablePaymentProps<Payment, unknown>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteredData, setFilteredData] = useState<Payment[]>([]);

  useEffect(() => {
    const newData = data.filter((payment) =>
      payment.userName.toLocaleLowerCase().includes(searchQuery)
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

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

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
          <DataTablePaymentViewOptions table={table} />
          <Button
            variant={"outline"}
            size={"sm"}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table.getFilteredRowModel().rows.map((row: any) => ({
                id: row.original.id,
                createdAt: row.original.createdAt,
                userName: row.original.userName,
                userEmail: row.original.userEmail,
                totalPrice: row.original.totalPrice,
                packageName: row.original.packageName,
                methodPayment: row.original.methodPayment,
                promoCode: row.original.promoCode,
                status: row.original.status,
                room: row.original.room,
                startTime: format(new Date(row.original.startTime), "yyyy-MM-dd"),
                endTime: format(new Date(row.original.endTime), "yyyy-MM-dd"),
              }));
              handleExportCSV(data);
            }}
          >
            <DownloadCloudIcon className="mr-2 shrink-0 h-4 w-4" />
            <span>Export CSV</span>
          </Button>
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
