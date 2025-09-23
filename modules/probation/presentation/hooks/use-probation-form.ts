import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Kpi } from "../../domain/entities/eval-form-data";
import { MoreProbation } from "../../domain/entities/more-probation";
import { Probation } from "../../domain/entities/probation";
import { Competency } from "../../domain/entities/probation-competency";
import { Devplan } from "../../domain/entities/probation-devplan";
import { ProbationTable } from "../../domain/entities/probation-table";
import {
  CompedencySchema,
  devplanSchema,
  DevplanSchema,
  KPISchema,
  MoreProbationSchema,
  moreProbationZodSchema,
  ProbationFormField,
} from "../schema/probation-form";
import { SumScore } from "../../domain/entities/probation-kpi";

export const useProbationData = (data: Probation | null | undefined) => {
  const processedData = useMemo(() => {
    if (!data || !data.fields) {
      return {
        countField: undefined,
        employeeInfoFields: [],
        scoreGroupFields: [],
        totalScoreField: undefined,
        gradeField: undefined,
      };
    }

    const countField = data.fields.find((f) => f.key === "count");
    const totalScoreField = data.fields.find((f) => f.key === "totalScore");
    const gradeField = data.fields.find((f) => f.key === "grade");

    const employeeInfoKeys = [
      "code",
      "years",
      "month",
      "empName",
      "position",
      "empLevel",
      "startDate",
      "startWork",
      "workAge",
    ];
    const employeeInfoFields = data.fields
      .filter((field) => employeeInfoKeys.includes(field.key))
      .sort(
        (a, b) =>
          employeeInfoKeys.indexOf(a.key) - employeeInfoKeys.indexOf(b.key)
      );

    const scoreGroupKeys = [
      "totalTarget",
      "workTime",
      "competency",
      "kpi",
      "ability",
    ];
    const scoreGroupFields = data.fields.filter((field) =>
      scoreGroupKeys.includes(field.key)
    );

    return {
      countField,
      employeeInfoFields,
      scoreGroupFields,
      totalScoreField,
      gradeField,
    };
  }, [data]);

  return processedData;
};

export const useFormData = (data: Probation) => {
  const formData = useMemo(() => {
    const formValues: ProbationFormField = {
      ...Object.fromEntries(
        data.fields.map((item) => [
          item.key,
          item.selctedValue ? item.selctedValue : item.values?.[0]?.title ?? "",
        ])
      ),
      resultProbation: data.resultProbation?.value ?? "",
    };
    return formValues;
  }, [data.fields]);

  return useForm<ProbationFormField>({
    defaultValues: formData,
  });
};

export const useFormDataKpi = (data: Kpi[]) => {
  const form = useForm<KPISchema>({
    defaultValues: {
      kpis: [],
    },
  });

  const formData = useMemo(() => {
    if (data) {
      const formValues: KPISchema = {
        kpis: data.map((item) => item),
      };
      return formValues;
    }
    return undefined;
  }, [data]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form.reset]);

  return form;
};

export const useFormDataCompedency = (
  data:
    | (ProbationTable<Competency> & {
        sums?: SumScore[];
      })
    | undefined
) => {
  const form = useForm<CompedencySchema>({
    defaultValues: {
      comps: [],
      compsSums: [],
    },
  });

  const formData = useMemo(() => {
    if (data?.list) {
      const formValues: CompedencySchema = {
        comps: data.list.map((item) => item),
        compsSums: data.sums
          ? data.sums.map((item) => ({
              field: {
                key: item.key,
                value: item.value ?? "",
              },
            }))
          : [],
      };
      return formValues;
    }
    return undefined;
  }, [data?.list, data?.sums]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form.reset]);

  return form;
};

export const useFormDataDevplan = (
  data: ProbationTable<Devplan> | undefined
) => {
  const form = useForm<DevplanSchema>({
    resolver: zodResolver(devplanSchema),
  });

  const formData = useMemo(() => {
    if (data) {
      const formValues: DevplanSchema = {
        plans: data.list.map((item) => ({
          id: item.id,
          plan: item.plan.value ?? "",
          priority: item.priority?.value?.id ?? -1,
          dateTime: item.dateTime?.value ?? null,
          remark: item.remark?.value ?? "",
        })),
      };
      return formValues;
    }
  }, [data?.list]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form]);

  return form;
};

export const useFormDataMoreProbation = (
  data: ProbationTable<MoreProbation> | undefined
) => {
  const form = useForm<MoreProbationSchema>({
    resolver: zodResolver(moreProbationZodSchema),
  });

  const formData = useMemo(() => {
    if (data) {
      const formvalues: MoreProbationSchema = Object.fromEntries(
        data.list.map((item) => [
          item.id,
          item.value.map((v) => ({
            [String(v.id)]: v.value,
            disable: v.disable ?? false,
          })),
        ])
      );

      return formvalues;
    }
  }, [data?.list]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form.reset]);

  return form;
};
