"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Filter, ListFilter } from "lucide-react";
import { ReactNode, useEffect } from "react";
import * as model from "../../../data/models/probation-model";
import { useProbationProps } from "../../hooks/store/use-probation-store";
import { ProbationFieldTrigger } from "../shared/probation-field";
import { EmpList } from "./emp-approve-item";

interface EmpApproveLineProps {
  employees: model.Employee[] | null;
  form: model.ProbationField | null;
}

const CardSection = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background w-full rounded-[10px] p-2.5 space-y-2.5",
        className
      )}
    >
      {children}
    </div>
  );
};

const EmpDrawer = ({ items }: { items: model.Employee[] }) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <ListFilter className="text-semi-black mr-4" />
      </DrawerTrigger>
      <DrawerContent className="px-4 max-w-md">
        <DrawerHeader>
          <DrawerTitle>
            <div className="font-semibold text-base text-semi-black flex items-center">
              <div className="flex-1">รหัสประเมินและชื่อพนักงาน</div>
              <Filter size={16} />
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <EmpList items={items} />
      </DrawerContent>
    </Drawer>
  );
};

const EmpApproveLine = ({ employees, form }: EmpApproveLineProps) => {
  const { selectEmp, isHrRollback } = useProbationProps();

  useEffect(() => {
    employees && selectEmp(employees[0]);
  }, [employees]);

  return (
    <div className="space-y-2.5">
      <CardSection>
        <div className={cn(isHrRollback && "opacity-25")}>
          <div className="font-semibold text-base">เลือกแบบฟอร์มการประเมิน</div>
          <div className="flex items-center gap-4">
            {form && form.disable ? (
              <ProbationFieldTrigger
                selectedValue={form.values[0]}
                showSuffix={true}
                disable={true}
              />
            ) : (
              <Select
                defaultValue={`${form?.selctedValue?.id ?? form?.values[0].id}`}
              >
                <SelectTrigger
                  size="sm"
                  className="text-sm font-normal h-8 truncate w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {form &&
                    form.values.map((item) => (
                      <SelectItem key={item.id} value={`${item.id}`}>
                        {item.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
            <div className="xl:hidden">
              {employees && <EmpDrawer items={employees} />}
            </div>
          </div>
        </div>
      </CardSection>
      <CardSection className="hidden xl:block">
        <div className={cn(isHrRollback && "opacity-25")}>
          <div className="font-semibold text-base text-semi-black flex items-center">
            <div className="flex-1">รหัสประเมินและชื่อพนักงาน</div>
            <Filter size={16} />
          </div>
          <Separator />
          {employees && <EmpList items={employees} />}
        </div>
      </CardSection>
    </div>
  );
};

export default EmpApproveLine;
