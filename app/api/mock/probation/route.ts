import { NextResponse } from "next/server";

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

export async function GET() {
  const mockData = {
    titles: [
      {
        title: "หัวข้อการประเมินหลัก",
        values: [
          { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
          { id: 2, title: "การทำงานเป็นทีม" },
          { id: 3, title: "ความรับผิดชอบ" },
        ],
        disable: false,
      },
      {
        title: "หัวข้อการประเมินตามหน้าที่",
        values: [
          { id: 4, title: "ความรู้ในงาน" },
          { id: 5, title: "ทักษะการสื่อสาร" },
        ],
        disable: true,
      },
    ],
    count: {
      title: "ครั้งที่",
      values: [{ id: 1, title: "1" }],
      disable: true,
    },
    code: {
      title: "รหัสพนักงาน",
      values: [{ id: 1, title: "EMP007" }],
      disable: true,
    },
    empName: {
      title: "ชื่อ-สกุล",
      values: [{ id: 1, title: "สมศรี มีสุข" }],
      disable: true,
    },
    startDate: {
      title: "วันที่เริ่มทดลองงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    startWork: {
      title: "วันที่เริ่มงาน",
      values: [{ id: 1, title: "01/06/2025" }],
      disable: true,
    },
    position: {
      title: "ตำแหน่ง",
      values: [{ id: 1, title: "Senior Frontend Developer" }],
      disable: true,
    },
    years: {
      title: "รอบการประเมินประจำปี",
      values: [
        { id: 2025, title: "2025" },
        { id: 2024, title: "2024" },
        { id: 2023, title: "2023" },
      ],
      disable: false,
    },
    month: {
      title: "เดือน",
      values: [
        { id: 9, title: "กันยายน" },
        { id: 10, title: "ตุลาคม" },
      ],
      disable: false,
    },
    empLevel: {
      title: "ระดับพนักงาน",
      values: [{ id: 1, title: "S3" }],
      disable: true,
    },
    workAge: {
      title: "อายุงาน",
      values: [{ id: 1, title: "3 ปี 6 เดือน" }],
      disable: true,
    },
    group: [
      {
        title: "เวลาทำงาน",
        values: [{ id: 1, title: "10" }],
        disable: true,
      },
      {
        title: "ผลงาน (KPI)",
        values: [{ id: 1, title: "50" }],
        disable: true,
      },
      {
        title: "ความสามารถ",
        values: [{ id: 1, title: "40" }],
        disable: true,
      },
    ],
    totalScore: {
      title: "คะแนนรวม",
      values: [{ id: 1, title: "100" }],
      disable: true,
    },
    grade: {
      title: "ผลการประเมิน",
      values: [{ id: 1, title: "A" }],
      disable: true,
    },
    gradePeriod: "ช่วงคะแนนประเมิน 0.00 - 50.00",
    steps: [
      {
        title: "พนักงานประเมินตนเอง",
        desc: "พนักงานดำเนินการประเมิน",
        status: "1",
        dateTime: new Date("2025-09-01T10:15:00"),
      },
      {
        title: "หัวหน้างานประเมิน",
        desc: "หัวหน้างานกำลังประเมินผล",
        status: "A",
        dateTime: new Date("2025-09-03T14:00:00"),
      },
      {
        title: "ฝ่ายบุคคลตรวจสอบ",
        desc: "รอฝ่ายบุคคลดำเนินการ",
        status: "P",
        dateTime: null,
      },
    ],
  };

  return NextResponse.json(mockData);
}
