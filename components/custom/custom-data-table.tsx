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
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface CustomTableAction {
  addRow: () => void;
  deleteRows: (selectedRowIndices: number[]) => void;
  onSave?: () => void;
}

interface CustomDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  hTextLeft: number[];
  onRowSelectionChange: (updater: any) => void;
  rowSelection: RowSelectionState;
  actions?: CustomTableAction;
}

const CustomDataTable: React.FC<CustomDataTableProps<any>> = ({
  columns,
  data,
  hTextLeft,
  actions,
  rowSelection,
  onRowSelectionChange,
}: CustomDataTableProps<any>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const memoizedColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableResizing: false,
        size: 40,
      },
      ...columns,
    ],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: actions ? memoizedColumns : columns,
    state: {
      pagination,
      rowSelection: rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: onRowSelectionChange,
    getRowId: (row) => row.id,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDeleteClick = () => {
    if (actions?.deleteRows) {
      const selectedIndices = table
        .getSelectedRowModel()
        .rows.map((row) => row.index);
      actions.deleteRows(selectedIndices);
    }
  };

  return (
    <div className="space-y-2.5">
      {actions && (
        <div className="w-fit h-7 bg-background drop-shadow-md drop-shadow-[#BFBFBF40] rounded-[5px] flex justify-around items-center gap-2 px-4">
          <Plus
            className="size-4 text-[#E6E6E6] hover:text-semi-black hover:cursor-pointer"
            onClick={actions?.addRow}
          />
          {actions.onSave && (
            <Save
              className="size-4 text-[#E6E6E6] hover:text-semi-black hover:cursor-pointer"
              onClick={actions?.onSave}
            />
          )}
          <X
            className="size-4 text-[#E6E6E6] hover:text-semi-black hover:cursor-pointer"
            onClick={handleDeleteClick}
          />
        </div>
      )}
      <div className="border rounded-tl-[10px] rounded-tr-[10px]">
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
                  colSpan={memoizedColumns.length}
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
            <ChevronsLeftIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="size-6 p-2 border-[#BFBFBF] rounded-[5px]"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-6 p-2 border-tiger-red rounded-[5px] lg:flex"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <div className="text-xs font-normal text-tiger-red">
              {table.getState().pagination.pageIndex + 1}
            </div>
          </Button>
          <Button
            variant="outline"
            className="size-6 p-2 border-[#BFBFBF] rounded-[5px]"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-3 text-semi-black" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-6 p-2 border-[#BFBFBF] rounded-[5px] lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
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
              id="rows-per-page"
              className="h-7 w-[98px] font-caption2"
            >
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="font-caption3"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CustomDataTable;
