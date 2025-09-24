import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Additional,
  Competency,
  Devplan,
  Kpi,
} from "../../domain/entities/eval-form-data";
import { Probation } from "../../domain/entities/probation";
import {
  CompedencySchema,
  DevplanSchema,
  devplanSchema,
  KPISchema,
  MoreProbationSchema,
  ProbationFormField,
} from "../schema/probation-form";

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

export const useFormDataCompedency = (data: Competency[]) => {
  const form = useForm<CompedencySchema>({
    defaultValues: {
      comps: [],
      compsSums: [],
    },
  });

  const formData = useMemo(() => {
    if (data) {
      const formValues: CompedencySchema = {
        comps: data.map((item) => item),
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

export const useFormDataDevplan = (data: Devplan[]) => {
  const form = useForm<DevplanSchema>({
    resolver: zodResolver(devplanSchema),
  });

  const formData = useMemo(() => {
    if (data) {
      const formValues: DevplanSchema = {
        plans: data.map((item) => ({
          id: item.idx,
          plan: item.content,
          priority: item.priority,
          dateTime: item.timing ?? null,
          remark: item.remarks,
        })),
      };
      return formValues;
    }
  }, [data]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form.reset]);

  return form;
};

export const useFormDataMoreProbation = (data: Additional) => {
  const form = useForm<MoreProbationSchema>();

  const formData = useMemo(() => {
    if (!data) return undefined;

    const moresData = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));

    return { mores: moresData };
  }, [data]);

  useEffect(() => {
    if (formData) {
      form.reset(formData);
    }
  }, [formData, form.reset]);

  return form;
};
