import { useMemo } from "react";
import { ProbationModel } from "../../data/models/probation-model";

export const useProbationData = (data: ProbationModel | null | undefined) => {
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

    const scoreGroupKeys = ["totalTarget", "workTime", "kpi", "ability"];
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
