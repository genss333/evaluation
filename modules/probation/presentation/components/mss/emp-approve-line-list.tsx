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
import { ReactNode } from "react";
import * as model from "../../../data/models/probation-model";
import { ProbationFieldTrigger } from "../shared/probation-field";

interface EmpApproveLineProps {
  employees: model.Employee[] | null;
  form: model.ProbationTitle | null;
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

const EmpItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[34px] text-xs font-normal text-foreground rounded-[10px] flex flex-col justify-center px-4">
      {children}
    </div>
  );
};

const EmpList = ({ items }: { items: model.Employee[] }) => {
  return (
    <div className="space-y-2.5">
      {items &&
        items.map((item) => (
          <EmpItem key={item.personCode}>
            <div className="flex items-center gap-2">
              {item.personCode}
              <div className="flex-1"> {item.name}</div>
              {item.percent} %
            </div>
          </EmpItem>
        ))}
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
  return (
    <div className="space-y-2.5">
      <CardSection>
        <div className="font-semibold text-base">เลือกแบบฟอร์มการประเมิน</div>
        <div className="flex items-center gap-4">
          {form && form.disable ? (
            <ProbationFieldTrigger
              selectedValue={form.values[0]}
              showSuffix={true}
              disable={true}
            />
          ) : (
            <Select>
              <SelectTrigger className="text-sm font-normal h-8 truncate w-full">
                <SelectValue placeholder="แบบฟอร์มประเมินพนักงานควบคุมคุณภาพ" />
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
      </CardSection>
      <CardSection className="hidden xl:block">
        <div className="font-semibold text-base text-semi-black flex items-center">
          <div className="flex-1">รหัสประเมินและชื่อพนักงาน</div>
          <Filter size={16} />
        </div>
        <Separator />
        {employees && <EmpList items={employees} />}
      </CardSection>
    </div>
  );
};

export default EmpApproveLine;
