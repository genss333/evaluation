"use client";

import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";
import { useFetchDevplan } from "../../../hooks/use-fetch-probation";
import { useFormDataDevplan } from "../../../hooks/use-probation-form";
import { DevplanSchema, SubFormRef } from "../../../schema/probation-form";

const DevplanForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchDevplan());
  const form = useFormDataDevplan(data);
  const onSubmit = (values: DevplanSchema) => {
    console.log("Form data submitted from Devplan:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  if (isLoading) {
    return (
      <TabsContent value="time" className="mt-4">
        <div>Loading Devplan data...</div>
      </TabsContent>
    );
  }
  return (
    <Form {...form}>
      <TabsContent value="devplan" className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-title text-semi-black">{data?.title}</div>
            <div className="font-body2 text-status-red">{data?.desc}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="hidden lg:grid grid-cols-11 gap-x-4 my-4 px-2">
            <div className="col-span-4" />
            <div className="col-span-2 font-body2 text-semi-black text-center">
              Priority
            </div>
            <div className="col-span-2 font-body2 text-semi-black text-center">
              Timing
            </div>
            <div className="col-span-3 font-body2 text-semi-black text-center">
              Remarks
            </div>
          </div>
          <div className="space-y-2">
            {data?.list &&
              data.list.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 lg:grid-cols-11 gap-x-4 gap-y-2 items-center"
                  >
                    <div className="flex gap-x-6 gap-y-2 items-center col-span-full lg:col-span-4">
                      <div className="hidden lg:block text-center text-gray-500">
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
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      name={`plans.${index}.priority`}
                      render={({ field }) => (
                        <FormItem className="w-full col-span-full lg:col-span-2">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={`${field.value}`}
                            >
                              <SelectTrigger
                                className="w-full h-8 font-body3 text-semi-black [data-placeholder]:text-semi-black rounded-[10px]"
                                size="sm"
                                {...field}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {item.prioritys &&
                                  item.prioritys.map((p) => (
                                    <SelectItem key={p.id} value={`${p.id}`}>
                                      {p.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`plans.${index}.timing`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full h-8 col-span-full lg:col-span-2 px-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <div
                                  className={cn(
                                    "font-body3 cursor-pointer",
                                    "border rounded-[10px]"
                                  )}
                                >
                                  <div className="flex justify-between items-center min-h-8 rounded-[10px] mx-2">
                                    <div className="flex-1">
                                      {field.value
                                        ? DateFormat.shortDate({
                                            date: new Date(field.value),
                                          })
                                        : "Select a date"}
                                    </div>
                                    <CalendarIcon className="size-4 opacity-50 text-muted-foreground" />
                                  </div>
                                </div>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`plans.${index}.remark`}
                      render={({ field }) => (
                        <FormItem className="w-full col-span-full lg:col-span-3 ">
                          <FormControl>
                            <Input
                              className="h-8 font-body3 text-semi-black rounded-[10px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </TabsContent>
    </Form>
  );
});

export default DevplanForm;
