"use client";

import Loading from "@/app/(home)/probation/loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as model from "@/modules/probation/domain/entities/probation";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useRef } from "react";
import { useProbationProps } from "../../hooks/store/use-probation-store";
import { useFetchProbation } from "../../hooks/use-fetch-probation";
import { useFormData, useProbationData } from "../../hooks/use-probation-form";
import { ProbationFormField, SubFormRef } from "../../schema/probation-form";
import ProbationField from "./probation-field";
import ProbationStep from "./probation-setep";
import ProbationTabs from "./probation-tabs";

interface ProbationDetailProps {
  data: model.Probation;
  roleBack?: ReactNode;
  GradeGroup: (data: model.Probation) => ReactNode;
  showBtnActions: boolean;
}

const ProbationDetail = ({
  data: initialData,
  GradeGroup,
  roleBack,
  showBtnActions,
}: ProbationDetailProps) => {
  const { currentEmp, isHrRollback } = useProbationProps();

  const { data, isFetching } = useQuery(
    useFetchProbation({
      personCode: currentEmp?.personCode,
      initialData,
    })
  );

  const { countField, employeeInfoFields } = useProbationData(
    data ?? initialData
  );

  const form = useFormData(data ?? initialData);

  const kpiFormRef = useRef<SubFormRef>(null);
  const compFormRef = useRef<SubFormRef>(null);
  const devplanFormRef = useRef<SubFormRef>(null);
  const moreFormRef = useRef<SubFormRef>(null);

  const onSubmitUI = async (data: ProbationFormField) => {
    const apiPayload = Object.entries(data).map(([key, value]) => ({
      key: key,
      selectedValueId: `${value}`,
    }));

    console.log("Payload for API:", apiPayload);

    kpiFormRef.current?.submit();
    compFormRef.current?.submit();
    devplanFormRef.current?.submit();
    moreFormRef.current?.submit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitUI)}>
        <div className="bg-background w-full rounded-[10px] pb-4">
          <ProbationStep steps={data?.steps ?? []} ConditionForm={roleBack} />
          {isFetching ? (
            <Loading />
          ) : (
            <div className={cn(isHrRollback && "opacity-25")}>
              <hr className="my-4" />
              <div className="p-4">
                {!data ? (
                  <div className="text-center text-md py-8 text-gray-500">
                    ไม่พบข้อมูลการประเมิน
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {countField && (
                        <FormField
                          name={countField.key}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ProbationField
                                  field={field}
                                  title={countField.title}
                                  values={countField.values}
                                  showSuffix={countField.values.length > 1}
                                  disable={countField.disable}
                                  colSpan={[2, 3]}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                      {employeeInfoFields?.map((item) => (
                        <FormField
                          key={item.key}
                          name={item.key}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ProbationField
                                  field={field}
                                  title={item.title}
                                  selectedValue={item.selctedValue}
                                  values={item.values}
                                  showSuffix={item.values.length > 1}
                                  disable={item.disable}
                                  colSpan={[2, 3]}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    {GradeGroup(data ?? initialData)}
                  </div>
                )}
              </div>
              <ProbationTabs
                kpiFormRef={kpiFormRef}
                compFormRef={compFormRef}
                devplanFormRef={devplanFormRef}
                moreFormRef={moreFormRef}
              />
            </div>
          )}
          {showBtnActions && (
            <div className="flex justify-end gap-2 mr-4">
              <Button
                type="submit"
                variant={"outline"}
                className="rounded-full border-primary min-w-[90px] h-8 text-xs font-normal"
              >
                Save darft
              </Button>
              <Button
                type="submit"
                className="rounded-full min-w-[90px] h-8 text-xs font-normal"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProbationDetail;
