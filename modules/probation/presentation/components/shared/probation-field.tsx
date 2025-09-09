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
import React, { ReactNode, useEffect, useState } from "react";

interface ProbationFieldProps {
  title: string;
  suffixText?: string;
  titleStyle?: string;
  values: model.ProbationFieldValue[];
  showSuffix?: boolean;
  suffix?: ReactNode;
  disable?: boolean;
  colSpan?: number[]; // Now supports 3 values: [title, value, secondaryTitle]
}

export const ProbationFieldTrigger = React.forwardRef<
  HTMLDivElement,
  {
    selectedValue: model.ProbationFieldValue | undefined;
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
        disable
          ? "text-button-grey bg-[#F0F0F0] hover:text-button-grey"
          : "text-semi-black bg-background outline hover:bg-background hover:cursor-pointer"
      )}
    >
      <>{selectedValue?.title ?? ""}</>
      {showSuffix && !suffix && (
        <ChevronDown className="text-button-grey" size={18} />
      )}
      {suffix}
    </div>
  );
});

ProbationFieldTrigger.displayName = "ProbationFieldTrigger";

const ProbationField = ({
  title,
  suffixText,
  titleStyle = "font-body2",
  values,
  showSuffix = true,
  suffix,
  disable = false,
  colSpan,
}: ProbationFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<
    model.ProbationFieldValue | undefined
  >(values[0]);

  useEffect(() => {
    setSelectedValue(values[0]);
  }, [values]);

  const [titleColSpan = 1, valueColSpan = 1, secondaryTitleColSpan = 1] =
    colSpan ?? [];

  const totalCols =
    titleColSpan + valueColSpan + (suffixText ? secondaryTitleColSpan : 0);

  return (
    <div
      className="grid items-center gap-2"
      style={{
        gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
      }}
    >
      <div
        className={cn("text-semi-black", titleStyle)}
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
        ) : !disable && values.length === 1 ? (
          <input
            value={selectedValue?.title ?? ""}
            onChange={(e) =>
              setSelectedValue((prev) => ({
                id: prev?.id ?? values[0].id,
                title: e.target.value,
              }))
            }
            className={cn(
              "flex items-center px-4 py-2",
              "font-body3 h-8 min-h-8 w-full rounded-[10px]",
              "text-semi-black bg-background outline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
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
                values.map((value: model.ProbationFieldValue) => (
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

      {suffixText && (
        <div
          className="font-body3 text-gray-500"
          style={{ gridColumn: `span ${secondaryTitleColSpan}` }}
        >
          {suffixText}
        </div>
      )}
    </div>
  );
};

export default ProbationField;
