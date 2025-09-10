import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Kpi } from "../../data/models/probation-kpi-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";

export const useTableDataKpi = (data: ProbationTableModel<Kpi> | undefined) => {
  return useMemo(() => {
    let columns: ColumnDef<Kpi>[] = [
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
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <div className="text-center font-caption3 text-semi-black">
            {row.original.total}
          </div>
        ),
      },
      {
        accessorKey: "targetScore",
        header: "คะแนนเป้าหมาย",
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <div className="text-center font-caption3 text-semi-black">
            {row.original.targetScore}
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
          <FormField
            name={`kpis.${row.index}.kpiScore`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className={cn(
                      "text-center font-caption3 text-semi-black w-full h-8 rounded-[10px]"
                    )}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
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

    const hasMemoColumn = data?.list.some((item) => item.memo);
    const hasEssScore = data?.list.some((item) => item.essScore);

    if (hasMemoColumn) {
      columns.splice(columns.length - 1, 0, {
        accessorKey: "memo",
        header: "หมายเหตุ / Memo",
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.kpiMemo`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-caption3 text-semi-black w-full h-8 rounded-[10px]"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ),
      });
    }

    if (hasEssScore) {
      columns.splice(5, 0, {
        accessorKey: "essScore",
        header: "พนักงาน",
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <div className="text-center font-caption3 text-[#9C9C9C] bg-[#F0F0F0] h-8 flex justify-center items-center rounded-[10px]">
            {row.original.essScore}
          </div>
        ),
      });
    }

    return {
      columns,
    };
  }, [data]);
};
