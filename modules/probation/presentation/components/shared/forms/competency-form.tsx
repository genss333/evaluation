"use client";

import CustomDataTable from "@/components/custom/custom-data-table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TextField } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useFetchCompetency } from "../../../hooks/use-fetch-probation";
import { useFormDataCompedency } from "../../../hooks/use-probation-form";
import { useTableDataCompedency } from "../../../hooks/use-table-data";
import { CompedencySchema, SubFormRef } from "../../../schema/probation-form";

const CompetencyForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchCompetency());
  const form = useFormDataCompedency(data);
  const { columns } = useTableDataCompedency(data?.list ?? []);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const onSubmit = (values: CompedencySchema) => {
    console.log("Form data submitted from compedency:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  if (isLoading) {
    return (
      <TabsContent value="competency">
        <div>Loading Competency data...</div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="competency">
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-title text-semi-black">{data?.title}</div>
            <div className="font-body2 text-status-red">{data?.desc}</div>
          </div>

          <CustomDataTable
            hTextLeft={[1]}
            columns={columns}
            data={data?.list || []}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
          {data?.sums && (
            <div className="border rounded-[10px] p-2.5 space-y-2.5">
              <div className="text-sm font-semibold">
                คะแนนรวมของ Competency
              </div>
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
                      name={`compsSums.${index}.field.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              className={cn(
                                "h-8 max-w-[120px] text-sm font-normal",
                                "disabled:bg-accent disabled:text-button-grey"
                              )}
                              suffixIcon={
                                <div className="text-sm font-normal text-button-grey">
                                  คะแนน
                                </div>
                              }
                              {...field}
                              value={field.value ?? ""}
                              disabled={item.disable ?? false}
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

export default CompetencyForm;
