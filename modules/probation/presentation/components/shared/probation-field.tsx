"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import * as model from "@/modules/probation/data/models/probation-model";
import { ProbationTitleValue } from "@/modules/probation/data/models/probation-model";
import { ChevronDown } from "lucide-react";
import React, { Fragment, ReactNode, useState } from "react";

interface ProbationFieldProps {
  title: string;
  values: model.ProbationTitleValue[];
  showSuffix?: boolean;
  suffix?: ReactNode;
  disable?: boolean;
}

const CreateButtonTrigger = React.forwardRef<
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
        "flex items-center max-w-md px-4",
        "font-body3 h-8 w-full justify-between rounded-[10px]",
        disable ? "text-button-grey" : "text-semi-black",
        disable ? "bg-[#F0F0F0]" : "bg-background outline",
        disable ? "hover:text-button-grey" : "hover:bg-background",
        !disable && "hover:cursor-pointer"
      )}
    >
      <Fragment>
        <div>{selectedValue?.title}</div>
        {(showSuffix && suffix) ?? (
          <ChevronDown className="text-button-grey" size={18} />
        )}
      </Fragment>
    </div>
  );
});

CreateButtonTrigger.displayName = "CreateButtonTrigger";

const ProbationField = ({
  title,
  values,
  showSuffix = true,
  suffix,
  disable = false,
}: ProbationFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<
    ProbationTitleValue | undefined
  >(values[0]);

  return (
    <div className="flex flex-col gap-2 items-start md:flex-row md:items-center word-break: break-all">
      <div className="font-body2 text-semi-black whitespace-nowrap shrink-0 min-w-[160px]">
        {title}
      </div>
      {disable ? (
        <CreateButtonTrigger
          selectedValue={selectedValue}
          showSuffix={showSuffix}
          suffix
          disable={disable}
        />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CreateButtonTrigger
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
                >
                  {value.title}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ProbationField;
