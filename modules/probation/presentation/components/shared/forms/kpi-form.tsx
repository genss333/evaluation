"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { TextField } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Kpi,
  KpiKey,
} from "@/modules/probation/data/models/probation-kpi-model";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useFetchKpi } from "../../../hooks/fetch-probation";

const KpiForm = () => {
  const { data, isLoading } = useQuery(useFetchKpi());

  const [tableData, setTableData] = useState<Kpi[]>();

  useEffect(() => {
    setTableData(data?.list || []);
  }, [data]);

  const handleDataChange = (rowIndex: number, columnId: KpiKey, value: any) => {
    setTableData((prev) =>
      prev?.map((row, index) =>
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
          <div className="font-title text-semi-black">{data?.title}</div>
          <div className="font-body2 text-status-red">{data?.desc}</div>
        </div>

        <ProbationDataTable
          hTextLeft={[1, 2]}
          columns={columns}
          data={tableData || []}
        />
      </div>
    </TabsContent>
  );
};

export default KpiForm;
