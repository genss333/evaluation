"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getQueryClient } from "@/lib/get-query-client";
import { cn } from "@/lib/utils";
import * as model from "../../../data/models/probation-model";
import { probationQueryKery } from "../../hooks/use-fetch-probation";
import { useProbationProps } from "../../hooks/use-probation-store";

export const EmpList = ({ items }: { items: model.Employee[] }) => {
  const queryClient = getQueryClient();
  const { currentEmp, selectEmp } = useProbationProps();

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-2.5">
        {items &&
          items.map((item) => (
            <div
              key={item.personCode}
              className={cn(
                "h-[34px] text-xs font-normal text-foreground rounded-[10px] flex flex-col justify-center px-4",
                "hover:cursor-pointer",
                currentEmp &&
                  currentEmp.personCode == item.personCode &&
                  "bg-primary text-white"
              )}
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: [probationQueryKery],
                });
                selectEmp(item);
              }}
            >
              <div className="flex items-center gap-2">
                {item.personCode}
                <div className="flex-1"> {item.name}</div>
                {currentEmp &&
                  currentEmp.personCode == item.personCode &&
                  item.percent + " %"}
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
};
