"use client";

import Flex from "@/components/layout/flex";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { ReactNode } from "react";
import { useProbationData } from "../../hooks/use-probation-data";
import ProbationField from "../shared/probation-field";

interface ProbationGradeProps {
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

const ProbationESSGrade = ({ data }: ProbationGradeProps) => {
  const { gradeField, scoreGroupFields, totalScoreField } =
    useProbationData(data);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
      <ProbationGroupCard>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5 p-4">
          {scoreGroupFields?.map((item) => (
            <FormField
              key={item.key}
              name={item.key}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProbationField
                      field={field}
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
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          {totalScoreField && (
            <FormField
              name={totalScoreField.key}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProbationField
                      field={field}
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
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
      </ProbationGroupCard>
      <ProbationGroupCard>
        <Flex direction={"col"} justify={"between"} className="h-full p-3">
          <div className="font-title">เกรดรวม</div>
          {gradeField && (
            <FormField
              name={gradeField.key}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProbationField
                      field={field}
                      title={gradeField.title}
                      suffixText={gradeField.suffixText}
                      values={gradeField.values}
                      disable={gradeField.disable}
                      showSuffix={gradeField.values.length > 1}
                      colSpan={[]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </Flex>
      </ProbationGroupCard>
    </div>
  );
};

export default ProbationESSGrade;
