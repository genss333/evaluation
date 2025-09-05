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
            title={data.count.title}
            values={data.count.values}
            showSuffix={data.count.values.length > 1}
            disable={data.count.disable}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
          <ProbationField
            title={data.code.title}
            values={data.code.values}
            showSuffix={data.code.values.length > 1}
            disable={data.code.disable}
          />
          <ProbationField
            title={data.years.title}
            values={data.years.values}
            showSuffix={data.years.values.length > 1}
            disable={data.years.disable}
          />
          <ProbationField
            title={data.month.title}
            values={data.month.values}
            showSuffix={data.month.values.length > 1}
            disable={data.month.disable}
          />
          <ProbationField
            title={data.empName.title}
            values={data.empName.values}
            showSuffix={data.empName.values.length > 1}
            disable={data.empName.disable}
          />
          <ProbationField
            title={data.position.title}
            values={data.position.values}
            showSuffix={data.position.values.length > 1}
            disable={data.position.disable}
          />
          <ProbationField
            title={data.empLevel.title}
            values={data.empLevel.values}
            showSuffix={data.empLevel.values.length > 1}
            disable={data.empLevel.disable}
          />
          <ProbationField
            title={data.startDate.title}
            values={data.startDate.values}
            showSuffix={data.startDate.values.length > 1}
            disable={data.startDate.disable}
          />
          <ProbationField
            title={data.startWork.title}
            values={data.startWork.values}
            showSuffix={data.startWork.values.length > 1}
            disable={data.startWork.disable}
          />
          <ProbationField
            title={data.workAge.title}
            values={data.workAge.values}
            showSuffix={data.workAge.values.length > 1}
            disable={data.workAge.disable}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
          <ProbationGroupCard>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2.5 p-4">
              {data.group.map((item) => (
                <ProbationField
                  key={item.title}
                  title={item.title}
                  values={item.values}
                  disable={item.disable}
                  suffix={
                    <div
                      key="time-prefix"
                      className="font-body3 text-button-grey"
                    >
                      %
                    </div>
                  }
                />
              ))}
              <ProbationField
                key={data.totalScore.title}
                title={data.totalScore.title}
                values={data.totalScore.values}
                disable={data.totalScore.disable}
                suffix={
                  <div
                    key="time-prefix"
                    className="font-body3 text-button-grey"
                  >
                    คะแนน
                  </div>
                }
              />
            </div>
          </ProbationGroupCard>
          <ProbationGroupCard>
            <Flex direction={"col"} justify={"between"} className="p-4 h-full">
              <div className="font-title pt-2">เกรดรวม</div>
              <Flex gap={4} align={"center"}>
                <ProbationField
                  title={data.grade.title}
                  values={data.grade.values}
                  disable={data.grade.disable}
                  showSuffix={data.grade.values.length > 1}
                />
                <div className="font-body3">{data.gradePeriod}</div>
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
