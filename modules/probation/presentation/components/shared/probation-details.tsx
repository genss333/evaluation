"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useFetchProbation } from "../../hooks/use-fetch-probation";
import { useProbationProps } from "../../hooks/use-probation-store";
import ProbationField from "./probation-field";
import ProbationStep from "./probation-setep";
import ProbationTabs from "./probation-tabs";

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

const ProbationDetail = ({ data: initialData }: ProbationDetailProps) => {
  const { currentEmp, isSelectedEmp } = useProbationProps();

  const { data, isLoading, isFetching } = useQuery(
    useFetchProbation({
      personCode: currentEmp?.personCode,
      isSelectemp: isSelectedEmp,
      initialData,
    })
  );

  const employeeInfoFields = [
    data?.code,
    data?.years,
    data?.month,
    data?.empName,
    data?.position,
    data?.empLevel,
    data?.startDate,
    data?.startWork,
    data?.workAge,
  ];

  if (isFetching) return <p>กำลังโหลดข้อมูลพนักงาน...</p>;
  if (isLoading) return <p>กำลังโหลดข้อมูลครั้งแรก...</p>;
  return (
    <div className="bg-background w-full rounded-[10px]">
      <ProbationStep steps={data?.steps ?? []} />
      <hr className="my-4" />
      <div className="p-4">
        {!data ? (
          <div className="text-center text-md py-8 text-gray-500">
            ไม่พบข้อมูลการประเมิน
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ProbationField
                title={data?.count.title ?? ""}
                values={data?.count.values ?? []}
                showSuffix={data && data.count.values?.length > 1}
                disable={data?.count.disable}
                colSpan={[2, 3]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
              {employeeInfoFields.map((field) =>
                field ? (
                  <ProbationField
                    key={field?.title}
                    title={field?.title ?? ""}
                    values={field?.values ?? []}
                    showSuffix={field && field.values.length > 1}
                    disable={field?.disable}
                    colSpan={[2, 3]}
                  />
                ) : null
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
              <ProbationGroupCard>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2.5 p-4">
                  {data?.group?.map((item) => (
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
                      colSpan={[1, 2]}
                    />
                  ))}
                  {data?.totalScore && (
                    <ProbationField
                      key={data?.totalScore.title ?? ""}
                      title={data?.totalScore.title ?? ""}
                      values={data?.totalScore.values ?? []}
                      disable={data?.totalScore.disable}
                      suffix={
                        <div
                          key="time-prefix"
                          className="font-body3 text-button-grey"
                        >
                          คะแนน
                        </div>
                      }
                      colSpan={[1, 2]}
                    />
                  )}
                </div>
              </ProbationGroupCard>
              <ProbationGroupCard>
                <Flex
                  direction={"col"}
                  justify={"between"}
                  className="p-4 h-full"
                >
                  <div className="font-title pt-2">เกรดรวม</div>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 items-center gap-4">
                    <ProbationField
                      title={data?.grade?.title ?? ""}
                      values={data?.grade?.values ?? []}
                      disable={data?.grade?.disable}
                      showSuffix={data && data.grade?.values?.length > 1}
                      colSpan={[3, 1]}
                    />
                    <div className="font-body3">{data?.gradePeriod}</div>
                  </div>
                </Flex>
              </ProbationGroupCard>
            </div>
          </>
        )}
      </div>
      <ProbationTabs />
    </div>
  );
};

export default ProbationDetail;
