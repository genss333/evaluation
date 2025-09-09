"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Kpi } from "@/modules/probation/data/models/probation-kpi-model";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useFetchKpi } from "../../../hooks/use-fetch-probation";
import { KPISchema } from "../../../schema/probation-form";

export interface KpiFormRef {
  submit: () => void;
}

const KpiForm = forwardRef<KpiFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchKpi());

  const form = useForm<KPISchema>({
    defaultValues: {
      kpis: [],
    },
  });

  const columns: ColumnDef<Kpi>[] = [
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
      cell: ({ row }) => (
        <FormField
          name={`kpis.${row.index}.kpiScore`}
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
    {
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

  const onSubmit = (values: KPISchema) => {
    console.log("Form data submitted from child:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  useEffect(() => {
    if (data?.list) {
      const formValues = {
        kpis: data.list.map((item) => ({
          kpiMemo: item.memo ?? "",
          kpiScore: item.score ?? "",
        })),
      };
      form.reset(formValues);
    }
  }, [data, form]);

  if (isLoading) {
    return (
      <TabsContent value="kpi" className="mt-4">
        <div>Loading KPI data...</div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="kpi" className="mt-4">
      <Form {...form}>
        <div className="flex flex-col gap-4a">
          <div className="flex flex-col gap-2">
            <div className="font-title text-semi-black">{data?.title}</div>
            <div className="font-body2 text-status-red">{data?.desc}</div>
          </div>

          <ProbationDataTable
            hTextLeft={[1, 2]}
            columns={columns}
            data={data?.list || []}
          />
        </div>
      </Form>
    </TabsContent>
  );
});

KpiForm.displayName = "KpiForm";

export default KpiForm;
