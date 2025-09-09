"use client";

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

const ProbationGrade = ({ data }: ProbationGradeProps) => {
  const { gradeField, scoreGroupFields, totalScoreField } =
    useProbationData(data);
  return (
    <ProbationGroupCard>
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2.5 p-4">
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
      </div>
    </ProbationGroupCard>
  );
};

export default ProbationGrade;
