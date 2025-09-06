"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useFetchDevplan } from "../../../hooks/fetch-probation";

const DevplanForm = () => {
  const { data, isLoading } = useQuery(useFetchDevplan());
  const gridCols = 12;

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
                    className="font-body text-semi-black min-h-[34px] "
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full max-w-[200px] min-h-8 col-span-full lg:col-span-2">
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
                <Select>
                  <SelectTrigger className="w-full max-w-[200px] min-h-8 col-span-full lg:col-span-2">
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
                <Input className="col-span-full lg:col-span-3" />
              </div>
            ))}
        </div>
      </div>
    </TabsContent>
  );
};

export default DevplanForm;
