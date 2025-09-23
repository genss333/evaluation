"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Additional } from "@/modules/probation/domain/entities/eval-form-data";
import { forwardRef, useImperativeHandle } from "react";
import { useFieldArray } from "react-hook-form";
import { useFormDataMoreProbation } from "../../../hooks/use-probation-form";
import {
  MoreProbationSchema,
  SubFormRef,
} from "../../../schema/probation-form";

const title = (index: number) => {
  const list = [
    "จุดแข็งของผู้ถูกประเมิน",
    "เรื่องที่จะประเมินผลงานในครั้งต่อไป",
    "ข้อที่ต้องปรับปรุงในส่วน Competency",
    "ข้อที่ต้องปรับปรุงในส่วน KPI",
    "หมายเหตุอื่นๆ",
  ];

  return list[index];
};

const MoreProbationForm = forwardRef<SubFormRef, { data: Additional }>(
  ({ data }, ref) => {
    const form = useFormDataMoreProbation(data);

    const { fields } = useFieldArray({
      control: form.control,
      name: "mores",
    });

    const onSubmit = (values: MoreProbationSchema) => {
      console.log("Form data submitted from more:", values);
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
    }));

    return (
      <TabsContent value="more">
        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[240px_1fr] gap-4 items-center px-2"
              >
                <div className="text-start font-body3">
                  {index + 1}.{title(index)}
                </div>

                <div className="flex w-full gap-2 relative">
                  <FormField
                    control={form.control}
                    name={`mores.${index}.value`}
                    render={({ field: renderField }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            className={cn(
                              "h-[60px] min-h-[60px] font-body3 rounded-[10px]",
                              "disabled:bg-accent disabled:opacity-100 disabled:text-button-grey disabled:border-none"
                            )}
                            {...renderField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Form>
      </TabsContent>
    );
  }
);

MoreProbationForm.displayName = "MoreProbationForm";

export default MoreProbationForm;
