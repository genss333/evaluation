"use client";
import { TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useFetchProbationTime } from "../../../hooks/use-fetch-probation";
import ProbationField from "../probation-field";

const TimeAttandanceForm = () => {
  const { data, isLoading } = useQuery(useFetchProbationTime());

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
          <div className="font-title text-semi-black">{data?.title}</div>
          <div className="font-body2 text-status-red">{data?.desc}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 p-4">
        {data?.list &&
          data.list.map((item) => (
            <div key={item.id} className="pr-4">
              <ProbationField
                title={item.title}
                showSuffix={false}
                disable={item.disable}
                values={[
                  {
                    id: item.id,
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
