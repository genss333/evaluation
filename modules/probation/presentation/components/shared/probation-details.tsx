import Flex from "@/components/layout/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { ReactNode } from "react";
import ProbationField from "./probation-field";
import ProbationStep from "./probation-setep";

interface ProbationDetailProps {
  data: ProbationModel;
}

const ProbationGroupCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("rounded-[10px] border border-[#E6E6E6]", ...className)}>
      {children}
    </div>
  );
};

const ProbationDetail = ({ data }: ProbationDetailProps) => {
  return (
    <div className="bg-background w-full rounded-[10px]">
      <ProbationStep steps={data.steps} />
      <hr className="my-4" />
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <ProbationField
            title="ครั้งที่"
            values={[]}
            showSuffix={false}
            disable
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
          <ProbationField title="รหัสการประเมิน" values={[]} />
          <ProbationField title="ปีประเมิน" values={[]} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
          <ProbationGroupCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 p-4">
              <ProbationField
                title="Time Attendance"
                values={[]}
                suffix={
                  <div
                    key="time-prefix"
                    className="font-body3 text-button-grey"
                  >
                    %
                  </div>
                }
              />
            </div>
          </ProbationGroupCard>
          <ProbationGroupCard>
            <Flex direction={"col"} justify={"between"} className="p-4 h-full">
              <div className="font-title pt-2">เกรดรวม</div>
              <Flex gap={4} align={"center"}>
                <ProbationField title="อายุงาน" values={[]} />
                <div className="font-body3">ช่วงคะแนนประเมิน 0.00 - 50.00</div>
              </Flex>
            </Flex>
          </ProbationGroupCard>
        </div>
      </div>
      <Tabs defaultValue="kpi" className="mx-4 mb-4 ">
        <TabsList className="bg-transparent">
          <TabsTrigger value="kpi">KPI</TabsTrigger>
          <TabsTrigger value="competency">Competency</TabsTrigger>
          <TabsTrigger value="timeAttendance">Time Attendance</TabsTrigger>
          <TabsTrigger value="devPlan">Development Plan</TabsTrigger>
          <TabsTrigger value="more">การประเมินเพิ่มเติม</TabsTrigger>
        </TabsList>
        <TabsContent value="kpi"></TabsContent>
        <TabsContent value="competency"></TabsContent>
        <TabsContent value="timeAttendance"></TabsContent>
        <TabsContent value="devPlan"></TabsContent>
        <TabsContent value="more"></TabsContent>
      </Tabs>
    </div>
  );
};

export default ProbationDetail;
