"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { Form } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useFetchKpi } from "../../../hooks/use-fetch-probation";
import { useTableDataKpi } from "../../../hooks/use-table-data";
import { KPISchema, SubFormRef } from "../../../schema/probation-form";

const KpiForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchKpi());

  const form = useForm<KPISchema>({
    defaultValues: {
      kpis: [],
    },
  });

  const { columns } = useTableDataKpi(data);

  const onSubmit = (values: KPISchema) => {
    console.log("Form data submitted from kpi:", values);
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
          kpiScore: item.score.score ?? "",
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
