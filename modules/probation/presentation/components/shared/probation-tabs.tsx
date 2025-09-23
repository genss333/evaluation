import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Competency,
  Kpi,
} from "@/modules/probation/domain/entities/eval-form-data";
import { RefObject } from "react";
import { SubFormRef } from "../../schema/probation-form";
import CompetencyForm from "./forms/competency-form";
import DevplanForm from "./forms/dev-plan-form";
import KpiForm from "./forms/kpi-form";
import MoreProbationForm from "./forms/more-form";
import TimeAttandanceForm from "./forms/time-attandance-form";

interface ProbationTabsProps {
  kpiFormRef: { ref: RefObject<SubFormRef | null>; data: Kpi[] };
  compFormRef: { ref: RefObject<SubFormRef | null>; data: Competency[] };
  devplanFormRef: RefObject<SubFormRef | null>;
  moreFormRef: RefObject<SubFormRef | null>;
}

const ProbationTabs = ({
  kpiFormRef,
  compFormRef,
  devplanFormRef,
  moreFormRef,
}: ProbationTabsProps) => {
  return (
    <Tabs defaultValue="kpi" className="mx-4 mb-4 ">
      <TabsList className="bg-transparent">
        <TabsTrigger value="kpi">KPI</TabsTrigger>
        <TabsTrigger value="competency">Competency</TabsTrigger>
        <TabsTrigger value="time">Time Attendance</TabsTrigger>
        <TabsTrigger value="devplan">Development Plan</TabsTrigger>
        <TabsTrigger value="more">การประเมินเพิ่มเติม</TabsTrigger>
      </TabsList>
      <KpiForm ref={kpiFormRef.ref} data={kpiFormRef.data} />
      <CompetencyForm ref={compFormRef.ref} data={compFormRef.data} />
      <TimeAttandanceForm />
      <DevplanForm ref={devplanFormRef} />
      <MoreProbationForm ref={moreFormRef} />
    </Tabs>
  );
};

export default ProbationTabs;
