"use client";

import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { useQuery } from "@tanstack/react-query";
import { Form, FormProvider, useForm } from "react-hook-form";
import { useFetchProbation } from "../../hooks/use-fetch-probation";
import { useProbationData } from "../../hooks/use-probation-data";
import { useProbationProps } from "../../hooks/use-probation-store";
import ProbationGrade from "../mss/probation-grade";
import ProbationField from "./probation-field";
import ProbationStep from "./probation-setep";
import ProbationTabs from "./probation-tabs";

interface ProbationDetailProps {
  data: ProbationModel;
}

const ProbationDetail = ({ data: initialData }: ProbationDetailProps) => {
  const { currentEmp } = useProbationProps();

  const { data } = useQuery(
    useFetchProbation({
      personCode: currentEmp?.personCode,
      initialData,
    })
  );

  const { countField, employeeInfoFields } = useProbationData(
    data ?? initialData
  );

  const form = useForm();

  return (
    <FormProvider {...form}>
      <Form control={form.control}>
        <div className="bg-background w-full rounded-[10px]">
          <ProbationStep steps={data?.steps ?? []} />
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
                <ProbationGrade data={data ?? initialData} />
              </div>
            )}
          </div>
          <ProbationTabs />
        </div>
      </Form>
    </FormProvider>
  );
};

export default ProbationDetail;
