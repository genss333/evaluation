import { Role } from "@/models/user-role";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import { NextResponse } from "next/server";
import { getSession } from "../../auth/route";

// Updated interfaces for context
/*
export interface ProbationTitleValue {
  id: number;
  title: string;
}

export interface ProbationTitle {
  title: string;
  values: ProbationTitleValue[];
  disable: boolean;
}

export interface ProbationStep {
  title?: string;
  desc?: string;
  status: "1" | "P" | "LP" | "R" | "A";
  dateTime?: Date | null;
}

export interface ProbationModel {
  titles: ProbationTitle[];
  count: ProbationTitle;
  code: ProbationTitle;
  empName: ProbationTitle;
  startDate: ProbationTitle;
  startWork: ProbationTitle;
  position: ProbationTitle;
  years: ProbationTitle;
  month: ProbationTitle;
  empLevel: ProbationTitle;
  workAge: ProbationTitle;
  group: ProbationTitle[];
  grade: ProbationTitle[];
  steps: ProbationStep[];
}
*/

const mssMockData: ProbationModel = {
  employee: [
    {
      personCode: "TG0001",
      name: "Test Test",
      percent: 45,
    },
    {
      personCode: "TG0002",
      name: "Test Test",
      percent: 45,
    },
    {
      personCode: "TG0003",
      name: "Test Test",
      percent: 45,
    },
  ],
  titles: [
    {
      key: "formProbation",
      title: "แบบฟอร์มการประเมิน",
      values: [
        { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
        { id: 2, title: "การทำงานเป็นทีม" },
        { id: 3, title: "ความรับผิดชอบ" },
      ],
      disable: false,
    },
  ],
  fields: [
    {
      key: "count",
      title: "ครั้งที่",
      values: [{ id: 1, title: "1" }],
      disable: false,
    },
    {
      key: "code",
      title: "รหัสการประเมิน",
      values: [{ id: 1, title: "EMP007" }],
      disable: true,
    },
    {
      key: "empName",
      title: "ชื่อ-สกุล",
      values: [{ id: 1, title: "สมศรี มีสุข" }],
      disable: true,
    },
    {
      key: "startDate",
      title: "วันที่เริ่มทดลองงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    {
      key: "startWork",
      title: "วันที่เริ่มงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    {
      key: "position",
      title: "ตำแหน่ง",
      values: [{ id: 1, title: "Senior Frontend Developer" }],
      disable: true,
    },
    {
      key: "years",
      title: "รอบการประเมินประจำปี",
      selctedValue: { id: 1, title: "2025" },
      values: [
        { id: 1, title: "2025" },
        { id: 2, title: "2024" },
        { id: 3, title: "2023" },
      ],
      disable: false,
    },
    {
      key: "month",
      title: "เดือน",
      selctedValue: { id: 9, title: "กันยายน" },
      values: [
        { id: 9, title: "กันยายน" },
        { id: 10, title: "ตุลาคม" },
      ],
      disable: false,
    },
    {
      key: "empLevel",
      title: "ระดับพนักงาน",
      values: [{ id: 1, title: "S3" }],
      disable: true,
    },
    {
      key: "workAge",
      title: "อายุงาน",
      values: [{ id: 1, title: "3 ปี 6 เดือน" }],
      disable: true,
    },
    {
      key: "totalTarget",
      title: "ความคาดหวังรวม",
      values: [{ id: 1, title: "" }],
      disable: false,
    },
    {
      key: "workTime",
      title: "เวลาทำงาน",
      values: [{ id: 1, title: "7.8" }],
      disable: false,
    },
    {
      key: "kpi",
      title: "ผลงาน (KPI)",
      values: [{ id: 1, title: "50" }],
      disable: false,
    },
    {
      key: "ability",
      title: "ความสามารถ",
      values: [{ id: 1, title: "40" }],
      disable: false,
    },
    {
      key: "totalScore",
      title: "คะแนนรวม",
      values: [{ id: 1, title: "100" }],
      disable: false,
    },
    {
      key: "grade",
      title: "ผลการประเมิน",
      values: [{ id: 1, title: "A" }],
      suffixText: "ช่วงคะแนนประเมิน 0.00 - 50.00",
      disable: false,
    },
  ],
  steps: [
    {
      title: "ตั้งค่า KPI",
      desc: "สิ้นสุด 31/07/2568",
      status: "A",
      dateTime: new Date("2025-09-01T10:15:00"),
    },
    {
      title: "พนักงานประเมินตนเอง",
      desc: "พนักงานดำเนินการประเมิน",
      status: "P",
      dateTime: null,
    },
    {
      title: "หัวหน้างานประเมิน",
      desc: "หัวหน้างานกำลังประเมินผล",
      status: "P",
      dateTime: null,
    },
    {
      title: "ฝ่ายบุคคลตรวจสอบ",
      desc: "รอฝ่ายบุคคลดำเนินการ",
      status: "P",
      dateTime: null,
    },
    {
      title: "เสร็จสิ้น",
      desc: "",
      status: "P",
      dateTime: null,
    },
  ],
};

const essMockData: ProbationModel = {
  titles: [
    {
      key: "evaluationTopics",
      title: "แบบฟอร์มการประเมิน",
      values: [
        { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
        { id: 2, title: "การทำงานเป็นทีม" },
        { id: 3, title: "ความรับผิดชอบ" },
      ],
      disable: false,
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
      title: "รหัสพนักงาน",
      values: [{ id: 1, title: "EMP007" }],
      disable: true,
    },
    {
      key: "empName",
      title: "ชื่อ-สกุล",
      values: [{ id: 1, title: "สมศรี มีสุข" }],
      disable: true,
    },
    {
      key: "startDate",
      title: "วันที่เริ่มทดลองงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    {
      key: "startWork",
      title: "วันที่เริ่มงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    {
      key: "position",
      title: "ตำแหน่ง",
      values: [{ id: 1, title: "Senior Frontend Developer" }],
      disable: true,
    },
    {
      key: "years",
      title: "รอบการประเมินประจำปี",
      values: [
        { id: 2025, title: "2025" },
        { id: 2024, title: "2024" },
        { id: 2023, title: "2023" },
      ],
      disable: false,
    },
    {
      key: "month",
      title: "เดือน",
      values: [
        { id: 9, title: "กันยายน" },
        { id: 10, title: "ตุลาคม" },
      ],
      disable: false,
    },
    {
      key: "empLevel",
      title: "ระดับพนักงาน",
      values: [{ id: 1, title: "S3" }],
      disable: true,
    },
    {
      key: "workAge",
      title: "อายุงาน",
      values: [{ id: 1, title: "3 ปี 6 เดือน" }],
      disable: true,
    },
    {
      key: "workTime",
      title: "เวลาทำงาน",
      values: [{ id: 1, title: "10" }],
      disable: true,
    },
    {
      key: "kpi",
      title: "ผลงาน (KPI)",
      values: [{ id: 1, title: "50" }],
      disable: true,
    },
    {
      key: "ability",
      title: "ความสามารถ",
      values: [{ id: 1, title: "40" }],
      disable: true,
    },
    {
      key: "totalScore",
      title: "คะแนนรวม",
      values: [{ id: 1, title: "100" }],
      disable: true,
    },
    {
      key: "grade",
      title: "ผลการประเมิน",
      values: [{ id: 1, title: "A" }],
      disable: true,
    },
  ],
  steps: [
    {
      title: "ตั้งค่า KPI",
      desc: "สิ้นสุด 31/07/2568",
      status: "A",
      dateTime: new Date("2025-09-01T10:15:00"),
    },
    {
      title: "พนักงานประเมินตนเอง",
      desc: "พนักงานดำเนินการประเมิน",
      status: "P",
      dateTime: null,
    },
    {
      title: "หัวหน้างานประเมิน",
      desc: "หัวหน้างานกำลังประเมินผล",
      status: "P",
      dateTime: null,
    },
    {
      title: "ฝ่ายบุคคลตรวจสอบ",
      desc: "รอฝ่ายบุคคลดำเนินการ",
      status: "P",
      dateTime: null,
    },
    {
      title: "เสร็จสิ้น",
      desc: "",
      status: "P",
      dateTime: null,
    },
  ],
};

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "UnAuthorization" }, { status: 401 });
  }
  if (session.role === Role.MSS) {
    return NextResponse.json(mssMockData);
  }
  return NextResponse.json(essMockData);
}
