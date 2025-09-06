import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompetencyForm from "./forms/competency-form";
import KpiForm from "./forms/kpi-form";
import TimeAttandanceForm from "./forms/time-attandance-form";

const ProbationTabs = () => {
  return (
    <Tabs defaultValue="kpi" className="mx-4 mb-4 ">
      <TabsList className="bg-transparent">
        <TabsTrigger value="kpi">KPI</TabsTrigger>
        <TabsTrigger value="competency">Competency</TabsTrigger>
        <TabsTrigger value="time">Time Attendance</TabsTrigger>
        <TabsTrigger value="devPlan">Development Plan</TabsTrigger>
        <TabsTrigger value="more">การประเมินเพิ่มเติม</TabsTrigger>
      </TabsList>
      <KpiForm />
      <CompetencyForm />
      <TimeAttandanceForm />
      <TabsContent value="devPlan"></TabsContent>
      <TabsContent value="more"></TabsContent>
    </Tabs>
  );
};

export default ProbationTabs;
