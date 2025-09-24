"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DateFormat } from "@/extensions/date-format";
import { Devplan } from "@/modules/probation/domain/entities/eval-form-data";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormDataDevplan } from "../../../hooks/use-probation-form";
import { DevplanSchema, SubFormRef } from "../../../schema/probation-form";

const generateDevplanList = (count = 5): Devplan[] => {
  const priorities = ["High", "Medium", "Low"];

  return Array.from({ length: count }, (_, i) => ({
    idx: i + 1,
    content: "",
    priority: priorities[i % priorities.length],
    timing: null,
    remarks: "",
  }));
};

const DevplanForm = forwardRef<SubFormRef, { data: Devplan[] }>(
  ({ data }, ref) => {
    const [list, setList] = useState(data);
    const form = useFormDataDevplan(list);

    const onSubmit = (values: DevplanSchema) => {
      console.log("Form data submitted from Devplan:", values);
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
    }));

    useEffect(() => {
      setList(generateDevplanList());
    }, [data]);

    return (
      <TabsContent value="devplan">
        <Form {...form}>
          <div className="grid grid-cols-11 gap-x-4 my-4 px-2">
            {/* Header Row */}
            <div className="hidden lg:block col-start-5 col-span-2 font-body2 text-semi-black text-center">
              Priority
            </div>
            <div className="hidden lg:block col-span-2 font-body2 text-semi-black text-center">
              Timing
            </div>
            <div className="hidden lg:block col-span-3 font-body2 text-semi-black text-center">
              Remarks
            </div>

            {/* Data Rows */}
            {list &&
              list.map((item, index) => (
                <div
                  key={item.idx}
                  className="col-span-11 grid grid-cols-11 gap-x-4 gap-y-2 items-center py-2"
                >
                  {/* Plan */}
                  <div className="flex gap-x-2 items-start col-span-11 lg:col-span-4">
                    <div className="hidden lg:block text-center text-gray-500 w-6 shrink-0">
                      {index + 1}
                    </div>
                    <FormField
                      name={`plans.${index}.plan`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Textarea
                              placeholder="Text"
                              className="h-8 min-h-8 font-body3 rounded-[10px]"
                              rows={1}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="hidden" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Priority */}
                  <FormField
                    name={`plans.${index}.priority`}
                    render={({ field }) => (
                      <FormItem className="w-full col-span-11 lg:col-span-2">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className="w-full h-8 font-body3 text-semi-black rounded-[10px]"
                              size="sm"
                            >
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />

                  {/* Timing */}
                  <FormField
                    name={`plans.${index}.dateTime`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-11 lg:col-span-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <button
                                type="button"
                                className="flex items-center justify-between w-full h-8 border rounded-[10px] px-2 font-body3 text-left"
                              >
                                <div className="flex-1">
                                  {field.value &&
                                    DateFormat.shortDate({ date: field.value })}
                                </div>
                                <CalendarIcon className="size-4 opacity-50" />
                              </button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />

                  {/* Remarks */}
                  <FormField
                    name={`plans.${index}.remark`}
                    render={({ field }) => (
                      <FormItem className="w-full col-span-11 lg:col-span-3">
                        <FormControl>
                          <Input
                            className="h-8 font-body3 text-semi-black rounded-[10px]"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="hidden" />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
          </div>
        </Form>
      </TabsContent>
    );
  }
);

export default DevplanForm;
