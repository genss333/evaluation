import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefObject } from "react";
import CompetencyForm from "./forms/competency-form";
import DevplanForm from "./forms/dev-plan-form";
import KpiForm, { KpiFormRef } from "./forms/kpi-form";
import MoreProbationForm from "./forms/more-form";
import TimeAttandanceForm from "./forms/time-attandance-form";

interface ProbationTabsProps {
  kpiFormRef: RefObject<KpiFormRef | null>;
}

const ProbationTabs = ({ kpiFormRef }: ProbationTabsProps) => {
  return (
    <Tabs defaultValue="kpi" className="mx-4 mb-4 ">
      <TabsList className="bg-transparent">
        <TabsTrigger value="kpi">KPI</TabsTrigger>
        <TabsTrigger value="competency">Competency</TabsTrigger>
        <TabsTrigger value="time">Time Attendance</TabsTrigger>
        <TabsTrigger value="devplan">Development Plan</TabsTrigger>
        <TabsTrigger value="more">การประเมินเพิ่มเติม</TabsTrigger>
      </TabsList>
      <KpiForm ref={kpiFormRef} />
      <CompetencyForm />
      <TimeAttandanceForm />
      <DevplanForm />
      <MoreProbationForm />
    </Tabs>
  );
};

export default ProbationTabs;
