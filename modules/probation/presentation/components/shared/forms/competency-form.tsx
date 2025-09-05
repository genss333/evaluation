"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { TextField } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  CompetencyKey,
  CompetencyModel,
} from "@/modules/probation/data/models/probation-competency-model";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useFetchCompetency } from "../../../hooks/fetch-probation";

const CompetencyForm = () => {
  const { data, isLoading } = useQuery(useFetchCompetency());

  const [tableData, setTableData] = useState<CompetencyModel[]>();

  useEffect(() => {
    setTableData(data?.list || []);
  }, [data]);

  const handleDataChange = (
    rowIndex: number,
    columnId: CompetencyKey,
    value: any
  ) => {
    setTableData((prev) =>
      prev?.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const columns: ColumnDef<CompetencyModel>[] = [
    {
      accessorKey: "runnumber",
      header: "ลำดับ",
      size: 80,
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-caption3 text-semi-black">
            {row.original.runNumber}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "title",
      header: "หัวข้อการประเมิน",
      size: 260,
      minSize: 260,
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
      header: "คะแนนเต็ม",
      size: 55,
      minSize: 55,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: "wieght",
      header: "ค่าถ่วงน้ำหนัก",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.weight}
        </div>
      ),
    },
    {
      accessorKey: "sum",
      header: "คะแนนเต็มรวม",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.sum}
        </div>
      ),
    },
    {
      accessorKey: "score",
      header: "คะแนน",
      size: 80,
      minSize: 80,
      maxSize: 80,
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
      accessorKey: "targetScore",
      header: "คะแนนเป้าหมาย",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.targetScore}
        </div>
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
  ];

  if (isLoading) {
    return (
      <TabsContent value="competency" className="mt-4">
        <div>Loading KPI data...</div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="competency" className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-title text-semi-black">{data?.title}</div>
          <div className="font-body2 text-status-red">{data?.desc}</div>
        </div>

        <ProbationDataTable
          hTextLeft={[1]}
          columns={columns}
          data={tableData || []}
        />
      </div>
    </TabsContent>
  );
};

export default CompetencyForm;
