"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import * as model from "@/modules/probation/data/models/probation-model";
import { ChevronDown } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface ProbationFieldProps {
  title: string;
  titleStyle?: string;
  values: model.ProbationTitleValue[];
  showSuffix?: boolean;
  suffix?: ReactNode;
  disable?: boolean;
  colSpan?: number[];
}

export const ProbationFieldTrigger = React.forwardRef<
  HTMLDivElement,
  {
    selectedValue: model.ProbationTitleValue | undefined;
    showSuffix: boolean;
    suffix?: ReactNode;
    disable?: boolean;
  }
>(({ selectedValue, showSuffix, suffix, disable = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "flex items-center px-4 py-2",
        "font-body3 h-8 min-h-8 w-full justify-between rounded-[10px]",
        disable ? "text-button-grey" : "text-semi-black",
        disable ? "bg-[#F0F0F0]" : "bg-background outline",
        disable ? "hover:text-button-grey" : "hover:bg-background",
        !disable && "hover:cursor-pointer"
      )}
    >
      <>{selectedValue?.title}</>
      {(showSuffix && suffix) ?? (
        <ChevronDown className="text-button-grey" size={18} />
      )}
    </div>
  );
});

ProbationFieldTrigger.displayName = "ProbationFieldTrigger";

const ProbationField = ({
  title,
  titleStyle = "font-body2",
  values,
  showSuffix = true,
  suffix,
  disable = false,
  colSpan,
}: ProbationFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<
    model.ProbationTitleValue | undefined
  >(values[0]);

  // Define column spans with defaults
  const titleColSpan = colSpan?.[0] ?? 1;
  const valueColSpan = colSpan?.[1] ?? 1;
  const totalCols = titleColSpan + valueColSpan;

  return (
    <div
      className="grid grid-cols-1 items-center gap-2"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
      }}
    >
      <div
        className={`text-semi-black ${titleStyle}`}
        style={{ gridColumn: `span ${titleColSpan}` }}
      >
        {title}
      </div>
      <div style={{ gridColumn: `span ${valueColSpan}` }}>
        {disable ? (
          <ProbationFieldTrigger
            selectedValue={selectedValue}
            showSuffix={showSuffix}
            suffix={suffix}
            disable={disable}
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProbationFieldTrigger
                selectedValue={selectedValue}
                showSuffix={showSuffix}
                suffix={suffix}
                disable={disable}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
              {values &&
                values.map((value: model.ProbationTitleValue) => (
                  <DropdownMenuItem
                    key={value.id}
                    onSelect={() => setSelectedValue(value)}
                    className="font-body3 text-semi-black"
                  >
                    {value.title}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default ProbationField;
