"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Probation } from "@/modules/probation/domain/entities/probation";
import { ReactNode } from "react";
import { useProbationData } from "../../hooks/use-probation-form";
import ProbationField from "../shared/probation-field";
import Flex from "@/components/layout/flex";
import { EvalFormData } from "@/modules/probation/domain/entities/eval-form-data";

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
  const { scoreGroupFields, totalScoreField } = useProbationData(data);
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
                    showSuffix
                    colSpan={[1, 3]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Flex>
        <ProbationGradeRadio data={data} />
      </div>
    </ProbationGroupCard>
  );
};

export default ProbationGrade;
