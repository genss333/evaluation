"use client";
import { TabsContent } from "@/components/ui/tabs";
import "@/extensions/string";
import { useQuery } from "@tanstack/react-query";
import { useId } from "react";
import { useProbationProps } from "../../../hooks/store/use-probation-store";
import { useFetchProbationTime } from "../../../hooks/use-fetch-probation";
import ProbationField from "../probation-field";

const TimeAttandanceForm = () => {
  const { formId: formID } = useProbationProps();
  const { data, isLoading } = useQuery(useFetchProbationTime({ formID }));
  const id = useId();

  if (isLoading) {
    return (
      <TabsContent value="time">
        <div>Loading Time Attandance data...</div>
      </TabsContent>
    );
  }
  return (
    <TabsContent value="time">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-title text-semi-black">ประวัติการขาดลามาสาย</div>
          <div className="font-body2 text-status-red">desc</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-4 p-4">
        {data?.time_attendance &&
          data.time_attendance.map((item, index) => (
            <ProbationField
              key={index}
              title={item.name.replaceAll("_", " ").capitalizeFirst()}
              showSuffix={false}
              disable={true}
              values={[
                {
                  id: index,
                  title: item.value,
                },
              ]}
              colSpan={[3, 2]}
            />
          ))}
        <ProbationField
          title="คะแนนเต็ม"
          showSuffix={false}
          disable={true}
          values={[
            {
              id: id,
              title: `${data?.score_max}`,
            },
          ]}
          colSpan={[3, 2]}
        />
        <ProbationField
          title="คะแนนได้"
          showSuffix={false}
          disable={true}
          values={[
            {
              id: id,
              title: `${data?.score_obtained}`,
            },
          ]}
          colSpan={[3, 2]}
        />
        <ProbationField
          title="คะแนนเสียสะสม"
          showSuffix={false}
          disable={true}
          values={[
            {
              id: id,
              title: `${data?.penalty_total}`,
            },
          ]}
          colSpan={[3, 2]}
        />
      </div>
    </TabsContent>
  );
};

export default TimeAttandanceForm;
