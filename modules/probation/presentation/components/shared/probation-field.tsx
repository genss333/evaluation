"use client";

import { TextField } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as model from "@/modules/probation/data/models/probation-model";
import { ChevronDown } from "lucide-react";
import React, { ReactNode } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface ProbationFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  title: string;
  suffixText?: string;
  titleStyle?: string;
  selectedValue?: model.ProbationFieldValue;
  values: model.ProbationFieldValue[];
  showSuffix?: boolean;
  suffix?: ReactNode;
  disable?: boolean;
  colSpan?: number[];
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
      <div>{selectedValue?.title ?? ""}</div>
      {showSuffix && !suffix && <ChevronDown className="size-4 opacity-50" />}
      {suffix}
    </div>
  );
});

ProbationFieldTrigger.displayName = "ProbationFieldTrigger";

const ProbationField = ({
  field,
  title,
  suffixText,
  titleStyle = "font-body2",
  selectedValue,
  values,
  showSuffix = true,
  suffix,
  disable = false,
  colSpan,
}: ProbationFieldProps) => {
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
            selectedValue={selectedValue ?? values[0]}
            showSuffix={showSuffix}
            suffix={suffix}
            disable={disable}
          />
        ) : !disable && values.length === 1 ? (
          <TextField
            className={cn(
              "flex items-center px-4 py-2",
              "font-body3 h-8 min-h-8 w-full rounded-[10px]",
              "text-semi-black bg-background outline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            suffixIcon={suffix}
            {...field}
          />
        ) : (
          <Select
            onValueChange={field.onChange}
            defaultValue={`${field.value.id}`}
          >
            <SelectTrigger
              className="w-full font-body3 text-semi-black col-span-full lg:col-span-2 [data-placeholder]:text-semi-black rounded-[10px]"
              size="sm"
              {...field}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {values &&
                values.map((p) => (
                  <SelectItem key={p.id} value={`${p.id}`}>
                    {p.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {suffixText && (
        <div
          className="font-body3 text-semi-black"
          style={{ gridColumn: `span ${secondaryTitleColSpan}` }}
        >
          {suffixText}
        </div>
      )}
    </div>
  );
};

export default ProbationField;
