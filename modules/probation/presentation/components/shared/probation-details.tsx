import Container from "@/components/layout/container";
import Flex from "@/components/layout/flex";
import { TextField } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ProbationStep from "./probation-setep";

interface ProbationFieldmProps {
  title: string;
  value: string;
  children?: ReactNode;
  className?: string;
}

const ProbationField = ({
  title,
  value,
  children,
  className = "",
}: ProbationFieldmProps) => {
  return (
    <Flex justify={"start"} align={"center"} className="max-w-[360px]">
      <div
        className={cn(
          "font-body2 text-semi-black whitespace-nowrap shrink-0 min-w-[124px]",
          ...className
        )}
      >
        {title}
      </div>

      <TextField
        className={cn(
          "font-body3 text-button-grey bg-accent-grey h-8 rounded-[10px] w-full", // เพิ่ม w-full
          ...className
        )}
        placeholder={value}
        suffixIcon={children}
        disabled
      />
    </Flex>
  );
};

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

const ProbationDetail = () => {
  return (
    <Container className="bg-background w-full rounded-[10px]">
      <ProbationStep
        steps={[
          {
            title: "ตั้งค่า KPI",
            desc: "สิ้นสุด 31/07/2568",
            status: "A",
            dateTime: new Date(),
          },
          {
            title: "ประเมินตนเอง",
            desc: "ธนัท ดำรงชัย",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับที่ 1",
            desc: "จักรพันธ์ กลิ่นเพชร",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับที่ 2",
            desc: "ตีรณา โชตวาณิช",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับสุดท้าย",
            desc: "บัณทัต ศรีวรรณวิไล",
            status: "P",
            dateTime: null,
          },
          {
            title: "เสร็จสิ้น",
            desc: "",
            status: "P",
            dateTime: null,
          },
        ]}
      />
      <hr className="my-4" />
      <Container className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <ProbationField title="ครั้งที่" value="1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
          <ProbationField title="รหัสการประเมิน" value="TG001010" />
          <ProbationField title="ปีประเมิน" value="2568" />
          <ProbationField title="เดือนประเมิน" value="มกราคม" />
          <ProbationField title="ชื่อพนักงาน" value="นาย ไบรอัน ตัน" />
          <ProbationField title="ตำแหน่ง" value="ผู้จัดการ" />
          <ProbationField title="ระดับพนักงาน" value="ผู้จัดการ" />
          <ProbationField title="วันที่เริ่มงาน" value="01/08/2565" />
          <ProbationField title="วันที่บรรจุ" value="01/11/2565" />
          <ProbationField title="อายุงาน" value="2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
          <ProbationGroupCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 p-4">
              <ProbationField title="Time Attendance" value="20">
                <div className="font-body3 text-button-grey">%</div>
              </ProbationField>
              <ProbationField title="Competency" value="20">
                <div className="font-body3 text-button-grey">%</div>
              </ProbationField>
              <ProbationField title="KPI" value="20">
                <div className="font-body3 text-button-grey">%</div>
              </ProbationField>
              <ProbationField title="รวมทั้งหมด" value="100">
                <div className="font-body3 text-button-grey">คะแนน</div>
              </ProbationField>
            </div>
          </ProbationGroupCard>
          <ProbationGroupCard>
            <Flex direction={"col"} justify={"between"} className="p-4 h-full">
              <div className="font-title pt-2">เกรดรวม</div>
              <Flex gap={4} align={"center"}>
                <ProbationField title="อายุงาน" value="FF" />
                <div className="font-body3">ช่วงคะแนนประเมิน 0.00 - 50.00</div>
              </Flex>
            </Flex>
          </ProbationGroupCard>
        </div>
      </Container>
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
    </Container>
  );
};

export default ProbationDetail;
