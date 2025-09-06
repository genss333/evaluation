"use client";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useFetchMoreProbation } from "../../../hooks/fetch-probation";

const MoreProbationForm = () => {
  const { data, isLoading } = useQuery(useFetchMoreProbation());

  if (isLoading) {
    return (
      <TabsContent value="more" className="mt-4">
        <div>Loading More Probations data...</div>
      </TabsContent>
    );
  }
  return (
    <TabsContent value="more" className="mt-4">
      {data?.list &&
        data.list.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-12 items-center px-2 mt-2"
          >
            <div className="text-start text-gray-500 col-span-4">
              {index + 1}.{item.title}
            </div>
            <Textarea className="h-[60px] min-h-[60px] font-body3 rounded-[10px] col-span-8" />
          </div>
        ))}
    </TabsContent>
  );
};

export default MoreProbationForm;
