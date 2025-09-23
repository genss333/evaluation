"use client";

import CustomDataTable from "@/components/custom/custom-data-table";
import { Form } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { Competency } from "@/modules/probation/domain/entities/eval-form-data";
import { RowSelectionState } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useFormDataCompedency } from "../../../hooks/use-probation-form";
import { useTableDataCompedency } from "../../../hooks/use-table-data";
import { CompedencySchema, SubFormRef } from "../../../schema/probation-form";

const CompetencyForm = forwardRef<SubFormRef, { data: Competency[] }>(
  ({ data }, ref) => {
    const form = useFormDataCompedency(data);
    const { columns } = useTableDataCompedency(data ?? []);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const onSubmit = (values: CompedencySchema) => {
      console.log("Form data submitted from compedency:", values);
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
    }));

    return (
      <TabsContent value="competency">
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-title text-semi-black">
                การให้คะแนนการประเมิน Competency
              </div>
              <div className="font-body2 text-status-red">desc</div>
            </div>

            <CustomDataTable
              hTextLeft={[1]}
              columns={columns}
              data={data || []}
              rowSelection={rowSelection}
              onRowSelectionChange={setRowSelection}
            />
            {/* {data?.sums && (
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
                                  "disabled:bg-[#F0F0F0] disabled:text-button-grey disabled:border-none disabled:opacity-100"
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
            )} */}
          </div>
        </Form>
      </TabsContent>
    );
  }
);

export default CompetencyForm;
