"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle } from "react";
import { useFetchMoreProbation } from "../../../hooks/use-fetch-probation";
import { useFormDataMoreProbation } from "../../../hooks/use-probation-form";
import {
  MoreProbationSchema,
  SubFormRef,
} from "../../../schema/probation-form";

const MoreProbationForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchMoreProbation());

  const form = useFormDataMoreProbation(data);

  const onSubmit = (values: MoreProbationSchema) => {
    console.log("Form data submitted from more:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  if (isLoading) {
    return (
      <TabsContent value="more">
        <div>Loading More Probations data...</div>
      </TabsContent>
    );
  }
  return (
    <TabsContent value="more">
      <Form {...form}>
        {data?.list &&
          data.list.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[240px_1fr] gap-4 items-center px-2 mt-2"
            >
              <div className="text-start font-body3">
                {index + 1}.{item.title}
              </div>

              <div className="flex w-full gap-2 relative">
                {item.value.map((fieldItem, fieldIndex) => (
                  <div key={fieldItem.id} className="w-full">
                    {index == 0 && (
                      <div
                        className={cn(
                          "absloute left-1/2 translate-x-1/3",
                          item.value.length < 2 && "hidden"
                        )}
                      >
                        <div className="text-sm font-medium mb-2">
                          {fieldIndex > 0
                            ? `ผู้ประเมินลำดับที่ ${fieldIndex}`
                            : "พนักงานประเมินตนเอง"}
                        </div>
                      </div>
                    )}
                    <FormField
                      name={`${item.id}[${fieldIndex}].${fieldItem.id}`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Textarea
                              className="h-[60px] min-h-[60px] font-body3 rounded-[10px]"
                              {...field}
                              disabled={fieldItem.disable ?? false}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Form>
    </TabsContent>
  );
});

export default MoreProbationForm;
