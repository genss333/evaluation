"use client";

import { Calendar } from "@/components/ui/calendar";
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
import { useFetchDevplan } from "../../../hooks/fetch-probation";

const DevplanForm = () => {
  const { data, isLoading } = useQuery(useFetchDevplan());

  if (isLoading) {
    return (
      <TabsContent value="time" className="mt-4">
        <div>Loading Devplan data...</div>
      </TabsContent>
    );
  }
  return (
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
        <div className="flex flex-col gap-y-3">
          {data?.list &&
            data.list.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-11 gap-x-4 gap-y-2 items-center"
              >
                <div className="flex gap-x-6 gap-y-2 items-center col-span-full lg:col-span-4">
                  <div className="hidden lg:block text-center text-gray-500">
                    {index + 1}
                  </div>
                  <Textarea
                    placeholder="Text"
                    className="h-8 min-h-8 font-body3 rounded-[10px]"
                    rows={1}
                  />
                </div>
                <Select>
                  <SelectTrigger
                    className="w-full font-body3 text-semi-black col-span-full lg:col-span-2 [data-placeholder]:text-semi-black rounded-[10px]"
                    size="sm"
                  >
                    <SelectValue placeholder={item.priority?.name ?? ""} />
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

                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className={cn(
                        "font-body3",
                        "border rounded-[10px]",
                        "w-full col-span-full lg:col-span-2 px-3"
                      )}
                    >
                      <div className="flex justify-between items-center min-h-8 rounded-[10px]">
                        <div className="flex-1">
                          {item.dateTime &&
                            DateFormat.shortDate({ date: item.dateTime })}
                        </div>
                        <CalendarIcon className="size-4 opacity-50 text-muted-foreground" />
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={item.dateTime ?? undefined}
                      captionLayout="label"
                      onSelect={(date) => {}}
                    />
                  </PopoverContent>
                </Popover>

                <Input
                  defaultValue={item.remark ?? " "}
                  className="col-span-full lg:col-span-3 h-8 min-h-8 font-body3 text-semi-black rounded-[10px]"
                />
              </div>
            ))}
        </div>
      </div>
    </TabsContent>
  );
};

export default DevplanForm;
