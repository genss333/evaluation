"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useProbationProps } from "../../../hooks/store/use-probation-store";
import { useFetchProbationTime } from "../../../hooks/use-fetch-probation";
import ProbationField from "../probation-field";

const TimeAttandanceForm = () => {
  const { formId: formID } = useProbationProps();
  const { data, isLoading } = useQuery(useFetchProbationTime({ formID }));

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
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 p-4">
        {data?.time_attendance &&
          data.time_attendance.map((item, index) => (
            <div key={index} className="pr-4">
              <ProbationField
                title={item.name}
                showSuffix={false}
                disable={true}
                values={[
                  {
                    id: index,
                    title: item.value,
                  },
                ]}
                colSpan={[2, 1]}
              />
            </div>
          ))}
      </div>
    </TabsContent>
  );
};

export default TimeAttandanceForm;
