"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useFetchProbation } from "../../hooks/use-fetch-probation";
import { useProbationData } from "../../hooks/use-probation-data";
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
  const { currentEmp } = useProbationProps();

  const { data } = useQuery(
    useFetchProbation({
      personCode: currentEmp?.personCode,
      initialData,
    })
  );

  const {
    countField,
    employeeInfoFields,
    gradeField,
    scoreGroupFields,
    totalScoreField,
  } = useProbationData(data ?? initialData);

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
              {countField && (
                <ProbationField
                  title={countField.title}
                  values={countField.values}
                  showSuffix={countField.values.length > 1}
                  disable={countField.disable}
                  colSpan={[2, 3]}
                />
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
              {employeeInfoFields?.map((field) => (
                <ProbationField
                  key={field.key}
                  title={field.title}
                  values={field.values}
                  showSuffix={field.values.length > 1}
                  disable={field.disable}
                  colSpan={[2, 3]}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
              <ProbationGroupCard>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2.5 p-4">
                  {scoreGroupFields?.map((item) => (
                    <ProbationField
                      key={item.key}
                      title={item.title}
                      values={item.values}
                      disable={item.disable}
                      suffix={
                        <div
                          key={`${item.key}-suffix`}
                          className="font-body3 text-button-grey"
                        >
                          %
                        </div>
                      }
                      colSpan={[1, 2]}
                    />
                  ))}
                  {totalScoreField && (
                    <ProbationField
                      key={totalScoreField.key}
                      title={totalScoreField.title}
                      values={totalScoreField.values}
                      disable={totalScoreField.disable}
                      suffix={
                        <div
                          key="total-score-suffix"
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
                  {gradeField && (
                    <ProbationField
                      title={gradeField.title}
                      suffixText={gradeField.suffixText}
                      values={gradeField.values}
                      disable={gradeField.disable}
                      showSuffix={gradeField.values.length > 1}
                      colSpan={[1, 1]}
                    />
                  )}
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
