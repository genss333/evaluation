"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TextField } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle } from "react";
import { useFetchKpi } from "../../../hooks/use-fetch-probation";
import { useFormDataKpi } from "../../../hooks/use-probation-form";
import { useTableDataKpi } from "../../../hooks/use-table-data";
import { KPISchema, SubFormRef } from "../../../schema/probation-form";

const KpiForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchKpi());

  const form = useFormDataKpi(data);

  const { columns } = useTableDataKpi(data);

  const onSubmit = (values: KPISchema) => {
    console.log("Form data submitted from kpi:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

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
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2">
            <div className="font-title text-semi-black">{data?.title}</div>
            <div className="font-body2 text-status-red">{data?.desc}</div>
          </div>
          <ProbationDataTable
            hTextLeft={[1, 2]}
            columns={columns}
            data={data?.list || []}
          />
          {data?.sums && (
            <div className="border rounded-[10px] p-2.5 space-y-2.5">
              <div className="text-sm font-semibold">คะแนนรวมของ KPI</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.sums.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-2 items-center"
                  >
                    <div className="text-sm font-medium col-span-2">
                      {item.title}
                    </div>
                    <FormField
                      name={`kpiSums.${index}.field.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              className="h-8 max-w-[120px] text-sm font-normal"
                              suffixIcon={
                                <div className="text-sm font-normal text-button-grey">
                                  คะแนน
                                </div>
                              }
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Form>
    </TabsContent>
  );
});

KpiForm.displayName = "KpiForm";

export default KpiForm;
