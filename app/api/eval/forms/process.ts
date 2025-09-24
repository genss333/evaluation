import { DateFormat } from "@/extensions/date-format";
import { User } from "@/models/user";
import { EvalForm, Steps } from "@/modules/probation/data/models/eval-form";
import {
  Probation,
  ProbationStep,
} from "@/modules/probation/domain/entities/probation";

export function mapEvalFormToProbation(
  apiResponse: any,
  steps: Steps[],
  user: User
): Probation {
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
        values: [
          {
            id: 1,
            title: DateFormat.year({
              date: evalForm.eval_start,
            }),
          },
        ],
        disable: true,
      },
      {
        key: "month",
        title: "เดือนประเมิน",
        values: [
          {
            id: 1,
            title: DateFormat.month({
              date: evalForm.eval_start,
            }),
          },
        ],
        disable: true,
      },
      {
        key: "empName",
        title: "ชื่อพนักงาน",
        values: [{ id: 1, title: user.user.name ?? "" }],
        disable: true,
      },
      {
        key: "position",
        title: "ตำแหน่ง",
        values: [{ id: 1, title: user.user.position }],
        disable: true,
      },
      {
        key: "empLevel",
        title: "ระดับพนักงาน",
        values: [{ id: 1, title: user.user.department }],
        disable: true,
      },
      {
        key: "startDate",
        title: "วันที่เริ่มงาน",
        values: [
          {
            id: 1,
            title: DateFormat.shortDate({ date: user.user.start_date }),
          },
        ],
        disable: true,
      },
      {
        key: "startWork",
        title: "วันที่บรรจุ",
        values: [
          {
            id: 1,
            title: DateFormat.shortDate({ date: user.user.start_date }),
          },
        ],
        disable: true,
      },
      {
        key: "workAge",
        title: "อายุงาน",
        values: [
          {
            id: 1,
            title: `${calculateMonthYearDuration(user.user.start_date)}`,
          },
        ],
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

    steps: [
      {
        title: "ตั้งค่า KPI",
        desc: `${`สิ้นสุด ${DateFormat.shortDate({
          date: evalForm.eval_end,
        })}`}`,
        dateTime: evalForm.eval_end,
        status: "A",
      },
      ...steps.map((item, index) => mapStepToProbationStep(item, index)),
      {
        title: "เสร็จสิ้น",
        dateTime: evalForm.eval_end,
        status: mapStepsStatus(steps[steps.length - 1]),
      },
    ],

    resultProbation: {
      value: evalForm.remark ?? "",
      disable: false,
    },
  };
}

export function mapStepToProbationStep(
  step: Steps,
  index: number
): ProbationStep {
  let domainStatus: ProbationStep["status"];

  domainStatus = mapStepsStatus(step);

  const probationStep: ProbationStep = {
    title: index === 0 ? "ประเมินตนเอง" : `ผู้ประเมินลำดับที่ ${index + 1}`,
    desc: step.evaluator_name,
    status: domainStatus,
    dateTime: step.eval_date,
  };

  return probationStep;
}

function mapStepsStatus(step: Steps) {
  switch (step.status) {
    case 0:
      return "1";
    case 1:
      return "P";
    case 2:
      return "A";
    default:
      const exhaustiveCheck: never = step.status;
      throw new Error(`Unknown status value: ${exhaustiveCheck}`);
  }
}

function calculateMonthYearDuration(
  startDate: string | Date,
  endDate: string | Date = new Date()
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return `${months} เดือน`;
  } else if (months === 0) {
    return `${years} ปี`;
  }

  return `${years} ปี ${months} เดือน `;
}
