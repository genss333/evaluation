"use client";

import Flex from "@/components/layout/flex";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as model from "@/modules/probation/domain/entities/probation";
import { ChevronDownIcon } from "lucide-react";

interface ProbationTitleProps {
  items: model.ProbationField[] | [];
}

const ProbationTitle = ({ items }: ProbationTitleProps) => {
  return (
    <div className="bg-background w-full rounded-[10px] p-[10px]">
      <Flex direction={"col"} gap={4} className="lg:max-w-2/3 xl:max-w-1/2">
        {items &&
          items.map((item) => (
            <div
              key={item.key}
              className="grid grid-cols-3 lg:grid-cols-4 items-center"
            >
              <div className="font-body2">{item.title}</div>
              {item.values.length > 1 && !item.disable ? (
                <Select
                  defaultValue={`${
                    item.selctedValue?.id ?? item.values[0].id ?? ""
                  }`}
                >
                  <SelectTrigger
                    size="sm"
                    className="text-sm font-normal h-8 truncate w-full rounded-[10px] col-span-2 lg:col-span-3"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {item.values.map((p) => (
                      <SelectItem key={p.id} value={`${p.id}`}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex flex-col w-full col-span-2 lg:col-span-3">
                  <div className="relative flex items-center">
                    <Input
                      className="h-8 rounded-[10px] disabled:bg-[#F0F0F0] disabled:text-button-grey disabled:opacity-100 disabled:border-none"
                      defaultValue={`${
                        item.selctedValue ?? item.values[0].title ?? ""
                      }`}
                      disabled={item.disable}
                    />
                    {item.values.length > 1 && (
                      <div className="absolute right-3 hover:cursor-pointer">
                        <ChevronDownIcon className="size-4 opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </Flex>
    </div>
  );
};

export default ProbationTitle;
