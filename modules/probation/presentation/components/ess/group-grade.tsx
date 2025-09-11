"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { ReactNode } from "react";
import { useProbationData } from "../../hooks/use-probation-form";
import ProbationField from "../shared/probation-field";

interface GroupGradeESSProps {
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

const GroupGradeESS = ({ data }: GroupGradeESSProps) => {
  const { gradeField, scoreGroupFields, totalScoreField } =
    useProbationData(data);
  return (
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
        <Flex direction={"col"} justify={"between"} className="p-4 h-full">
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
  );
};

export default GroupGradeESS;
