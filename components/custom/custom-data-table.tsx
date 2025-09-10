"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CustomDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  hTextLeft: number[];
}

const CustomDataTable: React.FC<CustomDataTableProps<any>> = ({
  columns,
  data,
  hTextLeft,
}: CustomDataTableProps<any>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Fragment>
      <div className="border rounded-tl-[10px] rounded-tr-[10px] mt-2.5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      "font-caption1 text-semi-black",
                      hTextLeft.includes(header.index)
                        ? "text-left"
                        : "text-center",
                      "bg-[#F9F9F9]",
                      header.index == 0 && "rounded-tl-[10px]",
                      header.index === headerGroup.headers.length - 1 &&
                        "rounded-tr-[10px]"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none"
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size={"icon"}
            className="hidden size-6 p-2 border-[#BFBFBF] rounded-[5px] lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="size-6 p-2 border-[#BFBFBF] rounded-[5px]"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="size-6 p-2 border-[#BFBFBF] rounded-[5px]"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-6 p-2 border-[#BFBFBF] rounded-[5px] lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="size-3 text-semi-black" />
          </Button>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="text-xs font-normal">แสดงรายการ</div>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              size="sm"
              className="h-7 w-[98px]"
              id="rows-per-page"
            >
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomDataTable;
