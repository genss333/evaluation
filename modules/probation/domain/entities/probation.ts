import { EvalForm } from "../../data/models/eval-form";

export interface ProbationFieldValue {
  id: number;
  title: string;
}

export interface ProbationField {
  key: string;
  title: string;
  suffixText?: string;
  selctedValue?: ProbationFieldValue;
  values: ProbationFieldValue[];
  disable: boolean;
}

export interface ProbationStep {
  title?: string;
  desc?: string;
  status: "1" | "P" | "LP" | "R" | "A";
  dateTime?: Date | null;
}

export interface Employee {
  personCode: string;
  name: string;
  percent: number;
}

export interface Probation {
  employee?: Employee[] | null;
  titles: ProbationField[];
  fields: ProbationField[];
  steps: ProbationStep[];
  resultProbation?: {
    value: string;
    disable: boolean;
  };
}

export function mapEvalFormToProbation(apiResponse: any): Probation {
  const evalForm: EvalForm = apiResponse.data[0];

  if (!evalForm) {
    throw new Error("No evaluation form data found in the API response.");
  }
  return {
    employee: null,

    titles: [
      {
        key: "form",
        title: "แบบฟอร์มการประเมิน",
        values: [{ id: 1, title: evalForm.title_th }],
        disable: true,
      },
    ],

    fields: [
      {
        key: "count",
        title: "ครั้งที่",
        values: [{ id: 1, title: "1" }],
        disable: true,
      },
      {
        key: "code",
        title: "รหัสการประเมิน",
        values: [{ id: 1, title: evalForm.code }],
        disable: true,
      },
      {
        key: "years",
        title: "ปีประเมิน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "month",
        title: "เดือนประเมิน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "empName",
        title: "ชื่อพนักงาน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "position",
        title: "ตำแหน่ง",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "empLevel",
        title: "ระดับพนักงาน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "startDate",
        title: "วันที่เริ่มงาน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "startWork",
        title: "วันที่บรรจุ",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "workAge",
        title: "อายุงาน",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "kpi",
        title: "KPI",
        values: [{ id: 1, title: `${evalForm.kpi_weight}` }],
        disable: true,
      },
      {
        key: "workTime",
        title: "Time Attendance",
        values: [{ id: 1, title: `` }],
        disable: true,
      },
      {
        key: "competency",
        title: "Competency",
        values: [{ id: 1, title: `${evalForm.comp_weight}` }],
        disable: true,
      },
      {
        key: "totalScore",
        title: "รวมทั้งหมด",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
      {
        key: "grade",
        title: "เกรด",
        suffixText: "ช่วงคะแนนประเมิน 0.00 - 50.00",
        values: [{ id: 1, title: "" }],
        disable: true,
      },
    ],

    steps: [],

    resultProbation: {
      value: evalForm.remark ?? "",
      disable: false,
    },
  };
}
