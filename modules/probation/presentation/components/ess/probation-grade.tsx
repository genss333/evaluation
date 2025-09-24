"use client";

import Flex from "@/components/layout/flex";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { EvalFormData } from "@/modules/probation/domain/entities/eval-form-data";
import { Probation } from "@/modules/probation/domain/entities/probation";
import { ReactNode } from "react";
import { useProbationData } from "../../hooks/use-probation-form";
import ProbationField from "../shared/probation-field";

interface ProbationGradeProps {
  data: Probation & EvalFormData;
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
  const { scoreGroupFields, totalScoreField } = useProbationData(data);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-2">
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
                      colSpan={[2, 2]}
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
                      colSpan={[2, 2]}
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
          <FormField
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProbationField
                    field={field}
                    title={"เกรด"}
                    suffixText={`ช่วงคะแนนประเมิน ${data.summary.grade_min} - ${data.summary.grade_max}`}
                    values={[{ id: 1, title: data.summary.grade }]}
                    disable={true}
                    showSuffix={false}
                    colSpan={[1, 3]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Flex>
      </ProbationGroupCard>
    </div>
  );
};

export default ProbationESSGrade;
