import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { Kpi } from "../../data/models/probation-kpi-model";

export const useTableDataKpi = (table: Kpi[]) => {
  return useMemo(() => {
    let columns: ColumnDef<Kpi & { isNew: boolean }>[] = [
      {
        accessorKey: "runnumber",
        header: "ลำดับ",
        size: 80,
        minSize: 80,
        maxSize: 100,
        cell: ({ row }) => (
          <div className="text-center">
            <div className="font-caption3 text-semi-black">{row.index + 1}</div>
          </div>
        ),
      },
      {
        accessorKey: "code",
        header: "รหัสหัวข้อการประเมิน",
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.code`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-left">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.code}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "title",
        header: "หัวข้อการประเมิน",
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-left">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.title}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "total",
        header: "น้ำหนัก (%)",
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.total`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      type="number"
                      min={0}
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.total}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "targetScore",
        header: "คะแนนเป้าหมาย",
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.targetScore`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      type="number"
                      min={0}
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.targetScore}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
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
            name={`kpis.${row.index}.score`}
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
          <FormField
            name={`kpis.${row.index}.how`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.how}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
      {
        accessorKey: "standard",
        header: "เกณฑ์การให้คะแนน",
        size: 280,
        minSize: 280,
        maxSize: 280,
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.standard`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {row.original.isNew ? (
                    <Input
                      className="font-caption3 text-semi-black h-8 rounded-[10px]"
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="font-caption3 text-semi-black">
                        {field.value ?? row.original.standard}
                      </div>
                    </div>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
    ];

    table.some((item) =>
      item.scoreList?.map((score, index) => {
        columns.splice(5, 0, {
          accessorKey: `scoreList.${score.id}`,
          header: `${score.title}`,
          size: 80,
          minSize: 80,
          maxSize: 80,
          cell: ({ row }) => (
            <div className="text-center font-caption3 text-[#9C9C9C] bg-[#F0F0F0] h-8 flex justify-center items-center rounded-[10px]">
              {`${row.original.scoreList?.[index]?.value ?? "-"}`}
            </div>
          ),
        });
      })
    );

    const hasSumScore = table.some((item) => item.sumScore);
    if (hasSumScore) {
      columns.splice(columns.length - 2, 0, {
        accessorKey: "sumScore",
        header: `คะแนนรวม`,
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <div className="text-center font-caption3 text-[#9C9C9C] bg-[#F0F0F0] h-8 flex justify-center items-center rounded-[10px]">
            {`${row.original.sumScore ?? ""}`}
          </div>
        ),
      });
    }

    const hasMemoColumn = table.some((item) => item.memo != "");

    if (hasMemoColumn) {
      columns.splice(columns.length, 0, {
        accessorKey: "memo",
        header: "หมายเหตุ / Memo",
        size: 200,
        minSize: 200,
        maxSize: 200,
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.memo`}
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

    return {
      columns,
    };
  }, [table]);
};

export const useTableDataCompedency = (table: CompetencyModel[]) => {
  return useMemo(() => {
    let columns: ColumnDef<CompetencyModel>[] = [
      {
        accessorKey: "runnumber",
        header: "ลำดับ",
        size: 80,
        minSize: 80,
        maxSize: 100,
        cell: ({ row }) => (
          <div className="text-center">
            <div className="font-caption3 text-semi-black">{row.index + 1}</div>
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
        accessorKey: "targetScore",
        header: "คะแนนความคาดหวัง",
        size: 70,
        minSize: 70,
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
            name={`comps.${row.index}.score`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="text-center font-caption3 text-semi-black w-full h-8 rounded-[10px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ),
      },
    ];

    table.some((item) =>
      item.scoreList?.map((score, index) => {
        columns.splice(columns.length - 1, 0, {
          accessorKey: `scoreList.${score.id}`,
          header: `${score.title}`,
          size: 80,
          minSize: 80,
          maxSize: 80,
          cell: ({ row }) => (
            <div className="text-center font-caption3 text-[#9C9C9C] bg-[#F0F0F0] h-8 flex justify-center items-center rounded-[10px]">
              {`${row.original.scoreList?.[index]?.value ?? "-"}`}
            </div>
          ),
        });
      })
    );

    const hasSumScore = table.some((item) => item.sumScore);
    if (hasSumScore) {
      columns.splice(columns.length, 0, {
        accessorKey: "sumScore",
        header: `คะแนนรวม`,
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <div className="text-center font-caption3 text-[#9C9C9C] bg-[#F0F0F0] h-8 flex justify-center items-center rounded-[10px]">
            {`${row.original.sumScore ?? ""}`}
          </div>
        ),
      });
    }

    const hasMemoColumn = table.some((item) => item.memo != "");
    if (hasMemoColumn) {
      columns.splice(columns.length, 0, {
        accessorKey: "memo",
        header: "หมายเหตุ / Memo",
        cell: ({ row }) => (
          <FormField
            name={`kpis.${row.index}.memo`}
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

    return {
      columns,
    };
  }, [table]);
};
