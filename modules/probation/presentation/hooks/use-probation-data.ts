import { useMemo } from "react";
import { ProbationModel } from "../../data/models/probation-model";

export const useProbationData = (data: ProbationModel | null | undefined) => {
  const processedData = useMemo(() => {
    // Return a default structure if data is not available to prevent runtime errors
    if (!data || !data.fields) {
      return {
        countField: undefined,
        employeeInfoFields: [],
        scoreGroupFields: [],
        totalScoreField: undefined,
        gradeField: undefined,
      };
    }

    // --- Find single fields by their unique key ---
    const countField = data.fields.find((f) => f.key === "count");
    const totalScoreField = data.fields.find((f) => f.key === "totalScore");
    const gradeField = data.fields.find((f) => f.key === "grade");

    const employeeInfoKeys = [
      "code",
      "years",
      "month",
      "empName",
      "startDate",
      "startWork",
      "position",
      "empLevel",
      "workAge",
    ];
    const employeeInfoFields = data.fields
      .filter((field) => employeeInfoKeys.includes(field.key))
      .sort(
        (a, b) =>
          employeeInfoKeys.indexOf(a.key) - employeeInfoKeys.indexOf(b.key)
      );

    const scoreGroupKeys = ["workTime", "kpi", "ability"];
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
  }, [data]); // The hook will only re-run this logic when the `data` object changes

  return processedData;
};
