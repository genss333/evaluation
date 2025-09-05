"use client";

import { TextField } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Kpi,
  KpiKey,
} from "@/modules/probation/data/models/probation-kpi-model";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { useFetchKpi } from "../../../hooks/fetch-probation";

interface KpiDataTableProps {
  columns: ColumnDef<Kpi>[];
  data: Kpi[];
}

const KpiDataTable = ({ columns, data }: KpiDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true, // <-- เปิดใช้งาน
    columnResizeMode: "onChange", // <-- เลือกว่าจะให้ re-render ตอนไหน
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className={cn(
                    header.index == 1 || header.index == 2
                      ? "text-left"
                      : "text-center"
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const KpiForm = () => {
  const { data: kpiData, isLoading } = useQuery(useFetchKpi());

  const [tableData, setTableData] = useState<Kpi[]>([]);

  React.useEffect(() => {
    setTableData(kpiData || []);
  }, [kpiData]);

  const handleDataChange = (rowIndex: number, columnId: KpiKey, value: any) => {
    setTableData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const columns: ColumnDef<Kpi>[] = [
    {
      accessorKey: "runnumber",
      header: "ลำดับ",
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-caption3 text-semi-black">
            {row.original.runNumber}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "รหัสหัวข้อการประเมิน",
      cell: ({ row }) => (
        <div className="text-left">
          <div className="font-caption3 text-semi-black">
            {row.original.code}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "หัวข้อการประเมิน",
      cell: ({ row }) => (
        <div className="text-left">
          <div className="font-caption3 text-semi-black">
            {row.original.title}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "น้ำหนัก (%)",
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: "targetScore",
      header: "คะแนนเป้าหมาย",
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.targetScore}
        </div>
      ),
    },
    {
      accessorKey: "score",
      header: "คะแนนที่ได้",
      size: 80,
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <TextField
          type="number"
          defaultValue={row.original.score ?? ""}
          onChange={(e) =>
            handleDataChange(row.index, "score", e.target.valueAsNumber || null)
          }
          className="text-center font-caption3 text-semi-black w-full"
        />
      ),
    },
    {
      accessorKey: "memo",
      header: "หมายเหตุ / Memo",
      size: 260,
      minSize: 100,
      maxSize: 260,
      cell: ({ row }) => (
        <TextField
          defaultValue={row.original.memo ?? ""}
          onChange={(e) => handleDataChange(row.index, "memo", e.target.value)}
          className="font-caption3 text-semi-black w-full"
        />
      ),
    },

    {
      accessorKey: "how",
      header: "วิธีการวัด",
      size: 120,
      minSize: 120,
      maxSize: 120,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.how}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <TabsContent value="kpi" className="mt-4">
        <div>Loading KPI data...</div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="kpi" className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-title text-semi-black">
            ผู้ประเมินเพิ่มหัวข้อการประเมินของ KPI
          </div>
          <div className="font-body2 text-status-red">
            กำหนดให้ส่วนที่ 3 = 60%
          </div>
        </div>

        <KpiDataTable columns={columns} data={tableData} />
      </div>
    </TabsContent>
  );
};

export default KpiForm;
