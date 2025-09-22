"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Probation } from "@/modules/probation/domain/entities/probation";
import { ReactNode } from "react";
import { useProbationData } from "../../hooks/use-probation-form";
import ProbationField from "../shared/probation-field";

interface ProbationGradeProps {
  data: Probation;
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

const ProbationGradeRadio = ({ data }: ProbationGradeProps) => {
  return (
    <FormField
      name="resultProbation"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={data.resultProbation?.disable ?? false}
            >
              <FormItem>
                <div className="grid grid-cols-3 text-sm font-medium items-center">
                  <div>ผลการประเมิน</div>
                  <FormControl>
                    <div className="flex gap-2 items-end">
                      <RadioGroupItem value="pass" id="r1" />
                      <Label htmlFor="r1">ผ่าน</Label>
                    </div>
                  </FormControl>
                  <FormControl>
                    <div className="flex gap-2 items-end">
                      <RadioGroupItem value="fail" id="r2" />
                      <Label htmlFor="r2">ไม่ผ่าน</Label>
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const ProbationGrade = ({ data }: ProbationGradeProps) => {
  const { gradeField, scoreGroupFields, totalScoreField } =
    useProbationData(data);
  return (
    <ProbationGroupCard>
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2.5 p-4">
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
                    colSpan={[1, 1]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <ProbationGradeRadio data={data} />
      </div>
    </ProbationGroupCard>
  );
};

export default ProbationGrade;
